---
Title: Overleaf+VSCode+GitHub+etcな執筆環境を整える
Date: '2024-01-03'
Category: 論文
Tags: [論文執筆, Overleaf]
Authors: ゆうぼう
Slug: overleaf-writing-on-local
Thumbnail: /images/thumbnails/overleaf-writing-on-local.png
Description: Overleaf+VSCode+GitHub+etcな執筆環境を整えるための環境構築ログです．
Published: true
---

無料のOverleaf環境ではGitHub連携ができないなぁと思い、ローカルに紐づけて執筆して、執筆のバージョン管理を行いたいぁと思っていたら、しゅんけーさん（[@shunk031](https://twitter.com/shunk031)）の次のポストを発見！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">書籍執筆で VSCode 上で Overleaf のファイルを編集できる拡張機能を使っているのですがやばすぎる。特に GitHub Copilot と組み合わせることでこれまで書いてきた文を元に suggest が効いてきて執筆効率が上がっています…<a href="https://t.co/RdOzcQZgzP">https://t.co/RdOzcQZgzP</a></p>&mdash; しゅんけー (@shunk031) <a href="https://twitter.com/shunk031/status/1731665542942240826?ref_src=twsrc%5Etfw">December 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

なんだかこれは良さそうな雰囲気！！

と言うわけで、今回はOverleaf + VSCode + GitHubを連携させて、+αを使った環境の構築を試みます．（本編でのαはGrammarly）

## 環境

|        |   バージョン   |
| :----: | :------------: |
|   PC   | Macbook Pro M2 |
|   OS   |  macOS Sonoma  |
| VSCode |     1.84.2     |

## 環境構築

以下の手順で構築していきます．

1. [Overleaf-Workshop](https://github.com/iamhyc/Overleaf-Workshop)の拡張機能をVScodeに入れる
2. [Latex-Workshop](https://github.com/James-Yu/LaTeX-Workshop)の拡張機能をVSCodeに入れる
3. Latex-Workshopの設定を変更
4. [texlive](https://formulae.brew.sh/formula/texlive)をインストール
5. +α [Grammarly](https://github.com/znck/grammarly)の拡張機能をVSCodeに入れる
6. Grammarlyの設定を変更

1, 3, 5はVSCodeの拡張機能で検索すれば一瞬で出てくるのでスキップ．

### Latex-Workshopの設定を変更
Latex-Workshopの設定を変更します．以下を設定から変えましょう．`cmd+,`で設定のタブが開けると思います．

```
Latex-workshop › Latex › Recipe: Default
- first
+ lastUsed
```

onSaveでtexソースをビルドするときに、デフォルト設定の`first`のままだとpdflatexのビルドが走ってしまいます．
日本語で書く場合や、日本語が含まれる場合はLuaTexを使っている人が多いと思いますが（？）、そうなるとマウスぽちぽちでLuaTex用のビルドを走らせるのがだるいです．

そのため、最後に使用したビルドの設定を反映させるためlastUsedにしておくと楽だと思います．

### texliveをインストール
これも説明するまでもないです．`brew`で簡単にインストールできるので、以下を叩きましょう．ちなみに`texlive`が嫌な人はこちらが代替になりそうです[[wiki](https://github.com/James-Yu/LaTeX-Workshop/wiki/Install#requirements)]．

```bash
$ brew install texlive
```

結構重いし、依存関係も割と多いので時間がかかりますが、待ちましょう．

### Grammarlyの設定を変更
Grammarlyの実行対象ファイルを設定します．

対象のデフォルトは以下になっています．
```
Grammarly › Files: Include
**/readme.md
**/README.md
**/*.txt
```

LaTexも動作対象にするため、`**/*.tex`を追加しましょう．
```
Grammarly › Files: Include
**/readme.md
**/README.md
**/*.txt
**/*.tex
```

これで、texファイルもGrammarlyの動作対象とすることができました．

## さぁ、執筆だ！
まずはOverleafと接続しましょう．やり方は、[GitHubの指示](https://github.com/iamhyc/Overleaf-Workshop)の通りでcokieを使ってログインします．

次に、対象のプロジェクトを任意のディレクトリに反映させます．これも↑と同様に書いてあります！

![demo07-local.gif](https://raw.githubusercontent.com/iamhyc/Overleaf-Workshop/master/docs/assets/demo07-local.gif)

ここまで問題なく来れれば、あとはローカルでLatex-Workshopに身を任せて執筆していきます．

## GitHub連携する
書ききったらバージョン管理をしていくわけですが、tagとかで管理すればいいんではないかなぁと言う雑な考えで管理してみます．

ちなみに、修正の余地はありそうですが、一旦以下の`.gitignore`を適用しました．pdf以外のビルド時のartifactsはコミットしないためです．
```
/**/*.aux
/**/*.bbl
/**/*.blg
/**/*.fdb_latexmk
/**/*.fls
/**/*.log
/**/*.out
/**/*.spl
/**/*.synctex.gz
```

tagを登録して、バージョン管理してみる．
```bash
$ git add .
$ git commit -m v0
$ git tag v0
$ git push --tags
```

## 課題
これでOverleafの執筆内容をローカルに移し、ローカルでの執筆をOverleaf上に反映させることができます．

しかし、多少課題があり、改善する方法を考えても良いのかなぁと言う点があります．

**ローカル執筆環境で作成したファイルがOverleaf上に反映されるのは良いのですが、削除が反映されません．**

Overleaf上に戻ったときに、いらないものを消さなければ行けなさそうなのがダルそうです．

あと、`hoge.fuga`が`hoge.fuga.git`として反映される場合があり...

この辺は対処法を探したほうがよさそうです．

とはいえ、これでローカルで執筆ができますし、作業内容はOverleafに同期されますし、しゅんけーさんの言うようにcopilotを使って執筆が捗ること考えれば旨味がでかいかもしれませんね！
