---
Title: npm@8.13.2へのupgradeでCannot find module 'agentkeepalive'
Date: '2022-07-10'
Category: JavaScript
Tags: [npm, Node, JavaScript]
Authors: ゆうぼう
Slug: npm-upgrade-to-v8-error
Thumbnail: /images/thumbnails/js.png
Description: 最近Node.jsで開発をしていなくてバージョンを放置していたのですが，久々にNodeを使った開発の機運が高まったのでNodeとnpmのバージョンを更新しようと思ったのですが．`Cannot find module 'agentkeepalive'`と出て上手くいかず．対処法は簡単だったのですが，備忘録として．
Published: true
---

最近Node.jsで開発をしていなくてバージョンを放置していたのですが，久々にNodeを使った開発の機運が高まったのでNodeとnpmのバージョンを更新しようと思ったのですが．

`Cannot find module 'agentkeepalive'`と出て上手くいかず．対処法は簡単だったのですが，備忘録として残します．

## npmをupgradeする

とりあえず`npm@8.13.2`へupgradeします．

~~~js
npm install -g npm@8.13.2

npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'npm@8.13.2',
npm WARN EBADENGINE   required: { node: '^12.13.0 || ^14.15.0 || >=16' },
npm WARN EBADENGINE   current: { node: 'v14.0.0', npm: '7.10.0' }
npm WARN EBADENGINE }
npm ERR! code MODULE_NOT_FOUND
npm ERR! Cannot find module 'agentkeepalive'
npm ERR! Require stack:
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/make-fetch-happen/agent.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/make-fetch-happen/index.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/npm-registry-fetch/index.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/pacote/lib/remote.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/pacote/lib/git.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/pacote/lib/fetcher.js
npm ERR! - /usr/local/lib/node_modules/npm/node_modules/pacote/lib/index.js
npm ERR! - /usr/local/lib/node_modules/npm/lib/utils/update-notifier.js
npm ERR! - /usr/local/lib/node_modules/npm/lib/cli.js
npm ERR! - /usr/local/lib/node_modules/npm/bin/npm-cli.js
~~~

`Cannot find module 'agentkeepalive'`とのことで，agentkeepaliveというモジュールが存在しないせいでupgradeできないらしいです．

## globalで`agentkeepalive`をinstallする

足りない`agentkeepalive`モジュールをインストールします

~~~js
npm install -g agentkeepalive --save
~~~

一応Nodeのバージョンが16以上じゃないとwarningが出るので，NodeのバージョンもLTSかlatestまであげていた方が無難なんですかね．

## もう一回npmのupgradeを試みる

~~~js
npm install -g npm@8.13.2           

removed 68 packages, changed 13 packages, and audited 202 packages in 3s

11 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
~~~

これでエラーは出ずに無事にupgradeできるはずです．

## まとめ

npmのupgrade時に，`npm ERR! Cannot find module 'agentkeepalive'`が出たら，以下の手順を踏んでやります．

1. `npm install -g agentkeepalive --save`
2. `npm install -g npm@8.13.2 `

これで多分いけるはずです．

久々のブログ更新，久々のNode開発．楽しみたいと思います．