---
title: "Top MCQs on Recursion Algorithm with Answers"
source: "https://www.geeksforgeeks.org/quizzes/top-mcqs-on-recursion-algorithm-with-answers/?page=1"
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
### 翻译和整理后的选择题

1. **预测以下程序的输出：**

   ```c
   #include <stdio.h>
   int fun(int n) {
       if (n == 4) return n;
       else return 2 * fun(n + 1);
   }
   int main() {
       printf("%d", fun(2));
       return 0;
   }
   ```

2. **考虑以下递归函数 `fun(x, y)`。`fun(4, 3)` 的值是多少？**

   ```c
   int fun(int x, int y) {
       if (x == 0) return y;
       return fun(x - 1, x + y);
   }
   ```

3. **以下函数对 `n = 25` 的输出是什么？**

   ```c
   void fun(int n) {
       if (n == 0) return;
       printf("%d", n % 2);
       fun(n / 2);
   }
   ```

4. **以下函数执行的操作是什么？**

   ```c
   int fun(int x, int y) {
       if (y == 0) return 0;
       return (x + fun(x, y - 1));
   }
   ```

5. **`fun2()` 一般执行什么操作？**

   ```c
   int fun(int x, int y) {
       if (y == 0) return 0;
       return (x + fun(x, y - 1));
   }
   int fun2(int a, int b) {
       if (b == 0) return 1;
       return fun(a, fun2(a, b - 1));
   }
   ```

6. **以下程序的输出是什么？**

   ```c
   #include <stdio.h>
   void print(int n) {
       if (n > 4000) return;
       printf("%d ", n);
       print(2 * n);
       printf("%d ", n);
   }
   int main() {
       print(1000);
       getchar();
       return 0;
   }
   ```
   输出为：
   - 1000 2000 4000 4000 2000 1000

7. **以下函数执行的操作是什么？**

   ```c
   int fun(unsigned int n) {
       if (n == 0 || n == 1) return n;
       if (n % 3 != 0) return 0;
       return fun(n / 3);
   }
   ```
   - 它返回 1 当 `n` 是 3 的倍数，否则返回 0
   - 它返回 1 当 `n` 是 3 的幂，否则返回 0
   - 它返回 0 当 `n` 是 3 的倍数，否则返回 1
   - 它返回 0 当 `n` 是 3 的幂，否则返回 1

8. **预测以下程序的输出：**

   ```c
   #include <stdio.h>
   int f(int n) {
       if (n <= 1) return 1;
       if (n % 2 == 0) return f(n / 2);
       return f(n / 2) + f(n / 2 + 1);
   }
   int main() {
       printf("%d", f(11));
       return 0;
   }
   ```

9. **预测以下程序的输出：**

   ```c
   #include <stdio.h>
   void crazy(int n, int a, int b) {
       if (n <= 0) return;
       crazy(n - 1, a, b + n);
       printf("%d %d %d \n", n, a, b);
       crazy(n - 1, b, a + n);
   }
   int main() {
       crazy(3, 4, 5);
       return 0;
   }
   ```
   输出为：
   - ```
     1 4 10
     2 4 8
     1 8 6
     3 4 5
     1 5 9
     2 5 7
     1 7 7
     ```

   - ```
     3 4 5
     1 4 10
     2 4 8
     1 8 6
     1 5 9
     2 5 7
     1 7 7
     ```

10. **考虑以下递归 C++ 函数，它接受两个参数：**

    ```cpp
    unsigned int foo(unsigned int n, unsigned int r) {
        if (n > 0) return (n % r + foo(n / r, r));
        else return 0;
    }
    ```

    当调用 `foo(345, 10)` 时，返回值是多少？

---

以上是对你提供的选择题的翻译和整理。如果你需要更多问题的解答或其他帮助，随时告诉我！