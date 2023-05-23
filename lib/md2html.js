import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathJax from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { read } from 'to-vfile'
import unified from 'unified'

export async function getMd2Html(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8')
    const matterResult = matter(fileContent)

    const processedContent = await unified()
        .use(remarkParse, { fragment: true })
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeMathJax)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        // .process(matterResult.content)
        .process(await read(fileName))

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export async function _getMd2Html(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8')
    const matterResult = matter(fileContent)

    const processedContent = unified()
        .use(remarkParse, { fragment: true })
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeMathJax)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        // .process(matterResult.content)
        .process(await read(fileName))

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export async function getAllPosts(dirName) {
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