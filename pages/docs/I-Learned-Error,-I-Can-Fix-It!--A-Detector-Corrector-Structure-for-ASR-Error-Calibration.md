---
Title: '【論文まとめ】I Learned Error, I Can Fix It! : A Detector-Corrector Structure for ASR Error Calibration'
Date: '2023-10-15'
Category: 論文
Tags: [SLU,Error Correction,Intent Classification,Emotion Recognition]
Authos: ゆうぼう
Slug: I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration
Thumbnail: /images/thumbnails/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration.png
Description: 'I Learned Error, I Can Fix It! : A Detector-Corrector Structure for ASR Error Calibrationのまとめ'
Published: true
---

本記事において使用される図表は，原著論文内の図表を引用しています．

また，本記事の内容は，著者が論文を読み，メモとして短くまとめたものになります．必ずしも内容が正しいとは限らないこと，ご了承ください．

## 論文情報

タイトル: I Learned Error, I Can Fix It! : A Detector-Corrector Structure for ASR Error Calibration

研究会: Interspeech

年度: 2023

キーワード: SLU, Error Correction, Intent Classification, Emotion Recognition

URL: [https://www.isca-speech.org/archive/pdfs/interspeech_2023/yeen23_interspeech.pdf](https://www.isca-speech.org/archive/pdfs/interspeech_2023/yeen23_interspeech.pdf)

コード: [https://github.com/yeonheuiyeon/Detector_Corrector_SLU](https://github.com/yeonheuiyeon/Detector_Corrector_SLU)

データセット: LibriSpeech, ATIS, SLURP, IEMOCAP

## 概要

![](/images/article/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration/llbquodd.png)

ASRのエラーは，下流タスクのパフォーマンス低下に影響するため，Detector-Corrector構造のエラーキャリブレーション手法を提案する．

これによって，WER (Word Error Rate)を低減することで，キャリブレーションなしのASRを用いた場合と比べ，下流タスクでの性能低下を抑える．

## 提案手法

![](/images/article/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration/avx5gsic.png)

Detector-Corrector構造のASRのエラーキャリブレーション

ELECTRAモデルの構造に従って，DetectorはGeneratorとDiscriminatorで構成



### Preprocessing

編集距離（Levenshtein距離）を用いて，正解文とASRの予測文をアライメントし，ラベルを割り当てる．

正解文は$X = \{x_0, x_1, ...., x_n\}$，ラベルは$L = \{y_0, y_1, ..., y_n\}$でバイナリラベル．0が修正不要トークン，1は削除，挿入，置換の操作が必要なトークンを示す．



### Detector

GeneratorとDiscriminatorから構成される

Detectorは入力$X$から，ラベル$L$を予測し，修正が必要なトークンを予測する．



## 新規性

- ASRのエラーキャリブレーション手法として，Detector-Corrector構造の手法を提案
	- SLUタスクのパイプラインに提案手法を用いることで，WERと下流タスクを改善
- ASRモデルに対して良い汎化性能を示す．unseenなASRモデルのエラーに対しても提案手法は下流タスクの性能向上に機能
## 実験

![](/images/article/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration/pjvw61ph.png)

ELECTRA-baseのDetectorとT5-baseのCorrectorを，LibriSpeech + ATISデータセットでファインチューニング

**ASRモデルとしては，Conformer, Google speech recognition, Whisperを使い，様々なタイプのエラーを学習**



![](/images/article/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration/s3z0vhrw.png)

下流タスク

ER (Emotion Recognition): IEMOCAP

IC (Intent Classification): SLURP



評価方法は，WER (Word Error Rate)とAccuracy

ベースラインは，T5とConstDecoder



キャリブレーションなし（表だと上2行）は，ASRの結果を入力するだけだとGTより性能は落ちる

キャリブレーションすると，**提案手法を用いることでASRの結果を単に入力するよりもACCが向上**



![](/images/article/I-Learned-Error,-I-Can-Fix-It!--A-Detector-Corrector-Structure-for-ASR-Error-Calibration/bole4j7q.png)

**未知のASRモデル→未知のASRエラーに対してDetectorのエラー検出がロバストであるか**の評価

学習時はGoogle speech recognitionのみをASRモデルとして使用

AはSUPERB，BとCはespnetで公開されているモデル



**未知のASRモデルのエラーに対しても，高い検出性能（F1）を示しており，提案手法はout-of-domainに対してロバスト**

## まとめ

Detector-Corrector構造のASRエラーキャリブレーションによって，下流タスクの性能低下を抑えられる

推論時に未知のASRモデルを使用し，未知のエラータイプが入力されても，ロバストにDetectorはエラー箇所を検出できる

## その他（なぜ通ったか？等）

### Limitations

そもそもDetectorがエラー区間を検出できないと，Correctorによるエラーキャリブレーションができない

## 次読みたい論文

LanSER: Language-Model Supported Speech Emotion Recognition


## 引用

> @inproceedings{yeen23_interspeech,
>   author={Heui-Yeen Yeen and Min-Ju Kim and Myoung-Wan Koo},
>   title={{I Learned Error, I Can Fix It! : A Detector-Corrector Structure for ASR Error Calibration}},
>   year=2023,
>   booktitle={Proc. INTERSPEECH 2023},
>   pages={2693--2697},
>   doi={10.21437/Interspeech.2023-2475}
> }