从你的截图来看，问题的核心在于 **`restore()` 恢复状态** 并不会清除已经绘制的内容，而只是恢复画布的**状态**（如位置、缩放、旋转等）。这就导致了新的绘制与原来绘制的内容叠加，且位置未完全回到初始状态。

---

### **问题原因**
1. **`restore()` 不影响已经绘制的内容**：
   - Canvas 的 `save()` 和 `restore()` 仅对状态生效，包括变换（`translate`、`rotate` 等）和样式（`fillStyle`、`lineWidth` 等）。
   - 画布上的内容是像素级的，一旦绘制，状态的恢复不会移除这些内容。

2. **重复绘制的新内容基于当前变换**：
   - 在截图中，恢复状态后，新的矩形被绘制在恢复状态的基础上，但之前绘制的内容依然存在，因此看起来像是叠加了多个图形。

---

### **正确的实现方法**
要恢复到与初始矩形相同的位置和样式，需要：
1. 清除之前的绘制内容。
2. 恢复画布状态。
3. 再次绘制恢复后的内容。

---

### **修正后的代码**
以下是修改后的完整代码，确保状态和内容的恢复效果一致：

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

    <h1 style="text-align: center;">HTML5 Canvas 状态与内容演示</h1>

    <div id="controls">
        <button onclick="drawInitial()">绘制初始画布</button>
        <button onclick="changeState()">改变状态并绘制</button>
        <button onclick="saveState()">保存状态</button>
        <button onclick="restoreState()">恢复状态并重新绘制</button>
    </div>

    <canvas id="canvas" width="500" height="500"></canvas>
    <div id="description">点击按钮以查看 save() 和 restore() 的功能演示。</div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const description = document.getElementById('description');
        let savedStateCount = 0;

        // 保存当前状态以及需要恢复的内容绘制函数
        let savedStates = [];

        // 绘制初始画布
        function drawInitial() {
            clearCanvas();
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
            ctx.save(); // 保存状态
            const currentContent = ctx.getImageData(0, 0, canvas.width, canvas.height); // 保存内容快照
            savedStates.push(currentContent); // 保存到状态栈
            savedStateCount++;
            console.log("Canvas 状态和内容已保存！");
            description.textContent = `状态已保存，共保存 ${savedStateCount} 次`;
        }

        // 恢复画布状态并重新绘制内容
        function restoreState() {
            if (savedStates.length > 0) {
                const snapshot = savedStates.pop(); // 恢复最近保存的内容
                clearCanvas(); // 清除当前内容
                ctx.restore(); // 恢复画布状态
                ctx.putImageData(snapshot, 0, 0); // 恢复内容
                savedStateCount--;
                console.log("Canvas 状态和内容已恢复！");
                description.textContent = `状态已恢复，剩余保存的状态：${savedStateCount}`;
            } else {
                console.log("没有保存的状态可恢复！");
                description.textContent = "没有保存的状态可恢复！请先使用 save() 保存状态。";
            }
        }

        // 清除画布内容
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    </script>

</body>
</html>
```

---

### **修正后的逻辑**
1. **状态与内容同步保存**：
   - 使用 `ctx.save()` 保存状态。
   - 使用 `ctx.getImageData()` 保存内容快照。

2. **恢复时先清除内容**：
   - 使用 `clearRect()` 清除画布上的所有内容。
   - 使用 `ctx.restore()` 恢复状态后，再通过 `putImageData()` 恢复内容。

3. **避免叠加问题**：
   - 恢复后，画布会与保存时的内容完全一致，无新增内容或叠加问题。

---

### **效果演示**
1. 点击 "绘制初始画布"：绘制蓝色矩形。
2. 点击 "改变状态并绘制"：修改画布状态并绘制红色矩形。
3. 点击 "保存状态"：保存状态和内容。
4. 点击 "恢复状态并重新绘制"：画布内容和状态恢复到保存时的样子，不会出现叠加的新图形。

---

### **总结**
本次修正保证了状态和内容的同步保存与恢复，解决了原代码仅恢复状态但无法清除内容的问题，实现了预期效果。