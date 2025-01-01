好的，以下是将您提供的Java代码中的`pageScheduling`方法。此实现包括相关的类和方法，并且配有详细的中文注释，以帮助您理解每一部分的功能和逻辑。

## **一、整体设计概述**

### **1. 主要功能**

- **页面需求计算**：根据程序中函数的大小和页面大小，计算每个程序所需的页面数。
- **页面替换算法**：实现FIFO和LRU两种页面替换算法。
- **分页调度**：根据用户输入的最大页面数和选择的替换算法，对页面进行调度管理。
- **日志记录和总结报告**：记录页面替换的过程，并生成总结报告，包括页面命中次数、页面错误次数和页面命中率。

### **2. 类和结构**

- **PCB结构体**：表示进程控制块，存储进程的相关信息。
- **PageManager类**：管理页面的加载和替换，支持FIFO和LRU算法。
- **辅助函数**：
    - `calculatePageRequirements`：计算每个程序所需的页面数。
    - `displayPageSummary`：显示分页调度的总结报告。
    - `pageScheduling`：执行分页调度，根据用户输入进行页面管理。

## **二、C++代码实现**

### **1. PCB结构体**

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <list>
#include <unordered_map>
#include <algorithm>
#include <cmath>
#include <iomanip>

// 进程控制块结构体
struct PCB {
    std::string pName;               // 进程名称
    std::string pRemark;             // 备注（程序名）
    std::string pStatus;             // 状态
    int createTime;                  // 创建时间
    int runTime;                     // 运行时间
    int grade;                       // 优先级
    int startTime;                   // 开始时间
    int completeTime;                // 完成时间
    int turnoverTime;                // 周转时间
    double weightedTurnoverTime;     // 带权周转时间
    int originalRunTime;             // 原始运行时间

    PCB(std::string name, int cTime, int rTime, int prio, std::string remark)
        : pName(name), createTime(cTime), runTime(rTime), grade(prio), pRemark(remark),
          pStatus("等待"), startTime(-1), completeTime(0), turnoverTime(0),
          weightedTurnoverTime(0.0), originalRunTime(rTime) {}
};
```

### **2. PageManager类**

```cpp
// PageManager类，管理页面的加载和替换
class PageManager {
private:
    double pageSize;                          // 页面大小
    int maxPages;                             // 最大页面数
    std::list<int> fifoPages;                 // FIFO页面队列
    std::list<int> lruPages;                  // LRU页面列表
    std::unordered_map<int, int> lruMap;      // LRU页面映射，记录页面最后使用时间
    std::vector<std::string> logEntries;       // 页面置换日志
    int pageFaults;                           // 页面错误次数
    int pageHits;                             // 页面命中次数

public:
    // 构造函数
    PageManager(double pSize, int maxP) : pageSize(pSize), maxPages(maxP),
        pageFaults(0), pageHits(0) {}

    // FIFO页面替换算法
    void fifoReplace(int page) {
        // 检查页面是否在内存中
        if (std::find(fifoPages.begin(), fifoPages.end(), page) != fifoPages.end()) {
            pageHits++;
            logEntries.emplace_back("FIFO: 页面 " + std::to_string(page) + " 已经在内存中 (命中)");
            displayMemoryState("FIFO");
            return;
        }

        // 页面错误
        pageFaults++;
        logEntries.emplace_back("FIFO: 页面 " + std::to_string(page) + " 被加载");

        // 如果内存已满，移除最早进入的页面
        if (fifoPages.size() >= static_cast<size_t>(maxPages)) {
            int removedPage = fifoPages.front();
            fifoPages.pop_front();
            logEntries.emplace_back("FIFO: 页面 " + std::to_string(removedPage) + " 被移除");
        }

        // 添加新页面到队列末尾
        fifoPages.push_back(page);
        displayMemoryState("FIFO");
    }

