Here’s the equivalent **C++ implementation** for the problem you solved in Java. The program will handle process scheduling (FCFS, RR), page management (FIFO, LRU), file handling for inputs (`process.txt`, `program.txt`, `run.txt`), and dynamic CPU simulation.

---

### **Directory Structure**

```
project/
|-- main.cpp
|-- process.txt       # Input: Process details
|-- program.txt       # Input: Program details and function sizes
|-- run.txt           # Input: Execution steps for simulation
|-- result.txt        # Output: Scheduling results
```

---

### **C++ Implementation**

Here’s the complete `main.cpp` file:

```cpp
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

using namespace std;

// PCB class: Process Control Block
class PCB {
public:
    string pName;         // Process name
    string pRemark;       // Program name (used for reference)
    string pStatus;       // Process status
    int createTime;       // Creation time
    int runTime;          // Run time
    int grade;            // Priority
    int startTime;        // Start time
    int completeTime;     // Completion time
    int turnoverTime;     // Turnover time
    double weightedTurnoverTime; // Weighted turnover time
    int originalRunTime;  // Original runtime

    PCB(string name, int create, int runtime, int priority, string remark)
        : pName(name), createTime(create), runTime(runtime), grade(priority), 
          pRemark(remark), pStatus("Waiting"), startTime(-1), completeTime(0),
          turnoverTime(0), weightedTurnoverTime(0.0), originalRunTime(runtime) {}
};

// PageManager class: Handles FIFO and LRU page replacement
class PageManager {
public:
    double pageSize;
    int maxPages;
    queue<int> fifoPages;                     // FIFO queue
    unordered_map<int, int> lruPages;        // LRU map with page and last access time
    vector<string> log;                      // Log of page operations
    int pageFaults = 0;
    int pageHits = 0;

    PageManager(double size, int max) : pageSize(size), maxPages(max) {}

    // FIFO Replacement
    void fifoReplace(int page) {
        if (find(queueToVector(fifoPages).begin(), queueToVector(fifoPages).end(), page) != queueToVector(fifoPages).end()) {
            pageHits++;
            log.push_back("FIFO: Page " + to_string(page) + " already in memory (hit).");
            return;
        }
        pageFaults++;
        if (fifoPages.size() >= maxPages) {
            int removed = fifoPages.front();
            fifoPages.pop();
            log.push_back("FIFO: Page " + to_string(removed) + " removed.");
        }
        fifoPages.push(page);
        log.push_back("FIFO: Page " + to_string(page) + " added.");
    }

    // LRU Replacement
    void lruReplace(int page, int currentTime) {
        if (lruPages.find(page) != lruPages.end()) {
            pageHits++;
            lruPages[page] = currentTime;
            log.push_back("LRU: Page " + to_string(page) + " already in memory (hit).");
            return;
        }
        pageFaults++;
        if (lruPages.size() >= maxPages) {
            int lruPage = getLRUPage();
            lruPages.erase(lruPage);
            log.push_back("LRU: Page " + to_string(lruPage) + " removed.");
        }
        lruPages[page] = currentTime;
        log.push_back("LRU: Page " + to_string(page) + " added.");
    }

    void printSummary() {
        cout << "Page Faults: " << pageFaults << endl;
        cout << "Page Hits: " << pageHits << endl;
        cout << "Hit Rate: " << fixed << setprecision(2) << ((double)pageHits / (pageHits + pageFaults) * 100) << "%" << endl;
    }

private:
    // Helper to convert queue to vector for FIFO
    vector<int> queueToVector(queue<int> q) {
        vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front());
            q.pop();
        }
        return result;
    }

    // Helper to find the least recently used page
    int getLRUPage() {
        int lruPage = -1;
        int minTime = INT_MAX;
        for (auto &entry : lruPages) {
            if (entry.second < minTime) {
                minTime = entry.second;
                lruPage = entry.first;
            }
        }
        return lruPage;
    }
};

// Global variables
vector<PCB> processList;
double pageSize = 4.0; // Default page size (KB)
int timeSlice = 2;     // Default time slice (ms)

// Function declarations
void loadProcesses(map<string, int> &runTimes);
map<string, int> loadRunSteps();
map<string, map<string, double>> loadPrograms();
void fcfsScheduling();
void rrScheduling();
void simulateCPU(map<string, int> &runTimes);
void pageScheduling(map<string, map<string, double>> &programs);

// Load process information from process.txt
void loadProcesses(map<string, int> &runTimes) {
    ifstream file("process.txt");
    if (!file.is_open()) {
        cerr << "Error: Could not open process.txt" << endl;
        return;
    }
    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        string pName, pRemark;
        int createTime, grade;
        ss >> pName >> createTime >> grade >> pRemark;
        if (runTimes.find(pRemark) != runTimes.end()) {
            processList.emplace_back(pName, createTime, runTimes[pRemark], grade, pRemark);
        }
    }
    file.close();
}

// Load run steps from run.txt
map<string, int> loadRunSteps() {
    ifstream file("run.txt");
    if (!file.is_open()) {
        cerr << "Error: Could not open run.txt" << endl;
        return {};
    }
    map<string, int> runTimes;
    string line, currentProgram;
    while (getline(file, line)) {
        if (line.find("程序名") != string::npos) {
            currentProgram = line.substr(4); // Extract program name
        } else {
            int time;
            stringstream ss(line);
            ss >> time;
            if (runTimes.find(currentProgram) == runTimes.end() || runTimes[currentProgram] < time) {
                runTimes[currentProgram] = time;
            }
        }
    }
    file.close();
    return runTimes;
}

// Load program details from program.txt
map<string, map<string, double>> loadPrograms() {
    ifstream file("program.txt");
    if (!file.is_open()) {
        cerr << "Error: Could not open program.txt" << endl;
        return {};
    }
    map<string, map<string, double>> programs;
    string line, currentProgram;
    while (getline(file, line)) {
        if (line.find("文件名") != string::npos) {
            currentProgram = line.substr(4); // Extract program name
        } else {
            string funcName;
            double size;
            stringstream ss(line);
            ss >> funcName >> size;
            programs[currentProgram][funcName] = size;
        }
    }
    file.close();
    return programs;
}

// FCFS Scheduling
void fcfsScheduling() {
    ofstream resultFile("result.txt");
    if (!resultFile.is_open()) {
        cerr << "Error: Could not open result.txt" << endl;
        return;
    }
    sort(processList.begin(), processList.end(), [](PCB &a, PCB &b) {
        return a.createTime < b.createTime;
    });
    int currentTime = 0;
    for (auto &process : processList) {
        if (currentTime < process.createTime) {
            currentTime = process.createTime;
        }
        process.startTime = currentTime;
        process.completeTime = currentTime + process.runTime;
        process.turnoverTime = process.completeTime - process.createTime;
        process.weightedTurnoverTime = (double)process.turnoverTime / process.runTime;
        currentTime += process.runTime;

        resultFile << "Process: " << process.pName << ", Start: " << process.startTime
                   << ", Complete: " << process.completeTime << ", Turnover: " << process.turnoverTime
                   << ", Weighted Turnover: " << fixed << setprecision(2) << process.weightedTurnoverTime << endl;
    }
    resultFile.close();
}

// RR Scheduling
void rrScheduling() {
    ofstream resultFile("result.txt");
    if (!resultFile.is_open()) {
        cerr << "Error: Could not open result.txt" << endl;
        return;
    }
    queue<PCB *> processQueue;
    int currentTime = 0;
    map<string, int> remainingTime;
    for (auto &process : processList) {
        remainingTime[process.pName] = process.runTime;
    }

    while (!processQueue.empty() || any_of(processList.begin(), processList.end(), [&currentTime](PCB &p) {
        return p.createTime <= currentTime && p.startTime == -1;
    })) {
        for (auto &process : processList) {
            if (process.createTime <= currentTime && process.startTime == -1) {
                processQueue.push(&process);
            }
        }

        if (processQueue.empty()) {
            currentTime++;
            continue;
        }

        PCB *currentProcess = processQueue.front();
        processQueue.pop();
        if (currentProcess->startTime == -1) {
            currentProcess->startTime = currentTime;
        }

        int execTime = min(timeSlice, remainingTime[currentProcess->pName]);
        currentTime += execTime;
        remainingTime[currentProcess->pName] -= execTime;

        if (remainingTime[currentProcess->pName] == 0) {
            currentProcess->completeTime = currentTime;
            currentProcess->turnoverTime = currentProcess->completeTime - currentProcess->createTime;
            currentProcess->weightedTurnoverTime = (double)currentProcess->turnoverTime / currentProcess->runTime;
        } else {
            processQueue.push(currentProcess);
        }

        resultFile << "Process: " << currentProcess->pName << ", Start: " << currentProcess->startTime
                   << ", Complete: " << currentProcess->completeTime << ", Turnover: " << currentProcess->turnoverTime
                   << ", Weighted Turnover: " << fixed << setprecision(2) << currentProcess->weightedTurnoverTime << endl;
    }
    resultFile.close();
}

// Simulate CPU usage
void simulateCPU(map<string, int> &runTimes) {
    cout << "Simulating CPU usage..." << endl;
    this_thread::sleep_for(chrono::milliseconds(1000));
    for (const auto &[program, time] : runTimes) {
        cout << "Program: " << program << ", Execution time: " << time << "ms" << endl;
        this_thread::sleep_for(chrono::milliseconds(100));
    }
    cout << "CPU simulation complete!" << endl;
}

// Page Scheduling
void pageScheduling(map<string, map<string, double>> &programs) {
    map<string, int> pageRequirements;
    for (const auto &[program, functions] : programs) {
        double totalSize = 0;
        for (const auto &[func, size] : functions) {
            totalSize += size;
        }
        pageRequirements[program] = ceil(totalSize / pageSize);
    }

    cout << "Enter max number of pages: ";
    int maxPages;
    cin >> maxPages;

    cout << "Select page replacement algorithm: 1. FIFO 2. LRU" << endl;
    int choice;
    cin >> choice;

    PageManager pageManager(pageSize, maxPages);
    int currentTime = 0;

    for (const auto &[program, pages] : pageRequirements) {
        cout << "Program: " << program << ", Pages required: " << pages << endl;
        for (int i = 1; i <= pages; ++i) {
            if (choice == 1) {
                pageManager.fifoReplace(i);
            } else {
                pageManager.lruReplace(i, currentTime);
            }
            currentTime++;
        }
    }

    cout << "Page Replacement Summary:" << endl;
    pageManager.printSummary();
}

int main() {
    map<string, int> runTimes = loadRunSteps();
    loadProcesses(runTimes);
    map<string, map<string, double>> programs = loadPrograms();

    while (true) {
        cout << "Menu:" << endl;
        cout << "1. Display processes" << endl;
        cout << "2. Display programs" << endl;
        cout << "3. Display run steps" << endl;
        cout << "4. FCFS scheduling" << endl;
        cout << "5. RR scheduling" << endl;
        cout << "6. Page scheduling" << endl;
        cout << "7. Simulate CPU usage" << endl;
        cout << "8. Exit" << endl;
        int choice;
        cin >> choice;

        switch (choice) {
        case 1:
            for (const auto &process : processList) {
                cout << "Process: " << process.pName << ", Creation Time: " << process.createTime
                     << ", Runtime: " << process.runTime << ", Priority: " << process.grade
                     << ", Program: " << process.pRemark << endl;
            }
            break;
        case 2:
            for (const auto &[program, functions] : programs) {
                cout << "Program: " << program << endl;
                for (const auto &[func, size] : functions) {
                    cout << "  Function: " << func << ", Size: " << size << " KB" << endl;
                }
            }
            break;
        case 3:
            for (const auto &[program, time] : runTimes) {
                cout << "Program: " << program << ", Run time: " << time << "ms" << endl;
            }
            break;
        case 4:
            fcfsScheduling();
            cout << "FCFS scheduling complete. Results saved to result.txt" << endl;
            break;
        case 5:
            rrScheduling();
            cout << "RR scheduling complete. Results saved to result.txt" << endl;
            break;
        case 6:
            pageScheduling(programs);
            break;
        case 7:
            simulateCPU(runTimes);
            break;
        case 8:
            cout << "Exiting..." << endl;
            return 0;
        default:
            cout << "Invalid choice. Please try again." << endl;
        }
    }

    return 0;
}
```

---

### **Instructions to Run**

1. **Prepare Input Files**:
    
    - `process.txt`, `program.txt`, and `run.txt` must follow the structure described in your Java program.
2. **Compile and Run**:
    
    ```bash
    g++ -o scheduling main.cpp
    ./scheduling
    ```
    
3. **Output**:
    
    - Results will be saved to `result.txt`.
    - Console logs for simulation and interaction.

---

Let me know if you need further refinements! 🧑‍💻📂

[Click here to access our prompt library!](https://ko-fi.com/s/277d07bae3)