---
Tags:
  - HTML
Dlink:
  - "[[../../../HTML/拖放H_LF/---拖放---]]"
---
>[!info] 定义
# html

```html
<!DOCTYPE html>

<html lang="zh-CN">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">

    <title>扑克牌顺子游戏</title>

    <link rel="stylesheet" href="styles.css">

</head>

<body>

    <!-- 页面顶部 -->

    <header>

        <div id="drag-count">拖动次数：0</div>

        <div id="sound-toggle" title="静音/开启音效">🔊</div>

    </header>

  

    <!-- 主游戏区 -->

    <main>

        <!-- A 框：初始扑克牌区域 -->

        <div id="a-frame" class="card-frame">

            <div class="frame-title">A 框：拖动扑克牌到此处</div>

            <div id="deck" class="deck">

                <!-- 扑克牌将通过 JavaScript 动态生成 -->

            </div>

            <div id="a-frame-tooltip" class="tooltip">请将扑克牌拖入 B 框</div>

        </div>

  

        <!-- 间距 -->

        <div class="spacer"></div>

  

        <!-- B 框：目标扑克牌区域 -->

        <div id="b-frame" class="card-frame">

            <div class="frame-title">B 框：拖动5张连续扑克牌到此处</div>

            <div id="target" class="target">

                <!-- 卡槽1到卡槽5 -->

                <div class="card-slot" data-slot="1"></div>

                <div class="card-slot" data-slot="2"></div>

                <div class="card-slot" data-slot="3"></div>

                <div class="card-slot" data-slot="4"></div>

                <div class="card-slot" data-slot="5"></div>

            </div>

            <div id="b-frame-tooltip" class="tooltip">将5张牌放置到此框中，并满足顺子要求</div>

            <button id="reset-button">重置游戏 🔄</button>

        </div>

    </main>

  

    <!-- 游戏结束弹窗 -->

    <div id="endgame-modal" class="modal hidden">

        <div class="modal-content">

            <h2>游戏完成！</h2>

            <p id="final-count">你的拖动次数是 0 次！</p>

            <button id="replay-button">重玩</button>

        </div>

    </div>

  

    <!-- 顺子提示信息 -->

    <div id="message-box" class="message-box hidden"></div>

  

    <!-- 音效文件 -->

    <audio id="success-sound" src="sounds/success.mp3" preload="auto"></audio>

    <audio id="fail-sound" src="sounds/fail.mp3" preload="auto"></audio>

  

    <script src="script.js"></script>

</body>

</html>

```


# css

