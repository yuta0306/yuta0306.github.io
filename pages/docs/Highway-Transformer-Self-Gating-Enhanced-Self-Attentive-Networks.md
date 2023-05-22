---
Title: '【論文まとめ】Highway Transformer: Self-Gating Enhanced Self-Attentive Networks'
Date: '2023-05-21'
Category: 論文
Tags: [transformer,Highway Transformer,Gating Mechanism,Self-Dependency-Units (SDU)]
Authos: ゆうぼう
Slug: Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks
Thumbnail: /images/thumbnails/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks.png
Description: 'Highway Transformer: Self-Gating Enhanced Self-Attentive Networksのまとめ'
Published: true
---

## 概要

LSTM-styleなSDUを提案

ゲートとしてSDUをTransformer内部に適用することにより，ハイパラをチューニングすることなく，Transformerの浅い層において，内在的な意味の重要性を捉え，より早い収束を可能に

## 提案手法

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/8k6bi4pv.png)

### Self-Dependency Units (SDU)

sigmoid gatesを導入する

$\Psi$はゲートとして作用し，logistic sigmoidもしくはtanhで実現

筆者らの認識

tanhはupdate gateとして作用し，重要度の幅を-1 to 1に制限

sigmoidはLSTMのinput gateと似ていて，feature-wise levelでどれくらいの情報を残すか決定

### Pseudo-highway Connection

residual connectionされたgating-modified encodingsでMulti Head Dot Product Attention (MHDPA)の分散表現を豊かにするため，新たな計算グラフの枝を追加し，SDUとIdentityとMHDPAをpost LNを使用してresidual connectionする

## 新規性

本来，人にとって，読み物をよりよく理解するためには，global contextだけではなく，ここの単語の意味も必要

→ Self-gatingなアプローチを提案



1.  Transformerにおける浅い層において，trainingとvalidationでハイパラチューニングすることなく，より高速な収束を達成
2. Transformerでの低レイヤーにおいて，local-range encodingにフォーカスした層を実現
3. Self-gating mechanismは，R-TransformerやTransformer-XLのコンポーネントとしてRNN-likeなメカニズムを補完
## 実験

SDUを導入し，PTBデータセットにおけるSDUの効果を検証

sigmoidとtanhを実験

## まとめ

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/wkvb0w3b.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/78a3mp9o.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/44cjh1ml.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/pyc6iyml.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/pn7oohqa.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/jq3ijo8p.png)



![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/jqxalgb9.png)

![](/images/article/Highway-Transformer-Self-Gating-Enhanced-Self-Attentive-Networks/w2x338gk.png)

sigmoidによるSDUが安定しているが，データとタスクによってはtanhの方がoutperformすることがある

いずれのactivationを使っても収束は早い



enwik8による大規模データでの追実験において，提案手法が浅いレイヤーには寄与することが確かめられた



SDUで計算量が増えるが，そこまで差はなかった

## その他（なぜ通ったか？等）



## 次読みたい論文

