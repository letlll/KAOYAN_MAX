>[!question]
>% Chapter 2 \chapter{实验要求} 为了达到实验目的，实验需满足以下要求： \section{游戏设计} 实现扑克牌的随机生成和显示。 实现拖拽功能，允许用户将卡牌从A框拖入B框。 实现顺子（连续五张牌）的判定逻辑。 实现得分系统，根据玩家完成顺子的情况给予奖励。 实现计时器，限制游戏时间，提高挑战性。 实现用户界面，确保游戏的视觉效果和用户体验良好。 \section{技术实现} 使用HTML、CSS和JavaScript构建前端页面。 通过JavaScript处理拖拽事件和游戏逻辑。 应用内容安全策略（CSP）确保前端资源加载的安全性。 使用本地存储（localStorage）保存和恢复游戏状态。 实现音效和动画效果，增强用户体验。 \section{调试与优化} 解决游戏开发过程中出现的各类Bug，包括变量引用错误、拖拽逻辑错误、内容安全策略错误等。 优化代码结构，提升代码的可读性和维护性。 确保游戏在不同浏览器中的兼容性。 \section{文档撰写} 记录实验过程中的问题、解决方案和优化方法。 撰写完整的实验报告，包括实验目的、要求、步骤、结果、分析与讨论、结论和心得体会。：：：请你使用以上的格式的文章进行latex编写，只是对章节标题副标题进行代码修饰，其他的内容我以及书写。下面是需要修改的论文内容：



