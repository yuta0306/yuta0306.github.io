---
Title: 【論文まとめ】A Survey of Knowledge-Intensive NLP with Pre-Trained Language Models
Date: '2023-05-21'
Category: 論文
Tags: survey,NLP,knowledge-base,PLMKE,commonsense,encyclopedic,Knowledge-Intensive NLP
Authos: ゆうぼう
Slug: A-Survey-of-Knowledge-Intensive-NLP-with-Pre-Trained-Language-Models
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/72a3a885-7a2d-4363-ba6b-3371efd274e7/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-22_17.49.18.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181845Z&X-Amz-Expires=3600&X-Amz-Signature=4f2395f9c9ae855d53990b80015353bf52b3381b31b93d31fe5fd92cdd60b7a5&X-Amz-SignedHeaders=host&x-id=GetObject
Description: A Survey of Knowledge-Intensive NLP with Pre-Trained Language Modelsのまとめ
Published: true
---

まとめること

1. Knowledge-Intensive NLPの概要
2. Knowledge Sources
1. Encyclopedic Knowledge
2. Commonsense Knowledge
3. 最近のKnowledge Sourcesの特徴
3. Knowledge-Intensive NLP Task
1. Knowledge-Intensive NLP Taskの概要
2. Knowledge-Intensive NLP Taskの特徴
4. Knowledge Fusion Methodsについて
1. Pre-Fusion Methods
2. Post-Fusion Methods
3. Hybrid-Fusion Methods
4. 代表的なモデルの紹介
5. Challengingなことと今後の方向性
1. Unified PLMKEs Across Tasks and Domains
2. Reliability of Knowledge Sources
3. Reasoning Module Design


## 概要

事前学習済みモデルにより，モデルのcapacityは増加傾向にあるが，encyclopedicやcommonsenseを用いた，knowledgeableなNLPモデルの需要の高まりが生じている



**PLMKEs (Pre-trained Language Model-based Knowledge-Enhanced models)**についてまとめたsurvey論文



linguistic or factual knowledgeは暗示的にモデルのパラメータに保存される

→事前学習済みのNLPモデルがより汎用的な能力を持つことを一部ではあるが説明できる

今のpre-trained LMは，明示的なencyclopedicやcommonsenseのレバレッジ能力に欠けている



PLMKEsは，関連する外部知識を取り出すモジュールと知識を混ぜるモジュールがある



PLMKEsに関連した重要な3つの要素がある

1. Knowledge Sources
2. Knowledge-Intensive NLP Tasks
3. Knowledge Fusion Methods


## Knowledge Sources

### Encyclopedic knowledge

エンティティに関する属性とエンティティ間の関係性をもった知識

Entity: person → Attributes: age → Relations: educated at



Wikipediaは大量のencyclopedicな知識を持っている

人物の経歴やイベントの背景などを含んでいる



一般的にはtripletsで構成されていることが多い

e.g. <Tom Hanks, occupation, actor>

Wikidataのような知識データがPLMKEsに広く使用されている



### Commonsense Knowledge

日常生活のなかでの状況に関する知識

イベントとその影響を記す

e.g. mop up the floor if we split food over it / study hard to win scholarship / goat has four legs

commonsenseの特徴

多くの人の間で共有されている知識であり，コミュニケーションの中で暗示的に想定されている知識である

commonsenseもtripletsで表現される



最近のPLMKEsでは，ConceptNetとATOMICが外部知識として使用されることが多い



### Knowledge Sourcesの特徴

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/30b21e96-66e9-4c93-b612-2a5ec35b43c9/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_16.42.16.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181930Z&X-Amz-Expires=3600&X-Amz-Signature=a08e0cc46127ef5b006be5eca7349c3b4f203325cb4dd1c39cb9757131c24c8e&X-Amz-SignedHeaders=host&x-id=GetObject)

large-scaleでdiverse



現在のソースはより正確で安定的に作られている

アノテーションのプロセスは部分的に自動化されていて，非エキスパートにもaccessibleになっている



知識データがカバーするドメインは多様

オープンドメインのものもあれば，specificなドメインのものも

Wikipedia, DBPedia, Freebaseなどはオープンドメイン

UMLSやAMinerなどはbiomedicineやscienceの特定ドメイン

domain-specificなアプリケーションをブーストできる知識

commonsenseに関しては

ConceptNetやTransOMCSは複数のドメインのcommonsenseをカバー

ATOMICやASERはある特定のタイプのcommonsenseにフォーカスした知識ソース



## Knowledge-Intensive NLP Task

### 概要

Knowledge-intensive NLP taskは必要とする知識ソースの種類で2つに分けられ，さらに詳細に分けることができる

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ab23c756-9f8e-4f3c-a76c-cdd674276022/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_17.02.12.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181947Z&X-Amz-Expires=3600&X-Amz-Signature=b76560af21a3c08235665cc245c16fb63334660f36a2530535b06fa485395991&X-Amz-SignedHeaders=host&x-id=GetObject)

