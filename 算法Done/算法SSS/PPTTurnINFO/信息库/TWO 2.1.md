# 第2章 递归与分治策略

## 2.1 递归的概念

- **递归算法**：直接或间接地调用自身的算法。
- **递归函数**：用函数自身给出定义的函数。
- **递归分类**：
  - 直接递归
  - 间接递归
- **递归本质**：将原问题转化为同质子问题求解。

### 例1 阶乘函数

阶乘函数可递归地定义为：

**边界条件**:

$$
n! = 
\begin{cases} 
1 & \text{if } n = 0 \\
n \cdot (n - 1)! & \text{if } n > 0 
\end{cases}
$$



**递归方程**:
边界条件与递归方程是递归函数的两个要素，递归函数只有具备了这两个要素，才能在有限次计算后得出结果。

### 递归技术的分类

- **基于归纳法**
- **基于分治法**

**基于归纳法的递归思想**：
对于一个规模为 `n` 的问题 `P(n)`，归纳法的思想方法是：
1. **基础步**: `a1` 是问题 `P(1)` 的解。
2. **归纳步**: 对于 `1 < k < n`，若 `b` 是问题 `P(k)` 的解，则 `p(b)` 是问题 `P(k+1)` 的解。

求 `P(n)` 的解 `an`，则先求 `P(n-1)` 的解 `an-1`，不断递归求解直到 `P(1)`。得到 `P(1)` 的解后，返回并进行 `P(2)` 的运算，直到得到 `P(n)` 的解。

### 例2 多项式求值递归算法

