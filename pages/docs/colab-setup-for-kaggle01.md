---
Title: KaggleのためのColabスターターを考える【第一話】
Date: '2021-05-23'
Category: Competition
Tags: ['Kaggle', 'Google Colaboratory']
Authors: ゆうぼう
Slug: colab-setup-for-kaggle01
Description: Kaggle何もわからない状態でしたが，やはりKaggle Notebookだとセッション時間の制限等が厳しかったです...そこで，Kaggleから逃げない対策としてもColab Proに課金してしまいました．KaggleのためのColaboratoryの使い方を考えます．
Published: true
---

Kaggle何もわからない状態でしたが，やはりKaggle Notebookだとセッション時間の制限等が厳しかったです...

そこで，Kaggleから逃げない対策としてもColab Proに課金してしまいました．KaggleのためのColaboratoryの使い方を考えます．

初心者なりに考えたスターターです(まだ🍊)


## KaggleをColabでするために必要だと思った条件

- Google Colab Pro
- Google Drive 200GB

これで大体**月1400円**ですかね〜〜．まぁ，安い．大学生なのに200万ちょいはたいて新車買った身からすると，めちゃくちゃ安いですw

Competitionのデータセットを入れるだけで，30~50GB使って，訓練させた重みとかを実験ごとに出力するともう100GBはすぐ埋まりますね．

強い方々は，複数のコンペを並行しているイメージがあるので，足りないでしょう(強い人強いローカルマシン持ってそうって偏見はあるw)


これからColabスターターを考えます！

## Colabスターターのすゝめ

1. CompetitionデータセットをDriveにzipのまま載せる
2. ColabにDriveをマウント
3. データセットを読み込む

## CompetitionデータセットをDriveにzipのまま載せる

Competitionデータセットは，**一旦ローカルに落としてから，GUIでGoogle Driveにアップロード**します．

場所はどこでもいいですが，僕は*MyDrive/Kaggle/{competition_name}/*のなかに落とすことにしました．

ローカルにダウンロードしたzipファイルを何もせずにアップロードすると，*MyDrive/Kaggle/{competition_name}/{competition_name}.zip*になると思います．

本当は，kaggle-apiで落とそうとしたのですが，やめました．原因は以下です．

1. kaggle-apiをいちいちreinstallするの面倒くさい
2. 24時間でディスク消えてしまう
3. インターネット状況によってはzipファイルの欠損がおきた


## ColabにDriveをマウント

これからColabの方で実験をしていきますが，まずはDriveをColab上にマウントします．

![Driveのマウント](/images/article/drive-mount.png)

画像が示しているところを押して，Driveをマウントできます．


## データセットを読み込む

*MyDrive/Kaggle/{competition_name}/{competition_name}.zip*にデータセットがあるとして話を進めます．

一旦なんのGPUが乗っているか確認します．

~~~bash
!nvidia-smi
~~~

続いて，DriveにアップロードしたzipファイルをColabのディスク内の */content/dataset*に展開します．

~~~bash
!unzip -o /content/drive/MyDrive/Kaggle/{competition_name}/{competition_name}.zip -d /content/dataset
~~~

毎回24時間おきに実験の度に，ディスクのにunzipしてから学習を開始します．

15分くらい取られたりしますが，そこは我慢って感じで考えていました...

イメージこんな感じです．

![Colab-Starter](/images/article/colab-pro-starter01.png)

これ以降は自由にデータセットを呼び出せるので，ガチャガチャやってください．

初めてKaggleにガチで始めたばかりの初心者が考えたGoogle Colabスターターでした．

これからさらに改良を加えていって，うまいこと実験のルーティンを確立していこうと思います!!!