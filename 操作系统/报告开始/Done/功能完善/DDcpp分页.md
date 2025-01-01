好的，以下是根据您的需求完善的C++代码，特别是针对主函数中的**Case 6**部分，实现用户可以选择**设置新的页面大小和时间片长度**，或**执行分页调度**。代码中包含详细的中文注释，以帮助您理解每一部分的功能和逻辑。

## **一、代码实现**

### **1. 主函数中的Case 6实现**

在主函数的`switch`语句中，`Case 6`将提供两个选项：

1. **设置新的页面大小和时间片长度**：
    
    - 用户输入新的页面大小（`double`类型，单位为KB）。
    - 用户输入新的时间片长度（`int`类型，单位为ms）。
    - 包含输入验证，确保用户输入有效的数值。
2. **执行分页调度**：
    
    - 调用`pageScheduling`函数，根据用户选择的页面替换算法（FIFO或LRU）进行分页调度。

以下是**Case 6**的完整实现：

```cpp
switch (mainChoice) {
    // ... 其他case

    case 6:
        // 分页调度功能
        std::cout << "请选择操作：" << std::endl;
        std::cout << "1. 设置页面大小和时间片长度" << std::endl;
        std::cout << "2. 执行分页调度" << std::endl;
        std::cout << "请输入选项 (1 或 2): ";
        int option;
        while (!(std::cin >> option) || (option != 1 && option != 2)) {
            std::cout << "输入无效，请输入1或2: ";
            std::cin.clear();
            std::cin.ignore(10000, '\n');
        }

        if (option == 1) {
            // 设置新的页面大小
            std::cout << "请输入新的页面大小 (单位: KB): ";
            while (!(std::cin >> pageSize) || pageSize <= 0.0) {
                std::cout << "输入无效，页面大小必须为正数，请重新输入: ";
                std::cin.clear();
                std::cin.ignore(10000, '\n');
            }

            // 设置新的时间片长度
            std::cout << "请输入新的时间片长度 (单位: ms): ";
            while (!(std::cin >> timeSlice) || timeSlice <= 0) {
                std::cout << "输入无效，时间片长度必须为正整数，请重新输入: ";
                std::cin.clear();
                std::cin.ignore(10000, '\n');
            }

            std::cout << "页面大小已设置为: " << pageSize << " KB | 时间片长度已设置为: " << timeSlice << " ms" << std::endl;
        }
        else if (option == 2) {
            // 执行分页调度
            pageScheduling(programs);
        }
        break;

    // ... 其他case
}
```

### **2. 分页调度函数`pageScheduling`**

以下是`pageScheduling`函数的完整实现，包括用户选择页面替换算法（FIFO或LRU）、页面需求计算、页面替换过程以及调度总结报告的输出。

```cpp
// 分页调度
void pageScheduling(std::map<std::string, std::map<std::string, double>>& programs) {
    std::map<std::string, int> pageRequirements;
    // 计算每个程序所需的页面数
    for (const auto& [program, functions] : programs) {
        double totalSize = 0.0;
        for (const auto& [func, size] : functions) {
            totalSize += size;
        }
        pageRequirements[program] = static_cast<int>(std::ceil(totalSize / pageSize));
    }

    // 显示每个程序的页面需求
    std::cout << "程序页面需求:" << std::endl;
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 所需页面数: " << pages << std::endl;
    }

    // 获取用户输入的最大页面数
    std::cout << "请输入每个进程的最大页面数: ";
    int maxPages;
    while (!(std::cin >> maxPages) || maxPages <= 0) {
        std::cout << "输入无效，最大页面数必须为正整数，请重新输入: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 获取用户选择的页面替换算法
    std::cout << "请选择页面替换算法：" << std::endl;
    std::cout << "1. FIFO" << std::endl;
    std::cout << "2. LRU" << std::endl;
    std::cout << "请输入选项 (1 或 2): ";
    int choice;
    while (!(std::cin >> choice) || (choice != 1 && choice != 2)) {
        std::cout << "输入无效，请输入1或2: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 创建PageManager实例
    PageManager pageManager(pageSize, maxPages);
    int currentTime = 0;

    // 遍历每个程序及其所需页面数
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 需要页面数: " << pages << std::endl;
        for (int page = 0; page < pages; ++page) {
            if (choice == 1) {
                // 使用FIFO算法
                pageManager.fifoReplace(page);
            }
            else {
                // 使用LRU算法
                pageManager.lruReplace(page, currentTime);
            }
            currentTime++;
        }
    }

    // 输出页面置换日志
    std::cout << "\n页面置换日志:" << std::endl;
    for (const auto& logEntry : pageManager.log) {
        std::cout << logEntry << std::endl;
    }

    // 输出分页调度总结报告
    std::cout << "\n分页调度总结报告:" << std::endl;
    std::cout << "页面命中次数: " << pageManager.pageHits << std::endl;
    std::cout << "页面置换次数 (页面错误): " << pageManager.pageFaults << std::endl;
    if (pageManager.pageHits + pageManager.pageFaults > 0) {
        double hitRate = (static_cast<double>(pageManager.pageHits) / (pageManager.pageHits + pageManager.pageFaults)) * 100.0;
        std::cout << "页面命中率: " << std::fixed << std::setprecision(2) << hitRate << "%" << std::endl;
    }
    else {
        std::cout << "页面命中率: 0.00%" << std::endl;
    }
}
```

### **3. 完整的相关部分代码整合**

为了便于您理解，以下是整合后的完整相关代码片段，包括`PageManager`类、辅助函数以及主函数中的`Case 6`实现。

