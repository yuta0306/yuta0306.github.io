---
Title: 【defaultdict】で辞書型の初期化をサボる
Date: '2020-10-19'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: defaultdict-usage
Thumbnail: /images/thumbnails/python.jpg
Description: Pythonを使って、例えばコーパスを作る際、辞書型に対して単語出現回数を記録しするなど、辞書を使うことがあるかもしれません。その際、ifによる条件分岐によって辞書型の初期化をするわけですが、collectionsにあるdefaultdictというものを使うと初期化を勝手にやってくれます。そのdefaultdictについて解説していきます。
Published: true
---

Pythonを使って、例えばコーパスを作る際、辞書型に対して単語出現回数を記録しするなど、辞書を使うことがあるかもしれません。その際、ifによる条件分岐によって辞書型の初期化をするわけですが、collectionsにあるdefaultdictというものを使うと初期化を勝手にやってくれます。そのdefaultdictについて解説していきます。

今回は、Wikipediaの「AI」に関するページの一部文章に関して単語出現回数を数えていきます。

## 文章を単語ごとに分割する

まずは手始めに文章を単語ごとに分割していきます。

使用する文章がこちらです。

Artificial intelligence (AI), is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. Colloquially, the term "artificial intelligence" is often used to describe machines (or computers) that mimic "cognitive" functions that humans associate with the human mind, such as "learning" and "problem solving".

As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. A quip in Tesler's Theorem says "AI is whatever hasn't been done yet." For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology. Modern machine capabilities generally classified as AI include successfully understanding human speech, competing at the highest level in strategic game systems (such as chess and Go), autonomously operating cars, intelligent routing in content delivery networks, and military simulations.

Artificial intelligence was founded as an academic discipline in 1955, and in the years since has experienced several waves of optimism, followed by disappointment and the loss of funding (known as an "AI winter"), followed by new approaches, success and renewed funding. For most of its history, AI research has been divided into sub-fields that often fail to communicate with each other. These sub-fields are based on technical considerations, such as particular goals (e.g. "robotics" or "machine learning"), the use of particular tools ("logic" or artificial neural networks), or deep philosophical differences. Sub-fields have also been based on social factors (particular institutions or the work of particular researchers).

The traditional problems (or goals) of AI research include reasoning, knowledge representation, planning, learning, natural language processing, perception and the ability to move and manipulate objects. General intelligence is among the field's long-term goals. Approaches include statistical methods, computational intelligence, and traditional symbolic AI. Many tools are used in AI, including versions of search and mathematical optimization, artificial neural networks, and methods based on statistics, probability and economics. The AI field draws upon computer science, information engineering, mathematics, psychology, linguistics, philosophy, and many other fields.

The field was founded on the assumption that human intelligence "can be so precisely described that a machine can be made to simulate it". This raises philosophical arguments about the mind and the ethics of creating artificial beings endowed with human-like intelligence. These issues have been explored by myth, fiction and philosophy since antiquity. Some people also consider AI to be a danger to humanity if it progresses unabated. Others believe that AI, unlike previous technological revolutions, will create a risk of mass unemployment.

In the twenty-first century, AI techniques have experienced a resurgence following concurrent advances in computer power, large amounts of data, and theoretical understanding; and AI techniques have become an essential part of the technology industry, helping to solve many challenging problems in computer science, software engineering and operations research.

こちらを分割します。

*content*という変数に上記の文章が入っていることを想定しています。

~~~python
import re
words = re.split('[,\."\(\)\s+]', content)
words = [word for word in words if not word=='']
~~~


1行目で「, . " ( ) 空白」を区切りとして単語分けしています。これで空白が取り切れないので、2行目で空文字になってしまったものを削除します。


## 初期化をサボってカウントする

それでは初期化をサボって単語出現回数をカウントしていきます。

~~~python
from collections import defaultdict

freq = defaultdict(int)
for word in words:
     freq[word] += 1
~~~

たったこれでだけで、ifによる条件分岐なしにカウントができます。結果をみてみてもしっかりカウントされていることがわかります。

~~~python
<span class="builtins">print(freq)

~~~


