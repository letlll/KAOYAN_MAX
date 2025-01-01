您提供的 `run.txt` 文件中，对于 "结束" 操作的行有两种形式：

- A 程序的结束行没有多余参数 (`100 结束`)
- B、C、D、E 程序的结束行却有多余的数字参数 (`31 结束 6311` 等)

在代码中，您对 `action_type` 和 `action.target` 使用了 `erase` 和 `find_last_not_of` 来去除末尾空白字符，但是当 `action.target` 为空字符串时，`find_last_not_of` 会返回 `std::string::npos`，加上 `+1` 就会导致越界，从而引发 `std::range_error` 异常。

要解决这个问题，需要在对 `action.target`（及 `action_type`）调用 `erase` 之前先检查字符串是否为空以及 `find_last_not_of` 的返回值。

请在读取 `run.txt` 时对 `action_type` 和 `action.target` 的处理代码进行修改。例如：

```cpp
// 解析关键时间节点、操作类型和目标
stringstream ss(line);
RunAction action;
ss >> action.key_time;
ss >> ws;
getline(ss, action.action_type, '\t');
getline(ss, action.target);

// 对 action_type 和 action.target 进行安全的去除末尾空白处理
auto trim_str = [](std::string &s) {
    if (!s.empty()) {
        size_t end_pos = s.find_last_not_of(" \n\r\t");
        if (end_pos != std::string::npos) {
            s.erase(end_pos + 1);
        } else {
            // 全是空白字符
            s.clear();
        }
    }
};

trim_str(action.action_type);
trim_str(action.target);

program_actions[current_program].push_back(action);
```

>[!question] 

```
string line;
string current_program;
while (getline(infile, line)) {
    if (line.empty()) continue;
    if (line.find("程序") != string::npos) {
        size_t pos = line.find_first_not_of(" \t");
        if (pos != string::npos) {
            current_program = line.substr(pos);
        }
        continue;
    }

    // 解析关键时间节点、操作类型和目标
    stringstream ss(line);
    RunAction action;
    ss >> action.key_time;
    ss >> ws;
    getline(ss, action.action_type, '\t');
    getline(ss, action.target);

    // 对 action_type 和 action.target 进行安全的去除末尾空白处理
    auto trim_str = [](std::string& s) {
        if (!s.empty()) {
            size_t end_pos = s.find_last_not_of(" \n\r\t");
            if (end_pos != std::string::npos) {
                s.erase(end_pos + 1);
            }
            else {
                // 全是空白字符
                s.clear();
            }
        }
        };

    action.action_type.erase(action.action_type.find_last_not_of(" \n\r\t") + 1);
    action.target.erase(action.target.find_last_not_of(" \n\r\t") + 1);

    program_actions[current_program].push_back(action);

    trim_str(action.action_type);
    trim_str(action.target);

    program_actions[current_program].push_back(action);
}
```

通过上述修改，如果 `action.target` 是空字符串，`find_last_not_of` 会返回 `npos`，我们会进入 `else` 分支，将其清空（原本已经是空），不会出现 `+1` 的非法操作。如果 `action.target` 有内容（如 `6311`），则正常去掉末尾空白。

此外，在处理逻辑中（例如在 FCFS 和 RoundRobin 的循环中），对于 "结束" 操作无需对 `action.target` 进行数值转换。对于 "跳转" 和 "读写磁盘" 操作，在调用 `std::stoi` 前请先检查 `action.target` 是否为纯数字且不为空字符串：

```cpp
if (action.action_type == "跳转") {
    if (isDigits(action.target)) {
        int address = std::stoi(action.target);
        int page = (int)floor((double)address / page_size);
        cpu->visit_list.push_back(page);
    } else {
        cerr << "跳转目标解析错误（非数字）: " << action.target << endl;
    }
} else if (action.action_type == "读写磁盘") {
    if (isDigits(action.target)) {
        int io_time = std::stoi(action.target);
        // ...处理阻塞逻辑...
    } else {
        cerr << "读写磁盘时间解析错误（非数字）: " << action.target << endl;
    }
} else if (action.action_type == "结束") {
    // 不调用 stoi，不使用action.target作为数字
    cpu->status = ProcessStatus::Finished;
    cpu->finish_time = current_time;
    cpu->zhouzhuan_time = (double)(cpu->finish_time - cpu->start_time);
    cpu->daiquan_time = cpu->zhouzhuan_time / cpu->pro_time;
    cpu = nullptr;
    break;
}
```

### 总结

- 关键点在于对 `action.target` 和 `action.action_type` 进行字符串末尾修剪时要先检查是否为空。
- "结束" 操作不对 `action.target` 调用 `std::stoi`。
- "跳转" 和 "读写磁盘" 操作在 `std::stoi` 前检查字符串是否为纯数字。

经过以上修复后，`std::range_error` 的异常应能避免。