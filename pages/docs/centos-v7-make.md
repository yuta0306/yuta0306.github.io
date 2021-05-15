---
Title: CentOS7にmakeコマンドをインストールする
Date: '2020-07-29'
Category: Linux
Tags: [CentOS7, make]
Authors: ゆうぼう
Slug: centos-v7-make
Thumbnail: /images/thumbnails/linux.jpg
Description: 色々あってtmuxをConoHa VPSにインストールをすることになったのだが、そこでmakeしてmake installをする必要があった。しかし、このVPSのCentOS7には標準搭載では無かったようなので、インストールした。その際やったことを共有する。
Updated_date:
Published: true
---

色々あってtmuxをConoHa VPSにインストールをすることになったのだが、そこでmakeしてmake installをする必要があった。しかし、このVPSのCentOS7には標準搭載では無かったようなので、インストールした。その際やったことを共有する。

## sudo yum install make -y

一応僕がこれインストールしたときは、ユーザー権限なのでsudoをしました。  
root権限ならsudoはいらないと思います。

あと、これは推奨されるべきかは知らないけど、*-y*オプションを付けました。*--assumeyes*と同値らしいです。全ての質問に対してyesと答えるオプションです。

~~~bash
$ sudo yum install make -y
~~~

これだけで終わりです。

これで目標だった「make」と「make install」が使えるようになりました。

実際どうなんでしょう？CentOS6は**make**がデフォルトにないとかっていう記事は見かけたのですが、CentOS7でそのような記事やブログは見つからなかったです。

これってConoHa VPSだけとかって話はほぼないと思うので、CentOS7は標準搭載じゃないのかな？
