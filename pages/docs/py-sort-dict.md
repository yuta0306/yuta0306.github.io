---
Title: Pythonで【辞書型】をソートする
Date: '2020-10-15'
Category: Python
Tags: Python
Authors: ゆうぼう
Slug: py-sort-dict
Thumbnail: /images/thumbnails/python.jpg
Description: Pyythonでソートをしたい時、初めの頃はあまり思いつかないことも多く、lambda式ってなんや...!?こんな状態でソートにはあまり手が出ず、コピペで戦っている方も多いのではないでしょうか。今回はその中でも「辞書型」のソートについてお話しします。
Published: true
---

## ソート対象とする辞書の確認

まずは辞書を確認します。今回使用する辞書型は、ある文書に出現した単語と出現回数を示す*freq_words*という辞書としましょう。

その中身は次になります。

このデータを作成には、辞書の初期化を簡単に行ってくれる*collections.defaultdict*を使用しています。こちらの使い方と今回使用する辞書の生成は別記事で行っているので、そちらを別途参照されたい。[【defaultdict】で辞書型の初期化をサボる](https://yuta0306.github.io/blog/defaultdict-usage)

~~~python
defaultdict(<class 'int'>, {'Python': 23, '-': 1, 'Wikipedia': 3, 'From': 1, 'Wikipedia,': 1, 'the': 15, 'free': 2, 'encyclopedia': 1, 'Jump': 2, 'to': 9, 'navigation': 1, 'search': 2, 'Look': 1, 'up': 1, 'or': 3, 'python': 1, 'in': 7, 'Wiktionary,': 1, 'dictionary.': 1, 'may': 3, 'refer': 1, 'to:': 1, 'Pythons': 1, 'Pythonidae,': 1, 'a': 19, 'family': 1, 'of': 12, 'nonvenomous': 2, 'snakes': 1, 'found': 2, 'Africa,': 1, 'Asia,': 1, 'and': 3, 'Australia': 1, 'genus,': 1, 'genus': 1, 'Pythonidae': 1, 'Africa': 1, 'Asia': 1, 'Contents': 1, '1': 1, 'Computing': 1, '2': 1, 'People': 1, '3': 2, 'Roller': 2, 'coasters': 1, '4': 1, 'Vehicles': 1, '5': 1, 'Weaponry': 1, '6': 1, 'Other': 2, 'uses': 1, '7': 1, 'See': 2, 'also': 1, 'Computing[edit]': 1, 'programming': 1, 'language': 1, 'Python,': 3, 'native': 1, 'code': 1, 'compiler': 1, 'for': 2, 'CMU': 1, 'Common': 1, 'Lisp': 1, 'internal': 2, 'project': 1, 'name': 3, 'PERQ': 1, 'computer': 1, 'workstation': 1, 'People[edit]': 1, 'Aenus': 1, '4th-century': 1, 'BCE,': 1, 'student': 1, 'Plato': 1, 'painter,': 1, 'ca.': 1, '360-320': 1, 'BCE': 1, 'vase': 1, 'painter': 1, 'Poseidonia': 1, 'Byzantium,': 1, 'orator,': 1, 'diplomat': 1, 'Philip': 1, 'II': 1, 'Macedon': 1, 'Catana,': 1, 'poet': 1, 'who': 1, 'accompanied': 1, 'Alexander': 1, 'Great': 1, 'Anghelo': 1, '1954–2014': 1, 'Romanian': 1, 'graphic': 1, 'artist': 1, 'coasters[edit]': 1, 'Efteling,': 1, 'roller': 3, 'coaster': 3, 'Netherlands': 1, 'Busch': 1, 'Gardens': 1, 'Tampa': 1, 'Bay,': 1, 'defunct': 1, 'Coney': 1, 'Island,': 1, 'Cincinnati,': 1, 'Ohio,': 1, 'steel': 1, 'Vehicles[edit]': 1, 'automobile': 1, 'maker,': 1, 'an': 2, 'Australian': 1, 'car': 2, 'company': 2, 'Ford': 1, 'prototype,': 1, 'Ford': 1, 'prototype': 1, 'sports': 1, 'Weaponry[edit]': 1, 'missile,': 1, 'series': 1, 'Israeli': 1, 'air-to-air': 1, 'missiles': 1, 'nuclear': 1, 'primary,': 1, 'gas-boosted': 1, 'fission': 1, 'primary': 1, 'used': 1, 'thermonuclear': 1, 'weapons': 1, 'Colt': 1, 'revolver': 1, 'uses[edit]': 1, 'PYTHON,': 1, 'British': 2, 'nuclear': 1, 'war': 1, 'contingency': 1, 'plan': 1, 'film,': 1, '2000': 1, 'horror': 1, 'film': 1, 'by': 3, 'Richard': 1, 'Clabaugh': 1, 'mythology,': 1, 'mythical': 1, 'serpent': 1, 'Monty': 1, 'Pythons,': 1, 'comedy': 1, 'group': 1, 'Monty': 1, 'Pictures,': 1, 'owned': 1, "troupe's": 1, 'surviving': 1, 'members': 1, 'also[edit]': 1, 'Cython,': 1, 'programming': 1, 'language': 1, 'superset': 1, 'Pyton,': 1, 'Norwegian': 1, 'magazine': 1, 'Pithon': 1, 'Disambiguation': 3, 'page': 3, 'providing': 1, 'links': 3, 'topics': 1, 'that': 1, 'could': 1, 'be': 1, 'referred': 1, 'same': 1, 'termThis': 1, 'disambiguation': 5, 'lists': 1, 'articles': 1, 'associated': 1, 'with': 3, 'title': 1, 'Python.': 1, 'If': 1, 'link': 2, 'led': 1, 'you': 3, 'here,': 1, 'wish': 1, 'change': 1, 'point': 1, 'directly': 1, 'intended': 1, 'article.': 1, 'Retrieved': 1, 'from': 2, '"https://en.wikipedia.org/w/index.php?title=Python&oldid=983067155"': 1, 'Categories:': 1, 'pagesHuman': 1, 'pagesDisambiguation': 1, 'pages': 3, 'given-name-holder': 1, 'listsHidden': 1, 'categories:': 1, 'short': 1, 'descriptionsShort': 1, 'description': 1, 'is': 3, 'different': 1, 'WikidataAll': 1, 'article': 1, 'pagesAll': 1, 'pagesAnimal': 1, 'common': 1, 'Navigation': 2, 'menu': 1, 'Personal': 1, 'tools': 1, 'Not': 1, 'logged': 1, 'inTalkContributionsCreate': 1, 'accountLog': 1, 'Namespaces': 1, 'ArticleTalk': 1, 'Variants': 1, 'Views': 1, 'ReadEditView': 1, 'history': 1, 'More': 1, 'Search': 1, 'Main': 1, 'pageContentsCurrent': 1, 'eventsRandom': 1, 'articleAbout': 1, 'WikipediaContact': 1, 'usDonate': 1, 'Contribute': 1, 'HelpLearn': 1, 'editCommunity': 1, 'portalRecent': 1, 'changesUpload': 2, 'file': 1, 'Tools': 1, 'What': 1, 'hereRelated': 1, 'fileSpecial': 1, 'pagesPermanent': 1, 'linkPage': 1, 'informationCite': 1, 'this': 2, 'pageWikidata': 1, 'item': 1, 'Print/export': 1, 'Download': 1, 'as': 1, 'PDFPrintable': 1, 'version': 1, 'In': 1, 'other': 1, 'projects': 1, 'Wikimedia': 2, 'Commons': 2, 'Languages': 1, 'AfrikaansAlemannischالعربيةAzərbaycancaবাংলাБеларускаяБългарскиČeštinaDanskDeutschEsperantoEuskaraفارسیFrançais한국어HrvatskiIdoBahasa': 1, 'IndonesiaInterlinguaÍslenskaItalianoעבריתქართულიKongoLatinaLëtzebuergeschMagyarमराठीNederlands日本語Norsk': 1, 'bokmålPolskiPortuguêsРусскийSlovenčinaСрпски': 1, '/': 2, 'srpskiSrpskohrvatski': 1, 'српскохрватскиSuomiSvenskaไทยTürkçeУкраїнськаاردوTiếng': 1, 'Việt中文': 1, 'Edit': 1, 'This': 1, 'was': 1, 'last': 1, 'edited': 1, 'on': 1, '12': 1, 'October': 1, '2020,': 1, 'at': 1, '01:39': 1, 'UTC.': 1, 'Text': 1, 'available': 1, 'under': 1, 'Creative': 1, 'Attribution-ShareAlike': 1, 'License;': 1, 'additional': 1, 'terms': 1, 'apply.': 1, 'By': 1, 'using': 1, 'site,': 1, 'agree': 1, 'Terms': 1, 'Use': 1, 'Privacy': 2, 'Policy.': 1, 'Wikipedia®': 1, 'registered': 1, 'trademark': 1, 'Foundation,': 1, 'Inc.,': 1, 'non-profit': 1, 'organization.': 1, 'policy': 1, 'About': 1, 'Disclaimers': 1, 'Contact': 1, 'Mobile': 1, 'view': 1, 'Developers': 1, 'Statistics': 1, 'Cookie': 1, 'statement': 1})
~~~

長いですがこのデータを使用します。

## keyでソートする

それではキーでソートしていきます。

ソート方法自体は、*sorted(ソート対象, key=ソートの基準, reverse=降順か昇順か)*で定義されるので、*key*の部分に**lambda**を採用してソートしていきます。コード自体は至って単純です。

~~~python
sort = sorted(freq_word.items(), key=lambda x:x[0])
~~~


これだけで昇順で並べることができます。結果を確認すると、(*print(sort)*)

多すぎるので上位20個だけ並べます。(*print(sort[:20])*)


~~~bash
[('"https://en.wikipedia.org/w/index.php?title=Python&oldid=983067155"', 1), ('(1954–2014)', 1), ('(4th-century', 1), ('(Busch', 1), ('(Coney', 1), ('(Efteling),', 1), ('(Ford', 1), ('(Monty)', 1), ('(UTC).', 1), ('(automobile', 1), ('(ca.', 1), ('(film),', 1), ('(genus),', 1), ('(missile),', 1), ('(mythology),', 1), ('(nuclear', 1), ('(painter),', 1), ('(programming', 1), ('-', 1), ('/', 2)]
~~~

一応記号から始まっているものが先に来ています。記号をしっかり前処理で省いていれば良かったのでしょうが...

それでもキーを元にソートすることができました!!

**降順**にする場合は、*reverse=True*を付け足すだけで昇順になります。

~~~python
sort = sorted(freq_word.items(), key=lambda x:x[0], reverse=True)
~~~


~~~bash
[('српскохрватскиSuomiSvenskaไทยTürkçeУкраїнськаاردوTiếng', 1), ('you', 3), ('workstation', 1), ('with', 3), ('wish', 1), ('who', 1), ('weapons', 1), ('was', 1), ('war', 1), ('view', 1), ('version', 1), ('vase', 1), ('using', 1), ('uses[edit]', 1), ('uses', 1), ('used', 1), ('usDonate', 1), ('up', 1), ('under', 1), ("troupe's", 1)]
~~~

しっかりアルファベッドで降順になっていました。

## valueでソートする

続いて*value*でソートしていきます。

先ほどと同様に、ソート方法自体は、*sorted(ソート対象, key=ソートの基準, reverse=降順か昇順か)*で定義されるので、*key*の部分に**lambda**を採用してソートしていきます。コード自体は至って単純です。

~~~python
sort = sorted(freq_word.items(), key=lambda x:x[1])
~~~


これだけで昇順で並べることができます。結果を確認すると、(*print(sort)*)

多すぎるので上位20個だけ並べます。(*print(sort[:20])*)


~~~bash
[('-', 1), ('From', 1), ('Wikipedia,', 1), ('encyclopedia', 1), ('navigation', 1), ('Look', 1), ('up', 1), ('python', 1), ('Wiktionary,', 1), ('dictionary.', 1), ('refer', 1), ('to:', 1), ('Pythons', 1), ('Pythonidae,', 1), ('family', 1), ('snakes', 1), ('Africa,', 1), ('Asia,', 1), ('Australia', 1), ('(genus),', 1)]
~~~

今回はデータが小さく、ほとんどが1なので正しくソートされているかはこれではわかりにくいですが、全体を出力すると正しいことがわかると思います。

こちらもやはり**降順**にする場合は、*reverse=True*を付け足すだけで昇順になります。

~~~python
sort = sorted(freq_word.items(), key=lambda x:x[1], reverse=True)
~~~


~~~bash
[('Python', 23), ('a', 19), ('the', 15), ('of', 12), ('to', 9), ('in', 7), ('disambiguation', 5), ('Wikipedia', 3), ('or', 3), ('may', 3), ('and', 3), ('Python,', 3), ('name', 3), ('roller', 3), ('coaster', 3), ('by', 3), ('Disambiguation', 3), ('page', 3), ('links', 3), ('with', 3)]
~~~

回数が多い順（降順）になっていますね。

辞書型はこのように、*sorted(dict.items(), key=lambda x:x[0 or 1], reverse=True or False*でソートすることができました。

辞書型のソートは意外と悩むことが個人的には多いので、備忘録がてら公開しておきます。
