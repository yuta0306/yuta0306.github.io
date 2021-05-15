---
Title: '突然Macのターミナル起動時に"zsh compinit: insecure directories"が現れる'
Date: '2020-08-21'
Category: Linux
Tags: [Mac, zsh]
Authors: ゆうぼう
Slug: zsh-compinit
Thumbnail: /images/thumbnails/terminal.png
Description:  'ここ最近になってからなのだが、ターミナル起動時に毎回"zsh compinit: insecure directories, run compaudit for list. Ignore insecure directories and continue [y] or abort compinit [n]?"という表示が出るようになった。このchmodで権限を変えてあげたら直ったので、その共有。'
Published: true
---

ここ最近になってからなのだが、ターミナル起動時に毎回  
*"zsh compinit: insecure directories, run compaudit for list. Ignore insecure directories and continue [y] or abort compinit [n]?"*  
という表示が出るようになった。このchmodで権限を変えてあげたら直ったので、その共有。

## 警告"zsh compinit: insecure directories"の発生

いつも通り、ターミナルを起動させてあげます。  
するとこんな警告が出たわけです。

~~~bash
zsh compinit: insecure directories, run compaudit for list.
Ignore insecure directories and continue [y] or abort compinit [n]?
~~~

なんだか知らないけど、**安全でないディレクトリたちがあるよ、compaudit動かしてね**的なことを助言されたわけです。

yを押そうが、nを押そうが僕の場合はどちらも動かず...
なんで？って感じだったけど、こちらから**compaudit**を走らせてあげればいいわけなんで、走らせます。

## compauditで確認

**compaudit**で確認します。

~~~bash
~ % compaudit
There are insecure directories:
/usr/local/share/zsh/site-functions
/usr/local/share/zsh
~~~

これらが安全ではないらしい。色々ネット調べてたけど、Qiitaも漁ったけど、みんなこのディレクトリで悪さを検知してるみたい。

## chmodで権限を変更する

**chmod**で権限を変更します。

~~~bash
~ % chmod 755 /usr/local/share/zsh/site-functions
~ % chmod 755 /usr/local/share/zsh
~~~

これで権限変更が可能です。  
rootでなければもしかしたらsudoが必要になることもあるのかな？

とりあえず、デフォで使ってる人ならuser作ったりしてない気がするので、とりあえずこれで動くとも思う。

ここでうまくいけば、ターミナル再起動すれば警告は出なくなっているはず。

人によっては、これら以外のディレクトリでinsecureと言われていることもあるかもしれないので、その場合はそれらもいじってあげてください。

今回は以上!
