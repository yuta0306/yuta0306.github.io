---
Title: poetry add espnetがしたいんじゃっ
Date: '2022-12-11'
Category: Python
Tags: [Python, Poetry, ESPNet]
Authors: ゆうぼう
Slug: espnet-poetry
Thumbnail: /images/thumbnails/python.jpg
Description: poetry add espnetではうまくインストールができなかった．．．そこで，poetryを用いてespnetをインストールする方法を共有します．
Published: true
---

`poetry add espnet`ではうまくインストールができないらしい．．．
そこで，poetryを用いてespnetをインストールする方法を共有します．

## `poetry add espnet`をするとどうなるか

~~~bash
$ poetry add espnet
$ # 或いは poetry add git+https://github.com/espnet/espnet

Using version ^202209 for espnet

Updating dependencies
Resolving dependencies... (16.1s)

Unable to determine package info for path: /Users/usr/unsupervised-speaker-diarization/.venv/src/pb_bss

Fallback egg_info generation failed.

Command ['/var/folders/lw/7tgtngh90p37c6k_fnbd_91m0000gn/T/tmpuu9nt656/.venv/bin/python', 'setup.py', 'egg_info'] errored with the following return code 1, and output: 
Traceback (most recent call last):
  File "/Users/usr/unsupervised-speaker-diarization/.venv/src/pb_bss/setup.py", line 3, in <module>
    import numpy as np
ModuleNotFoundError: No module named 'numpy'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/Users/usr/unsupervised-speaker-diarization/.venv/src/pb_bss/setup.py", line 8, in <module>
    raise ModuleNotFoundError("""
ModuleNotFoundError: 
This package has some Cython files that will be compilled,

when you install this package. The Cython files use numpy and scipy.

Please install them before you install this packges:

    'conda install numpy Cython scipy'
or
    'pip install numpy Cython scipy'
~~~

`numpy`と`Cython`と`scipy`を入れろと怒られます．

しかし，個別にこれらのライブラリを入れたとしてもうまくいきません．

## 解決策

こちらのissueが参考になりました．（[参考](https://github.com/espnet/espnet/issues/3640)）

どうやら問題なのは，espnetの`setup.py`らしいです．

Speech Enhancementのためにインストールする必要がある`ci_sdr`がpoetryに対応できていないのが原因だそう．

そこで，ローカルにリポジトリをクローンしてきて，対象箇所をコメントアウトすることで対応します．

手順は以下の流れになります．

~~~bash
$ git clone https://github.com/espnet/espnet
~~~

クローンできたら，`./espnet/setup.py`を書き換えます．
`"ci_sdr"`をコメントアウトします．

~~~python
# 30行目から一部抜粋
        # ASR
        "sentencepiece",
        "ctc-segmentation>=1.6.6",
        # TTS
        "pyworld>=0.2.10",
        "pypinyin<=0.44.0",
        "espnet_tts_frontend",
        # ENH
        # "ci_sdr"　　# <== ここが問題．コメントアウト
        "pytorch_wpe",
        "fast-bss-eval==0.1.3",
        # fix CI error due to the use of deprecated functions
        # https://github.com/espnet/espnet/actions/runs/3174416926/jobs/5171182884#step:8:8419
        # https://importlib-metadata.readthedocs.io/en/latest/history.html#v5-0-0
        "importlib-metad
~~~

編集したら，editableモードでインストールしましょう．

~~~bash
$ poetry add -e ./espnet # ここ大事． espnetではなく，./espnetでパス形式
~~~

`./espnet`とパスの形で書くことで，ライブラリ名のespnetとパスとしてのespnetを識別させましょう．

これでpoetryでespnetをインストールすることができます．

うまくpoetryが動かない時はサポートしていないライブラリが存在している可能性があるので注意しましょう！