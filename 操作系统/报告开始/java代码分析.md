好的，以下是对您提供的Java程序的详细分析。分析内容包括类和方法的关联性分组、代码逻辑的中文叙述以及伪代码的整合，旨在帮助您更好地理解和维护代码。

---

## **一、整体结构概览**

您的Java程序主要实现了以下功能：

1. **进程管理**：通过PCB类管理进程信息。
2. **调度算法**：
    - **先来先服务（FCFS）**调度算法
    - **时间片轮转（RR）**调度算法
3. **页面管理**：
    - **FIFO**页面替换算法
    - **LRU**页面替换算法
4. **文件操作**：从文件中加载进程、程序和运行步骤信息。
5. **用户交互**：通过控制台菜单提供各种功能选项。
6. **CPU占用模拟**：动态模拟CPU的使用情况。

---

## **二、类和方法的关联性分组**

### **1. PCB类**

**作用**：表示进程控制块（Process Control Block），用于存储进程的各种信息。

**字段**：

- `pName`：进程名称
- `pRemark`：备注（程序名）
- `pStatus`：状态（默认"等待"）
- `createTime`：创建时间
- `runTime`：运行时间
- `grade`：优先级
- `startTime`：开始时间
- `completeTime`：完成时间
- `turnoverTime`：周转时间
- `weightedTurnoverTime`：带权周转时间
- `originalRunTime`：原始运行时间（记录初始运行时间）

**构造方法**：

- 初始化进程的各项属性。

### **2. CPUScheduling类**

**作用**：主类，负责调度算法的实现、文件加载、页面管理以及用户交互。

**内部类**：

- **PageManager**：负责页面替换管理，包括FIFO和LRU算法。

**主要字段**：

- `processList`：存储所有进程的列表
- `pageSize`：页面大小
- `timeSlice`：时间片长度

**主要方法**：

#### **2.1 文件加载方法**

- `loadProcesses(Map<String, Integer> runTimes)`：从`Process.txt`文件加载进程信息，并根据程序名设置运行时间。
- `loadPrograms()`：从`program.txt`文件加载程序及其函数信息。
- `loadRunSteps()`：从`run.txt`文件加载程序的运行步骤，计算每个程序的最大运行时间。

#### **2.2 调度算法**

- `fcfsScheduling()`：实现先来先服务（FCFS）调度算法。
- `rrScheduling()`：实现时间片轮转（RR）调度算法。

#### **2.3 页面管理**

- `pageScheduling(Map<String, Map<String, Double>> programs)`：根据程序的页面需求和选择的页面替换算法进行页面管理。
- `calculatePageRequirements(Map<String, Map<String, Double>> programs, double pageSize)`：计算每个程序所需的页面数。
- `displayPageSummary(PageManager pageManager, Map<String, Integer> pageRequirements)`：展示页面管理的总结报告。

#### **2.4 辅助方法**

- `saveResults(String schedulingType)`：将调度结果保存到`result.txt`文件。
- `clearResultFile()`：清空`result.txt`文件内容。
- `simulateCPU(Map<String, Integer> runTimes)`：动态模拟CPU的占用情况。

#### **2.5 主方法**

- `main(String[] args)`：程序入口，负责加载数据、显示菜单并根据用户选择执行相应功能。

### **3. PageManager内部类**

**作用**：管理页面的加载和替换，支持FIFO和LRU两种页面替换算法。

**字段**：

- `pageSize`：页面大小
- `maxPages`：最大页面数
- `fifoPages`：FIFO页面队列
- `lruPages`：LRU页面映射
- `log`：页面替换日志
- `pageFaults`：页面错误次数
- `pageHits`：页面命中次数

**主要方法**：

- `fifoReplace(int page)`：执行FIFO页面替换。
- `lruReplace(int page, int currentTime)`：执行LRU页面替换。
- `getLog()`：获取页面替换日志。
- `getPageFaults()`：获取页面错误次数。
- `getPageHits()`：获取页面命中次数。
- `getHitRate()`：计算页面命中率。
- `displayMemoryState()`：显示当前内存中的页面状态。

---

## **三、代码逻辑中文叙述与伪代码分析**

### **1. 进程和程序信息的加载**

#### **1.1 加载运行步骤（`loadRunSteps`）**

**逻辑**：

