[Task](../../HTML/Task.md)

要在 Obsidian 中创建一个 `task` 文件，并使用 Tasks 插件来分别记录不同类别的任务（如 `Today Tasks`、`Pending Tasks`、`Overtime Tasks` 和 `Done Tasks`），同时限定任务只显示在特定文件夹中的任务，你可以根据以下示例进行编写。

假设你有以下文件夹结构：

- `Today`：今日任务
- `Pending`：待处理任务
- `Overtime`：超时任务
- `Done`：已完成任务

### 示例：`task` 文件

````markdown
# Today Tasks
```tasks
not done
path includes "Today"
sort by priority
````

---

# Pending Tasks

```tasks
not done
path includes "Pending"
sort by priority
```

---

# Overtime Tasks

```tasks
not done
path includes "Overtime"
sort by priority
```

---

# Done Tasks

```tasks
done
path includes "Done"
sort by priority
```

---

### 说明：

- **Today Tasks**：显示在 `Today` 文件夹中的所有未完成任务。
- **Pending Tasks**：显示在 `Pending` 文件夹中的所有未完成任务。
- **Overtime Tasks**：显示在 `Overtime` 文件夹中的所有未完成任务。
- **Done Tasks**：显示在 `Done` 文件夹中的所有已完成任务。
- **`path includes "folderName"`**：此条件限制任务仅出现在指定的文件夹中。你可以根据需要调整文件夹名称。

### 进一步自定义：

- 如果你希望任务按照特定的优先级或时间顺序排序，可以调整 `sort by` 后面的字段（如 `sort by due date` 或 `sort by created`）。
- 如果有更多的任务分类，可以按相同的方式继续添加更多的任务分类块。

你可以将上述代码复制到你的 Obsidian 文件中，每次查看任务时，它将自动按照分类展示任务并根据文件夹过滤任务。