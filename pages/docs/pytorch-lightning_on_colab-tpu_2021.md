---
Title: Pytorch LightningでTPUを回す on Colab Pro in 2021
Date: '2021-10-11'
Category: Python
Tags: ['pytorch-lightning', 'Colab']
Authors: ゆうぼう
Slug: pytorch-lightning_on_colab-tpu_2021
Thumbnail: /images/thumbnails/pytorch-lightning_on_colab-pro-tpu.png
Description: Colab Proでなんとかpytorch-lightningを使ってTPUで実験を回そうと奮闘した結果，得られたベストプラクティスの共有です．もっといい方法があったら教えてください．
Published: true
---

Colab Proでなんとかpytorch-lightningを使ってTPUで実験を回そうと奮闘した結果，得られたベストプラクティス?(怪しい)の共有です．

もっといい方法があったら教えてください．

ちなみに，現行コンペで動作確認したので，コード全容の公開はないです．すみません．

**Runtimeは必ずTPUにしてください**

## pytorch-lightningでTPUを使いたいメリット?

黙って*tensorflow*を勉強して書けば，それでいいのでしょうが，  
普段*pytorch*を使ってコーディングをしていて，僕の場合*pytorch-lightning*を好んで使っているので，その延長戦でTPUを使いたいという欲がありました．

また，*pytorch-lightning*は，**Trainerクラス**をちょろっと書き換えるだけで，CPU/GPU/TPUの変換ができ，マルチGPU等のDDPの処理も自動で書き加えてくれるため，  
かなり良いものかなと思っています．

CPU/GPU/TPUの書き換えは基本的に以下で十分です．

```python
import pytorch_lightning as pl
# これらは共通
model = LitModel()  # pl.LightningModuleを継承した何か
dm = LitDataset()  # pl.LightningDataModuleを継承した何か

# CPUを使う
trainer = Trainer()
trainer.fit(model, dm)

# GPUを使う
trainer = Trainer(gpus=-1)  # ありったけのGPU使う
trainer.fit(model, dm)

# Single Core TPUを使う
trainer = Trainer(tpu_cores=[5])  # TPUのインデックス指定
trainer.fit(model, dm)

# Multi Core TPUを使う
trainer = Trainer(tpu_cores=8)  # 1 or 8じゃないと怒られます...
trainer.fit(model, dm)
```

ああ，楽だ楽だ．

TPU簡単に動いてくれたらいいのに(願望)

## TPUを使うためのセットアップ

以下を実行して，必要なライブラリ群を入れてしまいます．

一応僕が動作確認取れたのは，pytorch-xlaのバージョンが*1.8*と*1.9*です．

Circle CIのTPU環境に合わせたユニットテストは，確か1.8が通っていて，1.9がエラーを吐いていた気がします．

1.8の方が安全なのですかね？(わかりません)

*pytorch-xla 1.8*

```python
!pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.8-cp37-cp37m-linux_x86_64.whl
!pip install -q torch==1.8 torchvision torchtext
!pip install -q pytorch-lightning==1.4.9 torchmetrics
```

*pytorch-xla 1.9*

```python
!pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.9-cp37-cp37m-linux_x86_64.whl
!pip install -q torch==1.9 torchvision torchtext
!pip install -q pytorch-lightning==1.4.9 torchmetrics
```

pipでのインストール分割していたり，--quit(-q)をつけているのは特に理由はないです．

その辺はお好みでやってください．

一応僕の環境ではこんな感じで，以後のプログラムはうまいこと動作しました．

おそらく以下のようなエラーは起きますが，特に動作に影響はなさそうでした．あまり不安がらなくても良さそうです．

```
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
earthengine-api 0.1.284 requires google-api-python-client<2,>=1.12.1, but you have google-api-python-client 1.8.0 which is incompatible.
```

## セットアップ後にimport pytorch_lightning

~~~python
import pytorch_lightning as pl
~~~

*import*すると以下のような出力を吐きます．

