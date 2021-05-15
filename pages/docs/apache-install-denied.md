---
Title: httpd -k installでアクセス拒否
Date: '2020-11-02'
Category: Web
Tags: Apache
Authors: ゆうぼう
Slug: apache-install-denied
Thumbnail: /images/thumbnails/web.png
Description: 'WindowsでSQLを触りたいなと思って、Apacheを利用していたのですが、「(OS 5)アクセスが拒否されました。  : AH00369: Failed to open the Windows service manager, perhaps you forgot to log in as Adminstrator?」とのエラーが...。解消方法を備忘録にします。'
Published: true
---

WindowsでSQLを触りたいなと思って、Apacheを利用していたのですが、「*(OS 5)アクセスが拒否されました。  : AH00369: Failed to open the Windows service manager, perhaps you forgot to log in as Adminstrator?*」とのエラーが...。解消方法を備忘録にします。

## エラーの確認

現在、Windows PowerShellにて、コマンドを実行しています。

```bash
PS C:\Users\User> httpd -k install
(OS 5)アクセスが拒否されました。  : AH00369: Failed to open the Windows service manager, perhaps you forgot to log in as Adminstrator?
```

このようなエラーが出てしまいました。

原因は読めば簡単で、**管理者として実行されていないから**です。  
管理者として実行するには普段使っているシェルではできないようです。何気にその方法探しました...w


## 管理者コマンドプロンプトで実行

管理者として実行するために、*管理者用コマンドプロンプト*を開きます。

PC画面下の検索欄から探しても良いのですが、ショートカットキーで楽々探せるみたいです。

「**Windwsキー + X**」

これらのキーを押すと以下のようなものが画面下部に表示されます。

![管理者用コマンドプロンプト](/images/article/admin-prompt-taskbar.png)

*コマンドプロンプト（管理者）（A）*と書かれたところをクリックすると、目的のコマンドプロンプトが出現します。そこに対して再度以下を打ち込み、httpdをインストールします。

(多分起動時にデフォルトになるカレントディレクトリがいつもと違うと思う。)

```bash
C: \WINDOWS\system32> httpd -k install
```

これでインストールは完了。

**Apacheを立ち上げる際**も、管理者権限が必要みたいです。このように管理者コマンドプロンプトを出現させる事ができます。

何気にショートカットキー覚えておいた方がいいかもしれないとも思いました。（慣れないことは大変ですね...）

