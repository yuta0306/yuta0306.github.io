---
Title: 【論文まとめ】Recent Advances in Deep Learning Based Dialogue Systems: A Systematic Survey
Date: '2023-05-21'
Category: 論文
Tags: survey,dialogue system
Authos: ゆうぼう
Slug: Recent-Advances-in-Deep-Learning-Based-Dialogue-Systems:-A-Systematic-Survey
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b6eb260b-8c7f-4cb6-877b-7844cd677787/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-22_17.44.29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182245Z&X-Amz-Expires=3600&X-Amz-Signature=f6e89f39c9b418b4e2739829b4e0f51e33f3a393bf7a3b2e11fb2d03f2343cc5&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Recent Advances in Deep Learning Based Dialogue Systems: A Systematic Surveyのまとめ
Published: true
---

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aa30067f-f9eb-4cf6-96d4-1d2afabc0781/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-03-22_17.44.29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182246Z&X-Amz-Expires=3600&X-Amz-Signature=7cfa5ccd280b4d86cbeb36260517c11653586aa725457d32830bb7e4c9873470&X-Amz-SignedHeaders=host&x-id=GetObject)

## 概要

対話システムに関するサーベイ論文



対話システムはNLPタスクの一種

研究の価値が高いNLPタスクを多く含むため，対話システムは複雑と言える．

ここ最近で良い成果をあげているもののほとんどがDL

メインは，モデルタイプとシステムタイプについて述べられる．



システムタイプ

タスク指向型

オープンドメイン型



### Keywords

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/75a43002-c16e-4129-8551-46bda6ea0706/_2021-06-04_16.00.31.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182256Z&X-Amz-Expires=3600&X-Amz-Signature=b3305959cc681102e8d027a66aceecdf9bdc7be556eff50dc8ff76970f7135ad&X-Amz-SignedHeaders=host&x-id=GetObject)

### サーベイの主張の流れ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/105a5fb4-3669-4648-95f1-dd44cc94066c/_2021-06-04_16.32.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182301Z&X-Amz-Expires=3600&X-Amz-Signature=2965cafe1b6130fe1862f6b5736daf7ffe4c0aa530732e9ca4c4227eeb14a7f1&X-Amz-SignedHeaders=host&x-id=GetObject)

## まとめ

### Introduction

対話システムはNLPにおいてホットな話題であり，産業においても需要が非常に高い．

タスク指向型とオープンドメイン型の対話システムが存在する．

昔ながらのタスク指向型は，Natural Language Understanding, Dialogue State Tracking, Policy Learning, Natural Language Generationの4つからなっていた

⇒

最近のSoTAモデルでは，E2Eのタスク指向型の対話システムが多い．

オープンドメイン型

- generative systems
- seq2seqなモデル
- ユーザのメッセージや対話履歴を返答系列にマッピングする(Trainingデータに存在しないであろうものも含む)
- 柔軟でコンテクストを読んだ返答をするが，時々主張が一貫しない返答や鈍感で面白くない返答を返す．
- retrieval-based systems (検索)
- 返答の集合の中から，すでに存在する適した返答を探す．
- 表面上では良い返答をする．ただし，返答集合は有限集合なので，対話上のコンテクストに対しては関係性があまりみられないこともある．
- ensemble systems
- 上記二つを含む
- Generatie systemsは検索システムをよくするために使われる．
- 検索システムはより適した返答を選ぶために使われる．
古典的な対話システムとして，finite state-basedとstatistical learningとmachine learning-basedが挙げられる．

- Finite State-based
- 対話の流れはあらかじめ決められている
- 決まったシナリオの中でしか対応ができない．
- Statistical Learning-based
- Finite State-basedよりは柔軟である．あらかじめ対応が決められていないから．
- machine learning-based
- Deep learningが主流？
NLPの中には対話システムに近い領域がある．

- Q & A
- reading comprehension
- dialogue disentanglement
- visual dialogue
- visual Q & A
- dialogue reasoning
- conversational semantic parsing
- dialogue relation extraction
- dialogue sentiment analysis
- hate speech detection
- MISC detection (???)


### Neural Models in Dialogue Sustems

