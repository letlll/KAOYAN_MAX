---
title: "Top MCQs on Recursion Algorithm with Answers"
source: "https://www.geeksforgeeks.org/quizzes/top-mcqs-on-recursion-algorithm-with-answers/?page=3"
author:
  - "[[https://www.facebook.com/geeksforgeeks.org/]]"
  - "[[https://twitter.com/geeksforgeeks]]"
  - "[[https://www.linkedin.com/company/1299009]]"
  - "[[https://www.youtube.com/geeksforgeeksvideos/]]"
  - "[[GfG]]"
published: https://www.facebook.com/geeksforgeeks.org/, https://twitter.com/geeksforgeeks, https://www.linkedin.com/company/1299009, https://www.youtube.com/geeksforgeeksvideos/, 2013-03-06 - 01:24:14
created: 2024-11-10
description: "Top MCQs on Recursion Algorithm with Answers Quiz will help you to test and validate your DSA Quiz knowledge. It covers a variety of questions, from basic to advanced. The quiz contains 30 questions. You just have to assess all the given options and click on the correct answer."
tags:
  - "clippings"
---
1. **T (m) = T (3 m / 4) + 1 递归关系的解是什么？**

2. **给定以下函数定义：**

   ```c
   int f (int n) {
       if (n <= 1) return 1;
       else if (n % 2 == 0) return f(n/2);
       else return f(3n - 1);
   }
   ```

   假设可以将任意大的整数传递给该函数，考虑以下声明：

   1. 函数 f 对于有限多个不同的 n ≥ 1 终止。
   2. 函数 f 对于无限多个不同的 n ≥ 1 终止。
   3. 函数 f 对于有限多个不同的 n ≥ 1 不终止。
   4. 函数 f 对于无限多个不同的 n ≥ 1 不终止。

   哪个选项是正确的？

3. **以下 Java 程序输出什么？**

   ```java
   void f (int n) {
       if (n <= 1) {
           System.out.print(n);
       } else {
           f(n / 2);
           System.out.print(n % 2);
       }
   }
   ```

   当调用 `f(173)` 时，输出什么？

4. **以下程序的输出是什么？**

   ```cpp
   #include <stdio.h>
   void print(int n, int j) {
       if (j >= n) return;
       if (n - j > 0 && n - j >= j) 
           printf("%d %d\n", j, n - j);
       print(n, j + 1);
   }

   int main() {
       int n = 8;
       print(n, 1);
   }
   ```

5. **以下递归程序的名称是什么？**

   ```cpp
   void fun(int n, char from_rod, char to_rod, char aux_rod) {
       if (n == 0) {
           return;
       }
       fun(n - 1, from_rod, aux_rod, to_rod);
       cout << "Move disk " << n << " from rod " << from_rod 
            << " to rod " << to_rod << endl;
       fun(n - 1, aux_rod, to_rod, from_rod);
   }
   ```

6. **考虑以下二叉树，以下程序的输出是什么？**

   ```cpp
   void printInorder(struct Node* node) {
       if (node == NULL) return;
       printInorder(node->left);
       cout << node->data << " ";
       printInorder(node->right);
   }
   ```

7. **考虑以下程序，对于输入 `arr[] = {1, 2, 3, 4, 5, 6}`, `N=6`，输出是什么？**

   ```cpp
   int fun(int A[], int N) {
       if (N <= 0) return 0;
       return (fun(A, N - 1) + A[N - 1]);
   }
   ```

8. **考虑以下程序并找出问题所在：**

   ```cpp
   void fun2(int arr[], int start_index, int end_index) {
       if (start_index >= end_index) return;
       int min_index;
       int temp;
       min_index = minIndex(arr, start_index, end_index);
       swap(arr[start_index], arr[min_index]);
       fun2(arr, start_index + 1, end_index);
   }
   ```

   - 选择排序的递归实现
   - 冒泡排序的递归实现
   - 查找配对的递归实现

9. **将以下项与正确的选项配对：**

   | List 1      | List 2         |
   |-------------|----------------|
   | A. Recursion | 1. Sorted Array |
   | B. Binary Search | 2. Recursion |
   | C. Sorting | 3. Base case    |
   | D. Dynamic Programming | 4. O (NlogN) |

   哪一组匹配正确？

   - A – 2, B – 1, C – 4, D – 3
   - A – 3, B – 4, C – 1, D – 2
   - A – 3, B – 1, C – 4, D – 2
   - A – 2, B – 4, C – 1, D – 3

10. **考虑以下程序，执行的操作是什么？**

    ```cpp
    void fun(int arr[], int n) {
        if (n == 1) return;
        int count = 0;
        for (int i = 0; i < n - 1; i++)
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                count++;
            }
        return;
        fun(arr, n - 1);
    }
    ```

    - 插入排序递归实现
    - 选择排序递归实现

---

这些是经过翻译并整理后的选择题。如果你有更多问题，或者需要更详细的解答，随时告诉我！