import fs from 'fs'
import path from 'path'

export function generateRobotsTxt(
    sitemapPath,
    excludes = [],
    out = 'public'
) {
    const disallows = excludes.map(page => `Disallow: ${page}`).join('\n') || 'Disallow: '
    const content = `User-Agent: *
${disallows}

Sitemap:${sitemapPath}`
    fs.writeFileSync(path.join(out, 'robots.txt'), content)
    return content
}
