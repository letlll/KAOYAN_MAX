---
title: "动态规划之矩阵连乘_c语言动态规划 递归 解决矩阵连乘问题-CSDN博客"
source: "https://blog.csdn.net/qq_54809548/article/details/120779611?ops_request_misc=%257B%2522request%255Fid%2522%253A%252217980AFA-6A47-4E63-925E-3F16F79D2AEF%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=17980AFA-6A47-4E63-925E-3F16F79D2AEF&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~top_click~default-2-120779611-null-null.nonecase&utm_term=%E7%9F%A9%E9%98%B5%E8%BF%9E%E4%B9%98%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92&spm=1018.2226.3001.4450"
author:
published:
created: 2024-11-13
description: "文章浏览阅读2.3k次，点赞4次，收藏46次。本文详细介绍了矩阵链乘法的动态规划解决方案，包括最优计算次序的确定、递归关系的建立、计算最优值的过程以及如何构造最优解。动态规划算法能够有效地避免重复计算，降低矩阵连乘的计算次数。通过示例代码展示了如何实现这一算法，帮助理解矩阵乘法的高效计算方法。"
tags:
  - "clippings"
---
**两个矩阵相乘**：设A为ra\*ca的矩阵，B为rb\*cb的矩阵，C=A\*B，求C

![](https://i-blog.csdnimg.cn/blog_migrate/1f9a2b662d90874487efd5feb731257b.jpeg)

首先[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)a\[ra\]\[ca\]、b\[rb\]\[cb\]、c\[r\]\[c\]分别存储矩阵A，B，C(r=ra,cb=c)

if(ca!=rb)   两个矩阵不能相乘，

else  A的第一行与B的第一列对应位置相乘再相加

```cpp
void MatrixMultiply(int **a,int **b,int **c,int ra,int ca,int rb, int cb){  if(ra != cb)        cout<<"can not multiply!"<<endl;for(int i=0; i<ra; i++){for(int j=0; j<cb; j++){int sum = a[i][0]*b[0][j];for(int k=1; k<ca; k++){                sum += a[i][k]*b[k][j];           }           c[i][j] = sum;        }    }}
```

若A为pxq的矩阵，B为qxr的矩阵，则AB为pxr的矩阵，需要进行pxqxr次数乘。

**多个矩阵连乘**：给n个矩阵{A1,A2,...,An}，其中相邻的矩阵是可乘的，计算A1A2...An，因为矩阵乘法满足结合律，通过加括号改变计算次序可以减小其计算量，例如：A1、A2、A3分别为10\*100、100\*5和5\*50的矩阵（（A1A2）A3）需要10\*100\*5+10\*5\*50=7500次数乘，（A1(A2A3)）需要100\*5\*50+10\*100\*50=75000次数乘。

问题：利用完全加括号的方式确定最优计算次序，使得数乘次数最少，并输出加括号后的结果。

输入：第一行输入参与乘积的矩阵的个数n；第二行依次输入矩阵的行、列（例：A1:30\*35 A2:35\*15 A3:15\*5 A4:5\*10 A5:10\*20 A6:20\*25<30 35 15 5 10 20 25>）用p\[n\]数组保存输入的值。

可以发现：矩阵个数+1=第二行输入的数的个数

穷举法计算量太大。用[动态规划算法](https://so.csdn.net/so/search?q=%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%AE%97%E6%B3%95&spm=1001.2101.3001.7020)解矩阵连乘积的最优计算次序。步骤如下：

**1\. 分析最优解结构**

[动态规划](https://so.csdn.net/so/search?q=%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92&spm=1001.2101.3001.7020)第一步：刻画问题的最优解结构特征。

将AiAi+1...Aj简记为A\[i:j\]，即考察A\[1:n\]的最优计算次序。设从Ak和Ak+1之间断开结果最优，即加括号((A1...Ak)(Ak+1...An))，则所需数乘次数为A\[1:k\]的计算量+A\[k+1:n\]的计算量+A\[1:k\]结果\*A\[k+1:n\]的计算量。该问题具有最优子结构性质：（即最优解包含着其子问题的最优解,但这个**子问题是不独立的**（区别于分治法））A\[1:n\]的最优次序包含其子链A\[1:k\]和A\[k+1:n\]的次序也是最优的。断开的位置k由数组s\[i\]\[j\]保存

**2\. 建立递归关系**

动态规划第二步：递归的定义最优值。

用数组m\[i\]\[j\]保存最优数乘次数，则原问题的最优解为m\[1\]\[n\]。

当i=j时，A\[i\]\[j\]表示一个矩阵，不需要进行乘法运算，因此m\[i\]\[i\]=0（i=1,2,3...,n）

当i<j时，当从k断开时结果最优，m\[i\]\[j\]=min{ m\[i\]\[k\]+m\[k+1\]\[j\]+p\[i-1\]\*p\[k\]\*p\[j\] }<i<=k<j>

![](https://i-blog.csdnimg.cn/blog_migrate/d358e4f2a2fba3fb8683d8026f9bee56.jpeg) 

**自底向上思想！！！**：先找出两个矩阵相乘的最优值，需要遍历每两个相邻矩阵，再利用遍历过得相邻两个相乘的结果计算三个相乘的最优，以此类推，最终得到n个相乘的最优值 

3\. 计算最优值

计算m\[1:n\]时，为避免子问题被重复计算多次（动态规划的又一个特征），在计算过程中保存已解决的子问题的答案，每个子问题计算一次，后面需要时只需简单的查看使用，从而避免重复计算。具体实现如下：

```cpp
​void MatrixChain(int *p,int n,int m[][N],int s[][N]) { for(int i=1; i<=n; i++)        m[i][i] = 0;for(int r=2; r<=n; r++) {for(int i=1; i<=n-r+1; i++) { int j = i+r-1;            m[i][j] = m[i+1][j] + p[i-1]*p[i]*p[j];            s[i][j] = i;for(int k=i+1; k<j; k++) {int t = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];if(t < m[i][j]) {                    m[i][j] = t;                    s[i][j] = k;                }            }        }    }}​
```

![](https://i-blog.csdnimg.cn/blog_migrate/49001c63abe562e15db16a5bb1b0ea6c.jpeg)当r=n时，将得到最终的最优解

 4. 构造最优解

动态规划第四步：构造问题最优解，通过上面的函数，最优值被计算出来，也记录了矩阵链断开的位置，接下来就是要根据数组s中记录的断点位置输出加括号的矩阵链。

```cpp
void Traceback(int i,int j,int s[][N]){if(i==j)           {        cout<<"A"<<i;    }else           {        cout<<"("; Traceback(i,s[i][j],s);Traceback(s[i][j]+1,j,s);        cout<<")";    }}
```

完整代码如下：

```cpp
#include <iostream>using namespace std;const int N = 100;int p[N];int m[N][N];int s[N][N];void MatrixChain(int n){int r, i, j, k;for(i=0;i<=n;i++)		m[i][i]=0;for(r=2;r<=n;r++){for (i=1;i<=n-r+1;i++){			j=i+r-1;			m[i][j]=m[i][i]+m[i+1][j]+p[i-1]*p[i]*p[j];			s[i][j]=i;for(k=i+1;k<j;k++){int t=m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j];if (t<m[i][j]){					m[i][j] = t;					s[i][j] = k;				}			}		}	}}void Traceback(int i,int j){if(i==j){        cout<<"A"<<i;    }else{        cout<<"(";Traceback(i,s[i][j]);Traceback(s[i][j]+1,j);        cout<<")";    }}int main(){int n;	cin >> n;int i, j;for (i=0;i<=n;i++)        cin>>p[i];MatrixChain(n);	cout<<"ans:";Traceback(1,n);	cout<<endl;return 0;}
```