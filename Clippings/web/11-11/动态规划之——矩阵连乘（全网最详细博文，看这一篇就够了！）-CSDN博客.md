---
title: "动态规划之——矩阵连乘（全网最详细博文，看这一篇就够了！）-CSDN博客"
source: "https://blog.csdn.net/qq_19782019/article/details/94356886?ops_request_misc=%257B%2522request%255Fid%2522%253A%25225DE97E9F-4AD8-448D-94A8-4583973CA4D1%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=5DE97E9F-4AD8-448D-94A8-4583973CA4D1&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-94356886-null-null.142^v100^pc_search_result_base4&utm_term=%E7%9F%A9%E9%98%B5%E8%BF%9E%E4%B9%98%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92&spm=1018.2226.3001.4187"
author:
published:
created: 2024-11-13
description: "文章浏览阅读7.4w次，点赞622次，收藏1.7k次。动态规划之矩阵连乘_矩阵连乘"
tags:
  - "clippings"
---
##                        动态规划之——[矩阵连乘](https://so.csdn.net/so/search?q=%E7%9F%A9%E9%98%B5%E8%BF%9E%E4%B9%98&spm=1001.2101.3001.7020)（全网最详细博文）

### 什么是矩阵

---

首先，要了解什么是[矩阵连乘问题](https://so.csdn.net/so/search?q=%E7%9F%A9%E9%98%B5%E8%BF%9E%E4%B9%98%E9%97%AE%E9%A2%98&spm=1001.2101.3001.7020)，当然得先了解什么是矩阵了，学过线性代数的同学应该都知道，所以这里就简单的介绍一下什么是矩阵：

在数学中，矩阵（[Matrix](https://baike.baidu.com/item/Matrix/3543921 "Matrix")）是一个按照长方阵列排列的[复数](https://baike.baidu.com/item/%E5%A4%8D%E6%95%B0/254365 "复数")或[实数](https://baike.baidu.com/item/%E5%AE%9E%E6%95%B0/296419 "实数")集合。例如：一个n\*m的矩阵A=\[a\[i,j\]\]就是像下面一样的一个有着n行m列的二维数组：

![](https://i-blog.csdnimg.cn/blog_migrate/411dfca58ac567fb0e484b3c99627575.png)

具体例子：下面就是一个普通的4x5的矩阵：

![](https://i-blog.csdnimg.cn/blog_migrate/c5dd0ea8f1228b43c9158ce00b147e12.png)

### 什么是矩阵连乘问题

---

首先，学过线性代数的同学知道，一个p\*q的矩阵A和一个q\*r的矩阵B的乘积是一个新的p\*r的矩阵C，计算公式如下：

![](https://i-blog.csdnimg.cn/blog_migrate/c163b9201d33a716a5e0088382edb17b.png)

其中1<=i<=p并且1<=j<=r。

具体是如何计算的，相信大家只要学了线性代数的基础，应该都能够解决，下面就举一个简单的例子：  
![](https://i-blog.csdnimg.cn/blog_migrate/cce39e8ac54c6a1b510a00aaeee7c729.png)

![](https://i-blog.csdnimg.cn/blog_migrate/820704815effc715acec3ea60e10816e.png)

矩阵A（3\*3）和矩阵B（3\*2）的乘积是一个新的3\*2的矩阵：

![](https://i-blog.csdnimg.cn/blog_migrate/e92507bf873329bfd5e7bdf1a5527dc8.png)

### 矩阵连乘的特点

---

- 如果存在两个矩阵A和B，如果AB能够计算乘积，则BA不一定能够计算乘积。

例如：A=3\*2， B=2\*4，则按照AB的乘积计算顺序能够计算（A的列数2等于B的行数2），但按照BA的乘积计算顺序却不能够计算（B的列数4不等于A的行数3）。

- 即使存在两个矩阵A和B，满足AB能够相乘，BA也能够相乘，但最后得出来的矩阵却很有可能是不一样的。
- 矩阵连乘可以被递归成如下形式：

![](https://i-blog.csdnimg.cn/blog_migrate/caffe57d4cbe0aaf116efbc8b8386bbb.png)

- 矩阵连乘无论按照什么样的乘积顺序，最后计算出来的矩阵虽然“样子”不一样，但是计算出来的值却无论如何都是一样的。

### 矩阵连乘复杂度分析

---

假设有一个p\*q的矩阵A和q\*r的矩阵B，则他们的乘积矩阵C=AB按照如下方式计算：

![](https://i-blog.csdnimg.cn/blog_migrate/4ce14d4756edb62db3fbae5a474a2635.png)

我们发现，矩阵C的规模应该为【p\*r】，则矩阵C应该一共有【p\*r】个实体并且每个实体需要【q】次的计算才能够算出来，因此，为了计算矩阵C的值，我们一共需要执行【p\*q\*r】这么多次计算。

因此，我们可以近似的认为矩阵连乘的复杂度就是矩阵连乘所需要的总次数，即O(p\*q\*r)。

### 矩阵连乘的计算次数与计算顺序的关系

---

假设有一个p\*q规模的矩阵A，一个q\*r规模的矩阵B，并且我们现在再加上一个规模为r\*s的矩阵C，那么这三个矩阵的乘积ABC有两种计算顺序：

- （AB）C
- A（BC）

那么，肯定有同学要问了，这两种计算顺序有什么不同吗？无论采用哪种计算顺序他们的结果肯定都是一样的啊！那我们为什么要纠结它们的计算顺序呢？不是多此一举吗？

那就让我们来“探索”一下，这两种计算顺序有什么不同吧：

对于第一种计算顺序来说，总共需要的计算次数为：

因为AB共需要计算【p\*q\*r】次，并且生成一个规模为【p\*r】的中间矩阵，这个中间矩阵再与矩阵C相乘，又需要计算【p\*r\*s】次，并且生成一个规模为【p\*s】的矩阵，这个矩阵也就是最后的结果，因此，按照第一种顺序计算，一共需要的计算次数如下：

![](https://i-blog.csdnimg.cn/blog_migrate/d882a1cd24c42f1d836b968ab053e20c.png)

同理，按照第二种计算顺序，我们一共需要计算下面这么多次：

![](https://i-blog.csdnimg.cn/blog_migrate/8971dd0efb0f71d6ba6d1983b9bc553f.png)

此时同学们注意了！！！好像两种计算顺序分别所需要的计算次数竟然是不一样的！！！那么，让我们把真实数据带入，来看一看差距有多大吧：

假设p=5,q=4,r=6并且s=2，则：

![](https://i-blog.csdnimg.cn/blog_migrate/bc16ba2585fd785cd462051714a9556f.png)

大的不同！按照第一种计算顺序，我们需要计算180次，而按照第二种计算顺序，我们只需要计算88次就够了！！！但是这两种顺序计算出来的矩阵的值却始终是一样的，真是太神奇了，计算顺序竟然能够影响所需要的计算次数，因此，对于矩阵连乘来说，计算顺序是非常重要的！

### 矩阵连乘问题

---
#### 问题描述;
> 
> 给你一系列的矩阵A1,A2,A3,......,An和一系列的整数P0,P1,P2......,Pn，每个矩阵 Ai 的规模为Pi-1 \* Pi。
> 
> 现在，请你计算这些矩阵连乘所需要的最少的计算次数是多少？

针对这道题目，其实我们可以很清晰的认识到，需要找出最少的计算次数，就是需要我们找到“正确”的计算顺序！

此时肯定有同学会想到，我们可以使用暴力破解啊！循环算出所有可能的计算顺序的计算次数，然后取最小计算次数的那一个，就是我们需要的结果，例如，求A1A2A3A4，我们可以暴力循环出下面4种计算顺序来：

![](https://i-blog.csdnimg.cn/blog_migrate/15ccaba2c3a90f7fc1c1e1572faccab2.png)

虽然这种方法确实也能够计算出最少计算次数，但是，我们知道暴力循环的复杂度是非常高的，如果我们需要计算的矩阵序列不止4个矩阵，而是很长的一串矩阵序列，那么将会非常的耗时，我们有这个时间计算最少计算次数，还不如随便找一个计算顺序直接算得了。暴力搜索的时间复杂度如下：

![](https://i-blog.csdnimg.cn/blog_migrate/fdb670b1d9dfb60c3ade43a521f927d8.png)

难道，我们就只能用暴力算法了吗？当然不是，接下来就是我们的重头戏：DP（动态规划）了。

###   使用动态规划算法解决矩阵连乘

---

1. 找出最优子结构，在本问题中，即找出如何划分“括号”的方法。

首先，让我们把复杂的问题分解成子问题，对于每一对的 i 和 j ，都有1<=i<=j<=n，此时，我们只要确定了对于Ai..j=AiAi+1...Aj的乘积顺序，即如何“划分括号”，就决定了这一次乘积所需要的总计算次数。所以，我们只要找到一个乘积所需计算次数最小的计算顺序（打括号方式），就是我们的最优子结构。

特别的是，我们应该注意到，Ai...j的最后乘积结果是一个规模为【Pi-1\*Pj】大小的矩阵。

我们前面讲了这么多，要想找到最少的计算次数，那么就必须要找到相对应的计算顺序，可是，计算顺序是一个抽象的东西，那么在我们这个问题里，计算顺序的具体体现是什么呢？

让我们这样来想，无论我们以一个什么样的乘法顺序来计算，最后一步都是一样的，即把最后生成的两个中间矩阵Ai...k和Ak+1...j相乘，其中k可以是在合法范围内的任意一个值：

![](https://i-blog.csdnimg.cn/blog_migrate/e0ce05530a248f72a6e95cf1248c8a36.png)

让我们来举个例子：

![](https://i-blog.csdnimg.cn/blog_migrate/737e3d68add59a2eb7da2a2a406cf182.png)

此时，K=5,即应用该种计算顺序时，最后一步的乘积状态为A3...5\*A6...6。

因此，决定最优乘积计算顺序的问题就可以分解为下面两个子问题：

- 我们应该在乘积序列中的哪一个地方使用大括号把该序列分成两个子序列呢？（即K的值到底应该设为多少？可以暴力列举出所有合法的K值）
- 对于分割出来的两个子乘积序列Ai...k和Ak+1..j，我们又该如何对他们再进行一步划分呢？

> #### 此时问题的“最优子结构”就已经出现了，为了保证Ai...k\*Ak+1...j是最优的计算顺序，则Ai...k和AK+1...j也应该是由“最优计算顺序”计算出来的，因此，我们就可以递归的调用这个过程。
> 
> #### 假设Ai...k的计算顺序并不是最优的，那么我们可以用更好的计算顺序去替换，这样就产生了悖论。
> 
> #### 同样的，如果Ak+1...j并不是最优的，那么我们可以在找出另外一个更好的计算顺序来替换他，此时也产生了悖论。

2.找出最优子结构的递推式。

就像我们早期讲过的“0-1背包问题”一样，我们将会把“子问题”的解决方法储存到一个数组里头。

对于：![](https://i-blog.csdnimg.cn/blog_migrate/bdfb2d98043d55af3ebdddda46d2e1c8.png)

我们定义：![](https://i-blog.csdnimg.cn/blog_migrate/ea79cd154f683a543004d410ef172fa8.png)的值为计算Ai...j所需要要的最少的计算次数，因此，这个最少计算次数的问题可以用下面的递归式来描述：

![](https://i-blog.csdnimg.cn/blog_migrate/bd95ce9dbd87a90294d6e727981328fb.png)

#### 证明：

对于Ai..j的任何一个计算顺序，我们都可以把它拆分成下面两个计算步骤：

![](https://i-blog.csdnimg.cn/blog_migrate/8e87771b9ab470addca4411f3883cdb5.png)

此时的关键点就是这个K的值，即应该在哪一个地方利用“括号”把序列划分成两个子序列。

如果![](https://i-blog.csdnimg.cn/blog_migrate/36fd405c2d3638cdc71c5a916cb42312.png)和![](https://i-blog.csdnimg.cn/blog_migrate/b00fc492d1e75d43eb43dba3cc206683.png)都是使用最优序列计算的，则此时：

m\[i,j\]的值即![](https://i-blog.csdnimg.cn/blog_migrate/73ca79b5ce82e7a6959dbc16310b648c.png)的最少乘积次数的计算公式为：

![](https://i-blog.csdnimg.cn/blog_migrate/14e9829879e481dbe15e6f7f01a287e3.png)

此时有些同学可能会疑惑，为什么最后还要加上1个![](https://i-blog.csdnimg.cn/blog_migrate/3f51552eaa3eb34a56c7838b92793061.png)

因为根据我们前面的定义，Ai...k的乘积结果为一个规模为Pi-1\*Pk的矩阵，而Ak+1....Aj的乘积结果为一个规模为Pk\*Pj的矩阵，所以，求Ai...j的最少乘积次数则为【Ai...k所需要的最少乘积次数】+【Ai+1...j所需要的最少乘积次数】+【中间生成的两个临时矩阵所需要的乘积次数】。

此时看似问题已经明朗了，但是！我们却并不能够确定K的值到底是多少？因为K的值不同，会造成序列的划分也不同，因此乘积次数也会不同，因此，我们只要找到某个K值，使得m\[i,j\]的值算出来是最小的，那么，我们的问题就迎刃而解了。

但是问题就是，咱们压根就不知道K值取啥啊？

不用急，既然咱们不知道K是啥，那就一个一个把K的可能值都代进去试一遍不就行了吗？而且K的可能值也只有j-i种，因此我们就把这j-i都一个个的去试一遍，然后找出m\[i,j\]最小的那一个情况，此时的K值就是我们需要的，并且最小乘积次数也找到了，就是m\[i,j\]次。

因此，让我们再来看一看这个递推公式：

![](https://i-blog.csdnimg.cn/blog_migrate/c4903cd2a990dc7616a7922f6c34c32b.png)

### 使用“自底向上”方式计算最优值

---

首先，让我们来回忆一下有关于二维数组m\[i,j\]的定义，m\[i,j\]的值为计算Ai...j所需要要的最少的计算次数。

因此，我们的二维表为m\[1..n,1..n\]，并且有i<=j。

现在最关键的是：

当我们使用下面的等式：

![](https://i-blog.csdnimg.cn/blog_migrate/01f35ccc4eff91f4068a0a91262dcf46.png)

来计算m\[i,j\]时，我们必须首先得把![](https://i-blog.csdnimg.cn/blog_migrate/072488c9574a6d13e4075eeac369bb13.png)和![](https://i-blog.csdnimg.cn/blog_migrate/fd4ebb5aca5af56e1fbf1ea20afb5381.png)

给计算出来，才能够顺利的把![](https://i-blog.csdnimg.cn/blog_migrate/198518b6385149b57e24523b9c93505c.png)给计算出来。

对于被分割的两个子序列，对应的矩阵链的长度都小于![](https://i-blog.csdnimg.cn/blog_migrate/c280b427b2ad4ea041d83fab204130a3.png)

因此，我们的算法以矩阵链长度增长的顺序来计算，就像下面这样子（假设我们需要计算m\[1,n\]）：

![](https://i-blog.csdnimg.cn/blog_migrate/9653887571d0244d11d32a52e5fa730e.png)

### 使用“动态规划”的注意事项

---

当我们设计一个动态规划算法时，我们需要注意下面两点：

1. 找到一个适当的最优子结构和在“表”中对应的循环关系，例如我们现在讨论的这个问题：

![](https://i-blog.csdnimg.cn/blog_migrate/fde10449aaac205fa04049e882d48d8e.png)

     2.          找到“表”中各“元素”之间的某种关系。

例如，当我们需要计算表中某个位置的值时，我们要想一想，这个值是不是依赖了其他的值？是不是得先计算出其他的某个或几个值才能够计算出这个值来？

在我们现在这个例子中就是：

我们需要计算![](https://i-blog.csdnimg.cn/blog_migrate/682a8b2227b0bb56bf9d8896e630cad4.png)的值，但是计算这个值之前，我们必须得先计算：

![](https://i-blog.csdnimg.cn/blog_migrate/5f63f34bd10b367a69800b1bce88a6fc.png)和![](https://i-blog.csdnimg.cn/blog_migrate/dcbdb5ac55bbec21cd9c7c0d779c07bc.png)两个元素的值。

### 样例解析

---

> #### 假设我们现在有4个矩阵A1,A2,A3,A4组成的一个矩阵链,并且各矩阵的规模用数组P\[ \]表示，P0=5,P1=4,P2=6,P3=2,P4=7。
> 
> #### 现在，需要你计算矩阵A1A2A3A4乘积所需要的最少的乘法次数，即求出m\[1,4\]的值。
> 
> #### 

解决方法：

1.使用动态规划算法解决，首先初始化数组m\[i,j\]，为了便于同学们较为直观的观察数据的推导过程，数组m\[i,j\]我们不按照正常“表格”的方式展示，而是按照下面的“画法”来展示：

![](https://i-blog.csdnimg.cn/blog_migrate/fee0fbd2ea792c1233d93f18aaead1e1.png)

正如图中的标识一样，初始化时m\[1,1\],m\[2,2\],m\[3,3\],m\[4,4\]的值都为0，因为1个矩阵无法进行乘法运算，因此所需的计算次数当然为0了。

### 计算步骤一

---

首先，计算m\[1,2\]，即A1A2所需要的最少计算次数：

根据递推式有：

![](https://i-blog.csdnimg.cn/blog_migrate/26d267c93532617cb31be14a3d7e2e3c.png)

此时，K的取值范围只有1个合法值，即K=1。此时，A1A2的最少计算此时就是120次了，如下图所示：

![](https://i-blog.csdnimg.cn/blog_migrate/e68a47f177e5e795563e6378a8566221.png)

### 计算步骤二

---

根据定义，计算m\[2,3\]的值，根据递推式有：

![](https://i-blog.csdnimg.cn/blog_migrate/21be5e77bbe2ebfc8fe8c8a212b55ae1.png)

此时，K的合法值也只有1个，即K=2,此时计算出来的值48就是A2A3所需要的最少计算次数啦！

![](https://i-blog.csdnimg.cn/blog_migrate/1bae9c56e11f1423a54f439e942f18de.png)

### 计算步骤三

---

计算m\[3,4\]的值，根据递推式有：

![](https://i-blog.csdnimg.cn/blog_migrate/bf0b80d1498b7f24091c060664bcdb7a.png)

此时，K的合法值仍然只有1个，即K=3,此时计算出来的最小值为84。

![](https://i-blog.csdnimg.cn/blog_migrate/a3c1aaf186bcb7ee989514f8c90a74fb.png)

### 计算步骤四

---

计算m\[1,3\]的值，根据定义的递推式有：

![](https://i-blog.csdnimg.cn/blog_migrate/f721dc359e25df466bd2014e7ea2b805.png)

此时，K的合法值就有2个了，分别是1和2，也分别代表了两种“切割”序列的方法。通过找出这两种方法的最小值，即是此时最优的解啦！其实和上面的计算是一样的，只不过多了需要比较的一个情况而已。此时，我们的二维数组m如下图所示：

![](https://i-blog.csdnimg.cn/blog_migrate/fb03a0e30bc0ad16e134e4e1082df910.png)

### 计算步骤五

---

计算m\[2,4\]的值，根据定义有：

![](https://i-blog.csdnimg.cn/blog_migrate/a0a3d78c9c2b51543bdbd1c829a4e477.png)

此时，K的合法值也有2个，也代表了A2..A4的两种“切割”方法。这两种“切割”方法所需要的计算次数的最小值为104，则这种方法是最优解，值也是最优值，即104。

![](https://i-blog.csdnimg.cn/blog_migrate/5a6306baac7ca65ce2f35c7b2a8621f7.png)

### 计算步骤六

---

计算m\[1,4\]的值，根据递推式有：

![](https://i-blog.csdnimg.cn/blog_migrate/48ac1bf8a59afecf8d19f51edc070ad5.png)

此时，K的合法值存在3种情况，分别为K=1,K=2,K=3，代表了3种“切割”方法,分别如下所示：

> - **A1（A2A3A4）**
> - **（A1A2）（A3A4）**
> - **（A1A2A3）A4**

按照老样子，我们计算出m\[1,4\]的值为：158，即计算A1A2A3A4所需要的最少乘法次数为158次！

![](https://i-blog.csdnimg.cn/blog_migrate/655d793e8ac1e31db4ff486683bf0a98.png)

---
