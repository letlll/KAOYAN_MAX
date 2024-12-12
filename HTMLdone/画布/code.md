好的，下面是一个完整的 HTML 文件，其中包含了你所提到的所有问题的实现。你可以将这个代码保存为 `.html` 文件，并在浏览器中打开来查看效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Canvas 实践</title>
    <style>
        canvas {
            border: 1px solid black;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

    <h1>HTML5 Canvas 实践</h1>

    <h2>1. 创建画布使用的 HTML5 标签名称是什么？为何要给画布定义 ID？</h2>
    <p>在 HTML5 中，创建画布使用的标签名称是 <code>&lt;canvas&gt;</code>，并且我们可以通过 <code>id</code> 来访问该画布。</p>
    <canvas id="myCanvas1" width="500" height="500"></canvas>

    <h2>2. 绘制 HTML5 画布坐标系，并标记原点 (0,0) 位置</h2>
    <canvas id="myCanvas2" width="500" height="500"></canvas>

    <h2>3. 绘制空心矩形与实心矩形</h2>
    <canvas id="myCanvas3" width="500" height="500"></canvas>

    <h2>4. 绘制文字的两种方法：fillText 和 strokeText</h2>
    <canvas id="myCanvas4" width="500" height="500"></canvas>

    <h2>5. 画布颜色渐变（线性和放射性）</h2>
    <canvas id="myCanvas5" width="500" height="500"></canvas>

    <h2>6. 设置颜色透明度的两种方法（rgba 和 globalAlpha）</h2>
    <canvas id="myCanvas6" width="500" height="500"></canvas>

    <h2>7. 使用 save() 和 restore() 方法保存和恢复画布状态</h2>
    <canvas id="myCanvas7" width="500" height="500"></canvas>

    <h2>8. 将形状的长和宽缩放至原先的二分之一大小</h2>
    <canvas id="myCanvas8" width="500" height="500"></canvas>

    <script>
        // 2. 绘制画布坐标系，并标记原点 (0,0)
        var canvas2 = document.getElementById("myCanvas2");
        var ctx2 = canvas2.getContext("2d");
        ctx2.moveTo(0, 250);
        ctx2.lineTo(500, 250);
        ctx2.stroke();
        ctx2.moveTo(250, 0);
        ctx2.lineTo(250, 500);
        ctx2.stroke();
        ctx2.beginPath();
        ctx2.arc(250, 250, 5, 0, Math.PI * 2);
        ctx2.fill();

        // 3. 绘制空心矩形与实心矩形
        var canvas3 = document.getElementById("myCanvas3");
        var ctx3 = canvas3.getContext("2d");
        ctx3.strokeRect(50, 50, 200, 100); // 空心矩形
        ctx3.fillRect(50, 200, 200, 100); // 实心矩形

        // 4. 绘制文字的两种方法
        var canvas4 = document.getElementById("myCanvas4");
        var ctx4 = canvas4.getContext("2d");
        ctx4.fillStyle = "blue";
        ctx4.font = "30px Arial";
        ctx4.fillText("填充文字", 50, 50);
        ctx4.strokeStyle = "red";
        ctx4.lineWidth = 3;
        ctx4.strokeText("轮廓文字", 50, 100);

        // 5. 颜色渐变（线性和放射性）
        var canvas5 = document.getElementById("myCanvas5");
        var ctx5 = canvas5.getContext("2d");

        // 线性渐变
        var linearGradient = ctx5.createLinearGradient(0, 0, 500, 0);
        linearGradient.addColorStop(0, "red");
        linearGradient.addColorStop(1, "yellow");
        ctx5.fillStyle = linearGradient;
        ctx5.fillRect(50, 50, 400, 100);

        // 放射性渐变
        var radialGradient = ctx5.createRadialGradient(250, 250, 50, 250, 250, 200);
        radialGradient.addColorStop(0, "blue");
        radialGradient.addColorStop(1, "green");
        ctx5.fillStyle = radialGradient;
        ctx5.fillRect(50, 200, 400, 100);

        // 6. 设置颜色透明度
        var canvas6 = document.getElementById("myCanvas6");
        var ctx6 = canvas6.getContext("2d");

        // 使用 rgba() 设置透明度
        ctx6.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx6.fillRect(50, 50, 200, 100);

        // 使用 globalAlpha 设置透明度
        ctx6.globalAlpha = 0.3;
        ctx6.fillStyle = "green";
        ctx6.fillRect(50, 200, 200, 100);

        // 7. 使用 save() 和 restore() 保存和恢复画布状态
        var canvas7 = document.getElementById("myCanvas7");
        var ctx7 = canvas7.getContext("2d");

        ctx7.save();
        ctx7.fillStyle = "red";
        ctx7.fillRect(50, 50, 100, 100);

        ctx7.restore();
        ctx7.fillStyle = "blue";
        ctx7.fillRect(200, 50, 100, 100);

        // 8. 缩放形状的长和宽
        var canvas8 = document.getElementById("myCanvas8");
        var ctx8 = canvas8.getContext("2d");

        ctx8.scale(0.5, 0.5);
        ctx8.fillStyle = "green";
        ctx8.fillRect(50, 50, 200, 100);
    </script>

</body>
</html>
```

### 代码解释：

1. **每个问题对应的 `<canvas>` 元素**：每个问题都有一个 `<canvas>` 标签，设置了不同的 `id`，用于容纳不同的绘制内容。
2. **脚本部分**：
    - 每个问题的答案通过 `<script>` 标签中的 JavaScript 代码来实现。
    - 通过获取 `<canvas>` 元素的上下文 (`ctx`)，然后使用不同的绘图方法来实现相关功能。
3. **样式**：通过 CSS 设置了画布的边框，以便你可以清晰地看到每个画布的范围。

### 使用方法：

- 将上述代码复制并保存为 `.html` 文件。
- 使用浏览器打开该文件，你可以看到每个问题的绘制效果，并能够验证答案的正确性。

这个 HTML 文件包含了所有你提出的问题及其解决方案，并展示了每个功能在画布上的实际效果。希望对你学习 HTML5 Canvas 有帮助！