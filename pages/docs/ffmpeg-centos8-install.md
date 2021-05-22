---
Title: CentOS8にffmpegインストール; パッケージには気を付けよう
Date: '2021-05-18'
Category: Linux
Tags: [Linux, CentOS8, ffmpeg]
Authors: ゆうぼう
Slug: ffmpeg-centos8-install
Description: ffmpegでm4aフォーマットを自動でmp3に変換するプログラムをPythonで書いたのですが，CentOSのサーバ上で動作させるのに苦労したので，その時の解決策です．
Published: true
---

ffmpegでm4aフォーマットを自動でmp3に変換するプログラムをPythonで書いたのですが，CentOSのサーバ上で動作させるのに苦労したので，その時の解決策です．

## やりたかったこと

PythonのAudioSegmentationを使った，音声ファイルのフォーマットを変えるプログラムを，サーバで動かしたい．

用件はただ一つで以下でした．

- OSバージョン
    - CentOS 8

## 手順書【 5/18現在 】

最初ffmpegの入ったリポジトリがないので，それらを入れる．

とりあえず，ターミナルで以下を順にうつ．

~~~bash
$ sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
$ sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
$ sudo yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm
~~~

これが通れば，ffmpegとffmpegのdevelopmentパッケージを入れる．

~~~bash
sudo yum install ffmpeg ffmpeg-devel
~~~

僕がなんとかインストールして使用するまでいけた手順書がこれです．


それで色々と面倒くさかったのが，この部分です．ここのセクションでは解消済みのコマンドを書いています．安心してコピペってください．

~~~bash
$ sudo yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm
~~~

一つ目のコードブロックの一番下のコマンドですね．これが，**404エラーでそんなパッケージないよ**って怒られたわけです．  
人のサイトを参考にしてやってたら，どこのサイトでも同じコマンドなのに自分のところでは404?状態でした


これより先はどうやって対処したかの僕の備忘録なので，上記を試して404エラーと出会ったら以下を見て頂ければ，解消の糸口が見出せるかもしれません．

## 参考にしたサイト

[https://www.systempandit.com/how-to-install-ffmpeg-on-centos/](https://www.systempandit.com/how-to-install-ffmpeg-on-centos/)

これには，CentOS 8の部分で以下のように書いてあります．

~~~bash
$ sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
$ sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
$ sudo yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.10-1.el7.x86_64.rpm
# 僕は上をこう書き換えた >>> $ sudo yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm

sudo yum install ffmpeg ffmpeg-devel
~~~

そうすると，僕が書き換えた部分で前のセクションでお話しした通り，404エラーが帰ってきます．そのようなパッケージがないんですね．

ということで，僕の思考はこうなりました．「ん？バージョン怪しいな...」

## パッケージのあるディレクトリの階層の上を見てみよう

http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.10-1.el7.x86_64.rpm

これがないらしいが，http://rpmfind.net/linux/epel/7/x86_64/Packages/s/ のあたりまでは間違っている気がしなかったので，  
ブラウザから開いてみました．

すると，「[http://rpmfind.net/linux/epel/7/x86_64/Packages/s/](http://rpmfind.net/linux/epel/7/x86_64/Packages/s/)」にうまくアクセスできて，それっぽいのが見つかりました．

一番上に*http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm* のリンクがあって，  
これ比べたら，マイナーバージョン？的な場所の数字が違うんですね．今のやつはどうやら14のようで．．．

それっぽいのが見つかったので，リンクをコピーして差し替えたところ，うまくインストールができました．

## 得たこと

何かしら，extraなリポジトリを使う時，少し時期がずれるだけでエラー返ってくることもあるみたいですが，大まかはあっているっぽいです．

他の人はかつて行けてたわけですから．

バージョンの違いとかを疑って，実際にアクセスして確認してバージョンチェックをすると糸口を見つけられることもあるみたいです．（たまたま感は否めないが）

## まとめ

結局，5/18現時点ではこれでffmpegはインストールできます．

~~~bash
$ sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
$ sudo yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
$ sudo yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm

sudo yum install ffmpeg ffmpeg-devel
~~~