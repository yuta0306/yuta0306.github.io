---
Title: Pythonのデコレータの挙動を実験してみた
Date: '2020-10-26'
Category: Python
Tags: [Python, デコレータ]
Authors: ゆうぼう
Slug: decorator-timing
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonにはデコレータというものがあるのですが、意外と初学者には知られていない存在で比較的不思議な挙動をする感じがします。関数を直接的に実行しなくともファイルを読み込んだ段階で実行されるようなので、挙動について実験してみました。
Published: true
---

Pythonには**デコレータ**というものがあるのですが、意外と初学者には知られていない存在で比較的不思議な挙動をする感じがします。関数を直接的に実行しなくともファイルを読み込んだ段階で実行されるようなので、挙動について実験してみました。

## デコレータ活用例

まずは、デコレータの活用例をお話しします。(Numpyから借用)

Numpyにおいては、関数のモジュールを*numpy*に変更しており、override.pyか_override.pyだかに*set_module*関数が作られていたと思います(ちょっと曖昧)

適当な関数を定義してモジュールを変更します。

~~~python
def set_module(name):
    def decorator(func):
        func.__module__ = name
        return func
    return decorator
    
def check_module(func):
    print(func.__module__)
    
@set_module('mylib')    # module名書き換え
def changed():
    pass
    
# module名変更なし
def not_changed():
    pass
    
if __name__ == '__main__':
    check_module(changed)
    check_module(not_changed)
~~~


各関数の役割

- set_module
    - デコレータ
    - 関数のモジュール名を変更する
- changed
    - モジュール名を変更される関数
- not_changed
    - モジュール名を**変更されない**関数

これらの実行結果が以下になります。

```bash
mylib
__main__
```

変更された方は、期待した通りモジュール名が*mylib*に変わっていて、変更していない方はメインルーティンに入っていることになっています。


## デコレータの挙動を追う

デコレータの挙動を追ってみます。基本的には動作がわかるように関数に機能はつけず、標準出力にて動作を確認していきます。

実験するための関数を用意します。

~~~python
def deco(name):
    print(name, '開始')
    def decorator(func):
        print(func.__name__, '実行')
        return func
    print(name, '終了')
    return decorator
    
@deco('deco1')
def test1():
    pass
    
if __name__ == "__main__":
    pass
~~~


特別難しいこともありません。ただ各タイミングで出力を待つデコレータです。

実行結果が以下になります。

```bash
deco1 開始
deco1 終了
test1 実行
```

デコレータの外の関数を動かした後、デコレートされた(装飾された)関数が返されるという感じです。

流れは以下になります。

1. デコレータの発火
2. デコレータにより関数を装飾
3. 装飾された関数が返ってくる
4. あとは3の関数を使うだけ

このような流れになっていきます。デコレータは関数を装飾するものなので、ちょっと特殊であまり使うことがない気もしますが...

また、**メインルーティンで何も動かしていないのにもかかわらず**、出力されています。

デコレータは読み込んだときに動くようです。その特徴がわかればそこまでデコレータは難しいものでもなさそうです。

あとでまた多重デコレータに関する話をしたいと思います。