```css
/* 重置默认样式 */

* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;

}

  

/* 页面背景 */

body {

    font-family: Arial, sans-serif;

    background: linear-gradient(135deg, #f0f8ff, #e6e6fa);

    height: 100vh;

    display: flex;

    flex-direction: column;

}

  

/* 页面顶部 */

header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 10px 20px;

    background-color: rgba(255, 255, 255, 0.8);

    position: fixed;

    top: 0;

    width: 100%;

    z-index: 10;

}

  

#drag-count {

    font-size: 24px;

    color: #333;

}

  

#sound-toggle {

    font-size: 24px;

    cursor: pointer;

}

  
  
  
  

/* 主游戏区 */

/* 主游戏区 */

main {

    display: flex;

    justify-content: space-between; /* 确保A框和B框左右分布 */

    align-items: flex-start; /* 顶部对齐 */

    flex: 1;

    padding-top: 60px; /* 预留顶部空间 */

    gap: 20px; /* 设置A框和B框之间的间距 */

    width: 100%; /* 确保主容器占据全部可用宽度 */

    box-sizing: border-box;

}

  
  
  

.card-frame {

    flex: 1; /* 允许 A 框和 B 框根据可用空间进行自适应 */

    max-width: 45%; /* 将最大宽度限制在45%，确保A框和B框可以并排显示 */

    min-width: 300px; /* 可以根据需要调整 */

    min-height: 400px;

    border: 2px solid #ccc;

    border-radius: 8px;

    padding: 20px;

    background-color: rgba(255, 255, 255, 0.9);

    box-sizing: border-box; /* 确保 padding 不会增加宽度 */

    overflow: hidden; /* 防止溢出 */

}

  
  
  

.frame-title {

    font-size: 18px;

    margin-bottom: 10px;

    text-align: center;

    color: #555;

}

  

.deck, .target {

    position: relative;

    width: 100%;

    min-height: 300px;

}

  

.deck {

    display: flex;

    flex-wrap: wrap;

    gap: 10px; /* 扑克牌之间的间距 */

    justify-content: center; /* 确保扑克牌居中显示 */

    max-height: 400px; /* 限制A框内容的最大高度，避免其被撑大 */

    overflow-y: auto; /* 允许A框内容滚动，防止扑克牌溢出 */

    box-sizing: border-box;

}

  
  
  
  
  

.target {

    display: flex;

    justify-content: space-around;

    align-items: center;

    position: relative;

}

  

.card-slot {

    width: 100px;

    height: 150px;

    border: 2px dashed #aaa;

    border-radius: 8px;

    position: relative;

    transition: background-color 0.3s;

}

  

.card-slot.hovered {

    background-color: rgba(0, 128, 0, 0.2);

}

  

.tooltip {

    position: absolute;

    bottom: 10px;

    left: 50%;

    transform: translateX(-50%);

    font-size: 14px;

    color: #777;

}

  

#a-frame-tooltip {

    bottom: 10px;

}

  

#b-frame-tooltip {

    bottom: 60px;

}

  

#reset-button {

    position: absolute;

    bottom: 10px;

    right: 10px;

    padding: 8px 16px;

    background-color: #87cefa;

    border: none;

    border-radius: 4px;

    cursor: pointer;

    font-size: 16px;

    transition: background-color 0.3s;

}

  

#reset-button:hover {

    background-color: #4682b4;

}

  

/* 间距 */

.spacer {

    width: 20px; /* 根据需要调整间距宽度 */

}

  

/* 扑克牌样式 */

.card {

    width: 80px; /* 确保扑克牌的宽度适中 */

    height: 120px;

    margin: 5px; /* 避免扑克牌之间挤在一起 */

    position: relative;

    cursor: grab;

    transform: translateZ(0);

    transition: transform 0.2s, box-shadow 0.2s;

}

  
  

.card img {

    width: 100%;

    height: 100%;

    border-radius: 8px;

    backface-visibility: hidden;

    transition: transform 0.6s;

}

  

.card.flipped img {

    transform: rotateY(180deg);

}

  

/* 动画效果 */

.card.dragging {

    transform: scale(1.1);

    box-shadow: 0 10px 20px rgba(0,0,0,0.2);

    z-index: 1000;

}

  

.message-box {

    position: fixed;

    top: 80px;

    left: 50%;

    transform: translateX(-50%);

    padding: 15px 25px;

    border-radius: 5px;

    font-size: 18px;

    color: #fff;

    z-index: 20;

    opacity: 0;

    transition: opacity 0.5s;

}

  

.message-box.success {

    background-color: #28a745;

}

  

.message-box.fail {

    background-color: #dc3545;

}

  

.message-box.info {

    background-color: #17a2b8;

}

  

.message-box.visible {

    opacity: 1;

}

  

/* 游戏结束弹窗 */

.modal {

    position: fixed;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background-color: rgba(0,0,0,0.5);

    display: flex;

    justify-content: center;

    align-items: center;

    z-index: 30;

}

  

.modal.hidden {

    display: none;

}

  

.modal-content {

    background-color: #fff;

    padding: 30px;

    border-radius: 10px;

    text-align: center;

    width: 80%;

    max-width: 400px;

    animation: fadeIn 0.5s;

}

  

.modal-content h2 {

    margin-bottom: 20px;

    color: #333;

}

  

.modal-content p {

    margin-bottom: 30px;

    font-size: 18px;

    color: #555;

}

  

.modal-content button {

    padding: 10px 20px;

    background-color: #87cefa;

    border: none;

    border-radius: 5px;

    cursor: pointer;

    font-size: 16px;

    transition: background-color 0.3s;

}

  

.modal-content button:hover {

    background-color: #4682b4;

}

  

/* 动画关键帧 */

@keyframes fadeIn {

    from { opacity: 0; transform: scale(0.8); }

    to { opacity: 1; transform: scale(1); }

}

  

/* 响应式设计 */

@media (max-width: 600px) {

    .card {

        width: 80px;

        height: 120px;

    }

  

    .card-slot {

        width: 80px;

        height: 120px;

    }

  

    #drag-count {

        font-size: 20px;

    }

  

    .frame-title {

        font-size: 16px;

    }

  

    #reset-button {

        font-size: 14px;

    }

  

    .spacer {

        width: 10px; /* 调整移动端的间距 */

    }

}

  

@media (min-width: 601px) and (max-width: 1024px) {

    .card {

        width: 90px;

        height: 135px;

    }

  

    .card-slot {

        width: 90px;

        height: 135px;

    }

  

    #drag-count {

        font-size: 22px;

    }

  

    .frame-title {

        font-size: 17px;

    }

  

    #reset-button {

        font-size: 15px;

    }

  

    .spacer {

        width: 15px; /* 调整平板的间距 */

    }

}
```

