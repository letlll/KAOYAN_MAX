---
title: "教你快速导出 ChatGPT 对话数据！_怎样导出chatgpt的内容-CSDN博客"
source: "https://blog.csdn.net/qqerrr/article/details/131317123"
author:
published:
created: 2024-11-10
description: "文章浏览阅读1.1w次，点赞6次，收藏15次。文章介绍了如何在ChatGPT中申请导出对话记录，通过邮箱确认并使用开源工具ChatGPT-Stacks进行对话管理，支持对话分组、图片/PDF导出、删除与搜索等功能，可在Windows和MacOS上使用。"
tags:
  - "clippings"
---
距离 ChatGPT 上线已经过了半年，ChatGPT 已成为最有价值的工具，相信大家已经在使用 ChatGPT 高效地完成各项工作了。在 2023 年 4 月 25 日 [OpenAI](https://so.csdn.net/so/search?q=OpenAI&spm=1001.2101.3001.7020) 开放了保存对话数据的功能，让我们在使用 ChatGPT 来进行创意写作或编码等工作时，可以保存或分享我们与 ChatGPT 的对话，今天就来说说具体的操作步骤。

**目录**

[1\. 在 ChatGPT 中申请导出](https://blog.csdn.net/qqerrr/article/details/131317123/#t0)

[2\. 前往邮箱确认](https://blog.csdn.net/qqerrr/article/details/131317123/#t1)

[3\. 使用 ChatGPT 对话管理工具，轻松管理对话记录](https://blog.csdn.net/qqerrr/article/details/131317123/#t2)

---

**其他问题访问**：链接：https://pan.baidu.com/s/19mS5N9XJ\_AotF20kUwSA3w?pwd=p5kx   
提取码：p5kx 

### 1\. 在 ChatGPT 中申请导出

先进入 ChatGPT 官网登录你的账号，然后按照下面截图进行操作。

![](https://i-blog.csdnimg.cn/blog_migrate/8b56534929e4a981cd625087244cf1aa.png)

点击自己用户名后面的“三个点”

![](https://i-blog.csdnimg.cn/blog_migrate/61c4cbb4b2a97e9c07eec566afeaa222.png)

点击 Settings

![](https://i-blog.csdnimg.cn/blog_migrate/e7c0137e59927d3002ce0784c44d2e24.png)

Settings 弹窗出来后，点击 Data controls -> Export Data -> 点击 Export 按钮

这里还有一个细节需要注意，**不论你选择哪个对话，最终导出的都是 全部对话**

![](https://i-blog.csdnimg.cn/blog_migrate/1ab3421a5a62c7ab8bbe5caf0a548805.png)

点击 Confirm export 按钮

到最后一步，ChatGPT 将会提示你：

请求数据导出-是否确定？

- 您的帐户详细信息和对话将包括在导出中。
- 数据将以可下载文件的形式发送到您的注册电子邮件中。
- 处理可能需要一些时间。准备好了我们会通知您的。
- 若要继续，请单击下面的“确认导出”。

点击 Confirm export 按钮后，ChatGPT 会通过邮箱发送给你对话数据，去我们登录账号使用的邮箱上查收即可。

![](https://i-blog.csdnimg.cn/blog_migrate/34c71df72550486c487ad4f31368e6a1.png)

### 2\. 前往邮箱确认

登录你的邮箱，Gmail 或 Outlook，我这里是 Outlook 登录，所以用 Outlook 演示：

![](https://i-blog.csdnimg.cn/blog_migrate/640f37e88ad3f0f0203bb4704acc7d41.png)

点击 OpenAI 向你发送的邮件

![](https://i-blog.csdnimg.cn/blog_migrate/7cf9c233085d2fb87d6ee773268f72ad.png)

点击 Download data export 后我们会下载一个 Zip，里面包含我们与 ChatGPT 的所有对话记录

![](https://i-blog.csdnimg.cn/blog_migrate/0a3383d6b478765481b9cc3864d0dc05.png)

解压这个 Zip

![](https://i-blog.csdnimg.cn/blog_migrate/4258f7ad235728107a3ccbc2286024a2.png)

解压这个 Zip 后，我们将得到 **5 个文件：**

**chat.html** 这个是你与 ChatGPT 的所有对话记录的 html 文件，可直接用浏览器打开

![](https://i-blog.csdnimg.cn/blog_migrate/a4572ba33a3398ccf89b3f112af29d2d.png)

**conversations.json** 这个也是你与 ChatGPT 的所有对话记录（这个 json 方便你使用程序处理）

![](https://i-blog.csdnimg.cn/blog_migrate/b94abe970dc49dfa390dfdd856a59350.png)

另外三个

**message\_feedback.json** 和 **model\_comparisons.json** 暂时不用管

**user.json** 里面存放的是你的用户信息

至此，你与 ChatGPT 的所有对话记录就导出完成了。OpenAI 虽然开放了导出对话记录，但我们可以看到，**导出的对话记录有时候太大了，再加上 ChatGPT 给出的 html 过于简陋不方便我们查看历史对话。而且我们跟 ChatGPT 聊了那么多，对话中的垃圾信息或多或少有一些，如何才能导出精华对话，指定我们想要的对话呢？**

### 3\. 使用 ChatGPT 对话管理工具，轻松管理对话记录

这里自荐下我写的**开源 ChatGPT 对话管理工具** —— **ChatGPT-Stacks**

[GitHub - zhouyangtingwen/ChatGPT-Stacks: Save the ChatGPT conversation on your computer 将ChatGPT对话永久保存在本地​github.com/zhouyangtingwen/ChatGPT-Stacks正在上传…重新上传取消](https://link.zhihu.com/?target=https%3A//github.com/zhouyangtingwen/ChatGPT-Stacks "GitHub - zhouyangtingwen/ChatGPT-Stacks: Save the ChatGPT conversation on your computer 将ChatGPT对话永久保存在本地​github.com/zhouyangtingwen/ChatGPT-Stacks正在上传…重新上传取消")

具体功能：

1. **将你导出的所有的对话内容拖入到 ChatGPT-Stacks 中，他可以对你的所有进行分组管理，分类你的重要对话信息**
2. **你可以选择任意对话再次进行图片导出 和 PDF 的导出，分享你的 ChatGPT 对话记录**
3. **内部封装了 ChatGPT 官网，支持对话实时保存**

ChatGPT-Stacks 使用 [sqlite3](https://so.csdn.net/so/search?q=sqlite3&spm=1001.2101.3001.7020) 在你本地存储你的所有 ChatGPT 对话记录

UI 漂亮、简单好用，还支持在删除指定某句对话，重命名对话、全局搜索对话内容、夜间模式等

![](https://i-blog.csdnimg.cn/blog_migrate/c2b7029aa56cc5a46e821797c5d8a255.png)

导出为图片：

![](https://i-blog.csdnimg.cn/blog_migrate/a4a2caaddca5ff09f0ba365149eae555.png)

导出为图片

导出为 PDF：

![](https://i-blog.csdnimg.cn/blog_migrate/228d9f6272b48e257ed066763b4501fd.png)

导出为 PDF

后面我打算再搞个导出对话记录到 **Notion、Obsidian。**

这个**开源 ChatGPT 对话管理工具** —— **ChatGPT-Stacks** 可以在我的 GitHub 上下载，支持 Windows 和 MacOS 两个大平台，如果这款工具帮到了你，请你帮我在 GitHub 上点一个 star ，感激不尽！