- 读取`run.txt`文件。
- 解析每个程序的关键时间点，记录每个程序的最大时间作为运行时间。

**伪代码**：

```
初始化 runTimes 为空映射
打开 run.txt 文件
读取每一行
    如果行以"程序名"开头：
        设置当前程序名
    否则：
        解析时间点，更新当前程序的最大时间
    保存当前程序的最大时间到 runTimes
返回 runTimes
```

#### **1.2 加载进程信息（`loadProcesses`）**

**逻辑**：

- 读取`Process.txt`文件。
- 解析每行的进程信息，包括进程名、创建时间、优先级、备注（程序名）。
- 根据备注中的程序名，从`runTimes`映射中获取运行时间。
- 创建PCB对象并添加到`processList`。

**伪代码**：

```
打开 Process.txt 文件
读取每一行
    分割行内容为 pName, createTime, grade, pRemark
    标准化程序名
    从 runTimes 获取 runTime
    创建 PCB 对象
    添加 PCB 到 processList
返回
```

#### **1.3 加载程序信息（`loadPrograms`）**

**逻辑**：

- 读取`program.txt`文件。
- 解析每个程序的函数及其大小。
- 将程序名与其函数及大小的映射存储在`programs`映射中。

**伪代码**：

```
初始化 programs 为空映射
打开 program.txt 文件
读取每一行
    如果行以"文件名"开头：
        设置当前程序名
    否则：
        解析函数名和大小
        添加到当前程序的函数映射
    保存程序及其函数映射到 programs
返回 programs
```

### **2. 调度算法实现**

#### **2.1 先来先服务调度（FCFS）**

**逻辑**：

- 按创建时间对`processList`排序。
- 遍历每个进程，计算其开始时间、完成时间、周转时间和带权周转时间。
- 更新当前时间。

**伪代码**：

```
清空 result.txt
按创建时间排序 processList
currentTime = 0
对于每个 process 在 processList 中：
    如果 currentTime < process.createTime：
        currentTime = process.createTime
    process.startTime = currentTime
    process.completeTime = currentTime + process.runTime
    process.turnoverTime = process.completeTime - process.createTime
    process.weightedTurnoverTime = process.turnoverTime / process.runTime
    currentTime += process.runTime
保存结果到 result.txt
```

#### **2.2 时间片轮转调度（RR）**

**逻辑**：

- 按创建时间对`processList`排序。
- 使用队列管理进程，按时间片执行。
- 更新进程的剩余时间、完成时间等信息。
- 记录调度过程。

**伪代码**：

```
清空 result.txt
按创建时间排序 processList
currentTime = 0
index = 0
初始化 remainingTimeMap 为每个 process 的 runTime
初始化队列为 LinkedList

循环直到队列为空且所有进程已入队：
    如果队列为空且有新进程尚未入队：
        currentTime = 下一个进程的 createTime
    
    将所有在 currentTime 之前创建的进程加入队列
    
    如果队列为空：
        currentTime += 1
        继续
    
    从队列中取出第一个 process
    如果 process 未开始运行：
        process.startTime = currentTime
    执行 min(timeSlice, remainingTime)
    currentTime += 执行时间
    更新剩余时间
    如果 process 完成：
        更新完成时间和周转时间
    否则：
        将 process 重新加入队列
    记录调度过程

保存结果到 result.txt
```

### **3. 页面管理**

#### **3.1 页面需求计算（`calculatePageRequirements`）**

**逻辑**：

- 遍历每个程序，计算其总函数大小。
- 根据页面大小计算所需页面数（向上取整）。

**伪代码**：

```
初始化 pageRequirements 为空映射
对于每个 program 在 programs 中：
    计算 totalSize 为所有函数大小之和
    pages = ceil(totalSize / pageSize)
    pageRequirements.put(programName, pages)
返回 pageRequirements
```

#### **3.2 页面调度（`pageScheduling`）**

**逻辑**：

- 计算每个程序的页面需求。
- 用户输入最大页面数和选择页面调度算法（FIFO或LRU）。
- 遍历每个程序的页面，调用相应的页面替换方法。
- 记录和显示页面替换日志和总结报告。

**伪代码**：

