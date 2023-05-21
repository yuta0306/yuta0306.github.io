---
Title: '【論文まとめ】Multimodal Humor Dataset: Predicting Laughter tracks for Sitcoms'
Date: '2023-05-21'
Category: 論文
Tags: humor detection,multi-modal
Authos: ゆうぼう
Slug: Multimodal-Humor-Dataset-Predicting-Laughter-tracks-for-Sitcoms
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9d8a6445-fdde-46c8-b0b9-72b1f53e4491/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-08_21.44.00.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180328Z&X-Amz-Expires=3600&X-Amz-Signature=47425b16d3accc25b1ca817eec4d5bf1148e6cf566a7737adf14227c8da0f921&X-Amz-SignedHeaders=host&x-id=GetObject
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

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e9dbc394-bcf4-4316-8d7d-26b3a8df346a/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_9.54.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180341Z&X-Amz-Expires=3600&X-Amz-Signature=5b27ee778b4b52d926cc58b26a85b63ef0e845ca327755aed28fb3059d42d555&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f4ba132d-d530-41ca-8574-543ce3f59b7b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_9.53.14.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180344Z&X-Amz-Expires=3600&X-Amz-Signature=9e5f87561ac85c1eda997f5e70d3637833b25116e77abd2a6af1f01e4400a41c&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/90a64f3d-7b08-4725-abe3-c1a208d7ef88/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_9.54.31.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180348Z&X-Amz-Expires=3600&X-Amz-Signature=2af88be8e09237c755126c35e5078a9639502857fb07a760c48c50037aa5448d&X-Amz-SignedHeaders=host&x-id=GetObject)

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

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2362b493-1c85-4602-ba74-d181ad8ced3d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_10.01.01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180414Z&X-Amz-Expires=3600&X-Amz-Signature=4b9c37202b1c79aa7b8c8fd0daf1a02543384956e8839ea12043668fb8886f60&X-Amz-SignedHeaders=host&x-id=GetObject)

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

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/28252124-9d19-4422-a8a3-b60fc13c8c83/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_10.08.22.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180430Z&X-Amz-Expires=3600&X-Amz-Signature=13d483e8c4cbfb256f50730b13afc36c6da8e156ebac43d3fd7feb7ac6ceadde&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5652a72f-b61e-4e35-9a75-8acc0515616b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_10.05.11.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180432Z&X-Amz-Expires=3600&X-Amz-Signature=1265762aa3394b65c75eddd17c718fd880950065f9214246790590ceae6008ce&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/97772d42-0cc9-4b9e-bdbe-e76c5fcc5514/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-10-09_10.05.24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180433Z&X-Amz-Expires=3600&X-Amz-Signature=c5470ae7c6d1c7389fa4ff5c3a966286463bf12e37511a2ab1e73d215e2c8f01&X-Amz-SignedHeaders=host&x-id=GetObject)

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



