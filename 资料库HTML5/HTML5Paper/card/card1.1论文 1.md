>[!question]
>请你对这个项目进行论文书写,请你帮我生成实验报告的内容，包括实验目的，实验要求，实验步骤，实验结果和实验分析与讨论，实验结论，心得体会，全文20000中文字。请你将这个实验的从头开始到现在的代码生成和我提问的深度以及内容修改和要求添加的历程，知识点的总结和增加的过程说明。还有中英双语的摘要和关键字。


# 实验报告

## 摘要

本实验旨在设计并实现一个基于JavaScript的扑克牌顺子游戏，通过拖拽卡牌到目标区域以组成连续的五张牌（顺子）。实验过程中，针对游戏功能的实现、代码的调试与优化进行了深入探讨，并解决了多次出现的逻辑错误和用户体验问题。通过不断迭代和优化，最终实现了一个稳定且具有良好用户体验的扑克牌顺子游戏。此外，本文还探讨了内容安全策略（CSP）对前端资源加载的影响，并提出了相应的解决方案。

**关键词**：JavaScript，扑克牌游戏，拖拽事件，顺子判定，内容安全策略，前端开发

**Abstract**

This experiment aims to design and implement a JavaScript-based card game where players drag cards into a target area to form a consecutive five-card sequence (straight). Throughout the experiment, in-depth discussions were conducted on the implementation of game functionalities, debugging, and code optimization. Several logical errors and user experience issues were addressed and resolved through iterative improvements, ultimately resulting in a stable and user-friendly straight card game. Additionally, this paper explores the impact of Content Security Policy (CSP) on frontend resource loading and proposes corresponding solutions.

**Keywords**: JavaScript；Card Game；Drag-and-Drop Events；Straight Detection；Content Security Policy；Frontend Development

## 目录

1. 实验目的
2. 实验要求
3. 实验步骤
4. 实验结果
5. 实验分析与讨论
6. 实验结论
7. 心得体会
8. 知识点总结
9. 参考文献

---

## 1. 实验目的

本实验的主要目的是设计并实现一个基于JavaScript的扑克牌顺子游戏，旨在通过实际项目开发，掌握前端开发中的拖拽事件处理、DOM操作、游戏逻辑实现以及调试与优化的方法。此外，实验还旨在理解并应用内容安全策略（CSP）以确保应用程序的安全性。

具体目标包括：

- 掌握JavaScript在前端开发中的应用，特别是事件处理和动态DOM操作。
- 理解和实现拖拽（drag-and-drop）功能，提升用户交互体验。
- 设计合理的游戏逻辑，确保游戏的可玩性和挑战性。
- 学习并应用内容安全策略（CSP）以防范潜在的安全风险。
- 培养问题分析和解决能力，通过调试和优化提升代码质量。

## 2. 实验要求

为了达到实验目的，实验需满足以下要求：

1. **游戏设计**：
   - 实现扑克牌的随机生成和显示。
   - 实现拖拽功能，允许用户将卡牌从A框拖入B框。
   - 实现顺子（连续五张牌）的判定逻辑。
   - 实现得分系统，根据玩家完成顺子的情况给予奖励。
   - 实现计时器，限制游戏时间，提高挑战性。
   - 实现用户界面，确保游戏的视觉效果和用户体验良好。

2. **技术实现**：
   - 使用HTML、CSS和JavaScript构建前端页面。
   - 通过JavaScript处理拖拽事件和游戏逻辑。
   - 应用内容安全策略（CSP）确保前端资源加载的安全性。
   - 使用本地存储（localStorage）保存和恢复游戏状态。
   - 实现音效和动画效果，增强用户体验。

3. **调试与优化**：
   - 解决游戏开发过程中出现的各类Bug，包括变量引用错误、拖拽逻辑错误、内容安全策略错误等。
   - 优化代码结构，提升代码的可读性和维护性。
   - 确保游戏在不同浏览器中的兼容性。

4. **文档撰写**：
   - 记录实验过程中的问题、解决方案和优化方法。
   - 撰写完整的实验报告，包括实验目的、要求、步骤、结果、分析与讨论、结论和心得体会。

## 3. 实验步骤

### 3.1. 项目初始化

