---
Title: 【論文まとめ】Internet-Augmented Dialogue Generation
Date: '2023-05-21'
Category: 論文
Tags: dialogue system,Internet-Augmented
Authos: ゆうぼう
Slug: Internet-Augmented-Dialogue-Generation
Description: Internet-Augmented Dialogue Generationのまとめ
Published: true
---

## 概要

検索クエリを生成し，Bing検索の結果をもとに応答生成を行うことで，大規模言語モデルの抱えるhallucinationの問題を軽減しつつ，up-to-the-minute relavent informationを導入した生成を可能にする．

インターネットによるaugmentationを行わないモデルやFAISSベースのモデルよりも，search-queryのモデルは優れた会話能力を達成した．

## 提案手法

提案手法 (Search Engine-Augmented Generation) の流れ

1. コンテクストから検索クエリを生成
2. $N$個のドキュメントを取得
3. FiD (Fusion in Decoder)モデルによって，個々のドキュメントをエンコードし，対話コンテクストと結合して，応答を生成


インターネットへのアクセスの手法

1. **FAISS: distributed approximate nearest-neighbor databaseにストアすることでページをキャッシュ**
1. これがベースライン的な手法
2. Common CrawlのデータをFAISSストアして検索をかける
3. ベースライン手法
1. RAG (Retrieval Augmented Generation)
2. FiD (Fusion in Decoder)
3. FiD-RAG
4. FAISS + Search Query-based Retrieval
2. **インターネットに直接アクセスしてページを取得**
1. FAISS-basedの手法の課題を解決するため
1. リアルタイムなウェブ情報に更新するのが難しい
2. ローカルのFAISSにストアできるウェブページの数には限界がある
3. インターネット検索エンジンがチューニングしているハイクオリティなページのランキングの利点を活かせない
## 新規性

- インターネットにアクセスすることで，常に数え切れないほどの最新の情報にアクセスし，それを取り入れた応答生成を可能にする
- knowledge regulationなどを行うことで，dynamic state of the worldに対応する
- 大規模言語モデルは，知識をweightsの中で記憶してしまうため，hallucinationが起きやすい→これを正則化によってよりうまく情報をcopyするように学習させる
- 長い目で見れば機械学習の手法は実世界とのインタラクションが求められるが，まず自然な第一ステップとしてインターネットへのアクセスをモデル化してみた．
## 実験

Wizard of the Internet (WizInt)という新たなタスクで評価

T5, BART-large, BlenderBotをファインチューニング

Retrieval-augmented methodは5つのドキュメント ($N = 5$) を使用

デコーダ

ビームサーチ with ビームサイズ = 3

最小sequence length = 20

beam blocking ngram = 3



評価指標

PPL

F1

gold responseとのオーバーラップを評価

Knowledge F1 (KF1)

モデルの応答と人間がデータ収集時に使った知識のオーバーラップを評価

→ F1とKF1はトレードオフ

KF1が高く，F1が低いと知識には富んでいるが，会話能力は低

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/046eaf2d-d2ad-4c64-88ff-1da3652d09db/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_10.56.43.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180245Z&X-Amz-Expires=3600&X-Amz-Signature=5bc0838e45dcfd8e8bd5eaccc3119950721a181ddda4d06ec738e7c3365f5031&X-Amz-SignedHeaders=host&x-id=GetObject)

Table 3からBART-largeを全てのモデルのPLMベースとして採用

## まとめ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1ca77f8a-f779-4b89-848d-c91da6c62f4a/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.01.48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180251Z&X-Amz-Expires=3600&X-Amz-Signature=9ff218f5ee589b534be2eb715c0f7f63df861d554e66d55106b4c556781442fd&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/27573c8b-3d99-43f9-94ab-7587b26b32cc/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.05.44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180251Z&X-Amz-Expires=3600&X-Amz-Signature=b964e89f1e9d2ae8e64e0d7d742d7020fc7ef4ff29b833797ce37314e5799441&X-Amz-SignedHeaders=host&x-id=GetObject)



対話生成のプロセスにインターネットの情報を与えると，人との対話においてより事実との不整合の少ない情報を生成することができる

## その他（なぜ通ったか？等）

### Datasetの概要

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2eb1422e-7ff7-4cc5-8196-bde757915ce2/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.09.02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180259Z&X-Amz-Expires=3600&X-Amz-Signature=710c789b847b28780b36828dceb94a0c5e64477a947408b006326fd9d96fa982&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d5ea08a4-45cf-49ef-91e7-377133215991/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.13.05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180259Z&X-Amz-Expires=3600&X-Amz-Signature=c399c60223e5461c49e6402da18bbd25141af21f76ecef9ac70feb5bb99e2712&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f4dc75e0-c5fc-4c72-87a2-038fa4da489d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.09.20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180301Z&X-Amz-Expires=3600&X-Amz-Signature=be8accd7244e0323058c7cae973662a3e4e6aeed3ea7cbe2166c7cd14b85b449&X-Amz-SignedHeaders=host&x-id=GetObject)



Wizard vs apprentice (Figure 3がペルソナ設定のインターフェース)

Wizardは対話しながらネット検索ができる

→検索された結果をアノテーションし，適切な検索結果が得られなければもう一度検索でき，検索結果を無視することも可能

Apprenticeはペルソナを選び，そのもとでチャット

ペルソナはPersona-ChatとTopical-Chatデータセットに含まれるペルソナから選択



### データ収集インターフェース

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0085580b-3278-476e-9ec5-c2ffb77d7b29/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.14.35.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180312Z&X-Amz-Expires=3600&X-Amz-Signature=cecc9811d038c323c2fe77514541206c99c29f182089e0ff4f7ff1c05af76ae4&X-Amz-SignedHeaders=host&x-id=GetObject)

### 対話例

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f4ea4c49-8c2d-461e-90f8-e088f140236f/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.15.44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180317Z&X-Amz-Expires=3600&X-Amz-Signature=76f2ea0ce416603f36d781351eb7ef96112d254becc9fc794f003d7a505d656d&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a7cbe08f-b519-4f38-9fd3-c04ac200ca59/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.16.36.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180318Z&X-Amz-Expires=3600&X-Amz-Signature=6b2ceb55e526c639addff82e913b3131ffa72b15726b9e4466b940d897fd4d63&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/34dfeedc-b77c-4a35-b702-75063a8bc508/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.17.07.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180320Z&X-Amz-Expires=3600&X-Amz-Signature=98cefeb4eb76d733e0f66f1ee4b6da121400d4424e577568f4f62b89a1f4604c&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f32d2168-6cc4-4d1a-9144-28b7b9f08403/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.16.06.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180322Z&X-Amz-Expires=3600&X-Amz-Signature=3303ed5f702bd5f37007ea86bd77140491402ebe7cdd5c95864ea40e0fb5c497&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/297251c8-e380-41bb-bd63-e7d5cb7a3a85/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-12-01_11.16.52.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180323Z&X-Amz-Expires=3600&X-Amz-Signature=b96877406775d10be4cac4190bb15461878b6252b5145dad83309750f2de7c68&X-Amz-SignedHeaders=host&x-id=GetObject)



## 次読みたい論文