- CNN
- ここ数年NLPの分野での応用も多いらしい
- フレーズや文章，パラグラフには意味づけをするのに有用でCNNがヒラルキーなモデルになる
- CNNは一条に乏しいため，最近のSoTAにおいては，テキストをencoderにかけたのちにCNNを用いてヒエラルキーな特徴抽出を行っている．
- 欠点として入力系列の長さは固定長のため以下の使用例
- encoderの出力をCNNでベクトル化
- contextと返答の候補を行列にして，CNNで近さを図ることによって，妥当な候補を選び出す
- 基本的にCNNとencoderはセットか？
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/58dce446-317f-44de-b28a-5a87a56cf515/_2021-06-05_11.23.05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182353Z&X-Amz-Expires=3600&X-Amz-Signature=f7247f748421b5e32e1e063676affc2497fd239429c4390442cf414e2c267447&X-Amz-SignedHeaders=host&x-id=GetObject)





- RNN and Vanilla seq2seq
- 系列として扱えるのが利点と考えるべき
- HMMや古典的な系列モデルだと，推論時のアルゴリズムの複雑さや考えるべき状態空間の増大に合わせて行列サイズが大きくなりすぎて，大きな状態空間を必要とするデータには対応しがたい．
- マルコフモデルは限られた条件下においては強力なモデルになりうる．
- RNNは最近では提案されないが，NLPタスクにおいては未だ現役として活躍することもある
- Jordan-Type & Elman-Type RNN
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cae115c2-6e35-4005-bd63-95db89df98be/_2021-06-05_11.33.20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182401Z&X-Amz-Expires=3600&X-Amz-Signature=94e55034b5d8706a2daf534ed82d377d175ed2fc38fb5c9931cc9592e496a513&X-Amz-SignedHeaders=host&x-id=GetObject)

- Jordan-Type RNN
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6d08e0be-96d8-4fe0-9ecd-52244da2d741/_2021-06-05_11.34.24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182403Z&X-Amz-Expires=3600&X-Amz-Signature=455bd2b58fa62e6afb8910dbd1a973a6bbea6be4554b617d5b195e74b0e3e409&X-Amz-SignedHeaders=host&x-id=GetObject)

- 最新の隠れ層の状態は，Input_tとOutput_t-1による


- Elman-Type RNN
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/19f38d19-5587-4770-9cec-a3fd1c555c86/_2021-06-05_11.34.33.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182406Z&X-Amz-Expires=3600&X-Amz-Signature=62602f1d34c76e36464bfefa0b27f54720de130dc14877eb671c76c204510bee&X-Amz-SignedHeaders=host&x-id=GetObject)

- 最新の隠れ層の状態は，Input_tとHidden_t-1による
- いずれにしてもシンプルなRNNは勾配消失か勾配爆発が大抵おこる


- LSTM
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/982bc260-69ec-4d59-af83-58c60d57e8af/_2021-06-05_11.42.38.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182409Z&X-Amz-Expires=3600&X-Amz-Signature=8d9e3ffcc008514085376acee0f638c28808cfd6de0c710d7b3cd8c8f6d3894f&X-Amz-SignedHeaders=host&x-id=GetObject)

- Gates
- 入力ゲート
- 忘却ゲート
- 出力ゲート


- GRU; Gated Recurrent Unit
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0a43b79f-ba25-46c0-83b4-d98279ca5a56/_2021-06-05_11.45.48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182417Z&X-Amz-Expires=3600&X-Amz-Signature=b35f12cd17bb65d7d75955b74f3e36e2d6a744f25a53207e1328ff9662adc6b8&X-Amz-SignedHeaders=host&x-id=GetObject)

- Gates
- 更新ゲート
- リセットゲート
- パラメータが少ないため，
- 早い
- 汎化性がみられる
- ただし，
- 大きなデータセットには対応しきれないこともある


- Bi-directional RNN
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f8fd9965-97c5-4172-b042-a0ac1a2c134a/_2021-06-05_11.53.33.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182424Z&X-Amz-Expires=3600&X-Amz-Signature=7057989f26331721a206c218ab237bb45faddd62dacdacaac8a22a25094eb19a&X-Amz-SignedHeaders=host&x-id=GetObject)

