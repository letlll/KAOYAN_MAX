```latex
\chapter{代码：}
\section{HTML}


\begin{lstlisting}[language=HTML, linewidth=\textwidth, breaklines=true]

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>电子日历</title>

    <link rel="stylesheet" href="calendar.css">

</head>

<body>

    <div id="calendar">

        <h2 id="month-year"></h2>

        <div id="weekdays">

            <span>日</span>

            <span>一</span>

            <span>二</span>

            <span>三</span>

            <span>四</span>

            <span>五</span>

            <span>六</span>

        </div>

        <div id="days"></div>

        <button id="prev">上个月</button>

        <button id="next">下个月</button>

    </div>

    <script src="calendar.js"></script>

</body>

</html>

\end{lstlisting}

\section{CSS}


\begin{lstlisting}[language=HTML, linewidth=\textwidth, breaklines=true]

/* 样式总体布局 */

#calendar {

    width: 320px;

    margin: 20px auto;

    padding: 10px;

    border: 1px solid #ccc;

    border-radius: 10px;

    text-align: center;

    font-family: Arial, sans-serif;

}

  

/* 月份和年份标题 */

#month-year {

    font-size: 1.8em;

    margin-bottom: 20px;

}

  

/* 星期显示样式 */

#weekdays {

    display: flex;

    justify-content: space-between;

    font-weight: bold;

}

  

/* 日期网格布局 */

#days {

    overflow: hidden;

    padding: 10px 0;

}

  

#days div {

    float: left;

    width: 14.28%; /* 7列布局 */

    padding: 10px 0;

    box-sizing: border-box;

    background-color: #f9f9f9;

    margin: 2px 0;

}

  

#days div:hover {

    background-color: #e0e0e0;

    cursor: pointer;

}

  

/* 当天日期高亮显示 */

#days .today {

    background-color: #ffcccb;

    color: red;

    font-weight: bold;

    border-radius: 5px;

}

  

/* 上一个月和下一个月按钮样式 */

#prev, #next {

    margin: 20px 10px 0;

    padding: 10px 15px;

    font-size: 1em;

    border: none;

    background-color: #007BFF;

    color: white;

    border-radius: 5px;

    cursor: pointer;

}

  

#prev:hover, #next:hover {

    background-color: #0056b3;

}

\end{lstlisting}

\section{JavaScript}


\begin{lstlisting}[language=HTML, linewidth=\textwidth, breaklines=true]

document.addEventListener("DOMContentLoaded", function () {

    const calendar = document.getElementById("calendar");

    const monthYear = document.getElementById("month-year");

    const daysContainer = document.getElementById("days");

    const prevButton = document.getElementById("prev");

    const nextButton = document.getElementById("next");

  

    let currentDate = new Date();

  

    function renderCalendar() {

        const year = currentDate.getFullYear();

        const month = currentDate.getMonth();

        const today = new Date();

  

        monthYear.textContent = `${year}年 ${month + 1}月`;

  

        // 清空之前的日期

        daysContainer.innerHTML = "";

  

        // 获取本月第一天和最后一天

        const firstDay = new Date(year, month, 1).getDay();

        const lastDate = new Date(year, month + 1, 0).getDate();

  

        // 渲染日期

        for (let i = 0; i < firstDay; i++) {

            const emptyDiv = document.createElement("div");

            emptyDiv.classList.add("empty");

            daysContainer.appendChild(emptyDiv);

        }

  

        for (let date = 1; date <= lastDate; date++) {

            const dayDiv = document.createElement("div");

            dayDiv.textContent = date;

            if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {

                dayDiv.classList.add("today");

            }

            daysContainer.appendChild(dayDiv);

        }

    }

  

    prevButton.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() - 1);

        renderCalendar();

    });

  

    nextButton.addEventListener("click", () => {

        currentDate.setMonth(currentDate.getMonth() + 1);

        renderCalendar();

    });

  

    // 初始渲染

    renderCalendar();

});

\end{lstlisting}

```