```
计算 pageRequirements
提示用户输入 maxPages
提示用户选择页面调度算法（1. FIFO 2. LRU）
初始化 PageManager
currentTime = 0

对于每个 program 在 pageRequirements 中：
    打印程序名和所需页面数
    对每个页面：
        如果选择 FIFO:
            pageManager.fifoReplace(page)
        否则:
            pageManager.lruReplace(page, currentTime)
        currentTime += 1

打印页面置换日志
显示页面调度总结报告
```

#### **3.3 PageManager 类方法**

**FIFO页面替换（`fifoReplace`）**

**逻辑**：

- 如果页面已在内存中，记录命中。
- 否则，发生页面错误，若内存满则移除最早进入的页面，加载新页面。

**伪代码**：

```
如果 fifoPages 包含 page:
    pageHits += 1
    记录命中日志
    显示内存状态
    返回
pageFaults += 1
如果 fifoPages 大小 >= maxPages:
    移除最早的页面
    记录移除日志
添加新页面到 fifoPages
记录加载日志
显示内存状态
```

**LRU页面替换（`lruReplace`）**

**逻辑**：

- 如果页面已在内存中，更新其最近使用时间，记录命中。
- 否则，发生页面错误，若内存满则移除最久未使用的页面，加载新页面。

**伪代码**：

```
如果 lruPages 包含 page:
    pageHits += 1
    更新 page 的最近使用时间
    记录命中日志
    显示内存状态
    返回
pageFaults += 1
如果 lruPages 大小 >= maxPages:
    找到最久未使用的页面 lruPage
    移除 lruPage
    记录移除日志
添加 page 到 lruPages
记录加载日志
显示内存状态
```

### **4. CPU占用模拟（`simulateCPU`）**

**逻辑**：

- 读取`run.txt`文件，解析每个程序在不同时间点的操作。
- 按时间顺序动态显示CPU的占用情况。

**伪代码**：

```
初始化 cpuLog 为有序映射
打开 run.txt 文件
读取每一行
    如果行以"程序名"开头：
        设置当前程序名
    否则：
        解析时间和操作
        添加到 cpuLog
打印 "动态模拟 CPU 占用情况..."
对于每个时间点和操作 在 cpuLog 中按顺序：
    等待 1 毫秒
    打印 当前时间和操作
打印 "CPU 占用情况模拟完成！"
```

### **5. 主方法逻辑（`main`）**

**逻辑**：

1. 加载运行步骤、进程信息和程序信息。
2. 显示用户菜单，接收用户输入并执行相应功能。
3. 循环执行，直到用户选择退出。

**伪代码**：

```
打印 "加载程序执行步骤并计算运行时间..."
调用 loadRunSteps 获取 runTimes
打印 "程序执行步骤加载完成！"

打印 "加载进程信息..."
调用 loadProcesses
打印 "进程信息加载完成！"

打印 "加载程序信息..."
调用 loadPrograms
打印 "程序信息加载完成！"

初始化 Scanner

循环无限次：
    打印菜单选项
    读取用户选择
    根据选择执行：
        1. 显示所有进程信息
        2. 显示所有程序详细信息
        3. 显示程序执行步骤
        4. 执行 FCFS 调度
        5. 执行 RR 调度
        6. 设置页面大小和时间片长度 或 执行分页调度
        7. 退出程序
        8. 动态模拟 CPU 占用
        默认：提示无效选择
```

---

## **四、代码逻辑详细中文叙述**

### **1. PCB类**

`PCB`类用于表示一个进程的控制块，存储了进程的各种信息，如名称、状态、创建时间、运行时间、优先级、备注、开始时间、完成时间、周转时间、带权周转时间和原始运行时间。构造方法初始化这些属性，`originalRunTime`用于记录进程的初始运行时间，便于后续计算带权周转时间。

### **2. CPUScheduling类**

`CPUScheduling`类是程序的核心，负责实现各种调度算法、加载数据、管理页面以及与用户的交互。

#### **2.1 PageManager内部类**

`PageManager`类负责管理页面的加载和替换，支持FIFO和LRU两种页面替换算法。它维护了当前内存中的页面队列或映射，并记录页面替换的日志、页面错误次数和命中次数。通过`fifoReplace`和`lruReplace`方法，可以根据选择的算法进行页面管理。

#### **2.2 文件加载方法**

- **`loadRunSteps`**：解析`run.txt`文件，获取每个程序的运行步骤和最大运行时间。这些信息用于后续的进程调度和CPU占用模拟。
    
