import fs from 'fs'
import path from 'path'

import {getMd2Html} from './md2html'

export default function get_categories(dirName: string) {
    const fileNames = fs.readdirSync(dirName)
    const allPostData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(dirName, fileName)
        const content = getMd2Html(fullPath)

        return {
        slug,
        content,
        }
    })
    let categories = allPostData.map((data: any) => {
        let {content} = data;
        return content.Category
    })
    return [...new Set(categories)]
}