- 双方向を考慮したRNN


- seq2seq; Encoder-Decoder model
- 初めは機械翻訳のために提案された手法
- Encoderにより入力系列をベクトル化，その隠れ状態をDecodeして生成することを目指す
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6a1b161f-2991-4ded-9a60-fe9525addd7b/_2021-06-05_12.00.02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182429Z&X-Amz-Expires=3600&X-Amz-Signature=f3bb91d84517ccc4e66d3c3c20dd9ed1d427d33316e462b0bc040e7601264319&X-Amz-SignedHeaders=host&x-id=GetObject)

- Encode時
- t時刻のinputとt-1時刻のhiddenによって，t時刻のhiddenが決まる
- Decode時
- t時刻のhiddenとt-1時刻のoutputによって，t時刻のoutputをデコードする
- 入力系列と出力系列の長さが固定長である必要はない．
- その代わり，適応させる系列長と出力される系列長は同じになることは保証されない




- Hierarchical Recurrent Encoder-Decoder; HRED
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11de7452-73f5-44f0-986b-a3ba68d48cf1/_2021-06-06_12.46.26.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182441Z&X-Amz-Expires=3600&X-Amz-Signature=a1fd63b17e73624687fe6c8eed1fc67b061ec8fa8aba43747a7bcd1a9a3c3ab1&X-Amz-SignedHeaders=host&x-id=GetObject)

- コンテクストを理解するためのseq2seqモデル
- クエリの履歴を理解する？
- トークンレベルとターンレベルで学習する


- Memory Networks
- Attention and Transformer
- Attention
- Transformer
- Muti-head Attention
- Pointer Net and CopyNet
- Pointer Net
- CopyNet
- Deep RL and GANs
- Deep Q-Networks
- REINFORCE
- GANs
- Knowledge Graph Augmented Neural Networks


2章は途中から読むのやめた．使用されるネットワークよりも課題感の方が知りたい．



### タスク指向型対話システム

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d87782bb-ab38-4695-bb98-d8c12a227d1c/_2021-06-06_14.41.55.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182508Z&X-Amz-Expires=3600&X-Amz-Signature=4f3bcb06143762ceb21a47e5511d276caaf5d3643311a9701531c427d5d0f45c&X-Amz-SignedHeaders=host&x-id=GetObject)

ドメインの決まったタスクにおいて特定の問題を解決する．

- Natural Language Understanding
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2b964a3d-97f7-4eb0-9bc8-1e83f0458cfb/_2021-06-06_14.47.29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182513Z&X-Amz-Expires=3600&X-Amz-Signature=0e5806ac31bf2f9fd619c2b1c397aa3118a85239d68c372d3b00f8f763a80233&X-Amz-SignedHeaders=host&x-id=GetObject)

- 3つのタスクを持つ
- ドメイン分類
- 意図の理解
- スロット埋め
- IOB; Inside Outside Beginning
- NER; Named Entity Recognition
- intent detectionにおいては，Task-Oriented Dialogue BERTがSoTA?
- Domain classification & intent detectionは同カテゴリタスク


- slot filling task = semantic tagging
- NLUタスクを解く際に，音声データをそのままInputとして与える研究事例も出ているらしい
- エラーが少なくロバストなモデルになったらしい？
- Natural Language UnderstandingとNatural Language Generationは逆のプロセスをふむ
- 同時にタスクを学習結果が得られるというアプローチも


- Dialogue State Tracking
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d8c577f9-1dd9-45a4-a0af-a0801e202e93/_2021-06-07_22.53.27.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182526Z&X-Amz-Expires=3600&X-Amz-Signature=7eb74a0587b20a8544ba51c90acd3aadead1eb1ab21d6810f113784f3c208fbd&X-Amz-SignedHeaders=host&x-id=GetObject)

