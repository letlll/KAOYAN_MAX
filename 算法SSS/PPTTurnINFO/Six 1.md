### 第7章 分支限界法与典型问题

#### 1. 分支限界法的基本思想

分支限界法是一种用于解决**最优化问题**的系统性搜索算法，类似于回溯法，但它通过评估每个节点的解空间进行搜索并动态地剪枝。它不仅考虑当前的搜索路径，还通过评估函数（**限界函数**）估算从当前节点延伸的子树是否能产生最优解。基于这些评估，分支限界法能够有效地裁剪掉一些不可能产生最优解的路径，从而提高搜索效率。

- **回溯法**：通常采用深度优先搜索（DFS），适用于所有解都需要探索的场景。
- **分支限界法**：多采用广度优先搜索（BFS）或最小代价优先搜索（类似于贪心策略），每次优先扩展具有最大可能产生最优解的节点。

#### 2. 分支限界法的基本操作

1. **分支**：在扩展当前节点时，生成它的所有子节点。
2. **限界**：每个活结点都会计算一个估值（例如通过限界函数）。估值代表该结点及其子树中可能出现的最优值。

例如，在背包问题中，限界值可以通过当前背包重量以及剩余空间的最大可能收益来计算。这个限界值决定了是否继续扩展该节点。

3. **节点选择**：在所有活结点中，选择当前估值最有利的节点进行扩展。分支限界法常通过优先队列（基于估值的排序）来管理活结点。

#### 3. 典型问题与应用

##### 3.1 0-1 背包问题

**问题描述**：给定n种物品，每个物品有重量和价值，背包有最大容量c。需要选择部分物品使得总重量不超过c，总价值最大化。

**解法**：利用分支限界法，采用优先队列式搜索解空间。每次计算限界函数来估算剩余可选物品能带来的最大价值，如果当前节点的限界值小于已知的最优解，则跳过该节点，避免进一步搜索。

```java
public void knapsackBranchAndBound(int[] w, int[] p, int n, int c) {
    PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingDouble(Node::getBound));
    Node root = new Node(0, 0, 0, bound(0, 0, w, p, c));
    pq.add(root);
    while (!pq.isEmpty()) {
        Node node = pq.poll();
        if (node.bound > bestValue && node.level < n) {
            // 处理左子树（选择物品）
            int newWeight = node.weight + w[node.level];
            if (newWeight <= c) {
                int newValue = node.value + p[node.level];
                bestValue = Math.max(bestValue, newValue);
                pq.add(new Node(newWeight, newValue, node.level + 1, bound(newWeight, newValue, w, p, c)));
            }
            // 处理右子树（不选择物品）
            pq.add(new Node(node.weight, node.value, node.level + 1, bound(node.weight, node.value, w, p, c)));
        }
    }
}
```

##### 3.2 旅行售货员问题 (TSP)

**问题描述**：给定n个城市以及它们之间的距离，要求从某个城市出发，经过每个城市一次并返回出发城市，找到总路程最短的路径。

**解法**：使用分支限界法，先生成问题的解空间树。每个结点代表一个部分路径，通过限界函数计算出从当前路径延伸的最小可能路程。如果某个节点的下界值已经大于当前已知的最短路径，则跳过该节点。

```java
public void tspBranchAndBound(int[][] distances, int n) {
    PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingDouble(Node::getBound));
    Node root = new Node(0, 0, new ArrayList<>(List.of(0)), boundTSP(0, distances, n));
    pq.add(root);
    while (!pq.isEmpty()) {
        Node node = pq.poll();
        if (node.bound < bestCost && node.level < n - 1) {
            for (int i = 1; i < n; i++) {
                if (!node.path.contains(i)) {
                    List<Integer> newPath = new ArrayList<>(node.path);
                    newPath.add(i);
                    pq.add(new Node(node.cost + distances[node.path.get(node.level)][i], node.level + 1, newPath, boundTSP(node.cost, distances, n)));
                }
            }
        }
    }
}
```

##### 3.3 单源最短路径问题

**问题描述**：在一个有向图中，每条边都有一个非负权重，求从某个源点到所有其他顶点的最短路径。

**解法**：采用分支限界法，通过优先队列存储每个结点的当前路径长度，每次选择路径长度最小的节点进行扩展。

```java
public void dijkstraBranchAndBound(int[][] graph, int src, int n) {
    PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingDouble(Node::getBound));
    Node root = new Node(src, 0);
    pq.add(root);
    while (!pq.isEmpty()) {
        Node node = pq.poll();
        if (!visited[node.index]) {
            visited[node.index] = true;
            for (int i = 0; i < n; i++) {
                if (graph[node.index][i] > 0) {
                    pq.add(new Node(i, node.cost + graph[node.index][i]));
                }
            }
        }
    }
}
```

#### 4. 分支限界法的优势与劣势

- **优势**：
  - 能够通过限界函数有效减少不必要的搜索，适合处理较大规模的最优化问题。
  - 使用优先队列，搜索路径是按照优先级扩展的，能够更快找到最优解。
  
- **劣势**：
  - 依赖限界函数的设计，若限界函数不够准确，可能无法高效剪枝。
  - 对于某些复杂问题，尽管进行了剪枝，但时间复杂度仍可能较高。

#### 5. 总结

分支限界法通过使用限界函数和优先队列进行有选择的广度优先搜索，能有效提高组合优化问题的求解效率。通过减少搜索空间和避免无效路径，分支限界法能够解决如0-1背包问题、旅行售货员问题和单源最短路径问题等经典问题，是解决大型最优化问题的重要工具。