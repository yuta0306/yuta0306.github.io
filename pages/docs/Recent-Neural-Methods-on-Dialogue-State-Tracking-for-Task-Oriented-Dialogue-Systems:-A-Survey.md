---
Title: 【論文まとめ】Recent Neural Methods on Dialogue State Tracking for Task-Oriented Dialogue Systems: A Survey
Date: '2023-05-21'
Category: 論文
Tags: dialogue system,survey,DST
Authos: ゆうぼう
Slug: Recent-Neural-Methods-on-Dialogue-State-Tracking-for-Task-Oriented-Dialogue-Systems:-A-Survey
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6a13b44c-3197-4abe-af23-58fa95611f92/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-22_17.46.56.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182049Z&X-Amz-Expires=3600&X-Amz-Signature=2b0d0e3c914b0fdbd1d6d8962774ef2c2250c83acfcf5074b114e8b8f0b2cc52&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Recent Neural Methods on Dialogue State Tracking for Task-Oriented Dialogue Systems: A Surveyのまとめ
Published: true
---

Data State Tracking (以下DST) on Task-Oriented Dialogue Systemに焦点を当てたsurvey

## Abstract

触れること

- タスク
- データセット
- evaluation metrics
- アプローチ


本論文では，二つのDSTモデルをしっかり区別する．

- static ontology DST models
- 固定された対話状況集合を予測する
- dynamic ontology DST models
- オントロジーが変化した時でも対話状況を予測する


Definition of ontology

a set of concepts and categories in a subject area or domain that shows their properties and the relations between them.



単一ドメインでも複数ドメインでもトラックすることや新しいドメインにスケーリングすることのモデルの性能について議論する

Terms: knowledge transfer, zero-shot learning



カバーしている年代は2013~2020



## Introduction

Task-oriented dialogue system:

ユーザーがタスクを成し遂げるようにするシステム

チケット予約，レストラン予約，カスタマーサポートなど



<ins>ユーザの要求を正確にトラッキングする性能は，一貫していて効果的な対話を可能にする</ins>

対話状況をslot-valueで表現するDSTコンポーネントを使った情報をトラッキングする

↑この精度がとても重要で，下流のコンポーネントがこの状況を利用して，次のactionを決定する



DSTタスクは，実際Natural Language Understanding (以下NLU)のタスクを統合している

ただし，単なるslot filling taskよりも複雑になっている



DST

現在のturnまで，対話レベルでslot-valueを予測

Slot Filling

特定のturnのみ考慮してslot-valueを予測すれば良い



モデルとしては以下が提案されている

RNN-based models

Attention-based models

Transformer-based models



<ins>ここ最近では，単一ドメインではなく，マルチドメインやflexibleにドメインの移行をするモデリングの研究が盛んらしい</ins>





## Dialogue State Tracking

そもそもDSTとは



### Dialogue State

$S_t$: dialogue state

→turn $t$ までにおける対話履歴のsummary

次の行動を決定するための全ての十分な情報を含んでいる

$t$   : turn



$(slot, value)$: このペアで，ユーザの目的を捉える

slotはOntology $O$ の中で事前に定義されていて (ドメイン依存であるが)，

valueはユーザによって与えられた各スロット $s$ で決められる



レストランの例で言えば

$s_t = \{(FOOD, ITALIAN), (AREA, CENTRE)\}$のようになる



slotのタイプは二つ

1. informable
対話から得られる→FOODやAREA

2. requestable
システムが与える→ADRRESSやPHONE



### Dialogue State Tracker

1. turn-level prediction
各ターンで与えられるslot-valueを予測

2. dialogue-level prediction
各ターンでの完全な対話状況を予測



### Turn-level prediction

直近のturn $t$ からslot-valueを予測する

rule-basedの場合は，そのルールに従って，$s_{t-1}$に統合して$s_t$を得る

turn $t$ を優先したり，

確率を利用して統合したり

learning to updateの場合は，turn-levelの予測を入力として，対話状況を予測する方法を学習する



### Dialogue level prediction

各turn $t$ において，完全な対話履歴を入力として，完全な対話状況 $s_t$ を予測する

直前の対話状況 $s_{t-1}$ を考慮しないため，$s_{t-1}$と$s_t$に一貫性がないこともある





## Datasets

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a3d38be7-a154-45ca-9eb7-dc64ccd44191/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2021-10-23_12.28.45.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182159Z&X-Amz-Expires=3600&X-Amz-Signature=be99eaffa376611036e3852a993c51417d9054fc0b4c4be95800e3134f000e4e&X-Amz-SignedHeaders=host&x-id=GetObject)

- Dialog State Tracking Challenge (DSTC)
- DSTC2 and DSTC3
- WoZ2.0
- MultiWoZ
- Schema-Guided Dataset (SGD)
- TreeDST
- Machine-to-Machine (M2M)


## Evaluation Metrics

- Average Goal Accuracy
- Joint Goal Accuracy
- Requested  Slots F1
- Time Complexity




## Static Ontology DST Models

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/98ee8408-1d36-4b00-9e5c-86a78778e553/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2021-10-24_10.52.45.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182211Z&X-Amz-Expires=3600&X-Amz-Signature=2bb62448f566678805c24acd66257c26107c4ea7751669c254cfe7b3dda92772&X-Amz-SignedHeaders=host&x-id=GetObject)

slot-valueは事前に定義されている

→

output layerは

- feed-forward layer
- slotとvalueが固定なので，それらはembeddingされているため可能
- softmax
- 全てのslot-valueのペアの確率を求める
- sigmoid
- それぞれのslot-valueの確率を求める


### Delexicalization

imbalanced training data for slot-valuesに対処する効果的なアプローチ

入力のslot valuesをラベルの名前に置き換える

I want Chinese food.

→ I want F.VALUE F.SLOT.



### Data-driven DST

delexicalizationは確かに効果的だが，手作業でのfeature engineeringが必要になる

→ data-drivenな手法が提案された



### Parameter sharing

昔のモデルはslotごとにエンコーダが分かれていた

→そのため全てのslotに対してパラメータを共有する手法が提案された

StateNet？



### RNN and latency in DST

予測時間が問題だったため，それに対する対策の提案



### Encoder based on pre-trained LM

BERTなどを使うことで，捕捉できるslot valueが増えた





## Dynamic Ontology DST Models

オントロジーが事前定義されていなくてもslot-valueをトラッキングする必要がある



アプローチは2種

1. ユーザの入力からslot-valueをコピー
2. outputにslot-valueを生成


下図は2種のアプローチを合わせたアーキテクチャ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8d86f101-492b-4c69-a759-25fad9a9c727/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2021-10-24_10.57.18.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182238Z&X-Amz-Expires=3600&X-Amz-Signature=a7930e45f7f862a03d3af11a21c6394584c56203546ecd6458f51c3888f48268&X-Amz-SignedHeaders=host&x-id=GetObject)



static ontology vs dynamic ontology

staticだとvalueが有限だが，

dynamicだとoutputの語彙数がとても大きくなる



### Copy and pointer networks

