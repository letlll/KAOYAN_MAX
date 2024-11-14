---
media: https://www.bilibili.com/video/BV1CK4y1x7L5/
---

- ![13.9 回溯法例5-01背包问题|450](assets/13.9%20回溯法例5-01背包问题DT0S.webp) [00:00](https://www.bilibili.com/video/BV1CK4y1x7L5/) 

---


- ![13.9 回溯法例5-01背包问题 - 02:56|450](assets/13.9%20回溯法例5-01背包问题PT2M56.384S.webp) [02:56](https://www.bilibili.com/video/BV1CK4y1x7L5/?t=176.383817#t=02:56.38) 


- ![13.9 回溯法例5-01背包问题 - 07:09|450](assets/13.9%20回溯法例5-01背包问题PT7M9.958S.webp) [07:09](https://www.bilibili.com/video/BV1CK4y1x7L5/?t=429.95825#t=07:09.96) 

- 

---


好的！下面我将用 Python 伪代码逐步解释 **回溯法** 解 **0-1 背包问题**，并逐步说明每个步骤。

### 0-1 背包问题

给定 `n` 个物品，每个物品有一个重量 `w[i]` 和价值 `v[i]`，背包的最大容量为 `C`。我们希望通过选择若干物品放入背包，使得背包内物品的总重量不超过 `C`，并且总价值尽可能大。

### 回溯法解 0-1 背包问题的伪代码

首先，我们定义一个函数 `backtrack(i, C, current_value, current_weight)` 来解决问题，其中：

- `i` 表示当前考虑的物品编号
- `C` 表示剩余的背包容量
- `current_value` 表示当前背包的价值
- `current_weight` 表示当前背包的重量

我们通过递归遍历所有可能的选择（选或不选当前物品）来求解。

### 伪代码框架

```python
# 输入：物品的重量 weight[]，物品的价值 value[]，背包的最大容量 C，物品数量 n
def backtrack(i, C, current_value, current_weight):
    # 1. 递归的终止条件
    if i == n:  # 如果已经处理完所有物品
        return current_value  # 返回当前的总价值

    # 2. 不选择当前物品
    value_without_current = backtrack(i + 1, C, current_value, current_weight)

    # 3. 选择当前物品（前提是背包容量允许）
    value_with_current = -float('inf')  # 如果当前物品不能放入背包，设置一个非常小的值
    if current_weight + weight[i] <= C:  # 如果当前物品可以放入背包
        value_with_current = backtrack(i + 1, C, current_value + value[i], current_weight + weight[i])

    # 4. 返回选择当前物品和不选择当前物品中的最大值
    return max(value_without_current, value_with_current)

# 主函数调用回溯函数
result = backtrack(0, C, 0, 0)  # 从第一个物品开始，背包容量为 C，当前总价值为 0，当前重量为 0
print(result)  # 输出最大价值
```

### 伪代码解释

#### 1. 递归终止条件
```python
if i == n:
    return current_value
```
- 这是递归的结束条件。当我们已经考虑完所有的物品（`i == n`），就返回当前背包的价值 `current_value`。这个值即为当前路径下背包中所有物品的总价值。

#### 2. 不选择当前物品
```python
value_without_current = backtrack(i + 1, C, current_value, current_weight)
```
- 在这一步，我们尝试**不选择当前物品**，直接递归到下一个物品。这相当于探索背包的“当前状态”下，不选当前物品的情形。

#### 3. 选择当前物品
```python
value_with_current = -float('inf')  # 初始值为非常小，表示不选择当前物品时的状态
if current_weight + weight[i] <= C:
    value_with_current = backtrack(i + 1, C, current_value + value[i], current_weight + weight[i])
```
- 如果当前物品的重量加上已选物品的重量不会超过背包的容量 `C`，则我们可以**选择当前物品**。
- 选择当前物品后，我们递归到下一个物品，同时更新当前背包的价值和重量。

#### 4. 返回最优解
```python
return max(value_without_current, value_with_current)
```
- 我们计算**选择当前物品**和**不选择当前物品**的最大价值，返回这个最大值。

### 示例解析

假设有 `n = 4` 个物品，每个物品的重量和价值如下：

| 物品 | 重量 `w[i]` | 价值 `v[i]` |
|------|-------------|-------------|
| 物品 1 | 2           | 3           |
| 物品 2 | 3           | 4           |
| 物品 3 | 4           | 5           |
| 物品 4 | 5           | 8           |

背包的容量 `C = 5`。

#### 步骤 1：调用 `backtrack(0, 5, 0, 0)`
我们从物品 1 开始，背包容量为 5，当前价值为 0，当前重量为 0。

#### 步骤 2：递归分支
- **选择物品 1**（重量 2，价值 3）：更新当前重量为 2，当前价值为 3，剩余背包容量为 `5 - 2 = 3`，递归到 `backtrack(1, 3, 3, 2)`。
- **不选择物品 1**：递归到 `backtrack(1, 5, 0, 0)`。

#### 步骤 3：处理物品 2（重量 3，价值 4）
假设选择了物品 1（`current_weight = 2`，`current_value = 3`）：

- **选择物品 2**（重量 3，价值 4）：更新当前重量为 `2 + 3 = 5`，当前价值为 `3 + 4 = 7`，剩余容量为 `5 - 3 = 2`，递归到 `backtrack(2, 2, 7, 5)`。
- **不选择物品 2**：递归到 `backtrack(2, 3, 3, 2)`。

#### 步骤 4：处理物品 3（重量 4，价值 5）
在考虑物品 3 时，假设已经选择了物品 1 和物品 2：

- **选择物品 3**（重量 4，价值 5）：此时背包已满，无法再放入物品 3。
- **不选择物品 3**：递归到 `backtrack(3, 2, 7, 5)`。

#### 步骤 5：递归回溯
最后，在递归的过程中，回溯到每个节点，并不断比较选择和不选择当前物品的结果，最终得到背包的最大价值。

### 最终结果

经过回溯，我们会得到背包的最大价值：**7**，这对应的是选择物品 1 和物品 2。

### 关键点总结

1. **回溯的核心**：从根节点出发，逐步探索每个决策的可能性（选择或不选择），然后回溯到上一层，尝试其他选择。
2. **剪枝**：通过检查当前物品是否能放入背包来避免无效选择。
3. **终止条件**：递归到最后一层（所有物品都已考虑完）时返回当前的解。

通过上述步骤，回溯法能够逐步探索出 **0-1 背包问题**的最优解。