- **`loadProcesses`**：解析`Process.txt`文件，获取每个进程的基本信息，包括进程名、创建时间、优先级和备注（关联的程序名）。根据程序名从`runTimes`映射中获取运行时间，创建`PCB`对象并添加到进程列表中。
    
- **`loadPrograms`**：解析`program.txt`文件，获取每个程序及其包含的函数和大小。这些信息用于计算每个程序所需的页面数。
    

#### **2.3 调度算法**

- **FCFS调度**：按照进程的创建时间顺序依次执行每个进程。计算每个进程的开始时间、完成时间、周转时间和带权周转时间，并更新当前时间。
    
- **RR调度**：使用队列管理进程，按照固定的时间片轮流执行每个进程。如果一个进程在一个时间片内未完成，则将其重新加入队列末尾。记录每个进程的剩余时间，并在完成后更新相关信息。
    

#### **2.4 页面管理**

通过`pageScheduling`方法，根据每个程序的页面需求和用户选择的页面替换算法（FIFO或LRU）进行页面管理。记录页面替换的过程和结果，并生成总结报告。

#### **2.5 CPU占用模拟**

`simulateCPU`方法读取`run.txt`文件，解析每个程序在不同时间点的操作，动态显示CPU的占用情况，模拟实际的CPU使用过程。

#### **2.6 用户交互**

通过控制台菜单，用户可以选择查看进程信息、程序详细信息、程序执行步骤，执行不同的调度算法，设置页面大小和时间片长度，或进行CPU占用模拟。程序根据用户的选择执行相应的功能，并在必要时保存结果到`result.txt`文件。

---

## **五、代码逻辑的流程图式描述**

### **1. 程序启动**

1. **加载数据**：
    
    - 加载运行步骤（`run.txt`）。
    - 加载进程信息（`Process.txt`）。
    - 加载程序信息（`program.txt`）。
2. **进入用户菜单循环**：
    
    - 显示菜单选项。
    - 根据用户选择执行功能。

### **2. 用户选择功能**

- **查看进程信息**：
    
    - 遍历`processList`，打印每个进程的详细信息。
- **查看程序详细信息**：
    
    - 遍历`programs`映射，打印每个程序及其函数和大小。
- **查看程序执行步骤**：
    
    - 遍历`runTimes`映射，打印每个程序的运行时间。
- **执行FCFS调度**：
    
    - 调用`fcfsScheduling`方法，执行先来先服务调度，并保存结果。
- **执行RR调度**：
    
    - 调用`rrScheduling`方法，执行时间片轮转调度，并保存结果。
- **设置页面大小和时间片长度 / 执行分页调度**：
    
    - **子选项1**：用户输入新的页面大小和时间片长度，更新全局变量。
    - **子选项2**：调用`pageScheduling`方法，执行页面管理。
- **退出程序**：
    
    - 退出循环，结束程序。
- **动态模拟CPU占用**：
    
    - 调用`simulateCPU`方法，动态展示CPU使用情况。

### **3. 调度算法执行**

- **FCFS**：
    
    - 按创建时间排序进程。
    - 按顺序执行每个进程，计算并记录相关时间信息。
    - 保存结果到`result.txt`。
- **RR**：
    
    - 按创建时间排序进程。
    - 使用队列管理进程，按时间片执行。
    - 更新每个进程的剩余时间和完成时间。
    - 保存结果到`result.txt`。

### **4. 页面管理执行**

- **计算页面需求**：
    
    - 根据每个程序的总函数大小和页面大小，计算所需页面数。
- **用户输入**：
    
    - 输入最大页面数。
    - 选择页面调度算法（FIFO或LRU）。
- **执行页面替换**：
    
    - 遍历每个程序的页面，调用相应的页面替换方法。
    - 记录页面替换过程和结果。
- **显示总结报告**：
    
    - 打印页面命中次数、页面错误次数和命中率。

### **5. CPU占用模拟执行**

- **读取并解析运行步骤**：
    
    - 解析每个程序在不同时间点的操作。
- **动态展示**：
    
    - 按时间顺序显示每个操作，模拟CPU的占用情况。

---

## **六、关键代码片段解释**

### **1. PCB类**