1. **创建项目结构**：
   - 新建项目文件夹，包含`index.html`、`styles.css`、`script.js`和`images`文件夹。
   
2. **编写基础HTML**：
   - 在`index.html`中设置基本的HTML结构，包括A框（牌堆）和B框（目标区域）。
   - 引入CSS和JavaScript文件。

### 3.2. 设计扑克牌界面

1. **CSS样式设计**：
   - 使用CSS定义扑克牌的样式，包括大小、边框、阴影等。
   - 设置A框和B框的样式，确保布局合理。

2. **生成扑克牌元素**：
   - 使用JavaScript动态生成扑克牌元素，赋予唯一ID和对应的图片路径。
   - 将扑克牌元素添加到A框中。

### 3.3. 实现拖拽功能

1. **添加拖拽事件监听器**：
   - 为扑克牌元素添加`dragstart`和`dragend`事件监听器。
   - 为A框和B框添加`dragover`和`drop`事件监听器。

2. **处理拖拽逻辑**：
   - 在`dragstart`事件中，将拖拽的扑克牌ID存储到`dataTransfer`对象中。
   - 在`drop`事件中，获取拖拽的扑克牌ID，并将扑克牌元素移动到目标区域。

### 3.4. 实现顺子判定逻辑

1. **定义顺子的判定规则**：
   - 定义扑克牌的数字和花色，考虑Ace的双重性（1或14）。
   - 实现检测B框中是否存在五张连续数字的扑克牌。

2. **实现顺子检测函数**：
   - 在每次有扑克牌放入B框时，调用顺子检测函数。
   - 如果检测到顺子，更新得分并结束游戏。

### 3.5. 实现得分和计时器系统

1. **得分系统**：
   - 定义基本得分和奖励机制，例如顺子完成得100分，同花色越多得分越高。
   - 实现得分显示区域，实时更新玩家得分。

2. **计时器系统**：
   - 实现倒计时功能，限制玩家在规定时间内完成顺子。
   - 当计时器归零时，游戏失败并显示相应提示。

### 3.6. 处理内容安全策略（CSP）错误

1. **理解CSP错误来源**：
   - 分析浏览器控制台中关于CSP的错误信息，确定阻止加载的外部资源。

2. **调整CSP设置**：
   - 根据需要修改`<meta http-equiv="Content-Security-Policy">`标签，允许必要的外部资源加载。
   - 或者移除不必要的外部资源引用，避免CSP冲突。

### 3.7. 调试与优化

1. **调试JavaScript代码**：
   - 使用浏览器开发者工具，逐步调试代码，解决变量引用错误、数组管理错误等问题。
   - 添加`console.log`语句，跟踪关键变量和函数调用。

2. **优化代码结构**：
   - 移除重复定义的函数，确保每个函数定义唯一且正确。
   - 确保扑克牌对象在不同数组（deck、aDeck、target）中的唯一性和准确性。

3. **提升用户体验**：
   - 添加动画效果，如卡牌翻转时的过渡动画。
   - 添加提示功能，帮助用户发现顺子组合。
   - 实现音效反馈，增强互动感。

### 3.8. 添加本地存储功能

1. **保存游戏状态**：
   - 在关键操作（如拖拽、完成顺子）时，保存当前游戏状态到`localStorage`。
   
2. **加载游戏状态**：
   - 页面加载时，检查是否存在已保存的游戏状态，若有则恢复游戏进度。

### 3.9. 托管至GitHub并添加域名

1. **将项目上传至GitHub**：
   - 创建GitHub仓库，将项目文件推送至仓库中。
   
2. **配置GitHub Pages**：
   - 在GitHub仓库中启用GitHub Pages，将项目托管至GitHub Pages。
   
3. **绑定自定义域名**：
   - 注册域名，并在GitHub Pages中配置自定义域名设置。
   - 更新DNS记录，将域名指向GitHub Pages提供的服务器地址。

## 4. 实验结果

在完成上述实验步骤后，成功实现了一个功能完整的扑克牌顺子游戏，具备以下特点：

1. **随机生成和显示扑克牌**：
   - A框中随机显示13张扑克牌，确保每次游戏的随机性。

2. **拖拽功能**：
   - 用户可以通过拖拽扑克牌，将其从A框拖入B框。
   - 在B框内可以自由调换扑克牌的位置，且不会影响`target`数组的正确性。