```latex
% Chapter 1

\chapter{实验目的}

本实验的主要目的是设计并实现一个基于JavaScript的扑克牌顺子游戏，旨在通过实际项目开发，掌握前端开发中的拖拽事件处理、DOM操作、游戏逻辑实现以及调试与优化的方法。此外，实验还旨在理解并应用内容安全策略（CSP）以确保应用程序的安全性。

具体目标包括：

\begin{itemize}
    \item 掌握JavaScript在前端开发中的应用，特别是事件处理和动态DOM操作。
    \item 理解和实现拖拽（drag-and-drop）功能，提升用户交互体验。
    \item 设计合理的游戏逻辑，确保游戏的可玩性和挑战性。
    \item 学习并应用内容安全策略（CSP）以防范潜在的安全风险。
    \item 培养问题分析和解决能力，通过调试和优化提升代码质量。
\end{itemize}

% Chapter 2

\chapter{实验要求}

为了达到实验目的，实验需满足以下要求：

\section{游戏设计}

\begin{enumerate}
    \item 实现扑克牌的随机生成和显示。
    \item 实现拖拽功能，允许用户将卡牌从A框拖入B框。
    \item 实现顺子（连续五张牌）的判定逻辑。
    \item 实现得分系统，根据玩家完成顺子的情况给予奖励。
    \item 实现计时器，限制游戏时间，提高挑战性。
    \item 实现用户界面，确保游戏的视觉效果和用户体验良好。
\end{enumerate}

\section{技术实现}

\begin{enumerate}
    \item 使用HTML、CSS和JavaScript构建前端页面。
    \item 通过JavaScript处理拖拽事件和游戏逻辑。
    \item 应用内容安全策略（CSP）确保前端资源加载的安全性。
    \item 使用本地存储（localStorage）保存和恢复游戏状态。
    \item 实现音效和动画效果，增强用户体验。
\end{enumerate}

\section{调试与优化}

\begin{enumerate}
    \item 解决游戏开发过程中出现的各类Bug，包括变量引用错误、拖拽逻辑错误、内容安全策略错误等。
    \item 优化代码结构，提升代码的可读性和维护性。
    \item 确保游戏在不同浏览器中的兼容性。
\end{enumerate}

\section{文档撰写}

\begin{enumerate}
    \item 记录实验过程中的问题、解决方案和优化方法。
    \item 撰写完整的实验报告，包括实验目的、要求、步骤、结果、分析与讨论、结论和心得体会。
\end{enumerate}

% Chapter 3

\chapter{实验步骤}

\section{项目初始化}

\subsection{创建项目结构}

新建项目文件夹，包含\texttt{index.html}、\texttt{styles.css}、\texttt{script.js}和\texttt{images}文件夹。

\subsection{编写基础HTML}

在\texttt{index.html}中设置基本的HTML结构，包括A框（牌堆）和B框（目标区域）。引入CSS和JavaScript文件。

\section{设计扑克牌界面}

\subsection{CSS样式设计}

使用CSS定义扑克牌的样式，包括大小、边框、阴影等。设置A框和B框的样式，确保布局合理。

\subsection{生成扑克牌元素}

使用JavaScript动态生成扑克牌元素，赋予唯一ID和对应的图片路径。将扑克牌元素添加到A框中。

\section{实现拖拽功能}

\subsection{添加拖拽事件监听器}

为扑克牌元素添加\texttt{dragstart}和\texttt{dragend}事件监听器。为A框和B框添加\texttt{dragover}和\texttt{drop}事件监听器。

\subsection{处理拖拽逻辑}

在\texttt{dragstart}事件中，将拖拽的扑克牌ID存储到\texttt{dataTransfer}对象中。在\texttt{drop}事件中，获取拖拽的扑克牌ID，并将扑克牌元素移动到目标区域。

\section{实现顺子判定逻辑}

\subsection{定义顺子的判定规则}

定义扑克牌的数字和花色，考虑Ace的双重性（1或14）。实现检测B框中是否存在五张连续数字的扑克牌。

\subsection{实现顺子检测函数}

在每次有扑克牌放入B框时，调用顺子检测函数。如果检测到顺子，更新得分并结束游戏。

\section{实现得分和计时器系统}

\subsection{得分系统}

定义基本得分和奖励机制，例如顺子完成得100分，同花色越多得分越高。实现得分显示区域，实时更新玩家得分。

\subsection{计时器系统}

实现倒计时功能，限制玩家在规定时间内完成顺子。当计时器归零时，游戏失败并显示相应提示。

\section{处理内容安全策略（CSP）错误}

\subsection{理解CSP错误来源}

分析浏览器控制台中关于CSP的错误信息，确定阻止加载的外部资源。

\subsection{调整CSP设置}

根据需要修改\texttt{<meta http-equiv="Content-Security-Policy">}标签，允许必要的外部资源加载。或者移除不必要的外部资源引用，避免CSP冲突。

\section{调试与优化}

\subsection{调试JavaScript代码}

使用浏览器开发者工具，逐步调试代码，解决变量引用错误、数组管理错误等问题。添加\texttt{console.log}语句，跟踪关键变量和函数调用。

\subsection{优化代码结构}

移除重复定义的函数，确保每个函数定义唯一且正确。确保扑克牌对象在不同数组（deck、aDeck、target）中的唯一性和准确性。

\subsection{提升用户体验}

添加动画效果，如卡牌翻转时的过渡动画。添加提示功能，帮助用户发现顺子组合。实现音效反馈，增强互动感。

\section{添加本地存储功能}

\subsection{保存游戏状态}

在关键操作（如拖拽、完成顺子）时，保存当前游戏状态到\texttt{localStorage}。

\subsection{加载游戏状态}

页面加载时，检查是否存在已保存的游戏状态，若有则恢复游戏进度。

\section{托管至GitHub并添加域名}

\subsection{将项目上传至GitHub}

创建GitHub仓库，将项目文件推送至仓库中。

\subsection{配置GitHub Pages}

在GitHub仓库中启用GitHub Pages，将项目托管至GitHub Pages。

\subsection{绑定自定义域名}

注册域名，并在GitHub Pages中配置自定义域名设置。更新DNS记录，将域名指向GitHub Pages提供的服务器地址，确保域名能够正确解析到托管的游戏页面。

\subsection{问题与解决}

\begin{itemize}
    \item \textbf{CSP与托管域名冲突}：
    \begin{itemize}
        \item 确保CSP设置允许从自定义域名加载必要的资源，避免跨域资源加载被阻止。
    \end{itemize}
    
    \item \textbf{资源路径问题}：
    \begin{itemize}
        \item 确保项目中引用的资源（如图片、脚本）路径相对于托管环境正确设置，避免404错误。
    \end{itemize}
\end{itemize}

% 继续按照类似的方式转换剩余章节

```

**说明：**

- 使用 `\chapter{...}` 来表示主要章节。
- 使用 `\section{...}` 来表示章节下的主要部分。
- 使用 `\subsection{...}` 和 `\subsubsection{...}` 来表示更细分的内容。
- 使用 `enumerate` 环境来表示有序列表（如实验要求中的项目）。
- 使用 `itemize` 环境来表示无序列表（如具体目标和问题与解决部分）。
- 使用 `\texttt{...}` 来表示代码或命令行内容，确保在文中正确显示。
- 保留了您的内容结构，仅调整了标题和列表的LaTeX格式。