```cpp
#define NOMINMAX
#define WIN32_LEAN_AND_MEAN
#ifdef _WIN32
#include <windows.h>
#endif
#include <locale>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <queue>
#include <map>
#include <unordered_map>
#include <cmath>
#include <iomanip>
#include <algorithm>
#include <chrono>
#include <thread>
#include <climits>

// PCB类：进程控制块
class PCB {
public:
    std::string pName;               // 进程名称
    std::string pRemark;             // 程序名称
    std::string pStatus;             // 进程状态
    int createTime;                  // 创建时间
    int runTime;                     // 运行时间
    int grade;                       // 优先级
    int startTime;                   // 开始时间
    int completeTime;                // 完成时间
    int turnoverTime;                // 周转时间
    double weightedTurnoverTime;     // 带权周转时间
    int originalRunTime;             // 原始运行时间

    PCB(std::string name, int create, int runtime, int priority, std::string remark)
        : pName(name), createTime(create), runTime(runtime), grade(priority),
        pRemark(remark), pStatus("Waiting"), startTime(-1), completeTime(0),
        turnoverTime(0), weightedTurnoverTime(0.0), originalRunTime(runtime) {}
};

// PageManager类：处理FIFO和LRU页面替换
class PageManager {
public:
    double pageSize;
    int maxPages;
    std::queue<int> fifoPages;                     // FIFO队列
    std::unordered_map<int, int> lruPages;        // LRU映射：页面及其最近访问时间
    std::vector<std::string> log;                  // 页面操作日志
    int pageFaults = 0;
    int pageHits = 0;

    PageManager(double size, int max) : pageSize(size), maxPages(max) {}

    // FIFO替换策略
    void fifoReplace(int page) {
        // 检查页面是否在内存中
        std::vector<int> fifoVec = queueToVector(fifoPages);
        if (std::find(fifoVec.begin(), fifoVec.end(), page) != fifoVec.end()) {
            pageHits++;
            log.push_back("FIFO: Page " + std::to_string(page) + " already in memory (hit).");
            return;
        }
        pageFaults++;
        if (fifoPages.size() >= maxPages) {
            int removed = fifoPages.front();
            fifoPages.pop();
            log.push_back("FIFO: Page " + std::to_string(removed) + " removed.");
        }
        fifoPages.push(page);
        log.push_back("FIFO: Page " + std::to_string(page) + " added.");
    }

    // LRU替换策略
    void lruReplace(int page, int currentTime) {
        if (lruPages.find(page) != lruPages.end()) {
            pageHits++;
            lruPages[page] = currentTime;
            log.push_back("LRU: Page " + std::to_string(page) + " already in memory (hit).");
            return;
        }
        pageFaults++;
        if (lruPages.size() >= maxPages) {
            int lruPage = getLRUPage();
            lruPages.erase(lruPage);
            log.push_back("LRU: Page " + std::to_string(lruPage) + " removed.");
        }
        lruPages[page] = currentTime;
        log.push_back("LRU: Page " + std::to_string(page) + " added.");
    }

    // 打印分页调度总结
    void printSummary() const {
        std::cout << "Page Faults: " << pageFaults << std::endl;
        std::cout << "Page Hits: " << pageHits << std::endl;
        if (pageHits + pageFaults > 0) {
            double hitRate = (static_cast<double>(pageHits) / (pageHits + pageFaults)) * 100.0;
            std::cout << "Hit Rate: " << std::fixed << std::setprecision(2) << hitRate << "%" << std::endl;
        }
        else {
            std::cout << "Hit Rate: 0.00%" << std::endl;
        }
    }

private:
    // 将队列转换为向量
    std::vector<int> queueToVector(std::queue<int> q) {
        std::vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front());
            q.pop();
        }
        return result;
    }

    // 获取最久未使用的页面
    int getLRUPage() const {
        int lruPage = -1;
        int minTime = INT32_MAX;
        for (const auto& entry : lruPages) {
            if (entry.second < minTime) {
                minTime = entry.second;
                lruPage = entry.first;
            }
        }
        return lruPage;
    }
};

// 全局变量
std::vector<PCB> processList;
double pageSize = 4.0; // 默认页面大小（KB）
int timeSlice = 2;      // 默认时间片（ms）

// 函数声明
void loadProcesses(std::map<std::string, int>& runTimes);
std::map<std::string, int> loadRunSteps();
std::map<std::string, std::map<std::string, double>> loadPrograms();
void fcfsScheduling();
void rrScheduling();
void simulateCPU(std::map<std::string, int>& runTimes);
void pageScheduling(std::map<std::string, std::map<std::string, double>>& programs);

// 辅助函数：去除字符串首尾的空白字符
std::string trim(const std::string& str) {
    size_t first = str.find_first_not_of(" \t\r\n");
    if (first == std::string::npos)
        return "";
    size_t last = str.find_last_not_of(" \t\r\n");
    return str.substr(first, (last - first + 1));
}

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

        // Check if it's a ProgramName line
        if (line.find("ProgramName") == 0) {
            // Extract program name
            size_t pos_space = line.find_first_of(" \t", 11); // "ProgramName" is 11 characters
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
            // Ensure there is a current program name
            if (currentProgram.empty()) {
                std::cerr << "Warning: Found run step before program name: " << line << std::endl;
                continue;
            }

            // Parse run step line
            // Example line: "5	Jump	1021"
            std::istringstream iss(line);
            int time;
            std::string operation, param;
            if (!(iss >> time >> operation >> param)) {
                std::cerr << "Warning: Failed to parse run step line: " << line << std::endl;
                continue;
            }

            // Update runTimes with the maximum run time for the current program
            if (runTimes.find(currentProgram) == runTimes.end() || runTimes[currentProgram] < time) {
                runTimes[currentProgram] = time; // Explicitly cast to int
                std::cout << "Updated run time [" << currentProgram << "]: " << time << std::endl; // Debug info
            }
        }
    }

    file.close();

    // Output loaded run times
    std::cout << "Loaded Run Times:" << std::endl;
    for (const auto& [program, time] : runTimes) {
        std::cout << "Program: [" << program << "], Run Time: " << time << "ms" << std::endl; // Debug info
    }

    return runTimes;
}

// 加载程序详细信息，从program.txt中读取
std::map<std::string, std::map<std::string, double>> loadPrograms() {
    std::ifstream file("program.txt");
    if (!file.is_open()) {
        std::cerr << "Error: Unable to open program.txt" << std::endl;
        return {};
    }

    std::map<std::string, std::map<std::string, double>> programs;
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

        // Check if it's a FileName line
        if (line.find("FileName") == 0) {
            // Extract program name
            size_t pos_space = line.find_first_of(" \t", 8); // "FileName" is 8 characters
            if (pos_space != std::string::npos) {
                std::string afterKeyword = line.substr(pos_space + 1);
                afterKeyword = trim(afterKeyword);
                currentProgram = afterKeyword;
                std::cout << "Found Program: [" << currentProgram << "]" << std::endl; // Debug info
            }
            else {
                std::cerr << "Warning: Unable to extract file name: " << line << std::endl;
            }
        }
        else {
            // Ensure there is a current program name
            if (currentProgram.empty()) {
                std::cerr << "Warning: Found function definition before program name: " << line << std::endl;
                continue;
            }

            // Parse function line
            // Example line: "Main	0.6"
            std::istringstream iss(line);
            std::string funcName;
            double size;
            if (!(iss >> funcName >> size)) {
                std::cerr << "Warning: Failed to parse function line: " << line << std::endl;
                continue;
            }

            programs[currentProgram][funcName] = size;
            std::cout << "Added Function [" << funcName << "] Size " << size << " KB to Program [" << currentProgram << "]" << std::endl; // Debug info
        }
    }

    file.close();
    return programs;
}

// 加载进程信息，从process.txt中读取
void loadProcesses(std::map<std::string, int>& runTimes) {
    std::cout << "Loaded Run Times:" << std::endl;
    for (const auto& [program, time] : runTimes) {
        std::cout << "Program: [" << program << "], Run Time: " << time << "ms" << std::endl; // Debug info
    }

    std::ifstream file("process.txt");
    if (!file.is_open()) {
        std::cerr << "Error: Unable to open process.txt" << std::endl;
        return;
    }
    std::string line;
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

        // 使用istringstream读取
        std::istringstream iss(line);
        std::string pName, pRemark;
        int createTime, grade;
        if (!(iss >> pName >> createTime >> grade >> pRemark)) {
            std::cerr << "Warning: Failed to parse process line: " << line << std::endl;
            continue;
        }

        std::cout << "Processing Process: [" << pName << "], Program Remark: [" << pRemark << "]" << std::endl; // Debug info

        if (runTimes.find(pRemark) != runTimes.end()) {
            processList.emplace_back(pName, createTime, runTimes[pRemark], grade, pRemark);
            std::cout << "Added Process: " << pName << " Run Time: " << runTimes[pRemark] << std::endl; // Debug info
        }
        else {
            std::cerr << "Warning: Program [" << pRemark << "] not found in runTimes. Skipping Process [" << pName << "]." << std::endl;
        }
    }
    file.close();
}

// 先来先服务调度（FCFS）
void fcfsScheduling() {
    std::ofstream resultFile("result.txt");
    if (!resultFile.is_open()) {
        std::cerr << "Error: Unable to open result.txt" << std::endl;
        return;
    }
    // 按创建时间排序
    std::sort(processList.begin(), processList.end(), [](PCB& a, PCB& b) {
        return a.createTime < b.createTime;
    });
    int currentTime = 0;
    for (auto& process : processList) {
        if (currentTime < process.createTime) {
            currentTime = process.createTime;
        }
        process.startTime = currentTime;
        process.completeTime = currentTime + process.runTime;
        process.turnoverTime = process.completeTime - process.createTime;
        process.weightedTurnoverTime = static_cast<double>(process.turnoverTime) / process.runTime;
        currentTime += process.runTime;

        resultFile << "进程名称: " << process.pName << ", 开始时间: " << process.startTime
            << ", 完成时间: " << process.completeTime << ", 周转时间: " << process.turnoverTime
            << ", 带权周转时间: " << std::fixed << std::setprecision(2) << process.weightedTurnoverTime << std::endl;
    }
    resultFile.close();
}

// 时间片轮转调度（RR）
void rrScheduling() {
    // Open 'result.txt' in truncate mode to clear previous results
    std::ofstream resultFile("result.txt", std::ios::trunc);
    if (!resultFile.is_open()) {
        std::cerr << "Error: Unable to open result.txt" << std::endl;
        return;
    }
    resultFile.close(); // Close immediately; will reopen in append mode later

    // Create a queue to hold pointers to PCB objects waiting for scheduling
    std::queue<PCB*> processQueue;

    // Sort the processList by creation time (ascending)
    std::sort(processList.begin(), processList.end(), [](const PCB& a, const PCB& b) {
        return a.createTime < b.createTime;
    });

    int currentTime = 0;
    size_t index = 0; // Index to track the next process to enqueue
    std::unordered_map<std::string, int> remainingTimeMap; // Map to track remaining time per process

    // Initialize remainingTimeMap with each process's runTime
    for (auto& process : processList) {
        remainingTimeMap[process.pName] = process.runTime;
    }

    // Main scheduling loop
    while (!processQueue.empty() || index < processList.size()) {
        // Advance currentTime to the next process's createTime if queue is empty
        if (processQueue.empty() && index < processList.size() && processList[index].createTime > currentTime) {
            currentTime = processList[index].createTime;
        }

        // Enqueue all processes that have arrived by currentTime
        while (index < processList.size() && processList[index].createTime <= currentTime) {
            PCB* newProcess = &processList[index];
            processQueue.push(newProcess);
            std::cout << "Enqueued Process: " << newProcess->pName << " at time " << currentTime << " ms" << std::endl;
            index++;
        }

        // If the queue is still empty after enqueuing, increment currentTime and continue
        if (processQueue.empty()) {
            currentTime++;
            continue;
        }

        // Dequeue the first process in the queue
        PCB* currentProcess = processQueue.front();
        processQueue.pop();

        // If the process is running for the first time, set its startTime
        if (currentProcess->startTime == -1) {
            currentProcess->startTime = currentTime;
            std::cout << "Process " << currentProcess->pName << " started at " << currentTime << " ms" << std::endl;
        }

        // Determine the execution time for this time slice
        int execTime = std::min(timeSlice, remainingTimeMap[currentProcess->pName]);
        std::cout << "Executing Process: " << currentProcess->pName
            << " | Execution Time: " << execTime << " ms" << std::endl;

        // Update times
        remainingTimeMap[currentProcess->pName] -= execTime;
        currentTime += execTime;

        // Debug: Current queue status after execution
        std::cout << "Current Time: " << currentTime << " ms | Remaining Time for "
            << currentProcess->pName << ": " << remainingTimeMap[currentProcess->pName] << " ms" << std::endl;

        // If the process still has remaining time, re-enqueue it
        if (remainingTimeMap[currentProcess->pName] > 0) {
            processQueue.push(currentProcess);
            std::cout << "Process " << currentProcess->pName << " re-enqueued at " << currentTime << " ms" << std::endl;
        }
        else {
            // Process has completed execution
            currentProcess->completeTime = currentTime;
            currentProcess->turnoverTime = currentProcess->completeTime - currentProcess->createTime;
            currentProcess->weightedTurnoverTime = static_cast<double>(currentProcess->turnoverTime) / currentProcess->originalRunTime;

            // Remove from remainingTimeMap
            remainingTimeMap.erase(currentProcess->pName);

            std::cout << "Process " << currentProcess->pName << " completed at " << currentTime << " ms"
                << " | Turnover Time: " << currentProcess->turnoverTime
                << " ms | Weighted Turnover Time: " << std::fixed << std::setprecision(2)
                << currentProcess->weightedTurnoverTime << std::endl;
        }

        // Optional: Print current queue status
        std::queue<PCB*> tempQueue = processQueue;
        std::cout << "Current Queue: ";
        while (!tempQueue.empty()) {
            PCB* p = tempQueue.front();
            tempQueue.pop();
            std::cout << p->pName << " ";
        }
        std::cout << std::endl;
    }

    // Append the scheduling results to 'result.txt'
    resultFile.open("result.txt", std::ios::app);
    if (!resultFile.is_open()) {
        std::cerr << "Error: Unable to open result.txt for appending" << std::endl;
        return;
    }

    for (const auto& process : processList) {
        resultFile << "进程名称: " << process.pName
            << ", 开始时间: " << process.startTime
            << ", 完成时间: " << process.completeTime
            << ", 周转时间: " << process.turnoverTime
            << ", 带权周转时间: " << std::fixed << std::setprecision(2)
            << process.weightedTurnoverTime << std::endl;
    }

    resultFile.close();
    std::cout << "RR Scheduling Complete. Results saved to result.txt" << std::endl;
}

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

// 分页调度
void pageScheduling(std::map<std::string, std::map<std::string, double>>& programs) {
    std::map<std::string, int> pageRequirements;
    // 计算每个程序所需的页面数
    for (const auto& [program, functions] : programs) {
        double totalSize = 0;
        for (const auto& [func, size] : functions) {
            totalSize += size;
        }
        pageRequirements[program] = static_cast<int>(std::ceil(totalSize / pageSize));
    }

    // 显示每个程序的页面需求
    std::cout << "程序页面需求:" << std::endl;
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 所需页面数: " << pages << std::endl;
    }

    // 获取用户输入的最大页面数
    std::cout << "请输入每个进程的最大页面数: ";
    int maxPages;
    while (!(std::cin >> maxPages) || maxPages <= 0) {
        std::cout << "输入无效，最大页面数必须为正整数，请重新输入: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 获取用户选择的页面替换算法
    std::cout << "请选择页面替换算法：" << std::endl;
    std::cout << "1. FIFO" << std::endl;
    std::cout << "2. LRU" << std::endl;
    std::cout << "请输入选项 (1 或 2): ";
    int choice;
    while (!(std::cin >> choice) || (choice != 1 && choice != 2)) {
        std::cout << "输入无效，请输入1或2: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 创建PageManager实例
    PageManager pageManager(pageSize, maxPages);
    int currentTime = 0;

    // 遍历每个程序及其所需页面数
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 需要页面数: " << pages << std::endl;
        for (int page = 0; page < pages; ++page) {
            if (choice == 1) {
                // 使用FIFO算法
                pageManager.fifoReplace(page);
            }
            else {
                // 使用LRU算法
                pageManager.lruReplace(page, currentTime);
            }
            currentTime++;
        }
    }

    // 输出页面置换日志
    std::cout << "\n页面置换日志:" << std::endl;
    for (const auto& logEntry : pageManager.log) {
        std::cout << logEntry << std::endl;
    }

    // 输出分页调度总结报告
    std::cout << "\n分页调度总结报告:" << std::endl;
    std::cout << "页面命中次数: " << pageManager.pageHits << std::endl;
    std::cout << "页面置换次数 (页面错误): " << pageManager.pageFaults << std::endl;
    if (pageManager.pageHits + pageManager.pageFaults > 0) {
        double hitRate = (static_cast<double>(pageManager.pageHits) / (pageManager.pageHits + pageManager.pageFaults)) * 100.0;
        std::cout << "页面命中率: " << std::fixed << std::setprecision(2) << hitRate << "%" << std::endl;
    }
    else {
        std::cout << "页面命中率: 0.00%" << std::endl;
    }
}

// 主函数
int main() {
    // 设置控制台代码页为65001（UTF-8）
#ifdef _WIN32
    system("chcp 65001");

    // 设置控制台字体为支持中文的字体（如Consolas）
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_FONT_INFOEX fontInfo = { 0 };
    fontInfo.cbSize = sizeof(CONSOLE_FONT_INFOEX);
    GetCurrentConsoleFontEx(hOut, FALSE, &fontInfo);
    wcscpy_s(fontInfo.FaceName, L"Consolas"); // 使用Consolas或其他支持英文的字体
    SetCurrentConsoleFontEx(hOut, FALSE, &fontInfo);
#endif

    // 设置区域设置为用户默认
    setlocale(LC_ALL, "");

    // 关闭同步IO，提高性能
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);

    // 加载运行步骤
    std::map<std::string, int> runTimes = loadRunSteps();

    // 加载进程信息
    loadProcesses(runTimes);

    // 加载程序详细信息
    std::map<std::string, std::map<std::string, double>> programs = loadPrograms();

    while (true) {
        std::cout << "\n请选择功能：" << std::endl;
        std::cout << "1. 显示进程信息" << std::endl;
        std::cout << "2. 显示程序详细信息" << std::endl;
        std::cout << "3. 显示程序运行步骤" << std::endl;
        std::cout << "4. 先来先服务调度（FCFS）" << std::endl;
        std::cout << "5. 时间片轮转调度（RR）" << std::endl;
        std::cout << "6. 分页调度" << std::endl;
        std::cout << "7. 模拟CPU占用情况" << std::endl;
        std::cout << "8. 退出程序" << std::endl;
        std::cout << "请输入选项 (1-8): ";
        int mainChoice;
        while (!(std::cin >> mainChoice)) {
            std::cout << "输入无效，请输入一个整数选项 (1-8): ";
            std::cin.clear();
            std::cin.ignore(10000, '\n');
        }

        switch (mainChoice) {
            case 1:
                // 显示进程信息
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息。" << std::endl;
                }
                else {
                    std::cout << "进程信息:" << std::endl;
                    for (const auto& process : processList) {
                        std::cout << "进程: " << process.pName
                                  << ", 创建时间: " << process.createTime
                                  << ", 运行时间: " << process.runTime
                                  << ", 优先级: " << process.grade
                                  << ", 程序备注: " << process.pRemark << std::endl;
                    }
                }
                break;
            case 2:
                // 显示程序详细信息
                if (programs.empty()) {
                    std::cout << "未加载任何程序详细信息。" << std::endl;
                }
                else {
                    std::cout << "程序详细信息:" << std::endl;
                    for (const auto& [program, functions] : programs) {
                        std::cout << "程序: " << program << std::endl;
                        for (const auto& [func, size] : functions) {
                            std::cout << "  功能: " << func << ", 大小: " << size << " KB" << std::endl;
                        }
                    }
                }
                break;
            case 3:
                // 显示程序运行步骤
                if (runTimes.empty()) {
                    std::cout << "未加载任何程序运行步骤。" << std::endl;
                }
                else {
                    std::cout << "程序运行步骤:" << std::endl;
                    for (const auto& [program, time] : runTimes) {
                        std::cout << "程序: " << program << ", 运行时间: " << time << "ms" << std::endl;
                    }
                }
                break;
            case 4:
                // 先来先服务调度
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息，无法执行FCFS调度。" << std::endl;
                }
                else {
                    fcfsScheduling();
                    std::cout << "先来先服务调度（FCFS）完成。结果已保存到 result.txt" << std::endl;
                }
                break;
            case 5:
                // 时间片轮转调度
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息，无法执行RR调度。" << std::endl;
                }
                else {
                    rrScheduling();
                    std::cout << "时间片轮转调度（RR）完成。结果已保存到 result.txt" << std::endl;
                }
                break;
            case 6:
                // 分页调度功能
                std::cout << "请选择操作：" << std::endl;
                std::cout << "1. 设置页面大小和时间片长度" << std::endl;
                std::cout << "2. 执行分页调度" << std::endl;
                std::cout << "请输入选项 (1 或 2): ";
                int option;
                while (!(std::cin >> option) || (option != 1 && option != 2)) {
                    std::cout << "输入无效，请输入1或2: ";
                    std::cin.clear();
                    std::cin.ignore(10000, '\n');
                }

                if (option == 1) {
                    // 设置新的页面大小
                    std::cout << "请输入新的页面大小 (单位: KB): ";
                    while (!(std::cin >> pageSize) || pageSize <= 0.0) {
                        std::cout << "输入无效，页面大小必须为正数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    // 设置新的时间片长度
                    std::cout << "请输入新的时间片长度 (单位: ms): ";
                    while (!(std::cin >> timeSlice) || timeSlice <= 0) {
                        std::cout << "输入无效，时间片长度必须为正整数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    std::cout << "页面大小已设置为: " << pageSize << " KB | 时间片长度已设置为: " << timeSlice << " ms" << std::endl;
                }
                else if (option == 2) {
                    // 执行分页调度
                    if (programs.empty()) {
                        std::cout << "未加载任何程序信息，无法执行分页调度。" << std::endl;
                    }
                    else {
                        pageScheduling(programs);
                    }
                }
                break;
            case 7:
                // 模拟CPU占用情况
                if (runTimes.empty()) {
                    std::cout << "未加载任何运行步骤，无法模拟CPU占用情况。" << std::endl;
                }
                else {
                    simulateCPU(runTimes);
                }
                break;
            case 8:
                // 退出程序
                std::cout << "正在退出程序..." << std::endl;
                return 0;
            default:
                std::cout << "无效选择，请重新输入！" << std::endl;
        }
    }

    return 0;
}
```

