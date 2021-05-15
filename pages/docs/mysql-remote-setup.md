---
Title: MySQL8.0.xでリモート接続のセットアップをする!
Date: '2020-07-18'
Category: SQL
Tags: MySQL
Authors: ゆうぼう
Slug: mysql-remote-setup
Thumbnail: /images/thumbnails/database.jpg
Description: MySQLでリモート接続のためのセットアップを行いました。現環境はバージョン8.0.19なのですが、前回からのメジャーアップデートにて、コマンドが変わっており大変苦労したので備忘録として。かなりつまずきますので共有します。
Published: true
---

現在conoHa VPSにMySQLの環境を作り外部からアクセスしようとしていました。しかし、ここで問題が...

リモート接続するためのセットアップってどうやるん？  
しかも何や。記事まねても全然うまくいかないやん...orz

ってことなのですが、バージョン8にメジャーアップデートにあたり、コマンドの変更があったようなので共有します。

で、今回はroot権限をどこからでも接続する権限を与えます。

## sshにてリモートサーバにアクセス

まずははじめに、コマンドラインで**ssh**を使ってリモートサーバに入ります。今回はルートとして入ります。

~~~bash
$~ ssh root@xxx.xxx.x.xxx    #@以降はアドレス
Enter password: **********
~~ 以下略 ~~

[root@xxx-xxx-x-xxx]# 
~~~

このようにログイン先の情報とともに表示されます。

## 【本題】権限を与える

まずはMySQLを起動しまして、以下のコマンドを打ちます。

~~~sql
mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'your-password';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT all PRIVILEGES
        -> ON *.* TO 'root'@'%' 
        -> WITH GRANT OPTION;
~~~

まずは1つ目のコマンドでユーザーを作ります。(**コレが8.0.x以降の仕様なのでドツボにハマるやつ!!**)

そして2つ目のコマンドにて、権限を付与してきます。ただ、今回は見易さのため複数行にしましたが、1行でも問題はないです。(大文字小文字もあまり気にしなくて良かったりもする)

あと、'%'ってんはアクセスするIPアドレスを書くところであって、今回はどこからでもアクセスできる(どのPCからでも)を想定するので**'%'**を指定して全てを許可します。

あと、***.***の部分はデータベースとテーブルの設定ですが、こちらも全てにアクセスができると想定してこちらにしています。任意のデータベースを許可したければ  '任意の名前'.*とでもすれば良いでしょう。

一応コレで下準備は完了ってところですかね。

基本的には問題ないのですが、僕が使ってみたconoHa VPSとかだと、ファイヤウォールの設定が必要なので今回は省略。

ドツボにハマるのはきっとここなので注意。

## 実際にマイナーバージョンでのコマンド打ってみる

実際にマイナーバージョンでのコマンドを実行してみますか。(愚行)  
あと小文字でやってみた。

~~~sql
mysql> grant all privileges on 
        -> *.* to root@"%" identified by 'your-password' 
        -> with grant option;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'identified by 'your-password'
with grant option' at line 2
~~~

まあこうなってわからないよね。SQL構文チェックしようねって言われるわけだけど、記事も少なかったし、ここはドツボにハマりかけるのかなと思います。

## まとめ

ルートとして外部からどこでもどのデータベースのアクセスを許可するには以下のコマンドを打ちましょう。

~~~sql
mysql> CREATE USER 'root'@'%' IDENTIFIED BY 'your-password';
Query OK, 0 rows affected (0.01 sec)

mysql> GRANT all PRIVILEGES
        -> ON *.* TO 'root'@'%' 
        -> WITH GRANT OPTION;
~~~

他にも外部サーバの設定のよって動かないことがあるので、それはまた紹介しますが。
今回はバージョン8.0.xでの変更点に触れました。

快適なデータベースライフを!!