- encyclopedic knowledge-intensive NLP task
encyclopedicの知識ソースを利用する

- open-domain QA
- fact verification
- entity linking
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/28ba511c-8fa2-4031-9624-7a7460f25913/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_17.02.31.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181952Z&X-Amz-Expires=3600&X-Amz-Signature=b0c31adc0b4a7f7ea85b0fe08456ba8559910988866d93f039288cbd4421f3a6&X-Amz-SignedHeaders=host&x-id=GetObject)

- commonsense knowledge-intensive NLP task
commonsenseの知識ソースを利用する

commonsenseの多様性のために，タスクのタイプ自体も多様化している

モデルが正確に日常のシナリオを理解し，応答するか否かのテストにフォーカスしたタスク

- General Commonsense
- Social Commonsense
- Physical Commonsense
- Temporal Commonsense


### Knowledge-Intensive Taskの特徴

実際は，モデルにとってだけではなく，人間にとってもいかなる知識の参照なしに問題に答えるのは難しい．（バラクオバマの誕生日はいつ？など



しかも，外部知識が必要なのにinputとして必要な外部知識が渡されないため，とてもチャレンジングなタスクになっている

そもそも必要な外部知識にグラウンディングするモジュールをPLMKEsの設計に加えることを考慮するようになっている



## Knowledge Fusion Methods

モデルが知識を統合するステージは二箇所あり，

- Pre-fusion; pre-training
- Post-fusion; fine-tuning
の二通りが考えられる（もしくはその両方のステージ



### Pre-Fusion Methods

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ddeea37a-3062-47f7-b3ac-15057b8a1349/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_17.11.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182017Z&X-Amz-Expires=3600&X-Amz-Signature=914d261462ed9d88bc35c4edfa5d080b2ffe29c48a555d3ffe8d9407c9fc70a8&X-Amz-SignedHeaders=host&x-id=GetObject)

pre-trainingのステージで知識を統合する手法

モデルに知識を入力するため，構造化された知識データを非構造化データのテキストコーパスへと処理→モデルに入力



テキストデータとして知識を入力するため，大きくモデルのアーキテクチャを変更する必要はない



ただし，知識グラフのような構造化データを非構造化データへ変えることは難しいこともある

簡単な対処法はエンティティと関係性を結合するか，流暢な文章をconditional text generation modelに生成させるか

Zhang et al. 2019 | Agarwal et al. 2021 を参照（必要になれば読む



### Post-Fusion Methods

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a978299c-4851-41c8-a702-a3aafb0f9323/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_17.37.53.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182027Z&X-Amz-Expires=3600&X-Amz-Signature=e4e8f6a6703612a8f1118eb67304d93279f45d48fff78fd6f0b2c2d8b2b5a063&X-Amz-SignedHeaders=host&x-id=GetObject)

まず，関連知識をキャプチャする

次に取得した関連知識をGNNなどのエンコーダでembeddingを得る

- それを追加特徴量としてpre-trained LMに与える（図でいうA）
- 直接pre-trained LMに入力する（図でいうB）


### Hybrid-Fusion Methods

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b696904a-be2b-4bd8-9d93-ca87a47ecc5e/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_19.38.22.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182031Z&X-Amz-Expires=3600&X-Amz-Signature=8c309aba75c92d449b843fead794f87d2bd0340923faeef77c381a33ab5eb82e&X-Amz-SignedHeaders=host&x-id=GetObject)

pre-trainingとfine-tuningの両方のステージで知識を統合する



追加の学習されるretrieverによりaugmentされたpre-trained modelは，fine-tuningのステージでより効果的にretrieverからの知識を活用できる



retrieval-augmented pre-trainingでhybrid-fusionが広く使われている



### 代表的なモデル

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ce1f044a-ba15-4c30-8d61-eab525800d9d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-26_19.39.00.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182039Z&X-Amz-Expires=3600&X-Amz-Signature=2bfc9853f1a4e6bff019baa7c3effe98a1c01a806e603f05131576021c53bf3e&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/81d13c12-2379-4709-bc00-97fd4185fd4b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-31_12.00.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182039Z&X-Amz-Expires=3600&X-Amz-Signature=3f15cc31ed578332b99f8185529710bceec9e12123b9b990b31a909b1da89850&X-Amz-SignedHeaders=host&x-id=GetObject)

Table4/5はSOTAモデルを示す



encyclopedic knowledge-intensive taskにおいては，BOOLQをのぞき，全てpost-fusionを採用

commonsense knowledge-intensive taskにおいては，CommonsenseQAをのぞき，全てpre-fusionを採用



pre-fusionとpost-fusionの違いは何？

pre-fusionは，知識を事前学習のパラメータに暗示的に保存数る

最終的にどの知識がパラメータに保存するのかを決定するのは難しい

知識の引き出しや利用の難しさが増す