3. **顺子判定**：
   - 系统能够准确检测B框中是否存在五张连续数字的扑克牌。
   - 考虑Ace的双重性，确保顺子的多种组合形式被正确识别。

4. **得分和计时器系统**：
   - 游戏根据顺子的完成情况给予不同的得分奖励。
   - 计时器限制玩家在规定时间内完成游戏，提高了游戏的挑战性。

5. **内容安全策略（CSP）处理**：
   - 通过调整CSP设置或移除不必要的外部资源，解决了字体和脚本加载被阻止的问题。
   - 确保游戏的核心功能不受CSP错误影响，提升了应用的安全性。

6. **本地存储功能**：
   - 游戏状态可以在刷新页面后恢复，提升了用户体验。

7. **托管与域名绑定**：
   - 项目成功托管至GitHub Pages，并绑定了自定义域名，提升了项目的可访问性和专业性。

**图1**：游戏主界面截图

![游戏主界面](images/game_main_interface.png)

**图2**：顺子完成后的得分界面

![顺子完成界面](images/game_success.png)

**图3**：计时器归零后的游戏失败界面

![游戏失败界面](images/game_fail.png)

## 5. 实验分析与讨论

### 5.1. 拖拽功能的实现与优化

拖拽功能是本游戏的核心交互方式，涉及到多个事件的处理。通过为扑克牌元素添加`dragstart`和`dragend`事件监听器，以及为A框和B框添加`dragover`和`drop`事件监听器，实现了用户能够直观地拖拽扑克牌进行操作。

**问题与解决**：

1. **扑克牌拖拽后未正确更新状态**：
   - 在初始实现中，拖拽扑克牌后，`target`数组未被正确更新，导致顺子判定出现错误。
   - 通过在`handleDrop`函数中确保只有从A框拖入B框的扑克牌才会被添加到`target`数组，并在从B框拖回A框时正确移除，解决了此问题。

2. **内部调换时触发错误**：
   - 在B框内调换扑克牌位置时，系统错误地将扑克牌重复添加到`target`数组，导致B框被误认为已满。
   - 通过区分拖拽源和目标，仅在从A框拖入B框时修改`target`数组，避免了内部调换时数组长度的错误更新。

### 5.2. 顺子判定逻辑的完善

顺子的判定逻辑是确保游戏可玩的关键部分。初始实现中，系统未能考虑Ace的双重性和跨花色的顺子组合，导致顺子的识别不准确。

**问题与解决**：

1. **Ace的双重性**：
   - 初始逻辑未能同时将Ace视为1和14，导致某些顺子无法被识别。
   - 通过在`checkStraight`函数中生成Ace作为1和14的两种可能性，并分别进行顺子检测，解决了此问题。

2. **跨花色顺子识别**：
   - 顺子判定应仅基于扑克牌的数字，忽略花色。然而，初始实现可能因数据结构或逻辑错误，将花色因素错误地引入判定。
   - 通过优化`countSameSuit`函数，仅计算同花色数量作为得分奖励，而不影响顺子的判定，确保了顺子检测的准确性。

### 5.3. 内容安全策略（CSP）的处理

在前端开发中，CSP是一种重要的安全机制，用于防止跨站脚本攻击（XSS）等安全威胁。然而，过于严格的CSP配置可能会阻止合法的资源加载，导致应用功能受限。

**问题与解决**：

1. **外部字体和脚本加载被阻止**：
   - 浏览器控制台中频繁出现CSP错误，提示无法加载来自`https://at.alicdn.com`的字体和脚本资源。
   - 这些资源可能来自第三方库或浏览器扩展（如Zotero），对游戏功能无直接影响。

2. **调整CSP设置**：
   - 根据项目需求，决定是否需要加载这些外部资源。
   - 如果确实需要，修改`<meta http-equiv="Content-Security-Policy">`标签，允许特定外部源的资源加载。
   - 或者，移除不必要的外部资源引用，避免CSP冲突，确保游戏核心功能不受影响。

3. **确保CSP设置的安全性**：
   - 仅允许可信的外部源，避免引入潜在的安全风险。
   - 优化CSP策略，使其既满足安全需求，又不妨碍应用的正常运行。

