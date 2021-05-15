---
Title: MySQLで困った!カラム追加したい
Date: '2020-07-21'
Category: SQL
Tags: MySQL
Authors: ゆうぼう
Slug: mysql-add-column
Thumbnail: /images/thumbnails/database.jpg
Description: MySQL触ってて、他のコードの変更とか方針の変更に応じてテーブルのカラムを挿入したくなることってあるよね。(自分があった)ので、テーブルにカラムを挿入する方法を共有します。
Published: true
---

## MySQLにアクセス

最初に、MySQLにアクセスして対話モードを実行していきましょう。

~~~bash
$~ mysql -u root -p    #root権限で入ってみる
Enter password: **********
~~ 以下略 ~~

mysql> 
~~~

まずはコレで準備OK

## テーブルの型のチェックと期待する変更結果の提示

さて、ここからカラムを追加していきましょう。元々のテーブル(example_tableと名付ける)は以下を想定します。

| user | age | height | weight |
| ---- | ---- | ---- | ---- |
| VARCHAR(32) | INT | FLOAT | FLOAT |

まずは調べてみましょう。

~~~sql
mysql> DESCRIBE example_table;
+-----------+---------------+------+-----+---------+-------+
| Field     | Type          | Null | Key | Default | Extra |
+-----------+---------------+------+-----+---------+-------+
| user      | varchar(32)   | YES  |     | NULL    |       |
| age       | int           | YES  |     | NULL    |       |
| height    | float         | YES  |     | NULL    |       |
| weight    | float         | YES  |     | NULL    |       |
+-----------+---------------+------+-----+---------+-------+
4 rows in set (0.00 sec)
~~~

そしてここにBMIを定義するカラムを追加してみたいと思います。想定する結果がこちらです。

| user | age | height | weight | bmi |
| ---- | ---- | ---- | ---- | ---- |
| VARCHAR(32) | INT | FLOAT | FLOAT | FLOAT |

## カラムを追加する

さて、先ほどの期待結果に合わせてカラムを挿入していきましょう。コマンドの構文としてはこちらになります。

**ALTER TABLE テーブル名 ADD カラム名 型 (オプション);**

それでは実際にコマンドを実行していきましょう。さきの追加によると、  
| テーブル名 | カラム名 | 型 | オプション |
| ---- | ---- | ---- | ---- |
| example_table | bmi | FLOAT | なし |

こちらの情報をもとに構文に当てはめます。

~~~sql
mysql> ALTER TABLE example_table ADD bmi FLOAT;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0
~~~

さて、どう変わったのかみてみましょう。

~~~sql
mysql> DESCRIBE example_table;
+-----------+---------------+------+-----+---------+-------+
| Field     | Type          | Null | Key | Default | Extra |
+-----------+---------------+------+-----+---------+-------+
| user      | varchar(32)   | YES  |     | NULL    |       |
| age       | int           | YES  |     | NULL    |       |
| height    | float         | YES  |     | NULL    |       |
| weight    | float         | YES  |     | NULL    |       |
| bmi       | float         | YES  |     | NULL    |       |
+-----------+---------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
~~~

うまくいったようですね。最後の行に期待した通りのカラムが追加されているようです。

## まとめ

構文は以下になります。

**ALTER TABLE テーブル名 ADD カラム名 型 (オプション);**

カラムをいくつか増やしたいときは複数同時に指定してカラムを足すこともできます。
いつも複数データを扱っているときのように()で括って処理を書きます。

**ALTER TABLE テーブル名 ADD (カラム名 型, カラム名 型, ...);**

このような感じでカラムを追加することができます。必要に応じてNULLを使えなくしたりデフォルト値を決めたりするといいでしょう。
構文自体はこんな感じでした。技術的に必要になった知識がでたら、また公開していきます。
