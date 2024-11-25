videoplayback_原文

2024年11月10日 17:28

The problem is in Queen's problem. First, let us understand what does it mean by enquiring the problem? Then I will explain you how backtracking is used for solving this problem.

See here, a chess board is given of 4 cross 4 16 cells. A standard chess board will be of 8 cross 8, but for reducing the size of a problem, we have taken 4 by 4 and 4 queens are given. So the game of chess, a queen will be there which will have its moves like horizontal, that is in a row or in a column or diagonal. It moves. So here also it is the same queen and that queen, we have to place them on this board.

So all four queens we have to place such that no two queens are under attack. So when do you say they are under attack? If they are in same row or same column or they are insane diagonal? So if they are in same row, same column, or same diagonal. So we have to avoid this and arrange them such that they are not under attack. So is it possible to arrange them? Yes, it is possible.

We get some solutions. Is there only one solution? No, for this we will have more than one solution. And we want all those solutions. So now we want to know what all their possible arrangements. From there, we want those arrangements which are satisfying this condition. So for this type of problem, backtracking is used.

We want all possible solutions which are satisfying this condition, not just one solution. If you are looking for optimal, then we should go for dynamic programming. We want all solutions which are satisfying this condition. So backtracking issues.

Now let us discuss how to solve this one, those four queens. I'll place them on this 4 by four chess board. So in how many ways I can place them on this 16 cells so I can place them in 16 c 4 ways, so this will form lot of possibilities and the problem becomes big.

No? To reduce the size, what we will say that a queen can not be kept anywhere on the board, but first queen in first row, second queen in second row likewise. So it means now what we have to decide, we do not have to decide the cell, we have to decide in which column a q will be placed. So those columns will write here first queen, which column it will be, then second queen, 3rd queen, and fourth queen. So we will write on their column numbers.

So now the problem is reduce and one more thing will do, we will try to avoid keeping two coins in the same column, okay? Actually we have to check this condition. So one, we condition, we already solved what? We will not keep all the coins in a single row, every Co in the next row, So first row is problem solved. Then we know we are placing them, we have to solve it. So for that, we will try to avoid keeping two coins in the same column. So these two are directly, we are taking care.

Now we have to check, are queens in the same diagonal or not, right? So now by checking all these conditions, what we will do is we will try to solve it and prepare the solutions in the form of a solution tree, that is state space tree. So I will generate state space tree.

Now let us generate a state space tree. This is the root, the first queen. I will keep it in first column. Queen 1 in first column, then Co 2, as we decided, will not keep it in the same row and same column, but in diagonal. No, actually it should not be in diagnosed. They should not be under attack. No, I am not checking that attack without attack only just I am drawing what are the possibilities? Okay, then afterwards I will show you how to check the attacks and how to generate a tree.

First, without attacks, I am preparing a state space tree. Second queen in second column. Then third queen can come in third column. Yes, third queen can come in third column. So fourth queen in fourth column. There is one possibility.

Now, this is one possibility, right? Though they are under attack right beyond this. Is there any possibility of moving fourth queen? No, so move back for third queen. There is a place, so move third queen to a fourth column. Then this will be filled with four queen. So third queen goes into fourth column and fourth queen comes in third column. This is how we represent the possibilities. That is what I am showing you. Now continue, can I keep fourth queen anyway, no third queen, there is no place, so take out, see this is the last cell.

Now move second queen, second queen in third column, so second queen in third column, then third queen in second column. Third queen in second column. Then 4th queen in fourth column. Fourth queen in fourth column, now 4th queen. There is no place take out third queen, can we keep it here? We decided it will not keep in the same column, so keep it here. So third coin will go into fourth column, then fourth coin can come in second column, then here.

Now, is there any place fourth, 4th, queen? No place, third queen, no place, second queen. You can move it to fourth column, 2nd queen can be moved to fourth column, then third queen in second and fourth in third, then this is third, this is second, then go back. Now for second queen. Also there are no places available. Then take out this move.

Queen in one. Queen 1 in second column. Now below this also you get a huge tree like this. Then again, third column, you get a tree, you get a tree like this. So total, how many cells we will be checking like this for this one, See, this is first node, let us check the nodes.

