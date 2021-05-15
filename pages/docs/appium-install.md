---
Title: Appiumをインストールする!!
Date: '2020-07-29'
Category: JavaScript
Tags: [Appium, node.js]
Authors: ゆうぼう
Slug: appium-install
Thumbnail: /images/thumbnails/js.png
Description: iOSアプリの自動化できないかなとふと思った。いつもSelenium等を使って自動化をしているのでAppiumを使ってモバイルも自動化できないかと考えたわけ。そこでインストールの仕方を共有しようと思う。
Published: true
---

iOSアプリの自動化できないかなとふと思いました。いつもSelenium等を使って自動化をしているのでAppiumを使ってモバイルも自動化できないかと考えたわけです。そこでインストールの仕方を共有しようと思います。

今回僕はCLIでインストールをした。node.jsのインストールはすでにできていることを前提にお話をしていきます。

## 念のためnpmのアップデートをしておく

「npmの最新バージョンが出たので、アップデートできるよ。」とAppiumをインストールした直後に言われたので、先にやっておけば問題ないと思います。

ちなみに出たメッセージはこれです。

    │      New patch version of npm available! 6.14.5 → 6.14.7       │
    │   Changelog: https://github.com/npm/cli/releases/tag/v6.14.7   │
    │               Run npm install -g npm to update!                │

念のため最新版にする。

    npm install -g npm

問題が起こるのも嫌なのでアップデートしておきましたが、そこは好みでいいと思います。  
最新版でなくても一応インストールできていましたので。

## appiumをインストールする

**Appium**をnpm経由でインストールしていきます。

~~~bash
$ npm install -g appium    <- これを打つ

/usr/local/bin/authorize-ios -> /usr/local/lib/node_modules/appium/node_modules/.bin/authorize-ios
/usr/local/bin/appium -> /usr/local/lib/node_modules/appium/build/lib/main.js
+ appium@1.18.0
updated 1 package in 2.89s
~~~

これでエラーが出なければOKです。Appiumのインストールは完了。


## appium-doctorをインストールする

**Appium-doctor**をnpm経由でインストールしていきます。

これは、Appiumを使っていく際にインストールの不備がないか診断して、予め不備を発見できるツールです。早速インストールしていきましょう。

~~~bash
$ npm install -g appium-doctor    <- これを打つ

/usr/local/bin/appium-doctor -> /usr/local/lib/node_modules/appium-doctor/appium-doctor.js

> core-js@3.6.5 postinstall /usr/local/lib/node_modules/appium-doctor/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"

+ appium-doctor@1.15.3
added 269 packages from 252 contributors in 13.394s
~~~

こんな感じにインストールがされていくと思います。


これで最低限使うインストールは完了です。後ほど、appium-doctorのオプションなどについてもお話しして行こうかと思います。

今回はインストールまでとします。それでは!!!