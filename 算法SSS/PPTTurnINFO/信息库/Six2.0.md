### 第 7 章 分支限界法 (Branch and Bound Method)

分支限界法是一种系统地遍历所有可能的候选解决方案的算法设计策略，广泛应用于解决组合优化问题。本文将详细介绍分支限界法的基本思想、应用领域及其具体实现方法，包括旅行售货员问题、单源最短路问题、装载问题和批处理作业调度问题等。

---

#### 目录
1. [分支限界法的基本思想](#分支限界法的基本思想)
2. [旅行售货员问题](#旅行售货员问题)
3. [单源最短路问题](#单源最短路问题)
4. [装载问题](#装载问题)
5. [批处理作业调度问题](#批处理作业调度问题)
6. [最大全团问题](#最大全团问题)
7. [小结](#小结)

---

### 分支限界法的基本思想

分支限界法（Branch and Bound）是一种通过系统地分解问题空间来寻找最优解的算法设计策略。其核心思想包括：

1. **分支（Branching）**：将问题分解为若干子问题，形成一个解空间树。
2. **限界（Bounding）**：为每个子问题计算一个界限值，用于评估该子问题是否有可能包含最优解。
3. **剪枝（Pruning）**：根据限界值排除那些不可能包含最优解的子问题，从而减少计算量。

分支限界法常用于解决组合优化问题，如背包问题、旅行售货员问题、图的遍历等。

#### 分支限界法与其他搜索方法的不同

- **搜索方式不同**：分支限界法通常采用广度优先或最小耗费优先的方式搜索解空间树，而其他方法如深度优先搜索则不同。
- **启发式策略**：通过限界函数估算目标函数的潜在值，并根据这些值选择最有利的结点进行扩展，确保搜索过程朝着最优解的方向前进。

### 旅行售货员问题

#### 问题描述

旅行售货员问题（Traveling Salesman Problem, TSP）要求在给定的若干城市之间找到一条最短路径，使售货员从驻地出发，经过每个城市一次，最终回到驻地。该问题是一个典型的组合优化问题，广泛应用于物流、交通规划等领域。

#### 算法描述

1. **状态空间树的构建**：每个结点代表当前路径的一个状态，从根结点（起点）开始，每次扩展一个新的城市。
2. **限界函数的计算**：为每个结点计算当前路径的下界值，用于判断该路径是否可能成为最优解。
3. **优先队列的使用**：采用最小堆来管理活结点，优先扩展具有最小下界值的结点。
4. **剪枝策略**：一旦发现某条路径的下界值大于当前已知的最优解，则剪去该路径，避免不必要的计算。

#### 示例代码

以下是一个简化的分支限界法解决旅行售货员问题的Python示例：

```python
import heapq

def tsp_branch_and_bound(distance_matrix):
    n = len(distance_matrix)
    heap = []
    # 初始状态：从城市0出发，路径为[0]，当前费用为0，未访问城市为1到n-1
    initial_state = (0, [0], set(range(1, n)))
    heapq.heappush(heap, initial_state)
    best_cost = float('inf')
    best_path = []
    
    while heap:
        current_cost, path, remaining = heapq.heappop(heap)
        if not remaining:
            total_cost = current_cost + distance_matrix[path[-1]][0]
            if total_cost < best_cost:
                best_cost = total_cost
                best_path = path + [0]
            continue
        for city in remaining:
            new_cost = current_cost + distance_matrix[path[-1]][city]
            if new_cost < best_cost:
                new_path = path + [city]
                new_remaining = remaining.copy()
                new_remaining.remove(city)
                heapq.heappush(heap, (new_cost, new_path, new_remaining))
    
    return best_cost, best_path

# 示例使用
distance_matrix = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]

cost, path = tsp_branch_and_bound(distance_matrix)
print(f"最短路径成本: {cost}")
print(f"最短路径: {' -> '.join(map(str, path))}")
```

**代码说明**：

- 使用优先队列（最小堆）管理活结点，确保每次扩展的都是当前成本最低的路径。
- 当所有城市都被访问后，计算回到起点的总成本，并更新最优解。
- 通过剪枝策略避免扩展那些成本已经超过当前最优解的路径。

### 单源最短路问题

#### 问题描述

在一个有向图中，每条边都有一个非负权值，要求找到从源点到目标点之间的最短路径。这是图论中的经典问题，广泛应用于网络路由、交通规划等领域。

#### 算法思想

采用优先队列式分支限界法，通过维护一个最小堆来存储活结点，优先扩展当前路径成本最小的结点。具体步骤如下：

1. **初始化**：将源点加入优先队列，初始路径长度为0。
2. **扩展结点**：从优先队列中取出路径长度最小的结点，扩展其所有相邻结点。
3. **更新路径**：如果通过当前结点到达某个相邻结点的路径长度小于已知的最短路径，则更新该路径并将新的结点加入优先队列。
4. **终止条件**：当目标结点被扩展时，当前路径长度即为最短路径长度。

#### 示例代码

以下是使用分支限界法解决单源最短路问题的Python示例：

```python
import heapq

def dijkstra_branch_and_bound(graph, start, end):
    heap = []
    heapq.heappush(heap, (0, start, [start]))
    visited = {}
    best_cost = float('inf')
    best_path = []
    
    while heap:
        current_cost, current_node, path = heapq.heappop(heap)
        if current_node == end:
            if current_cost < best_cost:
                best_cost = current_cost
                best_path = path
            continue
        if current_node in visited and visited[current_node] <= current_cost:
            continue
        visited[current_node] = current_cost
        for neighbor, weight in graph[current_node]:
            total_cost = current_cost + weight
            if total_cost < best_cost:
                heapq.heappush(heap, (total_cost, neighbor, path + [neighbor]))
    
    return best_cost, best_path

# 示例使用
graph = {
    0: [(1, 10), (2, 3)],
    1: [(2, 1), (3, 2)],
    2: [(1, 4), (3, 8), (4, 2)],
    3: [(4, 7)],
    4: [(3, 9)]
}

cost, path = dijkstra_branch_and_bound(graph, 0, 4)
print(f"最短路径成本: {cost}")
print(f"最短路径: {' -> '.join(map(str, path))}")
```

**代码说明**：

- 使用最小堆管理活结点，确保每次扩展的都是当前路径成本最低的结点。
- 使用`visited`字典记录已访问结点的最小成本，避免重复扩展。
- 当目标结点被扩展时，当前路径即为最短路径。

### 装载问题

#### 问题描述

有一批集装箱需要装载到两艘轮船上，轮船的载重分别为 \( C_1 \) 和 \( C_2 \)。每个集装箱有一个重量 \( W_i \)。装载问题要求确定是否存在一种装载方案，可以将所有集装箱装载到两艘轮船上，并找出一种合理的装载方案。

#### 算法思想

装载问题可以看作是一个特殊的0-1背包问题。采用分支限界法，通过搜索所有可能的装载组合，并使用限界函数剪枝，减少不必要的计算。具体步骤如下：

1. **状态空间树的构建**：每个结点表示一个装载状态，左子树表示将当前集装箱装上第一艘轮船，右子树表示将其装上第二艘轮船。
2. **限界函数的计算**：计算当前装载状态下的剩余容量和已装载的重量，判断是否可能达到更优的装载方案。
3. **剪枝策略**：如果当前状态无法超过已知的最优解，则剪去该路径。

#### 示例代码

以下是使用分支限界法解决装载问题的Python示例：

```python
import heapq

def knapsack_branch_and_bound(weights, C1, C2):
    n = len(weights)
    heap = []
    # 初始状态：索引0，装载重量0，装载到C1，装载到C2
    initial_state = (0, 0, 0, 0)
    heapq.heappush(heap, initial_state)
    best = 0
    best_assignment = []
    
    while heap:
        index, load1, load2, current = heapq.heappop(heap)
        if index == n:
            if current > best:
                best = current
                best_assignment = (load1, load2)
            continue
        # 尝试将当前集装箱装到C1
        if load1 + weights[index] <= C1:
            heapq.heappush(heap, (index + 1, load1 + weights[index], load2, current + weights[index]))
        # 尝试将当前集装箱装到C2
        if load2 + weights[index] <= C2:
            heapq.heappush(heap, (index + 1, load1, load2 + weights[index], current + weights[index]))
    
    return best, best_assignment

# 示例使用
weights = [16, 15, 15]
C1 = 30
C2 = 30
best_load, assignment = knapsack_branch_and_bound(weights, C1, C2)
print(f"最优装载重量: {best_load}")
print(f"装载方案: 轮船1载重 {assignment[0]}, 轮船2载重 {assignment[1]}")
```

**代码说明**：

- 使用最小堆管理活结点，确保每次扩展的都是当前装载重量最高的状态。
- 尝试将每个集装箱装载到两艘轮船中的任意一艘，并更新最优装载方案。
- 通过限界函数（当前装载重量）进行剪枝，避免不必要的路径扩展。

### 批处理作业调度问题

#### 问题描述

给定一组作业，每个作业需要在两台机器上处理，且必须先在机器1上处理，再在机器2上处理。每个作业在机器1和机器2上的处理时间分别为 \( p_{i1} \) 和 \( p_{i2} \)。目标是安排这些作业的顺序，使得所有作业在机器2上完成处理的总完成时间最小。

#### 算法思想

采用分支限界法，通过构建状态空间树来搜索所有可能的作业顺序，并使用限界函数剪枝，减少计算量。具体步骤如下：

1. **状态空间树的构建**：每个结点表示一个部分排序的作业顺序。
2. **限界函数的计算**：估算当前部分排序下的最小完成时间下界，用于判断是否继续扩展。
3. **剪枝策略**：如果当前状态的下界大于已知的最优解，则剪去该路径。

#### 示例代码

以下是使用分支限界法解决批处理作业调度问题的Python示例：

```python
import heapq

def job_scheduling_branch_and_bound(p1, p2):
    n = len(p1)
    jobs = list(range(n))
    heap = []
    # 初始状态：完成时间机器1和机器2均为0，未安排任何作业
    initial_state = (0, 0, [], set(jobs))
    heapq.heappush(heap, initial_state)
    best_completion = float('inf')
    best_order = []
    
    while heap:
        current_p1, current_p2, order, remaining = heapq.heappop(heap)
        if not remaining:
            if current_p2 < best_completion:
                best_completion = current_p2
                best_order = order
            continue
        for job in remaining:
            new_p1 = current_p1 + p1[job]
            new_p2 = max(new_p1, current_p2) + p2[job]
            if new_p2 < best_completion:
                new_order = order + [job]
                new_remaining = remaining.copy()
                new_remaining.remove(job)
                heapq.heappush(heap, (new_p1, new_p2, new_order, new_remaining))
    
    return best_completion, best_order

# 示例使用
p1 = [3, 2, 2]
p2 = [2, 1, 4]
completion_time, order = job_scheduling_branch_and_bound(p1, p2)
print(f"最优完成时间: {completion_time}")
print(f"最优作业顺序: {order}")
```

**代码说明**：

- 使用最小堆管理活结点，确保每次扩展的都是当前完成时间最小的状态。
- 通过遍历所有可能的作业顺序，寻找最优的作业调度方案。
- 使用限界函数（当前完成时间）进行剪枝，避免不必要的路径扩展。

### 最大全团问题

#### 问题描述

在一个无向图中，团（Clique）是一个完全子图，即图中的每两个顶点之间都有一条边。最大全团问题（Maximum Clique Problem）要求找到图中包含最多顶点的团。

#### 算法思想

采用分支限界法，通过构建状态空间树来搜索所有可能的团，并使用限界函数剪枝，减少计算量。具体步骤如下：

1. **状态空间树的构建**：每个结点表示当前团的一个状态。
2. **限界函数的计算**：估算当前状态下的团的最大可能大小，用于判断是否继续扩展。
3. **剪枝策略**：如果当前状态的下界加上剩余未考虑的顶点数小于已知的最优团大小，则剪去该路径。

#### 示例代码

以下是使用分支限界法解决最大全团问题的Python示例：

```python
import heapq

def maximum_clique_branch_and_bound(graph):
    n = len(graph)
    best_clique = []
    
    def is_clique(clique, vertex):
        return all(vertex in graph[u] for u in clique)
    
    heap = []
    # 初始状态：空团，未考虑任何顶点
    initial_state = (0, [])
    heapq.heappush(heap, initial_state)
    
    while heap:
        current_size, clique = heapq.heappop(heap)
        # 更新最优团
        if current_size > len(best_clique):
            best_clique = clique
        # 尝试添加未考虑的顶点
        for vertex in range(n):
            if vertex not in clique and is_clique(clique, vertex):
                new_clique = clique + [vertex]
                new_size = current_size + 1
                # 计算限界
                remaining = set(range(vertex + 1, n))
                upper_bound = new_size + len([v for v in remaining if is_clique(new_clique, v)])
                if upper_bound > len(best_clique):
                    heapq.heappush(heap, (new_size, new_clique))
    
    return best_clique

# 示例使用
graph = {
    0: {1, 2},
    1: {0, 2, 3},
    2: {0, 1, 3},
    3: {1, 2}
}

clique = maximum_clique_branch_and_bound(graph)
print(f"最大全团顶点: {clique}")
```

**代码说明**：

- 使用最小堆管理活结点，确保每次扩展的都是当前团大小最大的状态。
- 通过检查每个新增顶点是否与当前团中的所有顶点相连，确保新团的有效性。
- 使用限界函数（当前团大小加上可能加入的顶点数）进行剪枝，避免不必要的路径扩展。

### 小结

分支限界法是一种高效的算法设计策略，适用于解决多种组合优化问题。通过系统地构建状态空间树，并结合限界函数和剪枝策略，分支限界法能够在保证找到最优解的前提下，显著减少计算量。理解分支限界法的基本思想和具体应用，对于应对复杂的算法问题具有重要意义。

如需进一步了解分支限界法的具体应用或实现细节，建议参考相关算法书籍或在线资源。