**示例继续转换：**

为了完整性，以下是章节4到章节8的转换示例。您可以按照同样的方式继续完成整个文档。

```latex
% Chapter 4

\chapter{实验结果}

在完成上述实验步骤后，成功实现了一个功能完整的扑克牌顺子游戏，具备以下特点：

\begin{enumerate}
    \item \textbf{随机生成和显示扑克牌}：
    \begin{itemize}
        \item A框中随机显示13张扑克牌，确保每次游戏的随机性。
    \end{itemize}
    
    \item \textbf{拖拽功能}：
    \begin{itemize}
        \item 用户可以通过拖拽扑克牌，将其从A框拖入B框。
        \item 在B框内可以自由调换扑克牌的位置，且不会影响\texttt{target}数组的正确性。
    \end{itemize}
    
    \item \textbf{顺子判定}：
    \begin{itemize}
        \item 系统能够准确检测B框中是否存在五张连续数字的扑克牌。
        \item 考虑Ace的双重性，确保顺子的多种组合形式被正确识别。
    \end{itemize}
    
    \item \textbf{得分和计时器系统}：
    \begin{itemize}
        \item 游戏根据顺子的完成情况给予不同的得分奖励。
        \item 计时器限制玩家在规定时间内完成游戏，提高了游戏的挑战性。
    \end{itemize}
    
    \item \textbf{内容安全策略（CSP）处理}：
    \begin{itemize}
        \item 通过调整CSP设置或移除不必要的外部资源，解决了字体和脚本加载被阻止的问题。
        \item 确保游戏的核心功能不受CSP错误影响，提升了应用的安全性。
    \end{itemize}
    
    \item \textbf{本地存储功能}：
    \begin{itemize}
        \item 游戏状态可以在刷新页面后恢复，提升了用户体验。
    \end{itemize}
    
    \item \textbf{托管与域名绑定}：
    \begin{itemize}
        \item 项目成功托管至GitHub Pages，并绑定了自定义域名，提升了项目的可访问性和专业性。
    \end{itemize}
\end{enumerate}

\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{images/game_main_interface.png}
    \caption{游戏主界面截图}
\end{figure}

\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{images/game_success.png}
    \caption{顺子完成后的得分界面}
\end{figure}

\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{images/game_fail.png}
    \caption{计时器归零后的游戏失败界面}
\end{figure}

```


