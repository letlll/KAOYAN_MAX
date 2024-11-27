---
Tags:
  - HTML
  - default
Dlink:
  - "[[---HTMLDFT---]]"
---
CSS（层叠样式表）和 HTML（超文本标记语言）是构建网页的两大核心技术，它们在书写和作用上有很多区别。接下来，我们详细对比这两者的不同之处，帮助你更好地理解它们各自的书写方式。

### **1. 书写语法和结构**

#### **HTML 书写方式**
HTML 用于定义网页的结构和内容，它通过标签来表示页面上的元素，例如文本、图片、链接等。HTML 中每个元素都是一个标签，标签可以包含属性，并且有的标签需要闭合。

- **基本结构**：
  - HTML 中的标签通常是成对出现的，使用 `<tag>` 表示开始标签，`</tag>` 表示结束标签。
  - 有些标签是自闭合的，例如 `<img />`、`<br />`、`<input />` 等。
  - 属性使用 `=` 来赋值，值一般用引号括起来。

**示例：**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例网页</title>
</head>
<body>
    <h1>欢迎访问我的网页</h1>
    <p>这是一个段落。</p>
    <img src="image.jpg" alt="示例图片" />
    <a href="https://example.com">点击这里</a>
</body>
</html>
```

#### **CSS 书写方式**
CSS 用于定义网页元素的样式（如颜色、字体、布局等），它通过选择器来定位 HTML 元素，并对这些元素应用样式。

- **基本结构**：
  - CSS 的语法由 **选择器** 和 **声明块** 组成。声明块包含一个或多个样式规则，规则由 **属性** 和 **值** 组成。
  - 属性和值之间用 `:` 分隔，不同的属性之间用 `;` 分隔。

**示例：**
```css
/* 选择 h1 元素并设置样式 */
h1 {
    color: red;           /* 文字颜色为红色 */
    font-size: 24px;      /* 字体大小为 24px */
    text-align: center;   /* 文字居中对齐 */
}

/* 选择 p 元素并设置样式 */
p {
    font-family: Arial, sans-serif; /* 字体为 Arial */
    line-height: 1.6;                /* 行高为 1.6 */
    color: #333;                     /* 文字颜色为深灰色 */
}
```

---

### **2. 作用和职责**

- **HTML**：HTML 主要负责构建网页的内容和结构。它定义了网页上的各种元素，如段落、图片、标题、链接等。
- **CSS**：CSS 主要负责网页的表现和布局。它定义了这些元素的样式，包括颜色、字体、大小、位置、间距等。

**示例**：
- **HTML**：定义页面内容
  ```html
  <h1>标题</h1>
  <p>这里是一个段落。</p>
  ```

- **CSS**：定义样式
  ```css
  h1 {
      font-size: 30px;
      color: blue;
  }
  p {
      font-size: 18px;
      color: green;
  }
  ```

---

### **3. 标签和选择器的区别**

#### **HTML 标签**：
- 在 HTML 中，元素通过标签来标识，比如 `<h1>`、`<p>`、`<div>` 等。这些标签决定了网页的结构和内容。

**示例**：
```html
<div>
    <p>这是一段文字。</p>
</div>
```

#### **CSS 选择器**：
- 在 CSS 中，选择器用来选中 HTML 元素，然后为其应用样式。选择器可以是元素名称、类名、ID 等。

**示例**：
```css
/* 元素选择器 */
div {
    background-color: lightblue;
}

p {
    color: red;
}

/* 类选择器 */
.container {
    width: 100%;
    padding: 20px;
}

/* ID 选择器 */
#header {
    background-color: darkgray;
}
```

---

### **4. 引用方式**

#### **HTML 中引用外部文件**：
- HTML 中通过 `<link>` 标签引入外部 CSS 文件，或者通过 `<script>` 标签引入外部 JavaScript 文件。
  
**示例：** 引用外部 CSS 文件
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

**示例：** 引用外部 JavaScript 文件
```html
<body>
    <script src="script.js"></script>
</body>
```

#### **CSS 中引用外部文件**：
- CSS 文件本身并不直接引入其他文件，但可以通过 `@import` 语法在 CSS 中引用其他 CSS 文件。

**示例：**
```css
/* 引入外部样式表 */
@import url('another-styles.css');
```

---

### **5. 内联和外联方式**

#### **HTML 内联与外联**：
- **内联样式**：在 HTML 标签中直接通过 `style` 属性设置样式。
- **外部样式表**：通过 `<link>` 引入外部 CSS 文件。

**内联样式示例**：
```html
<h1 style="color: red; text-align: center;">标题</h1>
```

**外部样式示例**：
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

#### **CSS 内联与外联**：
- **内联样式**：CSS 可以直接写在 HTML 元素的 `style` 属性中，应用到该元素上。
- **外部样式表**：推荐使用外部 CSS 文件，保持代码的整洁和可维护性。

**内联样式示例**：
```html
<p style="color: green;">这是一段文字。</p>
```

**外部样式表示例**：
```css
/* 在 styles.css 文件中 */
p {
    color: green;
}
```

---

### **总结表格：CSS 和 HTML 的主要区别**

| **特性**             | **HTML**                                     | **CSS**                                     |
|----------------------|----------------------------------------------|---------------------------------------------|
| **作用**             | 定义页面结构和内容                           | 定义页面元素的样式和布局                    |
| **语法**             | `<tag>内容</tag>`                             | `selector { property: value; }`             |
| **标签/选择器**      | 以 `<tag>` 开始的标签                         | 选择器（如 `div`, `.class`, `#id`）          |
| **属性值书写**       | 使用 `=` 来赋值属性，值用引号包围              | 属性和值使用 `:`，多个属性用 `;` 分隔       |
| **引用外部文件**     | 使用 `<link>` 引用外部 CSS，`<script>` 引用 JS  | 使用 `@import` 引用其他 CSS 文件            |
| **内联与外联方式**   | 可以使用内联样式（`style`）或外部样式表（`<link>`） | 推荐使用外部样式表，内联样式用 `style` 属性 |
| **自闭合标签**       | 一些标签如 `<img>`, `<input>` 不需要结束标签   | CSS 本身没有自闭合概念                      |

---

### **总结**
- **HTML** 主要用于结构和内容，元素通过标签来表示，每个标签可能会有属性。
- **CSS** 主要用于样式和表现，规则通过选择器来定位 HTML 元素，并为其设置样式。

通过这种方式，你可以清楚地区分 HTML 和 CSS 的作用，并能够正确书写两者的代码。如果你有更多关于这两个技术的疑问，随时告诉我！