# javascript

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

  

// 游戏状态

let deck = [];

let aDeck = []; // 新增：用于存储 A 框的扑克牌

let target = [];

let dragCount = 0;

let isSoundOn = true;

  
  

// 扑克牌数据

const suits = ['spade', 'heart', 'clover', 'diamond'];

const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  

function initGame() {

    // 重置状态

    deck = [];

    aDeck = [];

    target = [];

    dragCount = 0;

    updateDragCount();

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

        const foundCard = deck.find(card => card.number == num && card.suit === suit);

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

        const randomCard = deck.splice(randomIndex, 1)[0];

        if (randomCard) {

            aDeck.push(randomCard);

        }

    }

  

    // 打乱A框的顺序

    aDeck = shuffleArray(aDeck);

  

    // 检查 aDeck 是否有13张牌

    if (aDeck.length < 13) {

        console.error(`A 框的牌数不足，当前有 ${aDeck.length} 张牌。`);

        // 可选择补充其他牌或重新生成 aDeck

    }

  

    // 将 A 框中的扑克牌元素添加到界面中

    aDeck.forEach(card => {

        const cardElement = createCardElement(card);

        deckElement.appendChild(cardElement);

    });

  

    // 预加载图片

    preloadImages();

  

    // 清除保存的游戏状态

    clearGameState();

  

    // 不加载游戏状态，避免重置时加载旧的游戏状态

    // loadGameState(); // 注释掉这行，避免干扰初始化

  

    console.log('初始化游戏完成。A Deck:', aDeck.map(c => c.id));

    console.log('A Deck:', aDeck.map(card => card.id));

    console.log('Remaining Deck:', deck.map(card => card.id));

  

}

  
  
  
  
  

// 洗牌算法（Fisher-Yates）

function shuffleArray(array) {

    let currentIndex = array.length, randomIndex;

  

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex--;

  

        // 交换

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

    }

  

    return array;

}

  

// 预加载图片

function preloadImages() {

    const imageUrls = deck.map(card => card.image);

    imageUrls.push('images/back.jpg');

    imageUrls.forEach(url => {

        const img = new Image();

        img.src = url;

    });

}

  

// 创建扑克牌元素

function createCardElement(card) {

    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');

    cardDiv.setAttribute('draggable', true);

    cardDiv.setAttribute('data-id', card.id);

    cardDiv.setAttribute('data-number', card.number);

    cardDiv.setAttribute('data-suit', card.suit);

    cardDiv.setAttribute('data-flipped', 'false');

  

    // 创建图片元素

    const cardImg = document.createElement('img');

    cardImg.src = 'images/back.jpg'; // 初始显示背面

    cardImg.alt = `${card.suit} ${card.number}`;

    cardImg.classList.add('card-image');

  

    console.log(`Creating card: ${card.id} with image ${cardImg.src}`); // 调试日志

  

    cardDiv.appendChild(cardImg);

  

    // 事件监听

    cardDiv.addEventListener('dragstart', handleDragStart);

    // 移除点击事件监听器

    // cardDiv.addEventListener('click', handleCardClick);

    cardDiv.addEventListener('dragend', handleDragEnd);

  

    return cardDiv;

}

  
  
  
  

// // 处理扑克牌点击翻转

// function handleCardClick(e) {

//     const cardDiv = e.currentTarget;

//     const cardId = cardDiv.getAttribute('data-id');

//     // 检查扑克牌是否在 B 框中

//     const isInTarget = target.some(card => card.id === cardId);

//     if (!isInTarget) {

//         // 如果扑克牌不在 B 框中，不允许翻转

//         return;

//     }

