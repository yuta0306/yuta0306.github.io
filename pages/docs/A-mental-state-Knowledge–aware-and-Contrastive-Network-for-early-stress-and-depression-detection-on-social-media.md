---
Title: '【論文まとめ】A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social media'
Date: '2023-05-21'
Category: 論文
Tags: [COMET,mental health,NLP,mental state knowledge,mentalisation,Contrasive Learning,MentalRoBERTa,KC-Net]
Authos: ゆうぼう
Slug: A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media
Thumbnail: /images/thumbnails/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media.png
Description: 'A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social mediaのまとめ'
Published: true
---

## 提案手法

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/np2ocmqq.png)

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

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/04nj37zz.png)

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/ysnd1zri.png)



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

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/lx6rrayi.png)

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/82ry39gt.png)

- label情報を完全に利用するためのsupervised contrasive learningを使用することでclass-specificな特徴量を捉える必要性を議論
- SOTAモデル on three stress and depression detection datasets
## 次に読みたい論文

CEM: Commonsense-aware Empathetic Response Generation



