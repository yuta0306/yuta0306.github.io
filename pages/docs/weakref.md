---
Title: 【weakref】弱い参照によってメモリ管理をする
Date: '2020-10-12'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: weakref
THUMBNAIL: python.jpg
Description: ディープラーニングとか、とにかく複雑でメモリを使用するような計算処理が家庭用パソコンでもできる時代になりました。(そーゆー時代しか生きていないんですけど)とはいえ、メモリを意識せずともプログラムをかけているのは最適化されたライブラリを使っているからなわけで。。。そんなわけで自分でもメモリ管理を気をつけたいわけです。そこで、弱参照によって、うまいことPython処理系にメモリの破棄を促す方法をお話ししていきます。
Published: true
---

ディープラーニングとか、とにかく複雑でメモリを使用するような計算処理が家庭用パソコンでもできる時代になりました。(そーゆー時代しか生きていないんですけど)とはいえ、メモリを意識せずともプログラムをかけているのは最適化されたライブラリを使っているからなわけで。。。そんなわけで自分でもメモリ管理を気をつけたいわけです。そこで、弱参照によって、うまいことPython処理系にメモリの破棄を促す方法をお話ししていきます。

## Pyton処理系のお話

さて、これまでPythonを触ってきた僕ですが、メモリ管理を意識したことはほっとんどなく、大学の授業でC言語を学んだ際、低レイヤーの処理に少し不慣れで難しさを感じました。

それくらいPython処理系はメモリ管理を強く意識させることはないということなのでしょう。

それで、Python処理系は基本的には、**オブジェクトが参照される回数をカウント**して、参照するものがなくなった段階でメモリを破棄する。そんなイメージらしい。

つまり、循環参照のような状態に陥ると、**ユーザからは参照できないにもかかわらず、メモリに残ってしまう**ということが発生するそうです。(他の手法でメモリが消されるのだろうが、こちらの消えて欲しいタイミングで消せることをメモリ管理と今回は考える)

## メモリが即座に消されるパターン

以下が、参照カウント(あるオブジェクトを参照するものの数)によってきれいに即座にメモリが破棄されるパターンです。

~~~python
class object:
    pass
    
def func(a):
    print(a)
    
a = object()  # a: 参照カウント 1
b = object()  # b: 参照カウント 1
c = object()  # c: 参照カウント 1

a.b = b  # b: 参照カウント 2
b.c = c  # c: 参照カウント 2

a = b = c = None  # メモリ破棄(a, b, c: 参照カウント 0)</code>
~~~

## 循環参照により即座に破棄されないパターン

続いて、循環参照を起こしてみます。これによって、長い間メモリに**ユーザが参照できないオブジェクトが残ってしまいます**。

~~~python
# ライブラリをインポート
import weakref

class object:
    pass
    
def func(a):
    print(a)
    
a = object()  # a: 参照カウント 1
b = object()  # b: 参照カウント 1
c = object()  # c: 参照カウント 1

# 以下を弱参照で循環させる
a.b = b  # b: 参照カウント 2
b.c = c  # c: 参照カウント 2
c.a = a  # a: 参照カウント 2
# 以下でメモリが破棄されているか参照する
a_ref = weakref.ref(a)
b_ref = weakref.ref(b)
c_ref = weakref.ref(c)

a = b = c = None  # メモリ破棄できない(a, b, c: 参照カウント 1)

print(a_ref, b_ref, c_ref)</code>
~~~


出力はこんな感じです

~~~bash
<weakref at 0x7fc5e3a49bf0; to 'object' at 0x7fc5e3a40150> <weakref at 0x7fc5e3a49c50; to 'object' at 0x7fc5e3a40190> <weakref at 0x7fc5e3a49cb0; to 'object' at 0x7fc5e3a40250>
~~~

破棄されていれば*dead*と書かれるはず...

やはりダメですね。弱参照で破棄させましょう。

## weakrefで改良

先ほどの問題を、*weakref.ref*を用いて、弱参照とすることで参照カウントを行わないように設定します。

そうすることで参照カウントが最終的に0になり、メモリをPython処理系によって即座に破棄されることができます。

~~~python
# ライブラリをインポート
import weakref

class object:
    pass
    
def func(a):
    print(a)
    
a = object()  # a: 参照カウント 1
b = object()  # b: 参照カウント 1
c = object()  # c: 参照カウント 1

# 以下を弱参照で循環させる
a.b = weakref.ref(b)  # b: 参照カウント 0
b.c = weakref.ref(c)  # c: 参照カウント 0
c.a = weakref.ref(a)  # a: 参照カウント 0
# 以下でメモリが破棄されているか参照
a_ref = weakref.ref(a)
b_ref = weakref.ref(b)
c_ref = weakref.ref(c)

a = b = c = None  # メモリ破棄(a, b, c: 参照カウント 0)

print(a_ref, b_ref, c_ref)</code>
~~~


出力がこんな感じ。

~~~bash
<weakref at 0x7f868932dcb0; dead> <weakref at 0x7f868932dbf0; dead> <weakref at 0x7f868932dc50; dead>
~~~

全て*dead*になっていますね。これで期待した通りのタイミングでメモリを破棄することができました!!!

時には低いレイヤーまで考えてみるのも楽しいものですね。(時にはです。意識しなくていいことが幸せ)
