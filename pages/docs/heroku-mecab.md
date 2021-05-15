---
Title: HerokuにMecCabインストールで困った!!
Date: '2020-08-05'
Category: Python
Tags: [Python, MeCab]
Authors: ゆうぼう
Slug: heroku-mecab
Description: MeCabを利用したWebアプリケーションをHerokuにデプロイしようとして、環境をrequirements.txtにまとめていたのですが、、、どうしてもエラーが出てインストールが止まってしまうことがありました。原因は、Mecabだったようなので、エラー回避方法を共有します。
Published: true
---

MeCabを利用したWebアプリケーションをHerokuにデプロイしようとして、環境をrequirements.txtにまとめていたのですが、、、どうしてもエラーが出てインストールが止まってしまうことがありました。原因は、Mecabだったようなので、エラー回避方法を共有します。

前提条件として、

- mecabを*pip mecab*でインストール済み
- HerokuをCLIでいじる準備ができている

##  とりあえずrequirements.txtを作成

まあ、pip listしてまず現環境におけるライブラリをみていきましょう。

例えばこんな構成だとします。

~~~bash
(myvenv)$ ~ pip list
Package                Version
---------------------- -------------------
certifi                2020.6.20
chardet                3.0.4
click                  7.1.2
Flask                  1.1.2
gunicorn               20.0.4
idna                   2.10
itsdangerous           1.1.0
Jinja2                 2.11.2
MarkupSafe             1.1.1
mecab                  0.996.2
mysql-connector-python 8.0.21
oauthlib               3.1.0
pip                    20.1.1
protobuf               3.12.4
requests               2.24.0
requests-oauthlib      1.3.0
setuptools             49.2.0.post20200714
six                    1.15.0
urllib3                1.25.10
Werkzeug               1.0.1
wheel                  0.34.2
~~~

中段くらいにmecabのバージョン0.996.2がありますね。それではこれをもとに、requirements.txtを作成していきます。

~~~bash
(myvenv)$ ~ pip freeze > requirements.txt
~~~

これで下準備OKです

## Herokuへログインしてデプロイ

それではコマンドラインを開きまして、デプロイしていきましょう。

~~~bash
$ ~ heroku % login
~~~

これを打つと、認証画面的にブラウザが勝手に開きます。それでログインできていれば、この画面を消してターミナルに戻る旨の内容が書かれています。

それで、成功したとして、次は

~~~bash
$ ~ % heroku git:clone -a your-app-name
$ ~ % cd your-app-directory

$ your-app-directory % git add .
$ your-app-directorygit % commit -am "deploy!!"
$ your-app-directorygit % push heroku master
~~~

こうするとPythonの場合、**runtime.txt**からPythonのバージョンを、**requirements.txt**から依存ライブラリのパッケージを確認して、インストールしていくと次のような問題が発生します。

~~~bash
-----> Python app detected
-----> Installing python-3.8.5
-----> Installing pip 20.0.2, setuptools 39.0.1 and wheel 0.34.2
-----> Installing SQLite3
-----> Installing requirements with pip
    Collecting certifi==2020.6.20
        Downloading certifi-2020.6.20-py2.py3-none-any.whl (156 kB)
    Collecting chardet==3.0.4
            ( 中略 )
    Collecting mecab==0.996.2
        Downloading mecab-0.996.2.tar.gz (62 kB)
        ERROR: Command errored out with exit status 1:
            command: /app/.heroku/python/bin/python -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-kr1kq54r/
            mecab/setup.py'"'"'; __file__='"'"'/tmp/pip-install-kr1kq54r/mecab/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)
            (__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' 
            egg_info --egg-base /tmp/pip-install-kr1kq54r/mecab/pip-egg-info
                cwd: /tmp/pip-install-kr1kq54r/mecab/
        Complete output (10 lines):
        /bin/sh: 1: mecab-config: not found
        Traceback (most recent call last):
            File "<string>", line 1, in <module>
            File "/tmp/pip-install-kr1kq54r/mecab/setup.py", line 53, in <module>
            include_dirs=cmd2("mecab-config --inc-dir"),
            File "/tmp/pip-install-kr1kq54r/mecab/setup.py", line 19, in cmd2
            return cmd1(strings).split()
            File "/tmp/pip-install-kr1kq54r/mecab/setup.py", line 15, in cmd1
            return os.popen(strings).readlines()[0].rstrip()
        IndexError: list index out of range
        ----------------------------------------
    ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
    !     Push rejected, failed to compile Python app.
    !     Push failed
~~~

こんな感じに怒られるわけですよ...orz

## 悪さをするのはMecabだった！？

どうやら悪さをしていたのは、**MeCab**だったようです。再度requirements.txtの一部を確認します。

~~~bash
requirements.txt   |
----------------------------
certifi==2020.6.20
chardet==3.0.4
click==7.1.2
Flask==1.1.2
gunicorn==20.0.4
idna==2.10
itsdangerous==1.1.0
Jinja2==2.11.2
MarkupSafe==1.1.1
mecab==0.996.2
..................
~~~

どうやら調べてみると、このmecabで指定しているのがよくないみたいですね...

というわけで、この**mecab==0.996.2**というのをどかしてやりますね。どうするかと言いますと、  
**mecab-python**に変えてあげます。特にバージョンは指定しなくてもよかったです。

ということで直します。

~~~bash
requirements.txt   |
----------------------------
..................
..................
mecab-python       # mecab==0.996.2 を修正
..................
~~~

これでうまくいくはずです！！

もしうまくいかなかったら、打ち損じとか全角になってないか、他のライブラリでのエラー等を疑うといいと思います。

これぬまにハマりそうなので、同じエラーに悩む人がいたら是非参考にしてください。