```java
class PCB {
    String pName; // 进程名称
    String pRemark; // 备注
    String pStatus; // 状态
    int createTime; // 创建时间
    int runTime; // 运行时间
    int grade; // 优先级
    int startTime; // 开始时间
    int completeTime; // 完成时间
    int turnoverTime; // 周转时间
    double weightedTurnoverTime; // 带权周转时间
    int originalRunTime; // 原始运行时间

    PCB(String pName, int createTime, int runTime, int grade, String pRemark) {
        this.pName = pName;
        this.createTime = createTime;
        this.runTime = runTime;
        this.originalRunTime = runTime; // 记录原始运行时间
        this.grade = grade;
        this.pRemark = pRemark;
        this.pStatus = "等待";
        this.startTime = -1;
    }
}
```

**解释**：

- `PCB`类用于存储进程的各项信息。
- 构造方法初始化进程的名称、创建时间、运行时间、优先级和备注。
- `originalRunTime`记录了进程的初始运行时间，以便在时间片轮转调度中计算带权周转时间。

### **2. PageManager类**

```java
static class PageManager {
    private final double pageSize;
    private final int maxPages;
    private final LinkedList<Integer> fifoPages;
    private final Map<Integer, Integer> lruPages;
    private final List<String> log; // 存储页面置换的日志记录
    private int pageFaults; // 页面错误次数
    private int pageHits; // 页面命中次数

    PageManager(double pageSize, int maxPages) {
        this.pageSize = pageSize;
        this.maxPages = maxPages;
        this.fifoPages = new LinkedList<>();
        this.lruPages = new HashMap<>();
        this.log = new ArrayList<>();
        this.pageFaults = 0;
        this.pageHits = 0;
    }

    public void fifoReplace(int page) {
        if (fifoPages.contains(page)) {
            pageHits++;
            log.add("FIFO: 页面 " + page + " 已经在内存中 (命中)");
            displayMemoryState(); // 实时显示内存状态
            return;
        }

        pageFaults++;
        if (fifoPages.size() >= maxPages) {
            int removed = fifoPages.removeFirst();
            log.add("FIFO: 页面 " + removed + " 被移除");
        }
        fifoPages.add(page);
        log.add("FIFO: 页面 " + page + " 被加载");
        displayMemoryState(); // 实时显示内存状态
    }

    public void lruReplace(int page, int currentTime) {
        if (lruPages.containsKey(page)) {
            pageHits++;
            lruPages.put(page, currentTime); // 更新页面最近使用时间
            log.add("LRU: 页面 " + page + " 已经在内存中 (命中)");
            displayMemoryState(); // 实时显示内存状态
            return;
        }

        pageFaults++;
        if (lruPages.size() >= maxPages) {
            int lruPage = Collections.min(lruPages.entrySet(), Map.Entry.comparingByValue()).getKey();
            lruPages.remove(lruPage);
            log.add("LRU: 页面 " + lruPage + " 被移除");
        }
        lruPages.put(page, currentTime);
        log.add("LRU: 页面 " + page + " 被加载");
        displayMemoryState(); // 实时显示内存状态
    }

    // 其他方法省略
}
```

**解释**：

- `PageManager`类管理页面的加载和替换，支持FIFO和LRU两种替换策略。
- `fifoReplace`方法实现FIFO页面替换算法：如果页面已在内存中，记录命中；否则发生页面错误，若内存满则移除最早的页面，加载新页面。
- `lruReplace`方法实现LRU页面替换算法：如果页面已在内存中，更新其最近使用时间，记录命中；否则发生页面错误，若内存满则移除最久未使用的页面，加载新页面。
- `log`记录了页面替换的过程，便于后续分析。
- `displayMemoryState`方法用于实时显示当前内存中的页面状态。

### **3. fcfsScheduling方法**

```java
public static void fcfsScheduling() {
    clearResultFile();
    processList.sort(Comparator.comparingInt(p -> p.createTime));
    int currentTime = 0;
    for (PCB process : processList) {
        if (currentTime < process.createTime) {
            currentTime = process.createTime;
        }
        process.startTime = currentTime;
        process.completeTime = currentTime + process.runTime;
        process.turnoverTime = process.completeTime - process.createTime;
        process.weightedTurnoverTime = (double) process.turnoverTime / process.runTime;
        currentTime += process.runTime;
    }
    saveResults("FCFS");
}
```

**解释**：