```latex
% Chapter 5

\chapter{实验分析与讨论}

\section{拖拽功能的实现与优化}

拖拽功能是本游戏的核心交互方式，涉及到多个事件的处理。通过为扑克牌元素添加\texttt{dragstart}和\texttt{dragend}事件监听器，以及为A框和B框添加\texttt{dragover}和\texttt{drop}事件监听器，实现了用户能够直观地拖拽扑克牌进行操作。

\subsection{问题与解决}

\begin{enumerate}
    \item \textbf{扑克牌拖拽后未正确更新状态}：
    \begin{itemize}
        \item 在初始实现中，拖拽扑克牌后，\texttt{target}数组未被正确更新，导致顺子判定出现错误。
        \item 通过在\texttt{handleDrop}函数中确保只有从A框拖入B框的扑克牌才会被添加到\texttt{target}数组，并在从B框拖回A框时正确移除，解决了此问题。
    \end{itemize}
    
    \item \textbf{内部调换时触发错误}：
    \begin{itemize}
        \item 在B框内调换扑克牌位置时，系统错误地将扑克牌重复添加到\texttt{target}数组，导致B框被误认为已满。
        \item 通过区分拖拽源和目标，仅在从A框拖入B框时修改\texttt{target}数组，避免了内部调换时数组长度的错误更新。
    \end{itemize}
\end{enumerate}

\section{顺子判定逻辑的完善}

顺子的判定逻辑是确保游戏可玩的关键部分。初始实现中，系统未能考虑Ace的双重性和跨花色的顺子组合，导致顺子的识别不准确。

\subsection{问题与解决}

\begin{enumerate}
    \item \textbf{Ace的双重性}：
    \begin{itemize}
        \item 初始逻辑未能同时将Ace视为1和14，导致某些顺子无法被识别。
        \item 通过在\texttt{checkStraight}函数中生成Ace作为1和14的两种可能性，并分别进行顺子检测，解决了此问题。
    \end{itemize}
    
    \item \textbf{跨花色顺子识别}：
    \begin{itemize}
        \item 顺子判定应仅基于扑克牌的数字，忽略花色。然而，初始实现可能因数据结构或逻辑错误，将花色因素错误地引入判定。
        \item 通过优化\texttt{countSameSuit}函数，仅计算同花色数量作为得分奖励，而不影响顺子的判定，确保了顺子检测的准确性。
    \end{itemize}
\end{enumerate}

\section{内容安全策略（CSP）的处理}

在前端开发中，CSP是一种重要的安全机制，用于防止跨站脚本攻击（XSS）等安全威胁。然而，过于严格的CSP配置可能会阻止合法的资源加载，导致应用功能受限。

\subsection{问题与解决}

\begin{enumerate}
    \item \textbf{外部字体和脚本加载被阻止}：
    \begin{itemize}
        \item 浏览器控制台中频繁出现CSP错误，提示无法加载来自\texttt{https://at.alicdn.com}的字体和脚本资源。
        \item 这些资源可能来自第三方库或浏览器扩展（如Zotero），对游戏功能无直接影响。
    \end{itemize}
    
    \item \textbf{调整CSP设置}：
    \begin{itemize}
        \item 根据项目需求，决定是否需要加载这些外部资源。
        \item 如果确实需要，修改\texttt{<meta http-equiv="Content-Security-Policy">}标签，允许特定外部源的资源加载。
        \item 或者，移除不必要的外部资源引用，避免CSP冲突，确保游戏核心功能不受影响。
    \end{itemize}
    
    \item \textbf{确保CSP设置的安全性}：
    \begin{itemize}
        \item 仅允许可信的外部源，避免引入潜在的安全风险。
        \item 优化CSP策略，使其既满足安全需求，又不妨碍应用的正常运行。
    \end{itemize}
\end{enumerate}

\section{本地存储功能的实现}

为了提升用户体验，添加了本地存储功能，使得玩家在刷新页面后可以恢复之前的游戏状态。然而，初始实现中存在加载旧状态干扰新游戏初始化的问题。

\subsection{问题与解决}

\begin{enumerate}
    \item \textbf{重置游戏时加载旧状态}：
    \begin{itemize}
        \item 在每次重置游戏时，\texttt{loadGameState}函数仍在调用，导致旧的游戏状态被加载，干扰新的游戏初始化。
        \item 通过在\texttt{initGame}函数中注释掉\texttt{loadGameState}调用，并在需要恢复游戏状态时手动调用，解决了此问题。
    \end{itemize}
    
    \item \textbf{准确保存和恢复游戏状态}：
    \begin{itemize}
        \item 确保在\texttt{saveGameState}函数中仅保存必要的游戏状态，如\texttt{dragCount}和\texttt{target}数组，避免保存冗余数据。
        \item 在\texttt{loadGameState}函数中，正确恢复\texttt{target}数组和\texttt{dragCount}，确保游戏状态的一致性。
    \end{itemize}
\end{enumerate}

\section{托管与域名绑定的实现}

将项目托管至GitHub Pages，并绑定自定义域名，使得游戏可以通过友好的URL访问，提升了项目的专业性和可访问性。

\subsection{实现步骤}

\begin{enumerate}
    \item \textbf{上传项目至GitHub}：
    \begin{itemize}
        \item 创建GitHub仓库，将本地项目文件推送至仓库中。
    \end{itemize}
    
    \item \textbf{启用GitHub Pages}：
    \begin{itemize}
        \item 在仓库设置中启用GitHub Pages，将项目托管至GitHub提供的服务器上。
    \end{itemize}
    
    \item \textbf{绑定自定义域名}：
    \begin{itemize}
        \item 注册域名，并在GitHub Pages中配置自定义域名设置。
        \item 更新DNS记录，将域名指向GitHub Pages提供的服务器地址，确保域名能够正确解析到托管的游戏页面。
    \end{itemize}
\end{enumerate}

\subsection{问题与解决}

\begin{itemize}
    \item \textbf{CSP与托管域名冲突}：
    \begin{itemize}
        \item 确保CSP设置允许从自定义域名加载必要的资源，避免跨域资源加载被阻止。
    \end{itemize}
    
    \item \textbf{资源路径问题}：
    \begin{itemize}
        \item 确保项目中引用的资源（如图片、脚本）路径相对于托管环境正确设置，避免404错误。
    \end{itemize}
\end{itemize}


```


