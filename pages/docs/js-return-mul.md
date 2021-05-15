---
Title: JSで返り値にパラメータを複数設定する
Date: '2020-10-10'
Category: JavaScript
Tags: JavaScript
Authors: ゆうぼう
Slug: js-return-mul
Thumbnail: /images/thumbnails/js.png
Description: PythonとかGoとかだとそのまま返り値を複数セットしてもしっかり戻るのですが(Pythonの場合はタプルで返る)、JavaScriptだとreturn a, b;のようなシンプルな書き方だと動作しません。少し特殊な書き方になるのですが、解決策を共有します。
Published: true
---

PythonとかGoとかだとそのまま返り値を複数セットしてもしっかり戻るのですが(Pythonの場合はタプルで返る)、JavaScriptだと*return a, b;*のようなシンプルな書き方だと動作しません。少し特殊な書き方になるのですが、解決策を共有します。

(端的に言えば、オブジェクトもしくは配列を返すということですが...)

## 【解決策】return {}

ここでは、簡単に与えた二つの変数に格納した値を交換するswapを行ってみましょう。

~~~js
let swap = (a, b) => {
    let tmp = a;
    a = b;
    b = tmp;

    return {a, b};
}

var a = 1, b = 2;

var {a, b} = swap(a, b)
console.log({a, b});
~~~


この出力は*a: 2, b: 1*になります。(コードすごくくどくて無駄な処理しかないですが、ここでは言及しないでくださいww)

ただし、この方法には注意点があります。

次のセクションでお話しします。

## 【注意点】戻す変数名との対応

このコードで注意したいことは、戻す変数名との対応関係です。次のようにコードを書き換えてみましょう。

~~~js
let swap = (a, b) => {
    let tmp = a;
    a = b;
    b = tmp;

    return {a, b};
}

var a = 1, b = 2;

var {b, a} = swap(a, b)  // ここを変更
console.log(`b: ${b}, a: ${a}`);  // ここを変更
~~~


ここで期待したい結果は*b: 2, a: 1*です。
しかし、結果は以下のようになります。

~~~bash
b: 1, a: 2
~~~

つまり、**returnする変数名と戻す変数名は対応関係になっている**という事になります。

複数の返り値を設定できればかなりコードが裕福になると思います。Cとかだと複数あればポインタで処理しなければいけないので...

これでJSで複数の返り値を設定することができました。是非活用してみてください。~~(詳しく調べてないけどこれはESの仕様...!?)~~

追記: {a, b}は{a: a, b: b}と同地であり、これは**オブジェクトの省略**による記法みたいです。オブジェクトに限らずリストで返すこともできるみたい(できた)。

詳しくはこちらを参照されたい[https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

*{}*で囲むことを忘れずに。
