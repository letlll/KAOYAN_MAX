您的 C++ 程序旨在模拟 **进程调度** 和 **页面置换**，具体实现了 **先来先服务（FCFS）** 和 **页面置换算法（FIFO 和 LRU）**。以下将对代码的逻辑和作用进行详细分析，并根据您的需求进行优化，以确保代码的可运行性、高效性和完整性。

---
## **一、代码逻辑与作用分析**

### **1. 结构体定义**

- **PCB（进程控制块）**：用于描述一个进程的基本信息和状态，包括进程名、到达时间、运行时间、阻塞时间、状态等。

    ```cpp
    struct PCB {
        string pro_name;           // 进程名称
        int start_time;            // 到达时间
        int run_time;              // 运行时间
        int first_time;            // 开始运行时间
        int finish_time;           // 结束时间
        int stop_time;             // 阻塞时间
        int time_length;           // 阻塞时长
        double daiquan_time;      // 带权周转时间
        double zhouzhuan_time;    // 周转时间
        int pro_time;              // 进程运行时间片
        string zt;                 // 状态
        int zs_time;               // 阻塞时刻
        vector<int> visit_list;    // 访问序列
        PCB() :pro_name(), start_time(), run_time(), finish_time(), stop_time(), time_length(), daiquan_time(), zt("等待"), zhouzhuan_time(), pro_time(0), visit_list() {}
    };
    ```

- **RUN**：描述一个进程的执行动作，包括跳转时间、访问地址和进程名。

    ```cpp
    struct RUN {
        int jump_time;       // 执行时间
        double address;      // 访问地址
        string name;         // 进程名
    };
    ```

- **Page**：描述内存中的一个页面。

    ```cpp
    struct Page {
        int page;
    };
    ```

- **Queue**：包装了一个 `std::queue<Page>` 用于管理内存中的页面。

    ```cpp
    struct Queue {
        queue<Page> Q;
    };
    ```


### **2. 全局变量**

- **ready, cpu, stop, que**：用于管理不同状态下的进程队列。
- **ls**：在 LRU 算法中用于跟踪页面使用情况。
- **act**：存储所有进程的执行动作。

### **3. 文件读取函数**

- **readProcess()**：从 `Process.txt` 文件中读取进程的基本信息，并将其存入 `que` 队列。

    ```cpp
    void readProcess()
    {
        ifstream read("Process.txt");
        int num;
        cout << "请输入进程数：\n";
        cin >> num;
        for (int i = 0; i < num; i++) {
            PCB pro = PCB();
            read >> pro.pro_name >> pro.start_time >> pro.run_time >> pro.stop_time >> pro.time_length;
            que.push_back(pro);
        }
    }
    ```

- **readRun()**：从 `run.txt` 文件中读取每个进程的执行动作，并存入 `act` 向量中。

    ```cpp
    void readRun() {
        ifstream read("run.txt");
        while (true) {
            RUN as = RUN();
            read >> as.name >> as.jump_time >> as.address;
            if (as.jump_time == -1 && as.address == -1) {
                break;
            }
            else { act.push_back(as); }
        }
    }
    ```

### **4. 调度算法**

