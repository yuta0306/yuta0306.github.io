---
Title: 【map】を使って新たな配列を作る
Date: '2020-10-26'
Category: Python
Tags: [Python, map]
Authors: ゆうぼう
Slug: py-map
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonにもmap関数があり、容易に配列から新たな配列を生み出すことができます。lambdaを用いて無名関数を使うなど、いくつか応用方があるので備忘録がてらまとめていこうと思います。
Published: true
---

Pythonにも**map関数**があり、容易に配列から新たな配列を生み出すことができます。*lambda*を用いて無名関数を使うなど、いくつか応用方があるので備忘録がてらまとめていこうと思います。

簡単のため、*ある配列の全ての要素の絶対値をとる*スクリプトで試します。

## mapと無名関数

新たに配列から配列を作るために忘れてはいけないのは、**mapオブジェクトをlistで囲むこと**です。

その点を考慮しつつ、新たな配列を生み出していきます。まずは、無名関数*lambda*を使います。

~~~python
a = [-3, -2, -1, 0, 1, 2, 3]
to_abs = lambda x: abs(x)

b = list(map(to_abs, a))
print(b)
~~~


~~~bash
[3, 2, 1, 0, 1, 2, 3]
~~~

無名関数*to_abs*により、渡される各関数の値の絶対値を返します。

## mapと普段使いの関数

普段通りの関数宣言でも動きます。

~~~python
def to_abs(x):
    return abs(x)
    
c = list(map(to_abs, a))
print(c)
~~~

~~~bash
[3, 2, 1, 0, 1, 2, 3]
~~~

普通に動きますが、ここで注意したいのは**mapに渡す関数に直接的に引数を与えないこと**です。

そうすることで難なく動きます。

引数を渡してみるとどうなるでしょうか。

~~~python
def to_abs(x):
    return abs(x)
    
c = list(map(to_abs(x), a))
print(c)
~~~

~~~bash
Traceback (most recent call last):
  File "map.py", line 3, in <module>
    c = list(map(to_abs(x), a))
NameError: name 'x' is not defined
~~~

参照する*x*がないのでエラーが発生します。その点だけ注意しましょう。

## mapでsetに応用

setについても同様に動作します

~~~python
d = set(map(to_abs, a))
print(d)
~~~

~~~bash
{0, 1, 2, 3}
~~~

しっかりと集合として捉えられていますね。

mapを使ってさせることはそこまで難しくないですが、処理速度的にはおそらく内包表記の方が速いと思われるので場合に合わせて導入するのが良いかもしれません。

ただ、numpyやpandasでデータ分析をする際は、map関数がそれぞれで与えられていることもあるので、使えるに越したことはないでしょう。
