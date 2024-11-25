---
Tags:
  - HTML
Dlink:
  - "[[../../HTML/拖放H_LF/---拖放---]]"
---
>[!info] 定义
### 拖放事件详细解析

按照逻辑顺序，对每个事件的触发时机和用途进行详细讲解，尽量避免因英文原文导致的歧义。

| 事件                                                                                          | On 型事件处理程序                                                                                                   | 触发时刻                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`drag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)           | [`ondrag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event "ondrag")                 | 当拖拽元素或选中的文本时触发。                                                                                                                                               |
| [`dragend`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event)     | [`ondragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event "此页面目前仅提供英文版本")     | 当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见[结束拖拽](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragend "此页面目前仅提供英文版本"))      |
| [`dragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event) | [`ondragenter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event "此页面目前仅提供英文版本") | 当拖拽元素或选中的文本到一个可释放目标时**瞬间**触发（见 [指定释放目标](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets "此页面目前仅提供英文版本")）。 |
| [`dragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event) | [`ondragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event "ondragleave")  | 当拖拽元素或选中的文本离开一个可释放目标时触发。                                                                                                                                      |
| [`dragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event)   | [`ondragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event "此页面目前仅提供英文版本")   | 当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）。                                                                                                                        |
| [`dragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event) | [`ondragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event "此页面目前仅提供英文版本") | 当用户开始拖拽一个元素或选中的文本时触发（见[开始拖拽操作](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragstart "此页面目前仅提供英文版本")）。            |
| [`drop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event)           | [`ondrop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event "ondrop")                 | 当元素或选中的文本在可释放目标上被释放时触发（见[执行释放](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop "此页面目前仅提供英文版本")）。                 |

---

#### 1. `drag` 事件

- **事件处理程序**：`ondrag`
- **触发时刻**：当拖拽元素或选中的文本时持续触发。
- **详细说明**：
    - 该事件在拖拽过程中不断触发，频率可能很高。
    - 适用于需要在拖拽过程中实时更新界面或状态的场景。
    - **注意**：由于触发频率高，应避免在此事件中执行耗时操作，以免影响性能。

---

#### 2. `dragstart` 事件

- **事件处理程序**：`ondragstart`
- **触发时刻**：当用户开始拖拽一个元素或选中的文本时触发。
- **详细说明**：
    - 是拖拽操作的起始事件。
    - 常用于设置拖拽的数据（使用 `event.dataTransfer`）和自定义拖拽效果。
    - 可在此事件中修改拖拽元素的外观或设置辅助信息。

---

#### 3. `dragend` 事件

- **事件处理程序**：`ondragend`
- **触发时刻**：当拖拽操作结束时触发，例如松开鼠标按钮或按下“Esc”键。
- **详细说明**：
    - 无论拖拽是否成功放置到目标区域，都会触发此事件。
    - 可用于清理拖拽过程中设置的样式或状态。
    - 有助于确保界面在拖拽结束后恢复正常。

---

#### 4. `dragenter` 事件

- **事件处理程序**：`ondragenter`
- **触发时刻**：当被拖拽的元素或文本**进入**一个可释放目标时瞬间触发。
- **详细说明**：
    - 在拖拽元素进入放置目标区域的那一刻触发。
    - 常用于高亮显示放置区域，提示用户可以在此放置。
    - **注意**：如果放置区域包含子元素，`dragenter` 事件可能会多次触发。

---

#### 5. `dragover` 事件

- **事件处理程序**：`ondragover`
- **触发时刻**：当被拖拽的元素或文本在可释放目标上方移动时持续触发，通常每 100 毫秒触发一次。
- **详细说明**：
    - 默认情况下，元素是不接受放置的，必须在此事件中调用 `event.preventDefault()` 来允许放置。
    - 可用于在拖拽过程中动态显示放置位置或提供其他实时反馈。
    - 同样需要注意触发频率，避免性能问题。

---

#### 6. `dragleave` 事件

- **事件处理程序**：`ondragleave`
- **触发时刻**：当被拖拽的元素或文本**离开**可释放目标时触发。
- **详细说明**：
    - 在拖拽元素离开放置区域的那一刻触发。
    - 通常用于移除 `dragenter` 事件中添加的视觉提示，如高亮效果。
    - **注意**：和 `dragenter` 类似，嵌套的子元素可能会导致事件多次触发。

---

#### 7. `drop` 事件

- **事件处理程序**：`ondrop`
- **触发时刻**：当被拖拽的元素或文本在可释放目标上**被释放**时触发。
- **详细说明**：
    - 必须在此事件中调用 `event.preventDefault()`，以防止浏览器的默认处理（如打开链接、显示文件）。
    - 可通过 `event.dataTransfer.getData()` 获取在 `dragstart` 事件中设置的数据。
    - 是处理放置逻辑的主要事件，例如更新界面、保存数据等。

---

### 总体流程

1. **开始拖拽**：
    
    - `dragstart`：用户开始拖拽元素，初始化拖拽数据。
2. **拖拽过程中**：
    
    - `drag`：持续触发，可用于更新拖拽状态。
    - `dragenter`：拖拽元素进入放置目标，通常用于视觉提示。
    - `dragover`：拖拽元素在放置目标上方移动，需调用 `event.preventDefault()` 允许放置。
    - `dragleave`：拖拽元素离开放置目标，移除视觉提示。
3. **结束拖拽**：
    
    - `drop`：在放置目标上释放拖拽元素，处理放置逻辑。
    - `dragend`：拖拽操作结束，清理状态。

---

### 注意事项

- **事件触发频率**：
    
    - `drag` 和 `dragover` 事件会频繁触发，避免在其中执行大量计算或操作。
- **默认行为**：
    
    - 为了使放置目标接受拖拽元素，必须在 `dragover` 和 `drop` 事件中调用 `event.preventDefault()`。
- **数据传递**：
    
    - 使用 `event.dataTransfer` 对象在拖拽源和放置目标之间传递数据。
- **浏览器兼容性**：
    
    - 不同浏览器对拖放事件的支持可能存在差异，开发时应测试主流浏览器的行为。
- **嵌套元素**：
    
    - 当放置目标包含子元素时，`dragenter` 和 `dragleave` 可能会多次触发，需要通过计数或其他方式处理。

---

### 示例代码片段

```javascript
// 拖拽源
element.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('text/plain', '拖拽的数据');
});

// 放置目标
dropZone.addEventListener('dragover', function(event) {
  event.preventDefault(); // 必须的，允许放置
});

dropZone.addEventListener('drop', function(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  console.log('接收到的数据：', data);
});
```