## **二、代码说明**

### **1. PCB类**

`PCB`类用于表示一个进程的控制块，存储进程的各种信息，如名称、备注、状态、创建时间、运行时间、优先级、开始时间、完成时间、周转时间、带权周转时间和原始运行时间。

### **2. PageManager类**

`PageManager`类管理页面的加载和替换，支持FIFO和LRU两种页面替换算法。

- **字段**：
    
    - `pageSize`：页面大小。
    - `maxPages`：最大页面数。
    - `fifoPages`：FIFO页面队列，使用`std::queue<int>`维护页面的进入顺序。
    - `lruPages`：LRU页面映射，使用`std::unordered_map<int, int>`记录页面的最后访问时间。
    - `log`：记录页面替换的日志。
    - `pageFaults`：记录页面错误次数。
    - `pageHits`：记录页面命中次数。
- **方法**：
    
    - `fifoReplace(int page)`：实现FIFO页面替换逻辑。如果页面已在内存中，记录命中；否则，发生页面错误，若内存已满则移除最早进入的页面，加载新页面。
    - `lruReplace(int page, int currentTime)`：实现LRU页面替换逻辑。如果页面已在内存中，更新其最后访问时间，记录命中；否则，发生页面错误，若内存已满则移除最久未使用的页面，加载新页面。
    - `printSummary()`：打印分页调度的总结报告，包括页面命中次数、页面错误次数和页面命中率。
    - **私有方法**：
        - `queueToVector(std::queue<int> q)`：将FIFO队列转换为向量，便于查找。
        - `getLRUPage() const`：获取最久未使用的页面。

