---
Title: Scikit-learnのGroupKFoldでgroups配列でWarning発生!!
Date: '2020-08-18'
Category: Python
Tags: [Scikit-learn, Python]
Authors: ゆうぼう
Slug: groupfold-groups
Thumbnail: /images/thumbnails/network.jpg
Description: Pythonで始める機械学習でお勉強中にFutureWarningに遭遇しました。GroupKFoldで起こったのですが、とりあえず今は使えるもののこの先使えなくなることが示されているので修正します。
Published: true
---

Pythonで始める機械学習でお勉強中にFutureWarningに遭遇しました。GroupKFoldで起こったのですが、とりあえず今は使えるもののこの先使えなくなることが示されているので修正します。

## FutureWarningを発生させてみる

少し前の書籍の型に合わせてコードを書いてみます。~FutureWarning~が発生するはずです。

~~~python
@python

from sklearn.model_selection import GroupKFold  # グループ交差検証
from sklearn.datasets import make_blobs  # 合成データ生成

# 合成データセットを生成
X, y = make_blobs(n_samples=10, random_state=0)
# 最初の2サンプルが同じグループに、次の4つが同じグループに
groups = [0, 0, 1, 1, 1, 1, 3, 3, 4, 4]
scores = cross_val_score(logreg, X, y, groups, cv=GroupKFold(n_splits=3))
print("Cross-validation scores:\n{}".format(scores))
~~~

おそらくこの型が少し前の技術書の仕様だと思います。*Pythonで始める機械学習*もこの型でした。

結果をみてみます。

~~~bash
Cross-validation scores:
[0.5 1.  1. ]
/Users/user/opt/anaconda3/envs/ML/lib/python3.6/site-packages/sklearn/utils/validation.py:71: 
FutureWarning: Pass groups=[0, 0, 1, 1, 1, 1, 3, 3, 4, 4] as keyword args. 
From version 0.25 passing these as positional arguments will result in an error
FutureWarning)
~~~

こんな感じのWarningが発生します。

最後の方を読んでみると、**バージョン0.25からはgroups配列は位置引数としてだとエラーになるよ**みたいな感じのことを言っています。改善方法は至ってシンプルです。  
次に示します。

## 改善策

改善策は至ってシンプルです。

**groups=(グループ配列)**にすればいいのです。直したコードを示します。

~~~python
@python

from sklearn.model_selection import GroupKFold  # グループ交差検証
from sklearn.datasets import make_blobs  # 合成データ生成

# 合成データセットを生成
X, y = make_blobs(n_samples=10, random_state=0)
# 最初の2サンプルが同じグループに、次の4つが同じグループに
groups = [0, 0, 1, 1, 1, 1, 3, 3, 4, 4]
scores = cross_val_score(logreg, X, y, groups=groups, cv=GroupKFold(n_splits=3))
print("Cross-validation scores:\n{}".format(scores))
~~~

直したのはこの部分

~~~python
scores = cross_val_score(logreg, X, y, groups=groups, cv=GroupKFold(n_splits=3))
~~~

単に*groups=groups*にするだけです。これだけで直ります。

やはりFutureWarningが多いですね〜この周りは。
