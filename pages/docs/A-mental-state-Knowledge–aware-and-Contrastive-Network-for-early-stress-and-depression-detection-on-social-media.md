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

本記事において使用される図表は，原著論文内の図表を引用しています．

また，本記事の内容は，著者が論文を読み，メモとして短くまとめたものになります．必ずしも内容が正しいとは限らないこと，ご了承ください．

## 論文情報

タイトル: A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social media

研究会: Information Processing & Management

年度: 2022

キーワード: COMET, mental health, NLP, mental state knowledge, mentalisation, Contrasive Learning, MentalRoBERTa, KC-Net

URL: [https://www.sciencedirect.com/science/article/pii/S0306457322000796](https://www.sciencedirect.com/science/article/pii/S0306457322000796)

DOI: [https://doi.org/10.1016/j.ipm.2022.102961](https://doi.org/10.1016/j.ipm.2022.102961)

データセット: Depression_Mixed, Dreaddit, SQuAD

## 提案手法

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/asccglgh.png)

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

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/9nzqkqxg.png)

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/u6fwk2ku.png)



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

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/82djhuwa.png)

![](/images/article/A-mental-state-Knowledge–aware-and-Contrastive-Network-for-early-stress-and-depression-detection-on-social-media/9rsi0ppo.png)

- label情報を完全に利用するためのsupervised contrasive learningを使用することでclass-specificな特徴量を捉える必要性を議論
- SOTAモデル on three stress and depression detection datasets
## 次に読みたい論文

CEM: Commonsense-aware Empathetic Response Generation




## 引用

> @article{YANG2022102961,
title = {A mental state Knowledge–aware and Contrastive Network for early stress and depression detection on social media},
journal = {Information Processing & Management},
volume = {59},
number = {4},
pages = {102961},
year = {2022},
issn = {0306-4573},
doi = {[https://doi.org/10.1016/j.ipm.2022.102961](https://doi.org/10.1016/j.ipm.2022.102961)},
url = {[https://www.sciencedirect.com/science/article/pii/S0306457322000796](https://www.sciencedirect.com/science/article/pii/S0306457322000796)},
author = {Kailai Yang and Tianlin Zhang and Sophia Ananiadou},
keywords = {Mental health, Natural language processing, Mental state knowledge, Mentalisation, Contrastive learning},
abstract = {Stress and depression detection on social media aim at the analysis of stress and identification of depression tendency from social media posts, which provide assistance for the early detection of mental health conditions. Existing methods mainly model the mental states of the post speaker implicitly. They also lack the ability to mentalise for complex mental state reasoning. Besides, they are not designed to explicitly capture class-specific features. To resolve the above issues, we propose a mental state Knowledge–aware and Contrastive Network (KC-Net). In detail, we first extract mental state knowledge from a commonsense knowledge base COMET, and infuse the knowledge using Gated Recurrent Units (GRUs) to explicitly model the mental states of the speaker. Then we propose a knowledge–aware mentalisation module based on dot-product attention to accordingly attend to the most relevant knowledge aspects. A supervised contrastive learning module is also utilised to fully leverage label information for capturing class-specific features. We test the proposed methods on a depression detection dataset Depression_Mixed with 3165 Reddit and blog posts, a stress detection dataset Dreaddit with 3553 Reddit posts, and a stress factors recognition dataset SAD with 6850 SMS-like messages. The experimental results show that our method achieves new state-of-the-art results on all datasets: 95.4% of F1 scores on Depression_Mixed, 83.5% on Dreaddit and 77.8% on SAD, with 2.07% average improvement. Factor-specific analysis and ablation study prove the effectiveness of all proposed modules, while UMAP analysis and case study visualise their mechanisms. We believe our work facilitates detection and analysis of depression and stress on social media data, and shows potential for applications on other mental health conditions.}
}
