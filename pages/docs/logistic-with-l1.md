---
Title: ロジスティック回帰でL1正則化を利用できない問題の解決法
Date: '2020-08-01'
Category: Python
Tags: [ML, Python, Scikit-learn]
Authors: ゆうぼう
Slug: logistic-with-l1
Thumbnail: /images/thumbnails/network.jpg
Description: ロジスティック回帰をscikit-learnで実装していると、デフォルトはL2正則化でペナルティを与えています。そこで、もっとスパースにしてやろうとL1正則化を行おうとしたのだが、エラーを吐かれた。その時の解決策を共有します。
Published: true
---

ロジスティック回帰をscikit-learnで実装していると、デフォルトはL2正則化でペナルティを与えています。

そこで、もっとスパースにしてやろうとL1正則化を行おうとしたのだが、エラーを吐かれた。その時の解決策を共有します。

## エラーを吐かれた時のバージョン

一応最近開発が立て込んでいるので、Anacondaを使って開発環境を分けているのですが、

~~~bash
(base)$ conda activate ML
(ML)$ conda list    (pip listでも行ける)
......
......
scikit-learn           0.23.1    
......
~~~

ということで、scikit-learnのバージョンは*0.23.1*でした。

## 実装してみる

それでは実装してみます。至ってシンプルなスクリプトで動く想定でやっていきます。こちらで変化させるハイパーパラメータは以下になります。

| パラメータ | 値 |
| ---- | ---- |
| C(正則化のつよさ) | 1(デフォルト) |
| penalty | L1正則化 |
| max_iter(イテレーションの上限) | 100000 |

また、訓練データ(X_train, y_train)とテストデータ(X_test, y_test)に分けてあることにします。

~~~python
from sklearn.linear_model import LogisticRegression

lr_l1 = LogisticRegression(penalty='l1', max_iter=100000).fit(X_train, y_train)
~~~

するとこんなエラーが返ってきます。

~~~bash
~/opt/anaconda3/envs/ML/lib/python3.6/site-packages/sklearn/linear_model/_logistic.py in fit(self, X, y, sample_weight)
1302         The SAGA solver supports both float64 and float32 bit arrays.
1303         """
-> 1304         solver = _check_solver(self.solver, self.penalty, self.dual)
1305 
1306         if not isinstance(self.C, numbers.Number) or self.C < 0:

~/opt/anaconda3/envs/ML/lib/python3.6/site-packages/sklearn/linear_model/_logistic.py in _check_solver(solver, penalty, dual)
441     if solver not in ['liblinear', 'saga'] and penalty not in ('l2', 'none'):
442         raise ValueError("Solver %s supports only 'l2' or 'none' penalties, "
--> 443                          "got %s penalty." % (solver, penalty))
444     if solver != 'liblinear' and dual:
445         raise ValueError("Solver %s supports only "

ValueError: Solver lbfgs supports only 'l2' or 'none' penalties, got l1 penalty.
~~~

ファイルのありかは人それぞれですが、エラーは返ってきます。  
デフォルトの**Solverがlbfgs**に変わっていたそうで、l2またはnoneしかペナルティをサポートしていないそうです。

というわけで、Solverに**liblinear**を指定しないといけないようですね。

## liblinearを指定する

先ほどのエラーをなくすため、新たにパラメータを足します。

| パラメータ | 値 |
| ---- | ---- |
| C(正則化のつよさ) | 1(デフォルト) |
| penalty | L1正則化 |
| max_iter(イテレーションの上限) | 100000 |
| solver | liblinear |

では足します。

~~~python
from sklearn.linear_model import LogisticRegression

lr_l1 = LogisticRegression(penalty='l1', solver='liblinear', max_iter=100000).fit(X_train, y_train)
~~~

これで無事動くようになりました!!!

## まとめ

まとめです。  
scikit-learnを用いて、ロジスティック回帰を使う時、さらにL1正則化をかけたい時は**solver='liblinear'**を引数に追加しましょう。

この周りは色々と変化が早いので、本を買う際にも初版等も確認しつつ買った方が良い気がしました。バージョン確認も大切に。
