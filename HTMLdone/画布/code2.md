>[!question] 
>请你只制作一个canvas，生成8个不同功能的按钮，来显示不同的功能, 并且我想知道 filltext 和 storetext 之间的区别，使用按钮和描述说明区别这两种文字绘制方法，save（）和 restore 使用按钮进行编辑执行，让我清楚在 console 中的消息，还有如何将形状的长和宽均缩放至原来的二分之一，请你使用输入数值的方式进行交互。


下面是优化后的代码，增加了一个固定在页面右上角的描述框，方便查看画布的说明：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Canvas 动态说明</title>
    <style>
        canvas {
            border: 1px solid black;
            margin-bottom: 20px;
            display: block;
        }
        #description-box {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 14px;
            font-style: italic;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
    </style>
</head>
<body>

    <h1>HTML5 Canvas 实践</h1>

    <!-- 固定的描述框 -->
    <div id="description-box">
        鼠标悬停在画布上方时查看画布的功能说明。
    </div>

    <!-- 画布列表 -->
    <canvas id="myCanvas1" width="500" height="500" data-description="1. 空白画布示例，显示 Canvas 的边框。"></canvas>
    <canvas id="myCanvas2" width="500" height="500" data-description="2. 坐标系绘制示例，包括原点 (0,0) 的标记。"></canvas>
    <canvas id="myCanvas3" width="500" height="500" data-description="3. 空心和实心矩形绘制。"></canvas>
    <canvas id="myCanvas4" width="500" height="500" data-description="4. 使用 fillText 和 strokeText 绘制填充文字和轮廓文字。"></canvas>
    <canvas id="myCanvas5" width="500" height="500" data-description="5. 展示线性和放射性渐变效果。"></canvas>
    <canvas id="myCanvas6" width="500" height="500" data-description="6. 设置透明度的两种方法：rgba 和 globalAlpha。"></canvas>
    <canvas id="myCanvas7" width="500" height="500" data-description="7. save 和 restore 方法保存与恢复画布状态。"></canvas>
    <canvas id="myCanvas8" width="500" height="500" data-description="8. 将形状缩放为原先的二分之一大小。"></canvas>

    <script>
        // 获取描述框和所有画布
        const descriptionBox = document.getElementById('description-box');
        const canvases = document.querySelectorAll('canvas');

        // 为每个画布添加鼠标悬停事件
        canvases.forEach(canvas => {
            canvas.addEventListener('mouseenter', () => {
                descriptionBox.textContent = canvas.getAttribute('data-description');
            });
            canvas.addEventListener('mouseleave', () => {
                descriptionBox.textContent = '鼠标悬停在画布上方时查看画布的功能说明。';
            });
        });

        // 示例绘图代码
        const ctx2 = document.getElementById('myCanvas2').getContext('2d');
        ctx2.moveTo(0, 250);
        ctx2.lineTo(500, 250);
        ctx2.stroke();
        ctx2.moveTo(250, 0);
        ctx2.lineTo(250, 500);
        ctx2.stroke();
        ctx2.beginPath();
        ctx2.arc(250, 250, 5, 0, Math.PI * 2);
        ctx2.fill();

        const ctx3 = document.getElementById('myCanvas3').getContext('2d');
        ctx3.strokeRect(50, 50, 200, 100);
        ctx3.fillRect(50, 200, 200, 100);

        const ctx4 = document.getElementById('myCanvas4').getContext('2d');
        ctx4.fillStyle = "blue";
        ctx4.font = "30px Arial";
        ctx4.fillText("填充文字", 50, 50);
        ctx4.strokeStyle = "red";
        ctx4.lineWidth = 3;
        ctx4.strokeText("轮廓文字", 50, 100);

        const ctx5 = document.getElementById('myCanvas5').getContext('2d');
        const linearGradient = ctx5.createLinearGradient(0, 0, 500, 0);
        linearGradient.addColorStop(0, "red");
        linearGradient.addColorStop(1, "yellow");
        ctx5.fillStyle = linearGradient;
        ctx5.fillRect(50, 50, 400, 100);
        const radialGradient = ctx5.createRadialGradient(250, 250, 50, 250, 250, 200);
        radialGradient.addColorStop(0, "blue");
        radialGradient.addColorStop(1, "green");
        ctx5.fillStyle = radialGradient;
        ctx5.fillRect(50, 200, 400, 100);

        const ctx6 = document.getElementById('myCanvas6').getContext('2d');
        ctx6.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx6.fillRect(50, 50, 200, 100);
        ctx6.globalAlpha = 0.3;
        ctx6.fillStyle = "green";
        ctx6.fillRect(50, 200, 200, 100);

        const ctx7 = document.getElementById('myCanvas7').getContext('2d');
        ctx7.save();
        ctx7.fillStyle = "red";
        ctx7.fillRect(50, 50, 100, 100);
        ctx7.restore();
        ctx7.fillStyle = "blue";
        ctx7.fillRect(200, 50, 100, 100);

        const ctx8 = document.getElementById('myCanvas8').getContext('2d');
        ctx8.scale(0.5, 0.5);
        ctx8.fillStyle = "green";
        ctx8.fillRect(50, 50, 200, 100);
    </script>
</body>
</html>
```

### 优化点：
1. **固定描述框**：
   - 使用 `position: fixed` 将描述框固定在页面右上角，即使页面滚动，描述框也始终可见。
   - 描述框样式优化为暗背景、白色文字，增加边框圆角和阴影，提升可读性和美观。

2. **动态更新描述**：
   - 鼠标悬停在画布上时，描述框内容更新为对应画布的说明。
   - 鼠标离开时，恢复为默认提示。

### 使用方法：
1. 保存为 `.html` 文件。
2. 打开文件后，描述框固定在右上角，随时可查看当前悬停画布的功能说明。
3. 下滑页面时，描述框始终保持可见，用户体验更友好。

希望这满足你的需求！