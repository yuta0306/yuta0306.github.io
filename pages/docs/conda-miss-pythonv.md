---
Title: conda createでpythonのバージョン指定忘れた！
Date: '2020-11-01'
Category: Python
Tags: [Python, conda]
Authors: ゆうぼう
Slug: conda-miss-pythonv
Thumbnail: /images/thumbnails/python.jpg
Description: Anacondaは、GUIで操作ができてやりやすいですが、起動もかなりおそくCLIでどうにかならないか「conda create」コマンドを使って環境を立てる事があります。しかし、ノリでEnterを押してしまってPythonのバージョンを指定し忘れることが...。かなりの弊害を生み出します。その際の対処法を共有します。
Published: true
---

Anacondaは、GUIで操作ができてやりやすいですが、起動もかなりおそくCLIでどうにかならないか**conda create**コマンドを使って環境を立てる事があります。しかし、ノリでEnterを押してしまってPythonのバージョンを指定し忘れることが...。かなりの弊害を生み出します。その際の対処法を共有します。

## CLIでconda環境を作る方法

まずは、CLIで環境を作るコマンドの紹介です。

```bash
conda create -n your-env-name python=3.x
```

たったこれだけで環境を建てられます。


## あ、やってしまった...python=3.x忘れた

僕がノリでガガガってコマンド打って最後にやり忘れるやつです。

押してから気付くのです...  
あ、やってしまった...python=3.xって打つの忘れた...と

```bash
conda create -n your-env-name
```

これやっちゃうとすごく焦るんですよね。なんでかっていうとですね

```bash
(base)$ conda create -n typo
(base)$ conda activate typo
(typo)$ pip list
Traceback (most recent call last):
  File "/usr/local/bin/pip", line 6, in <module>
    from pip._internal.cli.main import main
ModuleNotFoundError: No module named 'pip._internal.cli.main'
```

*pipがない*...だと...!?

これは困りました。。。しかもこの環境でやると、そこまで自分好みにカスタマイズしていない方は*python2*がデフォになっていると思います。

いやぁ困った。


## 【解決策】condaにPythonをインストール

condaに*Pythonのバージョンを明示した上で*インストールすればうまくいきます！！！

今回は、現状でAnacondaが対応している最新版の*Python3.8*をインストールします。

```bash
(typo)$ conda install python==3.8
Collecting package metadata (current_repodata.json): done
Solving environment: failed with initial frozen solve. Retrying with flexible solve.
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /Users/slothyubo/opt/anaconda3/envs/blog-tweet

  added / updated specs:
    - python==3.8


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    certifi-2020.6.20          |     pyhd3eb1b0_3         155 KB
    libffi-3.2.1               |    h0a44026_1007          43 KB
    python-3.8.0               |       h359304d_2        18.8 MB
    ------------------------------------------------------------
                                           Total:        19.0 MB

The following NEW packages will be INSTALLED:

  ca-certificates    pkgs/main/osx-64::ca-certificates-2020.10.14-0
  certifi            pkgs/main/noarch::certifi-2020.6.20-pyhd3eb1b0_3
  libcxx             pkgs/main/osx-64::libcxx-10.0.0-1
  libedit            pkgs/main/osx-64::libedit-3.1.20191231-h1de35cc_1
  libffi             pkgs/main/osx-64::libffi-3.2.1-h0a44026_1007
  ncurses            pkgs/main/osx-64::ncurses-6.2-h0a44026_1
  openssl            pkgs/main/osx-64::openssl-1.1.1h-haf1e3a3_0
  pip                pkgs/main/osx-64::pip-20.2.4-py38_0
  python             pkgs/main/osx-64::python-3.8.0-h359304d_2
  readline           pkgs/main/osx-64::readline-7.0-h1de35cc_5
  setuptools         pkgs/main/osx-64::setuptools-50.3.0-py38h0dc7051_1
  sqlite             pkgs/main/osx-64::sqlite-3.33.0-hffcf06c_0
  tk                 pkgs/main/osx-64::tk-8.6.10-hb0a8c7a_0
  wheel              pkgs/main/noarch::wheel-0.35.1-py_0
  xz                 pkgs/main/osx-64::xz-5.2.5-h1de35cc_0
  zlib               pkgs/main/osx-64::zlib-1.2.11-h1de35cc_3


Proceed ([y]/n)? y  # <== yでEnter

Downloading and Extracting Packages
python-3.8.0         | 18.8 MB   | ######################################################### | 100% 
libffi-3.2.1         | 43 KB     | ######################################################### | 100% 
certifi-2020.6.20    | 155 KB    | ######################################################### | 100% 
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
```

このようになり、インストールされました。

また途中でpipも同時にインストールされており、これで無事にpipもインストールされるようになりました！

確認

```bash
(typo)$ pip --version
pip 20.0.2 from /Users/user/opt/anaconda3/envs/static-site/lib/python3.7/site-packages/pip (python 3.7)
```

上記は人によりますが、しっかりpipが使えますね

それでは、もし**conda create**でPythonのバージョンを書き忘れたら、これで解決しましょう！

