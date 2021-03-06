---
Title: 【JS】多次元配列を文字列に合わせてソートしたい!
Date: '2020-10-10'
Category: JavaScript
Tags: JavaScript
Authors: ゆうぼう
Slug: sort-mularr-by-str
Thumbnail: /images/thumbnails/js.png
Description: 一次元配列のソートは簡単だし、困るのは多次元配列です。しかも、よく記事になっているのは多次元配列の要素中の配列の数字に対してソートをよくやるんですよね〜。文字列でソートはどーやるん？と思って解決した方法を共有します。
Published: true
---

一次元配列のソートは簡単だし、困るのは多次元配列です。しかも、よく記事になっているのは多次元配列の要素中の配列の数字に対してソートをよくやるんですよね〜。文字列でソートはどーやるん？と思って解決した方法を共有します。(数値と全く方法は変わらないんですけどねww)

## やりたいこと

まずはやりたいことを整理します。

ソート対象リストを下のように定めます。

~~~js
arr = [
    ['戦士', 200],
    ['魔法使い', 50],
    ['勇者', 500],
    ['戦士', 220],
    ['商人', 120],
    ['魔法使い', 70]
]
~~~

期待する出力は以下になります。

~~~js
[
  [ '魔法使い', 50 ],
  [ '魔法使い', 70 ],
  [ '戦士', 200 ],
  [ '戦士', 220 ],
  [ '商人', 120 ],
  [ '勇者', 500 ]
]
~~~

もしくは逆でも良いですが。

## sortメソッドで独自Expressionを与えよう

それでは、*Array.prototype.sort()*メソッドを用いて、独自のExpressionを書くことでソートをしていきましょう。

メソッドの詳しい使い方はこちらを参照されたい。(多次元配列は詳しく書いていないので注意)[MDNリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort){:target="_blank"}

arrの要素のインデックス0番目を元にソートするコードはこちらです。

~~~js
let arr = [
    ['戦士', 200],
    ['魔法使い', 50],
    ['勇者', 500],
    ['戦士', 220],
    ['商人', 120],
    ['魔法使い', 70]
];

arr.sort((a, b) => {
    if (a[0] > b[0]) return -1;
    else if (a[0] < b[0]) return 1;
    else 0;
});

console.log(arr)
~~~

これによって、先のセクションでお話しした通りの結果が返ってきます。

うまくいった!!成功!!!!

数値でやろうが手法は一切変わりません。実は。

Array.prototype.sort()がどう動いていて、ソートをしているのか少し裏側が気になりますね。

ちょっと興味あったら連絡をください。自分も興味あるので、少し調査して記事にするかもしれません。需要があれば記事にするのでTwitterより連絡ください。
