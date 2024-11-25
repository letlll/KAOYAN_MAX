是的，在拖放本地文件时，`DataTransfer` 对象的 `files` 属性可以用于获取文件列表。该属性返回一个 `FileList` 对象，包含所有被拖放的文件，你可以遍历该列表来访问每个文件的相关信息。

### 示例：处理本地文件拖放

以下是一个完整的示例，展示了如何使用 `event.dataTransfer.files` 属性来获取拖放的文件，并在控制台输出文件的名称。

#### HTML 部分：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>本地文件拖放示例</title>
  <style>
    /* 拖放目标区域 */
    .dropzone {
      width: 300px;
      height: 200px;
      border: 2px dashed #ccc;
      margin-top: 50px;
      text-align: center;
      line-height: 200px;
      font-size: 20px;
    }
  </style>
</head>
<body>

  <h2>将文件拖放到下方区域</h2>
  
  <div class="dropzone">
    拖放文件到这里
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const dropzone = document.querySelector('.dropzone');

      // 允许放置文件
      dropzone.addEventListener('dragover', function(event) {
        event.preventDefault(); // 允许放置
        dropzone.style.backgroundColor = '#f0f0f0';
      });

      dropzone.addEventListener('dragleave', function() {
        dropzone.style.backgroundColor = '#fff';
      });

      // 处理文件拖放
      dropzone.addEventListener('drop', function(event) {
        event.preventDefault(); // 防止默认的打开行为
        dropzone.style.backgroundColor = '#fff';
        
        const files = event.dataTransfer.files; // 获取文件列表

        // 遍历文件列表
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log('文件名：', file.name); // 输出文件名
          console.log('文件类型：', file.type); // 输出文件类型
          console.log('文件大小：', file.size); // 输出文件大小
          
          // 可以在此处理文件，例如上传或读取内容
        }

        // 提示文件拖放已完成
        dropzone.textContent = '文件已放置！';
      });
    });
  </script>

</body>
</html>
```

### 代码解析：

1. **拖放目标区域**：
    
    - `.dropzone` 区域是我们设置为目标区域，用户可以将文件拖放到此区域。
    - `dragover` 事件监听器使用 `event.preventDefault()` 来允许文件被拖放。
    - `dragleave` 事件监听器用于处理鼠标离开目标区域时的样式变化。
2. **处理拖放事件**：
    
    - 在 `drop` 事件处理函数中，我们使用 `event.dataTransfer.files` 获取文件列表。`files` 属性返回一个 `FileList` 对象，你可以通过 `files[i]` 来访问每个文件的属性。
    - 对于每个文件，我们输出其文件名、文件类型和文件大小等信息。
    - 你可以进一步对文件进行处理，例如上传到服务器或读取文件内容。

### 功能演示：

- 当用户将文件拖放到 `.dropzone` 区域时，控制台会显示文件的相关信息（文件名、类型和大小）。
- 目标区域的文本内容会更改为 "文件已放置！"，并且可以在控制台中查看输出。

### 注意：

- **`FileList`对象**：`files` 属性返回的 `FileList` 对象类似于数组，可以通过 `files.length` 来获取文件数量，并通过索引访问每个文件。
- **文件大小和类型**：每个 `file` 对象都有诸如 `name`、`type` 和 `size` 等属性，便于你对文件进行处理。

这个示例展示了如何处理本地文件的拖放操作，并通过 `DataTransfer` 对象的 `files` 属性获取拖放的文件列表。