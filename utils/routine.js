import { generateRobotsTxt } from './generateRobots.js'
import { generateSitemap } from './generateSitemap.js'

// Main Routine
console.log('Generate some files before the build...')
const sitemap = generateSitemap('https://yuta0306.github.io')
const robotsTxt = generateRobotsTxt(sitemap)
console.log('completed!')