- 清空`result.txt`文件。
- 按进程的创建时间对`processList`进行排序。
- 遍历每个进程，计算其开始时间、完成时间、周转时间和带权周转时间。
- 更新当前时间。
- 将调度结果保存到`result.txt`文件中。

### **4. rrScheduling方法**

```java
public static void rrScheduling() {
    clearResultFile();
    Queue<PCB> queue = new LinkedList<>();
    processList.sort(Comparator.comparingInt(p -> p.createTime)); // 按创建时间排序
    int currentTime = 0;
    int index = 0;

    Map<PCB, Integer> remainingTimeMap = new HashMap<>();
    for (PCB process : processList) {
        remainingTimeMap.put(process, process.runTime);
    }

    while (!queue.isEmpty() || index < processList.size()) {
        // 等待新进程到达
        if (queue.isEmpty() && index < processList.size() && processList.get(index).createTime > currentTime) {
            currentTime = processList.get(index).createTime;
        }

        // 加入当前时间之前到达的所有新进程
        while (index < processList.size() && processList.get(index).createTime <= currentTime) {
            PCB newProcess = processList.get(index);
            if (!queue.contains(newProcess)) { // 避免重复加入
                queue.offer(newProcess); // 加入队列末尾
            }
            index++;
        }

        // 如果队列仍为空，说明没有可调度进程，时间推进
        if (queue.isEmpty()) {
            currentTime++;
            continue;
        }

        // 从队列中获取第一个进程
        PCB process = queue.poll();

        // 设置进程的首次运行时间
        if (process.startTime == -1) {
            process.startTime = currentTime;
        }

        // 计算当前时间片内的执行
        int remainingTime = remainingTimeMap.get(process);
        int executionTime = Math.min(timeSlice, remainingTime);
        remainingTime -= executionTime;
        currentTime += executionTime;

        // 如果进程还有剩余时间，重新加入队列末尾
        if (remainingTime > 0) {
            remainingTimeMap.put(process, remainingTime);
            queue.offer(process); // 放到队列末尾
        } else {
            // 如果进程完成，更新完成时间等信息
            remainingTimeMap.remove(process);
            process.completeTime = currentTime;
            process.turnoverTime = process.completeTime - process.createTime;
            process.weightedTurnoverTime = (double) process.turnoverTime / process.originalRunTime;
        }

        // 打印调试信息
        System.out.printf("当前时间: %d | 执行进程: %s | 剩余时间: %d\n", currentTime, process.pName, remainingTime);
        System.out.print("当前队列状态（执行后）: ");
        queue.forEach(p -> System.out.print(p.pName + " "));
        System.out.println();
    }

    saveResults("RR");
}
```

**解释**：

- 清空`result.txt`文件。
- 按创建时间对`processList`排序。
- 使用队列管理进程，记录每个进程的剩余时间。
- 循环执行调度：
    - 如果队列为空且有新进程尚未到达，更新当前时间。
    - 将所有在当前时间到达的进程加入队列。
    - 如果队列为空，时间推进。
    - 从队列中取出第一个进程，执行一个时间片的时间。
    - 更新进程的剩余时间，若未完成则重新加入队列，否则记录完成时间和相关信息。
- 打印调试信息，展示当前时间、执行进程和队列状态。
- 将调度结果保存到`result.txt`文件中。

### **5. main方法**

