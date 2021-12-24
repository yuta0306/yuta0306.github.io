---
Title: collate_fnで複数の引数を取りたい!!
Date: '2021-12-24'
Category: Python
Tags: [ML, Python, Pytorch]
Authors: ゆうぼう
Slug: pytorch-collate_fn-args
Thumbnail: /images/thumbnails/pytorch-logo.jpg
Description: Transformersを使って入力テキストをtokenizeするときに，データセットのサイズが大きかったので，バッチ単位でエンコードしたかった時がありました．この時，collate_fnに対して複数の引数を与えたかった状況の時の対処法です．(日本語変かも)
Published: true
---

Transformersを使って入力テキストをtokenizeするときに，データセットのサイズが大きかったので，バッチ単位でエンコードしたかった時がありました．

この時，collate_fnに対して複数の引数を与えたかった状況の時の対処法です．(日本語変か?)

## やりたかったこと

DataLoaderを定義するときに，`collate_fn`のところで自作collate_fnを指定して，batch単位で流れてくるデータに対してエンコードすること．

これがやりたいことになります．つまりこんな感じ

~~~python
from torch.utils import Dataset, DataLoader

class MyDataset(Dataset):
    def __init__(self, *args, **kwargs):
        super().__init__()
        ...
    
    def __len__(self):
        ...

    def __getitem__(self, idx: int):
        ...

dataloader = DataLoader(dataset=MyDataset(), batch_size=16, shuffle=True,
            num_workers=os.cpu_count(),
            collate_fn=custom_collate_fn)  # <--- ここで自作collate_fnを指定して制御
~~~

## やってうまくいかなかったこと

先にやってうまくいかなかったことを共有しておきます．

自分が使っているのが，`pytorch-lightning`なのでそのせいもあるかもしれません．なので，もしかしたら普通に素のPytorchならうまくいくかもしれません．

教えてください🙏

### lambda式で制御する (functools.partialを使う)

こんなことをしました．

~~~python
from torch.utils import Dataset, DataLoader
from transformers import AutoTokenizer

class MyDataset(Dataset):
    def __init__(self, *args, **kwargs):
        super().__init__()
        ...
    
    def __len__(self):
        ...

    def __getitem__(self, idx: int):
        ...
        return text, label

def custom_collate_fn(data, tokenizer, max_length):
    texts, labels = zip(*data)
    texts = list(texts)
    texts = tokenizer.batch_encode_plus(
        texts,
        padding=True,
        truncation=True,
        max_length=max_length,
        return_tensors='pt',
    )
    labels = torch.LongTensor(labels)
    return texts, labels

tokenizer = AutoTokenizer.from_pretrained(...)
max_length = 256
dataloader = DataLoader(dataset=MyDataset(), batch_size=16, shuffle=True,
            num_workers=os.cpu_count(),
            collate_fn=lambda data: custom_collate_fn(data, tokenizer, max_length))
~~~

`pytorch-lightning`の仕様だとは思うのですが，`pickle`で圧縮するらしくそのタイミングでエラーを吐かれました．

なぜだろう...有識者の方教えてください...

## 【解決策】 classで定義する

lambda式でダメだったので，もうクラスの内部に必要なものを保持させておこうということになりました．(僕の中では)

次のコードのような感じで解決しました．

~~~python
from torch.utils import Dataset, DataLoader
from transformers import AutoTokenizer

class MyDataset(Dataset):
    def __init__(self, *args, **kwargs):
        super().__init__()
        ...
    
    def __len__(self):
        ...

    def __getitem__(self, idx: int):
        ...
        return text, label

class CollateFn:
    def __init__(self, tokenizer, max_length: int) -> None:
        self.tokenizer = tokenizer
        self.max_length = max_length
        os.environ["TOKENIZERS_PARALLELISM"] = "true"  # <--- 多分これを明示的に指定しないと怒られます (true|false)

    def __call__(self, data):
        texts, labels = zip(*data)
        texts = list(texts)
        texts = self.tokenizer.batch_encode_plus(
            texts,
            padding=True,
            truncation=True,
            max_length=self.max_length,
            return_tensors='pt',
        )
        labels = torch.LongTensor(labels)
        return texts, labels

tokenizer = AutoTokenizer.from_pretrained(...)
max_length = 256
dataloader = DataLoader(dataset=MyDataset(), batch_size=16, shuffle=True,
            num_workers=os.cpu_count(),
            collate_fn=CollateFn(tokenizer, max_length))
~~~

## まとめ

素のPytorchで組めば問題なかったのかもしれませんが，`pytorch-lightning`を使っている方は同じ状況になるかもしれません．

その時は，ぜひ参考にclassでcollate_fnで実装してみて解決の一助となれたら幸いです．
