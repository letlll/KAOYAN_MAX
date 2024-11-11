---
title: "Top MCQs on Recursion Algorithm with Answers"
source: "https://www.geeksforgeeks.org/quizzes/top-mcqs-on-recursion-algorithm-with-answers/?page=2"
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

1. **考虑以下递归 C++ 函数，它接受两个参数：**

   ```cpp
   unsigned int foo(unsigned int n, unsigned int r) {
       if (n > 0) return (n % r + foo(n / r, r));
       else return 0;
   }
   ```

   当调用 `foo(513, 2)` 时，返回值是多少？

2. **预测以下 Java 程序的输出：**

   ```java
   class GFG {
       static int f(int a[], int i, int n) {
           if (n <= 0) return 0;
           else if (a[i] % 2 == 0) return a[i] + f(a, i + 1, n - 1);
           else return a[i] - f(a, i + 1, n - 1);
       }

       public static void main(String args[]) {
           int a[] = {12, 7, 13, 4, 11, 6};
           System.out.print(f(a, 0, 6));
       }
   }
   ```

3. **以下程序的输出是什么？**

   ```c
   #include <stdio.h>
   int fun(int n, int *f_p) {
       int t, f;
       if (n <= 1) {
           *f_p = 1;
           return 1;
       }
       t = fun(n - 1, f_p);
       f = t + *f_p;
       *f_p = t;
       return f;
   }
   int main() {
       int x = 15;
       printf("%d\n", fun(5, &x));
       return 0;
   }
   ```

4. **考虑以下 JAVA 函数：**

   ```java
   static int f(int j) {
       int i = 50;
       int k;
       if (i == j) {
           System.out.print("something");
           k = f(i);
           return 0;
       } else return 0;
   }
   ```

   下列哪个选项是正确的？

   - 该函数对于所有的 j 都返回 0。
   - 该函数对于所有的 j 都会打印 "something"。
   - 当 `j = 50` 时，函数返回 0。
   - 当 `j = 50` 时，函数会耗尽运行时栈或进入无限循环。

5. **考虑以下 C 函数：**

   ```c
   int f(int n) {
       static int i = 1;
       if (n >= 5) return n;
       n = n + i;
       i++;
       return f(n);
   }
   ```

   调用 `f(1)` 时返回的值是多少？

6. **考虑以下 C 函数：**

   ```c
   int fun(int n) {
       int x = 1, k;
       if (n == 1) return x;
       for (k = 1; k < n; ++k)
           x = x + fun(k) * fun(n - k);
       return x;
   }
   ```

   `fun(5)` 的返回值是多少？

7. **考虑以下递归 Java 函数。如果在 `main()` 中调用 `get(6)`，那么在返回到 `main()` 之前，`get()` 函数将被调用多少次？**

   ```java
   static void get(int n) {
       if (n < 1) return;
       get(n - 1);
       get(n - 3);
       System.out.print(n);
   }
   ```

8. **以下 Java 程序的输出是什么？**

   ```java
   class GFG {
       static int d = 1;
       static void count(int n) {
           System.out.print(n + " ");
           System.out.print(d + " ");
           d++;
           if (n > 1) count(n - 1);
           System.out.print(d + " ");
       }

       public static void main(String args[]) {
           count(3);
       }
   }
   ```

9. **考虑以下 C 代码片段：**

   ```c
   void f(int n) {
       if (n <= 1) {
           printf("%d", n);
       } else {
           f(n / 2);
           printf("%d", n % 2);
       }
   }
   ```

   哪一个实现会产生与上述代码对 `f(173)` 相同的输出？

   - **P 1**

     ```c
     void f(int n) {
         if (n / 2) {
             f(n / 2);
         }
         printf("%d", n % 2);
     }
     ```

   - **P 2**

     ```c
     void f(int n) {
         if (n <= 1) {
             printf("%d", n);
         } else {
             printf("%d", n % 2);
             f(n / 2);
         }
     }
     ```

10. **一般来说，在递归和非递归实现的程序中：**

    - 递归比非递归程序的时间和空间复杂度更好。
    - 非递归比递归程序的时间和空间复杂度更好。
    - 递归版本的时间复杂度更好，但空间复杂度更适合非递归版本。
    - 递归版本的空间复杂度更好，但时间复杂度更适合非递归版本。

---

这是经过翻译并整理的选择题。如果你需要进一步的帮助或有其他问题，请随时告诉我！