- **FCFS()**：实现先来先服务（FCFS）调度算法，模拟进程的到达、执行、阻塞和完成过程。

    ```cpp
    void FCFS() {
        cout << "请输入页面大小" << endl;
        double page_size;
        cin >> page_size;
        int page;               
        int time = 0;
        while (time != 242) {    // 时间模拟，固定到242ms
            // 进程到达
            for (auto iter = que.begin(); iter < que.end();) {
                if ((*iter).start_time == time) {
                    ready.push_back(*iter);
                    for (int i = 0; i < que.size(); i++) {
                        if ((*iter).pro_name == que[i].pro_name) {
                            que[i].zt = "就绪";
                        }
                    }
                }
                iter++;
            }
    
            // 判断阻塞是否结束
            if (!stop.empty()) {
                for (auto iter = stop.begin(); iter < stop.end();) {
                    if ((*iter).time_length + (*iter).zs_time == time) {
                        for (int i = 0; i < que.size(); i++) {
                            if ((*iter).pro_name == que[i].pro_name) {
                                que[i].zt = "就绪";
                            }
                        }
                        ready.push_back(*iter);
                        iter = stop.erase(iter);
                    }
                    else { iter++; }
                }
            }
    
            // 进程调度
            if (!ready.empty()) {
                auto k = ready.begin();
                if (cpu.empty()) {
                    (*k).first_time = time + 1;
                    cpu.push_back(*k);
                    for (int i = 0; i < que.size(); i++) {
                        if (cpu.front().pro_name == que[i].pro_name) {
                            que[i].zt = "执行";
                        }
                    }
                    ready.erase(k);
                }
            }
    
            // 进程执行
            if (!cpu.empty()) {
                cout << cpu.front().pro_name << endl;
                for (int i = 0; i < que.size(); i++) {
                    if (que[i].zt != "等待") cout << que[i].pro_name << que[i].zt << "	";
                }
                cout << endl << endl;
                cpu.front().pro_time++;
                // 跳转
                for (auto iter = act.begin(); iter < act.end();) {
                    if (cpu.front().pro_name == (*iter).name && cpu.front().pro_time == (*iter).jump_time) {
                        page = floor((*iter).address / page_size);
                        for (int i = 0; i < que.size(); i++) {
                            if (cpu.front().pro_name == que[i].pro_name) {
                                que[i].visit_list.push_back(page);
                            }
                        }
                        break;
                    }
                    iter++;
                }
                // 阻塞
                if (cpu.front().pro_time == cpu.front().stop_time) {
                    cpu.front().zs_time = time + 1;
                    stop.push_back(cpu.front());
                    for (int i = 0; i < que.size(); i++) {
                        if (cpu.front().pro_name == que[i].pro_name) {
                            que[i].zt = "阻塞";
                        }
                    }
                    cpu.erase(cpu.begin());
                }
    
                // 结束
                if (!cpu.empty() && cpu.front().pro_time == cpu.front().run_time) {
                    for (int i = 0; i < que.size(); i++) {
                        if (que[i].pro_name == cpu.front().pro_name) {
                            que[i].zt = "结束";
                            que[i].finish_time = time + 1;
                            que[i].zhouzhuan_time = que[i].finish_time - que[i].start_time;
                            que[i].daiquan_time = que[i].zhouzhuan_time / que[i].run_time;
                        }
                    }
                    cpu.erase(cpu.begin());
                }
            }
            else {
                for (int i = 0; i < que.size(); i++) {
                    if (que[i].zt != "等待") cout << que[i].pro_name << que[i].zt << "	";
                }
                cout << endl << endl;
            }
    
            time++;
        }
    }
    ```

- **FIFO() 和 LRU()**：实现先进先出（FIFO）和最近最少使用（LRU）页面置换算法，用于管理内存中的页面。

    ```cpp
    void FIFO(vector<int> visit, string N) { /* ... */ }
    void LRU(vector<int> visit) { /* ... */ }
    ```

- **printFIFO() 和 printLRU()**：辅助函数，用于打印当前内存中页面的状态。

### **5. 结果输出**

- **WRITE()**：将每个进程的调度结果（如运行时间、开始时间、完成时间、周转时间、带权周转时间）写入 `result.txt` 文件。

    ```cpp
    void WRITE() {
        ofstream write("result.txt", ios::trunc);
        write << "\n到达时间		运行时间		开始时间		完成时间		周转时间		带权周转时间\n";
        for (int i = 0; i < que.size(); i++) {
            write << que[i].start_time << "		" << que[i].run_time << "		" << que[i].first_time << "		" << que[i].finish_time << "		" << que[i].zhouzhuan_time << "		" << que[i].daiquan_time << endl;
        }
    }
    ```


### **6. 主函数**

- **main()**：程序入口，依次调用各个功能函数，实现进程调度和页面置换模拟。

    ```cpp
    int main() {
        setlocale(0, "chs");
        readProcess();
        readRun();
        FCFS();
        for (int i = 0; i < que.size(); i++) {
            FIFO(que[i].visit_list, que[i].pro_name);
            LRU(que[i].visit_list);
        }
        WRITE();
        system("pause");
        return 0;
    }
    ```


