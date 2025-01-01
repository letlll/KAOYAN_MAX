```
// 模拟CPU使用情况
void simulateCPU(std::map<std::string, int>& runTimes) {
    std::ifstream file("run.txt");
    if (!file.is_open()) {
        std::cerr << "Error: Unable to open run.txt" << std::endl;
        return;
    }
    std::cout << "Simulating CPU Usage..." << std::endl;

    std::string line, currentProgram;
    std::map<int, std::string> cpuLog; // 时间点 -> 操作描述
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

        // Check if it's a ProgramName line
        if (line.find("ProgramName") == 0) {
            size_t pos_space = line.find_first_of(" \t", 11); // "ProgramName" is 11 characters
            if (pos_space != std::string::npos) {
                std::string afterKeyword = line.substr(pos_space + 1);
                afterKeyword = trim(afterKeyword);
                currentProgram = afterKeyword;
                std::cout << "Simulating Program: [" << currentProgram << "]" << std::endl; // Debug info
            }
            else {
                std::cerr << "Warning: Unable to extract program name: " << line << std::endl;
            }
        }
        else {
            // Parse run step line
            // Example line: "5	Jump	1021"
            std::istringstream iss(line);
            int time;
            std::string operation, param;
            if (!(iss >> time >> operation >> param)) {
                std::cerr << "Warning: Failed to parse run step line: " << line << std::endl;
                continue;
            }

            cpuLog[time] = currentProgram + " " + operation + " " + param; // Format log
        }
    }
    file.close();

    // Output operations in chronological order
    for (const auto& [time, logStr] : cpuLog) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simulate time interval
        std::cout << "Time: " << time << " ms, Operation: " << logStr << std::endl;
    }

    std::cout << "CPU Simulation Complete!" << std::endl;
}
```

数据错误，没有识别全面的数据出现，数据是被错误。

```
Simulating CPU Usage...
Reading line: [ProgramName ProgramA], Length: 20
Simulating Program: [ProgramA]
Reading line: [5        Jump    1021], Length: 11
Reading line: [10       Jump    2021], Length: 12
Reading line: [20       Start   10], Length: 11
Reading line: [30       Jump    2031], Length: 12
Reading line: [70       Jump    4050], Length: 12
Reading line: [100      End], Length: 7
Warning: Failed to parse run step line: 100     End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramB], Length: 20
Simulating Program: [ProgramB]
Reading line: [3        Jump    2508], Length: 11
Reading line: [10       Jump    6007], Length: 12
Reading line: [15       Start   7], Length: 10
Reading line: [22       Jump    5737], Length: 12
Reading line: [27       Jump    2245], Length: 12
Reading line: [31       End], Length: 6
Warning: Failed to parse run step line: 31      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramC], Length: 20
Simulating Program: [ProgramC]
Reading line: [3        Jump    1074], Length: 11
Reading line: [9        Jump    94], Length: 9
Reading line: [15       Start   10], Length: 11
Reading line: [25       Jump    70], Length: 10
Reading line: [30       Jump    516], Length: 11
Reading line: [37       End], Length: 6
Warning: Failed to parse run step line: 37      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramD], Length: 20
Simulating Program: [ProgramD]
Reading line: [3        Jump    1037], Length: 11
Reading line: [10       Jump    782], Length: 11
Reading line: [15       Start   4], Length: 10
Reading line: [19       Jump    1168], Length: 12
Reading line: [28       Jump    79], Length: 10
Reading line: [34       End], Length: 6
Warning: Failed to parse run step line: 34      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramE], Length: 20
Simulating Program: [ProgramE]
Reading line: [3        Jump    1414], Length: 11
Reading line: [11       Jump    1074], Length: 12
Reading line: [16       Start   10], Length: 11
Reading line: [26       Jump    149], Length: 11
Reading line: [32       Jump    1273], Length: 12
Reading line: [39       End], Length: 6
Warning: Failed to parse run step line: 39      End
Time: 3 ms, Operation: ProgramE Jump 1414
Time: 5 ms, Operation: ProgramA Jump 1021
Time: 9 ms, Operation: ProgramC Jump 94
Time: 10 ms, Operation: ProgramD Jump 782
Time: 11 ms, Operation: ProgramE Jump 1074
Time: 15 ms, Operation: ProgramD Start 4
Time: 16 ms, Operation: ProgramE Start 10
Time: 19 ms, Operation: ProgramD Jump 1168
Time: 20 ms, Operation: ProgramA Start 10
Time: 22 ms, Operation: ProgramB Jump 5737
Time: 25 ms, Operation: ProgramC Jump 70
Time: 26 ms, Operation: ProgramE Jump 149
Time: 27 ms, Operation: ProgramB Jump 2245
Time: 28 ms, Operation: ProgramD Jump 79
Time: 30 ms, Operation: ProgramC Jump 516
Time: 32 ms, Operation: ProgramE Jump 1273
Time: 70 ms, Operation: ProgramA Jump 4050
CPU Simulation Complete!
```

### 修改之后的

```cpp
// 模拟CPU使用情况
void simulateCPU(std::map<std::string, int>& runTimes) {
    std::ifstream file("run.txt");
    if (!file.is_open()) {
        std::cerr << "Error: Unable to open run.txt" << std::endl;
        return;
    }
    std::cout << "Simulating CPU Usage..." << std::endl;

    std::string line, currentProgram;
    std::map<int, std::string> cpuLog; // 时间点 -> 操作描述
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
        if (line.empty()) continue; // 跳过空行

        // 检查是否是 ProgramName 行
        if (line.find("ProgramName") == 0) {
            size_t pos_space = line.find_first_of(" \t", 11); // "ProgramName"是11个字符
            if (pos_space != std::string::npos) {
                std::string afterKeyword = line.substr(pos_space + 1);
                afterKeyword = trim(afterKeyword);
                currentProgram = afterKeyword;
                std::cout << "Simulating Program: [" << currentProgram << "]" << std::endl; // 调试信息
            }
            else {
                std::cerr << "Warning: Unable to extract program name: " << line << std::endl;
            }
        }
        else {
            // 解析运行步骤行
            // 示例行: "5    Jump    1021"
            std::istringstream iss(line);
            int time;
            std::string operation, param;
            if (iss >> time >> operation) {
                if (operation == "End") {
                    // 对于 "End" 操作，不需要参数
                    cpuLog[time] = currentProgram + " " + operation;  // 记录只有时间和操作
                }
                else if (iss >> param) {
                    // 对于其他操作，解析参数
                    cpuLog[time] = currentProgram + " " + operation + " " + param;
                } else {
                    std::cerr << "Warning: Failed to parse run step line: " << line << std::endl;
                    continue;
                }
            }
        }
    }
    file.close();

    // 按时间顺序输出操作
    for (const auto& [time, logStr] : cpuLog) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // 模拟时间间隔
        std::cout << "Time: " << time << " ms, Operation: " << logStr << std::endl;
    }

    std::cout << "CPU Simulation Complete!" << std::endl;
}

```