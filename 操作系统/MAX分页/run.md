>[!question] 
>这个从 run. Txt 中读取方法使用可以 rr 和 fcfs 的调度函数使用。但是现在被缩减为了文末的代码。无法运行可以 rr 和 fcfs 的调度函数。请你优化，请你服务全部的函数。

```
// 加载运行步骤，从run.txt中读取
std::map<std::string, int> loadRunSteps() {
    std::ifstream file("run.txt");
    if (!file.is_open()) {
        std::cerr << "Error: Unable to open run.txt" << std::endl;
        return {};
    }

    std::map<std::string, int> runTimes;
    std::string line, currentProgram;
    bool isFirstLine = true; // 标记是否为第一行

    while (std::getline(file, line)) {
        if (isFirstLine) {
            // 检测并移除BOM
            if (line.size() >= 3 &&
                static_cast<unsigned char>(line[0]) == 0xEF &&
                static_cast<unsigned char>(line[1]) == 0xBB &&
                static_cast<unsigned char>(line[2]) == 0xBF) {
                line = line.substr(3);
            }
            isFirstLine = false;
        }

        // 打印读取的行及其长度以进行调试
        std::cout << "Reading line: [" << line << "], Length: " << line.length() << std::endl;

        line = trim(line);
        if (line.empty()) continue; // Skip empty lines

        // 检查是否为程序名行（"ProgramName" 或 "程序"）
        if (line.find("ProgramName") == 0 || line.find("程序") == 0) {
            // 提取程序名
            size_t pos_space = line.find_first_of(" \t"); // 查找第一个空格或制表符
            if (pos_space != std::string::npos) {
                std::string afterKeyword = line.substr(pos_space + 1);
                afterKeyword = trim(afterKeyword);
                currentProgram = afterKeyword;
                std::cout << "Found Program Name: [" << currentProgram << "]" << std::endl; // Debug info
            }
            else {
                std::cerr << "Warning: Unable to extract program name: " << line << std::endl;
            }
        }
        else {
            // 确保存在当前程序名
            if (currentProgram.empty()) {
                std::cerr << "Warning: Found run step before program name: " << line << std::endl;
                continue;
            }

            // 解析运行步骤行（格式："时间 操作 参数" 或 "时间 操作"）
            std::istringstream iss(line);
            int time;
            std::string operation, param;

            // 如果无法解析到时间和操作，跳过
            if (!(iss >> time >> operation)) {
                std::cerr << "Warning: Failed to parse run step line: " << line << std::endl;
                continue;
            }

            // 检测是否有第三列参数
            if (!(iss >> param)) {
                param = ""; // 如果没有参数，设置为空字符串
            }

            // 如果操作为 "结束" 或 "End"，将时间作为最终运行时间
            if (operation == "结束" || operation == "End") {
                runTimes[currentProgram] = std::max(runTimes[currentProgram], time);
                std::cout << "Set final run time for [" << currentProgram << "] to " << time << " ms" << std::endl;
                continue;
            }

            // 更新当前程序的运行时间，取时间的最大值
            runTimes[currentProgram] = std::max(runTimes[currentProgram], time);
            std::cout << "Updated run time [" << currentProgram << "]: " << time << std::endl; // Debug info
        }
    }

    file.close();

    // 输出加载的运行时间
    std::cout << "Loaded Run Times:" << std::endl;
    for (const auto& [program, time] : runTimes) {
        std::cout << "Program: [" << program << "], Run Time: " << time << " ms" << std::endl; // Debug info
    }

    return runTimes;
}

```

>[!question] 
>下面是现在的 run 文件提取，可以满足分页调度的函数使用，run. txt 文件中的数据。

```
// 加载运行步骤，从run.txt中读取
map<string, int> loadRunSteps() {
    // 假设 runSteps 需要从某个文件加载，具体实现取决于 run.txt 的格式
    // 这里给出一个示例实现
    map<string, int> runSteps;
    ifstream file("run.txt");
    if (!file.is_open()) {
        cerr << "Error: Unable to open run.txt" << endl;
        return runSteps;
    }

    string line;
    while (getline(file, line)) {
        // 假设每行格式为: ProgramName RunTime
        string progName;
        int runTime;
        istringstream iss(line);
        if (!(iss >> progName >> runTime)) {
            cerr << "Warning: Failed to parse run step line: " << line << endl;
            continue;
        }
        runSteps[progName] = runTime;
    }

    file.close();
    return runSteps;
}
```