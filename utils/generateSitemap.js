import fs from 'fs'
import path from 'path'

export function generateSitemap(
    siteUrl,
    top = '.next/server/pages',
    out = 'public',
    excludes = [],
) {
    let pages = [], currentDir = top, stackDir = []
    var {childrenDir, childrenFiles} = getChildren(currentDir)
    stackDir.push(...childrenDir)
    pages.push(...childrenFiles)
    while (stackDir.length > 0) {
        currentDir = stackDir.pop()
        var {childrenDir, childrenFiles} = getChildren(currentDir)
        stackDir.push(...childrenDir)
        pages.push(...childrenFiles)
    }
    
    pages = pages.filter(page => !excludes.includes(page))
    pages = pages.filter(page => page.match(/(\.html)$/))
    pages = pages.map(page => path.join(siteUrl, page.replace(top, '')))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
${pages
    .map(page => {
    const path = page
        .replace('/index', '')
        .replace('.html', '')
    return `
    <url>
        <loc>${path}</loc>
    </url>
            `
    })
    .join('')}
</urlset>
`
    fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap)

    return path.join(out, 'sitemap.xml')
}

const getChildren = (currentDir) => {
    const children = fs.readdirSync(currentDir)
    const childrenDir = children.filter(value => fs.statSync(path.join(currentDir, value)).isDirectory())
                            .map(dir => path.join(currentDir, dir))
    const childrenFiles = children.filter(value => fs.statSync(path.join(currentDir, value)).isFile())
                            .map(file => path.join(currentDir, file))
    
    return {childrenDir, childrenFiles}
}
