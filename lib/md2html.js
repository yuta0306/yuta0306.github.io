import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import rehypeDocument from 'rehype-document'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import remarkMath from 'remark-math'


export async function getMd2Html(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8')
    const matterResult = matter(fileContent)

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remark2rehype)
        .use(rehypeKatex)
        .use(rehypeDocument, {
            css: 'https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css'
        })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export function _getMd2Html(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8')
    const matterResult = matter(fileContent)

    const processedContent = unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remark2rehype)
        .use(rehypeKatex)
        .use(rehypeDocument, {
            css: 'https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css'
        })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(matterResult.content)

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