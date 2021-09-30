---
Title: Pytorch, Herokuにはデカすぎる問題
Date: '2021-09-30'
Category: Python
Tags: ['Heroku']
Authors: ゆうぼう
Slug: heroku-install-torch
Description: 対話システムをサーバ上で動かせる体制を作るために，pytorchやら何やらをHerokuでinstallさせる必要があったのですが，pytorchちょっとデカすぎませんか？という状態でエラーが出てしまいました．その時の解消法です．
Published: true
---

対話システムをサーバ上で動かせる体制を作るために，pytorchやら何やらをHerokuでinstallさせる必要があったのですが，**pytorchちょっとデカすぎませんか？**という状態でエラーが出てしまいました．その時の解消法です．

## Pytorchデカすぎませんか？

Herokuはデプロイ時には，500MBに収まる必要があるのですが，  
まさかのpytorchは**831.4 MB**.

は？

![Pytorchの容量](/images/article/torch-weight.png)

正直焦りました．

躓くところ，そことは想定していなかったので（笑）

なんとか500MBに収める方法次に紹介します．

## 【解消法】 CPUのみ対応版をinstallさせる

色々調べてみたところ，原因は，**CPU/GPU両対応のため色々入って重い**ことらしいです．

そういうことなので，CPUのみに対応させることにしました．(HerokuもCPUしか動作させられないので...)

requirements.txtを多少工夫します．

### 変更前のrequirements.txt

~~~python
...
torch==1.9.0
...
~~~

### 変更後のrequirements.txt

インターネット上のファイルを参照させます．

~~~python
-f https://download.pytorch.org/whl/torch_stable.html
torch==1.9.0+cpu
~~~

こうすることで，どうしてもサイズがでかいままですが，元よりはかなり圧縮できました．

![Pytorch軽量後の容量](/images/article/torch-cpu-weight.png)

831.4 → 175.5ダウンなので，かなり軽量化した感じがします．

## やってみたけどダメだったこと

上記のCPUのみ対応版にする前にやってみたが，ダメだったことがあります．

デプロイ後に，「*pip install torch*」を含むrun.shを走らせてインストールさせることです．

うまくいくと思ったのですが，重すぎてOut of Memoryでした...