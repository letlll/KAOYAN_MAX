太好了！让我们来调整CSS，以改善游戏界面，并将游戏记录放置在右边的边栏。以下是一些建议和示例代码：

### HTML 结构调整
确保你的HTML结构有一个用于显示游戏记录的右侧边栏。可以按以下方式组织：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>贪吃蛇游戏</title>
    <link rel="stylesheet" href="styles.css"> <!-- 引入CSS样式 -->
</head>
<body>
    <div class="container">
        <canvas id="gameCanvas" width="400" height="400"></canvas>
        <div class="sidebar">
            <div id="scoreDisplay">分数: 0</div>
            <div id="deathDisplay">死亡次数: 0</div>
            <h3>游戏记录</h3>
            <div id="recordDisplay"></div>
        </div>
    </div>
    <script src="script.js"></script> <!-- 引入JavaScript -->
</body>
</html>
```

### CSS 样式
你可以添加或修改 `styles.css` 文件中的样式，以下是一个简单的示例：

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    display: flex;
    border: 2px solid #333;
    border-radius: 10px;
    overflow: hidden;
}

#gameCanvas {
    background-color: #fff;
    border-right: 2px solid #333;
}

.sidebar {
    background-color: #e0e0e0;
    padding: 20px;
    width: 200px; /* 边栏宽度 */
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

#scoreDisplay, #deathDisplay {
    font-size: 18px;
    margin-bottom: 10px;
}

h3 {
    margin-top: 20px;
}

#recordDisplay {
    max-height: 200px; /* 限制记录显示区域的高度 */
    overflow-y: auto; /* 超出部分可滚动 */
}
```

### 说明
1. **整体布局**：使用 `flex` 布局来水平排列画布和边栏。
2. **边栏样式**：为边栏设置背景色、内边距和阴影，使其更加突出。
3. **记录显示区域**：为游戏记录设置最大高度并允许滚动，确保在记录较多时界面不会崩溃。

将这些代码添加到你的HTML和CSS文件中，然后查看效果。如果有任何具体的样式需求或其他调整，请告诉我！