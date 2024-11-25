[代码模板](../../效率/代码模板.md)

[代码不兼容](../../../效率/论文/代码/代码不兼容.md)


3. **利用 verbatim 环境：**
   - 如果你只需要在文档中展示这些代码，可以考虑使用 `verbatim` 环境或者 `lstlisting` 环境来显示正则表达式，这些环境不会尝试解释特殊字符。
   
   ```latex
   \begin{verbatim}
   ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$
   \end{verbatim}
   ```


---


```latex
\chapter{代码：}

\section{设计 HTML 结构}


\begin{verbatim}

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>饼状图和柱状图绘制</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>统计图表绘制</h1>
    <form id="dataForm">
        <label for="dataInput">请输入数据（用逗号分隔）：</label>
        <input type="text" id="dataInput" placeholder="例如：10, 20, 30, 40">
        <div id="errorMsg"></div>
        <button type="button" id="drawPieChart">绘制饼状图</button>
        <button type="button" id="drawBarChart">绘制柱状图</button>
    </form>
    <canvas id="chartCanvas" width="600" height="400"></canvas>

    <script src="script.js"></script>
</body>
</html>

\end{verbatim}

\section{编写 CSS 样式}


\begin{verbatim}

body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 20px;
}

h1 {
    text-align: center;
}

form {
    margin-bottom: 20px;
    text-align: center;
}

label {
    font-size: 16px;
}

#dataInput {
    width: 300px;
    padding: 5px;
    font-size: 16px;
}

button {
    margin: 0 10px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
}

#chartCanvas {
    display: block;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #ccc;
}

#errorMsg {
    color: red;
    margin-top: 5px;
}

\end{verbatim}

\section{实现 JavaScript 功能}


\begin{verbatim}

// 获取页面元素
const dataInput = document.getElementById('dataInput');
const drawPieChartBtn = document.getElementById('drawPieChart');
const drawBarChartBtn = document.getElementById('drawBarChart');
const chartCanvas = document.getElementById('chartCanvas');
const errorMsg = document.getElementById('errorMsg');
const ctx = chartCanvas.getContext('2d');

// 为按钮添加事件监听器
drawPieChartBtn.addEventListener('click', drawPieChart);
drawBarChartBtn.addEventListener('click', drawBarChart);

// 验证用户输入的数据
function validateData(input) {
    // 去除空格并按逗号分割
    const dataArray = input.replace(/\s+/g, '').split(',');
    // 检查每个值是否为数字
    for (let i = 0; i < dataArray.length; i++) {
        if (isNaN(dataArray[i]) || dataArray[i] === '') {
            return null;
        }
    }
    // 将字符串数组转换为数字数组
    return dataArray.map(Number);
}

// 清除画布
function clearCanvas() {
    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
}

// 绘制饼状图
function drawPieChart() {
    clearCanvas();
    errorMsg.textContent = '';
    const data = validateData(dataInput.value);

    if (data === null) {
        errorMsg.textContent = '请输入有效的数字数据，用逗号分隔。';
        return;
    }

    // 计算总和
    const total = data.reduce((sum, value) => sum + value, 0);
    let startAngle = 0;

    // 定义颜色数组
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    data.forEach((value, index) => {
        // 计算弧度
        const sliceAngle = (value / total) * 2 * Math.PI;
        // 设置填充颜色
        ctx.fillStyle = colors[index % colors.length];
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(chartCanvas.width / 2, chartCanvas.height / 2);
        ctx.arc(
            chartCanvas.width / 2,
            chartCanvas.height / 2,
            Math.min(chartCanvas.width, chartCanvas.height) / 2 - 10,
            startAngle,
            startAngle + sliceAngle
        );
        ctx.closePath();
        ctx.fill();

        // 绘制数据标注
        const labelX = chartCanvas.width / 2 + (Math.min(chartCanvas.width, chartCanvas.height) / 2 - 50) * Math.cos(startAngle + sliceAngle / 2);
        const labelY = chartCanvas.height / 2 + (Math.min(chartCanvas.width, chartCanvas.height) / 2 - 50) * Math.sin(startAngle + sliceAngle / 2);
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        const percent = ((value / total) * 100).toFixed(2) + '%';
        ctx.fillText(percent, labelX, labelY);

        startAngle += sliceAngle;
    });
}

// 绘制柱状图
function drawBarChart() {
    clearCanvas();
    errorMsg.textContent = '';
    const data = validateData(dataInput.value);

    if (data === null) {
        errorMsg.textContent = '请输入有效的数字数据，用逗号分隔。';
        return;
    }

    // 计算最大值
    const maxData = Math.max(...data);
    const barWidth = (chartCanvas.width - 60) / data.length;
    const scale = (chartCanvas.height - 60) / maxData;

    // 绘制坐标轴
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, chartCanvas.height - 50);
    ctx.lineTo(chartCanvas.width - 10, chartCanvas.height - 50);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // 绘制柱状图
    data.forEach((value, index) => {
        const barHeight = value * scale;
        ctx.fillStyle = '#36A2EB';
        ctx.fillRect(
            50 + index * barWidth,
            chartCanvas.height - 50 - barHeight,
            barWidth - 10,
            barHeight
        );

        // 绘制数据标注
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(
            value,
            55 + index * barWidth,
            chartCanvas.height - 55 - barHeight
        );
    });
}

\end{verbatim}

```