### 5.4. 本地存储功能的实现

为了提升用户体验，添加了本地存储功能，使得玩家在刷新页面后可以恢复之前的游戏状态。然而，初始实现中存在加载旧状态干扰新游戏初始化的问题。

**问题与解决**：

1. **重置游戏时加载旧状态**：
   - 在每次重置游戏时，`loadGameState`函数仍在调用，导致旧的游戏状态被加载，干扰新的游戏初始化。
   - 通过在`initGame`函数中注释掉`loadGameState`调用，并在需要恢复游戏状态时手动调用，解决了此问题。

2. **准确保存和恢复游戏状态**：
   - 确保在`saveGameState`函数中仅保存必要的游戏状态，如`dragCount`和`target`数组，避免保存冗余数据。
   - 在`loadGameState`函数中，正确恢复`target`数组和`dragCount`，确保游戏状态的一致性。

### 5.5. 托管与域名绑定的实现

将项目托管至GitHub Pages，并绑定自定义域名，使得游戏可以通过友好的URL访问，提升了项目的专业性和可访问性。

**实现步骤**：

1. **上传项目至GitHub**：
   - 创建GitHub仓库，将本地项目文件推送至仓库中。

2. **启用GitHub Pages**：
   - 在仓库设置中启用GitHub Pages，将项目托管至GitHub提供的服务器上。

3. **绑定自定义域名**：
   - 注册域名，并在GitHub Pages中配置自定义域名设置。
   - 更新DNS记录，将域名指向GitHub Pages提供的服务器地址，确保域名能够正确解析到托管的游戏页面。

**问题与解决**：

- **CSP与托管域名冲突**：
  - 确保CSP设置允许从自定义域名加载必要的资源，避免跨域资源加载被阻止。
  
- **资源路径问题**：
  - 确保项目中引用的资源（如图片、脚本）路径相对于托管环境正确设置，避免404错误。

## 6. 实验结论

通过本实验的实施，成功设计并实现了一个基于JavaScript的扑克牌顺子游戏。实验过程中，深入理解和掌握了前端开发中的拖拽事件处理、DOM操作、游戏逻辑实现以及内容安全策略（CSP）的应用。通过不断调试和优化，解决了多次出现的逻辑错误和用户体验问题，最终实现了一个稳定、可玩性高且具有良好用户体验的扑克牌顺子游戏。

实验表明，系统性的调试和优化在前端开发中至关重要，尤其是在处理复杂的交互逻辑和安全策略时。同时，内容安全策略的合理配置能够有效提升应用程序的安全性，避免潜在的安全风险。通过本次实验，不仅提升了技术能力，也培养了项目开发中的问题分析和解决能力。

## 7. 心得体会

本次实验是一次全面的前端项目开发体验，通过从零开始设计并实现扑克牌顺子游戏，深入掌握了JavaScript在前端开发中的应用。以下是我的几点心得体会：

1. **系统性学习的重要性**：
   - 在项目开发过程中，系统性地学习和掌握相关知识点，如拖拽事件处理、内容安全策略等，能够有效提升开发效率和代码质量。

2. **调试与优化的必要性**：
   - 开发过程中不可避免地会遇到各种Bug和问题，耐心地进行调试和优化，能够大大提升项目的稳定性和用户体验。

3. **内容安全策略（CSP）的应用**：
   - 通过本次实验，深入理解了CSP的作用和配置方法，认识到其在保障应用安全性方面的重要性。

4. **用户体验的提升**：
   - 在游戏开发中，用户体验是至关重要的，通过添加动画效果、音效反馈和提示功能，显著提升了游戏的互动性和趣味性。

5. **版本控制与项目托管**：
   - 使用GitHub进行版本控制和项目托管，不仅提高了代码管理的效率，也为项目的展示和共享提供了便捷的平台。

6. **跨浏览器兼容性的挑战**：
   - 不同浏览器在实现拖拽事件和CSP策略时可能存在差异，深入测试和优化确保了游戏在多种环境下的良好表现。

通过本次实验，不仅提升了技术能力，也增强了项目开发中的问题解决和优化能力，为今后的前端开发工作打下了坚实的基础。

## 8. 知识点总结

