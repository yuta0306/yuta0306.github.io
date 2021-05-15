---
Title: ApacheのSRVROOTが合わない問題
Date: '2020-11-02'
Category: Web
Tags: Apache
Authors: ゆうぼう
Slug: apache-error-srvroot
Thumbnail: /images/thumbnails/web.png
Description: Apacheのインストールはなんとか成功！したのですが、なぜかエラーが発生。大体デフォルトでいく感じかと思ったら、みんなと少しデフォルトが違うじゃん！というわけで、その時の解決法を備忘録として共有します。
Published: true
---

Apacheのインストールはなんとか成功！したのですが、なぜかエラーが発生。大体デフォルトでいく感じかと思ったら、みんなと少しデフォルトが違うじゃん！というわけで、その時の解決法を備忘録として共有します。

ちなみに、Apacheのインストールでアクセス拒否が出た時の確認は[こちらから](https://yuta0306.github.io/blog/apache-install-denied)  
管理者用コマンドプロンプトの出し方も上記リンクから。
>
## エラーの確認

現在、管理者用コマンドプロンプトにて、コマンドを実行しています。

~~~bash
C:\WINDOWS\system32>httpd -k install
Installing the 'Apache2.4' service
The 'Apache2.4' service is successfully installed.
Testing httpd.conf....
Errors reported here must be corrected before the service can be started.
httpd: Syntax error on line 39 of C:/Apache/Apache24/conf/httpd.conf: ServerRoot must be a valid directory
~~~

このようなエラーが発出されました。

エラー内容としては、39行目に構文エラーがあったようです。他の記事見ながらやってたら、ここは確認だけでいいよ〜的な感じで、デフォルトで動くような素振りだったのに...

ショックです。ただ、エラーがはっきりしているので直しやすそうです。

## 原因と解決策

原因はいかにありました。39行目周りを確認していきます。

~~~php
# same ServerRoot for multiple httpd daemons, you will need to change at
# least PidFile.
#
Define SRVROOT "c:/Apache24"
ServerRoot "${SRVROOT}"
#
~~~

よく紹介されているデフォルトは39行目が*c:/Apache24*もしくは、*/Apache24*でした。

それなのに僕の場合、そのままデフォルトで進めていたら、僕の環境で存在するApacheは*c:/Apache/Apache24*になっていたのです。

それでは動かないに決まっています。原因がわかったところで、39行目を直していきます。

~~~php
# same ServerRoot for multiple httpd daemons, you will need to change at
# least PidFile.
#
Define SRVROOT "c:/Apache/Apache24"
ServerRoot "${SRVROOT}"
#
~~~

これで直りました！！

ただ、今回の件に関しては、人によって色々と違いがあると思います。

同じような場所でエラーを吐かれていたら、自分のApacheがどこにあるのかPATHを確認してから書き直してみましょう。

PATHが当たれば動くはずです!

それではここまで。
