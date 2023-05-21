---
Title: 【論文まとめ】Highway Transformer\: Self-Gating Enhanced Self-Attentive Networks
Date: '2023-05-21'
Category: 論文
Tags: transformer,Highway Transformer,Gating Mechanism,Self-Dependency-Units (SDU)
Authos: ゆうぼう
Slug: Highway-Transformer:-Self-Gating-Enhanced-Self-Attentive-Networks
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c1d2b55a-8e61-4918-8a5e-bee7f61e9f4d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_12.58.57.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180536Z&X-Amz-Expires=3600&X-Amz-Signature=3a2649aaae274fbabf93cde0b58588663b3b7e6a951c5a628fb5bbca202a7140&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Highway Transformer: Self-Gating Enhanced Self-Attentive Networksのまとめ
Published: true
---

## 概要

LSTM-styleなSDUを提案

ゲートとしてSDUをTransformer内部に適用することにより，ハイパラをチューニングすることなく，Transformerの浅い層において，内在的な意味の重要性を捉え，より早い収束を可能に

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ee071883-293d-4802-ab74-1f3298ab1ad1/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_12.58.57.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180540Z&X-Amz-Expires=3600&X-Amz-Signature=90235e0c189715ed2ad9e053ac0ded46a7529072523ceb561856d73c171cbc63&X-Amz-SignedHeaders=host&x-id=GetObject)

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

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/983f88c3-b4c6-4017-89a5-c11814060ffe/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.21.41.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180603Z&X-Amz-Expires=3600&X-Amz-Signature=dc4b94706aaae77f3e190ab3103d101fb2152f6216dcfdef0d162302fe053706&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bf1a2c53-9065-4c50-bc7a-7cb9aae77dd8/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.22.04.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180607Z&X-Amz-Expires=3600&X-Amz-Signature=8deccd38d03139667d4e160812d04d855e16f2c37db8428d5434b33bbbfd46f4&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/43698a9d-abf7-4007-b343-7b9dc2a4e588/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.22.25.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180609Z&X-Amz-Expires=3600&X-Amz-Signature=99f3e053d8e49ec68bef5d06de3bbd3f71e880cd411b9f6561244597055b24a1&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6cd06f60-3432-42c1-b90a-e8cafdb254a5/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.22.43.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180612Z&X-Amz-Expires=3600&X-Amz-Signature=546157c3dbc57dbdfebfd19724491ba4026390d3b968e6bf79cbed0cdc8fdec4&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a5b222bb-5fc4-4ad6-9c08-e7cde9bc7b8d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.23.01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180614Z&X-Amz-Expires=3600&X-Amz-Signature=ce5717a7823c4d6531b7dfa3ca8cf71fd84bc9cafa5e0613c111b5c5380bda2a&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2e0b4670-6891-40f4-859b-a6b50feaeb9b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.23.12.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180620Z&X-Amz-Expires=3600&X-Amz-Signature=50441be8be1fbd4908b07ebc956da7e7343e0db5ec91e01a264d275a9c4a4394&X-Amz-SignedHeaders=host&x-id=GetObject)



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c48f4870-1a31-45e3-984e-d9622e262bad/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.23.37.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180625Z&X-Amz-Expires=3600&X-Amz-Signature=34e626fb90de9065c1df255c4293c825cd190bb783589c4d1bd6e1a4f96eb6a0&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d6970bfd-1cd0-40f2-ac05-d9d46e1db8aa/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-08-26_13.23.48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180628Z&X-Amz-Expires=3600&X-Amz-Signature=b60865c113b62ddaae3f5496c4f83f6248f60a34763b8df0f9a6aef50aba250d&X-Amz-SignedHeaders=host&x-id=GetObject)

sigmoidによるSDUが安定しているが，データとタスクによってはtanhの方がoutperformすることがある

いずれのactivationを使っても収束は早い



enwik8による大規模データでの追実験において，提案手法が浅いレイヤーには寄与することが確かめられた



SDUで計算量が増えるが，そこまで差はなかった

## その他（なぜ通ったか？等）



## 次読みたい論文