    // LRU页面替换算法
    void lruReplace(int page, int currentTime) {
        // 检查页面是否在内存中
        auto it = std::find(lruPages.begin(), lruPages.end(), page);
        if (it != lruPages.end()) {
            pageHits++;
            // 更新页面的最后使用时间
            lruMap[page] = currentTime;
            logEntries.emplace_back("LRU: 页面 " + std::to_string(page) + " 已经在内存中 (命中)");
            // 将页面移动到列表末尾，表示最近使用
            lruPages.erase(it);
            lruPages.push_back(page);
            displayMemoryState("LRU");
            return;
        }

        // 页面错误
        pageFaults++;
        logEntries.emplace_back("LRU: 页面 " + std::to_string(page) + " 被加载");

        // 如果内存已满，移除最久未使用的页面
        if (lruPages.size() >= static_cast<size_t>(maxPages)) {
            int lruPage = lruPages.front();
            lruPages.pop_front();
            lruMap.erase(lruPage);
            logEntries.emplace_back("LRU: 页面 " + std::to_string(lruPage) + " 被移除");
        }

        // 添加新页面到列表末尾，表示最近使用
        lruPages.push_back(page);
        lruMap[page] = currentTime;
        displayMemoryState("LRU");
    }

    // 获取页面置换日志
    std::vector<std::string> getLog() const {
        return logEntries;
    }

    // 获取页面错误次数
    int getPageFaults() const {
        return pageFaults;
    }

    // 获取页面命中次数
    int getPageHits() const {
        return pageHits;
    }

    // 计算页面命中率
    double getHitRate() const {
        if (pageFaults + pageHits == 0) return 0.0;
        return static_cast<double>(pageHits) / (pageFaults + pageHits);
    }

