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

const retrieveBlocks = async (client, pageId) => {
    try {
        const response = await client.blocks.children.list({ block_id: pageId, page_size: 100 })
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
        meta += `Title: 【論文まとめ】${title}\n`
        meta += `Date: '${page.last_edited_time.slice(0, 10)}'\n`
        meta += 'Category: 論文\n'
        meta += `Tags: ${tags.join(',')}\n`
        meta += 'Authos: ゆうぼう\n'
        meta += `Slug: ${title.replace(/\s/g, '-')}\n`
        if (page.cover) {
            meta += `Thumbnail: ${page.cover.file.url}\n`
        }
        meta += `Description: ${title}のまとめ\n`
        meta += 'Published: true\n'
        meta += '---\n\n'

        // construct main content
        const blocks = await retrieveBlocks(client, page.id)
        let content = ''
        content = await constructBlocks(client, blocks, content)
        content = meta + content

        return content
    } catch (error) {
        console.error(error)
    }
}

const constructBlocks = async (client, blocks, prefix = '', depth = 0) => {
    // console.log(blocks.results.length, prefix, depth)
    let content = ''
    let number = 0
    for await (let block of tqdm(blocks.results)) {
        const res = await retrieveBlock(client, block.id)
        // console.log(prefix, res.type)
        // console.log(prefix, depth, res)

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
            content += `![${res.image.caption}](${res.image.file.url})\n\n`
        } else if (res.type == 'numbered_list_item') {
            content += `${prefix}${number}. ${aggregateTexts(res.numbered_list_item.rich_text)}\n`
        } else if (res.type == 'bulleted_list_item') {
            content += `${prefix}- ${aggregateTexts(res.bulleted_list_item.rich_text)}\n`
        }
        // console.log(content)

        if (res.has_children) {
            const children = await retrieveChildren(client, res.id)
            if ((res.type == 'numbered_list_item') || (res.type == 'bulleted_list_item')) {
                content += await constructBlocks(client, children, '', depth + 1)
            } else {
                content += await constructBlocks(client, children, '', depth + 1)
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
        title = title.replace(/\s/g, '-')
        let file = path.join(out, `${title}.md`)
        let date = page.last_edited_time.slice(0, 10)
        if ((!fs.existsSync(file)) || (!fs.readFileSync(file).toString().slice(0, 200).match(date))) {
            const content = await notionToMarkdown(client, page.id)
            fs.writeFileSync(file, content)
        } else {
            console.log(`${title}.md exists.`)
        }
        execSync('sleep 2')
        // break
    }
}

importPostFromNotion()