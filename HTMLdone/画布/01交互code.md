以下是根据您的需求进行简化和交互优化后的代码。使用单个 `<canvas>` 和一组按钮来实现不同功能，包括 `fillText` 和 `strokeText` 的区别、`save()` 和 `restore()` 的使用、以及通过输入数值来缩放形状。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas 多功能演示</title>
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

    <h1 style="text-align: center;">HTML5 Canvas 多功能演示</h1>

    <div id="controls">
        <button onclick="drawFillText()">显示填充文字</button>
        <button onclick="drawStrokeText()">显示轮廓文字</button>
        <button onclick="saveState()">保存状态</button>
        <button onclick="restoreState()">恢复状态</button>
        <button onclick="scaleShape()">缩放形状</button>
        <label>缩放比例:
            <input type="number" id="scaleFactor" placeholder="输入比例 (0-1)" step="0.1" min="0" max="1">
        </label>
    </div>

    <canvas id="canvas" width="500" height="500"></canvas>
    <div id="description">点击按钮以查看不同的功能效果。</div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const description = document.getElementById('description');
        let savedState = null; // 用于保存 canvas 状态

        // 清除画布
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // 绘制填充文字
        function drawFillText() {
            clearCanvas();
            ctx.fillStyle = "blue";
            ctx.font = "30px Arial";
            ctx.fillText("这是填充文字", 50, 100);
            description.textContent = "fillText 方法用于绘制填充文字。文字内部被填充颜色。";
        }

        // 绘制轮廓文字
        function drawStrokeText() {
            clearCanvas();
            ctx.strokeStyle = "red";
            ctx.font = "30px Arial";
            ctx.lineWidth = 2;
            ctx.strokeText("这是轮廓文字", 50, 100);
            description.textContent = "strokeText 方法用于绘制轮廓文字。文字没有填充颜色，只有边框。";
        }

        // 保存画布状态
        function saveState() {
            ctx.save();
            console.log("Canvas 状态已保存！");
            description.textContent = "使用 save() 方法保存当前画布状态（例如颜色、样式、变换等）。";
        }

        // 恢复画布状态
        function restoreState() {
            ctx.restore();
            console.log("Canvas 状态已恢复！");
            description.textContent = "使用 restore() 方法恢复到上一次保存的画布状态。";
        }

        // 缩放形状
        function scaleShape() {
            clearCanvas();
            const scaleFactor = parseFloat(document.getElementById('scaleFactor').value);
            if (isNaN(scaleFactor) || scaleFactor <= 0 || scaleFactor > 1) {
                description.textContent = "请输入有效的缩放比例 (0-1)！";
                return;
            }
            ctx.save(); // 保存状态
            ctx.scale(scaleFactor, scaleFactor);
            ctx.fillStyle = "green";
            ctx.fillRect(50, 50, 200, 100);
            ctx.restore(); // 恢复状态
            description.textContent = `缩放形状的比例为 ${scaleFactor}，长宽均缩小为原来的 ${scaleFactor} 倍。`;
        }
    </script>

</body>
</html>
```

### 功能说明
1. **单画布多功能**：
   - 使用 `<canvas>` 提供多功能演示，不再需要多个画布。
   - 功能通过按钮切换，无需重新加载页面。

2. **功能按钮**：
   - **填充文字**（`fillText`）：展示填充的文字。
   - **轮廓文字**（`strokeText`）：展示只绘制边框的文字。
   - **保存状态**（`save()`）：保存当前画布状态到堆栈。
   - **恢复状态**（`restore()`）：恢复到最近一次保存的状态。
   - **缩放形状**：通过用户输入缩放比例来调整形状大小。

3. **用户输入交互**：
   - 使用 `<input>` 元素获取用户输入的缩放比例。
   - 缩放比例需在 0 到 1 之间，输入无效时会提示。

4. **描述框**：
   - 每个操作都会更新下方描述框，提示功能和效果。
   - 使用 `console.log` 输出状态变化的消息。

### 使用方法
1. 将代码保存为 `.html` 文件。
2. 在浏览器中打开文件。
3. 点击不同的按钮查看效果。
4. 调整输入框中的缩放比例，点击“缩放形状”查看形状的缩放效果。