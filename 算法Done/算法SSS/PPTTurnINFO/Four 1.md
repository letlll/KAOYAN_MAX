### 第4章 贪心算法

#### 1. 概念简介

贪心算法的核心思想是，在每一步都做出当前看来最优的选择，即所谓的“贪心选择”。这种算法并不一定从全局考虑，它只关心局部的最优解，并希望通过一系列的局部最优选择最终得到全局最优解。

但需要注意的是，贪心算法并不能保证所有问题都能得到全局最优解，只有在某些问题中，贪心选择才能保证最终的全局最优。例如，经典的最小生成树问题、单源最短路径问题都能通过贪心算法得到最优解。

#### 2. 贪心算法的关键要素

贪心算法主要依赖于两个重要性质：

1. **贪心选择性质**：通过一系列局部最优选择，可以构成问题的全局最优解。
2. **最优子结构性质**：一个问题的最优解包含其子问题的最优解，即当一个问题的最优解能够分解为多个子问题的最优解时，它具有最优子结构。

这些性质使得贪心算法能够通过逐步构建解来解决问题。

#### 3. 贪心算法的经典应用

以下是几个典型的贪心算法应用问题：

##### 3.1 活动安排问题

**问题描述**：给定一组活动，每个活动都有开始时间和结束时间，需要选择尽可能多的互不冲突的活动。

**贪心策略**：每次选择结束时间最早且与已选活动不冲突的活动，以便为后续活动保留更多的时间。

```java
public static int greedySelector(int[] s, int[] f, boolean[] a) {
    int n = s.length - 1;
    a[1] = true; // 第一个活动总是被选择
    int j = 1;   // 上一个被选择的活动
    int count = 1; // 选择的活动数

    for (int i = 2; i <= n; i++) {
        if (s[i] >= f[j]) { // 当前活动与上一个活动相容
            a[i] = true;    // 选择当前活动
            j = i;          // 更新上一个活动为当前活动
            count++;
        } else {
            a[i] = false;   // 不选择当前活动
        }
    }
    return count;
}
```

##### 3.2 背包问题

**问题描述**：有一组物品，每个物品有重量和价值，目标是尽可能装入价值最高的物品，使得总重量不超过背包的容量。

**贪心策略**：首先按单位重量价值排序，优先选择单位价值最高的物品，直到背包装满。

```java
public static float knapsack(float c, float[] w, float[] v, float[] x) {
    int n = v.length;
    Element[] d = new Element[n];
    for (int i = 0; i < n; i++) d[i] = new Element(w[i], v[i], i);
    Arrays.sort(d, Comparator.comparingDouble(o -> -o.value / o.weight));

    float opt = 0;
    for (int i = 0; i < n; i++) x[i] = 0;
    for (int i = 0; i < n; i++) {
        if (d[i].weight > c) break;
        x[d[i].index] = 1;
        opt += d[i].value;
        c -= d[i].weight;
    }
    if (i < n) {
        x[d[i].index] = c / d[i].weight;
        opt += x[d[i].index] * d[i].value;
    }
    return opt;
}
```

##### 3.3 哈夫曼编码

**问题描述**：在数据压缩中，哈夫曼编码用于给出现频率高的字符分配较短的编码，频率低的字符分配较长的编码，以最小化编码总长度。

**贪心策略**：每次选择频率最低的两个字符合并，直到所有字符合并为一棵二叉树。

##### 3.4 单源最短路径问题

**问题描述**：给定一个带权图和一个起点，求该点到所有其他点的最短路径。

**Dijkstra算法**：每次选择距离起点最近的未访问节点，并更新其他节点的最短路径。

```java
public static void dijkstra(int[][] graph, int src) {
    int V = graph.length;
    int[] dist = new int[V]; // 源节点到每个节点的最短距离
    boolean[] sptSet = new boolean[V]; // 最短路径树集合

    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    printSolution(dist);
}
```

#### 4. 贪心算法的局限性

虽然贪心算法在很多情况下能够有效地找到最优解，但它并不能保证对所有问题都适用。例如，经典的 **货郎担问题**（旅行商问题）和 **0-1背包问题** 都不适合贪心算法，因为局部最优解并不能保证全局最优。

#### 5. 贪心算法的设计方法

在设计贪心算法时，必须确保问题具有 **贪心选择性质** 和 **最优子结构性质**。这两个性质是贪心算法得以奏效的关键。贪心算法通常通过迭代构建解，每次做出当前最优的局部选择，直至得到最终解。

#### 总结

贪心算法以快速、局部优化的方式解决问题，它的优点是效率高，适合解决一些特定的优化问题。然而，贪心算法并非万能，它的应用必须满足特定条件。在某些情况下，贪心算法可能只能得到次优解，而不是全局最优解。