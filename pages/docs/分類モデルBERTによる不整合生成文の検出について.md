---
Title: 【論文まとめ】分類モデルBERTによる不整合生成文の検出について
Date: '2023-05-21'
Category: 論文
Tags: dialogue system,NLI
Authos: ゆうぼう
Slug: 分類モデルBERTによる不整合生成文の検出について
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3dfb04c2-e744-465a-aeed-9cab4ad06729/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_11.31.54.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180829Z&X-Amz-Expires=3600&X-Amz-Signature=3eb2d8fada149e2992803f25c3b6af6c39cb3b56c227b78ec05b99f4d1fbd5f8&X-Amz-SignedHeaders=host&x-id=GetObject
Description: 分類モデルBERTによる不整合生成文の検出についてのまとめ
Published: true
---

## 概要

ニューラル文章生成において，文章としては自然だが，内容が事実とは異なる**事実不整合（factual inconsistency）**が問題

→　BERTを用いて分類タスクをすることで生成文の事実不整合の検出を試みる

疑似データセットを作成し学習することで，不整合検出におけるドメイン適応の重要性を明らかにした

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1ed54194-49ae-452a-bf7d-f6347059b77d/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_11.31.54.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180835Z&X-Amz-Expires=3600&X-Amz-Signature=3313f664bedc7bbe7770df24928aa928875a8fceda3a3a68226c86a486b594df&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b4af1da4-7869-4522-b00c-01a2ee36936b/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-24_11.32.42.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T180836Z&X-Amz-Expires=3600&X-Amz-Signature=bbc96bd6864d164e79750b72b8df5dcf30bb6d7f70817a46fae2e49769f3ca0a&X-Amz-SignedHeaders=host&x-id=GetObject)

特に数値データに対してロバストなモデルになるよう学習するため，知識に数値が含まれる「料金情報」「アクセス情報」「営業時間情報」の3カテゴリに絞って学習に用いる



疑似例の作成は数値や日付，駅名等を書き換えることで対応

料金，アクセス，営業時間情報で書き以下絵対象がお’異なるため，それぞれ小cleanなる改変方法でデータを書き換え

## 新規性

旅行ドメインに対して疑似データセットを作成し，それを用いて学習することで，SNLIデータセットを用いた学習に比べて，事実不整合の生成文の検出精度を向上

## 実験

データセット

事実整合性判定学習データセット

料金，アクセス，営業時間情報について作成した疑似生後売れ，不整合例を集めたデータセット

ニューラル生成文データセット

NTT製TransformerのHobbyistを用いて生成した文章を含むデータセット



Laboro社製BERTをファインチューニング

ベースラインデータセットとして，日本語SNLIデータセット

recallが最良のエポックの重みを最良モデルとして評価

recallが低いモデルは大量の不整合を見逃していることになるため，目的を果たしていないと考えたから

## まとめ

提案手法（疑似例を用いたデータセット）は事実不整合検出に有効である

正解できなかった不整合例の内訳

料金7件／アクセス1件／営業時間16件

→　テンプレートの拡充が必要か？

## その他（なぜ通ったか？等）



## 次読みたい論文

