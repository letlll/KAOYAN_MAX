---
title: "算法-递归算法_什么是递归算法?递归算法的特点?-CSDN博客"
source: "https://blog.csdn.net/im_shuang/article/details/79390160?ops_request_misc=&request_id=&biz_id=102&utm_term=1.%20%E4%BB%80%E4%B9%88%E6%98%AF%E9%80%92%E5%BD%92%E7%AE%97%E6%B3%95%EF%BC%9F%E4%BB%80%E4%B9%88%E6%98%AF%E9%80%92%E5%BD%92%E5%87%BD%E6%95%B0%EF%BC%9F&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduweb~default-2-79390160.nonecase&spm=1018.2226.3001.4450"
author:
published:
created: 2024-11-10
description: "文章浏览阅读1.2k次，点赞2次，收藏3次。一.什么是递归算法？    递归算法是一种直接或者间接调用自身的算法的过程。二.递归的特点？   1.递归就是在过程或者函数里调用自身。   2. 在使用递归过程中必须有个明确的递归结束条件，成为递归出口   3.递归算法通常很简洁，但递归算法解题的运行效率较低，一般不提倡这种算法   4.在递归调用的过程中系统为每一层的返回点，局部量等开辟栈来存储。递归次数过多容易造成栈溢出等。所以一般不提倡用..._什么是递归算法?递归算法的特点?"
tags:
  - "clippings"
  - "递归算法"
---
###### 一.什么是[递归算法](https://so.csdn.net/so/search?q=%E9%80%92%E5%BD%92%E7%AE%97%E6%B3%95&spm=1001.2101.3001.7020)？

    递归算法是一种直接或者间接调用自身的算法的过程。

###### 二.递归的特点？

   1.递归就是在过程或者函数里调用自身。

   2. 在使用递归过程中必须有个明确的递归结束条件，成为递归出口

   3.递归算法通常很简洁，但递归算法解题的运行效率较低，一般不提倡这种算法

   4.在递归调用的过程中系统为每一层的返回点，局部量等开辟栈来存储。递归次数过多容易造成栈溢出等。所以一般不提倡用递归算法设计程序。

###### 三.递归的设计

  一个递归调用可以导致更多的递归调用，因为这个方法继续吧每个子问题分解成新的子问题，直到达到一个终止条件。当问题大道这个终止条件时候将结果返回给调用者。然后调用者进行计算并将结果返回给自己的调用者。这个过程持续，一级一级进行，直到结果传给原始的调用者为止。

1.递归的定义

　递归定义就是对问题分解，将一个问题分解为规模较小的问题并用相同的程序去解决。递归方法实际体现了“以此类推”“用同样的步骤重复”等思想，有点类似数学里的找规律推理出来的递推公式（函数）

2.递归的终止条件：跳出递推，返回最小问题的解

 得出最小问题的解，返回给调用者

经典例子：

1.递归求和 1+2+3+4+...+n

```
public static Integer recursionSum(Integer n){
   if(n>0){
      return n+recursionSum(n-1);
   }else{
      return 0;
   }
}
```

2.2.递归阶乘n! = n \* (n-1) \* (n-2) \* ...\* 1(n>0)

```
public static Integer recursionMulity(Integer n){
   if(n==1){
      return 1;
   }
   return n*recursionMulity(n-1);
}
```

3.河内塔问题

内塔问题

![](http://images.cnitblog.com/blog/202865/201302/21233227-fdbdf31ae5fe4ab7915f7b4352075ace.png)

```java
public int hanoiCount(int n, char x ,char y ,char z){int moveCount=0;if (n==0){return 0;     }else {         moveCount += hanoiCount(n-1,x,z,y);          moveCount += 1;          moveCount +=hanoiCount(n-1,z,y,x);     }return moveCount; }
```

## 4.斐波那契数列中的递归思想

假如动物中有一种特殊的种类，它出生2天后就开始以每天1只的速度繁殖后代。假设第1天，有1只这样的动物（该动物刚出生，从第3天开始繁殖后代）。那么到第11天，共有多少只呢？

```java
我们先来按一般顺序思考，先不要考虑第11天，先从第1天开始，看能不能找出规律：【第1天】只有1只动物【第2天】只有1只动物，还没有繁殖后代，总量为1【第3天】第1天的1只动物，繁殖1个后代，总量为2【第4天】第1天的1只动物又繁殖1只，其他还没繁殖，总量为3【第5天】第1天和第3天出生的动物又繁殖1个后代，其他没有繁殖，总量为5【第n天】..... 第1天 ------1 第2天 ------1 第3天 ------2 = 1 + 1 第4天 ------3 = 1 + 2 第5天 ------5 = 2 + 3  第6天 ------8 = 3 + 5 第7天 ------13 = 5 + 8
```

![](https://img-blog.csdn.net/20180227173704821?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvSW1fU2h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

```java
public long fibonacci(int day){if(day==0){ return 0;        }else if (day==1||day==2){return 1;        }else {return fibonacci(day-1)+fibonacci(day-2);         }    }public long fib(int day) {return day== 0 ? 0 : (day== 1 || day==2 ? 1 : fib(day - 1) + fib(day - 2));    }
```

5\. .判定一系列字符串中是否有相同的内容

```
public static boolean fun(int n,String[] a){
   boolean b = false;
   if(n == a.length){
      b = true;
   }else{
      for(int i = n; i < a.length-1; i++){
         System.out.println(n+"    "+(i+1));
         if(a[n].equals(a[i+1])){
            return false;
         }
      }
      n++;
      fun(n,a);
   }
   return b;
}
```