```bash
defaultdict(<\class 'int'>, {'Artificial': 2, 'intelligence': 10, 'AI': 17, 'is': 5, 'demonstrated': 1, 'by': 5, 'machines': 3, 'unlike': 2,
'the': 19, 'natural': 2, 'displayed': 1, 'humans': 2, 'and': 20, 'animals': 1, 'Leading': 1, 'textbooks': 1, 'define': 1, 'field': 3, 'as':
8, 'study': 1, 'of': 14, 'intelligent': 2, 'agents': 1, ':': 1, 'any': 1, 'device': 1, 'that': 8, 'perceives': 1, 'its': 4, 'environment':
1, 'takes': 1, 'actions': 1, 'maximize': 1, 'chance': 1, 'successfully': 2, 'achieving': 1, 'goals': 4, 'Colloquially': 1, 'term': 1,
'artificial': 4, 'often': 3, 'used': 2, 'to': 9, 'describe': 1, 'or': 6, 'computers': 1, 'mimic': 1, 'cognitive': 1, 'functions': 1,
'associate': 1, 'with': 3, 'human': 3, 'mind': 2, 'such': 3, 'learning': 3, 'problem': 1, 'solving': 1, 'As': 1, 'become': 3,
'increasingly': 1, 'capable': 1, 'tasks': 1, 'considered': 2, 'require': 1, 'are': 3, 'removed': 1, 'from': 2, 'definition': 1, 'a':
6, 'phenomenon': 1, 'known': 2, 'effect': 1, 'A': 1, 'quip': 1, 'in': 8, "Tesler's": 1, 'Theorem': 1, 'says': 1, 'whatever': 1,
"hasn't": 1, 'been': 4, 'done': 1, 'yet': 1, 'For': 2, 'instance': 1, 'optical': 1, 'character': 1, 'recognition': 1, 'frequently':
1, 'excluded': 1, 'things': 1, 'be': 4, 'having': 1, 'routine': 1, 'technology': 2, 'Modern': 1, 'machine': 3, 'capabilities': 1,
'generally': 1, 'classified': 1, 'include': 3, 'understanding': 1, 'speech': 1, 'competing': 1, 'at': 1, 'highest': 1, 'level': 1,
'strategic': 1, 'game': 1, 'systems': 1, 'chess': 1, 'Go': 1, 'autonomously': 1, 'operating': 1, 'cars': 1, 'routing': 1,
'content': 1, 'delivery': 1, 'networks': 3, 'military': 1, 'simulations': 1, 'was': 2, 'founded': 2, 'an': 3, 'academic': 1,
'discipline': 1, '1955': 1, 'years': 1, 'since': 2, 'has': 2, 'experienced': 2, 'several': 1, 'waves': 1, 'optimism': 1,
'followed': 2, 'disappointment': 1, 'loss': 1, 'funding': 2, 'winter': 1, 'new': 1, 'approaches': 1, 'success': 1, 'renewed':
1, 'most': 1, 'history': 1, 'research': 3, 'divided': 1, 'into': 1, 'sub-fields': 2, 'fail': 1, 'communicate': 1, 'each': 1,
'other': 2, 'These': 2, 'based': 3, 'on': 4, 'technical': 1, 'considerations': 1, 'particular': 4, 'e': 1, 'g': 1,
'robotics': 1, 'use': 1, 'tools': 2, 'logic': 1, 'neural': 2, 'deep': 1, 'philosophical': 2, 'differences': 1,
'Sub-fields': 1, 'have': 4, 'also': 2, 'social': 1, 'factors': 1, 'institutions': 1, 'work': 1, 'researchers': 1, 'The':
3, 'traditional': 2, 'problems': 2, 'reasoning': 1, 'knowledge': 1, 'representation': 1, 'planning': 1, 'language': 1,
'processing': 1, 'perception': 1, 'ability': 1, 'move': 1, 'manipulate': 1, 'objects': 1, 'General': 1, 'among': 1,
"field's": 1, 'long-term': 1, 'Approaches': 1, 'statistical': 1, 'methods': 2, 'computational': 1, 'symbolic': 1,
'Many': 1, 'including': 1, 'versions': 1, 'search': 1, 'mathematical': 1, 'optimization': 1, 'statistics': 1,
'probability': 1, 'economics': 1, 'draws': 1, 'upon': 1, 'computer': 3, 'science': 2, 'information': 1,
'engineering': 2, 'mathematics': 1, 'psychology': 1, 'linguistics': 1, 'philosophy': 2, 'many': 2, 'fields': 1,
'assumption': 1, 'can': 2, 'so': 1, 'precisely': 1, 'described': 1, 'made': 1, 'simulate': 1, 'it': 2, 'This': 1,
'raises': 1, 'arguments': 1, 'about': 1, 'ethics': 1, 'creating': 1, 'beings': 1, 'endowed': 1, 'human-like': 1,
'issues': 1, 'explored': 1, 'myth': 1, 'fiction': 1, 'antiquity': 1, 'Some': 1, 'people': 1, 'consider': 1,
'danger': 1, 'humanity': 1, 'if': 1, 'progresses': 1, 'unabated': 1, 'Others': 1, 'believe': 1, 'previous': 1,
'technological': 1, 'revolutions': 1, 'will': 1, 'create': 1, 'risk': 1, 'mass': 1, 'unemployment': 1, 'In': 1,
'twenty-first': 1, 'century': 1, 'techniques': 2, 'resurgence': 1, 'following': 1, 'concurrent': 1,
'advances': 1, 'power': 1, 'large': 1, 'amounts': 1, 'data': 1, 'theoretical': 1, 'understanding;': 1,
'essential': 1, 'part': 1, 'industry': 1, 'helping': 1, 'solve': 1, 'challenging': 1, 'software': 1,
'operations': 1})
```

これで簡単に単語数カウントができます。

今回は単語数カウントを題材にしましたが、違う初期化方法を指定してあげれば他のことも可能になりますで試してみては。
