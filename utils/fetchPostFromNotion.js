import { Client } from '@notionhq/client'
import { execSync } from 'child_process'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import tqdm from 'tqdm'
config()

const initializeClient = () => {
    const notion = new Client({
        auth: process.env.NOTION_API_KEY,
    })
    return notion
}

const retrieveDatabase = async (client, databaseId) => {
    try {
        const database = await client.databases.retrieve({ database_id: databaseId })
        return database
    } catch (error) {
        console.error(error)
    }
}

const retrievePublishedPages = async (client, databaseId) => {
    try {
        const pages = await client.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: "READ",
                        checkbox: { equals: true },
                    },
                    {
                        property: "publish",
                        checkbox: { equals: true },
                    }
                ],
                sorts: [
                    {
                        property: 'Last ordered',
                        direction: 'ascending',
                    },
                ],
            }
        })
        return pages
    } catch (error) {
        console.error(error)
    }
}

const retrievePage = async (client, pageId) => {
    try {
        const response = await client.pages.retrieve({ page_id: pageId })
        return response
    } catch (error) {
        console.error(error)
    }
}

const retrieveBlocks = async (client, pageId, start_cursor = undefined) => {
    try {
        let response = await client.blocks.children.list({ block_id: pageId, page_size: 100, start_cursor: start_cursor })
        if (response.has_more) {
            const response_old = response
            response = await retrieveBlocks(client, pageId, start_cursor = response_old.next_cursor)
            response.results = response_old.results.concat(response.results)
        }
        return response
    } catch (error) {
        console.error(error)
    }
}

const retrieveBlock = async (client, blockId) => {
    try {
        const response = await client.blocks.retrieve({ block_id: blockId })
        return response
    } catch (error) {
        console.error(error)
    }
}

const retrieveChildren = async (client, blockId) => {
    try {
        const response = await client.blocks.children.list({ block_id: blockId, page_size: 100 })
        return response
    } catch (error) {
        console.error(error)
    }
}

const notionToMarkdown = async (client, pageId) => {
    try {
        const page = await retrievePage(client, pageId)
        let meta = '---\n'
        const props = page.properties

        // construct metadata
        let title = ''
        for (let text of props['タイトル'].title) {
            title += text.plain_text
        }
        const tags = props['キーワード'].multi_select.map(res => res.name)
        const datasets = props.Datasets.multi_select.map(res => res.name)
        const slug = title.replace(/\s/g, '-').replace(/:/g, '')
        const conferences = props['研究会'].multi_select.map(res => res.name)
        const year = aggregateTexts(props.Year.rich_text)
        if (fs.existsSync(`public/images/article/${slug}`)) {
            fs.rmdirSync(`public/images/article/${slug}`, { recursive: true })
        }
        fs.mkdirSync(`public/images/article/${slug}`)
        meta += `Title: '【論文まとめ】${title}'\n`
        meta += `Date: '${page.last_edited_time.slice(0, 10)}'\n`
        meta += 'Category: 論文\n'
        meta += `Tags: [${tags.join(',')}]\n`
        meta += 'Authos: ゆうぼう\n'
        meta += `Slug: ${slug}\n`
        if (page.cover) {
            let ext;
            if (page.cover.file.url.match(/\.png/)) {
                ext = 'png'
            } else {
                ext = 'jpg'
            }
            execSync(`curl '${page.cover.file.url}' -o public/images/thumbnails/${slug}.${ext}`)
            meta += `Thumbnail: /images/thumbnails/${slug}.${ext}\n`
        }
        meta += `Description: '${title}のまとめ'\n`
        meta += 'Published: true\n'
        meta += '---\n\n'

        meta += '本記事において使用される図表は，原著論文内の図表を引用しています．\n\n'
        meta += 'また，本記事の内容は，著者が論文を読み，メモとして短くまとめたものになります．'
        meta += '必ずしも内容が正しいとは限らないこと，ご了承ください．\n\n'

        meta += '## 論文情報\n\n'
        meta += `タイトル: ${title}\n\n`
        meta += `研究会: ${conferences.join(' ')}\n\n`
        meta += `年度: ${year}\n\n`
        meta += `キーワード: ${tags.join(', ')}\n\n`
        if (props.PDF.url) meta += `URL: [${props.PDF.url}](${props.PDF.url})\n\n`
        if (props.doi.url) meta += `DOI: [${props.doi.url}](${props.doi.url})\n\n`
        if (props.Code.url) meta += `コード: [${props.Code.url}](${props.Code.url})\n\n`
        meta += `データセット: ${datasets.join(', ')}\n\n`


        // construct main content
        const blocks = await retrieveBlocks(client, page.id)
        let content = ''
        content = await constructBlocks(client, blocks, slug)
        content = meta + content

        const bibtex = aggregateTexts(props.BibTex.rich_text).replace(/\n/, '\n> ')
        content += `\n## 引用\n\n> ${bibtex}`

        return content
    } catch (error) {
        console.error(error)
    }
}