- ユーザの目的と対話履歴を追跡する
- NLUとDSTのタスクは近い関係にある．
- NLUは単語にtagを割り振っていくイメージ
- DSTはtagのplaceholderを会話の内容から埋めていくイメージ
- Dialogue Stateには3つの要素からなる
- Goal constraint corresponding with informable slots
- 特別なvalueの制約で，ユーザによって言及されるか特別な値をとる
- DontcareやNoneが特別な値にあたる
- Requested slots
- Search method of current turn
- 古典的な手法でいくと，
- ルールベースはエラーが多く，ドメイン適応が大変
- 統計的手法はノイジーな状態や曖昧性に弱い
- ニューラルネットな手法
- slot-valueのペアを事前定義して学習
- valueが大きくなると複雑性が増す
- slot-valueのペアを読むだけでよく，2値分類タスクとして解ける
- モデルの複雑性は避けられるが，反応速度が遅くなる可能性がある．
- slot-valueのペアを定義せずに，対話の中から直接選ぶ


- Policy Learning
- DSTモジュールの出力結果からどう行動をとるか
- 教師あり学習or 強化学習
- 教師ありだとアノテショーンデータセットを作るのがとても大変


- Natural Language Generation; NLG
- タスク指向型対話システムにおける最終層のモジュール
- 最終的な自然言語表現を生成するシステム
- 4つのコンポーネントからなる
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/02db3490-606b-40f7-9829-086aaf7a96fd/Screenshot_from_2021-06-08_09-06-59.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182554Z&X-Amz-Expires=3600&X-Amz-Signature=844042ae8ee41b5fd519f5bd488f9ad44c7c308d07c8160e6fc185d11c590ed8&X-Amz-SignedHeaders=host&x-id=GetObject)

- Content Determination
- Sentence Planning
- Surface Realization
- Lexicalization, Referring expression, aggregation
- RNNに基づいた統計言語モデルにおいて，意味的制約や文法構造による返答生成を行うなど
- コンテクストを理解した返答を生成することは重要である
- タスク指向型においては，返答の多様性というよりも信頼性のほうが重要視されがち
- 意味解析をビームサーチを使うことで，意味の正しさを改善する手法も提案された


- E2E Methods
- end-to-endのパイプラインを組むことで高いパフォーマンスを発揮することがあるが，
- 多くのモジュールを組み込むため，バックプロパゲーションで誤差が伝播しないこともある．
- すべてのモジュールが，返答の精度を向上するために，対等に重要であるとは限らない．
- 違うドメインに差し替えるとき，オントロジーを事前学習させる必要があるため，困難が生じることもある
- やり方は大きく分けて2つ
- すべてのモジュールを展開して誤差逆伝播させる？
- 知識ベースの検索システムと返答生成の双方を用いてパイプラインを組む
- タスク指向型においては，外部の知識源が必要なことが多い




### オープンドメイン型対話システム

- 雑談対話システム，或いはタスク思考型ではない対話システムのこと
- SoTAを示しているオープンドメインは大抵ニューラルネットで解決している
- 完全なるデータドリブンなものが多い
- オープンドメイン型対話システムは，大まか3つに分けられる
- 生成システム
- 検索ベースシステム
- アンサンブルシステム


３つの話が以下

- 生成システム
- 訓練コーパスに出てこないような返答に対して，ユーザのメッセージや対話履歴をマッピングするために，seq2seqなモデルを適用する
- 検索システム
- 決まった返答集合の中からすでに存在する返答を探そうとする
- アンサンブルシステム
- 生成手法と検索手法を合わせる．
- 生成された返答と検索された返答とを比べる．
- 生成も，検索された返答を洗練するために用いられる．


特徴として，

生成モデルは

柔軟でコンテクストを読んだ返答をできるが，ときには理解に欠けていたり，怠けた返答を見せることがある

検索ベースのモデルは

人の返答の集合から実際の返答を選ぶため，返答の集合は有限集合であり，コンテクストと相関がないことがある．

ただし，表面上のレベルでは，首尾一貫した返答することも多い



以下は，オープンドメイン型対話システムにおける，難しさとホットなトピックをまとめる



