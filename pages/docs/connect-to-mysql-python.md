---
Title: mysql-connector-pythonでローカルDBに接続する
Date: '2020-07-13'
Category: Python
Tags: [MySQL,Python]
Authors: ゆうぼう
Slug: connect-to-mysql-python
Thumbnail: /images/thumbnails/database.jpg
Description: Pythonのライブラリ「mysql-connector-python」を使って、ローカルのMySQLデータベースに接続します。
Published: true
---

MySQLのデータベースを扱う際に、Pythonスクリプトから接続したくなったので、Pythonからの接続方法を紹介します。

## mysql-connector-pythonのインストール

まずは、mysql-connector-pythonのインストールを行っていきます。

今回は、pipを使ってインストールしていきます。

~~~bash
$~ pip install mysql-connector-python
~~~

これでエラーが出ずに進めばインストールできているはずです。とりあえずこれで準備は完了。

## まずはconnectorをインポート

まずは接続するためのメソッドをインポートしないと使えないので、インポートしましょう。


~~~python
import mysql.connector
~~~

これで準備はOK!!

## 接続と切断

それではここまで完成できていれば、あとは接続の処理を書くだけです。

今回の例では、以下の情報を前提にしてみます。

| user | host | password | database |
| ---- | ---- | ---- | ---- |
| root | 127.0.0.1 | ********** | example |

さて、早速接続の処理を書いてみましょう。


~~~python
import mysql.connectorcnx = mysql.connecor.connect(
        user='root',
        host='127.0.0.1',
        password='**********',
        database='example',
    )
~~~

これだけで接続は完了です。（パスワード等が全て正しければ）

他の処理等も終わったら、しっかり切断しておきましょう。

~~~python
    cnx.close()
~~~

これで接続と切断の処理は完了です。

また、hostが127.0.0.1であることは、他のポートとぶつかっているために人為的にローカルホストやポート番号を変えていなければ、デフォルトの位置になっているはずなので、以下でも実行可能です。


~~~python
import mysql.connectorcnx = mysql.connecor.connect(
        user='root',
        host='127.0.0.1',
        password='**********',
        database='example',
    cnx = mysql.connecor.connect(
        user='root',
        password='**********',
        database='example',
    )
~~~

## connectの引数の内容を辞書にまとめておく

先ほど、引数に入力した情報を辞書にまとめて接続することもできます。
以下のようなスクリプトになります。


~~~python
import mysql.connector

    config = {
        user: 'root',
        host: '127.0.0.1',
        password: '**********',
        database: 'example',
    }
    cnx = mysql.connector.connect(**config)

    cnx.close()
~~~

configは辞書型なので、「**」でアンパックすることも忘れないようにしましょう。

## まとめ

最終的にまとめると、流れはこんな感じです。

## #辞書使わない

~~~python
import mysql.connector

cnx = mysql.connecor.connect(
    user=<span class="strings">'root',
    host=<span class="strings">'127.0.0.1',
    password=<span class="strings">'**********',
    database=<span class="strings">'example',
)

cnx.close()
~~~


## #辞書型
    

~~~python
import mysql.connector

config = {
    user: <span class="strings">'root',
    host: <span class="strings">'127.0.0.1',
    password: <span class="strings">'**********',
    database: <span class="strings">'example',
}
cnx = mysql.connector.connect(**config)

cnx.close()
~~~
    
後ほど、テーブルを実際に作ったり、インサートしたりの方法を紹介しようと思います。
