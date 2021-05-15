---
Title: 自作のモジュールを他のディレクトリから持ってきたい!!
Date: '2020-09-03'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: python-add-path
Thumbnail: /images/thumbnails/python.jpg
Description:  機械学習の学習中に、他のディレクトリで作った自作関数が使いたかったのだけど、うまくimportする方法に悩みました。pythonがモジュールを探すpathをセットしてあげるだけで済んだので、その方法を解説します。
Published: true
---

他のディレクトリで作ったモジュールの*import*をさせたかったのですが、その方法がイマイチわからなくて詰まりました。

下の階層にあるなら"*.*"でつなげばいいのですが、階層を遡る必要があると困ったので解決策を提示します。

今回は下層にあるとして進めます。階層が深くなると.(ドット)による記述が無駄に長くなるので、ある程度この記述で冗長な記述も避けられるかな？？と思ったからです。

## やりたかったこと

他のディレクトリ内のモジュールを引っ張ってくる。

階層構造は以下のようにしてみる

~~~bash
--- target
    |      |
    |      |--- sample.py
    |
    |--- main.py  <-- 今ここ
~~~

で、直感的にやりたかったのがこれ

~~~python
@ main.py
from target.sample import Sample
~~~

これはできるんだけど、もし  
*from target.target1.target2.sample import Sample*  
とかだったらすごく萎えるよね...

## 【 解決策 】Pathにセットしてあげる

**sysとosを使って解決します!!**

先ほどの階層構造に則ると、参照して欲しいディレクトリはtargetですね。

先に手順を話すと以下になります。

1. sysとosのimport
2. os.getcwd()でカレントディレクトリを取得(今回は同じ階層のディレクトリにつながっているため)
3. sys.path.append()でPathを追加

この手順にのっとって書いてみます

~~~python
# 手順1
import sys
import os

# 手順2 & 3
sys.path.append(os.getcwd() + 'target')
from sample import Sample
~~~

一応これで対応できました。

もし仮に4層、5層...と続いてもpathをセットしておけば、探してくれるので大丈夫です。

階層を遡るときは、その都度pathにいれるパスを変えてみてください!!
