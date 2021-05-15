---
Title: scikit-learnのmake_blobsに乗り換えよう!!
Date: '2020-07-21'
Category: Python
Tags: [ML, Python, Scikit-learn]
Authors: ゆうぼう
Slug: prefer-to-make_blobs
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonではじめる機械学習をやっている最中に、mglearnというライブラリからmake_forge()メソッドでデータを生成することがあったのですが、Warningが出て怒られたので、推奨される形に戻すために互換性のあるコードに直します。
Published: true
---

一応参考書通りに学習するのだが、基本的にはいつも最新版をインストールして使う人間なもので、Warning及びErrorとの戦いはよくあることです。ので、Warningとかが出るとうっと身構えてしまうので、困らないように備忘録かつ反面教師として残しておきます。

## とりあえずmake_forge()をやってみようか

とりあえずmake_forge()でforgeデータを生成し、Warningさせてみますかね。。。

ライブラリはmglearnを使うのでpip環境がある人は、**pip install mglearn**をしてください。その上で、

~~~python
import mglearn    # mglearnのインポート
X, y = mglearn.datasets.make_forge()    # make_forgeメソッドで生成
~~~


以下がアウトプットです。

~~~bash
/Users/user/opt/anaconda3/envs/ML/lib/python3.6/site-packages/sklearn/utils/deprecation.py:86: FutureWarning: Function make_blobs is deprecated; Please import make_blobs directly from scikit-learn
warnings.warn(msg, category=FutureWarning)
~~~

なんだかWarningで怒られましたorz

将来的にsklearn.datasets.makeblobs()と被るよってことを言いたいらしいです。*scikit-learnから直接make_blobsをインポートしろ*とか言ってますね。
次からWarningを避けて行きます。

## make_blobsに乗り換える

make_blobsメソッドに乗り換えて行きます。これはscikit-learnのdatasetsモジュールに含まれているみたいなので、こいつをインポートして行きます。

~~~python
from sklearn.datasets import make_blobs    # これでインポート完了
~~~


インポートがうまくいったら次はメソッドを呼び出します。

~~~python
X, y = make_blobs()
~~~


これでデータがうまく生成されたようです。無事Warningも出てきません!!!
念のため、Xの型をみて行きます。

~~~python
print("X.shape: {}".format(X.shape))

# -> X.shape: (100, 2)
~~~

詰まるところ、2つの特徴量を持つデータが100個生成されました。100*2の行列ですね。
make_forge()のときは2つの特徴量のデータが26個を期待していたようなので、データ量が増えたみたいですね。

## まとめ

mglearn.datasets.make_forge()でWarningを回避する方法のまとめがこちらです。

~~~python
from sklearn.datasets import make_blobs    # インポート
X, y = make_blobs()    # make_blobsメソッドの実行

"""
確認のおまけ
"""
print("X.shape: {}".format(X.shape))

#-> X.shape: (100, 2)    # 特徴量を2つ持つ100個のデータ
~~~


scikit-learn周りは、アップデートが早いので少し古い技術書なだけでも、Future Warningが出たり、Errorが出たりすることが多々あります。
気をつけながら学習をする必要がありそうですね。では、今回はここまで！
