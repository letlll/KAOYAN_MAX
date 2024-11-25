## HTML5新特性

### 概述

HTML5 的新增特性主要是针对于以前的不足，增加了一些新的标签、新的表单和新的表单属性等。

### 语义化标签 （★★）

以前布局，我们基本用 div 来做。div 对于搜索引擎来说，是没有语义的

```
<div class=“header”> </div>
<div class=“nav”> </div>
<div class=“content”> </div>
<div class=“footer”> </div>
```

发展到了HTML5后，新增了一些语义化标签，这样的话更加有利于浏览器的搜索引擎搜索，也方便了网站的seo（Search Engine Optimization，搜索引擎优化），下面就是新增的一些语义化标签

- `<header>` 头部标签
- `<nav>` 导航标签
- `<article>` 内容标签
- `<section>` 定义文档某个区域
- `<aside>` 侧边栏标签
- `<footer>` 尾部标签

![](https://i-blog.csdnimg.cn/blog_migrate/a29b2f5faa9fb0cc65ff284dcac42c72.png)

### 多媒体标签

多媒体标签分为 音频 **audio** 和视频 **video** 两个标签 使用它们，我们可以很方便的在页面中嵌入音频和视频，而不再去使用落后的flash和其他浏览器插件了。

因为多媒体标签的 属性、方法、事件比较多，因此我们需要什么功能的时候，就需要去查找相关的文档进行学习使用。

![](https://i-blog.csdnimg.cn/blog_migrate/e3fbb4632370f719e51aa7115b751599.png)

#### 视频标签- video（★★★）

##### 基本使用

当前 元素支持三种视频格式： 尽量使用 **mp4格式**

**使用语法：**

```
 <video src="media/mi.mp4"></video>
```

![](https://i-blog.csdnimg.cn/blog_migrate/6caaa86551a0540987dd89741bf5bd7c.png)

##### 兼容写法

由于各个浏览器的支持情况不同，所以我们会有一种兼容性的写法，这种写法了解一下即可

```
<video  controls="controls"  width="300">
    <source src="move.ogg" type="video/ogg" >
    <source src="move.mp4" type="video/mp4" >
    您的浏览器暂不支持 <video> 标签播放视频
</ video >
```

**上面这种写法，浏览器会匹配video标签中的source，如果支持就播放，如果不支持往下匹配，直到没有匹配的格式，就提示文本**

##### video 常用属性

![](https://i-blog.csdnimg.cn/blog_migrate/36ab6e384834ba90eacff5a7689971bd.png)

**属性很多，有一些属性需要大家重点掌握：**

- `autoplay` 自动播放
- 注意： 在google浏览器上面，默认禁止了自动播放，如果想要自动播放的效果，需要设置 muted属性
- `width` 宽度
- `height` 高度
- `loop` 循环播放
- `src` 播放源
- `muted` 静音播放

**示例代码：**

```
<video src="media/mi.mp4" autoplay="autoplay" muted="muted"  loop="loop" poster="media/mi9.jpg"></video>
```

#### 音频标签- audio

##### 基本使用

当前 元素支持三种视频格式： 尽量使用 **mp3格式**

**使用语法：**

```
<audio src="media/music.mp3"></audio>
```

![](https://i-blog.csdnimg.cn/blog_migrate/74f4060a1d2db7770940621794e43016.png)

##### 兼容写法

由于各个浏览器的支持情况不同，所以我们会有一种兼容性的写法，这种写法了解一下即可

```
< audio controls="controls"  >
    <source src="happy.mp3" type="audio/mpeg" >
    <source src="happy.ogg" type="audio/ogg" >
    您的浏览器暂不支持 <audio> 标签。
</ audio>
```

**上面这种写法，浏览器会匹配audio标签中的source，如果支持就播放，如果不支持往下匹配，直到没有匹配的格式，就提示文本**

##### audio 常用属性

![](https://i-blog.csdnimg.cn/blog_migrate/b7ed23d0421f85144ac53ffa8b0732c1.png)

**示例代码：**

```
<audio src="media/music.mp3" autoplay="autoplay" controls="controls"></audio>
```

#### 小结

- 音频标签和视频标签使用方式基本一致
- 浏览器支持情况不同
- 谷歌浏览器把音频和视频自动播放禁止了
- 我们可以给视频标签添加 muted 属性来静音播放视频，音频不可以（可以通过JavaScript解决）
- 视频标签是重点，我们经常设置自动播放，不使用 controls 控件，循环和设置大小属性

### 新增的表单元素 （★★）

在H5中，帮我们新增加了很多类型的表单，这样方便了程序员的开发

**课堂案例：在这个案例中，熟练了新增表单的用法**

![](https://i-blog.csdnimg.cn/blog_migrate/25a47ef9d8db06c47e8639f5c6b28ac3.png)

**案例代码：**

```
<!-- 我们验证的时候必须添加form表单域 -->
<form action="">
    <ul>
        <li>邮箱: <input type="email" /></li>
        <li>网址: <input type="url" /></li>
        <li>日期: <input type="date" /></li>
        <li>时间: <input type="time" /></li>
        <li>数量: <input type="number" /></li>
        <li>手机号码: <input type="tel" /></li>
        <li>搜索: <input type="search" /></li>
        <li>颜色: <input type="color" /></li>
        <!-- 当我们点击提交按钮就可以验证表单了 -->
        <li> <input type="submit" value="提交"></li>
    </ul>
</form>
```

**常见输入类型**

```
text password radio checkbox button file hidden submit reset image
```

**新的输入类型**

![](https://i-blog.csdnimg.cn/blog_migrate/85327d4479b5034cb1d974e34af6c0e4.png)

类型很多，我们现阶段**重点记忆三个**： **`number` `tel` `search`**



- ![06-HTML5新增表单属性 - 01:26|450](assets/06-HTML5新增表单属性PT1M26.344S.webp) [01:26](https://www.bilibili.com/video/BV14J4114768/?p=280&t=86.343696#t=01:26.34) 


```html
    <style>

        input::placeholder {

            color: greenyellow;

        }

    </style>
    ```
    
   
```html
    <form action="">

            <input type="search" name="sear" id="" required="required" placeholder="letlmule" autofocus="autofocus" autocomplete="on">

            <input type="file" name="" id="" multiple="multiple">

            <input type="submit" value="提交">

    </form>

</body>
```

`autocomplete="on"` 自动补全

![](assets/屏幕截图%202024-11-23%20200354.png)

---