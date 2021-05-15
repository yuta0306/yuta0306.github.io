---
Title: 'invalid literal for int() with base 10: でint型のパースでエラーが！ '
Date: '2020-09-11'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: parse-int-base10
Thumbnail: /images/thumbnails/python.jpg
Description:  データ収集中にint型に文字列をパースすることがあったのですが、みるからに数値なのにエラーが返ってきました。これは何気にドツボでした。
Published: true
---

データ収集中にint型に文字列をパースすることがあったのですが、みるからに数値なのにエラーが返ってきました。これは何気にドツボでした。

## ValueErrorの発生

エラーを招いたコードの例がこちら

~~~python
a = np.array(['1.0', '2.0']).astype('int16')
~~~


実際に出たエラーがこちらです。

~~~bash
ValueError: invalid literal for int() with base 10:
~~~

エラー読んでもいまいち理解できませんでした。

正しくないリテラル...どういうこっちゃ!?

## 【原因】文字列が小数だった

原因は意外にもシンプルで、文字列の形が**小数**だったからみたいです...

他のコードで確認してみると

~~~python
a = np.array(['1', '2']).astype('int16')

# >> array([1, 2], dtype=int16
~~~


~~~python
a = np.array(['1.0', '2.0']).astype('float32')

# >> array([1, 2], dtype=float32)
~~~


小数であった時、floatへの変換はうまくいっているようです。


## 改善策

いったんfloatに変換してから、intに変換するとできます。遠回りですが。

~~~python
a = np.array(['1.0', '2.0']).astype('float32').astype('int16')

# >> array([1, 2], dtype=int16)
~~~

このようなエラーに直面したら、**配列の中身の文字列が少数になっていないか**確認してみましょう!!