### **3. 辅助函数**

#### **3.1 `trim`函数**

用于去除字符串首尾的空白字符，确保读取和解析的数据正确。

```cpp
std::string trim(const std::string& str) {
    size_t first = str.find_first_not_of(" \t\r\n");
    if (first == std::string::npos)
        return "";
    size_t last = str.find_last_not_of(" \t\r\n");
    return str.substr(first, (last - first + 1));
}
```

#### **3.2 数据加载函数**

- **`loadRunSteps`**：从`run.txt`文件中加载程序的运行步骤，并计算每个程序的最大运行时间。
- **`loadPrograms`**：从`program.txt`文件中加载程序及其包含的函数和大小。
- **`loadProcesses`**：从`process.txt`文件中加载进程信息，并根据运行步骤设置每个进程的运行时间。

### **4. 分页调度函数`pageScheduling`**

`pageScheduling`函数根据用户选择的页面替换算法（FIFO或LRU）对页面进行管理，记录页面替换的过程，并输出调度总结报告。

```cpp
// 分页调度
void pageScheduling(std::map<std::string, std::map<std::string, double>>& programs) {
    std::map<std::string, int> pageRequirements;
    // 计算每个程序所需的页面数
    for (const auto& [program, functions] : programs) {
        double totalSize = 0.0;
        for (const auto& [func, size] : functions) {
            totalSize += size;
        }
        pageRequirements[program] = static_cast<int>(std::ceil(totalSize / pageSize));
    }

    // 显示每个程序的页面需求
    std::cout << "程序页面需求:" << std::endl;
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 所需页面数: " << pages << std::endl;
    }

    // 获取用户输入的最大页面数
    std::cout << "请输入每个进程的最大页面数: ";
    int maxPages;
    while (!(std::cin >> maxPages) || maxPages <= 0) {
        std::cout << "输入无效，最大页面数必须为正整数，请重新输入: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 获取用户选择的页面替换算法
    std::cout << "请选择页面替换算法：" << std::endl;
    std::cout << "1. FIFO" << std::endl;
    std::cout << "2. LRU" << std::endl;
    std::cout << "请输入选项 (1 或 2): ";
    int choice;
    while (!(std::cin >> choice) || (choice != 1 && choice != 2)) {
        std::cout << "输入无效，请输入1或2: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 创建PageManager实例
    PageManager pageManager(pageSize, maxPages);
    int currentTime = 0;

    // 遍历每个程序及其所需页面数
    for (const auto& [program, pages] : pageRequirements) {
        std::cout << "程序: " << program << " | 需要页面数: " << pages << std::endl;
        for (int page = 0; page < pages; ++page) {
            if (choice == 1) {
                // 使用FIFO算法
                pageManager.fifoReplace(page);
            }
            else {
                // 使用LRU算法
                pageManager.lruReplace(page, currentTime);
            }
            currentTime++;
        }
    }

    // 输出页面置换日志
    std::cout << "\n页面置换日志:" << std::endl;
    for (const auto& logEntry : pageManager.log) {
        std::cout << logEntry << std::endl;
    }

    // 输出分页调度总结报告
    std::cout << "\n分页调度总结报告:" << std::endl;
    std::cout << "页面命中次数: " << pageManager.pageHits << std::endl;
    std::cout << "页面置换次数 (页面错误): " << pageManager.pageFaults << std::endl;
    if (pageManager.pageHits + pageManager.pageFaults > 0) {
        double hitRate = (static_cast<double>(pageManager.pageHits) / (pageManager.pageHits + pageManager.pageFaults)) * 100.0;
        std::cout << "页面命中率: " << std::fixed << std::setprecision(2) << hitRate << "%" << std::endl;
    }
    else {
        std::cout << "页面命中率: 0.00%" << std::endl;
    }
}
```

