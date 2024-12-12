以下是一个 HTML 文件，演示了 `save()` 和 `restore()` 的功能，突出画布状态（如绘图样式、变换属性和剪切路径）在保存和恢复时的效果：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas 状态演示</title>
    <style>
        canvas {
            border: 1px solid black;
            display: block;
            margin: 20px auto;
        }
        #controls {
            text-align: center;
            margin-bottom: 20px;
        }
        #description {
            margin-top: 10px;
            font-style: italic;
            text-align: center;
        }
    </style>
</head>
<body>

    <h1 style="text-align: center;">HTML5 Canvas 状态演示</h1>

    <div id="controls">
        <button onclick="drawInitial()">绘制初始画布</button>
        <button onclick="changeState()">改变状态并绘制</button>
        <button onclick="saveState()">保存状态</button>
        <button onclick="restoreState()">恢复状态并绘制</button>
    </div>

    <canvas id="canvas" width="500" height="500"></canvas>
    <div id="description">点击按钮以查看 save() 和 restore() 的功能演示。</div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const description = document.getElementById('description');
        let savedStateCount = 0;

        // 绘制初始画布
        function drawInitial() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "blue";
            ctx.fillRect(50, 50, 100, 100); // 绘制蓝色矩形
            description.textContent = "初始状态：蓝色矩形 (fillStyle = 'blue')";
        }

        // 改变画布状态并绘制
        function changeState() {
            ctx.fillStyle = "red"; // 改变填充颜色
            ctx.lineWidth = 5; // 设置线宽
            ctx.globalAlpha = 0.5; // 设置全局透明度
            ctx.translate(150, 150); // 平移
            ctx.rotate(Math.PI / 4); // 旋转
            ctx.scale(1.5, 1.5); // 缩放

            // 绘制图形
            ctx.fillRect(0, 0, 100, 100); // 红色半透明矩形
            ctx.strokeRect(0, 0, 100, 100); // 带边框的矩形
            description.textContent = "状态改变：红色半透明矩形 (fillStyle = 'red', 透明度 = 0.5, 旋转 + 缩放)";
        }

        // 保存画布状态
        function saveState() {
            ctx.save();
            savedStateCount++;
            console.log("Canvas 状态已保存！");
            description.textContent = `状态已保存，共保存 ${savedStateCount} 次`;
        }

        // 恢复画布状态并绘制
        function restoreState() {
            if (savedStateCount > 0) {
                ctx.restore();
                savedStateCount--;
                // 恢复状态后绘制矩形以查看效果
                ctx.fillRect(-50, -50, 100, 100); // 绿色矩形，用于对比状态恢复
                description.textContent = `状态已恢复，剩余保存的状态：${savedStateCount}`;
                console.log("Canvas 状态已恢复！");
            } else {
                description.textContent = "没有保存的状态可恢复！";
                console.log("没有保存的状态可恢复！");
            }
        }
    </script>

</body>
</html>
```

---

### **功能描述**
1. **初始状态**：
   - 点击 "绘制初始画布" 按钮绘制一个蓝色矩形。
   - 初始状态的 `fillStyle` 为 `blue`，没有任何变换。

2. **改变状态**：
   - 点击 "改变状态并绘制" 按钮修改以下状态：
     - 填充颜色：`fillStyle = 'red'`
     - 透明度：`globalAlpha = 0.5`
     - 线宽：`lineWidth = 5`
     - 变换属性：平移、旋转和缩放。
   - 绘制一个红色半透明矩形，并添加边框。

3. **保存状态**：
   - 点击 "保存状态" 按钮，将当前画布状态（包括样式和变换）推入状态栈。

4. **恢复状态**：
   - 点击 "恢复状态并绘制" 按钮，从状态栈中弹出最近保存的状态。
   - 恢复后，绘制一个矩形以直观对比状态恢复的效果。

---

### **重要概念**
- **`save()`**：将当前画布的所有状态（样式、变换等）存入状态栈。
- **`restore()`**：从状态栈中恢复最近保存的状态。
- **状态栈**：类似数组的数据结构，支持多次保存和恢复。

---

### **使用说明**
1. 打开 HTML 文件。
2. 按顺序点击：
   - "绘制初始画布"：绘制初始蓝色矩形。
   - "改变状态并绘制"：修改画布状态并绘制图形。
   - "保存状态"：保存当前状态（可多次保存）。
   - "恢复状态并绘制"：从状态栈恢复之前的状态，观察变换和样式的变化。

### **示例说明**
- 修改状态后，绘制的内容会受到状态变化的影响（如颜色、透明度、缩放等）。
- 恢复状态后，绘制的内容会回到保存状态的样式和变换设置，而不会影响已经绘制的内容。