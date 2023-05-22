---
Title: '【論文まとめ】Prompt-Tuning による個性を持った対話システムの構築'
Date: '2023-05-21'
Category: 論文
Tags: [dialogue system,persona,Prompt-Tuning]
Authos: ゆうぼう
Slug: Prompt-Tuning-による個性を持った対話システムの構築
Thumbnail: /images/thumbnails/Prompt-Tuning-による個性を持った対話システムの構築.png
Description: 'Prompt-Tuning による個性を持った対話システムの構築のまとめ'
Published: true
---

## 概要

与えられたキャラクター設定（ペルソナ）を考慮した応答生成をする雑談対話システムの構築

一貫した発話をしない対話システムは魅力的ではない

→　一貫性を持たせるためペルソナに着目

Prompt-Tuningを行うことで，Fine-Tuningに比べて学習時間と計算資源を削減しつつ，より自然で個性を持ったシステムの構築

## 提案手法

![](/images/article/Prompt-Tuning-による個性を持った対話システムの構築/pgu1fn6t.png)

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

![](/images/article/Prompt-Tuning-による個性を持った対話システムの構築/wbqh213c.png)

![](/images/article/Prompt-Tuning-による個性を持った対話システムの構築/fvhj0xjf.png)

![](/images/article/Prompt-Tuning-による個性を持った対話システムの構築/eywga7bo.png)

![](/images/article/Prompt-Tuning-による個性を持った対話システムの構築/025fptos.png)

自動評価時：distinct-{1, 2}

GPT-J-6BをPrompt-Tuningしたモデルが最も多様性のある生成

Fine-Tuningの時は入力にペルソナを孵化しない方が良い性能

人手評価時

全ての項目においてGPT-J-6BをPrompt-Tuningしたモデルの評価が高い

## その他（なぜ通ったか？等）

LINEとの共同研究

AI-Bridging cloudを用いてA100（40GB）を使用した実験

## 次読みたい論文