### **5. 完整主函数实现**

以下是完整的主函数实现，包括前面提到的**Case 6**部分：

```cpp
int main() {
    // 设置控制台代码页为65001（UTF-8）
#ifdef _WIN32
    system("chcp 65001");

    // 设置控制台字体为支持中文的字体（如Consolas）
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_FONT_INFOEX fontInfo = { 0 };
    fontInfo.cbSize = sizeof(CONSOLE_FONT_INFOEX);
    GetCurrentConsoleFontEx(hOut, FALSE, &fontInfo);
    wcscpy_s(fontInfo.FaceName, L"Consolas"); // 使用Consolas或其他支持英文的字体
    SetCurrentConsoleFontEx(hOut, FALSE, &fontInfo);
#endif

    // 设置区域设置为用户默认
    setlocale(LC_ALL, "");

    // 关闭同步IO，提高性能
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);

    // 加载运行步骤
    std::map<std::string, int> runTimes = loadRunSteps();

    // 加载进程信息
    loadProcesses(runTimes);

    // 加载程序详细信息
    std::map<std::string, std::map<std::string, double>> programs = loadPrograms();

    while (true) {
        std::cout << "\n请选择功能：" << std::endl;
        std::cout << "1. 显示进程信息" << std::endl;
        std::cout << "2. 显示程序详细信息" << std::endl;
        std::cout << "3. 显示程序运行步骤" << std::endl;
        std::cout << "4. 先来先服务调度（FCFS）" << std::endl;
        std::cout << "5. 时间片轮转调度（RR）" << std::endl;
        std::cout << "6. 分页调度" << std::endl;
        std::cout << "7. 模拟CPU占用情况" << std::endl;
        std::cout << "8. 退出程序" << std::endl;
        std::cout << "请输入选项 (1-8): ";
        int mainChoice;
        while (!(std::cin >> mainChoice)) {
            std::cout << "输入无效，请输入一个整数选项 (1-8): ";
            std::cin.clear();
            std::cin.ignore(10000, '\n');
        }

        switch (mainChoice) {
            case 1:
                // 显示进程信息
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息。" << std::endl;
                }
                else {
                    std::cout << "进程信息:" << std::endl;
                    for (const auto& process : processList) {
                        std::cout << "进程: " << process.pName
                                  << ", 创建时间: " << process.createTime
                                  << ", 运行时间: " << process.runTime
                                  << ", 优先级: " << process.grade
                                  << ", 程序备注: " << process.pRemark << std::endl;
                    }
                }
                break;
            case 2:
                // 显示程序详细信息
                if (programs.empty()) {
                    std::cout << "未加载任何程序详细信息。" << std::endl;
                }
                else {
                    std::cout << "程序详细信息:" << std::endl;
                    for (const auto& [program, functions] : programs) {
                        std::cout << "程序: " << program << std::endl;
                        for (const auto& [func, size] : functions) {
                            std::cout << "  功能: " << func << ", 大小: " << size << " KB" << std::endl;
                        }
                    }
                }
                break;
            case 3:
                // 显示程序运行步骤
                if (runTimes.empty()) {
                    std::cout << "未加载任何程序运行步骤。" << std::endl;
                }
                else {
                    std::cout << "程序运行步骤:" << std::endl;
                    for (const auto& [program, time] : runTimes) {
                        std::cout << "程序: " << program << ", 运行时间: " << time << "ms" << std::endl;
                    }
                }
                break;
            case 4:
                // 先来先服务调度
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息，无法执行FCFS调度。" << std::endl;
                }
                else {
                    fcfsScheduling();
                    std::cout << "先来先服务调度（FCFS）完成。结果已保存到 result.txt" << std::endl;
                }
                break;
            case 5:
                // 时间片轮转调度
                if (processList.empty()) {
                    std::cout << "未加载任何进程信息，无法执行RR调度。" << std::endl;
                }
                else {
                    rrScheduling();
                    std::cout << "时间片轮转调度（RR）完成。结果已保存到 result.txt" << std::endl;
                }
                break;
            case 6:
                // 分页调度功能
                std::cout << "请选择操作：" << std::endl;
                std::cout << "1. 设置页面大小和时间片长度" << std::endl;
                std::cout << "2. 执行分页调度" << std::endl;
                std::cout << "请输入选项 (1 或 2): ";
                int option;
                while (!(std::cin >> option) || (option != 1 && option != 2)) {
                    std::cout << "输入无效，请输入1或2: ";
                    std::cin.clear();
                    std::cin.ignore(10000, '\n');
                }

                if (option == 1) {
                    // 设置新的页面大小
                    std::cout << "请输入新的页面大小 (单位: KB): ";
                    while (!(std::cin >> pageSize) || pageSize <= 0.0) {
                        std::cout << "输入无效，页面大小必须为正数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    // 设置新的时间片长度
                    std::cout << "请输入新的时间片长度 (单位: ms): ";
                    while (!(std::cin >> timeSlice) || timeSlice <= 0) {
                        std::cout << "输入无效，时间片长度必须为正整数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    std::cout << "页面大小已设置为: " << pageSize << " KB | 时间片长度已设置为: " << timeSlice << " ms" << std::endl;
                }
                else if (option == 2) {
                    // 执行分页调度
                    if (programs.empty()) {
                        std::cout << "未加载任何程序信息，无法执行分页调度。" << std::endl;
                    }
                    else {
                        pageScheduling(programs);
                    }
                }
                break;
            case 7:
                // 模拟CPU占用情况
                if (runTimes.empty()) {
                    std::cout << "未加载任何运行步骤，无法模拟CPU占用情况。" << std::endl;
                }
                else {
                    simulateCPU(runTimes);
                }
                break;
            case 8:
                // 退出程序
                std::cout << "正在退出程序..." << std::endl;
                return 0;
            default:
                std::cout << "无效选择，请重新输入！" << std::endl;
        }
    }

    return 0;
}
```

