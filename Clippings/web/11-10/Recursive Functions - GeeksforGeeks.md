---
title: "Recursive Functions - GeeksforGeeks"
source: "https://www.geeksforgeeks.org/recursive-functions/?ref=header_outind"
author:
  - "[[GeeksforGeeks]]"
  - "[[https://www.facebook.com/geeksforgeeks.org/]]"
  - "[[https://twitter.com/geeksforgeeks]]"
  - "[[https://www.linkedin.com/company/1299009]]"
  - "[[https://www.youtube.com/geeksforgeeksvideos/]]"
published: 2010-11-18 07:04:51, https://www.facebook.com/geeksforgeeks.org/, https://twitter.com/geeksforgeeks, https://www.linkedin.com/company/1299009, https://www.youtube.com/geeksforgeeksvideos/
created: 2024-11-10
description: "A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions."
tags:
  - "clippings"
---
Last Updated : 27 May, 2024

> A Recursive function can be defined as a routine that calls itself directly or indirectly.

In other words, a recursive function is a function that solves a problem by solving smaller instances of the same problem. This technique is commonly used in programming to solve problems that can be broken down into simpler, similar subproblems.

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/Recursive-Functions-in-c.png)

## Need of Recursive Function:

A recursive function is a function that solves a problem by solving smaller instances of the same problem. This technique is often used in programming to solve problems that can be broken down into simpler, similar subproblems.

### 1. **Solving complex tasks:**

Recursive functions break complex problems into smaller instances of the same problem, resulting in compact and readable code.

### 2\. Divide and Conquer:

Recursive functions are suitable for divide-and-conquer algorithms such as merge sort and quicksort, breaking problems into smaller subproblems, solving them recursively, and merging the solutions with the original problem.

### 3\. **Backtracking**:

Recursive backtracking is ideal for exploring and solving problems like N-Queens and Sudoku.

### 4\. Dynamic **programming:**

Recursive functions efficiently solve dynamic programming problems by solving subproblems and combining their solutions into a complete solution.

### 5\. Tree and **graph structures:**

Recursive functions are great for working with tree and graph structures, simplifying traversal and pattern recognition tasks.

## How to write a Recursive Function:

### Components of a recursive function:

**Base case:** Every recursive function must have a base case. The base case is the simplest scenario that does not require further recursion. This is a termination condition that prevents the function from calling itself indefinitely. Without a proper base case, a recursive function can lead to infinite recursion.

**Recursive case:** In the recursive case, the function calls itself with the modified arguments. This is the essence of recursion – solving a larger problem by breaking it down into smaller instances of the same problem. The recursive case should move closer to the base case with each iteration.

Let’s consider the example of [factorial of number](https://www.geeksforgeeks.org/program-for-factorial-of-a-number/):

In this example, the base case is when **n** is **0**, and the function returns **1**. The recursive case multiplies **n** with the result of the function called with parameter **n – 1**. The process continues until the base case is reached.

It’s essential to ensure that the recursive function has a correct base case and that the recursive calls lead to the base case, otherwise, the procedure might run indefinitely, leading to a stack overflow (exceeding the available memory allocated for function calls).

Below is the implementation of factorial of a number:

```C++ 
#include <iostream>
using namespace std;

// Recursive Function to calculate Factorial of a number
int factorial(int n)
{
    // Base case
    if (n == 0) {
        return 1;
    }

    // Recursive case
    return n * factorial(n - 1);
}

// Driver Code

int main()
{
    int n = 4;

    cout << "Factorial of " << n
         << " is:" << factorial(n);
    return 0;
}

```

 Java Python C# JavaScript

**Output**


Factorial of 4 is:24


**Time Complexity:** O(n)  
**Auxiliary Space:** O(n)

  

Unlock a distraction-free, high-quality learning experience with [GeeksforGeeks Premium](https://www.geeksforgeeks.org/geeksforgeeks-premium-subscription?utm_source=geeksforgeeks&utm_medium=bottomtext_default&utm_campaign=premium)! Get unlimited access to 35+ expert-led tech courses **covering everything from programming languages, DSA to Web Development and Data Science**, all designed to help you ace any interview.

Upgrade today and enjoy a **1-year free extension** with your subscription, plus exclusive perks like **unlimited article summarization, a 100% ad-free environment, AI-powered assistance** in coding problems, and so much more. [Go Premium!](https://www.geeksforgeeks.org/geeksforgeeks-premium-subscription?utm_source=geeksforgeeks&utm_medium=bottomtext_default&utm_campaign=premium)

  

[![News](https://media.geeksforgeeks.org/auth-dashboard-uploads/Google-news.svg)](https://news.google.com/publications/CAAqBwgKMLTrzwsw44bnAw?hl=en-IN&gl=IN&ceid=IN%3Aen)

Improve