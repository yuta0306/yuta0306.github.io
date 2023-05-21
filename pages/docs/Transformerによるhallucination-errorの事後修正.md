---
Title: 【論文まとめ】Transformerによるhallucination errorの事後修正
Date: '2023-05-21'
Category: 論文
Tags: dialogue system
Authos: ゆうぼう
Slug: Transformerによるhallucination-errorの事後修正
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/98a96bf0-24b9-4c30-96f1-71fdf80f43e0/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_12.22.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180746Z&X-Amz-Expires=3600&X-Amz-Signature=bbf7c6af01e3fef28b498a7a1b8804dd2fae7a5bc6a65e9056cfe436b825b7a5&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Transformerによるhallucination errorの事後修正のまとめ
Published: true
---

## 概要

文生成時に与えた外部知識と異なる内容の発話文を生成してしまうhallucination errorが課題

→　hallucination errorを含むデータを疑似的に作成し，BARTやTransformerを用いて事後修正を試みる

1.6BのTransformerでは52件中29件の事後修正をした

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3bcba150-6a78-45fc-a0dd-97a3e9bad3f1/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_12.22.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180752Z&X-Amz-Expires=3600&X-Amz-Signature=5d3226c18e48dd146955e5212a9a4fc1ed358a01a53c8391a750534e0971aed0&X-Amz-SignedHeaders=host&x-id=GetObject)

一つの発話文と知識源のペアをテンプレートとして複数のデータを疑似的に作成することで，各知識とカテゴリごとに40000件の発話ぶんと知識源のペアを作成

→　「営業時間」「アクセス」「料金」に関するエンティティを書き換えることで疑似的なhallcination errorを含んだ文を作成



ニューラル生成モデルは事実と無関係な文章を生成する場合がある

→　エンティティの書き換えだけではなく，無関係な発話を含んだデータも作成

## 新規性

hallucination errorを含むデータを疑似的に作成することで，ニューラルモデルによる事後修正の試み

## 実験

NTT製japanese-dialog-transormers（1.6B）

黒橋研製日本語BART（0.12B）



hallucination error修正学習データセットには，無関係な発話を含む（add_unrelated）とそれを含まない（baseline）データセットを二種類用意



※知識源とHEを[SEP]でつなげるが，普通はBARTは対応していないのでfairseq上ではFusion-in-DecoderをBARTに実装する必要があるらしい



評価指標

Faithfulness／BLEU-4 score

## まとめ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/223a1fa3-9e14-4b32-b4e6-5f1f6acc6fa1/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_12.29.56.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180811Z&X-Amz-Expires=3600&X-Amz-Signature=5b60d9a3d7e8fabff49e4d4ecef11cfd7d8a58824af9f3b3dbd58d1379797163&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/90a39955-a692-49de-90ab-e275d0be4108/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_12.30.09.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180813Z&X-Amz-Expires=3600&X-Amz-Signature=25e62e7377d2ceff9df3916c19fc1211f9c7a47de970fe37c73e4c9c56df7c65&X-Amz-SignedHeaders=host&x-id=GetObject)

BLEU-4は「数値が異なる」みたいな単純なhallucination errorは正しく評価できていないのでは？

BARTとTransformerの大きな精度差はおそらくパラメータ数と事前学習時のデータセットの差なのでは？



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dad75b6b-e4c4-4958-8398-39670f07754d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_12.32.27.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180817Z&X-Amz-Expires=3600&X-Amz-Signature=3c83e6b99e2c2f53d465e5a1a543ae074b0888859bf538bbf9ff8ea5fb6c7063&X-Amz-SignedHeaders=host&x-id=GetObject)

知識源に出現するエンティティの順序とモデルの主直に出現するエンティティの順序が同じ

→　エンティティが出現する順序に注目して書き換えを行っている可能性

正しくエンティティの関係を理解できていない？

add_relatedでは発話ぶんにある一文を削除する傾向が見られた

## その他（なぜ通ったか？等）

今後の展望

HE修正学習データセットの基となるデータの収集

書き換えルールなど作成方法の拡張の必要性

## 次読みたい論文

