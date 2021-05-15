---
Title: JSで欲しい所だけを印刷するのすごく簡単だったってお話
Date: '2020-11-15'
Category: JavaScript
Tags: JavaScript
Authors: ゆうぼう
Slug: js-print
Thumbnail: /images/thumbnails/js.png
Description: 画面をプリントしたいときとかって、無駄な情報があってそれを排除してプリントしたり保存したりしたい時ってあるんですよね。そこの広告いらないから...みたいな。JavaScriptから簡単に操作して画面をPDF保存とかできたのでその共有をします。
Published: true
---

画面をプリントしたいときとかって、無駄な情報があってそれを排除してプリントしたり保存したりしたい時ってあるんですよね。そこの広告いらないから...みたいな。JavaScriptから簡単に操作して画面をPDF保存とかできたのでその共有をします。

## window.print() これだけでよかった

Webで開いている画面を印刷もしくはPDF文書として保存するときは、とても簡単。

~~~js
window.print()
~~~

この関数を使うだけで簡単に実行できました。

とは言っても、この関数を使ってできることは今ある全てのDOM構造を反映してしまうことですかね。いらん情報消したいなぁぁ......。

## いらないタグ一旦消してしまえ!!(終わったら勿論戻す)

さあ、そういうわけでいらない情報を消してしまお〜〜〜〜(暴論)

ただし、*window.print()*したあとは戻してあげます。

サンプルコードが以下です。

~~~js
let printer = () => {
    let body = document.getElementsByTagName('body')[0]
    let content = document.querySelector("#target")
    for (let child of body.children) {
        child.style.visibility = 'hidden'
    }
    content.style.visibility = 'visible'
    window.print()
    for (let child of body.children) {
        child.style.visibility = 'visible'
    }
}
~~~

これで欲しい部分だけ、基本的には印刷対象にできます。(例外はあると思う)

フローはこんな感じ

1. bodyと自分の欲しい所だけ押さえる
2. bodyタグの下にあるやつを全部*visibility: hidden*に
3. 欲しかったやつだけ*visibility: visible*に
4. **window.print()**で印刷
5. 全部*visibility: visible*に戻してあげる

他にも良い方法があるかもしれませんけど、今回はこれで。
