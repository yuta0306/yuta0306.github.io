---
Title: 【論文まとめ】A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social media
Date: '2023-05-21'
Category: 論文
Tags: COMET,mental health,NLP,mental state knowledge,mentalisation,Contrasive Learning,MentalRoBERTa,KC-Net
Authos: ゆうぼう
Slug: A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bcd9cf65-a266-4729-a855-f08f28d9578e/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_9.30.20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181306Z&X-Amz-Expires=3600&X-Amz-Signature=bee4522c1b4c4915939a2f749e0fcab83ac7b62fd4b39ee8fe1038470174fba8&X-Amz-SignedHeaders=host&x-id=GetObject
Description: A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social mediaのまとめ
Published: true
---

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ce8ac11c-bb77-4047-aca2-b3bf53b16368/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_9.30.20.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181309Z&X-Amz-Expires=3600&X-Amz-Signature=0301994b6faf8a478cc24bfc525e20d3f2287e7b133168e2065e9bdb19f52839&X-Amz-SignedHeaders=host&x-id=GetObject)

上の流れで学習して，メンタル状態を外部知識のEmbeddingを利用しながら捉える

1. Data Preprocessing
- nltk sentence tokenizerを使ってpostを文区切にする
- →文ごとのmental stateを捉えるため
2. Context-aware post (CAP) encoder
RoBERTaをdomain-specificなデータで学習した**MentalRoBERTa**なるものがあるのでそれを使って，context-awareなエンコーダとして使用する

3. Mental satte knowledge infusion
mental stateの知識を捉えるため，ATOMICで学習されたGPTベースのCOMETを使用する

理由：

↑mental stateとmental health conditionの関係を捉えるために，ConceptNetではなくATOMICで学習されたものを使った

- ConceptNet：一般的な言語の概念を含む
- ATOMIC：human interactionを捉えたcommonsenseを含む
1. Feature extraction
以下の5つのaspectを使用した

- intent of S
- effect on S
- reaction of S
- effect on others
- reaction of others


**面白ポイント：COMETのlm_headを削除し，Transformerの内部のみをEncoderとして扱う**

直接的にpost representationをモデルに統合できて，mental-related variablesを適応することが期待できる

CAP embeddingsによるtoken-level representationは，max poolingによってsentence-level representationとされる

$\hat{H}_j^i = max\_pooling(H[P_{j-1}^i : P_j^i])$

2. Knowledge-aware mentalisation
5つの独立したGRUを使用して，mentalのaspect毎に学習するスタイル

これでpost-level representationになる

その後GRUによるmental aspectごとのpost-level representationとmax poolingされたsentence-level representationをAttentionすることで統合する

4. Supervised contrasive learning
より文章のsemantic meaningに注意して学習するために，contrasive learningを使用した

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6aba2985-13d9-4484-bb9e-da2def220431/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_9.31.30.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181343Z&X-Amz-Expires=3600&X-Amz-Signature=2d72674319f5c0334a18317851132b44a572c8b43f9f10e79c978732d88bad93&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b6fa8c7b-2c69-4574-b317-258cc41aafc8/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_9.32.16.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181344Z&X-Amz-Expires=3600&X-Amz-Signature=a43e2c440e21ed2ee9f0d2e5b7093248861ea9dd0368df834bdc6d01c8eb1816&X-Amz-SignedHeaders=host&x-id=GetObject)



## 新規性

- mental state knolwedgeを使うことでスピーカー（実験ではpostした人）のmental stateを明示的にモデル化する
- model state knowledgeを理解し，使うモデルの能力を強くするため，knowledge-aware dot-product attentionに基づくmentalisation moduleを導入
## 評価方法

baseline

- CNN
- GRU
- BiLSTM_Attn
- LR+Features (Logistic Regression)
- EMO_INF
- BERT
- RoBERTa
- MentalRoBERTa


Precision / Recall / F1を比較

## 何がすごかった？

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9ae321b3-ac70-408f-8142-e261bac6ede1/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_10.16.17.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181403Z&X-Amz-Expires=3600&X-Amz-Signature=4ab133115e59b20cb0a4e0d1797a72b51b5078476ef52c15550f4d76b9b1ad0f&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8d095eb4-866b-499f-91ff-c36cd97e8669/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-12_10.16.36.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181407Z&X-Amz-Expires=3600&X-Amz-Signature=916dcadc9833d97c90f75269bd90c412934b7a911f634cdf11eba3aae13dcc4c&X-Amz-SignedHeaders=host&x-id=GetObject)

- label情報を完全に利用するためのsupervised contrasive learningを使用することでclass-specificな特徴量を捉える必要性を議論
- SOTAモデル on three stress and depression detection datasets
## 次に読みたい論文

CEM: Commonsense-aware Empathetic Response Generation