## **二、代码优化与补充**

根据您的需求和代码分析，以下是对代码的优化建议和优化后的代码示例。

### **1. 优化建议**

1. **增加时间动态管理**：避免使用固定的时间循环（如 `time != 242`），改为在所有进程完成后结束循环。

2. **实现时间片轮转（Round Robin）调度**：目前代码只实现了 FCFS，需要增加时间片轮转调度算法。

3. **错误处理**：增加文件读取的错误处理，确保文件存在且格式正确。

4. **优化数据结构**：

    - 使用 `std::queue` 或 `std::deque` 代替 `std::vector` 来管理 CPU 和进程队列。
    - 使用 `std::unordered_set` 或 `std::set` 优化页面存在性的判断。
5. **消除全局变量**：将相关变量封装到类或函数中，减少全局变量的使用，提高代码的模块化和可维护性。

6. **改进页面置换算法**：提高 `exist` 和 `have` 函数的效率，避免不必要的复制操作。

7. **完善进程状态管理**：使用枚举类型管理进程状态，增加代码可读性。

8. **增强输出可读性**：改进控制台输出格式，增加时间和状态的清晰显示。

9. **支持动态页面大小、页数和时间片长度设置**：根据需求，实现这些参数的动态设定。

10. **增加图形界面（扩展功能）**：虽然这是扩展功能，但可以考虑使用简单的图形库（如 SDL 或 SFML）来实现。

### **2. 优化后的代码**

以下是优化后的代码示例，包含上述建议的一==部分==实现。为了简洁起见，主要==优化进程管理和调度部分==，==页面置换算法保留基本结构==，具体优化可根据需求进一步扩展。