//     // 如果扑克牌在 B 框中，允许翻转

//     flipCard(cardDiv);

// }

  
  

// 翻转扑克牌

function flipCard(cardDiv) {

    const cardId = cardDiv.getAttribute('data-id');

    const cardObj = getCardObjectById(cardId);

  

    if (!cardObj) {

        console.error(`Card with ID ${cardId} not found in deck, aDeck, or target.`);

        return;

    }

  

    const cardImg = cardDiv.querySelector('img');

    if (cardImg) {

        console.log(`Flipping card: ${cardObj.id} to image ${cardObj.image}`); // 调试日志

        cardImg.src = cardObj.image; // 显示正面

        cardDiv.setAttribute('data-flipped', 'true');

    }

    console.log(`Flipping card: ${card.id} to image ${card.image}`);

}

  
  
  
  

// 反转扑克牌回背面

function unflipCard(cardDiv) {

    const cardImg = cardDiv.querySelector('img');

    if (cardImg) {

        cardImg.src = 'images/back.jpg'; // 显示背面

        cardDiv.setAttribute('data-flipped', 'false');

    }

}

  
  

// 反转扑克牌回背面

function unflipCard(cardDiv) {

    const cardImg = cardDiv.querySelector('img');

    if (cardImg) {

        cardImg.src = 'images/back.jpg'; // 显示背面

        cardDiv.setAttribute('data-flipped', 'false');

    }

    console.log(`Unflipping card: ${cardDiv.getAttribute('data-id')}`);

}

  

// 处理拖动开始

function handleDragStart(e) {

    const cardDiv = e.currentTarget;

    e.dataTransfer.setData('text/plain', cardDiv.getAttribute('data-id'));

    setTimeout(() => {

        cardDiv.classList.add('dragging');

    }, 0);

}

  

// 处理拖动结束

function handleDragEnd(e) {

    e.currentTarget.classList.remove('dragging');

}

  

// 允许拖放区域

function allowDrop(e) {

    e.preventDefault();

}

  

// 处理放置事件

function handleDrop(e) {

    e.preventDefault();

    const cardId = e.dataTransfer.getData('text/plain');

    const cardDiv = document.querySelector(`.card[data-id='${cardId}']`);

    if (!cardDiv) return;

  

    const source = cardDiv.parentElement.id;

  

    if (this.id === 'target') {

        if (source === 'target') {

            // 在 B 框内重新排列扑克牌

            targetElement.appendChild(cardDiv);

            // 不修改 target 数组，也不增加 dragCount

            checkStraight();

            saveGameState();

        } else {

            // 从 A 框拖动扑克牌到 B 框

            if (target.length >= 5) {

                // B 框已满

                showMessage('B 框已满！', 'fail');

                return;

            }

            // 移动扑克牌到 B 框

            targetElement.appendChild(cardDiv);

            const cardObj = getCardObjectById(cardId);

            if (cardObj && !target.some(card => card.id === cardId)) {

                target.push(cardObj);

                flipCard(cardDiv); // 自动翻转扑克牌

                dragCount++;

                updateDragCount();

                aFrameTooltip.style.display = 'none';

                checkStraight();

                saveGameState(); // 保存游戏状态

                // 从 aDeck 中移除已被拖入 B 框的扑克牌

                aDeck = aDeck.filter(card => card.id !== cardId);

            }

        }

    } else if (this.id === 'deck') {

        if (source === 'target') {

            // 从 B 框拖回 A 框

            deckElement.appendChild(cardDiv);

            target = target.filter(card => card.id !== cardId);

            const cardObj = getCardObjectById(cardId);

            if (cardObj) {

                aDeck.push(cardObj); // 将扑克牌添加回 aDeck

                unflipCard(cardDiv); // 自动回到背面

                dragCount++;

                updateDragCount();

                if (target.length < 5) {

                    aFrameTooltip.style.display = 'block';

                }

                saveGameState(); // 保存游戏状态

            }

        }

    }

    console.log(`Dragging card: ${cardId} from ${source} to ${this.id}`);

    console.log('Target Deck:', target.map(card => card.id));

    console.log('A Deck:', aDeck.map(card => card.id));

  

}

  
  
  
  
  

// 获取卡片对象通过ID

function getCardObjectById(cardId) {

    return deck.find(c => c.id === cardId) || aDeck.find(c => c.id === cardId) || target.find(c => c.id === cardId) || null;

}

  
  
  
  

