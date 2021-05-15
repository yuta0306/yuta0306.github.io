---
Title: classの標準出力を特殊な文字列にしたい【__str__|__repr__】
Date: '2020-10-12'
Category: Python
Tags: [Python, 特殊メソッド, オブジェクト指向]
Authors: ゆうぼう
Slug: py-class-repr
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonでクラスのインスタンスを生成して格納した変数を出力すると、class名とメモリ番地みたいなやつが出力されてしまいます。Pythonユーザーで機械学習とかで遊んでいる方はわかると思いますが、*numpy*はnp.ndarrayというクラスを持ちながら出力では行列が出力されます。線形代数計算ライブラリを自作している際、そのような特殊な出力にしたいことがありました。実際に行った方法をお話しします。
Published: true
---

Pythonでクラスのインスタンスを生成して格納した変数を出力すると、class名とメモリ番地みたいなやつが出力されてしまいます。Pythonユーザーで機械学習とかで遊んでいる方はわかると思いますが、*numpy*はnp.ndarrayというクラスを持ちながら出力では行列が出力されます。線形代数計算ライブラリを自作している際、そのような特殊な出力にしたいことがありました。実際に行った方法をお話しします。

正直タイトルにあるように、出落ちなのですが......

*\_\_str\_\_*というPython独自の特殊メソッドを用いて、やりたいことを実現していきたいと思います。

## やりたいこと

まずは、実際にやりたいことを明確にしていきます。*numpy*のような物を参考にしますが、今回は簡単のため、*Scalar*クラスを作ります。

このクラスは、数値(intもしくはfloat)を受け取って、それを*data*として格納させます。

求める最終形はこちらです。

~~~python
>>> scalar = Scalar(5)
>>> print(scalar)
Scalar(5)
~~~

本来であれば、*<\_\_main\_\_.Scalar object at 0x7f85f3a00150>*のように表されてしまいますが、*Scalar(5)*というような特殊文字列にします。

## Scalarクラスを作る

さて、これから*Scalar*クラスを作ります。

初めは、最低限クラスとして機能するようなコードを書いていきます。

Scalarクラスの仕様は以下とします。

- インスタンス生成時に*int*又は*float*を受け取る
- 上の条件以外ならば、TypeErrorを発出

これらの条件を満たすようにクラスを書いたのが以下になります。

~~~python
class Scalar:
    def __init__(self, data):
        if isinstance(data, int) or isinstance(data, float):
            self.data = data
        else:
            raise TypeError('expect int or float, but {}', type(data))
~~~


これでメインルーティンを書いていきます。

以下を試してみます。

- intを入力
- floatを入力
- listを入力

さて、書きたします。先ほどのクラスを書いたファイルを拡張していきます。

~~~python
class Scalar:
    def __init__(self, data):
        if isinstance(data, int) or isinstance(data, float):
            self.data = data
        else:
            raise TypeError('expect int or float, but {}', type(data))
            
if __name__ == "__main__":
    scalar = Scalar(3)
    print(scalar)
    scalar = Scalar(3.0)
    print(scalar)
    scalar = Scalar([3])
    print(scalar)
~~~

ターミナルで実行してみます。

~~~bash
$ python scalar.py
<__main__.Scalar object at 0x7fddd4300150>
<__main__.Scalar object at 0x7fddd4300190>
Traceback (most recent call last):
  File "scalar.py", line 13, in <module>
    scalar = Scalar([3])
  File "scalar.py", line 6, in __init__
    raise TypeError('expect int or float, but {}', type(data))
TypeError: ('expect int or float, but {}', class 'list')
~~~


3と3.0の入力は受け取れましたが、どうやら\[3\]の入力は期待した通りエラーを出してくれています。

しかし、やはりこのままではクラスをそのまま出力してしまっています。

## 【__str__】の出番

それでは、\_\_str\_\_という特殊メソッドを用いて、出力結果を変更していきます。

先までのクラスを以下のように変えていきます。

~~~python
class Scalar:
    def __init__(self, data):
        if isinstance(data, int) or isinstance(data, float):
            self.data = data
        else:
            raise TypeError('expect int or float, but {}', type(data))
            
    <span class="comment"># 以下を追加
    def __str__(self):
        return 'Scalar({})'.format(self.data)
~~~

最後の2行を追加する感じです。

それでは、*int*と*float*以外はエラーを出すことを確認しているのでメインルーティンも同時に変えて以下のファイルとして完成させましょう。

~~~python
class Scalar:
    def __init__(self, data):
        if isinstance(data, int) or isinstance(data, float):
            self.data = data
        else:
            raise TypeError('expect int or float, but {}', type(data))
            
    def __str__(self):
        return 'Scalar({})'.format(self.data)
        
if __name__ == "__main__":
    scalar = Scalar(3)
    print(scalar)
    scalar = Scalar(3.0)
    print(scalar)
~~~


この出力結果はどうなるでしょうか......(ドキドキ??)

~~~bash
$ python scalar.py
Scalar(3)
Scalar(3.0)
~~~

期待した通りの結果ですね!!

このように、クラスのインスタンスの出力を制御するには**__str__**という特殊メソッドを使うと良いみたいです。

ただし、**__repr**というものもあります。今回のソースに関しては正直いうと、この**__repr__**の方が適している気がします。(evalを使えば可逆的に戻すことができるため)

詳しくはこちらを参照されたい([https://docs.python.org/ja/3/reference/datamodel.html](https://docs.python.org/ja/3/reference/datamodel.html))

## 今回のソースの推奨

~~~python
class Scalar:
    def __init__(self, data):
        if isinstance(data, int) or isinstance(data, float):
            self.data = data
        else:
            raise TypeError('expect int or float, but {}', type(data))
    def __repr__(self):
        return 'Scalar({})'.format(self.data)
        
if __name__ == "__main__":
    scalar = Scalar(3)
    print(scalar)
    scalar = Scalar(3.0)
    print(scalar)
~~~
