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
import RSS from 'rss'
import unified from 'unified'
// import { siteDescription, siteName, siteUrl } from '../global.d'

async function getPosts(dirName) {
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

function _getMd2Html(fileName) {
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
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    }
}

export async function generateRSS(dirName, siteName, siteDescription, siteUrl) {
    const feed = new RSS({
        title: siteName,
        description: siteDescription,
        site_url: siteUrl,
        feed_url: path.join(siteUrl, "feed"),
        language: 'ja',
    });

    // 例としてpostsを含めるイメージ
    // このあたりの書き方はライブラリのドキュメントを参考にしてください
    const posts = await getPosts(dirName);
    posts?.forEach(({ slug, content }) => {
        feed.item({
            title: content.Title,
            description: content.Description,
            date: new Date(content.Date),
            url: `${siteUrl}/${slug}`,
        });
    })
    const xml = feed.xml();
    fs.writeFileSync(path.join("public", "feed.xml"), xml)
}