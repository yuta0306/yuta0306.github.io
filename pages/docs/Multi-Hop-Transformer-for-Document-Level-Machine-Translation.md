---
Title: '【論文まとめ】Multi-Hop Transformer for Document-Level Machine Translation'
Date: '2023-05-21'
Category: 論文
Tags: [MT,transformer,Multi-Hop Transformer]
Authos: ゆうぼう
Slug: Multi-Hop-Transformer-for-Document-Level-Machine-Translation
Thumbnail: /images/thumbnails/Multi-Hop-Transformer-for-Document-Level-Machine-Translation.png
Description: 'Multi-Hop Transformer for Document-Level Machine Translationのまとめ'
Published: true
---

## 概要

Document-level neural machine translationにおいて，Multi-Hopなアーキテクチャを導入することにより，従来手法と比べて精度の高い文脈を考慮した機械翻訳を実現

翻訳者のように，頭の中に翻訳のドラフトを作り，文脈に合わせて適切に修正する流れ（human-like draft-editing）を明示的にモデリング

大きな事前学習済みモデルを使うことなく，使用に足る機械翻訳モデルを実現

## 提案手法

![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/m53mefg3.png)

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

![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/ttppissj.png)

large-scaleな事前学習済み言語モデルを使用することなく，SoTA翻訳クオリティを達成



![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/5tcp1vq8.png)

contextを付与するためのAttentionの構造は，ConcatやHierarchicalよりもMulti-HopなAttentionが効果があり



![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/02f89lfl.png)

contextを考慮する幅のwindow sizeは大きくするほど効果が上がるわけではなく．3が最も良かった

4以上にすると悪化傾向らしく，本研究ではwindow size = 3 を採用



![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/0ea5zzmc.png)

contextにおいてreasoningするときの方向は，一般的な読み順の通りleft-to-rightで順方向にreasoningさせた方が結果は良かった



![](/images/article/Multi-Hop-Transformer-for-Document-Level-Machine-Translation/dxq6ycal.png)

訓練時と推論時にtarget draftに与える文章が異なる問題への対処に関する実験結果

Referenceはground-truthをtarget draftとして与えて訓練，Draftはpre-trained MT systemが生成した翻訳結果をtarget draftとして与えて訓練したモデル

Draftの方が結果がよく，pre-trained MT systemの生成結果をtarget draftとする方法によって訓練時と推論時のギャップの橋渡しになることを示唆する結果

## その他（なぜ通ったか？等）



## 次読みたい論文

[Context-Aware Self-Attention Networks](/5955ca444629476ebf23e66629a2413f)