```latex
% Chapter 6

\chapter{实验结论}

通过本实验的实施，成功设计并实现了一个基于JavaScript的扑克牌顺子游戏。实验过程中，深入理解和掌握了前端开发中的拖拽事件处理、DOM操作、游戏逻辑实现以及内容安全策略（CSP）的应用。通过不断调试和优化，解决了多次出现的逻辑错误和用户体验问题，最终实现了一个稳定、可玩性高且具有良好用户体验的扑克牌顺子游戏。

实验表明，系统性的调试和优化在前端开发中至关重要，尤其是在处理复杂的交互逻辑和安全策略时。同时，内容安全策略的合理配置能够有效提升应用程序的安全性，避免潜在的安全风险。通过本次实验，不仅提升了技术能力，也培养了项目开发中的问题分析和解决能力。

```

```latex
% Chapter 7

\chapter{心得体会}

本次实验是一次全面的前端项目开发体验，通过从零开始设计并实现扑克牌顺子游戏，深入掌握了JavaScript在前端开发中的应用。以下是我的几点心得体会：

\begin{enumerate}
    \item \textbf{系统性学习的重要性}：
    \begin{itemize}
        \item 在项目开发过程中，系统性地学习和掌握相关知识点，如拖拽事件处理、内容安全策略等，能够有效提升开发效率和代码质量。
    \end{itemize}
    
    \item \textbf{调试与优化的必要性}：
    \begin{itemize}
        \item 开发过程中不可避免地会遇到各种Bug和问题，耐心地进行调试和优化，能够大大提升项目的稳定性和用户体验。
    \end{itemize}
    
    \item \textbf{内容安全策略（CSP）的应用}：
    \begin{itemize}
        \item 通过本次实验，深入理解了CSP的作用和配置方法，认识到其在保障应用安全性方面的重要性。
    \end{itemize}
    
    \item \textbf{用户体验的提升}：
    \begin{itemize}
        \item 在游戏开发中，用户体验是至关重要的，通过添加动画效果、音效反馈和提示功能，显著提升了游戏的互动性和趣味性。
    \end{itemize}
    
    \item \textbf{版本控制与项目托管}：
    \begin{itemize}
        \item 使用GitHub进行版本控制和项目托管，不仅提高了代码管理的效率，也为项目的展示和共享提供了便捷的平台。
    \end{itemize}
    
    \item \textbf{跨浏览器兼容性的挑战}：
    \begin{itemize}
        \item 不同浏览器在实现拖拽事件和CSP策略时可能存在差异，深入测试和优化确保了游戏在多种环境下的良好表现。
    \end{itemize}
\end{enumerate}

通过本次实验，不仅提升了技术能力，也增强了项目开发中的问题解决和优化能力，为今后的前端开发工作打下了坚实的基础。

```