- Context Awareness
- 対話コンテクストは会話のトピックを決定したり，ユーザの目標を決定したりと重要
- コンテクストを解釈した対話エージェントは，現メッセージだけではなく，対話履歴からももとにして返答する
- 生成モデルも検索ベースも，どちらも対話コンテクストモデリングに依存する
- いくつかのモデルではAttentionが使用されているらしい
- 構造化されたAttentionを用いることでコンテクストを読み取れる？
- 対話をリライトする問題があるらしい
- 複数のメッセージから単一のメッセージに変換する目標
- ここではコンテクストを理解させることが重要
- Response Coherence
- 首尾一貫した返答は，良い生成器としての一つのクオリティ
- 対話の中で，論理的で首尾一貫しているか？という指標
- <ins>生成モデルにおいてホットなトピックとなっている（検索ベースはすでに人の返答をりようするのでもともと一貫性はあるという主張）</ins>
- 一貫性のない文の順序を見つけるタスクを解くことで，返答の一貫性を改善した事例もあり
- Response Diversity
- 人が多用するような表現は訓練コーパスにも多く含まれ，それらばかりを返答してしまうことが問題となりうる
- かつては条件付き確率において，尤度関数を解くことで尤もらしい返答をもとめていた．
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/80c38282-ca52-417c-bed3-bb37c143e388/Screenshot_from_2021-06-09_14-58-59.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182656Z&X-Amz-Expires=3600&X-Amz-Signature=a703b05e266c9d9ccd1f603ef60f64496d030d622fb03cf9dc2ff6ecbae87b88&X-Amz-SignedHeaders=host&x-id=GetObject)

- この手法では，返答の精度の安全性と適切さはトレードオフになっていた？
- ビームサーチを提案されたことも
- 
- Speaker Consistency and Personality-based Response
- システムは，訓練コーパスからサンプリングされた分布に対して学習
- 対話者の趣味といった一貫性のないものに対する返答は．．．
- 対話者の役割を理解し，その個人に合わせた返答が必要になる
- 1ステージではなく，3ステージで個人的な嗜好に対応した事例がある
- 
- Empathetic Response
- 同情する対話システムは，ユーザの感情の変化や感情に伴った適切な返答をする
- 雑談チャットについて，このトピックは重要
- CortanaやAlexaなどの製品にもモジュールが含まれている
- CoBERTのモデルなど
- 感情対話システムのデータセットはとぼしいが，新たなデータセットとベンチマークが提供されたらしい
- 
- Conversation Topics
- トピックや目的は，会話に参加した人と会話を続けるための重要な役割を果たす
- トピックを理解させることが重要
- 
- Knowledge-Grounded System
- 人は，会話のコンテクストと経験や記憶といったものとを関連付けて，返答をする（機会には難しい）
- 生成モデルは，単なる機械翻訳よりも複雑
- より自由度が高く，制約が曖昧なため
- 故に，雑談チャットは，外部から得られる常識と結びつけて，seq2seqなモデルによって生成する
- メモリーネットワークなどで，知識をグラウンディングする手法
- 知識グラフは外部の情報をソースにするものもある．
- graph attentionを用いて，常識をグラフベースで学習する手法も
- 主な考え方は，外部の知識グラフを使って，会話の論理の流れをモデリングする指標の一部として扱う
- Interactive Training
- 別名；human-in-loop training
- アノテーションされたデータセットは限られている
- すべての状況をカバーすることは不可能
- ユーザとの対話の中で，システムを改善する
- 強化学習における逐次学習を提案
- 対話相手と話して，その相手からフィードバックを得る
- 教師あり学習をした後，Interactive Trainingによってファインチューニングする
- 
- Visual Dialogue
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/024f212d-df8b-4569-a3f2-fe899fa0b606/Screenshot_from_2021-06-09_16-35-24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T182732Z&X-Amz-Expires=3600&X-Amz-Signature=71cf387985ea5733c7a0086c95d95c0290055e0d110a351ac24801aed290767a&X-Amz-SignedHeaders=host&x-id=GetObject)

- Visual Q & Aなど
- 画像あり対話システムのほか，映像あり対話システムも面白いトピックだが難題でもある
- 特徴量抽出の複雑さも増す
- visual dialogueのアノテーションは重労働であり，データセットに乏しいので，現在はデータの不十分さに悩まされている
- 
### 評価のアプローチ

評価の仕方も重要なパートとなっている



