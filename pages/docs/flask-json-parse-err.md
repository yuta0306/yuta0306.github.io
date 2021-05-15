---
Title: 【Flask】フロントでUnexpected token!?
Date: '2020-11-08'
Category: Python
Tags: [Python, JSON, Flask]
Authors: ゆうぼう
Slug: flask-json-parse-err
Thumbnail: /images/thumbnails/python.jpg
Description: FlaskからJSONを返してAPIサーバー風に稼働させていたのですが、なぜかfetchしたJavaScript側でエラーが...なんだこれとなったのですが、バックエンドのPython側のミスでした。何気に気付きにくかったりするので、またミスしたときのために備忘録として残しておきます。
Published: true
---

FlaskからJSONを返してAPIサーバー風に稼働させていたのですが、なぜかfetchしたJavaScript側でエラーが...なんだこれとなったのですが、バックエンドのPython側のミスでした。何気に気付きにくかったりするので、またミスしたときのために備忘録として残しておきます。

今回の環境がこちら

- Python-3.8.6
- Flask

## エラー内容

今回起きたエラーがこちらです。

```bash
SyntaxError: Unexpected token o in JSON at position 1
```

予期せぬトークンが頭文字にあったらしいです。なんだこれ...  
他の場所では特にエラーなかったのになぜここだけ...

Pythonの方を確認してみます。


## Pythonのミス

単にPythonのミスでした。ミスの部分だけピックアップします。

~~~python
@app.route('/test')
def test():
    obj = {
        'foo': 'bar',
    }
    
    return jsonify(obj)
~~~

何気にわかりにくいんです。

**json.dumps()してなかった**......

めっちゃくだらないミスで萎えますねこれ。

というわけで、*return jsonify*する前にしっかりdictをjsonにダンプしておきます。

改良版が以下。

~~~python
@app.route('/test')
def test():
    obj = {
        'foo': 'bar',
    }
    
    obj = json.dumps(obj)
    
    return jsonify(obj) 
~~~

これでもう、フロント側ではエラー起こさせません!!!!

簡単に直るけど、気付きにくいってやつです。Flask使ってJSONで通信するときは、フロント側でエラーが出たら、JSONを送っているバックエンドも確認すると良いでしょう。

今回はこれだけです!
