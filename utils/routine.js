import { generateRSS } from './genearateRSS.js'
import { generateRobotsTxt } from './generateRobots.js'
import { generateSitemap } from './generateSitemap.js'

// Main Routine
const siteName = 'ゆうぼうの書跡棚'
const siteUrl = 'https://yuta0306.github.io'
const siteDescription = 'スキルや知識をつけて将来ナマケモノになるまでの技術ブログです．主に，機械学習やPython, JavaScriptによる開発，読んだ論文についてまとめます．'
console.log('Generate some files before the build...')
const sitemap = generateSitemap('https://yuta0306.github.io')
const robotsTxt = generateRobotsTxt(sitemap)
await generateRSS("pages/docs", siteName, siteDescription, siteUrl)
console.log('completed!')