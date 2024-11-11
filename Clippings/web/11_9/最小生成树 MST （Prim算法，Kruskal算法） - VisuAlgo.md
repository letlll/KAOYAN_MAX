---
title: "最小生成树 MST （Prim算法，Kruskal算法） - VisuAlgo"
source: "https://visualgo.net/zh/mst"
author:
published:
created: 2024-11-10
description: "一个连通无向有权图 G 的 生成树 Spanning Tree (ST) 是 G 的子图，同时也是一个连接 G 中所有节点的树。 一个图 G 可以有很多的生成树 (详见 this 或者 this)，而每一个都有不同的总权重（生成树中所有边的权重之和）。图 G 的最小生成树 Min(imum) Spanning Tree (MST) 是在所有生成树中，有着最小总权重的生成树。"
tags:
  - "clippings"
---
[7](https://www.comp.nus.edu.sg/~stevenha) [VisuAlgo.net](https://visualgo.net/) / /mst 最小二叉树 [Login](https://visualgo.net/login)

加上这条边不会形成环，所以我们将其加入 T。T 的当前权重为 2.

![>](https://visualgo.net/img/arrow_black_right.png "show/hide status panel")

![>](https://visualgo.net/img/arrow_white_right.png "show/hide codetrace panel")

Kruskal 算法

Visualisation Scale

Toggle V. Number for 0.5x

编辑图表

Input Graph

图示

Kruskal 算法

Prim 算法(s)

\>

Status

No Warning

No Error

## Input  
Directed = false, Weighted = true

Indexing Options

0-Indexed   1-Indexed  

Add dummy 0 vertex: (only work with 1-indexing)

Graph Input Type

Edge List   Adjacency Matrix   Adjacency List  

Preferred Output Graph

Default  Bipartite  Line  Cycle  DAG  Tree  Flow  

#### 关于

✕

VisuAlgo最初由副教授Steven Halim于2011年构思，旨在通过提供自学、互动式学习平台，帮助学生更深入地理解数据结构和算法。

VisuAlgo涵盖了Steven Halim博士与Felix Halim博士、Suhendry Effendy博士合著的书《竞技编程》中讨论的许多高级算法。即使过去十年，VisuAlgo仍然是可视化和动画化这些复杂算法的独家平台。

虽然VisuAlgo主要面向新加坡国立大学（NUS）的学生，包括各种数据结构和算法课程（例如CS1010/等价课程，CS2040/等价课程（包括IT5003），CS3230，CS3233和CS4234），但它也是全球好奇心的宝贵资源，促进在线学习。

最初，VisuAlgo并不适用于智能手机等小触摸屏，因为复杂的算法可视化需要大量的像素空间和点击拖动交互。为了获得最佳用户体验，建议使用最低分辨率为1366x768的屏幕。然而，自2022年4月以来，VisuAlgo的移动（精简）版本已经推出，使得在智能手机屏幕上使用VisuAlgo的部分功能成为可能。

VisuAlgo仍然在不断发展中，正在开发更复杂的可视化。目前，该平台拥有24个可视化模块。

VisuAlgo配备了内置的问题生成器和答案验证器，其“在线测验系统”使学生能够测试他们对基本数据结构和算法的理解。问题根据特定规则随机生成，并且学生提交答案后会自动得到评分。随着越来越多的计算机科学教师在全球范围内采用这种在线测验系统，它可以有效地消除许多大学标准计算机科学考试中手工基本数据结构和算法问题。通过给通过在线测验的学生分配一个小但非零的权重，计算机科学教师可以显著提高学生对这些基本概念的掌握程度，因为他们可以在参加在线测验之前立即验证几乎无限数量的练习题。每个VisuAlgo可视化模块现在都包含自己的在线测验组件。

VisuAlgo已经被翻译成三种主要语言：英语、中文和印尼语。此外，我们还用各种语言撰写了关于VisuAlgo的公开笔记，包括印尼语、韩语、越南语和泰语：

[id](https://www.facebook.com/notes/steven-halim/httpidvisualgonet-visualisasi-struktur-data-dan-algoritma-dengan-animasi/10153236934439689)

,

[kr](http://blog.naver.com/visualgo_nus)

,

[vn](https://www.facebook.com/groups/163215593699283/permalink/824003417620494/)

,

[th](http://pantip.com/topic/32736343)

.

#### 团队

✕

**项目领导和顾问（2011年7月至今）**  
[Associate Professor Steven Halim](https://www.comp.nus.edu.sg/~stevenha/), School of Computing (SoC), National University of Singapore (NUS)  
[Dr Felix Halim](https://www.linkedin.com/in/felixhalim/), Senior Software Engineer, Google (Mountain View)

**本科生研究人员 1**  
**CDTL TEG 1: Jul 2011-Apr 2012**: Koh Zi Chun, Victor Loh Bo Huai

**最后一年项目/ UROP学生 1**  
**Jul 2012-Dec 2013**: Phan Thi Quynh Trang, Peter Phandi, Albert Millardo Tjindradinata, Nguyen Hoang Duy  
**Jun 2013-Apr 2014** [Rose Marie Tan Zhao Yun](https://www.rosemarietan.com/), Ivan Reinaldo

**本科生研究人员 2**  
**CDTL TEG 2: May 2014-Jul 2014**: Jonathan Irvin Gunawan, Nathan Azaria, Ian Leow Tze Wei, Nguyen Viet Dung, Nguyen Khac Tung, Steven Kester Yuwono, Cao Shengze, Mohan Jishnu

**最后一年项目/ UROP学生 2**  
**Jun 2014-Apr 2015**: Erin Teo Yi Ling, Wang Zi  
**Jun 2016-Dec 2017**: Truong Ngoc Khanh, John Kevin Tjahjadi, Gabriella Michelle, Muhammad Rais Fathin Mudzakir  
**Aug 2021-Apr 2023**: Liu Guangyuan, Manas Vegi, Sha Long, Vuong Hoang Long, Ting Xiao, Lim Dewen Aloysius  

**本科生研究人员 3**  
**Optiver: Aug 2023-Oct 2023**: Bui Hong Duc, Oleh Naver, Tay Ngan Lin  

**最后一年项目/ UROP学生 3**  
**Aug 2023-Apr 2024**: Xiong Jingya, Radian Krisno, Ng Wee Han, Tan Chee Heng  
**Aug 2024-Apr 2025**: Edbert Geraldy Cangdinata, Huang Xing Chen, Nicholas Patrick  

List of translators who have contributed ≥ 100 translations can be found at [statistics](https://visualgo.net/statistics) page.

**致谢**  
NUS教学与学习发展中心（CDTL）授予拨款以启动这个项目。在2023/24学年，Optiver的慷慨捐赠将被用来进一步开发 VisuAlgo。

#### 使用条款  

✕

VisuAlgo慷慨地向全球计算机科学界提供免费服务。如果您喜欢VisuAlgo，我们恳请您**向其他计算机科学学生和教师宣传它的存在**。您可以通过社交媒体平台（如Facebook、YouTube、Instagram、TikTok、Twitter等）、课程网页、博客评论、电子邮件等方式分享VisuAlgo。

数据结构与算法（DSA）的学生和教师可以直接在课堂上使用本网站。如果您从本网站截取屏幕截图或视频，可以在其他地方使用，但请引用本网站的URL（[https://visualgo.net](https://visualgo.net/)）和/或下面的出版物列表作为参考。但请不要下载VisuAlgo的客户端文件并将其托管在您的网站上，因为这构成了抄袭行为。目前，我们不允许他人分叉此项目或创建VisuAlgo的变体。个人使用离线副本的客户端VisuAlgo是可以接受的。

请注意，VisuAlgo的在线测验组件具有重要的服务器端元素，保存服务器端脚本和数据库并不容易。目前，普通公众只能通过“培训模式”访问在线测验系统。“测试模式”提供了一个更受控制的环境，用于在新加坡国立大学的真实考试中使用随机生成的问题和自动验证。

**出版物列表**

这项工作曾在2012年国际大学生程序设计竞赛（波兰，华沙）的CLI研讨会上和2012年国际信息学奥林匹克竞赛（意大利，锡尔米奥内-蒙蒂基亚里）的IOI会议上展示过。您可以点击[此链接](https://ioinformatics.org/journal/INFOL099.pdf)阅读我们2012年关于该系统的论文（当时还没有称为VisuAlgo），以及[此链接](https://ioinformatics.org/journal/v9_2015_243_245.pdf)阅读2015年的简短更新（将VisuAlgo与之前的项目关联起来）。

**错误报告或新功能请求**

VisuAlgo并不是一个完成的项目。Steven Halim副教授仍在积极改进VisuAlgo。如果您在使用VisuAlgo时发现任何可视化页面/在线测验工具中的错误，或者您想要请求新功能，请联系Steven Halim副教授。他的联系方式是将他的名字连接起来，然后加上gmail dot com。

#### 隐私政策

✕

**版本 1.2 (更新于2023年8月18日星期五)。**

自2023年8月18日（星期五）起，我们不再使用 Google Analytics。因此，我们现在使用的所有 cookies 仅用于此网站的运营。即使是首次访问的用户，烦人的 cookie 同意弹窗现在也已关闭。

自2023年6月7日（星期五）起，由于 Optiver 的慷慨捐赠，全世界的任何人都可以自行创建一个 VisuAlgo 账户，以存储一些自定义设置（例如，布局模式，默认语言，播放速度等）。

此外，对于 NUS 学生，通过使用 VisuAlgo 账户（一个 NUS 官方电子邮件地址，课堂名册中的学生姓名，以及在服务器端加密的密码 - 不存储其他个人数据），您同意您的课程讲师跟踪您的电子讲义阅读和在线测验培训进度，这是顺利进行课程所必需的。您的 VisuAlgo 账户也将用于参加 NUS 官方的 VisuAlgo 在线测验，因此，将您的账户凭据传递给他人代您进行在线测验构成学术违规。课程结束后，您的用户账户将被清除，除非您选择保留您的账户（OPT-IN）。访问完整的 VisuAlgo 数据库（包含加密密码）的权限仅限于 Halim 教授本人。

对于全球其他已经给 Steven 写过信的 CS 讲师，需要一个 VisuAlgo 账户（您的（非 NUS）电子邮件地址，您可以使用任何显示名称，以及加密密码）来区分您的在线凭据与世界其他地方。您的账户将具有 CS 讲师特定的功能，即能够查看隐藏的幻灯片，这些幻灯片包含了在隐藏幻灯片之前的幻灯片中提出的问题的（有趣的）答案。您还可以访问 VisuAlgo 在线测验的 Hard 设置。您可以自由地使用这些材料来增强您的数据结构和算法课程。请注意，未来可能会有其他 CS 讲师特定的功能。  

对于任何拥有 VisuAlgo 账户的人，如果您希望不再与 VisuAlgo 工具有关联，您可以自行删除您的账户。