```cpp
#include <vector>
#include <queue>
#include <fstream>
#include <iostream>
#include <sstream>
#include <cmath>
#include <unordered_set>
#include <iomanip>
using namespace std;

// 枚举类型表示进程状态
enum class ProcessStatus { Waiting, Ready, Running, Blocked, Finished };

// 进程控制块
struct PCB {
    string pro_name;           // 进程名称
    int start_time;            // 到达时间
    int run_time;              // 运行时间
    int first_time;            // 开始运行时间
    int finish_time;           // 结束时间
    int stop_time;             // 阻塞时间
    int time_length;           // 阻塞时长
    double daiquan_time;       // 带权周转时间
    double zhouzhuan_time;     // 周转时间
    int pro_time;              // 进程运行时间片
    ProcessStatus status;      // 状态
    int zs_time;               // 阻塞时刻
    vector<int> visit_list;    // 访问序列

    PCB() : pro_name(""), start_time(0), run_time(0), finish_time(0),
            stop_time(0), time_length(0), daiquan_time(0.0),
            zhouzhuan_time(0.0), pro_time(0),
            status(ProcessStatus::Waiting), zs_time(0), visit_list() {}
};

// 运行动作
struct RUN {
    int jump_time;       // 执行时间
    double address;      // 访问地址
    string name;         // 进程名
};

// 页面结构
struct Page {
    int page;
};

// 队列结构
struct PageQueue {
    queue<Page> Q;
};

// 全局变量封装到类中
class Scheduler {
private:
    vector<PCB> que;          // 所有进程
    vector<RUN> act;          // 所有运行动作
    vector<PCB> ready;        // 就绪队列
    PCB* cpu;                 // 当前执行的进程
    vector<PCB> stop;         // 阻塞队列

    // 页面置换相关
    int page_size;
    int time_slice;
    int allocated_pages;
public:
    Scheduler() : cpu(nullptr), page_size(1), time_slice(1), allocated_pages(2) {}
    void readProcess(const string& filename);
    void readRun(const string& filename);
    void FCFS();
    void RoundRobin();
    void FIFO(const vector<int>& visit, const string& pro_name);
    void LRU(const vector<int>& visit);
    void WRITE(const string& filename);
    void printProcessStates(int current_time);
};

void Scheduler::readProcess(const string& filename) {
    ifstream read(filename);
    if (!read.is_open()) {
        cerr << "Error: Unable to open " << filename << endl;
        exit(1);
    }

    int num;
    cout << "请输入进程数：\n";
    cin >> num;
    if (num <= 0) {
        cerr << "Error: 进程数必须为正数。" << endl;
        exit(1);
    }

    for (int i = 0; i < num; i++) {
        PCB pro;
        if (!(read >> pro.pro_name >> pro.start_time >> pro.run_time >> pro.stop_time >> pro.time_length)) {
            cerr << "Error: " << filename << " 中第 " << i + 1 << " 行格式错误。" << endl;
            exit(1);
        }
        que.push_back(pro);
    }

    read.close();
}

void Scheduler::readRun(const string& filename) {
    ifstream read(filename);
    if (!read.is_open()) {
        cerr << "Error: Unable to open " << filename << endl;
        exit(1);
    }

    while (true) {
        RUN as;
        read >> as.name >> as.jump_time >> as.address;
        if (as.jump_time == -1 && as.address == -1) {
            break;
        }
        act.push_back(as);
    }

    read.close();
}

void Scheduler::printProcessStates(int current_time) {
    cout << "当前时刻：" << current_time << " ms\n";
    cout << "进程状态：\n";
    for (const auto& proc : que) {
        string state;
        switch (proc.status) {
            case ProcessStatus::Waiting: state = "等待"; break;
            case ProcessStatus::Ready: state = "就绪"; break;
            case ProcessStatus::Running: state = "执行"; break;
            case ProcessStatus::Blocked: state = "阻塞"; break;
            case ProcessStatus::Finished: state = "结束"; break;
        }
        cout << "进程 " << proc.pro_name << ": " << state << "\n";
    }
    if (cpu != nullptr) {
        cout << "CPU 正在执行进程: " << cpu->pro_name << "\n";
    }
    cout << "-----------------------------\n";
}

void Scheduler::FCFS() {
    cout << "请输入页面大小 (KB): ";
    cin >> page_size;
    cout << "请输入时间片长度 (ms): ";
    cin >> time_slice;
    cout << "请输入每个进程分配的页数: ";
    cin >> allocated_pages;

    int time = 0;
    while (true) {
        // 检查所有进程是否完成
        bool all_finished = true;
        for (const auto& proc : que) {
            if (proc.status != ProcessStatus::Finished) {
                all_finished = false;
                break;
            }
        }
        if (all_finished) break;

        // 处理进程到达
        for (auto& proc : que) {
            if (proc.start_time == time && proc.status == ProcessStatus::Waiting) {
                proc.status = ProcessStatus::Ready;
                ready.push_back(proc);
            }
        }

        // 处理阻塞进程
        for (auto it = stop.begin(); it != stop.end(); ) {
            if (it->zs_time + it->time_length <= time) {
                it->status = ProcessStatus::Ready;
                ready.push_back(*it);
                it = stop.erase(it);
            }
            else {
                ++it;
            }
        }

        // 调度 CPU
        if (cpu == nullptr && !ready.empty()) {
            cpu = &ready.front();
            cpu->status = ProcessStatus::Running;
            if (cpu->first_time == 0) cpu->first_time = time;
            ready.erase(ready.begin());
        }

        // 执行当前进程
        if (cpu != nullptr) {
            cpu->pro_time++;
            // 检查是否有跳转或 I/O 操作
            for (const auto& action : act) {
                if (action.name == cpu->pro_name && action.jump_time == cpu->pro_time) {
                    if (action.address >= 0) { // 跳转操作
                        int page = floor(action.address / page_size);
                        cpu->visit_list.push_back(page);
                        // 这里可以调用页面置换算法
                    }
                    else { // I/O 操作
                        cpu->status = ProcessStatus::Blocked;
                        cpu->zs_time = time;
                        stop.push_back(*cpu);
                        cpu = nullptr;
                        break;
                    }
                }
            }

            // 检查是否阻塞或完成
            if (cpu != nullptr) {
                if (cpu->pro_time == cpu->stop_time) {
                    cpu->status = ProcessStatus::Blocked;
                    cpu->zs_time = time;
                    stop.push_back(*cpu);
                    cpu = nullptr;
                }
                else if (cpu->pro_time == cpu->run_time) {
                    cpu->status = ProcessStatus::Finished;
                    cpu->finish_time = time;
                    cpu->zhouzhuan_time = cpu->finish_time - cpu->start_time;
                    cpu->daiquan_time = (double)cpu->zhouzhuan_time / cpu->run_time;
                    cpu = nullptr;
                }
            }
        }

        // 输出当前状态
        printProcessStates(time);

        // 时间推进
        time++;
    }
}

void Scheduler::RoundRobin() {
    // 类似 FCFS，但使用时间片轮转调度
    // 实现略，参考 FCFS 基本结构
}

void Scheduler::FIFO(const vector<int>& visit, const string& pro_name) {
    // FIFO 页面置换算法实现
    queue<int> Q;
    unordered_set<int> pages_in_memory;
    int count = 0;
    cout << pro_name << " FIFO 页面置换过程:\n";
    cout << "访问序列: ";
    for (const auto& page : visit) cout << page << " ";
    cout << "\n淘汰页面\t当前内存页面\n";

    for (const auto& page : visit) {
        if (pages_in_memory.find(page) == pages_in_memory.end()) { // 缺页
            count++;
            if (Q.size() < allocated_pages) {
                Q.push(page);
                pages_in_memory.insert(page);
            }
            else {
                int evict = Q.front();
                Q.pop();
                pages_in_memory.erase(evict);
                cout << evict << "\t\t";
                Q.push(page);
                pages_in_memory.insert(page);
            }
            // 打印当前内存页面
            queue<int> temp = Q;
            while (!temp.empty()) {
                cout << temp.front() << " ";
                temp.pop();
            }
            cout << "\n";
        }
    }
    cout << "缺页次数: " << count << "，缺页率: " << fixed << setprecision(2)
         << ((double)count / visit.size()) * 100 << "%\n\n";
}

void Scheduler::LRU(const vector<int>& visit) {
    // LRU 页面置换算法实现
    unordered_set<int> pages_in_memory;
    unordered_map<int, int> last_used;
    int count = 0;
    cout << "LRU 页面置换过程:\n";
    cout << "访问序列: ";
    for (const auto& page : visit) cout << page << " ";
    cout << "\n淘汰页面\t当前内存页面\n";

    for (int i = 0; i < visit.size(); ++i) {
        int page = visit[i];
        if (pages_in_memory.find(page) == pages_in_memory.end()) { // 缺页
            count++;
            if (pages_in_memory.size() < allocated_pages) {
                pages_in_memory.insert(page);
                last_used[page] = i;
            }
            else {
                // 找到最久未使用的页面
                int lru_page = -1, lru_time = INT32_MAX;
                for (const auto& p : pages_in_memory) {
                    if (last_used[p] < lru_time) {
                        lru_time = last_used[p];
                        lru_page = p;
                    }
                }
                pages_in_memory.erase(lru_page);
                cout << lru_page << "\t\t";
                pages_in_memory.insert(page);
                last_used[page] = i;
            }
            // 打印当前内存页面
            for (const auto& p : pages_in_memory) {
                cout << p << " ";
            }
            cout << "\n";
        }
        else {
            last_used[page] = i;
        }
    }
    cout << "缺页次数: " << count << "，缺页率: " << fixed << setprecision(2)
         << ((double)count / visit.size()) * 100 << "%\n\n";
}

void Scheduler::WRITE(const string& filename) {
    ofstream write(filename, ios::trunc);
    if (!write.is_open()) {
        cerr << "Error: Unable to open " << filename << " for writing." << endl;
        return;
    }
    write << "进程名\t到达时间\t运行时间\t开始时间\t完成时间\t周转时间\t带权周转时间\n";
    for (const auto& proc : que) {
        write << proc.pro_name << "\t"
              << proc.start_time << "\t\t"
              << proc.run_time << "\t\t"
              << proc.first_time << "\t\t"
              << proc.finish_time << "\t\t"
              << proc.zhouzhuan_time << "\t\t"
              << fixed << setprecision(2) << proc.daiquan_time << "\n";
    }
    write.close();
}

int main() {
    Scheduler scheduler;
    setlocale(LC_ALL, "chs");

    // 读取进程信息和运行动作
    scheduler.readProcess("Process.txt");
    scheduler.readRun("run.txt");

    // 选择调度算法
    int choice;
    cout << "请选择调度算法:\n1. 先来先服务 (FCFS)\n2. 时间片轮转 (Round Robin)\n请输入选择 (1 或 2): ";
    cin >> choice;

    if (choice == 1) {
        scheduler.FCFS();
    }
    else if (choice == 2) {
        scheduler.RoundRobin();
    }
    else {
        cerr << "无效的选择。" << endl;
        return 1;
    }

    // 页面置换算法
    cout << "页面置换算法结果:\n";
    for (const auto& proc : scheduler.que) {
        scheduler.FIFO(proc.visit_list, proc.pro_name);
        scheduler.LRU(proc.visit_list);
    }

    // 写入结果
    scheduler.WRITE("result.txt");

    cout << "调度完成，结果已写入 result.txt\n";
    system("pause");
    return 0;
}
```

