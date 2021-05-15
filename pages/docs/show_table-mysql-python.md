---
Title: mysql-connector-pythonで'SHOW ~~~'に困ったのでその対処法
Date: '2020-07-14'
Category: Python
Tags: [MySQL,Python]
Authors: ゆうぼう
Slug: show_tables-mysql-python
Thumbnail: /images/thumbnails/database.jpg
Description: Pythonのライブラリ「mysql-connector-python」を使っていたのですが、なかなか'SHOW TABLES'や'SHOW DATABASES'を出力できなかったので、その対処法を備忘録としてまとめます。
Published: true
---

MySQLのデータベースを扱う際に、Pythonスクリプトから接続したくなったので、Pythonからの接続方法を紹介します。

## mysql-connector-pythonのインストール

まずは、mysql-connector-pythonのインストールを行っていきます。(復習がてら)

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

## 接続とDB操作のためのカーソルを生成、そして切断

今回の例では、以下の情報を前提にした上で、exampleというデータベースに直で接続していきます。

| user | host | password | database |
| ---- | ---- | ---- | ---- |
| root | 127.0.0.1 | example | example |

さて、早速接続の処理を書いてみましょう。

~~~python
cnx = mysql.connector.connect(
    user='root',
    password='example',
    database='example',
)
~~~


これだけで接続は完了です。（パスワード等が全て正しければ）  
ホストはデフォルトが127.0.0.1なので書かなくていいです。

この後に、カーソルをあてます。

~~~python
cur = cnx.cursor()
~~~

この処理だけでオッケーです。

他の処理等も終わったら、しっかり切断しておきましょう。

~~~python
cur.close()
cnx.close()
~~~

これで接続と切断の処理は完了です。

## SHOW TABLE表示していく

それでは、ここまでで準備は整ったので、*cur = cnx.cursor()*のすぐ後に以下の処理を書いてみましょう。

~~~python
sql = "SHOW TABLES"    #命令文
print(cur.execute(sql))    #結果の出力

# --> None    #あれ？？ない
~~~

見事失敗ですね(笑)

僕はずっと、実行した結果が戻り値として吐き出されていると思ってこの処理を書きました。しかし、それがないので*None*が返ってきてしまうのですね...

それでは正しいスクリプトを書いていきましょう。

~~~python
sql = "SHOW TABLES"    #命令文
cur.execute(sql)    #実行
print(cur.fetchone())    #1つだけフェッチする

# --> (example, )
~~~


出力本体は人の環境によって異なりますが、このような感じでタプル型でテーブル名が出力されます。

複数処理結果をまとめて吐き出すには「**fetchall()**」というものがあるようです。今回は一つだけテーブルに対して情報を吐いてもらうので「**fetchone()**」で取得しました。

## せっかくなので'SHOW DATABASES'もやってみる

せっかくなので「**SHOW DATABASES**」も出力してみましょう。DATABASE群をみるので、今回接続する際は先ほどのdatabase引数はなくします。

| user | host | password |
| ---- | ---- | ---- |
| root | 127.0.0.1 | example |

~~~python
import mysql.connector

cnx = mysql.connector.connect(
    user='root',
    password='example',
    )

cur = cnx.cursor()

cur.execute("SHOW DATABASES")
print(cur.fetchall())    #<< fetchall()に注意

cur.close()
cnx.close()

# --> [(example, ), (sys, )]
~~~


今回は複数のデータがあることに留意したとして、**fetchall()**しました。ここも見落としポイントが多い気がします。

僕はそうだったのですが、タプル型に全ての名前が入ると期待したのですが、実際は一つ一つの名前に対してタプルを作り、そのタプル群をリストに入れるようです。

## まとめ

ここまでみてきた結果、一番安全なのはこれでしょうか。

~~~python
cur = cnx.cursor()

cur.execute("SHOW DATABASES")
print(cur.fetchall()) 
~~~


まずはカーソルを当ててから、そこでコマンドを実行する。そのあとは「**fetchall()**」でリストに包める。

情報が1つしかないことがわかっているならば問題ないのですが、基本的には複数あるという想定のもと、fetchall()で取得する方がいい気もしました。
