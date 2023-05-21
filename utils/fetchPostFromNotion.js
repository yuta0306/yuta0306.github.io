import { Client } from '@notionhq/client'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import tqdm from 'tqdm'
config()

console.log(process.env)
const initializeClient = () => {
    console.log(process.env.NOTION_API_KEY)
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

const notionToMarkdown = async (client, pageId) => {
    try {
        const page = await retrievePage(client, pageId)
        let content = '---\n'
        const props = page.properties

        // construct metadata
        let title = ''
        for (let text of props['タイトル'].title) {
            title += text.plain_text
        }
        const tags = props['キーワード'].multi_select.map(res => res.name)
        content += `Title: ${title}\n`
        content += `Date: '${page.last_edited_time.slice(0, 10)}'\n`
        content += 'Category: 論文\n'
        content += `Tags: ${tags.join(',')}\n`
        content += 'Authos: ゆうぼう\n'
        content += `Slug: ${title.replace(/\s/, '-')}\n`
        if (page.cover) {
            content += `Thumbnail: ${page.cover.file.url}\n`
        }
        content += `Description: ${title}のまとめ\n`
        content += 'Published: true\n'
        content += '---\n\n'

        // construct main content
        const blocks = await retrieveBlocks(client, page.id)
        for (let block of tqdm(blocks.results)) {
            const res = await retrieveBlock(client, block.id)
            if (res.type == 'heading_2') {
                content += `## ${aggregateTexts(res.heading_2.rich_text)}\n\n`
            } else if (res.type == 'heading_3') {
                content += `### ${aggregateTexts(res.heading_3.rich_text)}\n\n`
            } else if (res.type == 'paragraph') {
                content += `${aggregateTexts(res.paragraph.rich_text)}\n\n`
            } else if (res.type == 'image') {
                content += `![${res.image.caption}](${res.image.file.url})\n\n`
            }
        }
        return { 'content': content, 'title': title }
    } catch (error) {
        console.error(error)
    }
}

const aggregateTexts = (texts) => {
    let ret = ''
    let text = ''
    for (let res of texts) {
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
        ret += text
    }
    return ret
}

export const importPostFromNotion = async (out = 'pages/docs') => {
    const client = initializeClient()
    const pages = await retrievePublishedPages(client, process.env.DATABASEID)
    for (let page of tqdm(pages.results)) {
        const { content, title } = await notionToMarkdown(client, page.id)
        fs.writeFileSync(path.join(out, `${title}.md`), content)
    }
}

importPostFromNotion()