## **三、代码运行流程**

1. **程序启动**：
    
    - 设置控制台编码为UTF-8（Windows环境）。
    - 设置区域设置为用户默认。
    - 关闭同步IO，提高输入输出性能。
    - 加载运行步骤（`run.txt`）、进程信息（`process.txt`）和程序详细信息（`program.txt`）。
2. **用户交互**：
    
    - 程序显示菜单，用户可以选择不同的功能：
        1. **显示进程信息**：显示所有加载的进程及其详细信息。
        2. **显示程序详细信息**：显示所有加载的程序及其包含的函数和大小。
        3. **显示程序运行步骤**：显示所有程序的运行步骤和运行时间。
        4. **先来先服务调度（FCFS）**：执行FCFS调度算法，并将结果保存到`result.txt`。
        5. **时间片轮转调度（RR）**：执行RR调度算法，并将结果保存到`result.txt`。
        6. **分页调度**：
            - **选项1**：设置新的页面大小和时间片长度。
            - **选项2**：执行分页调度，选择FIFO或LRU算法，记录页面置换日志和总结报告。
        7. **模拟CPU占用情况**：模拟CPU的动态占用情况，根据`run.txt`的内容。
        8. **退出程序**：退出程序。
3. **分页调度过程**：
    
    - **计算页面需求**：根据每个程序中所有函数的总大小和页面大小，计算每个程序所需的页面数。
    - **用户输入最大页面数**：用户输入每个进程允许的最大页面数。
    - **用户选择页面替换算法**：用户选择使用FIFO或LRU算法进行页面替换。
    - **页面替换**：
        - **FIFO**：
            - 如果页面已在FIFO队列中，记录命中。
            - 否则，发生页面错误，若FIFO队列已满则移除最早进入的页面，加载新页面。
        - **LRU**：
            - 如果页面已在LRU映射中，更新其最后访问时间，记录命中。
            - 否则，发生页面错误，若LRU映射已满则移除最久未使用的页面，加载新页面。
    - **记录日志**：记录每次页面加载和移除的操作。
    - **输出总结报告**：显示页面命中次数、页面错误次数和页面命中率。

