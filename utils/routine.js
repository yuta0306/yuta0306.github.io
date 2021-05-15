import { generateSitemap } from './generateSitemap.js'
import { generateRobotsTxt } from './generateRobots.js'

// Main Routine
const sitemap = generateSitemap('https://yuta0306.github.io')
const robotsTxt = generateRobotsTxt(sitemap)
console.log(robotsTxt)