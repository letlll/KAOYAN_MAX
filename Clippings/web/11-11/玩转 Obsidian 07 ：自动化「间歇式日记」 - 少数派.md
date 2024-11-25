---
title: "玩转 Obsidian 07 ：自动化「间歇式日记」 - 少数派"
source: "https://sspai.com/post/69982"
author:
  - "[[闲者时间_王掌柜]]"
published: 2021-11-17
created: 2024-11-22
description: "在系列的第三期文章《玩转Obsidian03：如何记录「间歇式日记」》中介绍过如何通过「间歇式日记」管理自己的日常工作和生活：「间歇式日记」是著名的生产力教练CoachTony在2017年发表的《Re ..."
tags:
  - "clippings"
---
### **Matrix 首页推荐**

[Matrix](https://sspai.com/matrix) 是少数派的写作社区，我们主张分享真实的产品体验，有实用价值的经验与思考。我们会不定期挑选 Matrix 最优质的文章，展示来自用户的最真实的体验和观点。

文章代表作者个人观点，少数派仅对标题和排版略作修改。

---

在系列的第三期文章《[玩转 Obsidian 03：如何记录「间歇式日记」](https://sspai.com/link?target=https%3A%2F%2Fxzsj.vip%2F2020%2Fobsidian-03)》中介绍过如何通过「间歇式日记」管理自己的日常工作和生活：

> 「间歇式日记」是著名的生产力教练 [Coach Tony](https://sspai.com/link?target=https%3A%2F%2Fcoachtony.medium.com%2F) 在2017 年发表的《[Replace Your To-Do List With Interstitial Journaling To Increase Productivity](https://sspai.com/link?target=https%3A%2F%2Fmedium.com%2Fbetter-humans%2Freplace-your-to-do-list-with-interstitial-journaling-to-increase-productivity-4e43109d15ef)》文章中提出的一个概念。他认为「间歇式日记」可以更好的帮助自己集中精力更聪明的工作。「间歇式日记」既不同于常规的「日记」，也不同于常规的「任务管理软件」，它更强调围绕着「工作流」打造一个「正反馈描述」从而提高「生产力」。

「间歇式日记」的运作方式其实很简单，一句话总结：

> 在每个「工作间歇」，以「时间戳」为单位，采用类似「日记」的形式做的笔记。

在实际使用中「间歇式日记」也不会有太多负担，因为适当总结和梳理总是会帮助我们「理清现状」并开始下一个行动。但是，在使用「间歇式日记」一段时间后我发现了几个问题。

## 间歇式日记的问题

### 问题1：笔记优先法则 Vs 文件夹管理

在《[玩转 Obsidian 04：为什么推荐使用 Obsidian 做知识管理](https://sspai.com/post/67339)》文章中专门提到 Obsidian 遵循「笔记优先法则」，这是它的优势之一：

![](https://cdnfile.sspai.com/2021/11/17/3766f7a7f62b64238b3598af2ee0b39e.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

笔记优先法则

「笔记优先法则」要求我们我们完全不需要考虑文件「存到哪里」这件事，只需要关注文件的「双向链接」以及 Tag 即可。并且**借助 Obsidian 强大的搜索和关联能力，我们可以很方便的找到各种笔记。**

在实际使用场景中，每天的「间歇式日记」经常要关联 N 个会议纪要或 N 个项目笔记，虽然在 Obsidian 中无需关注「存到哪里」这件事，但是当我们需要和其他人共享笔记等场景时，就会发现，如果适当的用「文件夹」进行组织，会特别方便。

> 适当的「文件夹」归档管理笔记，有助于我们分享和整理。

另外，虽然现在计算机运算速度很快，但是操作系统对于「一个文件夹下有大量文件存在」这一情况依然会出现可能的「性能问题」。特别是 Obsidian 还有一些「插件」支持对「文件库」进行扫描、过滤和筛选。

所以我对 Obsidian 中使用「文件夹」做了如下思考：

1. 在 Obsidian 中可以适当使用「文件夹」将部分内容进行「归档」
2. 「归档」的思路不一定要根据「数据的访问或使用进行归类」，即无须按照「工作、个人、思考、摘录」这样的结构进行存储。
3. 「归档」要遵循某种「分享」和「管理」思路。

基于此并结合个人实践，目前我只归档了「会议纪要」和「项目文档」，并按照「年月日」进行归档，方便分享和查阅，例如下图中「会议纪要」归档：

![](https://cdnfile.sspai.com/2021/11/17/545ef7cc12b6bcf2f9c1705da0b5601f.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

会议纪要归档

但是在 Obsidian 中使用「归档」并不方便，毕竟我们「创建」笔记是如此简单（只需要添加「双向链接」即可），所以如何快捷「归档」是一个问题。

### 问题2：重复性操作

「间歇式日记」是我每天都在使用的笔记，并且是管理个人工作和生活非常重要的一环，在长期使用下来，我总会遇到「重复性」问题：

- 创建「导航」，方便在「间歇式日记」中追踪「上下文」。通常需要手动在笔记中添加「前一天」和「后一天」的「双向链接」。

![](https://cdnfile.sspai.com/2021/11/17/2dba5fc134095cabd062bafbe4be03e5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

日期导航

- 创建「会议纪要」并按照「年/月/日」归档。通常需要手动创建「会议纪要」的「双链」，并手动「移动」文件到「归档文件夹」。
- 「任务回顾」，对于无法在「当日完成」的任务，通常需要手动拷贝「未完成任务」到指定日期的「间歇式日记」中，例如一个任务需要下周二完成，我就会新建一个下周二的「间歇式日记」，并将这个任务拷贝到新建的「间歇式日记」中。

作为一个「效率控」自然想到是否有「插件」方便我们创建和管理「间歇式日记」并解决上边的「三个问题」，于是就有了今天的文章，首先给大家推荐一款效率插件「[Templater](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FSilentVoid13%2FTemplater)」，它会帮助我们更加便捷的管理「间歇式日记」，减少没必要的操作，让我们将精力「聚焦到内容本身」从而提高效率。

## Templater

[Templater](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FSilentVoid13%2FTemplater) 是一款 Obsidian 插件，可以根据 Templater 的「模板脚本」创建笔记。由于其「模板脚本」基于 [Eta](https://sspai.com/link?target=https%3A%2F%2Feta.js.org%2F) 进行渲染，所以具备及其强大的扩展性。

看到这里大家一定想到了 Obsidian 自带的「模板」插件，我们在《[玩转 Obsidian 05：如何进行阅读及摘要](https://sspai.com/post/68492)》中介绍过「模板」的使用方法，感兴趣可以点击连接查看。

Templater 插件相比较官方「模板插件」最大的区别就是它支持「[Eta](https://sspai.com/link?target=https%3A%2F%2Feta.js.org%2F) 模板」渲染，即具备了「执行 JavaScript 脚本的能力」，这使得我们可以完成一些自动化的事情。

**PS ：如果你有能力可以** [**点击链接**](https://sspai.com/link?target=https%3A%2F%2Fsilentvoid13.github.io%2FTemplater%2Fdocs%2F) **查看 Templater 所有语法和函数。**

### 安装并设置 Templater

第一步：在「第三方插件」中浏览并搜索 Templater：

![](https://cdnfile.sspai.com/2021/11/17/79f4b0f0462e6be541da415347639b3d.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

第二步： Templater 基础设置：

![](https://cdnfile.sspai.com/2021/11/17/317f7ef10db81f0fa132e595beae1fb4.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

1. 设置脚本存放目录：指定脚本存放文件夹，后续通过「快捷键」或「快捷入口」等方式执行脚本的时候，会默认从设定的「文件夹」查找相关「脚本文件」。
2. 打开「语法高亮」开关：打开后我们在编辑 Templater 的脚本文件时会「自动高亮」相关「语法」。
3. 打开「自动跳转光标」开关：当我们使用 Templater 创建新笔记时，可以自动将「光标」跳转到这个笔记，方便我们继续操作。
4. 打开「监听文件创建」开关：建议默认打开此开关，他会让我们兼容更多 Obsidian 中的插件例如（Review/calendar)

**PS：以下内容需要懂一些「JavaScript」脚本，如果有些困难，可以直接跳转到「使用脚本创建间歇式日记」部分。**

接下来我们将介绍如何使用 Templater 解决刚才提出的问题。

## 自动化「间歇式日记」

我希望创建「间歇式日记」的内容包含如下内容：

1. 根据「脚本模板」内容，创建 「指定日期」的「间歇式日记」。
2. 在「间歇式日记」中能够自动生成「前一天」和「后一天」的「双向链接」导航。
3. 并将生成的「间歇式日记」文件归档到`/Daily`目录下。

一个符合上边需求的「间歇式日记」样本如下图：

![](https://cdnfile.sspai.com/2021/11/17/fa79512bc7a32058b77e3057ef584df5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

### 编写脚本

接下来就进入到最关键的「脚本」环节，为了使用 Templater 创建「间歇式日记」，我们需要在上一步设置中的「Templater 目录」`\Templater\script\` 下创建名为 `zzz-daily`的「脚本模板」，见下图：

![](https://cdnfile.sspai.com/2021/11/17/ffb41fb497768010b0589ec8bad707e8.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

也许你看到一片代码会比较懵，大家不要担心，我们将这段内容进行拆解后，只需要理解几部分即可。

首先可以看到整个脚本分为了三部分：

1. 顶部脚本区：主要编写当前脚本的「核心代码」部分，这也是我的习惯。这样方便我们将脚本内容和模板内容分开。
2. 模板区：主要内容是「间歇式日记」的「模板」内容。
3. 底部脚本区：主要编写「善后代码」部分。

### 第一部分：顶部脚本区

首先看下顶部脚本区主要内容：

![](https://cdnfile.sspai.com/2021/11/17/36bb39fb70b68e51b5bdb2269ab6831d.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

这部分内容涉及核心代码较难理解，我们可以重点理解图中「① - ⑥」部分，当然如果不理解也没关系，可以直接修改部分可以看懂的内容直接用。

#### 第一步：成对出现的 `<%* -%>`

通常将「主要脚本」集中在一个区域编写，并且放到一对 `<%* -%>` 之间。当我们执行脚本的时候，Templater 就会执行`<%* -%>`之间的所有脚本内容。

#### 第二步：声明并赋值变量 `today`

![](https://cdnfile.sspai.com/2021/11/17/4ccb5dbc05809ee2bde1f09977aa442e.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `let` :关键字，表示在其后要声明一个变量。
- `today`：变量名，其值为「当前日期」。
- `tp.date.now("YYYY-MM-DD")` :函数名，此函数将获取「当前日期」的时间值并赋值给「变量名」为 `today` 的变量。
- `YYYY-MM-DD`，格式化语句，将函数 `tp.date.now` 返回的「当前日期」格式化成类似 `2021-11-13` 样式。

> 「当前日期」指的是使用这个脚本那一刻所在的日期。例如我们在「2021年11月13日」使用这个脚本，「当前日期」就是「2021-11-13」,`today` 的值就是 `2021-11-13`

**第二步,得到了变量** `**today**`**，其值为** `**YYYY-MM-DD**` **格式的「当前日期」。**

#### 第三步：声明并赋值变量 `inputDate`

![](https://cdnfile.sspai.com/2021/11/17/fdfe6022d1624e2b9dd668418117aa9b.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

`inputDate`：变量名，它将接受 `tp.system.prompt("输入示例："+today,today)` 弹出对话框中「用户输入的值」。

`await`：关键字，代表 Templater 执行到这一行的时候，会等待关键字 `await` 其后的「脚本语句」执行完成。

> `await` 通常是「非必须」的，但是为了保险起见（例如这一行代码可能是一大段「待执行」脚本的一部分时），建议在可能「执行时间较长」的「脚本语句」前都加上 `await` 关键字。

- `tp.system.prompt("输入示例："+ today, today)`：函数名，通过此函数会弹出一个「对话框」，函数接受两个参数「对话框标题」和「输入框默认值」（即「括号」中用「逗号」隔开的两部分)。
- 参数1 `"输入示例："+ today`：「对话框标题」，假设通过第一步我们得到的 `today` 变量值为 `2021-11-14`，所以当我们执行脚本的时候 `"输入示例："+ today` 代表第一个参数的值为 `输入示例：2021-11-14`。
- 参数2 `today`：「输入框默认值」，代表在弹出的「对话框」中显示「默认输入值」，同样假设第一步我们的到的 `today` 变量值为 `2021-11-14`，那么输入框中会显示 `2021-11-14` 作为「默认值」，显然我们可以将这个值改为真正想创建「间歇式日记」那一天的具体值。

> 这里一定要注意，在弹窗中输入的值一定要符合 `YYYY-MM-DD` 格式（即 `2021-11-14`），否则会失败。

![](https://cdnfile.sspai.com/2021/11/17/cbf003d588bc27187a2772613330bb9a.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

**第三步，得到了变量** `**inputDate**`**,其值为用户输入的「具体日期」内容。**

#### 第四步：声明并赋值 `titleName`

这一步较为繁琐，它先将我们在「第三步」输入的得到的「字符串类型」变量 `inputDate` 转换成「时间类型」变量，再将这个「时间类型」变量按照 `YYYY-MM-DD_ddd` 格式化成「字符串类型」变量。

![](https://cdnfile.sspai.com/2021/11/17/f0cc74cbd263225ecd470ec7dccbeebd.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `titleName`：变量名，它接受 `window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")` 最终返回的字符串。
- `window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")`：函数名，通过此函数可以将「字符串类型」的变量转换成「时间类型」的变量。
- 参数1 `inputDate`：变量，第三步我们输入的「日期字符串」。
- 参数2 `"YYYY-MM-DD"`：字符串，表示将「字符串类型」变量按照这个格式转换成「日期类型」变量。
- 参数3 `true`：布尔型变量，代表启动转换。
- 最终 `window.moment(inputDate, "YYYY-MM-DD", true)` 将第三步得到的变量 `inputDate` (我们手动输入的「日期字符串」)转换成「日期类型」变量。

> 变量是有类型的，这属于编程范畴的要求，有些函数只接收「符合类型」的参数。所以在很多场合我们要对「变量」进行「类型转换」。

- `.format("YYYY-MM-DD_ddd")`：函数名，通过此函数可以将「时间类型」变量再次格式化成「字符串类型」变量。
- 参数 `YYYY-MM-DD_ddd`： 意思是将「时间类型」变量转换成「YYYY-MM-DD\_ddd」样式例如 `2021-11-13_Sat`。

**第四步，得到了变量** `**titleName**`**,其值为「**`**inputDate**` **(第三步输入的「日期字符串」) 按照** `**YYYY-MM-DD_ddd**` **格式化后的值」。**

> 这部分语法使用的是 [momentjs](https://sspai.com/link?target=https%3A%2F%2Fmomentjs.com%2F)。

#### 第五步：声明并赋值 `before_date` 和 `after_date`

![](https://cdnfile.sspai.com/2021/11/17/8052941272b0b143ed0d7e10e8f753c6.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

和第四步很像，这一步我们只说一下 `add` 函数：

- `.add()`：函数名，通过此函数可以对「时间类型」变量进行计算。
- `add(-1,"days")`，得到「时间类型」变量「前一天」的值。
- `add(1,"days")`，得到「时间类型」变量「后一天」的值。

**第五步，得到了两个变量** `**before_date**` **和** `**after_date**`**，其值分别为用户输入「具体日期」的前一天和后一天。**

#### 第六步：输出变量`before_date` 和 `after_date`

- `<< [[<% before_date %>]] | [[<% after_date %>]] >>`

> 被一对 `<% %>` 包围的语句，其实就是将被包裹的「变量」对应的值，输出到模板中。举例来说以上语句就会在创建出来的模板中输出：`<< [[2021-11-13_Sat]] | [[2021-11-15_Mon]] >>` 。

### 第二部分：模板区域

模板区域目前没有用到任何「脚本变量」或「脚本语法」，基本上就是将文本内容输出到将来要创建的笔记中。

需要注意的是我们并不需要在「模板区域」中输出「所有未来可能」要出现的内容，因为未来是不确定的，否则的话我们就得经常修改「模板区域」内容。

我的做法是创建一个名为「workBench」笔记，并通过「双向链接」关联到「模板区域」，这样我就需要将那些会随着时间发生变化的内容在「workBench」中进行统一调整，而不用修改模板，我的「workBench」架构如下：

![](https://cdnfile.sspai.com/2021/11/17/6b885d818a20881e7411ecad02da9cd0.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

我会定期调整需要关注的的事项，将其移到对应的区域。例如从「高优关注」-->「有时间关注」或「冷藏」；将「所有完成的任务」-->「Done」。

### 第三部分：底部脚本区

目前在「底部脚本区」我只编写那些在模板生效之后要做的事情，例如：

- `await tp.file.move("/Daily/" + titleName)`
- `tp.file.cursor()`

第一行是将当前基于「脚本模板」创建的笔记移动到 `/Daily` 目录中，也就是将日记「归档」。

第二行是让当前笔记获得焦点（鼠标闪烁）。

至此，我们创建了位于 `\Templater\script\` 的「脚本模板」，文件名为 `zzz-daily`，接下来就是应用了。

### 「间歇式日记」完整脚本内容

点击查看 [Github](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjiangnanandi%2Fobsidian%2Fblob%2Fmain%2F%2520Obsidian07%2Fzzz-daily) 完整代码

```javascript
<%*
let today = tp.date.now("YYYY-MM-DD")
let inputDate = await tp.system.prompt("输入示例："+today,today)
titleName = window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")

before_date = window.moment(inputDate, "YYYY-MM-DD", true).add(-1,"days").format("YYYY-MM-DD_ddd")

after_date = window.moment(inputDate, "YYYY-MM-DD", true).add(1,"days").format("YYYY-MM-DD_ddd")

let createTime = tp.file.creation_date()
let modificationDate = tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss")
-%>

---
create time : <% createTime %>
modification date: <% modificationDate %>

---

<< [[<% before_date %>]] | [[<% after_date %>]] >>

<% tp.web.daily_quote() %>
<% tp.web.random_picture("200x200", "landscape,water") %>

#### 重点关注
-  ==早上 7 件事==
    - [ ] 花点时间回顾和反思
    - [ ] 查看「反向链接」和「工作待办」
    - [ ] 扫一眼邮件
    - [ ] 确定最困难的工作，拆分成多个小任务
    - [ ] 写下需要思考的东西
    - [ ] 忽略人际关系冲突
    - [ ] 不开会/少开会
- 工作效率
    - [[会议检查清单]]
    - [[Workbench]]

#### 阅读笔记 & 会议纪要
通常记录一些需要技术阅读的内容
#### 间歇日记
- 今日重点任务
    - xxxxx

<%*
await tp.file.move("/Daily/" + titleName)
tp.file.cursor()
-%>
```

### 使用脚本创建「间歇式日记」

首先回顾一下我们的使用场景：

1. 根据「脚本模板」内容，创建 「指定日期」的「间歇式日记」。
2. 在「间歇式日记」中能够自动生成「前一天」和「后一天」的「双向链接」导航。
3. 并将生成的「间歇式日记」文件归档到`/Daily`目录下。

使用的时候只需几步即可完成：

1\. 使用快捷键「Cmd+N」新建一篇笔记。

2\. 点击左侧「快捷入口」，输入「zzz」快速筛选出要执行的「脚本模板」（即刚才创建的 `zzz-daily` ），选择对应的文件即可完成。

![](https://cdnfile.sspai.com/2021/11/17/45629b5e1e4d47d70c32fc97646141d1.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

3\. 在弹出对话框中，输入「指定日期」，完成「间歇式日记」的创建，并且光标停在当前笔记。

![](https://cdnfile.sspai.com/2021/11/17/40957c9eb617d7dc6b6c204bc56812d5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

最终生成的「间歇式日记」如下图：

![](https://cdnfile.sspai.com/2021/11/17/eccddb9064f889a51893a9436eb5fb66.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

### 附加脚本

你可能已经从上图中关注到出现了一个新的区域，它包含一段话和一张图片：

![](https://cdnfile.sspai.com/2021/11/17/24371af6ea110871783fd12000c6f919.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

这是因为在刚才创建的「脚本模板」 `zzz-daily` 中有两行代码，他们是 Templater 内置的两个函数，可以随机获得一些文字和图片，我觉得挺好的就保留了。

- `<% tp.web.daily_quote() %>`
- `<% tp.web.random_picture("200x200", "landscape,water") %>`

> 如果你在模板中也用到了这两行代码，需要注意，当我们创建「间歇式日记」之后，新笔记会有一段时间是「空白」的，需要「稍等一会」才出现全文，这是因为这两行代码产生了「网络请求」，而网络请求受「网络延时」影响可能会比较慢。此时，只需要耐心等待内容加载出来即可，不要做其他操作。

**PS：如果遇到类似下图中 「Templater Error:」错误，可以尝试删除这两行代码，原因是网络问题会引起 Timeout 超时错误。**

![](https://cdnfile.sspai.com/2021/11/18/ff9ba59686bbdd35c6c6e67e88d93ffe.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

超时引起的报错

## 自动化「任务回顾」

「任务回顾」是我在「间歇式日记」中常用的方式，每当遇到无法当天完成的「任务」，我都会评估一个完成日期，手动创建这一天的「间歇式日记」，并手动将「任务」拷贝到这一天的笔记当中。

这个过程总是比较繁琐，接下来将介绍一个插件「[Review](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fryanjamurphy%2Freview-obsidian)」帮我们解决此问题。。

安装步骤就不详述了，说一下使用场景。

**PS：Review 插件依赖「Calendar」插件**

Review 插件依赖另一个我们之前介绍过的插件[Calendar](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fliamcain%2Fobsidian-calendar-plugin)，所以要确保同时安装过此插件。关于「Calendar」插件的使用可以查看《[玩转 Obsidian 03：如何记录「间歇式日记」](https://sspai.com/link?target=https%3A%2F%2Fxzsj.vip%2F2020%2Fobsidian-03)》。

#### 使用 Review

对于未完成的任务，我们只需要在「编辑模式」下，让光标停留在需要「回顾的任务」那一行，按下「Cmd+P」启动命令行，输入「Review」关键字选择 `review:Add this block to a daily note for review` 这个命令执行。

![](https://cdnfile.sspai.com/2021/11/17/5112620109f27fde0ed91937aa06c538.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

接下来发生两件事：  
1.Review 插件会弹出一个对话框要求输入「指定日期」。

![](https://cdnfile.sspai.com/2021/11/17/c38ccec3cf3b3c2bfa23b122bfb2d346.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

PS：「指定日期」可以是具体的「2021-11-14」样式，也可以是 `today`、`Tomorrow` 等单词。

2.Review 利用「Calendar」创建「指定日期」的「间歇式日记」（如果笔记不存在的话），并将当前光标所在这一行内容拷贝到刚创建的「间歇式日记」笔记中。

![](https://cdnfile.sspai.com/2021/11/17/9c87a01c774822378f113ab0968959e6.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

#### 补齐「顶部区域」信息

仔细看 `2021-11-13_Sat` 和 `2021-11-15_Mon` 两篇「间歇式日记」格式不同，`2021-11-15_Mon` 缺少顶部的「日期导航」。这是因为 「Calendar」创建「间歇式日记」会依赖 Obsidian 官方的「日记」插件的「模板」，存放位置如图：

![](https://cdnfile.sspai.com/2021/11/17/0e6854dd2a90ac26355f25a7c6c5b477.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

由于其不支持「JavaScript」脚本，所以也就无法展示「日期导航」。

如果你需要补齐「日期导航」的，可按如下操作：

1. 在 `\Templater\script\` 目录下创建名为 `zzz-insert-metadata` 的「脚本模板」文件。
2. 将如下笔记内容添加到模板（其实就是截取了刚才 `zzz-daily` 脚本的部分内容）。
3. 在「编辑模式」下，光标移动到当前笔记的顶部，点击「快捷入口」选择执行 `zzz-insert-metadata` 模板文件。

完整脚本内容：

点击查看 [Github](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjiangnanandi%2Fobsidian%2Fblob%2Fmain%2F%2520Obsidian07%2Fzzz-insert-metadata) 完整代码

```javascript
<%*
let today = tp.date.now("YYYY-MM-DD")
let inputDate = await tp.system.prompt("输入示例："+ today,today)
titleName = window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")

before_date = window.moment(inputDate, "YYYY-MM-DD", true).add(-1,"days").format("YYYY-MM-DD_ddd")

after_date = window.moment(inputDate, "YYYY-MM-DD", true).add(1,"days").format("YYYY-MM-DD_ddd")

let createTime = tp.file.creation_date()
let modificationDate = tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss")
-%>

---
create time : <% createTime %>
modification date: <% modificationDate %>

---

<< [[<% before_date %>]] | [[<% after_date %>]] >>
<% tp.web.daily_quote() %>
<% tp.web.random_picture("200x200", "landscape,water") %>
```

## 自动化「会议纪要」

完成了「间歇式日记」的自动化后，我们看一下如何自动化「会议纪要」，首先回顾一下我们的诉求：

1. 「光标」停留在任意笔记的任意位置，根据「脚本模板」创建「会议纪要」笔记，并将笔记的「双向链接」插入在「光标」所在位置。
2. 同时将上一步创建的「会议纪要」笔记按照「年/月/日」方式进行归档。

同样我们利用 Templater 的脚本完成，这次我们需要两个文件：

- 「会议纪要模板」：此模板负责生成「会议纪要」的内容，并且档当前笔记。
- 「会议纪要脚本」：脚本根据「会议纪要模板」创建新的笔记，并在「光标」处插入「双向链接」。

### 编写「会议纪要模板」

「会议纪要模板」主要存放会议的模板信息，首先在 `\Templater\note\` 目录下创建名为 `Metting-work` 的「会议纪要模板」：

![](https://cdnfile.sspai.com/2021/11/17/9bf900c569b822b7003313d2edf5a44e.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

模板文件比较简单，只用到了两个脚本语句：

`<% tp.date.now("YYYY-MM-DD_ddd") %>]`:上文提到过在一对`<% %>`中包含的脚本，会在此位置直接输出对应的值。

- `tp.date.now("YYYY-MM-DD_ddd") `:函数名，函数获取「当前日期」的时间值，并赋值给名为 `today` 的变量。
- 参数1 `YYYY-MM-DD_dd`：格式化语句，它将 `tp.date.now` 返回的「当前日期」变量值格式化成 `2021-11-13_Sat` 样式。
- 此函数相当于在这篇「会议纪要」笔记的位置插入了「当前日期」的「间歇式日记」的「双向链接」。

`<% await tp.file.move("/MeetNote/" + tp.date.now("YYYY") + "/" + tp.file.title) %>`:将「当前笔记」移动到 `/MeetNote/2021/` 文件夹下。

- `await`：关键字，代表 Templater 执行到这一行的时候，会等待关键字 `await` 其后的「脚本语句」执行完成。
- `tp.file.move()`：函数名，将当前文件移动到指定目录。
- 参数1 `"/MeetNote/" + tp.date.now("YYYY") + "/" + tp.file.title)`：将字符串拼接在一起。
- `tp.date.now("YYYY")` ：函数名，获取「当前日期」。`YYYY` 参数，代表返回「当前日期」的格式，只返回「年」，例如 `2021`。
- `tp.file.title`:成员变量，其值为「当前笔记」的标题。
- 最终得到类似 `/MeetNote/2021/aaaaa` 值
- 此函数将笔记移动到类似 `/MeetNote/2021/aaaaa` 进行归档。

#### 「会议纪要模板」完整脚本内容

点击查看 [Github](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjiangnanandi%2Fobsidian%2Fblob%2Fmain%2F%2520Obsidian07%2FMetting-work) 完整代码

```javascript
**Tags:** [[Notes&Drafts]]

----
## 参会人
- 待补充

## 会议信息
- **Topic:**  工作会议
- **Location:** xxxx
- **Date:** [[<% tp.date.now("YYYY-MM-DD_ddd") %>]]
- **Time/Duration:**  xx:xx - xx:xx

## 议题
1. 待补充

## Todo
无

<% await tp.file.move("/MeetNote/" + tp.date.now("YYYY") + "/" + tp.file.title) %>
```

### 编写「会议纪要脚本」

「会议纪要脚本」的作用是：在光标所在位置插入一则笔记，而笔记的内容是根据上一步的「会议纪要模板」而创建的，同时将笔记归档到指定目录。

在 `\Templater\script\` 目录下创建名为 `zzz-meeting` 的「会议纪要模板」：

![](https://cdnfile.sspai.com/2021/11/17/d18795c98e48cfb2e846131444ff6033.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

#### 第一步：声明并赋值变量 `input`

![](https://cdnfile.sspai.com/2021/11/17/6dc21ab49127087771385fe0fb4cbfe6.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `input`：变量名，其值为弹窗中输入的内容。
- `await`：关键字，代表 Templater 执行到这一行的时候，会等待关键字 `await` 其后的「脚本语句」执行完成。
- `tp.system.prompt("输入会议标题：")`：函数，弹窗要求用户输入「会议标题」。

**第一步，得到变量** `**input**`**，其值为用户输入的内容。**

#### 第二步：声明并赋值变量 `templateName`

![](https://cdnfile.sspai.com/2021/11/17/22cc8efeac9b0b7b40118e4c13c19821.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `templateName`：变量名，其值为获得的「模板」「句柄」
- 句柄：可以理解为使用变量 `templateName` 操作其指定的「模板」。
- `tp.file.find_tfile("Metting-work")`：函数，查找并获取名称为 `Metting-work` 的「句柄」。

**第二步，得到变量** `**input**`**，其值为用户输入的内容。**

#### 第三步：声明并赋值变量 `today`

![](https://cdnfile.sspai.com/2021/11/17/5b37d8ccb436f2baca5177f8da0227e3.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `let` :关键字，代表要声明一个变量；
- `today`：变量，接收 `tp.date.now("YYYY-MM-DD")` 的返回值；
- `tp.date.now("YYYY-MM-DD")` :函数，通过此函数获取「当前日期」的时间值。
- 参数 `YYYY-MM-DD`，格式化语句，代表我们通过 `tp.date.now` 返回的变量值符合「2021-11-13」这种格式。

**第三步，得到变量** `**today**`**，其值为** `**YYYY-MM-DD**` **格式的「当前日期」**

#### 第四步：声明并赋值变量 `titleName`

![](https://cdnfile.sspai.com/2021/11/17/8510420ead24d5968b9a8a29936e25c6.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `titleName`：变量，其值为「当前日期 - 输入值」。即将第一步和第三步的两个变量值合并，得到类似 `2021-11-15 - xxx会议纪要`。

**第四步，得到变量** `**titleName**`**，其值类似** `**2021-11-15 - xxx会议纪要**`**。**

#### 第五步：根据「模板」创建笔记

![](https://cdnfile.sspai.com/2021/11/17/64c4f0748640a1dad67b445f2194e9ef.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

- `await`：关键字，代表 Templater 执行到这一行的时候，会等待关键字 `await` 其后的「脚本语句」执行完成。
- `tp.file.create_new(templateName, titleName, false)`：函数，根据「模板句柄」创建新的笔记。
- 参数1 `templateName`：变量，其值为第二步获得的「模板句柄」。
- 参数2 `titleName`：变量，其值为第四步获得的「笔记标题」。
- `.basename`：成员变量，其值为 `tp.file.create_new()` 创建的笔记的「文件名」。

**第五步，脚本语句会创建「会议纪要」笔记，并输出笔记的「双向链接」到光标所在处**。

#### 「会议纪要脚本」完整脚本内容

点击查看 [Github](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjiangnanandi%2Fobsidian%2Fblob%2Fmain%2F%2520Obsidian07%2Fzzz-metting) 完整代码

```javascript
<%* 
let input = await tp.system.prompt("输入会议标题：")
let templateName = tp.file.find_tfile("Metting-work")
let today = tp.date.now("YYYY-MM-DD")
let titleName = today+" - " + input
-%>
[[<% (await tp.file.create_new(templateName, titleName , false)).basename %>]]
```

#### 如何实现自动归档

还记得我们上一步「会议纪要模板」的最后一行代码：

`<% await tp.file.move("/MeetNote/" + tp.date.now("YYYY") + "/" + tp.file.title) %>`

所以 Templater 插件通过「会议纪要模板」创建「会议纪要」时，笔记「自动」被归档到类似 `/MeetNote/2021/` 目录下。

### 使用脚本创建「会议纪要」

创建「会议纪要」步骤很简单：

1.将光标停留在需要添加「会议纪要」的区域，点击「快捷入口」  
 

![](https://cdnfile.sspai.com/2021/11/17/05007a9fbc3add5b5a714119b8cec488.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

2\. 在弹出对框中输入「会议标题」，如图：  
 

![](https://cdnfile.sspai.com/2021/11/17/5fc4141683afc1e93373e0087f176f68.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

完成后如图：  
 

![](https://cdnfile.sspai.com/2021/11/17/a1fc11187299adc81a779b62d43a2d70.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

## 总结

「间歇式日记」可以让 Obsidian 更好的管理我们的日常工作和生活，在使用中也提出了几个问题：

- 问题1：笔记优先法则 Vs 文件夹管理
- 得出结论，适当的用「文件夹归档」有利于我们分享笔记和提高性能。
- 问题2：重复性操作
- 创建「导航」，方便在「间歇式日记」中追踪「上下文」。通常需要手动在笔记中添加「前一天」和「后一天」的「双向链接」。
- 创建「会议纪要」并按照「年/月/日」归档。通常需要手动创建「会议纪要」的「双链」，并手动「移动」文件到「归档文件夹」。
- 「任务回顾」，对于无法在「当日完成」的任务，通常需要手动拷贝「未完成任务」到指定日期的「间歇式日记」中，例如一个任务需要下周二完成，我就会新建一个下周二的「间歇式日记」，并将这个任务拷贝到新建的「间歇式日记」中。

针对以上问题，本篇花了大量篇幅介绍了 [Templater](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FSilentVoid13%2FTemplater) 和 [Review](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fryanjamurphy%2Freview-obsidian) 两个插件，解决自动化问题：

- 自动化「间歇式日记」
- 自动化「任务回顾」
- 自动化「会议纪要」

相信许多人都有一个疑惑：如果不懂 JavaScript 脚本是否可以用好 Templater？

其实完全没问题，如果不懂得脚本，直接拷贝「每节」的「xxx 完整脚本内容」部分，直接使用即可（也可以做小范围修改），本文包含的脚本内容如下：

- 「间歇式日记」完整脚本内容
- 「会议纪要模板」完整脚本内容
- 「会议纪要脚本」完整脚本内容

希望本文可以起到「抛砖引玉」作用，大家可以利用 Templater 制作出更多「自动化」脚本提高效率。

「玩转 Obsidian」系列会持续更新「如何使用 Obsidian 进行知识管理」，对此系列感兴趣可以在以下渠道找到相关文章：

- [少数派专栏 - 知识管理之术](https://sspai.com/my/column/263/post)
- [闲者时间博客](https://sspai.com/link?target=https%3A%2F%2Fxzsj.vip%2F)
- [闲者时间 Medium](https://sspai.com/link?target=https%3A%2F%2Fxzsj.icu%2F)

玩转 Obsidian 系列目前包括文章：

- 《[玩转 Obsidian 01：用 Obsidian 打造「知识循环」利器](https://sspai.com/post/62414)》
- 《[玩转 Obsidian 02：基础设置篇](https://sspai.com/post/63481)》
- 《[玩转 Obsidian 03：如何记录「间歇式日记」](https://sspai.com/post/63674)》
- 《[玩转 Obsidian 04：为什么推荐使用 Obsidian 做知识管理](https://sspai.com/post/67339)》
- 《[玩转 Obsidian 05：如何进行阅读及摘要](https://sspai.com/post/68492)》
- 《[玩转 Obsidian 06：如何用渐进式总结笔记，把知识交给未来的自己](https://sspai.com/post/69025)》

可以在 [Twitter](https://sspai.com/link?target=https%3A%2F%2Ftwitter.com%2Fxianzheshijian)、[Telegram](https://sspai.com/link?target=https%3A%2F%2Ft.me%2Fxztime) 、[instagram](https://sspai.com/link?target=https%3A%2F%2Finstagram.com%2Fshopkeeper.wang) 等渠道关注我，获取更多有意思的讯息。

\> 下载 [少数派 2.0 客户端](https://sspai.com/page/client)、关注 [少数派公众号](https://sspai.com/s/J71e)，了解更多 Obsidian 技巧  📰

\> 实用、好用的 [正版软件](https://sspai.com/mall)，少数派为你呈现 🚀