**n阶多项式**:
$$ P_n(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 $$
**公式改写**:
$$ P_n(x) = (((a_n x + a_{n-1})x + a_{n-2})x + \dots + a_1)x + a_0 $$
**递归步骤**:
1. **基础步**: \( n = 0 \)，有 \( p_0 = a_0 \)。
2. **归纳步**: 对于任意 \( k \)，\( 1 \leq k \leq n \)，假设前 \( k \) 步已计算出 \( p_{k-1} \)：
$$ p_{k-1}(x) = a_n x^{k-1} + a_{n-1} x^{k-2} + \dots + a_{n-k+2} x + a_{n-k+1} $$
   则有：
$$ p_k(x) = x p_{k-1}(x) + a_{n-k} $$

**代码实现**:
```java
public Float horner_pol(float A[], float x, int n) {
    if (n == 0)
        return A[0];
    else
        return horner_pol(A, x, n - 1) * x + A[n];
}
// 算法时间复杂性：
// f(0) = 0
// f(n) = f(n-1) + 1 → f(n) = O(n)
```

### 例3 Fibonacci 数列

**Fibonacci 数列**:
无穷数列 `1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …`，递归定义为：
$$
F(n) = 
\begin{cases} 
1 & \text{if } n = 0 \\ 
1 & \text{if } n = 1 \\ 
F(n - 1) + F(n - 2) & \text{if } n > 1 
\end{cases}
$$

**代码实现**:
```java
public static int fibonacci(int n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**边界条件**:
- `n = 0` 时，`F(n) = 1`
- `n = 1` 时，`F(n) = 1`
- `n > 1` 时，`F(n) = F(n-1) + F(n-2)`

### 例4 Ackermann 函数

当一个函数及其一个变量由函数自身定义时，称为双递归函数。

**Ackermann函数** `A(n, m)` 定义如下：
$$
A(n, m) = 
\begin{cases} 
2 & \text{if } n = 1, m = 0 \\ 
1 & \text{if } n = 0, m \geq 0 \\ 
n + 2 & \text{if } n \geq 2, m = 0 \\ 
A(A(n - 1, m), m - 1) & \text{if } n \geq 1, m \geq 1 
\end{cases}
$$


**非递归定义**:
前两个例子的函数都可以找到相应的非递归方式定义，但 Ackermann 函数无法找到非递归的定义。
$$
F(n) = \frac{1}{\sqrt{5}} \left( \left( \frac{1 + \sqrt{5}}{2} \right)^{n+1} - \left( \frac{1 - \sqrt{5}}{2} \right)^{n+1} \right)
$$

**具体例子**:
- `A(n, 1) = 2 * n`
- `A(n, 2) = 2 * n`
- `A(n, 3)` 等类似更复杂的定义。

**单变量 Ackermann函数**:
```
A(n) = A(n, n)
α(n) = min { k | A(k) ≥ n }
```
`α(n)` 在复杂度分析中常遇到，对于通常的正整数 `n`，有 `α(n) ≤ 4`，但在理论上 `α(n)` 没有上界，随着 `n` 增加，它以难以想象的慢速度趋向正无穷大。

### 例5 排列问题

设计一个递归算法生成 `n` 个元素 `{r1, r2, …, rn}` 的全排列。

**递归定义**:
- 当 `n = 1` 时，`perm(R) = (r)`，其中 `r` 是集合 `R` 中唯一的元素。
- 当 `n > 1` 时，`perm(R)` 由 `(r1)perm(R1), (r2)perm(R2), …, (rn)perm(Rn)` 构成，其中 `Ri = R - {ri}`。

### 例6 整数划分问题

将正整数 `n` 表示成一系列正整数之和：`n = n1 + n2 + … + nk`，其中 `n1 ≥ n2 ≥ … ≥ nk ≥ 1，k ≥ 1`。

**正整数 `n` 的划分数** `p(n)` 定义为：
```
p(n) = q(n, n)
```

**递归关系** `q(n, m)`：
1. `q(n, 1) = 1`，`n ≥ 1`
2. `q(n, m) = q(n, m-1) + q(n-m, m)`, `n > m > 1`
3. `q(n, m) = 1 + q(n, m-1)`, `n = m`
4. `q(n, m) = q(n, m)`, `n < m`

**代码实现**:
```java
public static int integerPartition(int n, int m) {
    if (n == 0)
        return 1;
    if (m == 0)
        return 0;
    if (n < 0)
        return 0;
    return integerPartition(n, m - 1) + integerPartition(n - m, m);
}
```

**正整数 `n` 的划分数**:
例如，正整数 `6` 有如下 `11` 种不同的划分：
- 6；
- 5 + 1；
- 4 + 2，4 + 1 + 1；
- 3 + 3，3 + 2 + 1，3 + 1 + 1 + 1；
- 2 + 2 + 2，2 + 2 + 1 + 1，2 + 1 + 1 + 1 + 1；
- 1 + 1 + 1 + 1 + 1 + 1。

### 例7 汉诺塔问题

设 `A`, `B`, `C` 是 3 个塔座。开始时，在塔座 `A` 上有一叠共 `n` 个圆盘，这些圆盘自下而上由大到小编号为 `1, 2, …, n`。现要求将塔座 `A` 上的圆盘移到塔座 `B` 上，仍按同样顺序叠置。

**移动规则**：
1. 每次只能移动 1 个圆盘。
2. 任何时刻都不允许将较大的圆盘压在较小的圆盘之上。
3. 在满足移动规则 1 和 2 的前提下，可将圆盘移至 `A`, `B`, `C` 中任一塔座。

**算法思想**：
1. **基础步**: `n = 1` 时，将 `A` 上圆盘移到 `B` 上。
2. **归纳步**: `n > 1` 时，
   - 将 `n-1` 个较小圆盘从塔 `A` 移到塔 `C`。
   - 将塔 `A` 上最大圆盘移到塔 `B`。
   - 将 `n-1` 个较小圆盘从塔 `C` 移到塔 `B`。

**代码实现**:
```java
public static void hanoi(int n, int a, int b, int c) {
    if (n > 0) {
        hanoi(n - 1, a, c, b); // 将n-1个圆盘从A移到C
        move(a, b);            // 将第n个圆盘从A移到B
        hanoi(n - 1, c, b, a); // 将n-1个圆盘从C移到B
    }
}

public static void move(int from, int to) {
    System.out.println("Move disk from " + from + " to " + to);
}
```

**复杂度分析**:
- 设 `h(n)` 为移动 `n` 个盘子的移动次数。
  - `h(1) = 1`
  - `h(n) = 2 * h(n-1) + 1 → h(n) = O(2^n)`
  
**递归小结**:
- **优点**：
  - 结构清晰
  - 可读性强
  - 容易用数学归纳法证明算法正确性
- **缺点**：
  - 运行效率较低
  - 耗费的计算时间和存储空间较多
- **解决方法**：
  - 消除递归调用，转化为非递归算法
  - 使用用户定义的栈模拟递归调用
  - 用递推实现递归函数
  - 通过尾递归优化

**递归示例**:

**线性递归**:
```java
long recursive(long n) {
    return (n == 1) ? 1 : n * recursive(n - 1);
}
```
调用过程：
```
recursive(5)
= 5 * recursive(4)
= 5 * (4 * recursive(3))
= 5 * (4 * (3 * recursive(2)))
= 5 * (4 * (3 * (2 * recursive(1))))
= 5 * (4 * (3 * (2 * 1)))
= 5 * (4 * 6)
= 5 * 24
= 120
```

**尾递归**:
```java
long tailRecursive(long n, long a) {
    return (n == 1) ? a : tailRecursive(n - 1, a * n);
}
```
调用过程：
```
tailRecursive(5, 1)
= tailRecursive(4, 5)
= tailRecursive(3, 20)
= tailRecursive(2, 60)
= tailRecursive(1, 120)
= 120
```

## 分治思想的提出

假设 `C(x)` 为描述问题 `x` 的复杂度的函数，`E(x)` 为解决问题 `x` 的代价函数。

根据经验，对于两个问题 `p1` 和 `p2`，如果 `C(p1) > C(p2)`，那么 `E(p1) > E(p2)`。

进一步得出如下推论：
```
C(p1 + p2) > C(p1) + C(p2)
E(p1 + p2) > E(p1) + E(p2)
```
因此推断，如果问题 `P` 能够分解为 `n` 个子问题，那么解决 `n` 个子问题的总代价肯定低于直接解决 `P` 的代价，因为 `P` 太复杂了，让人无从下手！

## 分治算法

- **步骤**:
  1. **分解**: 将问题 `P` 分解为 `k` 个规模较小、相互独立的子问题 `P1, P2, ..., Pk`。
  2. **解决**: 递归地解决每个子问题。
  3. **合并**: 将子问题的解合并为原问题的解。

**递归树示意**:
```
T(n) = k * T(n/m) + f(n)
```

## 分治法的适用条件

分治法所能解决的问题一般具有以下几个特征：
1. **问题规模缩小后易于解决**。
2. **问题可以分解为若干个规模较小的相同问题**，即具有最优子结构性质。
3. **子问题的解可以合并为原问题的解**。
4. **子问题相互独立**，不包含公共子问题。

如果问题具备以上特征，则适合采用分治法进行求解。

## 分治法的基本步骤

```pseudo
divide-and-conquer(P) {
    if (|P| <= n0) {
        adhoc(P); // 解决小规模的问题
    } else {
        divide P into smaller subinstances P1, P2, ..., Pk; // 分解问题
        for (i = 1; i <= k; i++) {
            yi = divide-and-conquer(Pi); // 递归解各子问题
        }
        return merge(y1, ..., yk); // 合并子问题的解
    }
}
```

**设计要点**：
- 最好使子问题的规模大致相同，以保持递归的平衡。
- 递归终止条件明确，避免无限递归。

## 分治法的复杂性分析

分治算法将规模为 \( n \) 的问题分成 \( k \) 个规模为 \( n / m \) 的子问题去解。设分解阈值 \( n_0 = 1 \)，且 **adhoc** 解规模为 \( 1 \) 的问题耗费 \( O(1) \) 时间。再设将原问题分解为 \( k \) 个子问题并用 **merge** 将 \( k \) 个子问题的解合并为原问题的解需要 \( f(n) \) 个单位时间。

用 \( T(n) \) 表示该分治法解规模为 \( |P| = n \) 的问题所需的计算时间，则有：

$$
T(n) = 
\begin{cases}
O(1) & n = 1 \\
k \cdot T\left(\frac{n}{m}\right) + f(n) & n > 1 
\end{cases}
$$

通过迭代法求得方程的解为：

$$
T(n) = n^{\log_m k} + \sum_{j=0}^{\log_m n - 1} k^j f\left(\frac{n}{m^j}\right)
$$

**渐进性态**：`T(n) = O(n^log_m k)`，假定 `T(n)` 是单调上升的。

## 二分搜索技术

给定已按升序排序好的 \( n \) 个元素 \( a[0:n-1] \)，现要在这 \( n \) 个元素中找出一个特定元素 \( x \)。

### 分析
- 该问题的规模缩小到一定的程度就可以容易地解决；
- 该问题可以分解为若干个规模较小的相同问题；
- 分解出的子问题的解可以合并为原问题的解；
- 分解出的各个子问题是相互独立的。

#### 进一步分析
很显然，此问题分解出的子问题相互独立，即在 \( a[i] \) 的前面或后面查找 \( x \) 是独立的子问题，因此满足分治法的条件。

### 二分搜索算法实现

根据以上分析，以下是二分搜索的算法实现：

```java
public static int binarySearch(int[] a, int x, int n) {
    // 在 a[0] <= a[1] <= ... <= a[n-1] 中搜索 x
    // 找到 x 时返回其在数组中的位置，否则返回 -1
    int left = 0;
    int right = n - 1;

    while (left <= right) {
        int middle = (left + right) / 2;
        
        if (x == a[middle]) return middle;
        if (x > a[middle]) left = middle + 1;
        else right = middle - 1;
    }
    
    return -1; // 未找到 x
}
```

### 算法复杂度分析
每执行一次算法的 `while` 循环，待搜索数组的大小减少一半。

- **最坏情况**：在最坏情况下，`while` 循环被执行了 \( O(\log n) \) 次。
- **时间复杂度**：循环体内运算需要 \( O(1) \) 时间，因此整个算法在最坏情况下的计算时间复杂度为 \( O(\log n) \)。

### 思考题
给定数组 \( a \)，用二分法设计出求 \( a^n \) 的算法。

## 最接近点对问题

### 一维情况

**问题描述**:
给定平面上 `n` 个点的集合 `S`，找出其中一对点，使得该点对间的距离最小。简化为一维问题，找出 `n` 个实数中相差最小的两个数。

**算法步骤**:
1. 对点集合 `S` 按 `x` 坐标排序。
2. 递归地分割 `S` 为两个子集 `S1` 和 `S2`。
3. 在 `S1` 和 `S2` 上分别找出最接近点对 `{p1, p2}` 和 `{q1, q2}`，设 `d = min(|p1 - p2|, |q1 - q2|)`。
4. 检查跨子集的点对 `{p3, q3}`，其中 `p3 ∈ S1` 且 `q3 ∈ S2`，是否有更小的距离。
5. 合并结果，得到全局最接近点对。

**复杂度分析**:
- **时间复杂度**: `O(n log n)`

### 二维情况

**问题描述**:
在二维平面上，找出最接近的一对点。

**算法步骤**:
1. 按 `x` 坐标排序点集合 `S`，找到中位数 `m`。
2. 分割 `S` 为 `S1` 和 `S2`。
3. 递归地在 `S1` 和 `S2` 上找出各自的最小距离 `d1` 和 `d2`，设 `d = min(d1, d2)`。
4. 在距离分割线 `m` 的 `d` 范围内，检查跨子集的点对 `{p, q}` 是否存在更小的距离。
5. 合并结果，得到全局最接近点对。

**复杂度分析**:
- **时间复杂度**: `O(n log n)`

**关键点**:
- 在合并步骤中，通过将点按 `y` 坐标排序，并只检查距离 `m` 的 `d` 范围内的点对，减少检查次数。

## 大整数的乘法

### 小学方法

**复杂度**: `O(n²)`

### 分治法

**步骤**:
1. 将两个 `n` 位二进制整数 `X` 和 `Y` 分割为高位和低位。
2. 递归计算 `ac`, `bd`, `(a - b)(c - d)` 或 `(a + b)(c + d)`。
3. 合并结果，得到最终乘积。

**递归关系**:
```
T(n) = 4 * T(n/2) + O(n)
T(n) = O(n^log_2 4) = O(n^2)
```

**改进方法**:
- 通过减少乘法次数，可以将时间复杂度降低到 `O(n^log_2 7)`，即 `O(n^2.81)`。

**进一步改进**:
- 使用快速傅里叶变换 (FFT) 技术，可以在 `O(n log n)` 时间内完成大整数乘法。

### 快速傅里叶变换 (FFT)

**复杂度**: `O(n log n)`

## Strassen矩阵乘法

### 传统方法

**复杂度**: `O(n³)`

### 分治法

**步骤**:
1. 将矩阵 `A` 和 `B` 分割为四个子矩阵。
2. 递归计算子矩阵的乘积。
3. 合并结果，得到最终矩阵 `C`。

**递归关系**:
```
T(n) = 8 * T(n/2) + O(n²)
T(n) = O(n^log_2 7) ≈ O(n^2.81)
```

**进一步改进**:
- 最佳的矩阵乘法算法复杂度为 `O(n^2.376)`，目前尚未达到 `O(n²)`。

## 棋盘覆盖

**问题描述**:
在一个 `2^k × 2^k` 的棋盘中，恰有一个方格为特殊方格。用 L 型骨牌覆盖除特殊方格外的所有方格，且任意两个 L 型骨牌不得重叠。

**算法步骤**:
1. **分割**: 将棋盘分为四个 `2^(k-1) × 2^(k-1)` 的子棋盘。
2. **定位**: 特殊方格位于其中一个子棋盘，其余子棋盘无特殊方格。
3. **覆盖**: 用一个 L 型骨牌覆盖其他三个子棋盘的中心区域，形成新的特殊方格。
4. **递归**: 对四个子棋盘递归执行上述步骤，直到棋盘规模为 `1 × 1`。

**代码实现**:
```java
public void chessBoard(int tr, int tc, int dr, int dc, int size) {
    if (size == 1) return;
    int s = size / 2;
    int t = tile++;
    
    // 判断特殊方格所在的子棋盘
    boolean topLeft = (dr < tr + s) && (dc < tc + s);
    boolean topRight = (dr < tr + s) && (dc >= tc + s);
    boolean bottomLeft = (dr >= tr + s) && (dc < tc + s);
    boolean bottomRight = (dr >= tr + s) && (dc >= tc + s);
    
    // 覆盖中心
    if (!topLeft) board[tr + s - 1][tc + s - 1] = t;
    if (!topRight) board[tr + s - 1][tc + s] = t;
    if (!bottomLeft) board[tr + s][tc + s - 1] = t;
    if (!bottomRight) board[tr + s][tc + s] = t;
    
    // 递归覆盖四个子棋盘
    chessBoard(tr, tc, dr, dc, s); // 左上
    chessBoard(tr, tc + s, tr + s - 1, tc + s, s); // 右上
    chessBoard(tr + s, tc, tr + s, tc + s - 1, s); // 左下
    chessBoard(tr + s, tc + s, tr + s, tc + s, s); // 右下
}
```

**复杂度分析**:
- **时间复杂度**: `O(n²)`，其中 `n = 2^k`。

## 快速排序

**概述**:
快速排序是对冒泡排序的一种改进，由 C.A.R. Hoare 于 1962 年提出。

**算法步骤**:
1. 选择一个基准元素。
2. 分区：将数组分为两部分，左边部分小于等于基准，右边部分大于等于基准。
3. 递归地对左右两部分进行排序。

**代码实现**:
```java
private static void qSort(int p, int r) {
    if (p < r) {
        int q = partition(p, r); // 划分数组
        qSort(p, q - 1);         // 排序左半部分
        qSort(q + 1, r);         // 排序右半部分
    }
}

private static int partition(int p, int r) {
    int i = p;
    int j = r + 1;
    Comparable x = a[p];
    while (true) {
        while (a[++i].compareTo(x) < 0) if (i == r) break;
        while (a[--j].compareTo(x) > 0) if (j == p) break;
        if (i >= j) break;
        swap(a, i, j);
    }
    swap(a, p, j);
    return j;
}
```

**复杂度分析**:
- **最坏时间复杂度**: `O(n²)`
- **平均时间复杂度**: `O(n log n)`
- **空间复杂度**: `O(log n)`（递归调用栈）

**优化方法**:
- 随机选择基准元素，避免最坏情况发生。
```java
private static int randomizedPartition(int p, int r) {
    int i = random(p, r);
    swap(a, i, p);
    return partition(p, r);
}
```

**稳定性**:
- 快速排序是不稳定的。

## 最接近点对问题

### 一维情况

**问题描述**:
给定 `n` 个按升序排列的实数 `x1, x2, ..., xn`，找出两数之间的最小距离。

**算法步骤**:
1. 排序所有点。
2. 递归地将点集分为两部分。
3. 在左右两部分分别找出最小距离 `d1` 和 `d2`，设 `d = min(d1, d2)`。
4. 检查跨分割线 `m` 的点对 `{p3, q3}`，其中 `p3 ∈ S1` 且 `q3 ∈ S2`，是否存在更小的距离。
5. 返回最小距离。

**复杂度分析**:
- **时间复杂度**: `O(n log n)`

### 二维情况

**问题描述**:
在二维平面上，给定 `n` 个点，找出两点之间的最小距离。

**算法步骤**:
1. 按 `x` 坐标排序点集 `S`，找到中位数 `m`，将 `S` 分为 `S1` 和 `S2`。
2. 递归地在 `S1` 和 `S2` 上找出各自的最小距离 `d1` 和 `d2`，设 `d = min(d1, d2)`。
3. 在距离分割线 `m` 的 `d` 范围内，检查跨子集的点对 `{p, q}` 是否存在更小的距离。
4. 通过按 `y` 坐标排序，并只检查相邻的点对，减少检查次数。
5. 返回最小距离。

**复杂度分析**:
- **时间复杂度**: `O(n log n)`

## 循环赛日程表

**问题描述**:
设计一个满足以下要求的比赛日程表：
1. 每个选手必须与其他 `n-1` 个选手各赛一次。
2. 每个选手一天只能赛一次。
3. 循环赛一共进行 `n-1` 天。

**算法步骤**:
1. **分治策略**: 将所有选手分为两半，利用较小规模的比赛日程表设计较大规模的日程表。
2. 递归地分割选手，直到只剩下 2 个选手时，直接安排比赛。
3. 合并子问题的解，形成完整的比赛日程表。

**示意图**:
```
Day 1:
  - 比赛1: 选手A vs 选手B
  - 比赛2: 选手C vs 选手D
  ...
Day 2:
  - 比赛1: 选手A vs 选手C
  - 比赛2: 选手B vs 选手D
  ...
...
Day n-1:
  - 所有选手完成各自的比赛
```

**复杂度分析**:
- **时间复杂度**: `O(n log n)`
- **空间复杂度**: `O(n)`

## 递归小结

**优点**:
- 结构清晰，易于理解和实现。
- 可读性强，便于使用数学归纳法证明算法的正确性。

**缺点**:
- 运行效率较低，计算时间和存储空间消耗较大。
- 可能导致栈溢出，特别是在递归深度较大的情况下。

**解决方法**:
1. **消除递归**: 将递归算法转化为非递归算法。
2. **使用栈模拟**: 采用用户定义的栈模拟系统的递归调用栈。
3. **递推实现**: 用递推方式实现递归函数。
4. **尾递归优化**: 通过尾递归优化，将递归转化为迭代，提升效率。

**示例**:

**线性递归**:
```java
long recursive(long n) {
    return (n == 1) ? 1 : n * recursive(n - 1);
}
```

**尾递归**:
```java
long tailRecursive(long n, long a) {
    return (n == 1) ? a : tailRecursive(n - 1, a * n);
}
```

调用过程：
```
recursive(5)
= 5 * recursive(4)
= 5 * (4 * recursive(3))
= 5 * (4 * (3 * recursive(2)))
= 5 * (4 * (3 * (2 * recursive(1))))
= 5 * (4 * (3 * (2 * 1)))
= 5 * (4 * 6)
= 5 * 24
= 120

tailRecursive(5, 1)
= tailRecursive(4, 5)
= tailRecursive(3, 20)
= tailRecursive(2, 60)
= tailRecursive(1, 120)
= 120
```

**总结**:
- 递归是一种强大的算法设计技术，适用于许多具有自相似结构的问题。
- 在设计递归算法时，需确保递归终止条件明确，避免无限递归。
- 优化递归算法可以显著提升其性能，尤其是在处理大规模问题时。

---