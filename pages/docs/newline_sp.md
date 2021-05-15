---
Title: sp仕様(スマホ)の時のみ改行したい!!
Date: '2020-07-10'
Category: Web
Tags: [HTML,CSS]
Authors: ゆうぼう
Slug: only_sp_newline
Thumbnail: /images/thumbnails/web.png
Description: スマホのように小さい画面になるとおかしなところで改行してみにくい。そんな時のCSSのTipsを紹介します。
Published: true
---

## 改行する方法
全パターンに対応するためのHTMLのタグは**<br>**タグです。

実際にコードを書くとこんな感じです。

~~~html
<p>テキストテキストテキストテキストテキス<br>テキストテキスト</p>
~~~

しかしこのままでは、画面幅によって<br>以外のところで改行する可能性があります。

## スマホの時だけ改行する
前のセクションの書き方ではうまくいかないことがあります。

明示的に改行させたいタグにCSSを書いてあげましょう。

するとこんな感じ。

~~~html
<p>テキストテキストテキストテキストテキス<br class="sp">テキストテキスト</p>
~~~

~~~css
/* デフォルトでは表示しない */
.sp {
    display: none;
}
/* 768px以下の時だけbrを表示する */
@media screen and (max-width: 768px) {
    .sp {
        display: block;
    }
}
~~~

たったこれだけで、画面幅に合わせた改行の管理ができました。

是非頭の片隅に入れながらコーディングをしてみてください。
