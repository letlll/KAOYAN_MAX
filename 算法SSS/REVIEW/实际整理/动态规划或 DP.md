##  [动态规划](https://www.geeksforgeeks.org/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/)【自用】

动态规划是数学和计算机科学中使用的一种方法，通过将复杂问题分解为更简单的子问题来解决这些问题。通过仅求解每个子问题一次并存储结果，它避免了冗余计算，从而为各种问题提供了更高效的解决方案。

关键概念：

- [最优子结构](https://www.geeksforgeeks.org/optimal-substructure-property-in-dynamic-programming-dp-2/)：问题的最优解可以从其子问题的最优解中构建。
- [重叠的子问题](https://www.geeksforgeeks.org/overlapping-subproblems-property-in-dynamic-programming-dp-1/)：子问题通常在较大的问题中重复出现，从而导致冗余计算。
- [Memoization](https://www.geeksforgeeks.org/what-is-memoization-a-complete-tutorial/) / [Tabulation](https://www.geeksforgeeks.org/tabulation-vs-memoization/)：存储子问题的解决方案以避免重新计算。

在继续之前，您必须解决的动态规划算法的一些重要和最常见的问题是：

|问题|描述|
|---|---|
|[斐波那契数列](https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/)|使用动态规划生成斐波那契数列，以避免重复计算。|
|[最长公共 Subsequence](https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/)|求两个序列共有的最长子序列。|
|[最长递增的子序列](https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/)|查找给定序列的最长子序列，其中元素按升序排序。|
|[0/1 背包问题](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/)|确定通过选择具有给定权重和值的项目（不超过指定的重量限制）可以获得的最大值。|
|[杆切割问题](https://www.geeksforgeeks.org/cutting-a-rod-dp-13/)|通过将给定长度的棒切割成小块并根据给定的价格出售来最大化利润。|
|[硬币兑换问题](https://www.geeksforgeeks.org/coin-change-dp-7/)|确定使用一组给定面额的硬币对给定数量进行兑换的方法数量。|
|[编辑距离](https://www.geeksforgeeks.org/edit-distance-dp-5/)|查找将一个字符串转换为另一个字符串所需的最小操作数 （插入、删除、替换）。|
|[子集和问题](https://www.geeksforgeeks.org/subset-sum-problem-dp-25/)|确定是否存在具有给定总和的给定集的子集。|
|[最长回文子序列](https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/)|找到给定序列的最长子序列，即回文。|
|[最大子数组总和](https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/)|在给定的一维数组中查找具有最大和的连续子数组。|
|[分区等于子集和](https://www.geeksforgeeks.org/partition-set-k-subsets-equal-sum/)|确定是否可以将给定集划分为两个总和相等的子集。|
|[最低成本路径](https://www.geeksforgeeks.org/minimum-cost-path-left-right-bottom-moves-allowed/)|查找从给定网格的左上角到右下角的最低成本路径。|
|[最大 Product Subarray](https://www.geeksforgeeks.org/maximum-product-subarray/)|查找给定一维数组中具有最大乘积的连续子数组。|

相关文章：

- [制表 vs 记忆化](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
- [如何解决动态规划问题？](https://www.geeksforgeeks.org/solve-dynamic-programming-problem/)
- [动态规划教程](https://www.geeksforgeeks.org/introduction-to-dynamic-programming-data-structures-and-algorithm-tutorials/)
- [面试的 50 大动态规划编码问题](https://www.geeksforgeeks.org/top-50-dynamic-programming-coding-problems-for-interviews/)
- [动态规划算法的练习题](https://www.geeksforgeeks.org/explore?page=1&category[]=Dynamic%20Programming)

---

- [最长公共 Subsequence](https://www.geeksforgeeks.org/longest-common-subsequence/)
- [Bellman-Ford 算法](https://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/)
- [0-1 背包问题](https://www.geeksforgeeks.org/knapsack-problem/)




| 经典问题         | 动态规划 | Link                                                                                                                                                                                           |
| ------------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0-1 背包问题** | ✅    | [0-1 背包问题](https://www.geeksforgeeks.org/knapsack-problem/)【图文】                                                                                                                                |
| **部分背包问题**   | ❌    |                                                                                                                                                                                                |
| **旅行售货员问题**  | ❌    |                                                                                                                                                                                                |
| **最长公共子序列**  | ✅    | [最长公共 Subsequence](https://www.geeksforgeeks.org/longest-common-subsequence/)【**图文**】[LCS](https://visualgo.net/zh/suffixtree?slide=1)【**动画**】[LCS_2](https://visualgo.net/zh/suffixarray)【动画】 |
| **最小生成树**    | ❌    |                                                                                                                                                                                                |
| **单源最短路径**   | ❌    |                                                                                                                                                                                                |
| **八皇后问题**    | ❌    |                                                                                                                                                                                                |
| **装载问题**     | ❌    |                                                                                                                                                                                                |
| **批处理作业调度**  | ❌    |                                                                                                                                                                                                |
| **最大团问题**    | ❌    |                                                                                                                                                                                                |
| **装箱问题**     | ❌    |                                                                                                                                                                                                |