```java
public static void main(String[] args) {
    System.out.println("加载程序执行步骤并计算运行时间...");
    Map<String, Integer> runTimes = loadRunSteps(); // 从 run.txt 中计算程序运行时间
    System.out.println("程序执行步骤加载完成！\n");

    System.out.println("加载进程信息...");
    loadProcesses(runTimes); // 加载进程信息并设置运行时间
    System.out.println("进程信息加载完成！\n");

    System.out.println("加载程序信息...");
    Map<String, Map<String, Double>> programs = loadPrograms();
    System.out.println("程序信息加载完成！\n");

    Scanner scanner = new Scanner(System.in);

    while (true) {
        System.out.println("选择功能:");
        System.out.println("1. 查看进程信息\n2. 查看程序详细信息\n3. 查看程序执行步骤\n4. 先来先服务调度\n5. 时间片轮转调度");
        System.out.println("6. 设置页面大小和时间片长度\n7. 退出\n8. 动态模拟 CPU 占用");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                // 显示进程信息
                System.out.println("进程信息:");
                for (PCB pcb : processList) {
                    System.out.printf("进程: %s | 创建时间: %d | 优先级: %d | 运行时间: %d | 备注: %s\n",
                            pcb.pName, pcb.createTime, pcb.grade, pcb.runTime, pcb.pRemark);
                }
                break;

            case 2:
                // 显示程序信息
                System.out.println("程序信息:");
                for (Map.Entry<String, Map<String, Double>> entry : programs.entrySet()) {
                    System.out.println("程序名: " + entry.getKey());
                    for (Map.Entry<String, Double> func : entry.getValue().entrySet()) {
                        System.out.printf("  函数: %s | 大小: %.2f KB\n", func.getKey(), func.getValue());
                    }
                }
                break;

            case 3:
                // 显示程序执行步骤
                System.out.println("程序执行步骤:");
                for (Map.Entry<String, Integer> entry : runTimes.entrySet()) {
                    System.out.println("程序名: " + entry.getKey() + " | 运行时间: " + entry.getValue());
                }
                break;

            case 4:
                // 先来先服务调度
                fcfsScheduling();
                System.out.println("FCFS调度已完成，结果已保存到 result.txt");
                break;

            case 5:
                // 时间片轮转调度
                rrScheduling();
                System.out.println("RR调度已完成，结果已保存到 result.txt");
                break;

            case 6:
                // 设置页面大小和时间片长度，或执行分页调度
                System.out.println("1. 设置页面大小和时间片长度\n2. 执行分页调度");
                int option = scanner.nextInt();
                if (option == 1) {
                    System.out.println("请输入新的页面大小 (单位: KB):");
                    pageSize = scanner.nextDouble();
                    System.out.println("请输入新的时间片长度 (单位: ms):");
                    timeSlice = scanner.nextInt();
                    System.out.printf("页面大小已设置为: %.2f KB | 时间片长度已设置为: %d ms\n", pageSize, timeSlice);
                } else if (option == 2) {
                    pageScheduling(programs);
                }
                break;

            case 7:
                // 退出程序
                System.out.println("退出程序...");
                scanner.close();
                return;

            case 8:
                // 动态模拟 CPU 占用情况
                simulateCPU(runTimes);
                break;

            default:
                System.out.println("无效选择，请重新输入！");
        }
    }
}
```

**解释**：

- **初始化阶段**：
    - 加载运行步骤、进程信息和程序信息。
- **用户菜单循环**：
    - 不断显示菜单，等待用户输入。
    - 根据用户选择执行相应功能：
        - 查看进程信息。
        - 查看程序详细信息。
        - 查看程序执行步骤。
        - 执行FCFS调度。
        - 执行RR调度。
        - 设置页面大小和时间片长度或执行分页调度。
        - 退出程序。
        - 动态模拟CPU占用。
- **退出条件**：
    - 用户选择退出后，关闭扫描器并终止程序。

---

## **七、总结**

您的Java程序结构清晰，功能全面，涵盖了进程管理、调度算法实现、页面管理以及用户交互等多个方面。以下是几点建议，以进一步优化和增强程序：

1. **类的分离与模块化**：
    
    - 将`PageManager`类独立出来，放在单独的文件中，提高代码的可维护性和可扩展性。
    - 为不同的调度算法创建独立的类，实现策略模式，增强算法的灵活性。
2. **异常处理**：
    
    - 增强文件读取和用户输入部分的异常处理，确保程序的健壮性。
    - 使用更详细的错误信息，帮助用户理解问题所在。
3. **用户输入验证**：
    
    - 在接收用户输入时，增加输入类型和范围的验证，防止程序因无效输入而崩溃。
4. **日志记录**：
    
    - 考虑使用日志框架（如`java.util.logging`）替代`System.out.println`，以更好地管理日志级别和输出。
5. **代码优化**：
    
    - 在`PageManager`的LRU实现中，可以考虑使用`LinkedHashMap`的访问顺序特性，简化代码。
    - 使用更高效的数据结构和算法，提高程序的性能，特别是在处理大量数据时。
6. **用户体验**：
    
    - 优化控制台菜单的显示和交互，使其更加友好和直观。
    - 增加进度条或等待提示，在执行耗时操作时提升用户体验。

通过以上优化，您的程序将更加健壮、高效，并且易于维护和扩展。如有具体问题或需要进一步的帮助，欢迎随时提问！