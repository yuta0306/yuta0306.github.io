const path = require('path')
const withTM = require('next-transpile-modules')(
  ["remark-rehype", "remark-math", "rehype-parse", "rehype-stringify", "rehype-highlight", "rehype-document", "rehype-katex",
    "micromark-util-sanitize-uri", "micromark-util-character", "micromark-util-encode", "micromark-extension-math", "micromark-factory-space",
    "hast-util-from-parse5", "hastscript", "hast-util-parse-selector", "hast-util-to-text",
    "unist-util-find-after", "unist-util-remove-position", "vfile-location", "web-namespaces",
    "mdast-util-math"]
)

module.exports = withTM({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'components')],
  },
})