// 更新拖动次数显示

function updateDragCount() {

    dragCountElement.textContent = `拖动次数：${dragCount}`;

}

  

// 显示消息提示

function showMessage(message, type) {

    messageBox.textContent = message;

    messageBox.classList.remove('hidden', 'success', 'fail', 'info');

    if (type === 'success') {

        messageBox.classList.add('success');

        if (isSoundOn) successSound.play();

    } else if (type === 'fail') {

        messageBox.classList.add('fail');

        if (isSoundOn) failSound.play();

    } else if (type === 'info') {

        messageBox.classList.add('info');

    }

    messageBox.classList.add('visible');

    setTimeout(() => {

        messageBox.classList.remove('visible');

    }, 5000);

}

  

function checkStraight() {

    if (target.length === 5) {

        // 获取牌的数字值

        let numberValues = target.map(card => getNumberValue(card.number));

  

        // 考虑 Ace 的双重性（1 或 14）

        const hasAce = numberValues.includes(1);

        let possibleStraightSets = [];

  

        if (hasAce) {

            const aceAs14 = numberValues.map(val => val === 1 ? 14 : val);

            possibleStraightSets.push(aceAs14);

        }

  

        possibleStraightSets.push(numberValues);

  

        // 检查是否为顺子

        const isStraight = possibleStraightSets.some(values => {

            const sorted = [...values].sort((a, b) => a - b);

            for (let i = 1; i < sorted.length; i++) {

                if (sorted[i] !== sorted[i - 1] + 1) {

                    return false;

                }

            }

            return true;

        });

  

        if (isStraight) {

            showMessage('✔ 顺子完成！恭喜你！', 'success');

            finalCountElement.textContent = `你的拖动次数是 ${dragCount} 次！`;

            endgameModal.classList.remove('hidden');

            saveGameState();

        } else {

            showMessage('⚠ 顺子未完成，请调整扑克牌顺序。', 'fail');

        }

    }

}

  
  

// 获取数字对应的值

function getNumberValue(number) {

    switch (number) {

        case 'A': return 1;

        case 'J': return 11;

        case 'Q': return 12;

        case 'K': return 13;

        case 'Joker': return 0; // 如果有 Joker，可以赋予特殊值

        default: return parseInt(number);

    }

}

  

// 重置游戏

resetButton.addEventListener('click', () => {

    clearGameState(); // 清除保存的游戏状态

    initGame(); // 重新初始化游戏

});

  
  

// 重玩按钮

replayButton.addEventListener('click', () => {

    endgameModal.classList.add('hidden');

    clearGameState();

    initGame();

});

  

// 音效开关

soundToggle.addEventListener('click', () => {

    isSoundOn = !isSoundOn;

    soundToggle.textContent = isSoundOn ? '🔊' : '🔇';

});

  

// 拖放事件绑定

deckElement.addEventListener('dragover', allowDrop);

deckElement.addEventListener('drop', handleDrop);

targetElement.addEventListener('dragover', allowDrop);

targetElement.addEventListener('drop', handleDrop);

  

// 初始化游戏

initGame();

  

// 处理拖动结束移除样式

document.addEventListener('dragend', (e) => {

    if (e.target.classList.contains('card')) {

        e.target.classList.remove('dragging');

    }

});

  

// 本地存储功能

  

// 保存游戏状态

function saveGameState() {

    const gameState = {

        dragCount: dragCount,

        target: target.map(card => card.id)

    };

    localStorage.setItem('gameState', JSON.stringify(gameState));

}

  

// 加载游戏状态

function loadGameState() {

    const savedState = localStorage.getItem('gameState');

    if (savedState) {

        const gameState = JSON.parse(savedState);

        dragCount = gameState.dragCount;

        updateDragCount();

  

        // 恢复目标区域

        gameState.target.forEach(cardId => {

            const cardDiv = document.querySelector(`.card[data-id='${cardId}']`);

            if (cardDiv) {

                targetElement.appendChild(cardDiv);

                const cardObj = getCardObjectById(cardId);

                if (cardObj) {

                    target.push(cardObj);

                    flipCard(cardDiv);

                }

            }

        });

    }

}

  
  

// 清除游戏状态

function clearGameState() {

    localStorage.removeItem('gameState');

}

```