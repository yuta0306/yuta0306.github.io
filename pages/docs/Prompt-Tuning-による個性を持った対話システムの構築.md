---
Title: 【論文まとめ】Prompt-Tuning による個性を持った対話システムの構築
Date: '2023-05-21'
Category: 論文
Tags: dialogue system,persona,Prompt-Tuning
Authos: ゆうぼう
Slug: Prompt-Tuning-による個性を持った対話システムの構築
Thumbnail: https://s3.us-west-2.amazonaws.com/secure.notion-static.com/281f5c65-6042-478c-80e0-855ec035a28e/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.33.59.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181052Z&X-Amz-Expires=3600&X-Amz-Signature=42d5012d0a794690f0bfbe583b0ba3e2d5a8874792c495151041c28896a46666&X-Amz-SignedHeaders=host&x-id=GetObject
Description: Prompt-Tuning による個性を持った対話システムの構築のまとめ
Published: true
---

## 概要

与えられたキャラクター設定（ペルソナ）を考慮した応答生成をする雑談対話システムの構築

一貫した発話をしない対話システムは魅力的ではない

→　一貫性を持たせるためペルソナに着目

Prompt-Tuningを行うことで，Fine-Tuningに比べて学習時間と計算資源を削減しつつ，より自然で個性を持ったシステムの構築

## 提案手法

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5204ea56-cdd0-4764-9119-4e01ccbdd8e9/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.33.59.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181058Z&X-Amz-Expires=3600&X-Amz-Signature=9000cf45f4c2f5bc1893ecbe2b371c404cf14bd2d6185517226cf873ae642995&X-Amz-SignedHeaders=host&x-id=GetObject)

ペルソナ情報を埋め込むトークン（Persona Info Token）用のEmbedding層を追加したTransformerモデルを提案

この新たに追加したEmbedding層のパラメータを更新する

## 新規性

事前学習済みモデルのパラメータを更新しないPrompt-Tuningによって学習

→　学習に要する時間と計算資源の削減が可能

数百個の対話ペアからなる小規模なデータセットであっても，個性を持ったシステムの構築が可能

## 実験

データセット：Persona-Chat／DailyDialog

1往復の2初話ずつに分割→これを対話ペア

使用するペルソナ：Persona-chatにおける対話ペア数の多い上位3種類のペルソナのみ



ペルソナとは無関係な対話ペアとしてDailyDialogを使用

→　TopicがRelationshipの対話ペアを使用

中でも発話と応答の両方の長さが50文字以下の対話ペアを一定の比率で学習用データセットに混ぜる

→　なぜ？：短い発話やペルソナと無関係な一般的な発話おデータセットに取り込む



ペルソナ文を与える際，長さ<200の時は，200になるまでペルソナぶんを繰り返し並べる

生成の戦略にはGreedy searchを採用

## まとめ

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/64a67a7e-011f-4829-86fc-534126a929d4/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.41.44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181118Z&X-Amz-Expires=3600&X-Amz-Signature=414ca00d2b367d75c01e95e7d3ad1350b2f8ff68726e58ebf74e1e5acbd53018&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/04a389d8-4c52-4b93-8330-dc464f804940/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.42.02.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181119Z&X-Amz-Expires=3600&X-Amz-Signature=f920535862f71043abb8de9459991598219daa8a0285d8f5aeec99fa4ca6f888&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1fd80b4c-baff-4875-a6e0-b27a3c507e72/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.42.24.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181123Z&X-Amz-Expires=3600&X-Amz-Signature=b1a7ecd128436d08db90ed6703a0b820633c28d840f5b4c09add36e8b1609652&X-Amz-SignedHeaders=host&x-id=GetObject)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b3b0d288-dd48-4dfd-8ccb-48dc133197c3/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2022-07-23_10.42.42.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230521%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230521T181135Z&X-Amz-Expires=3600&X-Amz-Signature=0c264e7f7a5f808279d8d71f1f7ef93dc0ebb954e182912cf98dd9f27c435bb4&X-Amz-SignedHeaders=host&x-id=GetObject)

自動評価時：distinct-{1, 2}

GPT-J-6BをPrompt-Tuningしたモデルが最も多様性のある生成

Fine-Tuningの時は入力にペルソナを孵化しない方が良い性能

人手評価時

全ての項目においてGPT-J-6BをPrompt-Tuningしたモデルの評価が高い

## その他（なぜ通ったか？等）

LINEとの共同研究

AI-Bridging cloudを用いてA100（40GB）を使用した実験

## 次読みたい論文