So here I will get 4 nodes. So this is in third column as well as fourth column. So 4 nodes. Then below each node here, 3, 3 nodes are there. So 4 into 3, 4 into three nodes, plus then below this 2, 2 nodes are there, below this, every node. So 4 into 3 into two nodes plus last 1, 1 nodes are there, So 4 into 3 into two into one. These many nodes will be generating when we have avoided same row and same column, but we are allowing diagonals.

So then how much this is, this is one plus summation of now this, I takes values from 1, 2, 3, 4 terms are there, so I takes values 0 to 3, so I am starting from 0 to 3. Then this is product of product of what, 4 minus j and j takes the values, this is 0 to I, this is I.

Right, this will be a formula for knowing the number of nodes. If I simply calculate this is one plus 4, and this is 2 l plus 24 plus 24. So this is 48, 60 and 65, 65 nodes, you will be getting this is 4, 4 queen. If you take 8 by 8, it will be 8 minus j for any n queens, this will be the number of nodes that will be getting generating for solving this one. So this is showing the maximum number of nodes. So formula is for maximum number of nodes, We will not be generating all of them, but maximum this may be generated.

Now we will solve the problem by following this method only, right? And what is the condition for us? Bonding function is that they should not be in the same row and same column and same diagonal. So I will consider that and I will generate a tree, and now we will be solving the problem. So I will re the tree again by applying bounding function, that is the condition.

Now let us solve this with bounding function. So what is bounding function? Bounding function is condition, right? So what is the condition not in same row, same column, and same diagonal, right? We will check this one, now we will draw the same tree once again, first step is queen 1 in first column, queen 1 in first column, then queen 2 in second column, queen 2 in second column. They are under attack, so do not go further. Kill this node by applying this condition bonding function.

This has violated the condition, so we have ke this node, so we can not keep it there, then pick up Co 2 from there and keep it in third column, queen 2 in third column, So the next possibility is a queen to in third column, is it under attack? No, continue further, queen 3 in second column, we will not keep it in the same column, right, second column. Second column, it will be under attack. So queen 3 in second column bonding function, this will be under attack. Don't keep it there.

Now let us try another cell. This we will not keep it in same column, so we will keep it here. Queen 3, this column, coin 3 in fourth column, so coin 3 in fourth column. There also it is under attack, so no question of placing fourth queen at all, right?

Third queen itself did not find its place. Is there any other cell remaining for third queen? No, now we have to move second queen, so okay, move second queen, so second queen is moved in fourth column, so this is in fourth column, now third queen, second column, 3rd queen in second column. Yes, this is possible for third queen, they are not under attack. Now 4th queen, what is the cell remaining here? Fourth queen, if I keep here, it will be under attack in third column, so if it is in third column, 4th queen, right, this will be under attack, so killed, so pick up 4th queen, Kevin, keep it here. No, all cells are over now.

Queen 3, it can be kept here, so that is in third column, third column, but that is diagonally under attack, so don't go further. This is skilled, so can I keep it at displays? No, we are not keeping in the same column now move queen 2 co 2 can not be moved. So pick one Co 2 also and move Co column. So Co 1 in second column, so queen 1 in second column, now Co 2, it can be kept here going to at first column. This is under tag diagonally, second column will not keep a third column.

Third column, again, under attack diagonally. Now let us keep it in fourth column. Fourth column, yes, this is possible, they are not under attack.

Now let us keep third queen, so we want a place for second queen, then only try to keep third queen, third queen, can I keep it in column 1 is third queen in column 1? So x 3 in column 1, so third queen is here, they are not under attack. Now 4th queen, this cell, this cell will not keep here, only this is the only place, so so queen 4 in third column is it under attack, No, we got a solution, what is that solution 2, 4, 1, 3, 2, 4, 1 3. Actually these values, we were trying them here in an array.

Now I have written the answer finally, so 2, 4, 1, 3, this is one answer, right? And I have to continue further and I try to find out any more answers are possible, so yes, there is one more answer, if you continue doing this, what is the other answer, See mirror image of this one. So Q1 will be on this side and Q2 on this side, and Q3 this side, Q4 here, mirror image of this one, so that is 3, 1, 4, 2, so 3, 1, 4, 2. So what are the answers solutions are there are two solutions, 1 is 2, 4, 1, 3 and 3, 1 4, 2, that is it. So I have shown you before this 1, I have shown you all possibilities. Now I have used bonding function and solve this using backtracking.