---
title: "N Queen Problem - GeeksforGeeks"
source: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/?ref=header_outind"
author:
  - "[[https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129.jpg]]"
  - "[[https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129-seo.png]]"
  - "[[https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129-small.png]]"
  - "[[GeeksforGeeks]]"
  - "[[https://www.facebook.com/geeksforgeeks.org/]]"
  - "[[https://twitter.com/geeksforgeeks]]"
  - "[[https://www.linkedin.com/company/1299009]]"
  - "[[https://www.youtube.com/geeksforgeeksvideos/]]"
published: https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129.jpg, https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129-seo.png, https://media.geeksforgeeks.org/geeksforgeeks/NQueenProblem/NQueenProblem20240918154129-small.png, 2011-07-21 05:36:13, https://www.facebook.com/geeksforgeeks.org/, https://twitter.com/geeksforgeeks, https://www.linkedin.com/company/1299009, https://www.youtube.com/geeksforgeeksvideos/
created: 2024-11-10
description: "A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions."
tags:
  - "clippings"
---
Last Updated : 27 Aug, 2024

We have discussed [**Knight’s tour**](https://www.geeksforgeeks.org/the-knights-tour-problem/) and [**Rat in a Maze**](https://www.geeksforgeeks.org/rat-in-a-maze/) problem earlier as examples of Backtracking problems. Let us discuss N Queen as another example problem that can be solved using backtracking.

## What is N-Queen problem?

The **N** Queen is the problem of placing **N** chess queens on an **N×N** chessboard so that no two queens attack each other.

![](https://media.geeksforgeeks.org/wp-content/uploads/20230814111624/N-Queen-Problem.png)

For example, the following is a solution for the 4 Queen problem.

![](https://media.geeksforgeeks.org/wp-content/uploads/20230814111654/Solution-Of-4-Queen-Problem.png)

The expected output is in the form of a matrix that has ‘**Q**‘s for the blocks where queens are placed and the empty spaces are represented by **‘.’** . For example, the following is the output matrix for the above 4-Queen solution.

> #### . Q . .  
> . . . Q   
> Q . . .  
> . . Q . 

## N Queen Problem using [Backtracking](https://www.geeksforgeeks.org/introduction-to-backtracking-data-structure-and-algorithm-tutorials/):

> The idea is to place queens one by one in different columns, starting from the leftmost column. When we place a queen in a column, we check for clashes with already placed queens. In the current column, if we find a row for which there is no clash, we mark this row and column as part of the solution. If we do not find such a row due to clashes, then we backtrack and return **false**.

Below is the recursive tree of the above approach:

![](https://media.geeksforgeeks.org/wp-content/uploads/20230814111826/Backtracking.png)

Recursive tree for N Queen problem

Follow the steps mentioned below to implement the idea:

- Start in the leftmost column
- If all queens are placed return true
- Try all rows in the current column. Do the following for every row.
- If the queen can be placed safely in this row
- Then mark this **\[row, column\]** as part of the solution and recursively check if placing queen here leads to a solution.
- If placing the queen in **\[row, column\]** leads to a solution then return **true**.
- If placing queen doesn’t lead to a solution then unmark this **\[row, column\]** then backtrack and try other rows.
- If all rows have been tried and valid solution is not found return **false** to trigger backtracking.

> **For better visualisation of this backtracking approach, please refer** [**4 Queen problem**](https://www.geeksforgeeks.org/4-queens-problem/)**.**

**Note:** We can also solve this problem by placing queens in rows as well.

Below is the implementation of the above approach:

```java
// Java program to solve N Queen Problem using backtracking

public class NQueenProblem {
    final int N = 4;

    // A utility function to print solution
    void printSolution(int board[][])
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (board[i][j] == 1)
                    System.out.print("Q ");
                else
                    System.out.print(". ");
            }
            System.out.println();
        }
    }

    // A utility function to check if a queen can
    // be placed on board[row][col]. Note that this
    // function is called when "col" queens are already
    // placeed in columns from 0 to col -1. So we need
    // to check only left side for attacking queens
    boolean isSafe(int board[][], int row, int col)
    {
        int i, j;

        // Check this row on left side
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;

        // Check upper diagonal on left side
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;

        // Check lower diagonal on left side
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;

        return true;
    }

    // A recursive utility function to solve N
    // Queen problem
    boolean solveNQUtil(int board[][], int col)
    {
        // Base case: If all queens are placed
        // then return true
        if (col >= N)
            return true;

        // Consider this column and try placing
        // this queen in all rows one by one
        for (int i = 0; i < N; i++) {
            
            // Check if the queen can be placed on
            // board[i][col]
            if (isSafe(board, i, col)) {
                
                // Place this queen in board[i][col]
                board[i][col] = 1;

                // Recur to place rest of the queens
                if (solveNQUtil(board, col + 1) == true)
                    return true;

                // If placing queen in board[i][col]
                // doesn't lead to a solution then
                // remove queen from board[i][col]
                board[i][col] = 0; // BACKTRACK
            }
        }

        // If the queen can not be placed in any row in
        // this column col, then return false
        return false;
    }

    // This function solves the N Queen problem using
    // Backtracking.  It mainly uses solveNQUtil () to
    // solve the problem. It returns false if queens
    // cannot be placed, otherwise, return true and
    // prints placement of queens in the form of 1s.
    // Please note that there may be more than one
    // solutions, this function prints one of the
    // feasible solutions.
    boolean solveNQ()
    {
        int board[][] = { { 0, 0, 0, 0 },
                          { 0, 0, 0, 0 },
                          { 0, 0, 0, 0 },
                          { 0, 0, 0, 0 } };

        if (solveNQUtil(board, 0) == false) {
            System.out.print("Solution does not exist");
            return false;
        }

        printSolution(board);
        return true;
    }

    // Driver program to test above function
    public static void main(String args[])
    {
        NQueenProblem Queen = new NQueenProblem();
        Queen.solveNQ();
    }
}
// This code is contributed by Abhishek Shankhadhar


```
**Output**

```
. . Q . 
Q . . . 
. . . Q 
. Q . . 
```

**Time Complexity:** O(N!)  
**Auxiliary Space:** O(N<sup><span>2</span></sup>)

**Further Optimization in is\_safe() function:**

> The idea is not to check every element in the right and left diagonal, instead use the property of diagonals: 
> 
> - The sum of **i** and **j** is constant and unique for each right diagonal, where **i** is the row of elements and **j** is the   
> column of elements.
> - The difference between **i** and **j** is constant and unique for each left diagonal, where **i** and **j** are row and column of element respectively.

Below is the implementation:

**Output**

```
 .  .  Q  . 
 Q  .  .  . 
 .  .  .  Q 
 .  Q  .  . 
```

**Time Complexity:** O(N!)   
**Auxiliary Space:** O(N)


  