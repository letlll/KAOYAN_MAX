<%*
let today = tp.date.now("YYYY-MM-DD")
let inputDate = await tp.system.prompt("输入示例："+ today,today)
titleName = window.moment(inputDate, "YYYY-MM-DD", true).format("YYYY-MM-DD_ddd")

before_date = window.moment(inputDate, "YYYY-MM-DD", true).add(-1,"days").format("YYYY-MM-DD_ddd")

after_date = window.moment(inputDate, "YYYY-MM-DD", true).add(1,"days").format("YYYY-MM-DD_ddd")

let createTime = tp.file.creation_date()
let modificationDate = tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss")
-%>
---
Title: 复习笔记
tags:
  - "#笔记"
  - "#日复习"
Doc_type: 复习反馈
aliases:
  - review
  - 复习反馈
Finished: false
create time : <% createTime %>
modification date: <% modificationDate %>
Review-frequency: daily
---


| 复习日期        | 复习类型 | 核心进展与理解 | 复习完成（✓） |
| ----------- | ---- | ------- | ------- |
| <% today %> | 初次学习 |         | ✓       |
| <% today %> | 日总结  |         | ✓       |

- **说明**：每次复习后记录日期、复习类型（如日总结、周总结）、复习的核心进展（如新理解的知识点或掌握的技巧），并打勾以确认完成。

### 日总结（每日更新）
- **<% today %>**：



## 知识框架与思维导图
- **知识框架**：
  - **基本概念** → **多种方法** → **优化技巧** → **实际应用**

- **思维导图**：
    ```mermaid
	```

## Todo