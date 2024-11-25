如果只有一个 `html` 文件夹，想要根据任务的日期分类展示，可以通过 `Tasks` 插件中的 `due` 或 `created` 字段进行筛选。以下是基于任务日期分类的代码示例，包括 `Today Tasks`、`Pending Tasks`（未完成且无截止日期）、`Overtime Tasks`（已过期未完成的任务）和 `Done Tasks`：

### 示例：`task` 文件内容

````markdown
# Today Tasks
```tasks
not done
path includes "html"
due today
sort by priority
````

---

# Pending Tasks

```tasks
not done
path includes "html"
no due date
sort by priority
```

---

# Overtime Tasks

```tasks
not done
path includes "html"
due before today
sort by due date
```

---

# Done Tasks

```tasks
done
path includes "html"
sort by completed
```

---

### 说明：

1. **Today Tasks**：
    
    - 只展示截止日期为今天的任务。
    - 使用 `due today` 过滤条件。
2. **Pending Tasks**：
    
    - 展示未完成且未设置截止日期的任务。
    - 使用 `no due date` 过滤条件。
3. **Overtime Tasks**：
    
    - 展示未完成且截止日期早于今天的任务（即超时任务）。
    - 使用 `due before today` 过滤条件。
4. **Done Tasks**：
    
    - 展示所有已完成的任务。
    - 使用 `done` 过滤条件，按照完成时间排序。

---

### 示例任务格式

确保你的任务按照 `Tasks` 插件的格式书写，例如：

```markdown
- [ ] 完成前端页面设计 📅 2024-11-25
- [ ] 编写后端接口 📅 2024-11-20
- [x] 修复登录功能 📅 2024-11-23 ✅ 2024-11-24
```

- 📅 表示任务的截止日期（`due`）。
- ✅ 表示任务完成的日期（`completed`）。

这些代码块会动态从 `html` 文件夹中提取符合条件的任务，并在你的 Obsidian 中按分类展示出来。