---
Title: MySQLでユーザーの権限を削除する
Date: '2020-07-18'
Category: SQL
Tags: MySQL
Authors: ゆうぼう
Slug: mysql-drop-user
Thumbnail: /images/thumbnails/database.jpg
Description: 結構初歩的なのだけど、ユーザー権限を削除したくなって構文を覚えたので共有します。
Published: true
---

root権限で何でもかんでも行うのはすごく怖かったので、新たにユーザーを登録していました。しかし、登録したはいいものの削除したくもなるわけです。

そこで今回は登録されているユーザーを削除する流れを紹介していきます。

## MySQLにアクセス

最初に、MySQLにアクセスして対話モードを実行していきましょう。

~~~bash
$~ mysql -u root -p    #root権限で入ってみる
Enter password: **********
~~ 以下略 ~~

mysql> 
~~~

まずはコレで準備OK

## とりあえずユーザー名とホストを調べる

ユーザー名とホスト名を調べましょう。ユーザー名が同じものがいくつかあることもありますので、同時にホストも調べておきます。  
消したいユーザーを念のためみておきます。

~~~sql
mysql> SELECT user, host FROM mysql.user
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| usr              | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
5 rows in set (0.00 sec)
~~~

コレで確認ができましたね。下の4つは基本的に最初から入っているやつだと思います。
今回は、一番上の*usr*というユーザーのパーミッションを削除してやろうと思います。

## ユーザーを削除する

実際に削除していきます。コマンドは以下のようになります。

~~~sql
mysql> DROP USER usr@localhost;
~~~

これでとりあえず削除は完了。上では、ユーザー名構文に則って削除しました。  
**ユーザー名**@**ホスト**ということですね。

## ホストを与えないで削除してみる

先ほどは、**ユーザー名**@**ホスト**の形式で削除しましたが、ホスト名を明記しなくても消すことはできます。

~~~sql
mysql> DROP USER usr;
~~~

こんな感じです。こうすると明記する場合でいう「usr@'%'」と同値になります。
