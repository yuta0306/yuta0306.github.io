---
Title: 自然言語処理(NLP)のコーパスって何なん？
Date: '2020-07-11'
Category: ML
Tags: [ML,NLP]
Authors: ゆうぼう
Slug: corpus
Thumbnail: /images/thumbnails/network.jpg
Description: 自然言語処理という機械学習のタスクにおいて「コーパス」という言葉が出てきます。そのコーパスについてお話をしていきます。
Published: true
---

## コーパスとは

**コーパス(corpus)**とは、集めた文書のことをいいます。

もともとの原義としては、ある主題とかある作者に関する文書を集めたものがコーパスと呼ばれていたそうです。

現在はもう少し広義で捉えられ、**文書や音声を集めたデータそのもの、あるいはデータに情報を付与して加工したもの**を総称してコーパスというそうです。

最近の自然言語処理のタスクの進展は、このコーパスに活用による部分が多いです。

## 生コーパス(raw corpus)
前のセクションで話したように、コーパスには加工を加えたものと、そのまま生データのものと二通り考えられました。

そこで、生データのままの文章や音声を「**生コーパス(raw corpus)**」と呼ぶことができます。

## 翻訳に関するコーパスの分類
生コーパスの中でも、その種はいくつか存在します。
このトピックでは機械翻訳で扱われるようなコーパスの分類についてお話します。

## #対訳コーパス／パラレルコーパス
まずは、「**対訳コーパス(bilingual corpus)**」または「**パラレルコーパス(parallel corpus)**」です。

この対訳コーパスとは、翻訳関係にある2言語の文書対を収集した生コーパスになります。このコーパスは、非常に貴重ではありますが、なかなか入手しにくい希少なデータです。しかし、この対訳コーパスは機械翻訳においてとても重要な知識源となっていることは確かです。

## #コンパラブルコーパス
対訳コーパスでは、希少なコーパスであったのに対して、  「**コンパラブルコーパス(comparable corpus)**」は、しっかりとした対訳関係にないにしても、同じトピックに関して2言語の文書対のコーパスです。

コンパラブルコーパスは、対訳コーパスほどきっちりとした対訳が制約されないので、このような文書は大量に存在します。これらの文書を収集したものがコンパラブルコーパスです。

例としてわかりやすいのは、Wikipedeaでしょう。  Wikipediaでは言語リンクでつながった複数の言語でのページが存在します。これらの文書対ではきっちりとした対訳は保証されませんが、大量のデータを入手することができ、これも極めて重要な知識源となります。

## まとめ
以上がコーパスに関する簡単な説明でした。他にも均衡コーパス(balanced corpus)や注釈コーパス(annotated corpus)といった分類もあります。

ここで抑えるべき重要なことは、コーパスとは広義で**文書や音声を集めたデータそのもの、あるいはデータに情報を付与して加工したもの**ということでしょう。

今回は主にコーパスの説明とともに生コーパスについての説明をしていきました。実際に加工を加えたコーパスに関しては、また別の記事にしたいと思います!
