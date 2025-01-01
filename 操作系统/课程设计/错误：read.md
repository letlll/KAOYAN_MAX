下面是对您提供的代码进行问题分析和针对性修改的建议与示例代码。通过仔细阅读题目和现有代码，可以发现问题的关键点在于 **程序名称不匹配** 导致无法生成页面访问序列，也就无法正常模拟 FIFO 和 LRU 页面置换。

**问题分析**：

- 在 `Process.txt` 中，进程的程序备注格式为「程序 A」、「程序 B」……
- 在 `run.txt` 中，对应的行格式则是「A 程序」、「B 程序」……顺序刚好反过来。
- 程序在生成页面访问序列时是通过 `process.program_name` 与 `actions` 中的 `current_program` 来匹配。当 `Process.txt` 为「程序 A」而 `run.txt` 为「A 程序」时，二者不一致，自然无法匹配到，从而导致「无页面访问记录」的现象。

**解决方法**：  
在读取 `run.txt` 时，当遇到类似「A 程序」的行，将其转化为「程序 A」，以与 `Process.txt` 中解析出来的 `program_name` 对应上。

**修改要点**：

1. 在 `readRun()` 函数中处理设置 `current_program` 的那一段代码，对读入的行进行解析和转换。
2. 保持文件内容不变（不修改原示例文件），只在代码逻辑中进行字符串处理。

下面是经过修改的示例代码片段（重点在 `readRun()` 函数对 `current_program` 的处理上），请将其应用到您的代码中相应的位置。其他逻辑不变，仅对获取 `current_program` 的部分进行调整。

```cpp
void Scheduler::readRun(const string& filename) {
    ifstream file(filename);
    if (!file.is_open()) {
        cerr << "无法打开文件：" << filename << endl;
        exit(1);
    }

    string line;
    string current_program;
    while (getline(file, line)) {
        if (line.empty()) continue;
        // 判断是否是 "X 程序" 行，如 "A 程序"
        if (line.find("程序") != string::npos && line.find("\t") == string::npos) {
            // run.txt中是"A 程序"这种格式，我们需要转换成"程序 A"以匹配Process.txt中"程序 A"
            // 拆分字符串，假设格式严格为"X 程序"
            // 注：需根据实际文件格式调整，此处假设"X 程序"中X为单字母，如"A 程序"
            // 若为多字如"ABC 程序"，也可相应修改。

            // 找出" 程序"所在位置
            size_t pos = line.find(" 程序");
            if (pos != string::npos) {
                string prefix = line.substr(0, pos);     // "A"
                string suffix = "程序";                 // "程序"
                // 将 "A 程序" 转换为 "程序 A"
                current_program = "程序 " + prefix;
            } else {
                // 如果未找到，则保持原样或根据需要处理
                current_program = line;
            }
            continue;
        }

        // 下面解析动作行
        RunAction ra;
        {
            string action_str;
            stringstream ss(line);
            ss >> ra.time >> action_str;
            ra.type = parseActionType(action_str);
            ra.action = action_str;
            int param = -1;
            if (ra.type == ActionType::Jump || ra.type == ActionType::IO) {
                ss >> param;
                ra.param = param;
            } else {
                ra.param = -1;
            }
        }
        actions[current_program].push_back(ra);
    }

    file.close();
}
```

**说明**：

- 我们对 `current_program` 的字符串进行特殊处理，将 `A 程序` 转换为 `程序 A`，这样在后续的 `generatePageRequests()` 中查找 `actions[p.program_name]` 时才能匹配上 `p.program_name` 中的「程序 A」。
- 保证不修改原文件内容，只在代码中对字符串进行转换。
- 这一步将使得页面访问序列能正确生成，从而在 FIFO 和 LRU 模拟时不再出现「无页面访问记录」的现象。

**进一步检查**：

- 请确保 `Process.txt`、`run.txt`、`Program.txt` 格式严格符合题目要求。如有额外空格、制表符、编码问题可能导致解析异常。
- 运行后检查 `result.txt` 是否正确输出周转时间和带权周转时间。
- 如果依旧不满足预期，请增加调试输出（如输出 `current_program` 和 `p.program_name`）以确认二者是否匹配。

通过以上修改和分析，代码将更符合题目要求，写入结果文件 `result.txt`，并且页面访问记录和页面置换算法将正常执行，达到题目中的设计目标。