## **四、注意事项和优化建议**

1. **输入验证**：
    
    - 所有用户输入都进行了验证，确保输入的数值类型和范围有效，防止程序因无效输入而崩溃。
2. **页面替换效率**：
    
    - **FIFO**：使用`std::queue<int>`维护页面的进入顺序，查找页面时需要将队列转换为向量（`queueToVector`），可能会影响性能。建议改用`std::list<int>`，可以直接遍历和查找，提高效率。
    - **LRU**：当前实现通过`std::unordered_map<int, int>`记录页面的最后访问时间，并通过遍历找到最久未使用的页面。对于大量页面，效率较低。建议使用`std::list<int>`和`std::unordered_map<int, std::list<int>::iterator>`结合，实现O(1)的页面查找和更新。
3. **日志记录**：
    
    - 页面替换的每一步操作都记录在`log`向量中，便于调试和分析。可以根据需要将日志输出到文件或其他存储介质中。
4. **资源管理**：
    
    - 确保所有文件在使用后正确关闭，避免资源泄漏。
5. **代码模块化**：
    
    - 可以将`PCB`类和`PageManager`类分离到独立的头文件和源文件中，提高代码的可维护性和可扩展性。
6. **多线程和并发**：
    
    - 当前实现为单线程。如果未来需要支持多线程操作，需确保`PageManager`类的线程安全。

## **五、总结**

通过上述实现，您可以在C++程序中实现分页调度功能，允许用户设置页面大小和时间片长度，选择页面替换算法，并查看分页调度的详细日志和总结报告。该实现确保了用户输入的有效性，并提供了清晰的调度过程和结果输出。根据项目需求，您可以进一步优化页面替换算法的效率，增强程序的功能和性能。

如果在集成和运行过程中遇到任何问题，欢迎随时提问！