インストールした*xla*のバージョンが1.9ならば，以下のようなメッセージが出ます．

少し時間がかかりますが，待ちましょう．

*pytorch-xla 1.9*
~~~
WARNING:root:Waiting for TPU to be start up with version pytorch-1.9...
WARNING:root:Waiting for TPU to be start up with version pytorch-1.9...
WARNING:root:Waiting for TPU to be start up with version pytorch-1.9...
WARNING:root:TPU has started up successfully with version pytorch-1.9
~~~

もし，*TPU not Found*的なことが出たら，一回*Factory reset Runtime*して，またインストールからやり直せばうまく行くと思います．

## importまでうまく行けたら

*import*するまで行けたら，このあとは特に問題なく動くはずです．

```python
# ModelとかDataModuleとかは適宜設定してください．

trainer = Trainer(tpu_cores=8)
trainer.fit(model, dm)
```

このあとすぐエラー出なきゃ，勝手に動くと思います(雑ww)

## 注意するべきこと

幾つか僕が遭遇したエラーを挙げておきます．

- wandb loggerが使えない
    - 多分Commet loggerも使えない？
- マルチコアTPU使うなら，predict時return_predictionsができない
    - *pytorch_lightning.callbacks.BasePredictionWriter*を使おう([サンプル](#BasePredictionWriterのサンプル))
- なぜか知らんけど，[**RAMの使用率が50%あたりになるとstackする**](#RAMの使用率50%くらいになるとstackする件について)
    - こうなると一生動かなくなるので，**最初安定するまで監視が必要**
    - Colabの下のデバッガみたいなやつが，ずっと*select() > spawn()*的な非同期のところで止まるので，そうなったらRAMチェックしよう!!!

## BasePredictionWriterのサンプル

```python
from pytorch_lightning.callbacks import BasePredictionWriter

class CustomWriter(BasePredictionWriter):

    def __init__(self, output_dir: str, write_interval: str = 'batch'):
        super().__init__(write_interval)
        self.output_dir = output_dir

    def write_on_batch_end(
        self, trainer, pl_module: 'LightningModule', prediction: Any, batch_indices: List[int], batch: Any,
        batch_idx: int, dataloader_idx: int
    ):
        torch.save(prediction, os.path.join(self.output_dir, dataloader_idx, f"{batch_idx}.pt"))

    def write_on_epoch_end(
        self, trainer, pl_module: 'LightningModule', predictions: List[Any], batch_indices: List[Any]
    ):
        torch.save(predictions, os.path.join(self.output_dir, "predictions.pt"))
```

## RAMの使用率50%くらいになるとstackする件について

はっきり言って，これは本当に原因がわかりません．

50%くらいで張りついちゃうので，batch_size下げようが，RAMの使用率はあまり変わる気がしません．

こうなってstackしちゃったら，もうHigh-RAM設定にしてRAMにゆとりを持たせた方がいいと思います．潔く．

High-RAMでも張りついちゃう場合は，僕はわかりません．

RAM周りの最適化とか知見ある方，解決策わかったら共有してくださるととてもありがたいです......

## まとめ

まとめじゃないです．嘘つきました．

でも，まとめないとなんかあれなので，CPU/GPU/TPUで使いまわせるように，セットアップの部分整理します．

```python
import os
import sys

if os.environ.get('COLAB_TPU_ADDR', False):
    !pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.8-cp37-cp37m-linux_x86_64.whl
    !pip install -q torch==1.8 torchvision torchtext

!pip install pytorch-lightning==1.4.9 torchmetrics
```

もし，KaggleとColabでも行けるようにしたいのであれば，`'google.colab' in sys.modules`でやるといいと思います．

Colab TPU使って，pytorch-lightningでうまく実験回しまくっている方いたら，色々意見ください．お願いします :)

知見たまって，エラーハンドリングとかわかってきたら，この記事更新するか，新たに書き始めます．よろしくお願いします．