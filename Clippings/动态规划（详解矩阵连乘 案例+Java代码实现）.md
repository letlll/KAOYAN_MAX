---
title: "动态规划（详解矩阵连乘 案例+Java代码实现）"
source: "https://juejin.cn/post/6999106306653028388"
author:
  - "[[ruochen]]"
published: 2021-08-22
created: 2024-11-14
description: "动态规划 算法总体思想 与分治算法类似 子问题往往不是互相独立的, （分治会重复计算） 保存已解决的子问题的答案，需要时找出即可（空间换时间） 基本步骤 找出最优解的性质并刻划其结构特征 递归地定义最"
tags:
  - "clippings"
---
> **这是我参与8月更文挑战的第22天，活动详情查看：[8月更文挑战](https://juejin.cn/post/6987962113788493831 "https://juejin.cn/post/6987962113788493831")**

## 动态规划

> History does not occur again

## 算法总体思想

- 与分治算法类似
- 子问题往往不是互相独立的, （分治会重复计算）
- 保存已解决的子问题的答案，需要时找出即可（空间换时间）

## 基本步骤

- **找出最优解的性质并刻划其结构特征**
- 递归地定义最优值
- 以自底向上的方式计算出最优值（递推）
- 根据计算最优值时得到的信息构造最优解

## 矩阵连乘问题

### 问题描述

- 给定n个矩阵{A<sub>1</sub>, A<sub>2</sub>,..., A<sub>n</sub>}, 其中A<sub>i</sub> 与 A<sub>i+1</sub> 是可乘的, i = 1, 2, ..., n-1
- 如何确定连乘积的计算次序，使得依次次序计算矩阵连乘积所需要的数乘次数最少

### 分析

- 矩阵乘法满足结合律 ->矩阵乘法可以有不同的计算次序
- 矩阵连乘的计算次序可以用加括号的方式来确定 ->若矩阵连乘已完全加括号，则其计算次序完全确定
- 完全加括号的矩阵连乘可递归定义为：

1. 单个矩阵是完全加括号的；
2. 矩阵连乘积A是完全加括号的，则A可表示为2个完全加 括号的矩阵连乘积B和C的乘积并加括号，即 A=(BC)。

> 例，有四个矩阵A,B,C,D，它们的维数分别是： A=50×10，B=10×40, C=40×30, D=30×5 连乘积ABCD共有五种完全加括号的方式

> (A((BC)D)) 16000      (A(B(CD))) 10500 ((AB)(CD)) 36000      (((AB)C)D) 87500 ((A(BC))D) 34500

### 解决方法

- **穷举法**：列举出所有可能的计算次序，并计算出每一种计算次序相应需要的数乘次数，从中找到一种数乘次数最少的计算次序。

- **复杂性分析**： 用p(n)表示n个矩阵链乘的穷举法计算成本，如果将n个矩阵从第k和k+1出隔开，对两个子序列再分别加扩号，则可以得到下面递归式：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94853e3fd8624b889ab77c0e6d7399fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

很明显，指数级增长，此方法不太可行
- 动态规划

- 将矩阵连乘积A<sub>i</sub>A<sub>i+1</sub>…A<sub>j</sub>简记为A\[i:j\] ，这里i≤j。考察计算A\[i:j\]的最优计算次序。设这个计算次序在矩阵A<sub>k</sub>和 A<sub>k+1</sub>之间将矩阵链断开，i≤k<j，则其相应完全加括号方式为(A<sub>i</sub>A<sub>i+1</sub>…A<sub>k</sub>)(A<sub>k+1</sub>A<sub>k+2</sub>…A<sub>j</sub>) -> **A\[i:j\]的计算量**：A\[i:k\]的计算量加上A\[k+1:j\]的计算量，再加上A\[i:k\]和A\[k+1:j\]相乘的计算量

### 具体步骤

- 分析最优解的结构

- 特征：计算A\[i:j\]的最优次序所包含的计算矩阵子链A\[i:k\]和A\[k+1:j\]的次序也是最优的

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b13b9fa2c1374aa39c0bbf81f23e1d40~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
- 建立递归关系

- 设计算A\[i:j\]，1≤i≤j≤n，所需要的最少数乘次数m\[i,j\]，则原问题的最优值为m\[1,n\]

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e7902eeb1c4e479f8a9b119fd8faf8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> k为断开位置
> 
> m\[i\]\[j\]实际是子问题最优解的解值，保存下来避免重复计算

- 在递归计算时，**许多子问题被重复计算多次**。这也是该问题可用动态规划算法求解的又一显著特征
- 计算最优值

- 根据递归公式，对角线的值为0。其他值需要根据于断开位置k的值来得到，k $\in$ \[i,j)，我们要遍历所有k，就要访问所求值的所有同一行左边的值和同一列下方的值。因此，在代码中我们可以使用自底向上、从左到右的计算顺序来依次填充，最终得到右上角的值。
- 构造最优解

- 前面我们已经讲数据记录在了数组中，直接查表即可构造最优解

### 案例

- 求矩阵链A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>的最优运算次序。其中矩阵A<sub>i</sub>的大小为p<sub>i-1</sub>×p<sub>i</sub>。其中P(0) = 5，P(1) = 7，P(2) = 4，P(3) = 3，P(4) = 5

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff0f7436fcf44ab0a69ef44045c0fa62~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### Java代码实现

```java
package MatrixChain;

public class Array {
	
	/**
	 * 求解最优值
	 * @param p: 矩阵维数信息数组
	 * @param m: 存放最优值数组, 上三角形式
	 * @param s: 存放分割位置下标的数组
	 * @return 返回最优值
	 **/
	public static int matrixChain(int[] p, int[][] m, int[][] s) {
		int n = p.length - 1;
		for (int i = 1; i <= n; i++)
			// 本身为0
			m[i][i] = 0;  // 初始化二维数组
		for (int r = 2; r <= n; r++) {
			for (int i = 1; i <= n - r + 1; i++) { 
				int j = i + r - 1;
				// 先以i进行划分
				m[i][j] = m[i + 1][j] + p[i - 1] * p[i] * p[j];  // 求出Ai到Aj的连乘
				s[i][j] = i;  // 记录划分位置
				for (int k = i + 1; k < j; k++) {
					// 寻找是否有可优化的分割点
					int t = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];  // 公式
					if (t < m[i][j]) {
						m[i][j] = t;
						s[i][j] = k;
					}
				}
			}
		}
		return m[1][n];
	}
	
	/**
	 * 输出 A[i:j] 的最优计算次序
	 * @param i、j: 连乘矩阵下标
	 * @param s: 存放分割位置下标的数组
	 **/
	public static void traceback(int i, int j, int[][] s) {
		// 输出A[i:j] 的最优计算次序
		if (i == j) {
			// 递归出口
			System.out.print("A"+i);
			return;
		} else {
			System.out.print("(");
			// 递归输出左边
			traceback(i, s[i][j], s);
			// 递归输出右边
			traceback(s[i][j] + 1, j, s);
			System.out.print(")");
		}
	}
	
	public static void main(String[] args) {
		int[] p = new int[]{5, 7, 4, 3, 5};
		int[][] m = new int[p.length][p.length];
		int[][] s = new int[p.length][p.length];
		System.out.println("最优值为： "+matrixChain(p, m, s));
		traceback(1, p.length-1, s);
	}
}
```
```bash
最优值为： 264
((A1(A2A3))A4)
```

本文收录于以下专栏

![cover](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35fa5b4e507646549753ba0b5ce8f242~tplv-k3u1fbpfcp-jj:160:120:0:0:q75.avis)

上一篇

分治（详解残缺棋盘 —— Java代码实现）