import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

let highlight = require('remark-highlight.js')

export async function getMd2Html(fileName: string) {
    const fileContent: string = fs.readFileSync(fileName, 'utf8')
    const matterResult: matter.GrayMatterFile<string> = matter(fileContent)

    const processedContent = await remark()
        .use(remarkGfm)
        .use(highlight)
        .use(html)
        .process(matterResult.content)

    const contentHtml: string = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export function _getMd2Html(fileName: string) {
    const fileContent: string = fs.readFileSync(fileName, 'utf8')
    const matterResult: matter.GrayMatterFile<string> = matter(fileContent)

    const processedContent = remark()
    .use(remarkGfm)
        .use(highlight)
        .use(html)
        .process(matterResult.content)

    const contentHtml: string = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export async function getAllPosts(dirName: string) {
    const fileNames = fs.readdirSync(dirName)
    const allPostData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(dirName, fileName)
        const content = _getMd2Html(fullPath)

        return {
            slug,
            content,
        }
    })

    return allPostData
}