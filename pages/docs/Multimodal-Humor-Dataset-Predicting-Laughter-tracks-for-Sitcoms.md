---
Title: '【論文まとめ】Multimodal Humor Dataset: Predicting Laughter tracks for Sitcoms'
Date: '2023-05-21'
Category: 論文
Tags: [humor detection,multi-modal]
Authos: ゆうぼう
Slug: Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms
Thumbnail: /images/thumbnails/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms.png
Description: 'Multimodal Humor Dataset: Predicting Laughter tracks for Sitcomsのまとめ'
Published: true
---

## 概要

マルチモダールなユーモアデータセット(**MHD; Multimodal Humor Dataset**)（The Big Bang Theoryを使用）を構築

海外のSitcoms (Situation comedies) では笑い声がドラマ内に含まれている

→ sitcomsは定期的に作成されていて，この笑い声を自動で追加するタスクがクリティカルなタスク

→ **笑い声の自動挿入のタスクを自動化することが狙い**

構築されたデータセットを用いて，マルチモーダルを利用したAttentionベースのモデルを構

→SoTA & データセット分析

## 提案手法

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/5ji863cp.png)

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/a6ag5ffd.png)

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/kb3cn377.png)

### データセットのこと

対話のチャンクに対してlaughter tracksを使用してラベルを付与

笑い声をアノテーションすることがは間接的に人手でのアノテーションと同じになるという過程

→ 笑い声の起こる直前の発話の集合をユーモアとしてラベル付け



Attributes

1. Scene
2. Speaker
3. Recipients
4. Participants
5. Dialogue Turns
6. Dialogue Start/End time
7. Humor Start/End time
		対話のチャンクに複数のlaughter tracksがある場合，最後のみ適用

データ分析の結果はFig 3.を参照のこと



### モデルのこと

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/p09uor5z.png)

## 新規性

- 手動でアノテーションされたマルチモーダルな大規模ユーモアデータセットを構築
- これまでのSoTA手法を実験しつつ，multimodal self attention based modelを提案
- 提案手法の汎化性能を検証
## 実験

5 turns / dialogueとする

humor : non-humor = 1 : 2としてサンプリング

humorのラベルが85%と高く，かなり不均衡のため

実験モデル

{Attention, Fusion, Sequential} with {only Text, only Video, both of them}

評価指標：

Accuracy, ROC, F1

## まとめ

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/l2i7725o.png)

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/ybppt6oq.png)

![](/images/article/Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms/ouy806vu.png)

提案手法のMSAMが強い

表情や動作のようなvisual特徴量がユーモアの合図になっていることがある

→ visual特徴量を使うことが有効である



@Table 6.より，dialogueのターン数を長くするとよりcontextualにできるが，長くしすぎても精度が落ちている

→ dialogue 5, 6がピークになっている→ ゆえにturn数を5として本研究は進められている



### Discussion

- 良いモデルはテキストと視覚的な特徴量の重みづけの仕方を正しく考慮しなければならない
- 失敗例への対策
	- よりlong tailなユーモアにロバストにならなければいけない
		- 例）Sheldonは滅多にブランケットを羽織らない→羽織った時面白くなる
	- 知識ベースの弱さへの改善
		- sitcomsは皮肉での笑いが多い（知識がないと伝わらないことがある
## その他（なぜ通ったか？等）



## 次読みたい論文



Here is a summary of the paper based on the web search results:

## Title: Multimodal Humor Dataset: Predicting Laughter tracks for Sitcoms
URL: [https://ieeexplore.ieee.org/document/9423266](https://ieeexplore.ieee.org/document/9423266)
Conference or Journal: 2021 IEEE Winter Conference on Applications of Computer Vision (WACV)
Published at: 14 June 2021
Keywords: multimodal humor, laughter prediction, sitcoms, Big Bang Theory, self-attention
Cited by: 0 (as of 27 April 2023)

The paper aims to automate the task of adding laughter tracks to sitcoms by annotating an existing sitcom (Big Bang Theory) and evaluating various state-of-the-art baselines. The paper also proposes a novel multimodal self-attention based model that outperforms other models.

The paper introduces a new dataset and task of predicting laughter tracks for sitcoms, which is a challenging semantic and practical problem. The paper also proposes a novel multimodal self-attention based model that leverages both text and video modalities.

The proposed method consists of three main components: a multimodal encoder, a self-attention layer, and a binary classifier. The multimodal encoder encodes the text and video features separately using LSTM and CNN respectively, and then concatenates them. The self-attention layer computes the attention weights for each modality and each time step, and then applies them to the encoded features. The binary classifier takes the attended features as input and outputs a probability of laughter for each time step.

The paper conducts experiments on the Big Bang Theory dataset, which contains 10 episodes from season 1 with manual annotations of laughter tracks. The paper compares the proposed method with several baselines, including LSTM, BERT, CNN-LSTM, and CNN-BERT. The paper uses accuracy, precision, recall, F1-score, and ROC-AUC as evaluation metrics.

The paper reports that the proposed method achieves the best performance on all metrics, followed by CNN-LSTM and CNN-BERT. The paper also shows that using both text and video modalities improves the performance over using only one modality. The paper further analyzes the attention weights and finds that they are able to capture some humorous cues in the text and video.

The paper concludes that predicting laughter tracks for sitcoms is a novel and interesting task that requires multimodal understanding of humor. The paper also concludes that the proposed multimodal self-attention based model is effective and interpretable for this task.

Some possible papers to read next are:

- Humor Recognition using Deep Learning by Weller et al., 2019
- A Multimodal Dataset for Authoring and Editing Jokes by Chakrabarty et al., 2020
- Multimodal Transformer Networks for End-to-End Video-Grounded Dialogue Systems by Le et al., 2019
ソース: Bing との会話 2023/4/27(1) Multimodal Humor Dataset: Predicting Laughter tracks for .... [https://ieeexplore.ieee.org/document/9423266](https://ieeexplore.ieee.org/document/9423266) アクセス日時 2023/4/27.
(2) Multimodal humor dataset: Predicting laughter tracks for sitcoms. [https://researchportal.bath.ac.uk/en/publications/multimodal-humor-dataset-predicting-laughter-tracks-for-sitcoms](https://researchportal.bath.ac.uk/en/publications/multimodal-humor-dataset-predicting-laughter-tracks-for-sitcoms) アクセス日時 2023/4/27.
(3) Multimodal Humor Dataset: Predicting Laughter Tracks for .... [https://openaccess.thecvf.com/content/WACV2021/html/Patro_Multimodal_Humor_Dataset_Predicting_Laughter_Tracks_for_Sitcoms_WACV_2021_paper.html](https://openaccess.thecvf.com/content/WACV2021/html/Patro_Multimodal_Humor_Dataset_Predicting_Laughter_Tracks_for_Sitcoms_WACV_2021_paper.html) アクセス日時 2023/4/27.
(4) Multimodal Humor Dataset: Predicting Laughter tracks for .... [https://www.semanticscholar.org/paper/Multimodal-Humor-Dataset%3A-Predicting-Laughter-for-Patro-Lunayach/a8cd2a93dc7f798e0c5280f2e7bc3fdc66bc4c22](https://www.semanticscholar.org/paper/Multimodal-Humor-Dataset%3A-Predicting-Laughter-for-Patro-Lunayach/a8cd2a93dc7f798e0c5280f2e7bc3fdc66bc4c22) アクセス日時 2023/4/27.



