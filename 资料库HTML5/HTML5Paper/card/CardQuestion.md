>[!question]
>图片插入问题使用Latex。

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
\section{插图的使用}

\LaTeX 环境下可以使用常见的图片格式：JPEG、PNG、PDF、EPS等。当然也可以使用\LaTeX 直接绘制矢量图形，可以参考pgf/tikz等包中的相关内容。需要注意的是，无论采用什么方式绘制图形，首先考虑的是图片的清晰程度以及图片的可理解性，过于不清晰的图片将可能会浪费很多时间。

图示例如下：

\begin{figure}[!htb]
  \centering
  \includegraphics[width=0.3\textwidth]
  {figures/UJSlogo.png}\\
  \caption{插图示例}
  \label{fig:whu}
\end{figure}

\verb|[htbp]|选项分别是此处、页顶、页底、独立一页。\verb|[width=\textwidth]|让图片占满整行，或\verb|[width=2cm]|直接设置宽度。可以随时在文中进行引用，如图~\ref{fig:whu}，建议缩放时保持图像的宽高比不变。
```


