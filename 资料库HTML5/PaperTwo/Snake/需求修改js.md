看起来你的代码有一些结构上的问题，导致游戏无法正常运行。以下是一些需要修复的地方和建议：

### 1. 确保调用 `updateScore()`
在蛇吃到食物后，你需要调用 `updateScore()` 函数来更新分数。确保在 `gameLoop` 中更新分数。

### 2. 重置游戏的顺序
在游戏结束时，先记录游戏信息，再重置游戏。将 `recordGame()` 和 `displayRecords()` 的调用移到 `resetGame()` 之前。

### 3. 移除多余的检查逻辑
你有两次检查碰撞的逻辑，应该合并到一个地方。

### 4. 定义 `gameInterval`
在设置 `setInterval` 时，最好将其赋值给一个变量，以便之后如果需要动态调整时能清除。

### 修正后的代码示例

```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const areaScores = {
    topLeft: 10,
    topRight: 20,
    bottomLeft: 30,
    bottomRight: 40
};

// 蛇的初始设置
let snake = [{ x: 50, y: 50 }];
let snakeLength = 1;
let direction = { x: 0, y: 0 };

let score = 0; // 玩家得分
let deathCount = 0; // 死亡次数

// 食物设置
let food = { x: 0, y: 0 };
generateFood();

// 控制键盘事件
document.addEventListener('keydown', changeDirection);

let gameRecords = [];

// 记录游戏
function recordGame() {
    const gameRecord = {
        score: score,
        time: new Date().toLocaleString() // 当前时间
    };
    gameRecords.unshift(gameRecord); // 添加到记录数组
    if (gameRecords.length > 5) {
        gameRecords.pop(); // 只保留最近5条记录
    }
}

// 显示记录
function displayRecords() {
    const recordDisplay = document.getElementById('recordDisplay');
    recordDisplay.innerHTML = ''; // 清空记录显示
    gameRecords.forEach(record => {
        const recordEntry = document.createElement('div');
        recordEntry.innerText = `分数: ${record.score}, 时间: ${record.time}`;
        recordDisplay.appendChild(recordEntry);
    });
}

// 根据果实位置计算分数
function getFruitScore() {
    if (food.x < canvas.width / 2 && food.y < canvas.height / 2) {
        return areaScores.topLeft;
    } else if (food.x >= canvas.width / 2 && food.y < canvas.height / 2) {
        return areaScores.topRight;
    } else if (food.x < canvas.width / 2 && food.y >= canvas.height / 2) {
        return areaScores.bottomLeft;
    } else {
        return areaScores.bottomRight;
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -10 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 10 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -10, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 10, y: 0 };
            }
            break;
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

    // 确保食物不在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood(); // 重新生成
            return; // 直接返回，避免继续执行
        }
    }
}

function gameLoop() {
    // 如果方向为0，说明蛇没有移动，避免游戏结束
    if (direction.x === 0 && direction.y === 0) {
        return;
    }

    // 更新蛇的位置
    let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // 碰撞检测
    if (checkCollision(newHead)) {
        alert("游戏结束！");
        recordGame(); // 记录游戏
        displayRecords(); // 显示记录
        resetGame(); // 重置游戏
        return;
    }

    snake.unshift(newHead); // 将新头部加入蛇身
    if (newHead.x === food.x && newHead.y === food.y) {
        snakeLength++;
        updateScore(); // 更新分数
        generateFood(); // 生成新食物
    }

    // 控制蛇的长度
    if (snake.length > snakeLength) {
        snake.pop(); // 去掉尾部
    }

    draw(); // 重绘游戏
}

function checkCollision(head) {
    // 撞墙
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // 撞到自身
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
    // 绘制蛇
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    }
    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function updateScore() {
    score += getFruitScore(); // 更新分数
    document.getElementById('scoreDisplay').innerText = `分数: ${score}`;
}

// 重置游戏
function resetGame() {
    deathCount++;
    document.getElementById('deathDisplay').innerText = `死亡次数: ${deathCount}`;
    snake = [{ x: 50, y: 50 }];
    snakeLength = 1;
    direction = { x: 0, y: 0 };
    score = 0; // 重置分数
    updateScore(); // 更新显示
    generateFood();
}

// 启动游戏循环
setInterval(gameLoop, 150); // 每150毫秒更新一次
```

### 重要修改
- 在 `gameLoop` 中调用 `updateScore()` 来更新分数。
- 合并游戏结束时的逻辑，确保先记录游戏，再重置游戏。
- 确保 `resetGame()` 函数中重置分数并更新显示。

将这个代码替换你现有的 JavaScript 部分，看看是否能解决问题。如果还有问题，请告诉我！