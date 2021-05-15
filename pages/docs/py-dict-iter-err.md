---
Title: dictionary changed size during iterationの原因特定した
Date: '2020-10-18'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: py-dict-iter-err
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonで中身をpopで削除したいなーと思った時、なぜか「dictionary changed size during iteration」とのメッセージが。これは意外と出てきたら原因がパッとしないので、2度と同じことを起こさないように記録しておきます。
Published: true
---

Pythonで中身をpopで削除したいなーと思った時、なぜか「*dictionary changed size during iteration*」とのメッセージが。これは意外と出てきたら原因がパッとしないので、2度と同じことを起こさないように記録しておきます。

## 直感的にイテレーションしてpopしていく

ここでは、直感的に初心者が思いつきそうな感じのイテレーションを用いてループを回し、popで辞書を消していきます。

~~~python
dictionary = {
    'a': 0,
    'b': 1,
    'c': 2,
}

for key in dictionary.keys():
    dictionary.pop(key)
~~~

結果はこんな感じに...

~~~bash
Traceback (most recent call last):
  File "<stdin>", line 6, in <module>
RuntimeError: dictionary changed size during iteration
~~~

は？*RuntimeError*だと...!?

**イテレーション中に辞書のサイズ変わったんですけど**と怒られたわけです。

ということは、**keys()を使っていながら、ループの内部で辞書をいじってはいけない**ということになりますね。

## keys()をリストとして先に確保してしまえ!!

さて、解決していきます。

イテレーション中の辞書を書き換えてはいけなかったので、*list()*にしてしまお〜〜  
ということで、キーのイテレータは配列として別物と扱わせます。

少しだけ変えた奴が下。

~~~python
dictionary = {
    'a': 0,
    'b': 1,
    'c': 2,
}

for key in list(dictionary.keys()):    <=変えるのはここ
    dictionary.pop(key)
~~~

これで、出力も足してみます。

~~~python
print(a)
~~~

結果が以下になります。

~~~bash
1
~~~

お〜動きましたね。

というわけで、辞書型でイテレーションを用いて何かするときは、配列とかで切り離して使ってあげるとエラーなくコードが動きますよ〜

今後は僕も気をつけたいと思います。
