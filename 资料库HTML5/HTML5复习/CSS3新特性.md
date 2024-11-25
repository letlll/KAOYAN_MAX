## CSS3新特性

### CSS3 的现状

- 新增的CSS3特性有兼容性问题，ie9+才支持
- 移动端支持优于 PC 端
- 不断改进中
- 应用相对广泛
- 现阶段主要学习：新增选择器和盒子模型以及其他特性

### CSS3 新增选择器

CSS3 给我们新增了选择器，可以更加便捷，更加自由的选择目标元素。

- 属性选择器
- 结构伪类选择器
- 伪元素选择器

#### 属性选择器（★★）

属性选择器，按照字面意思，都是根据标签中的属性来选择元素

![](https://i-blog.csdnimg.cn/blog_migrate/1a77cc2a4eb8c29320ca1a88500f7c55.png)

**示例代码：**

```css
 /* 只选择 type =text 文本框的input 选取出来 */
input[type=text] {color: pink;}
/* 选择首先是div 然后 具有class属性 并且属性值 必须是 icon开头的这些元素 */
div[class^=icon] {color: red;}
/* 选择首先是section 然后 具有class属性 并且属性值 必须是 data结尾的这些元素 */
section[class$=data] {color: blue;}
```

- 属性选择器，按照字面意思，都是根据标签中的属性来选择元素
- 属性选择器可以根据元素特定属性的来选择元素。 这样就可以不用借助于类或者id选择器
- 属性选择器也可以选择出来自定义的属性
- \*\*注意：\*\*类选择器、属性选择器、伪类选择器，**权重为 10**。
>[!question] 
>对于 css 中的权重应该如何去区分和理解以及记忆呢？
#### 结构伪类选择器

结构伪类选择器主要根据文档结构来选择器元素， 常用于根据**父级选择器**里面的**子元素**

![](https://i-blog.csdnimg.cn/blog_migrate/6428f3e44c6f3013d5f0a2515dde9679.png)

##### E:first-child

匹配父元素的第一个子元素E，结构伪类选择器

```
<style>
    ul li:first-child {
        background-color: red;
    }
</style>
<ul>
    <li>列表项一</li>
    <li>列表项二</li>
    <li>列表项三</li>
    <li>列表项四</li>
</ul>
```

![](https://i-blog.csdnimg.cn/blog_migrate/06ba14ab5b8fd1e0cd31a22fafe1eeae.png)

**E:last-child** 则是选择到了最后一个li标签

##### E:nth-child(n)（★★★）

匹配到父元素的**第n个**元素

- 匹配到父元素的**第2个**子元素

`ul li:nth-child(2){}`
- 匹配到父元素的序号为奇数的子元素

`ul li:nth-child(odd){}` **odd** 是关键字 奇数的意思（3个字母 ）
- 匹配到父元素的序号为偶数的子元素

1. `ul li:nth-child(even){}` **even**（4个字母 ）
2. `ul li:nth-child(2n){}` 

- **匹配到父元素的前3个子元素**

`ul li:nth-child(-n+3){}`

选择器中的 **n** 是怎么变化的呢？

因为 n是从 0 ，1，2，3… 一直递增

所以 -n+3 就变成了

- n=0 时 -0+3=3
- n=1时 -1+3=2
- n=2时 -2+3=1
- n=3时 -3+3=0
- …
**一些常用的公式： 公式不是死的，在这里列举出来让大家能够找寻到这个模式，能够理解代码，这样才能写出满足自己功能需求的代码**

![](https://i-blog.csdnimg.cn/blog_migrate/0ec80da642ee56a54902bc08f80cace4.png)

**常用的结构伪类选择器是：** `nth-child(n) {...}`

##### E:nth-child 与 E:nth-of-type 的区别

这里只讲明 **E:nth-child(n)** 和 **E:nth-of-type(n)** 的区别 剩下的 **E:first-of-type** **E:last-of-type** **E:nth-last-of-type(n)** 同理做推导即可

```
<style>
    ul li:nth-child(2) {
        /* 字体变成红色 */
        color: red;
    }

    ul li:nth-of-type(2) {
        /* 背景变成绿色 */
        background-color: green;
    }
</style>
<ul>
    <li>列表项一</li>
    <p>乱来的p标签</p>
    <li>列表项二</li>
    <li>列表项三</li>
    <li>列表项四</li>
</ul>
```

![](https://i-blog.csdnimg.cn/blog_migrate/0af464744e6acce67101ea20be1f4192.png)

也就是说：

- `E:nth-child(n)` 匹配父元素的第n个子元素E，也就是说，nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第n个孩子，然后看看是否和E匹配
- `E:nth-of-type(n)` 匹配同类型中的第n个同级兄弟元素E，也就是说，对父元素里面指定子元素进行排序选择。 先去匹配E ，然后再根据E 找第n个孩子

##### 小结

- 结构伪类选择器一般用于选择父级里面的第几个孩子
- nth-child 对父元素里面所有孩子排序选择（序号是固定的） 先找到第n个孩子，然后看看是否和E匹配
- nth-of-type 对父元素里面指定子元素进行排序选择。 先去匹配E ，然后再根据E 找第n个孩子
- 关于 nth-child（n） 我们要知道 n 是从 0 开始计算的，要记住常用的公式
- 如果是无序列表，我们肯定用 nth-child 更多
- 类选择器、属性选择器、伪类选择器，权重为 10

#### 伪元素选择器（★★★）

伪元素选择器可以帮助我们利用CSS创建新标签元素，而不需要HTML标签，从而简化HTML结构

![](https://i-blog.csdnimg.cn/blog_migrate/fb80b3a3b2bb8f64231c68cb826a36b8.png)

**示例demo**

```
<style>
    div {
        width: 200px;
        height: 200px;
        background-color: pink;
    }

    /* div::before 权重是2 */
    div::before {
        /* 这个content是必须要写的 */
        content: '我';
    }

    div::after {
        content: '小猪佩奇';
    }
</style>

<body>
    <div> 是 </div>
</body>
```

注意：

- before 和 after 创建一个元素，但是属于行内元素
- 新创建的这个元素在文档树中是找不到的，所以我们称为伪元素
- 语法： element::before {}
- before 和 after 必须有 content 属性
- before 在父元素内容的前面创建元素，after 在父元素内容的后面插入元素  
伪元素选择器和标签选择器一样，权重为 1

##### 应用场景一： 字体图标

在实际工作中，字体图标基本上都是用伪元素来实现的，好处在于我们不需要在结构中额外去定义字体图标的标签，通过content属性来设置字体图标的 编码

**步骤：**

- 结构中定义div盒子
- 在style中先申明字体 @font-face
- 在style中定义after伪元素 div::after{…}
- 在after伪元素中 设置content属性，属性的值就是字体编码
- 在after伪元素中 设置font-family的属性
- 利用定位的方式，让伪元素定位到相应的位置；记住定位口诀：子绝父相

...

##### 应用场景二： 仿土豆效果

把之前的代码进行了改善

**步骤：**

- 找到之前写过的仿土豆的结构和样式，拷贝到自己的页面中
- 删除之前的mask遮罩
- 在style中，给大的div盒子（类名叫tudou的），设置 before伪元素
- 这个伪元素充当的是遮罩的角色，所以我们不用设置内容，但是需要设置content属性，属性的值为空字符串
- 给这个遮罩设置宽高，背景颜色，默认是隐藏的
- 当鼠标移入到 div盒子时候，让遮罩显示，利用 hover 来实现

Document

##### 应用场景三： 清除浮动

回忆一下清除浮动的方式：

- 额外标签法也称为隔墙法，是 W3C 推荐的做法。
- 父级添加 overflow 属性
- 父级添加after伪元素
- 父级添加双伪元素

**额外标签法**也称为隔墙法，是 W3C 推荐的做法

![](https://i-blog.csdnimg.cn/blog_migrate/8017180aa3b88a9013d2767f8b6a10f7.png)

**注意：** 要求这个新的空标签必须是块级元素

后面两种伪元素清除浮动算是第一种额外标签法的一个**升级**和**优化**

![](https://i-blog.csdnimg.cn/blog_migrate/fb50f475e02c7d6576b288247d637e88.png)

![](https://i-blog.csdnimg.cn/blog_migrate/386b48eae56aa3c4771f7a0d7af9f701.png)

### 盒子模型（★★★）

CSS3 中可以通过 box-sizing 来指定盒模型，有2个值：即可指定为 content-box、border-box，这样我们计算盒子大小的方式就发生了改变

可以分成两种情况：

- box-sizing: content-box 盒子大小为 width + padding + border （以前默认的）
- box-sizing: border-box 盒子大小为 width

如果盒子模型我们改为了box-sizing: border-box ， 那padding和border就不会撑大盒子了（前提padding和border不会超过width宽度）

### 其他特性（★）

#### 图标变模糊 – CSS3滤镜filter

filter CSS属性将模糊或颜色偏移等图形效果应用于元素

语法：

```
filter:   函数(); -->  例如： filter: blur(5px);  -->  blur模糊处理  数值越大越模糊
```

![](https://i-blog.csdnimg.cn/blog_migrate/647d7c20f13d7b56834d4fe7568bfb4b.png)

#### 计算盒子宽度 – calc 函数

calc() 此CSS函数让你在声明CSS属性值时执行一些计算

语法：

```
width: calc(100% - 80px);
```

括号里面可以使用 + - \* / 来进行计算

### CSS3 过渡（★★★）

过渡（transition)是CSS3中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。

**过渡动画：** 是从一个状态 渐渐的过渡到另外一个状态

可以让我们页面更好看，更动感十足，虽然 低版本浏览器不支持（ie9以下版本） 但是不会影响页面布局。

我们现在经常和 :hover 一起 搭配使用。

语法：

```
transition: 要过渡的属性  花费时间  运动曲线  何时开始;
```

- 属性 ： 想要变化的 css 属性， 宽度高度 背景颜色 内外边距都可以 。如果想要所有的属性都变化过渡， 写一个all 就可以
- 花费时间： 单位是 秒（必须写单位） 比如 0.5s
- 运动曲线： 默认是 ease （可以省略）
- 何时开始：单位是 秒（必须写单位）可以设置延迟触发时间 默认是 0s （可以省略）
- **后面两个属性可以省略**
- **记住过渡的使用口诀： 谁做过渡给谁加**

![](https://i-blog.csdnimg.cn/blog_migrate/12335574c2df0955c6008e20f2b05033.png)

##### 过渡练习

![](https://i-blog.csdnimg.cn/blog_migrate/f41cf0270e2f5cb05d7c34b94bad9721.png)

步骤：

- 创建两个div的盒子，属于的嵌套关系，外层类名叫 bar，里层类名叫 bar\_in
- 给外层的bar 这个盒子设置边框，宽高，圆角边框
- 给里层的bar\_in 设置 初试的宽度，背景颜色，过渡效果
- 给外层的 bar 添加 hover事件，当触发了hover事件 让里层的bar\_in 来进行宽度的变化

代码：

```
<style>
        .bar {
            width: 150px;
            height: 15px;
            border: 1px solid red;
            border-radius: 7px;
            padding: 1px;
        }

        .bar_in {
            width: 50%;
            height: 100%;
            background-color: red;
            /* 谁做过渡给谁加 */
            transition: all .7s;
        }

        .bar:hover .bar_in {
            width: 100%;
        }
</style>
<body>
    <div class="bar">
        <div class="bar_in"></div>
    </div>
</body>
```