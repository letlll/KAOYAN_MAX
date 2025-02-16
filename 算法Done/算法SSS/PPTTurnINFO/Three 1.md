### 第3章 动态规划

动态规划（Dynamic Programming，DP）是一种通过将复杂问题分解为更简单的子问题并记录其解来避免重复计算的优化算法。它的关键在于通过保存子问题的解，来避免重复计算，从而降低时间复杂度。动态规划的核心思想是“最优子结构”和“重叠子问题”。

#### 1. 动态规划的起源与背景

动态规划是由美国数学家Richard Bellman在20世纪50年代提出的，最早用于解决多阶段决策过程中的优化问题。动态规划方法将一个多阶段问题分解为多个单阶段问题，逐步求解。

动态规划的应用非常广泛，涵盖了经济管理、工程技术、最优控制等领域的诸多问题：
- **最短路径问题**
- **库存管理**
- **资源分配**
- **设备更新**
- **装载与排序问题**

#### 2. 动态规划的核心思想

动态规划的核心思想可以总结为以下两点：
1. **最优子结构**：问题的最优解包含其子问题的最优解。也就是说，大问题的解可以通过合并小问题的解来构造。
2. **子问题的重叠性**：在递归求解过程中，不同的子问题之间存在重叠，也就是说多个大问题可能共享相同的子问题。如果不加以记录，这些子问题可能会被多次求解，浪费时间。通过存储子问题的解，可以显著减少计算量。

#### 3. 动态规划的基本步骤

动态规划的求解过程可以分为以下几个步骤：

1. **确定问题的最优子结构**：分析问题，找出如何将其分解为若干个相互关联的子问题，并确定每个子问题的最优解是如何影响全局最优解的。
2. **定义状态和决策函数**：为每个子问题定义一个表示其最优解的状态，并根据这个状态递归地描述出最优解（建立递归关系）。
3. **自底向上计算**：从最简单的子问题开始，逐步求解，并保存每个子问题的最优解，避免重复计算。
4. **构造最优解**：通过回溯来得到完整的最优解。

#### 4. 经典例题：货郎担问题（旅行商问题）

**问题描述**：给定n个城市和城市之间的距离，要求找到一个最短路径，使得货郎从一个城市出发，经过每个城市一次后返回出发城市。这个问题在图论中称为**哈密尔顿回路问题**。

**动态规划求解步骤**：
- 定义状态：设d(i, V')表示从城市i出发，经过集合V'中的所有城市一次，最终返回城市i的最短路径长度。
- 动态规划方程：对于城市1出发的最短路径可以定义为：
  \[
  d(1, \{2, 3, 4\}) = \min(c_{12} + d(2, \{3, 4\}), c_{13} + d(3, \{2, 4\}), c_{14} + d(4, \{2, 3\}))
  \]
  其中，c_{ij}表示城市i到城市j的距离。

**递归求解**：从最小的子问题开始，递归求解每个子问题的最优解，并逐步合并成大问题的最优解。

#### 5. 动态规划应用的条件

动态规划算法适用于具有以下特征的问题：
1. **最优子结构**：问题的最优解包含其子问题的最优解。例如，矩阵连乘、最长公共子序列等问题都满足这一特性。
2. **重叠子问题**：问题可以分解为相互重叠的子问题，这意味着一些子问题会被多次求解。
3. **无后效性**：当前决策只依赖当前状态，而不依赖于决策过程的历史。

#### 6. 矩阵链乘问题

**问题描述**：给定n个矩阵，如何确定它们的乘法顺序，使得乘法运算的次数最少。

- **递归关系**：设m[i, j]为从第i个矩阵到第j个矩阵相乘所需的最少次数。则有：
  \[
  m[i][j] = \min_{i \leq k < j} (m[i][k] + m[k+1][j] + p_{i-1}p_kp_j)
  \]
  其中，p是矩阵的维数数组。

#### 7. 最长公共子序列问题

**问题描述**：给定两个序列X和Y，找到它们的最长公共子序列。

- **递归关系**：设c[i][j]为序列X的前i个字符和序列Y的前j个字符的最长公共子序列的长度。则有：
  \[
  c[i][j] = 
  \begin{cases} 
  c[i-1][j-1] + 1, & \text{如果}x_i = y_j \\
  \max(c[i-1][j], c[i][j-1]), & \text{如果}x_i \neq y_j
  \end{cases}
  \]

#### 8. 0-1 背包问题

**问题描述**：给定n个物品和一个背包，物品i的重量为w_i，价值为v_i，背包的容量为C。如何选择物品装入背包，使得总价值最大。

- **递归关系**：设m[i][j]表示前i个物品放入容量为j的背包时的最大价值。则有：
  \[
  m[i][j] = 
  \begin{cases} 
  m[i-1][j], & j < w_i \\
  \max(m[i-1][j], m[i-1][j-w_i] + v_i), & j \geq w_i
  \end{cases}
  \]

#### 9. 总结

动态规划是一种通过记录子问题的解来优化复杂问题的算法。它尤其适用于具有最优子结构和重叠子问题性质的问题。动态规划通过以空间换时间的方式，能够将许多问题的时间复杂度从指数级降到多项式级。