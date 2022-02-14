const path = require('path')
const withTM = require('next-transpile-modules')(
  ["remark-rehype", "rehype-parse", "rehype-stringify", "rehype-highlight",
    "micromark-util-sanitize-uri", "micromark-util-character", "micromark-util-encode",
    "hast-util-from-parse5", "hastscript", "hast-util-parse-selector", "hast-util-to-text",
    "unist-util-find-after", "vfile-location", "web-namespaces"]
)

module.exports = withTM({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'components')],
  },
})
