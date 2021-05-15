---
Title: Seleniumからクリックができない...そうだ、JSからクリックしよう
Date: '2020-09-26'
Category: Python
Tags: [Python, Selenium]
Authors: ゆうぼう
Slug: selenium-click-by-js
Thumbnail: /images/thumbnails/python.jpg
Description: 時々、Seleniumで要素を取得してクリックした際、うまくいかないことがあります。その時いくつかの解決策があるのですが、今回はJavaScriptを発火させて解決する方法を解説していきます。
Published: true
---

時々、Seleniumで要素を取得してクリックした際、うまくいかないことがあります。その時いくつかの解決策があるのですが、今回はJavaScriptを発火させて解決する方法を解説していきます。。

それでは早速やってみます。

前提条件は以下になります。

- Python環境が整っている
- Seleniumをインストール済み
- chromedriverをインストール済み

## SeleniumからJavascriptを発火する

JavaScriptを発火させることはとても簡単です。

~~~python
from selenium import webdriver
import chromedriver_binary

driver = webdriver.Chrome()
driver.get('https://www.example.com/')
driver.execute_script('Your Procedure')
~~~


まずは、Webdriverを開き、その後*execute_script*メソッドを用いて、引数にJSのスクリプトを書き込むのみです。

## 実際にボタンをクリックしてみる!

実際にJSのスクリプトと合わせて、*#button*を持つ要素をクリックしてみましょう。

~~~python
from selenium import webdriver
import chromedriver_binary

driver = webdriver.Chrome()
driver.get('https://www.example.com/')
driver.execute_script('document.getElementById("button").click();')
~~~


スクリプト全体の流れは以下になります。

1. 必要なモジュールをインポート
2. webdriver立ち上げる
3. 対象のサイトを開く
4. *execute_script*でJSを発火

上記のスクリプトはこの流れになります。

時々、ポップアップとかトレース型広告とかでクリックできない場面があります。
その際はJSから直押ししてあげるとうまく行くことがあります。

この方法で解決できない場面も多いですが、比較的容易な手法なので頭の中に一つの解決策として留めておくのもありだと思います。
