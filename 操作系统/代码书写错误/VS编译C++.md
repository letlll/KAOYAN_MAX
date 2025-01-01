在 VSCode 中运行已书写并保存的 C++ 文件的基本流程，通常涉及以下几个步骤：从编写代码到最终执行编译并运行程序。以下是详细的流程步骤：

### 1. **安装必要的工具和扩展**
   确保你已经安装了必要的工具和 VSCode 扩展：
   - **C++ 编译器**（例如：`g++` 或 `clang++`）：在 Windows 上，你可以通过 [MinGW](https://sourceforge.net/projects/mingw/) 安装 `g++`。
   - **VSCode C++ 扩展**：在 VSCode 中安装 `C/C++` 扩展（由 Microsoft 提供），该扩展为代码编辑、调试和编译提供支持。

### 2. **编写和保存 C++ 文件**
   - 在 VSCode 中，创建一个新的 C++ 文件（例如：`fei.cpp`）。
   - 编写 C++ 程序代码，确保保存文件（按 `Ctrl + S`）。

### 3. **配置 VSCode 终端和编译环境**
   你需要确保 VSCode 的终端可以正确运行 C++ 编译器，通常可以使用 VSCode 内置的终端。步骤如下：

   1. 打开 VSCode，点击菜单栏的 **"终端" -> "新终端"**，打开终端。
   2. 如果你使用的是 **Windows**，确保已经安装了 **MinGW**（包括 `g++` 编译器），并且在环境变量中配置了 MinGW 的路径。
   3. 在终端中输入 `g++ --version` 来检查 `g++` 是否正确安装。
   4. 如果提示未找到命令，需要配置 MinGW 到系统的 `PATH` 环境变量中，或者通过 VSCode 设置 `tasks.json` 来配置编译命令。

### 4. **编译 C++ 文件**
   编译 C++ 文件通常有两种方式：

```shell
	cd "d:/StudyWork_document/LessonWork/OS/CODE/day1/"
	g++ fei.cpp -o fei
	./fei
```


   **方式 A：直接使用 VSCode 终端（推荐）**
   - 在 VSCode 的集成终端中，使用 `cd` 命令进入源代码文件所在的目录。
     ```sh
     cd "path_to_your_cpp_file_directory"
     ```
   - 使用 `g++` 编译器编译你的 C++ 文件：
     ```sh
     g++ fei.cpp -o fei
     ```
     这条命令将编译 `fei.cpp` 文件并生成一个名为 `fei` 的可执行文件。

   **方式 B：使用 VSCode 配置任务（推荐自动化）**
   - 你可以通过配置 `tasks.json` 文件，来简化编译过程，创建一个自动化任务。任务会在你按下快捷键时自动运行。
   - 打开 `Ctrl + Shift + P`，选择 `Tasks: Configure Task`，选择 `Create tasks.json file from template`，然后选择 `Others`。修改生成的 `tasks.json` 文件，类似如下：
     ```json
     {
         "version": "2.0.0",
         "tasks": [
             {
                 "label": "build fei.cpp",
                 "type": "shell",
                 "command": "g++",
                 "args": [
                     "fei.cpp",
                     "-o",
                     "fei"
                 ],
                 "group": {
                     "kind": "build",
                     "isDefault": true
                 },
                 "problemMatcher": ["$gcc"],
                 "detail": "Generated task for building C++ file"
             }
         ]
     }
     ```
   - 配置后，你可以按 **`Ctrl + Shift + B`** 来编译 C++ 文件。

### 5. **运行程序**
   编译完成后，你将会得到一个名为 `fei`（在 Windows 上是 `fei.exe`）的可执行文件。你可以通过 VSCode 集成终端运行这个文件：

   **在终端中执行可执行文件**：
   - 在终端中输入：
     ```sh
     ./fei
     ```
     （在 Windows 上，使用 `fei.exe` 来执行：`./fei.exe`）
   - 你可以通过输入输入数据，程序将输出相应的结果。

### 6. **调试（可选）**
   - 如果你想要调试 C++ 程序，可以在 VSCode 中配置调试器。确保你安装了 `C++` 扩展，并且使用 `gdb` 或 `lldb` 作为调试工具。
   - 配置调试环境的步骤：
     1. 在 VSCode 中点击左侧的调试按钮（或者按 `Ctrl + Shift + D`）。
     2. 点击 `create a launch.json file`，然后选择 C++（GDB/LLDB）。
     3. 配置你的调试器，通常情况下，默认配置就可以运行。
     4. 设置断点并开始调试。

### 总结：
1. **编写代码**：在 VSCode 中编写 C++ 代码并保存。
2. **安装编译器**：确保已安装 `g++` 或其他 C++ 编译器，并将其添加到环境变量中。
3. **编译文件**：在终端中使用 `g++ fei.cpp -o fei` 命令编译源代码。
4. **运行程序**：使用 `./fei`（Windows 上为 `./fei.exe`）命令运行生成的可执行文件。
5. **调试（可选）**：使用 VSCode 的调试功能来调试你的 C++ 程序。

这样，你就可以在 VSCode 中顺利编写、编译、运行并调试 C++ 文件了。