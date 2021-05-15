---
Title: pickleでロードした時pandasがあるのに"No module ~~"で悩んだ件について
Date: '2020-09-10'
Category: Python
Tags: [Python, Pandas]
Authors: ゆうぼう
Slug: pandas-nomodule
Thumbnail: /images/thumbnails/python.jpg
Description:  Macは普段使いなので、あまり情報収集に使いたくなかったために、常時Windowsのノートパソコンを情報収集ボットとしようとしました。その時コードの共有をDropboxを用いたのですが、なぜかいくらpandasを入れても"No module named 'pandas.core.internals.managers'; 'pandas.core.internals' is not a package"というエラーが。。。その原因がわかったのでそのお話をします。
Published: true
---

Macは普段使いなので、あまり情報収集に使いたくなかったために、常時Windowsのノートパソコンを情報収集ボットとしようとしました。

その時コードの共有をDropboxを用いたのですが、なぜかいくらpandasを入れても  
*"No module named 'pandas.core.internals.managers'; 'pandas.core.internals' is not a package"*  
というエラーが...

その原因がわかったのでそのお話をします。

## "No module"エラーの発生!?

前述したとおり、環境の違う状態でコードを共有したわけです。

確認してみると、やはりpandasのバージョンが違っていました。他の記事でも採算を話をしていますが、機械学習によく使われるライブラリたちは特段アップデートが早く、さらに大幅な変更も多い印象です。

実際に起こった原因は、**pickleに入れたpandasとロード先のpandasのバージョンの違い**でした。

実際の僕のバージョンは以下でした。

| 対象 | pandasのバージョン |
| ---- | ---- |
| 以前のpandas | 0.24.2 |
| 移植先のpandas | 0.23.1 |

そのバージョンが違うと次のようなエラーが出ることがあります。

~~~bash
"No module named 'pandas.core.internals.managers'; 'pandas.core.internals' is not a package"
~~~

上のようなモジュールがないよ！！

と怒られるわけです。

なので、次の解決策を示します

- 再度データを作り直す
- 前の環境を調べてinstallし直す
- 前の環境にrequirements.txtを作成しておいて同じ環境を立てる

次のセクションでお話をします。

## 再度データを作り直す

このやり方はいうまでもないですが、もう一度作り直す方法です。

前の環境がわからないなど、どうしようもない時はこの方法で太刀打ちすれば良いかと思います

~~~python
import pandas as pd
import pickle

df = pd.DataFrame()
with open('sample.pickle', 'wb') as f:
    pickle.load(df, f)
~~~

といったように、現状の環境で作り直す方法です。

## 前の環境を調べてinstallし直す

前の環境でのバージョンが分かっていれば入れ直せば良いでしょう。

~~~bash
$ pip install pandas=='your pandas version'
~~~

これで特定のバージョンのpandasを入手できるはずです。

## 前の環境にrequirements.txtを作成しておいて同じ環境を立てる

前の環境が目の前にあるならば、以下のようにして*requirements.txt*を作成してしまえば早いでしょう。

~~~bash
$ pip freeze > requirements.txt
~~~


~~~bash
# 新しい環境にて
$ pip install -r requirements.txt
~~~

これで以前と同じ環境が整うので、心配なく動くと思います。
