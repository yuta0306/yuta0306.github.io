---
Title: スマホにも:hoverを対応させてみる
Date: '2020-07-10'
Category: Web
Tags: [HTML,CSS]
Authors: ゆうぼう
Slug: touch-device-hover
Thumbnail: /images/thumbnails/web.png
Description: デフォルトでいつものようにCSSを書いていると、スマホなどのタッチデバイスでは、:hoverや:activeが適応されません。今となってはモバイルファーストの社会です。スマホにも適用してみましょう。
Published: true
---

## スマホに:hoverを適用させる方法

よく:hoverや:activeを使ってHTMLの装飾を行うと思います。

しかし、おそらくあらゆるパターンに対応し切れておらす、モバイルファーストの社会の今、スマホでは:hover等が適応されていないといった問題を抱える方も多いでしょう。

この解決方法はとても単純です。

~~~html
<body ontouchstart="">
~~~

もしくは

~~~html
<body ontouched="">
~~~

たったこれだけでOKです!!!