### **3. 主要优化点说明**

1. **封装调度逻辑**：将全局变量封装到 `Scheduler` 类中，增强代码的模块化和可维护性。

2. **动态时间管理**：循环条件改为检查所有进程是否完成，避免使用固定时间步长。

3. **进程状态管理**：使用枚举类型 `ProcessStatus` 来表示进程的不同状态，提高代码的可读性和安全性。

4. **错误处理**：在文件读取和写入部分增加了错误处理，确保文件操作的可靠性。

5. **页面置换算法优化**：

    - **FIFO**：使用 `queue` 和 `unordered_set` 来高效管理内存中的页面，并统计缺页次数和缺页率。
    - **LRU**：使用 `unordered_map` 记录每个页面的最后使用时间，快速找到最久未使用的页面。
6. **用户交互增强**：增加了调度算法的选择，让用户可以选择 FCFS 或 Round Robin。

7. **结果输出格式化**：使用 `iomanip` 库中的 `setprecision` 和 `fixed` 来格式化输出结果，提高可读性。

8. **时间片轮转算法框架**：虽然 `RoundRobin()` 函数的具体实现略，但已经为其预留了框架，可根据需求进一步实现。

### **4. 进一步优化建议**

1. **实现时间片轮转算法（Round Robin）**：

    ```cpp
    void Scheduler::RoundRobin() {
        // 类似 FCFS，但使用队列管理就绪进程，按时间片轮转
        cout << "Round Robin 调度算法执行中...\n";
        queue<PCB*> ready_queue;
        int time = 0;
        int completed = 0;
        int total_process = que.size();
    
        while (completed < total_process) {
            // 添加到达的进程到就绪队列
            for (auto& proc : que) {
                if (proc.start_time == time && proc.status == ProcessStatus::Waiting) {
                    proc.status = ProcessStatus::Ready;
                    ready_queue.push(&proc);
                }
            }
    
            // 处理阻塞队列
            for (auto it = stop.begin(); it != stop.end(); ) {
                if (it->zs_time + it->time_length <= time) {
                    it->status = ProcessStatus::Ready;
                    ready_queue.push(&(*it));
                    it = stop.erase(it);
                }
                else {
                    ++it;
                }
            }
    
            // 调度 CPU
            if (cpu == nullptr && !ready_queue.empty()) {
                cpu = ready_queue.front();
                ready_queue.pop();
                cpu->status = ProcessStatus::Running;
                if (cpu->first_time == 0) cpu->first_time = time;
            }
    
            // 执行当前进程
            if (cpu != nullptr) {
                cpu->pro_time++;
                // 检查是否有跳转或 I/O 操作
                for (const auto& action : act) {
                    if (action.name == cpu->pro_name && action.jump_time == cpu->pro_time) {
                        if (action.address >= 0) { // 跳转操作
                            int page = floor(action.address / page_size);
                            cpu->visit_list.push_back(page);
                            // 这里可以调用页面置换算法
                        }
                        else { // I/O 操作
                            cpu->status = ProcessStatus::Blocked;
                            cpu->zs_time = time;
                            stop.push_back(*cpu);
                            cpu = nullptr;
                            break;
                        }
                    }
                }
    
                // 检查是否完成一个时间片或完成运行
                if (cpu != nullptr) {
                    if (cpu->pro_time % time_slice == 0 && cpu->pro_time < cpu->run_time) {
                        cpu->status = ProcessStatus::Ready;
                        ready_queue.push(cpu);
                        cpu = nullptr;
                    }
                    else if (cpu->pro_time == cpu->run_time) {
                        cpu->status = ProcessStatus::Finished;
                        cpu->finish_time = time;
                        cpu->zhouzhuan_time = cpu->finish_time - cpu->start_time;
                        cpu->daiquan_time = (double)cpu->zhouzhuan_time / cpu->run_time;
                        cpu = nullptr;
                        completed++;
                    }
                }
            }
    
            // 输出当前状态
            printProcessStates(time);
    
            // 时间推进
            time++;
        }
    }
    ```

