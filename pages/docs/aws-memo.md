---
Title: AWSオンラインセミナーメモ【11/10】
Date: '2020-11-10'
Category: Cloud
Tags: AWS
Authors: ゆうぼう
Slug: aws-memo-11-10
Description: AWSのオンラインセミナーに参加したのでその時のメモ
Published: true
---

AWSのオンラインセミナーに参加したのでその時のメモ(11/10)

## リージョン

- AZ; アベイラビリティゾーン(データセンター群)
	最大6個のデータセンターの集まり
	- データセンターがクラッシュした時の対策; 耐障害性
	- 1ms以下の接続遅延時間

## 基本サービス4つ
1. Amazon VPC
	- AZ内にサブネットを作る -> インターネットゲートウェイから外部から接続できる
2. Amazon EC2
	- Linux or Windowsを時間単位で起動
	- インスタンスは永続的なストレージを持っていない. EBSというストレージをアタッチして保存. 
	- バックアップをスナップショット(S3に保存）
3. Amazon RDS
	- 6つのデータベースサーバ
	- 時間課金
	- バックアップが取得される
	- リードレプリカ同期が完全自動化
4. Amazon S3
	- オブジェクトストレージ
	- 静的
	- APIをたたいて利用
	- *ユニークなキー(固有のURI)でファイルを取得することができる* -> 安価に安定した形態になる
	- S3の方が安くデータを保存できる. 静的コンテンツがたくさんあればある程、S3の方が安く運用できる.

## スケーラビリティの確保
- オートスケーリング(上限、下限を超えたCPUが出たら、インスタンスをふやすもしくは減らすことが自動でなされる)

## 価値を生みづらい重労働(Amazon RDS)
- 冗長構成
- バックアップ
- パッチ適応
- PITR(Point In Time Recovery)

利用者はほとんど時間がかかる. インストールする作業(待ち時間)は無駄な作業. 故にあらかじめインストールされた環境(RDS)

## メカニズム
メカニズムを重視
自動化を実現させる一連のプロセス
インプットを連続的にアウトプットへ変換

## Infrastructure as Code(IaC)
- リソースはAPI経由でプロビジョニング
- 定義ファイルによる、効率化と自動化
- エラーやセキュリティ違反の除去

## Cloud Computing
IaCの基に成り立つ

AWSで175を超えるサービス

## #マネージドサービスを使うのを嫌がる場合
-AWSの利用をやめる際、OSを使わないとAWSに依存したサービスになるため**バックアップや移行が難しくなる**.

## マイクロサービスアーキテクチャ(SOA)
ステークホルダーにコミットしたAPIの利用には最新の注意を(APIに影響を与えるバージョンアップはウォーターフォールを)
- 単一の目的
- HTTPSのAPIでのみ連携
	- 必要に応じてAPI叩く
- お互いはブラックボックス

## マイクロサービスデプロイモデル
各サービスごとに少数の開発者と〜〜がある

## Blue / Green Deployment
1. App-v1を残して、App-v2を作る(ユーザはv1へアクセス)
2. 問題なさそうならv1のバックアップを潰して、v2へバージョンアップ
3. ユーザのアクセスはv2へ

## AWS Lambda
サーバレスコンピューティング
- コンテナ(ISOで定義される共通規格)
	- メリット; コードと依存環境をまとめてパッケージ化	, アプリケーション層の抽象化
	- Docker Engine
	- 圧倒的高速; ns単位で動作
- 水平スケーリングと垂直スケーリング
	- 垂直: 繁忙期にはインスタンスを増やして大きくするなど.
	- 水平: 横に広げるイメージ.
- 完全ステートレス
	- 処理が終わったら全て破棄される
	- NoSQL型を最初に検討すべき?
- 関数単位での権限制御
- 関数単位のロギング
- 実行は最大900秒
- 使う言語の検討: ms単位の動作を期待する場合はスクリプト言語を検討すべき
- ビルド系言語は初動が遅いが、動き始めれば速い

## AWSのマネージドコンテナサービス
- Amazon ECS
- Amazon EKS
- AWS Fargate for ECS
- AWS Fargate for EKS

## Amazon SQS
- 非同期処理
- FrontendとBackendを非同期かつ疎結合に
- BackendもQueueの滞留に合わせてオートスケールする
- Amazon.comのカートの部分がこの仕組み
- メッセージキューイングサービス