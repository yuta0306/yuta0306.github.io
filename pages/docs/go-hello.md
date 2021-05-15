---
Title: GoでHello, world!
Date: '2020-10-05'
Category: Go
Tags: Go
Authors: ゆうぼう
Slug: go-hello
Thumbnail: /images/thumbnails/gopher.jpg
Description: GoでHello, world!
Published: true
---

**GoでHello, world!**

今回はただそれだけをしたいと思いますw

## チュートリアルによくあるHello, world!

hello.goというファイルに書き書きしていきます。

~~~go
package main

import "fmt"

func main() {
    fmt.Printf("Hello, world!")
}
~~~


そしてターミナルから実行します。

~~~bash
$ go run hello.go
Hello, world!
~~~


これがよくある標準出力させるプログラムになります。

構造は至ってシンプルで、*fmt*をインポートして、そのメソッドである*Printf*で出力するという感じです。

他にも*fmt.Println*や*fmt.Print*といった物もあるようですが。


## ビルトインにprintln

ビルトインを漁ってみるとなんだか、*println*というビルトイン関数を発見!!

これで試しにハロワしてみました。  
こちらも*hello.go*に書いていきましょう。

~~~go
package main

func main()  {
    println("Hello, world!")
}
~~~


このコードもターミナルから同様に実行していきます。

~~~bash
$ go run hello.go
Hello, world!
~~~


同じような結果が得られました。

*fmt.Println*をするなら、ビルトイン関数の*println*で代用できそうですね。

一応ブートストラッピングとかデバッグに有用性を示せるみたいです。

簡単にデバッグをするときに、このビルトイン関数を使えば良いでしょう。チュートリアルでもfmtをインポートして使っているので、推奨はfmtなんですかね。

その辺はもう少し知見をつけてからにしようと思います。

とりあえずはこれだけでHello, world!はできそうです。