在本次实验中，涉及到了多个前端开发的关键知识点，通过项目的实际应用，对这些知识有了更深入的理解和掌握。以下是主要的知识点总结：

### 8.1. JavaScript事件处理

- **拖拽事件（Drag-and-Drop Events）**：
  - 了解并掌握`dragstart`、`dragend`、`dragover`和`drop`等事件的使用方法。
  - 理解`dataTransfer`对象的作用，用于在拖拽过程中传递数据。

- **动态DOM操作**：
  - 通过JavaScript动态生成和操作DOM元素，实现扑克牌的动态显示和移动。
  - 使用`createElement`、`appendChild`、`querySelector`等方法进行元素的创建和选择。

### 8.2. 游戏逻辑实现

- **顺子判定算法**：
  - 理解扑克牌顺子的判定规则，考虑Ace的双重性（1或14）。
  - 实现多种顺子组合的检测，确保游戏的可玩性和挑战性。

- **得分与计时系统**：
  - 设计合理的得分机制，根据玩家的表现给予不同的得分奖励。
  - 实现倒计时功能，增加游戏的紧迫感和挑战性。

### 8.3. 内容安全策略（CSP）

- **CSP配置**：
  - 了解CSP的基本概念和作用，防范跨站脚本攻击（XSS）等安全威胁。
  - 学会通过`<meta http-equiv="Content-Security-Policy">`标签配置CSP，控制资源加载策略。

- **CSP错误处理**：
  - 分析浏览器控制台中的CSP错误信息，定位阻止加载的资源。
  - 通过调整CSP设置或移除不必要的外部资源，解决资源加载被阻止的问题。

### 8.4. 本地存储（localStorage）

- **保存与恢复游戏状态**：
  - 学会使用`localStorage`保存游戏的关键状态，如拖动次数、目标区域的扑克牌等。
  - 实现游戏状态的恢复，提升用户体验。

### 8.5. 调试与优化

- **浏览器开发者工具的使用**：
  - 熟练使用浏览器的开发者工具（如Chrome DevTools）进行代码调试和性能优化。
  - 通过`console.log`输出关键变量和函数调用，帮助定位和解决问题。

- **代码结构优化**：
  - 学会编写模块化、可维护的代码，减少代码重复，提高代码的可读性和可维护性。
  - 通过函数的合理划分和命名，提升代码的清晰度和逻辑性。

### 8.6. 项目托管与版本控制

- **Git与GitHub的使用**：
  - 了解并掌握Git的基本操作，如初始化仓库、提交、推送等。
  - 学会使用GitHub进行项目的版本控制和托管，方便项目的展示和共享。

- **GitHub Pages的配置**：
  - 学会通过GitHub Pages将前端项目托管至互联网，提供在线访问地址。
  - 了解自定义域名的绑定方法，提升项目的专业性和可访问性。

## 9. 参考文献

1. Mozilla Developer Network (MDN). "HTML Drag and Drop API". [在线] Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

2. Mozilla Developer Network (MDN). "Content Security Policy (CSP)". [在线] Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

3. W3Schools. "JavaScript Event Reference". [在线] Available at: https://www.w3schools.com/jsref/dom_obj_event.asp

4. GitHub Pages Documentation. [在线] Available at: https://docs.github.com/en/pages

5. Fisher-Yates Shuffle Algorithm. [在线] Available at: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

6. OpenAI. "ChatGPT and Code Debugging". [在线] Available at: https://openai.com/research/chatgpt

---

## 附录

### 附录A：完整代码

#### 1. `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>扑克牌顺子游戏</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>扑克牌顺子游戏</h1>
    <div id="game-container">
        <div id="deck" class="card-container">
            <h2>A框（牌堆）</h2>
        </div>
        <div id="target" class="card-container">
            <h2>B框（目标区域）</h2>
        </div>
    </div>
    <div id="score-board">
        <span id="score">得分：0</span>
        <span id="drag-count">拖动次数：0</span>
        <span id="timer">时间：60秒</span>
    </div>
    <button id="reset-button">重置游戏</button>
    <div id="message-box" class="hidden"></div>
    <div id="endgame-modal" class="hidden">
        <p id="final-count"></p>
        <button id="replay-button">再玩一次</button>
    </div>
    <div id="a-frame-tooltip">请将扑克牌拖入 B 框</div>
    <audio id="success-sound" src="sounds/success.mp3"></audio>
    <audio id="fail-sound" src="sounds/fail.mp3"></audio>
    <button id="sound-toggle">🔊</button>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. `styles.css`

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #2e8b57;
    color: #fff;
}