2. **动态调整页面大小、页数和时间片长度**：在主函数中通过用户输入或配置文件读取这些参数，以增强系统的灵活性。

3. **实现图形界面**：使用图形库（如 Qt、SDL 或 SFML）为系统添加图形界面，实时显示进程状态和内存页面情况。

4. **多核 CPU 支持**：扩展调度算法以支持多核 CPU，允许多个进程同时执行。

5. **更多页面置换算法**：实现更多的页面置换策略，如最不经常使用（LFU）等，增加系统的功能性和研究价值。


## **三、示例输入文件格式**

为了确保程序的正常运行，请确保输入文件格式正确。以下是输入文件的示例格式：

### **1. Process.txt**

```plaintext
A 0 10 5 3
B 2 8 4 2
C 4 6 3 1
```

|进程名|到达时间|运行时间|阻塞时间|阻塞时长|
|---|---|---|---|---|
|A|0|10|5|3|
|B|2|8|4|2|
|C|4|6|3|1|

### **2. run.txt**

```plaintext
A 5 1021
A 10 2021
A 20 -1
A 30 2031
A 20 4050
A 100 -1
B 3 1500
B 7 2500
B 15 -1
B 20 3500
B 25 -1
C 2 1200
C 4 2200
C 6 -1
```

|程序名|跳转时间|跳转目的地 或 I/O 操作时间|
|---|---|---|
|A|5|1021|
|A|10|2021|
|A|20|-1（I/O 操作）|
|A|30|2031|
|A|20|4050|
|A|100|-1（结束）|
|B|3|1500|
|B|7|2500|
|B|15|-1（I/O 操作）|
|B|20|3500|
|B|25|-1（结束）|
|C|2|1200|
|C|4|2200|
|C|6|-1（结束）|

**说明**：

- 跳转时间为相对于进程开始的时间点（ms）。
- 跳转目的地为访问的内存地址（KB）。
- I/O 操作为 `address` 设置为 `-1`，表示进程进入阻塞状态。
- `-1` 的 `jump_time` 表示进程结束。

## **四、运行示例**

运行程序时，按照提示输入相关参数和选择调度算法。例如：

```plaintext
请输入进程数：
3
请选择调度算法:
1. 先来先服务 (FCFS)
2. 时间片轮转 (Round Robin)
请输入选择 (1 或 2): 1
请输入页面大小 (KB): 4
请输入时间片长度 (ms): 5
请输入每个进程分配的页数: 2
```

程序将模拟进程的调度和页面置换过程，并将结果输出到控制台和 `result.txt` 文件中。

## **五、结论**

通过上述优化，代码不仅提高了可读性和可维护性，还增强了其功能性，满足了您提出的需求。您可以根据实际需要进一步扩展功能，如实现图形界面和动态内存显示等。确保在测试过程中使用正确格式的输入文件，以验证程序的正确性和稳定性。如果在实现过程中遇到具体问题，欢迎随时咨询！