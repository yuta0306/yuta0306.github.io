---
Title: '【論文まとめ】Prediction of Shared Laughter for Human-Robot Dialogue'
Date: '2023-05-21'
Category: 論文
Tags: [laughter,shared laughter]
Authos: ゆうぼう
Slug: Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue
Thumbnail: /images/thumbnails/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue.png
Description: 'Prediction of Shared Laughter for Human-Robot Dialogueのまとめ'
Published: true
---

## 提案手法

会話ロボットがshared laughterを自動生成することを目的にする

### Shared Laughter Model

![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/ubc1bfll.png)

ユーザの最初の笑いを検知して，システムが笑うモデル

3種類のモジュールが存在する

1. ユーザの最初の笑いを検出
2. shared laughterを生成するかどうかを決定
3. どのタイプの笑いをするべきか決定
### Data Collection and Analysis

収集方法：ERICA

teleoperateしたのは女性

対象：61人の男性

シナリオ：speed dating

好きな趣味，好きなこと，嫌いなことに関してカジュアルなチャット

アノテーション：

2種類のタイプに笑いを分けた

1. isolated laugh
			1. 笑い単体で起こる笑い
2. speech laugh
			1. 話しながら起こる笑い
![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/xjk3e31y.png)

![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/tlll3y5c.png)

集まったデータの中で，1206件のinitial laughが確認

698件がself laughで508件がshared laugh

### Model Creation

特徴量2種類：

**Audio-based features**

40のacoustic メルフィルタバンクの平均と標準偏差

**Prosodic features**

全IPUにまたがるピッチとパワーの値を使った合計で14つの以下の指標

平均／中央値／標準偏差／最大値／最小値／範囲

**モデル**：

LR／SVM

データサンプルが小さかったからか，deep learningの手法は弱かった

## 新規性

ユーザに合わせて毎回笑いを生成するのではなく，適切なタイミングでshared laughterを自動生成することをロボットに持たせたいという目的をもった研究

## 評価方法

![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/9wovt6te.png)

オフラインとオンラインの二つのタイプで評価



![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/uj5g5yqc.png)

![](/images/article/Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue/hgmm1f5x.png)

特徴量としてlaughter typeを加えることでrecallが改善する傾向

負に歪んだピッチの分布の時は笑いがシェアされがちで笑いが長く続きがち



laughter detectionとlaugh type classificationのエラーによってパフォーマンスが落ちることは明らかだが，それでもベースラインをoutperform

最もよかったonline modelはacousticとprosodicの特徴量を両方使ったもの

## 何がすごかった？

prosodicの分析からわかったことが，initial laughのacousiticsはresponse laughを呼び起こすいくつかの特徴があること

まだ改善の余地はあるものの，acousticとprosodicの特徴量の両方を使うことはパフォーマンスの改善に役立った



shared laughterのタイミングについてはかけた研究である

今後の課題である

## 次に読みたい論文