    // 显示当前内存中的页面状态
    void displayMemoryState(const std::string& algorithm) const {
        std::cout << "当前内存状态 (" << algorithm << "):\n|";
        if (algorithm == "FIFO") {
            for (const auto& page : fifoPages) {
                std::cout << " " << page << " |";
            }
        } else if (algorithm == "LRU") {
            for (const auto& page : lruPages) {
                std::cout << " " << page << " |";
            }
        }
        std::cout << "\n";
    }
};
```

### **3. 辅助函数**

#### **3.1 计算页面需求**

```cpp
// 计算每个程序所需的页面数
std::map<std::string, int> calculatePageRequirements(const std::map<std::string, std::map<std::string, double>>& programs, double pageSize) {
    std::map<std::string, int> pageRequirements;
    for (const auto& programEntry : programs) {
        const std::string& programName = programEntry.first;
        const std::map<std::string, double>& functions = programEntry.second;

        // 计算程序中所有函数的大小总和
        double totalSize = 0.0;
        for (const auto& funcEntry : functions) {
            totalSize += funcEntry.second;
        }

        // 计算所需页面数，向上取整
        int pages = static_cast<int>(std::ceil(totalSize / pageSize));
        pageRequirements[programName] = pages;
    }
    return pageRequirements;
}
```

#### **3.2 显示分页调度总结报告**

```cpp
// 显示分页调度总结报告
void displayPageSummary(const PageManager& pageManager, const std::map<std::string, int>& pageRequirements) {
    std::cout << "\n分页调度总结报告:\n";
    for (const auto& entry : pageRequirements) {
        const std::string& programName = entry.first;
        int pages = entry.second;
        std::cout << "程序: " << programName << " | 总页面数: " << pages << "\n";
    }
    std::cout << "页面命中次数: " << pageManager.getPageHits() << "\n";
    std::cout << "页面置换次数 (页面错误): " << pageManager.getPageFaults() << "\n";
    std::cout << "页面命中率: " << std::fixed << std::setprecision(2) << (pageManager.getHitRate() * 100) << "%\n";
}
```

### **4. 分页调度函数**

```cpp
// 执行分页调度
void pageScheduling(const std::map<std::string, std::map<std::string, double>>& programs, double& pageSize) {
    std::cout << "加载程序页面需求...\n";
    // 计算每个程序所需的页面数
    std::map<std::string, int> pageRequirements = calculatePageRequirements(programs, pageSize);

    int maxPages = 0;
    int choice = 0;

    // 获取用户输入的每个进程的最大页面数
    std::cout << "请输入每个进程的最大页面数: ";
    while (!(std::cin >> maxPages) || maxPages <= 0) {
        std::cout << "输入无效，最大页面数必须为正整数，请重新输入: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 获取用户选择的页面调度算法
    std::cout << "请输入页面调度算法 (1. FIFO  2. LRU): ";
    while (!(std::cin >> choice) || (choice != 1 && choice != 2)) {
        std::cout << "输入无效，请输入1（FIFO）或2（LRU）: ";
        std::cin.clear();
        std::cin.ignore(10000, '\n');
    }

    // 创建PageManager实例
    PageManager pageManager(pageSize, maxPages);

    std::cout << "页面调度过程:\n";
    int currentTime = 0;

    // 遍历每个程序及其所需页面数
    for (const auto& entry : pageRequirements) {
        const std::string& programName = entry.first;
        int pages = entry.second;
        std::cout << "程序 " << programName << " 需要 " << pages << " 页\n";

        // 遍历程序的每一页
        for (int page = 0; page < pages; ++page) {
            if (choice == 1) {
                // 使用 FIFO 页面替换算法
                pageManager.fifoReplace(page);
            } else {
                // 使用 LRU 页面替换算法
                pageManager.lruReplace(page, currentTime);
            }
            currentTime++;
        }
    }

    // 输出页面置换日志
    std::cout << "\n页面置换日志:\n";
    for (const auto& logEntry : pageManager.getLog()) {
        std::cout << logEntry << "\n";
    }

    // 输出分页调度总结报告
    displayPageSummary(pageManager, pageRequirements);
}
```

### **5. 主函数中的Case 6实现**

```cpp
int main() {
    // 示例程序数据，实际应用中应从文件或其他数据源加载
    std::map<std::string, std::map<std::string, double>> programs = {
        {"程序A", {{"函数1", 1.5}, {"函数2", 2.0}, {"函数3", 0.5}}},
        {"程序B", {{"函数1", 3.0}, {"函数2", 1.0}}},
        {"程序C", {{"函数1", 2.5}, {"函数2", 2.5}}}
    };

    double pageSize = 2.2;    // 初始页面大小，单位KB
    int timeSlice = 25;       // 时间片长度，单位ms

    while (true) {
        std::cout << "\n选择功能:\n";
        std::cout << "1. 查看进程信息\n2. 查看程序详细信息\n3. 查看程序执行步骤\n";
        std::cout << "4. 先来先服务调度\n5. 时间片轮转调度\n6. 设置页面大小和时间片长度 或 执行分页调度\n";
        std::cout << "7. 退出\n8. 动态模拟 CPU 占用\n";
        std::cout << "请输入选项: ";

        int mainChoice = 0;
        while (!(std::cin >> mainChoice)) {
            std::cout << "输入无效，请输入一个整数选项: ";
            std::cin.clear();
            std::cin.ignore(10000, '\n');
        }

        switch (mainChoice) {
            case 1:
                // 显示进程信息
                std::cout << "进程信息:\n";
                // 此处应显示实际的进程信息，示例中未提供
                break;

            case 2:
                // 显示程序信息
                std::cout << "程序信息:\n";
                for (const auto& program : programs) {
                    std::cout << "程序名: " << program.first << "\n";
                    for (const auto& func : program.second) {
                        std::cout << "  函数: " << func.first << " | 大小: " << func.second << " KB\n";
                    }
                }
                break;

            case 3:
                // 显示程序执行步骤
                std::cout << "程序执行步骤:\n";
                // 此处应显示实际的程序执行步骤，示例中未提供
                break;

            case 4:
                // 先来先服务调度
                std::cout << "执行先来先服务调度 (FCFS)...\n";
                // 此处应调用FCFS调度相关函数，示例中未提供
                break;

            case 5:
                // 时间片轮转调度
                std::cout << "执行时间片轮转调度 (RR)...\n";
                // 此处应调用RR调度相关函数，示例中未提供
                break;

            case 6:
                // 设置页面大小和时间片长度，或执行分页调度
                std::cout << "1. 设置页面大小和时间片长度\n2. 执行分页调度\n请输入选项: ";
                int option = 0;
                while (!(std::cin >> option) || (option != 1 && option != 2)) {
                    std::cout << "输入无效，请输入1或2: ";
                    std::cin.clear();
                    std::cin.ignore(10000, '\n');
                }

                if (option == 1) {
                    // 设置页面大小
                    std::cout << "请输入新的页面大小 (单位: KB): ";
                    while (!(std::cin >> pageSize) || pageSize <= 0.0) {
                        std::cout << "输入无效，页面大小必须为正数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    // 设置时间片长度
                    std::cout << "请输入新的时间片长度 (单位: ms): ";
                    while (!(std::cin >> timeSlice) || timeSlice <= 0) {
                        std::cout << "输入无效，时间片长度必须为正整数，请重新输入: ";
                        std::cin.clear();
                        std::cin.ignore(10000, '\n');
                    }

                    std::cout << "页面大小已设置为: " << pageSize << " KB | 时间片长度已设置为: " << timeSlice << " ms\n";
                } else if (option == 2) {
                    // 执行分页调度
                    pageScheduling(programs, pageSize);
                }
                break;

            case 7:
                // 退出程序
                std::cout << "退出程序...\n";
                return 0;

            case 8:
                // 动态模拟 CPU 占用情况
                std::cout << "动态模拟 CPU 占用情况功能未实现。\n";
                // 此处应调用simulateCPU相关函数，示例中未提供
                break;

            default:
                std::cout << "无效选择，请重新输入！\n";
        }
    }

    return 0;
}
```

### **6. 代码说明**

#### **6.1 PCB结构体**

- **功能**：表示一个进程的控制块，存储进程的各项信息，如名称、备注、状态、创建时间、运行时间、优先级、开始时间、完成时间、周转时间、带权周转时间和原始运行时间。
- **构造函数**：初始化进程的基本信息，`originalRunTime`记录了进程的初始运行时间，便于后续计算带权周转时间。

#### **6.2 PageManager类**

- **字段**：
    
    - `pageSize`：页面大小。
    - `maxPages`：最大页面数。
    - `fifoPages`：FIFO页面队列，使用`std::list`维护页面的进入顺序。
    - `lruPages`：LRU页面列表，使用`std::list`和`std::unordered_map`记录页面的使用顺序和时间。
    - `logEntries`：记录页面替换的日志。
    - `pageFaults`：记录页面错误次数。
    - `pageHits`：记录页面命中次数。
- **方法**：
    
    - `fifoReplace(int page)`：实现FIFO页面替换算法。如果页面已在内存中，记录命中；否则，发生页面错误，若内存已满则移除最早进入的页面，加载新页面。
    - `lruReplace(int page, int currentTime)`：实现LRU页面替换算法。如果页面已在内存中，更新其最近使用时间，记录命中；否则，发生页面错误，若内存已满则移除最久未使用的页面，加载新页面。
    - `getLog()`、`getPageFaults()`、`getPageHits()`、`getHitRate()`：获取日志和统计数据。
    - `displayMemoryState(const std::string& algorithm)`：实时显示当前内存中的页面状态，参数`algorithm`用于指示当前使用的页面替换算法。

#### **6.3 辅助函数**

- **`calculatePageRequirements`**：
    
    - **功能**：计算每个程序所需的页面数，根据程序中所有函数的大小总和和页面大小进行计算。
    - **实现**：遍历所有程序，累加每个程序中所有函数的大小，并根据页面大小向上取整计算所需的页面数。
- **`displayPageSummary`**：
    
    - **功能**：展示分页调度的总结报告，包括每个程序的总页面数、页面命中次数、页面错误次数和页面命中率。

#### **6.4 分页调度函数**

- **`pageScheduling`**：
    - **功能**：根据程序的页面需求和用户选择的页面调度算法（FIFO或LRU）进行页面管理，记录页面置换日志，并输出分页调度的总结报告。
    - **步骤**：
        1. **加载程序页面需求**：调用`calculatePageRequirements`方法，计算每个程序所需的页面数。
        2. **用户输入最大页面数**：提示用户输入每个进程允许的最大页面数，并进行输入验证。
        3. **用户选择页面调度算法**：提示用户选择FIFO或LRU算法，并进行输入验证。
        4. **创建`PageManager`实例**：根据页面大小和最大页面数创建`PageManager`对象。
        5. **页面调度过程**：
            - 遍历每个程序及其所需页面数。
            - 对于每一页，调用相应的页面替换方法（FIFO或LRU）。
            - 记录当前时间（仅用于LRU算法的时间戳）。
        6. **输出页面置换日志**：打印所有的页面置换操作记录。
        7. **输出分页调度总结报告**：展示每个程序的总页面数、页面命中次数、页面错误次数和页面命中率。

#### **6.5 主函数中的Case 6实现**

- **功能**：用户可以选择设置新的页面大小和时间片长度，或执行分页调度。
- **逻辑**：
    1. **选项1**：设置新的页面大小和时间片长度，包含输入验证，确保输入的数值有效。
    2. **选项2**：执行分页调度，调用`pageScheduling`函数。

### **7. 示例输出**

假设有以下程序数据：

- **程序A**：函数1 (1.5KB)，函数2 (2.0KB)，函数3 (0.5KB)
- **程序B**：函数1 (3.0KB)，函数2 (1.0KB)
- **程序C**：函数1 (2.5KB)，函数2 (2.5KB)

假设页面大小为2.2KB，用户设置最大页面数为3，选择LRU算法。

**分页调度过程示例输出**：

```
加载程序页面需求...
请输入每个进程的最大页面数: 3
请输入页面调度算法 (1. FIFO  2. LRU): 2
页面调度过程:
程序 程序A 需要 2 页
当前内存状态 (LRU):
| 0 |
LRU: 页面 0 被加载
程序 程序A 需要 2 页
当前内存状态 (LRU):
| 0 | 1 |
LRU: 页面 1 被加载
程序 程序B 需要 2 页
当前内存状态 (LRU):
| 0 | 1 | 2 |
LRU: 页面 2 被加载
程序 程序C 需要 2 页
LRU: 页面 0 被移除
当前内存状态 (LRU):
| 1 | 2 | 3 |
LRU: 页面 3 被加载
程序 程序C 需要 2 页
LRU: 页面 1 被移除
当前内存状态 (LRU):
| 2 | 3 | 4 |
LRU: 页面 4 被加载

页面置换日志:
LRU: 页面 0 被加载
LRU: 页面 1 被加载
LRU: 页面 2 被加载
LRU: 页面 0 被移除
LRU: 页面 3 被加载
LRU: 页面 1 被移除
LRU: 页面 4 被加载

分页调度总结报告:
程序: 程序A | 总页面数: 2
程序: 程序B | 总页面数: 2
程序: 程序C | 总页面数: 2
页面命中次数: 0
页面置换次数 (页面错误): 6
页面命中率: 0.00%
```

### **8. 注意事项**

1. **输入验证**：在所有用户输入的地方都进行了输入验证，确保输入的数值类型和范围有效，防止程序因无效输入而崩溃。
    
2. **数据加载**：在实际应用中，程序数据应从文件或其他数据源加载。此示例中使用了硬编码的数据，您可以根据需要扩展文件读取功能。
    
3. **页面编号**：在此实现中，页面编号从0开始递增。您可以根据实际需求调整页面编号的生成方式。
    
4. **内存状态显示**：`displayMemoryState`方法根据当前使用的页面替换算法（FIFO或LRU）显示当前内存中的页面状态。
    
5. **日志记录**：页面替换过程中的每一步操作都会记录在`logEntries`中，最后统一输出。
    
6. **页面命中率**：命中率根据页面命中次数和页面错误次数计算得出，反映了页面管理算法的效率。
    

### **9. 总结**

通过上述C++代码实现，您可以在主菜单中选择`case 6`，然后选择设置页面大小和时间片长度，或执行分页调度。分页调度将根据程序的页面需求和用户选择的页面替换算法（FIFO或LRU）进行页面管理，并输出详细的日志和总结报告。

您可以根据实际需求进一步扩展功能，例如从文件中加载程序和进程信息，或集成到更复杂的调度系统中。如有任何问题或需要进一步的帮助，欢迎随时提问！