---
title: "HFUT - 算法导论复习 - 分支界限法(Branch and Bound Method)_fifo branch and bound algorithm-CSDN博客"
source: "https://blog.csdn.net/weixin_43174700/article/details/111999451"
author:
published:
created: 2024-11-11
description: "文章浏览阅读925次，点赞2次，收藏4次。简介有点类似于回溯法(backtracking)回溯法使用的是深度搜索分支界限法用的是广度搜索一般是用来解决最小化问题的但是显然当遇到最大化问题时,我们转化成最小化问题即可举例时间安排(Job Sequencing)Jobs = {J1,J2,J3.J4}FIFO 分支限界法 (队列式分支限界法)基本思想：按照队列先进先出 (FIFO) 原则选取下一个活结点为扩展结点。搜索策略：一开始，根结点是唯一的活结点，根结点入队。从活结点队中取出根结点后，作为当前扩展结点。对当前扩展结点，先_fifo branch and bound algorithm"
tags:
  - "clippings"
---
## 简介

有点类似于[回溯法](https://so.csdn.net/so/search?q=%E5%9B%9E%E6%BA%AF%E6%B3%95&spm=1001.2101.3001.7020)(backtracking)  
回溯法使用的是深度搜索  
分支界限法用的是广度搜索  
一般是用来解决最小化问题的  
但是显然当遇到最大化问题时,我们转化成最小化问题即可

## 举例

### 时间安排(Job Sequencing)

```
Jobs = {J1,J2,J3.J4}
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4625b7a486a7a6b1b6e16abd71d7e4ca.png#pic_center)

#### [FIFO](https://so.csdn.net/so/search?q=FIFO&spm=1001.2101.3001.7020) 分支限界法 (队列式分支限界法)

基本思想：按照**队列先进先出 (FIFO)** 原则选取下一个活结点为扩展结点。

搜索策略：一开始，根结点是唯一的活结点，根结点入队。从活结点队中取出根结点后，作为当前扩展结点。对当前扩展结点，先从左到右地产生它的所有儿子，用约束条件检查，把所有满足约束函数的儿子加入活结点队列中。再从活结点表中取出队首结点（队中最先进来的结点）为当前扩展结点，直到找到一个解或活结点队列为空为止。（广度优先）

```
以下用的不是队列,所以不是FIFO
以下使用的是栈 是 LLFO (last leaf first out)
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e73eb565cf2a6997e241db41dc9417c9.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/290a7a305db9eb4fbe5d0bb2aaf764df.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5fbea0a0c8eb1f64d2b0873f5fc97811.png#pic_center)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/adddeb66650c28dc052491efb6e51f87.png#pic_center)

#### LC (least cost) [分支限界法](https://so.csdn.net/so/search?q=%E5%88%86%E6%94%AF%E9%99%90%E7%95%8C%E6%B3%95&spm=1001.2101.3001.7020) (优先队列式分支限界法)

基本思想：**加速**搜索的进程，采用有效地方式**选择活结点**进行**扩展**  
按照**优先队列**中规定的**优先级**选取**优先级最高**的结点成为**当前扩展结点**。

搜索策略：  
对每一活结点计算一个优先级（某些信息的函数值），并根据这些优先级；  
从当前活结点表中优先选择一个优先级最高（最有利）的结点作为扩展结点，使搜索朝着解空间树上有最优解的分支推进，以便尽快地找出一个最优解。  
再从活结点表中下一个优先级别最高的结点为当前扩展结点，直到找到一个解或活结点队列为空为止

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/91d0d1c6d4a456516d89aa9dc476cd8e.png#pic_center)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/31c1bab6d8aaecc6295e81e1f82082ab.png#pic_center)

### 例 0/1 背包问题

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/80034231c9ba16001643ff507161c249.png)

如上所示的背包问题,显然我们希望利益能够最大化  
但是 分支界限法所求解的是最小化问题  
我们所需要做的转化就是,将每个物品的profit(利润)变成负的  
如此求的便是最小值;但是答案与利益最大化是一致的

1. 首先设置两个状态
- upper bound :  $u = \sum_{i=1}^{n} p_i w_i$  ​ (total weight < 15)
- $c = \sum_{i=1}^{n} p_i w_i$（可以拆分，考虑部分物品）​

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fff9a1048a19cdff779133b87578eefa.png)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/773773114109774588123dc66c9c301c.png)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f3a09d60962760a814ac7b9a0a80590e.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2edfe590f848ed0fc45357a3d71f1276.png)  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4250b4e1edffa17ed3e5e5dda85e49b6.png)