#game-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.card-container {
    width: 45%;
    min-height: 200px;
    border: 2px dashed #fff;
    border-radius: 10px;
    padding: 10px;
    background-color: #006400;
}

.card {
    width: 80px;
    height: 120px;
    border: 1px solid #fff;
    border-radius: 5px;
    margin: 5px;
    display: inline-block;
    position: relative;
    cursor: grab;
}

.card img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

#score-board {
    margin-top: 20px;
    font-size: 1.2em;
}

#reset-button, #replay-button, #sound-toggle {
    margin: 10px;
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#message-box {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

#message-box.success {
    background-color: #4caf50;
}

#message-box.fail {
    background-color: #f44336;
}

.hidden {
    display: none;
}

#endgame-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: #000;
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
}

#a-frame-tooltip {
    margin-top: 10px;
    font-size: 1em;
    color: #ffeb3b;
}

.card.dragging {
    opacity: 0.5;
}
```

#### 3. `script.js`

```javascript
// script.js

// 获取DOM元素
const deckElement = document.getElementById('deck');
const targetElement = document.getElementById('target');
const dragCountElement = document.getElementById('drag-count');
const resetButton = document.getElementById('reset-button');
const endgameModal = document.getElementById('endgame-modal');
const finalCountElement = document.getElementById('final-count');
const messageBox = document.getElementById('message-box');
const replayButton = document.getElementById('replay-button');
const soundToggle = document.getElementById('sound-toggle');
const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');
const aFrameTooltip = document.getElementById('a-frame-tooltip');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// 游戏状态
let deck = [];
let aDeck = [];
let target = [];
let dragCount = 0;
let score = 0;
let comboCount = 0;
let isSoundOn = true;
let timer;
let timeLeft = 60;

// 扑克牌数据
const suits = ['spade', 'heart', 'clover', 'diamond'];
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// 映射数字到字符串
const numberMap = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
};

// 反向映射字符串到数字
const stringToNumberMap = {
    'A': 1,
    'J': 11,
    'Q': 12,
    'K': 13
};

function initGame() {
    // 重置状态
    deck = [];
    aDeck = [];
    target = [];
    dragCount = 0;
    score = 0;
    comboCount = 0;
    updateDragCount();
    updateScore(0);
    deckElement.innerHTML = '';
    targetElement.innerHTML = '';
    aFrameTooltip.style.display = 'block';
    messageBox.classList.add('hidden', 'success', 'fail', 'info');
    endgameModal.classList.add('hidden');

    // 生成一副完整的扑克牌（包含所有花色）
    for (let suit of suits) {
        for (let number of numbers) {
            deck.push({
                id: `card-${suit}-${number}`,
                number: number,
                suit: suit,
                image: `images/${suit}_${number}.jpg` // 使用相对路径
            });
        }
    }

    // 打乱顺序
    deck = shuffleArray(deck);

    // 确保包含一个顺子组合
    const possibleSequences = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9],
        [6, 7, 8, 9, 10],
        [7, 8, 9, 10, 11],
        [8, 9, 10, 11, 12],
        [9, 10, 11, 12, 13],
        [10, 11, 12, 13, 1] // Ace as 14
    ];

    // 随机选择一个顺子组合
    const chosenSequence = possibleSequences[Math.floor(Math.random() * possibleSequences.length)];

    // 将顺子加入 A 框，使用不同的花色
    chosenSequence.forEach((num, index) => {
        const suit = suits[index % suits.length];
        const numberStr = numberMap[num] || num.toString();
        const foundCard = deck.find(card => card.number === numberStr && card.suit === suit);
        if (foundCard) {
            aDeck.push(foundCard);
        } else {
            console.error(`无法找到数字 ${num} 和花色 ${suit} 的扑克牌。`);
        }
    });

    // 从剩余牌中随机补足至13张
    deck = deck.filter(card => !aDeck.includes(card));
    while (aDeck.length < 13 && deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const randomCard = deck.splice(randomIndex, 1