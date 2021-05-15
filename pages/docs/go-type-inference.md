---
Title: Goはどうやら型を推論できるらしい話
Date: '2020-10-10'
Category: Go
Tags: Go
Authors: ゆうぼう
Slug: go-type-inference
Thumbnail: /images/thumbnails/gopher.jpg
Description: Goは静的型付言語でありながら、どうやら型を推論できるらしいですね。公式チュートリアルをみて知りましたが。ここでいくつか型を試してみたので、その実験結果を報告していきます。
Published: true
---

Goは静的型付言語でありながら、どうやら型を推論できるらしいですね。公式チュートリアルをみて知りましたが。ここでいくつか型を試してみたので、その実験結果を報告していきます。

## 静的型付らしい変数宣言

~~~go
var i, j int = 1, 2
~~~


よくやる印象を持つのはこれですかね。(Cの方がGoより馴染んでいる状態だからかもしれないけど)

とりあえず、*var variable type*で型宣言ができるという仕様なわけですね。

## 型推論(Goチュートリアルより)

Goのチュートリアルの中に「[型推論(type inferece)](https://tour.golang.org/basics/14)」というセクションがありました。そこからコードを引用させていただきます。

そこで紹介されていたコードがこちらです。

~~~go
package main

import "fmt"

func main() {
	v := 42 // change me!
	fmt.Printf("v is of type %T\n", v)
}

~~~

これで得られる結果がこちらです。

~~~bash
v is of type int
~~~

型宣言は明示的には行っていませんが、int型であることを推論し認識したようです。

それでは、次のセクションでは他に推論できた型を紹介していきます。

## 推論できた型集

ソースコードにより紹介していきます。

コード自体は先ほどの公式チュートリアルより引用させていただいたコードが元になっています。(Go使いではないので、慣習的によくない表現があれば教えていただきたいです。)

コードがこちら。

~~~go
package main

import "fmt"

func main()  {
	i := 3
	i32 := '3'
	f := 3.14
	j := 1 + 1i
	b := false
	s := "string"
	fmt.Printf("i is of type %T\\n", i)
	fmt.Printf("i32 is of type %T\\n", i32)
	fmt.Printf("f is of type %T\\n", f)
	fmt.Printf("j is of type %T\\n", j)
	fmt.Printf("b is of type %T\\n", b)
	fmt.Printf("s is of type %T\\n", s)
}
~~~

上記のコードより得られる結果がこちらです。

~~~bash
i is of type int
i32 is of type int32
f is of type float64
j is of type complex128
b is of type bool
s is of type string
~~~

個人的に詰まった？理解に苦しむのは*int32*ですかね。「''」と「""」が違った意味合いを持つのはPythonユーザからすると少しつまりますね。しかし、経験してしまえば覚えるので大丈夫ですね。

とりあえず、Go初めて勉強3日間の僕が観測できた型推論はこれらになります。

- int
- int32
- float64
- complex128
- bool
- string

他にもあったら教えていただきたいです。(Gopherの皆さんよろしくお願いします)

なかなか使いやすい言語と言った所感なので、これからGoの勉強とこのブログによるアウトプットをゆっくりやって行こうかなと思います。(他の開発が最優先なので)

今回は「**Goの型の推論**」についてお話ししました〜。それでは。

## 追記

uint8(unsigned int8)もできるみたいです。情報提供ありがとうございます。

~~~go
func main()  {
	u := []byte{'3'}
	fmt.Printf("u is of type %T\\n", u)
}
~~~


出力は以下になります。

~~~bash
u is of type []uint8
~~~
