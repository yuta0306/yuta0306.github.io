---
Title: 【論文まとめ】Prediction of Shared Laughter for Human-Robot Dialogue
Date: '2023-05-21'
Category: 論文
Tags: laughter,shared laughter
Authos: ゆうぼう
Slug: Prediction-of-Shared-Laughter-for-Human-Robot-Dialogue
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8794a1f3-9e28-4e3c-9890-2421fac523e5/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_11.13.42.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181149Z&X-Amz-Expires=3600&X-Amz-Signature=1395e08283b7e1496d920bd07f6aca8727756340e2f1e0b88cfd3c85e62e88c2&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Prediction of Shared Laughter for Human-Robot Dialogueのまとめ
Published: true
---

## 提案手法

会話ロボットがshared laughterを自動生成することを目的にする

### Shared Laughter Model

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1de6b6b2-a98a-439b-8da8-6e45f425c73f/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_13.54.22.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181156Z&X-Amz-Expires=3600&X-Amz-Signature=ee71ea0d8549ff03902e0f000622282a9587a336e7e01a2b6b424b82abaface1&X-Amz-SignedHeaders=host&x-id=GetObject)

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
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1e798f36-17f0-4b8d-8851-201cf2bd1675/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_14.04.32.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181218Z&X-Amz-Expires=3600&X-Amz-Signature=f1ff80a67323119d7e1eeda42732af60fa8343a8bcd1f17fee9f47f9944c159d&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6305e57d-f4fe-4d66-8301-8baf00db5dfd/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_14.04.55.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181224Z&X-Amz-Expires=3600&X-Amz-Signature=8cbd1774c651115a437a339316c3ec158566cbb741aca762afd62a29f3331322&X-Amz-SignedHeaders=host&x-id=GetObject)

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

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5699d970-a1cb-46cb-a3a6-0065c3e74a1b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_14.20.05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181242Z&X-Amz-Expires=3600&X-Amz-Signature=1918c0beb7e1d75b0d6107c0fd1f73753ba3a0f09217288ee13a27d0110a555b&X-Amz-SignedHeaders=host&x-id=GetObject)

オフラインとオンラインの二つのタイプで評価



![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a4425ec8-151c-4f54-9fba-c360f40bb34c/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_14.21.05.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181249Z&X-Amz-Expires=3600&X-Amz-Signature=4a9d420209c5699b821be6c4653d99524ec8cc0af4e18abb23076c4044030470&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7c04f66f-6a92-40af-ae4e-3aafb9a1b1c2/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-05-17_14.21.17.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181252Z&X-Amz-Expires=3600&X-Amz-Signature=a59522ac850da45239af8dd7a9142be0d95b9cfa3d3aa0c751bd3b49d7d74d71&X-Amz-SignedHeaders=host&x-id=GetObject)

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



