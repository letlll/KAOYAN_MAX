---
title: "最小生成树: Kruskal 算法, Prim 算法"
source: "https://zhuanlan.zhihu.com/p/690233107"
author:
  - "[[知乎专栏]]"
published:
created: 2024-11-09
description: "寻找图的最小生成树是相当重要的一个图算法。 本文前置知识： 并查集 Drew：并查集：等价类、连通分支什么是最小生成树？最小生成树（Minimum Spanning Tree, MST）是一个连通图的生成树中，边的权值之和最小的生…"
tags:
  - "clippings"
---
寻找图的最小生成树是相当重要的一个图算法。

本文前置知识：`并查集` [Drew：并查集：等价类、连通分支](https://zhuanlan.zhihu.com/p/690241684)

## 什么是最小生成树？

最小生成树（Minimum Spanning Tree, MST）是一个连通图的生成树中，边的权值之和最小的生成树。换句话说，最小生成树是连接图中所有顶点的一棵无环子图，且权值之和最小。

具体来说，最小生成树的定义包括以下几点：

1. 连通性：生成树必须是原图中的一棵树，也就是说，它必须是无环的连通子图。
2. 包含所有顶点：生成树必须包含原图中的所有顶点，即生成树必须是原图的连通子图。
3. 权值最小：生成树的边的权值之和必须尽可能小。

因此，找到最小生成树的问题可以形式化为，在给定带权连通图的情况下，找到一棵树，使得这棵树包含了图中的所有顶点，并且树的边权值之和最小。

## 怎么寻找最小生成树？

我们主要的思路就是，不断找权值最小的边，这是一个贪心的过程，那我们具体有那些思路呢？

我们先从权值下手，看到权值我们就想到了边，这个基于边来做贪心的算法叫做 Kruskal 算法。

### 1\. 克鲁斯卡尔算法

其实我们怎么讲都没有用，直接上**伪代码**来解释思想是最合适的

我们首先需要找出所有的边，并将其存入一个列表中，并依照权值进行排序操作。在这里，我用一个元组来表示边，其组成规则是`(out_idx, in_idx, weight)`

```python
function Kruskal(graph):
    edges = []
    for i from 0 to length(graph) - 1:
        for j from i + 1 to length(graph) - 1:
            if graph[i][j] != infinity:
                edges.append((i, j, graph[i][j])) 
    edges.sort by weight        
...           
```

随后我们构造一个并查集来进行存储每一个节点，因为我直接以下标代指元素，所以操作更加方便了。

我们按照顺序遍历先前构造好的每一个边元组，当我们查找到 out 节点和 in 节点不在一个集合的时候，我们就将这个边加入到 mst 中，同时将这两个节点合并到同一个集合中。

最后，当 mst 的长度等于原图的长度的时候，我们就找到了最小生成树。

```python
... function Kruskal(graph): ... 
    mst = []
    uf = UnionFindSet([i for i from 0 to length(graph) - 1])
    
    for each edge in edges:
        u, v, weight = edge
        if uf.find(u) != uf.find(v):
            mst.append(edge)
            uf.union(u, v)
        if length(mst) == length(graph):
            break

    return mst
```

总结伪代码如下：

```text
1. 找出所有的边，并依照权值进行排序操作。
2. 构造一个并查集来进行存储每一个节点。
3. 按照顺序遍历先前构造好的每一个边元组，当我们查找到 out 节点和 in 节点不在一个集合的时候，我们就将这个边加入到 mst 中，同时将这两个节点合并到同一个集合中。
4. 循环操作3
```

**注意，因为边是按权值升序排列的，所以我们在后续遍历的时候，自动满足了贪心策略。**

最后，实际代码如下：

```python
def kruskal(graph: List[List[float]]) -> List[Tuple[float]]:
    edges = []
    for i in range(len(graph)):
        for j in range(i + 1, len(graph)):
            if graph[i][j] != inf:
                edges.append((i, j, graph[i][j])) 
    edges.sort(key=lambda x: x[2])                
    
    mst = []
    uf = uf_set([i for i in range(len(graph))])
    
    for edge in edges:
        u, v, weight = edge
        if uf.find(u) != uf.find(v):
            mst.append(edge)
            uf.union(uf.find(u), uf.find(v))
        if len(mst) == len(graph):
            break

    return mst
```

测试代码：

```python
if __name__ == '__main__': 
    G1 = [
        [0,34,46,inf,inf,19],
        [34,0,inf,inf,12,inf],
        [46,inf,0,17,inf,25],
        [inf,inf,17,0,38,25],
        [inf,12,inf,38,0,26],
        [19,inf,25,25,26,0]
    ]
    G2 = [
        [0,3,3,7],
        [3,0,4,2],
        [3,2,0,6],
        [7,4,6,0]
    ]
    print('Kruskal:', kruskal(G1), kruskal(G2), sep='\n')
```

输出结果：

```bash
Kruskal:
[(1, 4, 12), (2, 3, 17), (0, 5, 19), (2, 5, 25), (4, 5, 26)]
[(1, 3, 2), (0, 1, 3), (0, 2, 3)]
```

### 2\. Prim 算法

刚刚我们提到了，寻找最小生成树的过程是一个贪心选边的过程，Kruskal是比较直觉的选择方式，即对边排序依次选择，利用并查集来合并等价类。

Prim 算法则不一样，它并不是对边排序，而是对顶点操作，借助顶点的关联边的权值来实现贪心过程。

还是那句话，先上伪代码。

```python
function prim(graph, start_idx):
    cache = [start_idx]
    mst = []

    while length(cache) < length(graph):
        min_weight = infinity
        out_idx, in_idx = -1, -1
        
        for cursor in cache:
            for idx from 0 to length(graph[cursor]) - 1:
                temp = graph[cursor][idx]
                if temp < min_weight and temp < infinity and temp > 0 and idx not in cache:
                    min_weight, out_idx, in_idx = temp, cursor, idx
        
        cache.append(in_idx)
        mst.append((out_idx, in_idx, min_weight))
        
    return mst
```

Prim 算法因为是对顶点操作，因此我们多维护一个cache列表用来存储所有已经访问过的顶点。cache在最开始的时候也需要把我们的指定的的起始顶点加入进去。

随后，我们开始加入顶点，并向mst中加入边。具体操作是，我们每次从cache中取出游标顶点cursor，再针对cursor在邻接矩阵graph中寻找其相连边temp。

如果temp小于min\_weight并且temp小于无穷大并且temp大于0并且temp不在cache中，我们就更新min\_weight，out\_idx，in\_idx为相应值。

完成所有遍历后，我们将in\_idx加入到cache中，同时将边元组加入到mst中。

总结一下伪代码：

```bash
 1.将起始点(A)添加到已经连接的点 cache
 2.遍历 cache 每一个顶点的每一条边（这个边能指向 cache 中的值），
   找到最小的边，添加到 cache 中
 3.循环步骤 2, 直到 cache 中包含所有的顶点。
```

实际代码如下：

```python
def prim(graph: List[List[int]], start_idx: int) -> List[Tuple[int]]:
    cache, mst = [], []
    cache.append(start_idx)
    
    while len(cache) < len(graph):
        min_weight = inf
        out_idx, in_idx = -1, -1
        for cursor in cache:
            for idx in range(len(graph[cursor])):
                temp = graph[cursor][idx]
                if temp < min_weight and temp < inf and \
                   temp > 0 and idx not in cache:
                    min_weight, out_idx, in_idx = temp, cursor, idx
        cache.append(in_idx)
        mst.append((out_idx, in_idx, min_weight))
        
    return mst
```

测试代码：

```python
if __name__ == '__main__': 
    G1 = [
        [0,34,46,inf,inf,19],
        [34,0,inf,inf,12,inf],
        [46,inf,0,17,inf,25],
        [inf,inf,17,0,38,25],
        [inf,12,inf,38,0,26],
        [19,inf,25,25,26,0]
    ]
    G2 = [
        [0,3,3,7],
        [3,0,4,2],
        [3,2,0,6],
        [7,4,6,0]
    ]
    print('Prim:', prim(G1, 0), prim(G2, 0), sep='\n')
```

运行结果如下

```bash
Prim:
[(0, 5, 19), (5, 2, 25), (2, 3, 17), (5, 4, 26), (4, 1, 12)]
[(0, 1, 3), (1, 3, 2), (0, 2, 3)]
```

## 总结

我们从运行结果可以看到，两者功能基本是一样的，其唯一的区别在于，边的顺序和出入节点的顺序有所区别，Kruskal的顺序严格按照权重升序排列，而Prim的顺序是按照顶点依次前后相连的。

原因也在于，Kruskal 是基于边的贪心，因此是权重升序传递的；而 Prim 是基于顶点的贪心，是顶点边严格前后相连传递的。

> 本文使用 [Zhihu On VSCode](https://zhuanlan.zhihu.com/p/106057556) 创作并发布