const constructBlocks = async (client, blocks, slug, prefix = '', depth = 0) => {
    // console.log(blocks.results.length, prefix, depth)
    let content = ''
    let number = 0
    for await (let block of tqdm(blocks.results)) {
        const res = await retrieveBlock(client, block.id)

        if (res.type == 'numbered_list_item') {
            number += 1
        } else {
            number = 0
        }

        if (res.type == 'heading_2') {
            content += `## ${aggregateTexts(res.heading_2.rich_text)}\n\n`
        } else if (res.type == 'heading_3') {
            content += `### ${aggregateTexts(res.heading_3.rich_text)}\n\n`
        } else if (res.type == 'paragraph') {
            content += `${prefix}${aggregateTexts(res.paragraph.rich_text)}\n\n`
        } else if (res.type == 'image') {
            const cover = Math.random().toString(36).slice(-8)
            let ext;
            if (res.image.file.url.match(/\.png/)) {
                ext = 'png'
            } else {
                ext = 'jpg'
            }
            execSync(`curl '${res.image.file.url}' -o public/images/article/${slug}/${cover}.${ext}`)
            content += `${prefix}![${res.image.caption}](/images/article/${slug}/${cover}.${ext})\n\n`
        } else if (res.type == 'numbered_list_item') {
            content += `${prefix}${number}. ${aggregateTexts(res.numbered_list_item.rich_text)}\n`
        } else if (res.type == 'bulleted_list_item') {
            content += `${prefix}- ${aggregateTexts(res.bulleted_list_item.rich_text)}\n`
        }
        // console.log(content)

        if (res.has_children) {
            const children = await retrieveChildren(client, res.id)
            if ((res.type == 'numbered_list_item') || (res.type == 'bulleted_list_item')) {
                content += await constructBlocks(client, children, slug, '\t'.repeat(depth + 1), depth + 1)
            } else {
                content += await constructBlocks(client, children, slug, '', depth + 1)
            }
        }
        execSync('sleep 0.1')
    }
    return content
}

const aggregateTexts = (texts) => {
    let ret = ''
    let text = ''
    for (let res of texts) {
        if (res.type == 'text') {
            text = res.text.content

            if (res.text.link) {
                text = `[${text}](${res.text.link.url})`
            }
            if (res.annotations.bold) {
                text = `**${text}**`
            }
            if (res.annotations.italic) {
                text = `*${text}*`
            }
            if (res.annotations.strikethrough) {
                text = `~~${text}~~`
            }
            if (res.annotations.underline) {
                text = `<ins>${text}</ins>`
            }
            if (res.annotations.code) {
                text = `\`${text}\``
            }
            if (res.annotations.color != 'default') {
                text = `<span style="color: ${res.annotations.color};">${text}</span>`
            }
        } else if (res.type == 'equation') {
            text = res.equation.expression
            text = `\$${text}\$`
        }

        ret += text
    }
    return ret
}

export const importPostFromNotion = async (out = 'pages/docs') => {
    const client = initializeClient()
    const pages = await retrievePublishedPages(client, process.env.DATABASEID)
    for await (let page of tqdm(pages.results, { sameLine: true })) {
        let title = ''
        for (let text of page.properties['タイトル'].title) {
            title += text.plain_text
        }
        console.log('collecting', title)
        title = title.replace(/\s/g, '-').replace(/:/g, '')
        let file = path.join(out, `${title}.md`)
        let date = page.last_edited_time.slice(0, 10)
        if ((!fs.existsSync(file)) || (!fs.readFileSync(file).toString().slice(0, 200).match(date))) {
            // if (true) {
            const content = await notionToMarkdown(client, page.id)
            // console.log(content)
            fs.writeFileSync(file, content)
        } else {
            console.log(`${title}.md exists.`)
        }
    }
}

importPostFromNotion()