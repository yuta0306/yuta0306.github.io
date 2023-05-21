---
Title: 【論文まとめ】Multi-Hop Transformer for Document-Level Machine Translation
Date: '2023-05-21'
Category: 論文
Tags: MT,transformer,Multi-Hop Transformer
Authos: ゆうぼう
Slug: Multi-Hop-Transformer-for-Document-Level-Machine-Translation
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/31894441-2dc1-4741-aa95-3d3a1d9b6411/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_13.58.23.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180640Z&X-Amz-Expires=3600&X-Amz-Signature=f3b170858b4feaeb830ff35992d79604941439a760b4f7426fe311b73b9298f5&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Multi-Hop Transformer for Document-Level Machine Translationのまとめ
Published: true
---

## 概要

Document-level neural machine translationにおいて，Multi-Hopなアーキテクチャを導入することにより，従来手法と比べて精度の高い文脈を考慮した機械翻訳を実現

翻訳者のように，頭の中に翻訳のドラフトを作り，文脈に合わせて適切に修正する流れ（human-like draft-editing）を明示的にモデリング

大きな事前学習済みモデルを使うことなく，使用に足る機械翻訳モデルを実現

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c2619e4c-99b6-4874-8d32-2f7a07bb54a3/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_13.58.23.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180650Z&X-Amz-Expires=3600&X-Amz-Signature=4a9ebbe96f6c5752e6fc236e0119656f4b12b60887449c2c7aa040705e510b1b&X-Amz-SignedHeaders=host&x-id=GetObject)

アーキテクチャ周りのこと

### Sentence Encoder

source-sideとtarget-sideでそれぞれPretrained Encoderがあり，source contextとtarget draftの分散表現をそれぞれ得る

### Multi-Hop Encoder

source-contextにおいて文章ごとのreasoningをして，現在の文章の分散表現を得る

### Multi-Hop Decoder

target-side draftから情報を取得して，翻訳の確率分布を得る



そのほかアーキテクチャの工夫

### Contet Gating

contextual informationを過剰にutilizeしすぎないように，context gating machanismを採用

contextと現在の文章間の重みを動的にコントロールする

$\alpha = \sigma(W_a A_s^{(n)} + W_b B_{s-i}^{(n)})$ where sigma is logistic sigmoid function

## 新規性

Docment-level NMTにおける従来手法の問題点

1. 文章間のreasoningの特徴づけを明示的に行うことなく，単純にcontextの分散表現を導入
2. 推論時にはアクセスできないのに，訓練時には追加入力としてのtarget contextにground-truthなデータを入力
↑　訓練時と推論時において状況が異なる



Document-level NMTにおいてMulti-Hop reasoningをモデリングしたMulti-Hop Transformerの提案と提案モデルによるDocument-level NMTの大きな性能改善

target contextにground-truthで訓練すると推論時にはアクセスできないため，他の翻訳モデルの翻訳結果を使用することで，訓練時と推論時の状況を同じにした

## 実験

Baseline

Transformer

CA-Transformer

CA-HAN

CADec



計算量のオーバーヘッドを改善するためSentence Encoderはそれぞれのsideでパラメータを共有

## まとめ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e9aa2659-c723-4d78-b619-a2fca604a864/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_14.26.30.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180722Z&X-Amz-Expires=3600&X-Amz-Signature=3c66aee5b1251f84f761a12c1b07c5f26d1114707c08ad8eb206be319a3d6204&X-Amz-SignedHeaders=host&x-id=GetObject)

large-scaleな事前学習済み言語モデルを使用することなく，SoTA翻訳クオリティを達成



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/648e061a-037a-47b0-9ccd-cb5e34f0584a/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_14.28.39.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180725Z&X-Amz-Expires=3600&X-Amz-Signature=d8e366424556a63c360223cb870221afa415f0600f1de00904ef774da473a490&X-Amz-SignedHeaders=host&x-id=GetObject)

contextを付与するためのAttentionの構造は，ConcatやHierarchicalよりもMulti-HopなAttentionが効果があり



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7b8e8b86-406c-4fca-ac8d-f024c3d62def/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_14.30.06.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180728Z&X-Amz-Expires=3600&X-Amz-Signature=02d6ca507eda285f489eb36d05990ce6b4189bcdd66b43c4cf724d22483fd766&X-Amz-SignedHeaders=host&x-id=GetObject)

contextを考慮する幅のwindow sizeは大きくするほど効果が上がるわけではなく．3が最も良かった

4以上にすると悪化傾向らしく，本研究ではwindow size = 3 を採用



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/38aeab8f-9c30-446e-b0a5-c01920ef5946/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_14.36.58.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180731Z&X-Amz-Expires=3600&X-Amz-Signature=27f587002275197d83d43ed3fcc6ac2f71ea54f41e42d6d313e5619a7b726883&X-Amz-SignedHeaders=host&x-id=GetObject)

contextにおいてreasoningするときの方向は，一般的な読み順の通りleft-to-rightで順方向にreasoningさせた方が結果は良かった



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4f9ed4db-e0ac-48b0-9f5d-44af8ae2d2c5/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-23_14.38.40.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180733Z&X-Amz-Expires=3600&X-Amz-Signature=5819e87b937d230adb78032278ea562724af2a498fd6ffff524e7b434f34dd8b&X-Amz-SignedHeaders=host&x-id=GetObject)

訓練時と推論時にtarget draftに与える文章が異なる問題への対処に関する実験結果

Referenceはground-truthをtarget draftとして与えて訓練，Draftはpre-trained MT systemが生成した翻訳結果をtarget draftとして与えて訓練したモデル

Draftの方が結果がよく，pre-trained MT systemの生成結果をtarget draftとする方法によって訓練時と推論時のギャップの橋渡しになることを示唆する結果

## その他（なぜ通ったか？等）



## 次読みたい論文

[Context-Aware Self-Attention Networks](/5955ca444629476ebf23e66629a2413f)



