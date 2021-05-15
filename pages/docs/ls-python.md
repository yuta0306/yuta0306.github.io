---
Title: PythonからUNIXコマンド発出【ls編】
Date: '2020-11-10'
Category: Python
Tags: [Python, subprocess]
Authors: ゆうぼう
Slug: ls-python
Thumbnail: /images/thumbnails/python.jpg
Description: PythonからUNIXコマンドを使いたい。そんな時があると思います!(多分滅多にないと思うけど)今回は、「ls」コマンドをPythonスクリプトから実行していこうと思います。
Published: true
---

**PythonからUNIXコマンドを使いたい**。そんな時があると思います!(多分滅多にないと思うけど)今回は、「ls」コマンドをPythonスクリプトから実行していこうと思います。

## subpocessモジュールを利用

今回の用件を満たすのに必要なのは、「**subprocessモジュール**」になります。Python3.5から*subprocess.run()*というメソッドでサブプロセスをつなげて、コマンドを走らせるという方法が推奨されているみたい...

os.systemとかos.spawn\*の代用だそうですね

というわけで、**subprocessモジュール**を使用していきます。

インポートはそのままです。

~~~python
import subprocess
~~~

## subprocess.run()で実際に走らせる

それでは早速「ls」コマンドを走らせてみましょう。(実行結果はディレクトリ構造に依存するので、人により異なります)

~~~python
import subprocess

res = subprocess.<span class="function">run(
    ['ls']
)

print(res)
~~~

この実行結果は以下になります。

~~~bash
CompletedProcess(args=['ls'], returncode=0)
~~~

特段注意すべきは、コマンドをリスト又はタプルで入力することでしょうか。基本的にスペースを入れることはできません。引数やフラグを足す際に、スペースが必要ならば、リストやタプルにカンマ(,)で区切りましょう。

と言いますか...ん？？

ディレクトリ群出てこないんですけど...  
というのも、あくまで返ってくるのは**subprocess.CompletedProcess**クラスだからですね。

## CompletedProcessをいじってみる

実行出来たはずなのに、結果が帰って来ないようじゃ意味がないので中身を開けていきましょう。

CompletedProcessクラスには以下のメソッドや変数が存在しています。

- .args
- .returncode
- .stdout
- .check_returncode()
- .stderr

これから先のチェックは、さきのプログラムの続き。returnされたものは*res*に入っている。

~~~python
print(res.args)
# >>> ['ls']

print(res.returncode)
# >>> 0

print(res.stdout)
# >>> None

print(res.stderr)
# >>> None
~~~

という結果に...

プログラムが期待通り終了した場合、0が返ってきます。

ただ、標準出力、標準エラーには*None*が返ってきていますね。どこにも結果がないのだけど...

## 実行結果をみる!!

実は、subprocess.run()には、出力をキャプチャする引数があったみたいです。それが**capture_output**。これをTrueにすると出力が保存されます。

~~~python
import subprocess

res = subprocess.<span class="function">run(['ls'], capture_output=True)

print(res)
# >>> CompletedProcess(args=['ls'], returncode=0,
stdout=b'Applications\nLibrary\nSystem\nUsers\nVolumes\nbin\ncores\ndev\netc\nhome\nopt\nprivate\nsbin\ntmp\nusr\nvar\n',
stderr=b'')
~~~

これで出力をみることができました。

他にもコマンドを使うことができるので、必要に応じてsubprocessモジュールを使ってみてください。

今回はこれにて終了！

</section>