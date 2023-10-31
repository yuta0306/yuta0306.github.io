---
Title: brew install python@3.12でuuid.hがない!!
Date: '2023-10-31'
Category: Python
Tags: [Python, brew]
Authors: ゆうぼう
Slug: brew-python3.12-uuid
Thumbnail: /images/thumbnails/python.jpg
Description: "brew install python@3.12をすると，./Modules/_uuidmodule.c:11:12: fatal error: uuid.h: No such file or directoryと出てきて，ビルドができません．単にuuidをインストールするだけではダメで，コツがいるようでしたので解決法を共有します．"
Published: true
---

`brew install python@3.12`をすると，`./Modules/_uuidmodule.c:11:12: fatal error: uuid.h: No such file or directory`と出てきて，ビルドができません．単にuuidをインストールするだけではダメで，コツがいるようでしたので解決法を共有します．

## 問題&解決法（忙しい人向け）

```sh
$ brew install python@3.12
...
(略)
...
./Modules/_uuidmodule.c:11:12: fatal error: uuid.h: No such file or directory
   11 |   #include <uuid.h>
      |            ^~~~~~~~
compilation terminated.
make[2]: *** [Makefile:3114: Modules/_uuidmodule.o] Error 1
make[2]: *** Waiting for unfinished jobs....
make[2]: Leaving directory '/tmp/pythonA3.12-20231031-639797-1j9sddh/Python-3.12.0'
make[1]: *** [Makefile:796: profile-gen-stamp] Error 2
make[1]: Leaving directory '/tmp/pythonA3.12-20231031-639797-1j9sddh/Python-3.12.0'
make: *** [Makefile:808: profile-run-stamp] Error 2
```

どうやら`uuid.h`をインクルードしたいらしいのですがどうやら見当たらないようです．

解決法は以下のとおりです．（あくまでも一例）

```sh
$ brew install ossp-uuid  # uuid.hを入手
$ ln -s $(brew --prefix)/include/uuid/uuid.h $(brew --prefix)/include/uuid.h  # シンボリックリンク
$ brew install python@3.12
```

これでインストールができるはずです！

## 原因は？

python3.12をビルドする時に，依存関係のあるヘッダファイルは`$(brew --prefix)/include/`から読み込まれていそうでした．

この時，`python@3.12`は`uuid.h`を必要とするのですが，それを含む`ossp-uuid`に対して依存関係の記述がないため，対象のディレクトリに存在しない場合に問題が問題が起こっている様でした．
ただし，それだけではないのが，今回面倒なところです．

```sh
$ brew install ossp-uuid
```

を実行すると`$(brew --prefix)/include/uuid/uuid.h`というように配置され，`include/`配下に直接置かれていないために，参照できず同じエラーが起こります．

そのため，

```sh
$ ln -s $(brew --prefix)/include/uuid/uuid.h $(brew --prefix)/include/uuid.h
```

として，`uuid.h`に`uuid/uuid.h`のシンボリックリンクを直接張ることで適切にビルド時に参照されることになります．

今回`uuid`が問題となりましたが，他のパッケージでも同じようなことが起こりうると思われるので，同様のエラーが起きた場合はチェック項目の一つとなりそうです！