```latex

% Chapter 8

\chapter{知识点总结}

在本次实验中，涉及到了多个前端开发的关键知识点，通过项目的实际应用，对这些知识有了更深入的理解和掌握。以下是主要的知识点总结：

\section{JavaScript事件处理}

\begin{itemize}
    \item \textbf{拖拽事件（Drag-and-Drop Events）}：
    \begin{itemize}
        \item 了解并掌握\texttt{dragstart}、\texttt{dragend}、\texttt{dragover}和\texttt{drop}等事件的使用方法。
        \item 理解\texttt{dataTransfer}对象的作用，用于在拖拽过程中传递数据。
    \end{itemize}
    
    \item \textbf{动态DOM操作}：
    \begin{itemize}
        \item 通过JavaScript动态生成和操作DOM元素，实现扑克牌的动态显示和移动。
        \item 使用\texttt{createElement}、\texttt{appendChild}、\texttt{querySelector}等方法进行元素的创建和选择。
    \end{itemize}
\end{itemize}

\section{游戏逻辑实现}

\begin{itemize}
    \item \textbf{顺子判定算法}：
    \begin{itemize}
        \item 理解扑克牌顺子的判定规则，考虑Ace的双重性（1或14）。
        \item 实现多种顺子组合的检测，确保游戏的可玩性和挑战性。
    \end{itemize}
    
    \item \textbf{得分与计时系统}：
    \begin{itemize}
        \item 设计合理的得分机制，根据玩家的表现给予不同的得分奖励。
        \item 实现倒计时功能，增加游戏的紧迫感和挑战性。
    \end{itemize}
\end{itemize}

\section{内容安全策略（CSP）}

\begin{itemize}
    \item \textbf{CSP配置}：
    \begin{itemize}
        \item 了解CSP的基本概念和作用，防范跨站脚本攻击（XSS）等安全威胁。
        \item 学会通过\texttt{<meta http-equiv="Content-Security-Policy">}标签配置CSP，控制资源加载策略。
    \end{itemize}
    
    \item \textbf{CSP错误处理}：
    \begin{itemize}
        \item 分析浏览器控制台中的CSP错误信息，定位阻止加载的资源。
        \item 通过调整CSP设置或移除不必要的外部资源，解决资源加载被阻止的问题。
    \end{itemize}
\end{itemize}

\section{本地存储（localStorage）}

\begin{itemize}
    \item \textbf{保存与恢复游戏状态}：
    \begin{itemize}
        \item 学会使用\texttt{localStorage}保存游戏的关键状态，如拖动次数、目标区域的扑克牌等。
        \item 实现游戏状态的恢复，提升用户体验。
    \end{itemize}
\end{itemize}

\section{调试与优化}

\begin{itemize}
    \item \textbf{浏览器开发者工具的使用}：
    \begin{itemize}
        \item 熟练使用浏览器的开发者工具（如Chrome DevTools）进行代码调试和性能优化。
        \item 通过\texttt{console.log}输出关键变量和函数调用，帮助定位和解决问题。
    \end{itemize}
    
    \item \textbf{代码结构优化}：
    \begin{itemize}
        \item 学会编写模块化、可维护的代码，减少代码重复，提高代码的可读性和可维护性。
        \item 通过函数的合理划分和命名，提升代码的清晰度和逻辑性。
    \end{itemize}
\end{itemize}

\section{项目托管与版本控制}

\begin{itemize}
    \item \textbf{Git与GitHub的使用}：
    \begin{itemize}
        \item 了解并掌握Git的基本操作，如初始化仓库、提交、推送等。
        \item 学会使用GitHub进行项目的版本控制和托管，方便项目的展示和共享。
    \end{itemize}
    
    \item \textbf{GitHub Pages的配置}：
    \begin{itemize}
        \item 学会通过GitHub Pages将前端项目托管至互联网，提供在线访问地址。
        \item 了解自定义域名的绑定方法，提升项目的专业性和可访问性。
    \end{itemize}
\end{itemize}

\end{document}
```

**说明：**

1. **章节和小节的格式化：**
   - 使用 `\chapter{...}` 来定义主要章节。
   - 使用 `\section{...}` 来定义章节下的主要部分。
   - 使用 `\subsection{...}` 来定义更细分的内容。
   - 使用 `\subsubsection{...}` 如有需要，可以进一步细分内容。

2. **列表的格式化：**
   - 使用 `enumerate` 环境来创建有序列表，适用于步骤或项目编号。
   - 使用 `itemize` 环境来创建无序列表，适用于具体目标或问题描述。
   - 在列表项中使用 `\texttt{...}` 来突出显示代码或命令，如 `\texttt{dragstart}`。

3. **代码和命令的显示：**
   - 使用 `\texttt{...}` 来包裹代码片段，确保它们以等宽字体显示，便于区分。

4. **图像的插入：**
   - 使用 `\begin{figure}[h]` 环境来插入图像。
   - 使用 `\centering` 来居中图像。
   - 使用 `\includegraphics[width=0.8\textwidth]{path_to_image}` 来插入图片，调整 `width` 参数以适应页面布局。
   - 使用 `\caption{...}` 来添加图像标题。

5. **总体结构：**
   - 确保每个章节和小节都有清晰的标题，以便于阅读和导航。
   - 继续按照上述格式转换剩余章节（章节5到章节8），保持一致的格式和结构。

6. **编译注意事项：**
   - 确保所有引用的图片路径正确无误，图片文件存在于指定的目录中。
   - 使用支持中文的LaTeX编译器，如 XeLaTeX 或 LuaLaTeX，并确保已加载 `ctex` 宏包以支持中文字符。

通过上述格式化，您的实验报告将具有清晰的结构和专业的排版，便于阅读和理解。请根据需要继续转换和完善剩余的章节内容。