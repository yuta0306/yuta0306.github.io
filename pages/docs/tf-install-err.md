---
Title: tensorflowインストール時 METADATAがない？
Date: '2020-12-24'
Category: Python
Tags: [Python, tensorflow]
Authors: ゆうぼう
Slug: tf-install-err
Thumbnail: /images/thumbnails/python.jpg
Description: pip install tensorflowでtensorflowをインストールしてディープラーニングをやろうとした矢先の事、パッケージが足りないだと...。その時の解決策がとても簡単だったのですが、この手の問題はtensorflowに限らず起こりそうなので、記録しておきます。
Published: true
---

*pip install tensorflow*でtensorflowをインストールしてディープラーニングをやろうとした矢先の事、パッケージが足りないだと...。その時の解決策がとても簡単だったのですが、この手の問題はtensorflowに限らず起こりそうなので、記録しておきます。

## 発生したエラー No such file or directory

今回はなぜかインストールに必要なパッケージのメタファイルがなくて、「No such file or directory」と怒られたわけです。

そして、今回足りなかったパケージが**google_pasta-0.2.0.dist-info/METADATA**でした。

実際のエラーが以下になります。

~~~bash
ERROR: Could not install packages due to an EnvironmentError:
[Errno 2] No such file or directory:
'/Users/usr/opt/anaconda3/envs/myenv/lib/python3.7/site-packages/google_pasta-0.2.0.dist-info/METADATA'
~~~

## 【解決策】もうtouchでファイル作っちゃえ!!

よくわからないエラーだし、本当になんでこうなったかの経緯が掴めないのですが、  
ファイルがないとかディレクトリがないとか言っているのでとりあえず*もうファイル作っちゃえ!!*

という事で**touch**でファイル作っちゃいます(笑)

~~~bash
$ touch /Users/usr/opt/anaconda3/envs/myenv/lib/python3.7/site-packages/google_pasta-0.2.0.dist-info/METADATA
$ # 上のファイルパスはエラー文のコピペ
$
$ pip install tensorflow
~~~

さっきまでのエラーが原因であれば、これでインストールが完了しているはずです!

まあ、今回はconda環境で起こった問題なので、何かしらcondaの中でやってはいけないコマンドか何かがあったのかなって感じです。

とにかくこのエラーが出たらどうにかなるということで、これからは対処できそうです。

クリスマスイヴの投稿でした \o/  
それでは、楽しく機械学習をハックしていきましょう!!
