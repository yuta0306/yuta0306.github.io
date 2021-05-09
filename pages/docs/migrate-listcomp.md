---
Title: 内包表記でパフォーマンスをあげるのだ！
Date: '2020-11-22'
Category: Python
Tags: Python
Author: ゆうぼう
Summary: Pythonで他にはない特殊な書き方といえば、内包表記ですかね。Haskellでもかけるみたいな話聞いたことあるけど。実際内包表記は読みやすく、たいてい高速に動くので推奨される書き方と思います。ベンチマークを測ってみたので参考になればと。
Slug: migrate-listcomp
THUMBNAIL: python.jpg
Description: Pythonで他にはない特殊な書き方といえば、内包表記ですかね。Haskellでもかけるみたいな話聞いたことあるけど。実際内包表記は読みやすく、たいてい高速に動くので推奨される書き方と思います。ベンチマークを測ってみたので参考になればと。
Published_date: '2020-11-22'
Toc: 今回のコード,いざ実験
---

Pythonで他にはない特殊な書き方といえば、**内包表記**ですかね。Haskellでもかけるみたいな話聞いたことあるけど。実際内包表記は読みやすく、たいてい高速に動くので推奨される書き方と思います。ベンチマークを測ってみたので参考になればと。

## 今回のコード

今回速さを測るための指標となるコードは以下になります。

至ってシンプルなforループが以下です。

~~~python
symbols = '$¢£¥€¤'
def non_ascii(c):
    return c > 127
codes = []
for s in symbols:
    if ord(s) > 127:
        codes.append(ord(s))
~~~

これを下に複数の書き方に対して処理速度を測ります。

## いざ実験

今回試すものが以下になります。

1. ただのforループ
2. 内包表記
3. 内包表記 + 自作関数(non_adcii)
4. filter + lambda
5. filter + 自作関数(non_ascii)

これらに関して測ってみます。
コードが以下になります。

~~~python
import timeit
TIMES = 10000
SETUP = """
symbols = '$¢£¥€¤'
def non_ascii(c):
    return c > 127
"""
def clock(label, cmd):
    res = timeit.repeat(cmd, setup=SETUP, number=TIMES)
    print(label, *('{:.3f}'.format(x) for x in res))
if __name__ == "__main__":
    clock('for-loop        :', 'codes = []\nfor s in symbols:\n\tif ord(s) > 127: codes.append(ord(s))\ncodes')
    clock('listcomp        :', '[ord(s) for s in symbols if ord(s) > 127]')
    clock('listcomp + func :', '[ord(s) for s in symbols if non_ascii(ord(s))]')
    clock('filter + lambda :', 'list(filter(lambda c: c > 127, map(ord, symbols)))')
    clock('filter + func   :', 'list(filter(non_ascii, map(ord, symbols)))')
~~~

これらから得られる結果がこんな感じです。(人による)

```
for-loop        : 0.009 0.009 0.009 0.009 0.009
listcomp        : 0.008 0.008 0.008 0.008 0.008
listcomp + func : 0.012 0.013 0.013 0.012 0.012
filter + lambda : 0.011 0.013 0.012 0.011 0.013
filter + func   : 0.014 0.014 0.014 0.014 0.013
```

これはまだループも小さいので差はありませんが、安定して早く動いているのは**内包表記**ですね。

読みやすく、高速に動くことが多い内包表記でした。実際に導入してみてはいかがでしょか。

今回は実験だけ示して終わります〜〜.
