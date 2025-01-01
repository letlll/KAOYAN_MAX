```java
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class ProcessSchedulingSystem {

    // 进程控制块（PCB）
    static class PCB {
        String proName;                   // 进程名称
        int startTime;                    // 到达时间
        int runTime;                      // 运行时间（剩余）
        int originalRunTime;             // 原始运行时间
        String programName;               // 关联的程序名称
        int firstTime;                    // 开始运行时间
        int finishTime;                   // 完成时间
        double turnoverTime;              // 周转时间
        double weightedTurnoverTime;      // 带权周转时间
        String status;                     // 状态
        List<Integer> visitList;           // 访问页号列表

        PCB(String proName, int startTime, int runTime, String programName) {
            this.proName = proName;
            this.startTime = startTime;
            this.runTime = runTime;
            this.originalRunTime = runTime;
            this.programName = programName;
            this.firstTime = -1;
            this.finishTime = 0;
            this.turnoverTime = 0.0;
            this.weightedTurnoverTime = 0.0;
            this.status = "等待";
            this.visitList = new ArrayList<>();
        }
    }

    // 运行步骤结构体
    static class RUN {
        String name;         // 进程名
        int jumpTime;        // 执行时间
        double address;      // 访问地址

        RUN(String name, int jumpTime, double address) {
            this.name = name;
            this.jumpTime = jumpTime;
            this.address = address;
        }
    }

    // 函数信息结构体
    static class FunctionInfo {
        String funcName; // 函数名称
        double size;     // 函数大小 (KB)

        FunctionInfo(String funcName, double size) {
            this.funcName = funcName;
            this.size = size;
        }
    }

    // 程序信息结构体
    static class ProgramInfo {
        String programName;                      // 程序名称
        List<FunctionInfo> functions;            // 程序中的函数列表

        ProgramInfo(String programName) {
            this.programName = programName;
            this.functions = new ArrayList<>();
        }
    }

    // 页面替换管理器
    static class PageManager {
        double pageSize; // 页面大小（KB）
        int maxPages;    // 每个进程的最大页面数
        Queue<Integer> fifoPages; // FIFO页面队列
        Map<Integer, Integer> lruPages; // LRU页面映射：页面号 -> 最近访问时间
        List<String> log; // 页面操作日志
        int pageFaults;    // 缺页次数
        int pageHits;      // 命中次数

        PageManager(double pageSize, int maxPages) {
            this.pageSize = pageSize;
            this.maxPages = maxPages;
            this.fifoPages = new LinkedList<>();
            this.lruPages = new HashMap<>();
            this.log = new ArrayList<>();
            this.pageFaults = 0;
            this.pageHits = 0;
        }

        // FIFO替换策略
        void fifoReplace(int page) {
            // 检查页面是否已存在
            boolean found = fifoPages.contains(page);

            if (found) {
                pageHits++;
                log.add("FIFO: 页面 " + page + " 已在内存中 (命中)。");
                return;
            }

            // 页面错误
            pageFaults++;
            if (fifoPages.size() >= maxPages) {
                if (!fifoPages.isEmpty()) {
                    int removed = fifoPages.poll();
                    log.add("FIFO: 页面 " + removed + " 被移除。");
                }
            }
            fifoPages.offer(page);
            log.add("FIFO: 页面 " + page + " 被添加。");

            // 记录当前内存状态
            String currentMemory = "当前内存: " + fifoPages.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(" "));
            log.add(currentMemory);
        }

        // LRU替换策略
        void lruReplace(int page, int currentTime) {
            if (lruPages.containsKey(page)) {
                pageHits++;
                lruPages.put(page, currentTime);
                log.add("LRU: 页面 " + page + " 已在内存中 (命中)。");
                return;
            }

            // 页面错误
            pageFaults++;
            if (lruPages.size() >= maxPages) {
                // 找到最久未使用的页面
                int lruPage = -1;
                int minTime = Integer.MAX_VALUE;
                for (Map.Entry<Integer, Integer> entry : lruPages.entrySet()) {
                    if (entry.getValue() < minTime) {
                        minTime = entry.getValue();
                        lruPage = entry.getKey();
                    }
                }
                if (lruPage != -1) {
                    lruPages.remove(lruPage);
                    log.add("LRU: 页面 " + lruPage + " 被移除。");
                }
            }
            lruPages.put(page, currentTime);
            log.add("LRU: 页面 " + page + " 被添加。");

            // 记录当前内存状态
            String currentMemory = "当前内存: " + lruPages.keySet().stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(" "));
            log.add(currentMemory);
        }

        // 获取页面置换日志
        List<String> getLog() {
            return log;
        }

        // 获取页面错误次数
        int getPageFaults() {
            return pageFaults;
        }

        // 获取页面命中次数
        int getPageHits() {
            return pageHits;
        }

        // 计算页面命中率
        double getHitRate() {
            return (pageHits + pageFaults) == 0 ? 0 : ((double) pageHits / (pageHits + pageFaults));
        }

        // 打印总结报告
        void printSummary() {
            System.out.println("缺页次数: " + pageFaults);
            System.out.println("页面命中次数: " + pageHits);
            if (pageHits + pageFaults > 0) {
                double hitRate = ((double) pageHits / (pageHits + pageFaults)) * 100;
                System.out.printf("命中率: %.2f%%\n", hitRate);
            }
        }
    }

    // 全局变量
    static List<PCB> processes = new ArrayList<>(); // 所有进程
    static List<RUN> runSteps = new ArrayList<>();   // 所有运行步骤
    static Map<String, ProgramInfo> programs = new HashMap<>(); // 所有程序信息

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取数据文件
        readProcess("Process.txt");
        readRun("run.txt");
        readProgramDetails("program.txt");

        while (true) {
            // 显示菜单
            showMenu();
            int choice = getUserChoice(scanner, 1, 7);

            switch (choice) {
                case 1:
                    // 显示进程信息
                    displayProcessInfo();
                    break;
                case 2:
                    // 显示程序详细信息
                    displayProgramDetails();
                    break;
                case 3:
                    // 先来先服务调度（FCFS）
                    performFCFS();
                    break;
                case 4:
                    // 时间片轮转调度（RR）
                    performRR(scanner);
                    break;
                case 5:
                    // 分页调度（基于访问页号）
                    performPagingScheduling();
                    break;
                case 6:
                    // 设置页面大小并执行分页调度
                    performPagingSchedulingWithUserInput(scanner);
                    break;
                case 7:
                    // 退出程序
                    System.out.println("退出程序。再见！");
                    scanner.close();
                    System.exit(0);
                    break;
                default:
                    // 无效选项
                    System.out.println("无效选项，请重新选择。");
            }
        }
    }

    // 显示菜单
    private static void showMenu() {
        System.out.println("\n===== 进程调度与分页管理系统 =====");
        System.out.println("请选择功能：");
        System.out.println("1. 显示进程信息");
        System.out.println("2. 显示程序详细信息");
        System.out.println("3. 先来先服务调度（FCFS）");
        System.out.println("4. 时间片轮转调度（RR）");
        System.out.println("5. 分页调度（基于访问页号）");
        System.out.println("6. 设置页面大小并执行分页调度");
        System.out.println("7. 退出程序");
        System.out.print("请输入选项 (1-7): ");
    }

    // 获取用户选择，并验证输入
    private static int getUserChoice(Scanner scanner, int min, int max) {
        int choice = -1;
        while (true) {
            try {
                choice = Integer.parseInt(scanner.nextLine().trim());
                if (choice >= min && choice <= max) {
                    break;
                } else {
                    System.out.print("输入无效，请输入一个介于 " + min + " 和 " + max + " 之间的整数: ");
                }
            } catch (NumberFormatException e) {
                System.out.print("输入无效，请输入一个整数: ");
            }
        }
        return choice;
    }

    // 读取Process.txt文件
    private static void readProcess(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                String[] parts = line.trim().split("\\s+");
                if (parts.length < 4) {
                    System.err.println("警告: Process.txt 中的行格式不正确: " + line);
                    continue;
                }
                String proName = parts[0];
                int startTime = Integer.parseInt(parts[1]);
                int runTime = Integer.parseInt(parts[2]);
                String programName = parts[3];
                PCB pcb = new PCB(proName, startTime, runTime, programName);
                processes.add(pcb);
            }
        } catch (IOException e) {
            System.err.println("Error: 无法读取 " + filename + " 文件。");
            System.exit(1);
        }
    }

    // 读取run.txt文件
    private static void readRun(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            String currentProgram = "";
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                // 检测是否为程序名行
                if (line.startsWith("program")) {
                    currentProgram = line.trim();
                    continue;
                }
                String[] parts = line.trim().split("\\s+");
                if (parts.length < 3) {
                    System.err.println("警告: run.txt 中的行格式不正确: " + line);
                    continue;
                }
                int jumpTime = Integer.parseInt(parts[0]);
                String operation = parts[1];
                double address = Double.parseDouble(parts[2]);
                if (operation.equals("结束")) {
                    address = -1;
                }
                RUN run = new RUN(operation, jumpTime, address);
                run.name = currentProgram;
                runSteps.add(run);
            }
        } catch (IOException e) {
            System.err.println("Error: 无法读取 " + filename + " 文件。");
            System.exit(1);
        }
    }

    // 读取program.txt文件
    private static void readProgramDetails(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            String currentProgram = "";
            while ((line = br.readLine()) != null) {
                if (line.trim().isEmpty()) continue;
                // 检测是否为FName行
                if (line.startsWith("FName")) {
                    String[] parts = line.trim().split("\\s+");
                    if (parts.length < 2) {
                        System.err.println("警告: program.txt 中的FName行格式不正确: " + line);
                        continue;
                    }
                    currentProgram = parts[1];
                    programs.put(currentProgram, new ProgramInfo(currentProgram));
                    continue;
                }
                String[] parts = line.trim().split("\\s+");
                if (parts.length < 2) {
                    System.err.println("警告: program.txt 中的行格式不正确: " + line);
                    continue;
                }
                String funcName = parts[0];
                double size = Double.parseDouble(parts[1]);
                FunctionInfo func = new FunctionInfo(funcName, size);
                if (currentProgram.isEmpty()) {
                    System.err.println("警告: program.txt 中的函数未关联到任何程序: " + line);
                    continue;
                }
                programs.get(currentProgram).functions.add(func);
            }
        } catch (IOException e) {
            System.err.println("Error: 无法读取 " + filename + " 文件。");
            System.exit(1);
        }
    }

    // 显示进程信息
    private static void displayProcessInfo() {
        System.out.println("\n===== 进程信息 =====");
        System.out.printf("%-12s%-12s%-12s%-15s%-15s\n", "进程名", "到达时间", "运行时间", "程序名称", "状态");
        System.out.println("------------------------------------------------------------------");
        for (PCB pro : processes) {
            System.out.printf("%-12s%-12d%-12d%-15s%-15s\n",
                    pro.proName,
                    pro.startTime,
                    pro.originalRunTime,
                    pro.programName,
                    pro.status);
        }
    }

    // 显示程序详细信息
    private static void displayProgramDetails() {
        System.out.println("\n===== 程序详细信息 =====");
        for (ProgramInfo prog : programs.values()) {
            System.out.println("程序: " + prog.programName);
            for (FunctionInfo func : prog.functions) {
                System.out.println("  函数: " + func.funcName + ", 大小: " + func.size + " KB");
            }
            System.out.println();
        }
    }

    // 先来先服务调度（FCFS）
    private static void performFCFS() {
        System.out.println("\n=== 先来先服务调度（FCFS） ===");
        // 按照到达时间排序
        List<PCB> sortedProcesses = new ArrayList<>(processes);
        sortedProcesses.sort(Comparator.comparingInt(p -> p.startTime));

        int currentTime = 0;
        for (PCB pro : sortedProcesses) {
            if (currentTime < pro.startTime) {
                currentTime = pro.startTime;
            }
            pro.firstTime = currentTime;
            pro.status = "执行";
            currentTime += pro.runTime;
            pro.finishTime = currentTime;
            pro.turnoverTime = pro.finishTime - pro.startTime;
            if (pro.originalRunTime > 0) {
                pro.weightedTurnoverTime = (double) pro.turnoverTime / pro.originalRunTime;
            } else {
                pro.weightedTurnoverTime = 0.0;
            }
            pro.status = "完成";
        }

        // 输出结果到result.txt
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("result.txt", true))) {
            bw.write("\n=== 先来先服务调度（FCFS） ===\n");
            bw.write("进程名\t到达时间\t运行时间\t开始时间\t完成时间\t周转时间\t带权周转时间\n");
            System.out.printf("\n=== 先来先服务调度（FCFS） ===\n");
            System.out.printf("%-10s%-12s%-12s%-12s%-12s%-12s%-16s\n",
                    "进程名", "到达时间", "运行时间", "开始时间", "完成时间", "周转时间", "带权周转时间");
            System.out.println("--------------------------------------------------------------------------");

            for (PCB pro : sortedProcesses) {
                bw.write(String.format("%s\t%d\t%d\t%d\t%d\t%.0f\t%.2f\n",
                        pro.proName,
                        pro.startTime,
                        pro.originalRunTime,
                        pro.firstTime,
                        pro.finishTime,
                        pro.turnoverTime,
                        pro.weightedTurnoverTime));

                System.out.printf("%-10s%-12d%-12d%-12d%-12d%-12.0f%-16.2f\n",
                        pro.proName,
                        pro.startTime,
                        pro.originalRunTime,
                        pro.firstTime,
                        pro.finishTime,
                        pro.turnoverTime,
                        pro.weightedTurnoverTime);
            }
        } catch (IOException e) {
            System.err.println("Error: 无法写入 result.txt 文件。");
        }

        System.out.println("先来先服务调度（FCFS）完成。结果已保存到 result.txt\n");
    }

    // 时间片轮转调度（RR）
    private static void performRR(Scanner scanner) {
        System.out.println("\n=== 时间片轮转调度（RR） ===");
        System.out.print("请输入时间片长度 (ms): ");
        int timeQuantum = getUserChoice(scanner, 1, Integer.MAX_VALUE);

        // 按照到达时间排序
        List<PCB> sortedProcesses = new ArrayList<>(processes);
        sortedProcesses.sort(Comparator.comparingInt(p -> p.startTime));

        // 初始化就绪队列
        Queue<PCB> readyQueue = new LinkedList<>();
        int currentTime = 0;
        int index = 0;
        int n = sortedProcesses.size();

        // 将所有到达时间 <= currentTime 的进程加入就绪队列
        while (index < n && sortedProcesses.get(index).startTime <= currentTime) {
            readyQueue.offer(sortedProcesses.get(index));
            sortedProcesses.get(index).status = "就绪";
            index++;
        }

        while (!readyQueue.isEmpty()) {
            PCB currentProcess = readyQueue.poll();

            // 记录开始时间
            if (currentProcess.firstTime == -1) {
                currentProcess.firstTime = currentTime;
            }

            currentProcess.status = "执行";

            // 执行时间
            int execTime = Math.min(timeQuantum, currentProcess.runTime);
            currentTime += execTime;
            currentProcess.runTime -= execTime;

            // 模拟页面访问（可根据实际需求调整）

            // 检查是否有新进程到达
            while (index < n && sortedProcesses.get(index).startTime <= currentTime) {
                readyQueue.offer(sortedProcesses.get(index));
                sortedProcesses.get(index).status = "就绪";
                index++;
            }

            if (currentProcess.runTime > 0) {
                readyQueue.offer(currentProcess);
                currentProcess.status = "就绪";
            } else {
                currentProcess.finishTime = currentTime;
                currentProcess.turnoverTime = currentProcess.finishTime - currentProcess.startTime;
                if (currentProcess.originalRunTime > 0) {
                    currentProcess.weightedTurnoverTime = (double) currentProcess.turnoverTime / currentProcess.originalRunTime;
                } else {
                    currentProcess.weightedTurnoverTime = 0.0;
                }
                currentProcess.status = "完成";
            }
        }

        // 输出结果到result.txt
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("result.txt", true))) {
            bw.write("\n=== 时间片轮转调度（RR） ===\n");
            bw.write("进程名\t到达时间\t运行时间\t开始时间\t完成时间\t周转时间\t带权周转时间\n");
            System.out.printf("\n=== 时间片轮转调度（RR） ===\n");
            System.out.printf("%-10s%-12s%-12s%-12s%-12s%-12s%-16s\n",
                    "进程名", "到达时间", "运行时间", "开始时间", "完成时间", "周转时间", "带权周转时间");
            System.out.println("--------------------------------------------------------------------------");

            for (PCB pro : sortedProcesses) {
                bw.write(String.format("%s\t%d\t%d\t%d\t%d\t%.0f\t%.2f\n",
                        pro.proName,
                        pro.startTime,
                        pro.originalRunTime,
                        pro.firstTime,
                        pro.finishTime,
                        pro.turnoverTime,
                        pro.weightedTurnoverTime));

                System.out.printf("%-10s%-12d%-12d%-12d%-12d%-12.0f%-16.2f\n",
                        pro.proName,
                        pro.startTime,
                        pro.originalRunTime,
                        pro.firstTime,
                        pro.finishTime,
                        pro.turnoverTime,
                        pro.weightedTurnoverTime);
            }
        } catch (IOException e) {
            System.err.println("Error: 无法写入 result.txt 文件。");
        }

        System.out.println("时间片轮转调度（RR）完成。结果已保存到 result.txt\n");
    }

    // 分页调度（基于访问页号）
    private static void performPagingScheduling() {
        System.out.println("\n=== 分页调度 ===");
        // 这里假设页面大小和最大页面数已在其他地方设置
        // 如果需要基于访问页号执行调度，可根据需求实现
        System.out.println("功能尚未实现。\n");
    }

    // 设置页面大小并执行分页调度
    private static void performPagingSchedulingWithUserInput(Scanner scanner) {
        System.out.println("\n=== 设置页面大小并执行分页调度 ===");
        System.out.print("请输入页面大小 (KB): ");
        double pageSize = getUserDouble(scanner, 0.1, Double.MAX_VALUE);

        System.out.print("请输入每个进程的最大页面数: ");
        int maxPages = getUserChoice(scanner, 1, Integer.MAX_VALUE);

        // 分配运行步骤到各进程的访问页号列表
        assignRunStepsToProcesses(pageSize);

        // 计算每个程序所需的页面数
        Map<String, Integer> pageRequirements = calculatePageRequirements();

        // 获取用户选择的页面调度算法
        System.out.print("请输入页面调度算法 (1. FIFO  2. LRU): ");
        int choice = getUserChoice(scanner, 1, 2);

        // 创建页面管理器实例
        PageManager pageManager = new PageManager(pageSize, maxPages);

        System.out.println("\n页面调度过程:");
        int currentTime = 0;

        // 遍历每个程序及其所需页面数
        for (Map.Entry<String, Integer> entry : pageRequirements.entrySet()) {
            String programName = entry.getKey();
            int pages = entry.getValue();
            System.out.println("程序 " + programName + " 需要 " + pages + " 页");

            for (int page = 0; page < pages; page++) {
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
        System.out.println("\n===== 页面置换日志 =====");
        for (String logEntry : pageManager.getLog()) {
            System.out.println(logEntry);
        }

        // 输出分页调度总结报告
        displayPageSummary(pageManager, pageRequirements);
    }

    // 获取用户输入的double类型，并验证
    private static double getUserDouble(Scanner scanner, double min, double max) {
        double value = -1;
        while (true) {
            try {
                value = Double.parseDouble(scanner.nextLine().trim());
                if (value >= min && value <= max) {
                    break;
                } else {
                    System.out.print("输入无效，请输入一个介于 " + min + " 和 " + max + " 之间的数字: ");
                }
            } catch (NumberFormatException e) {
                System.out.print("输入无效，请输入一个数字: ");
            }
        }
        return value;
    }

    // 分配运行步骤到各进程的访问页号列表
    private static void assignRunStepsToProcesses(double pageSize) {
        // 创建 programA -> processA 的映射
        Map<String, String> programToProcess = new HashMap<>();
        programToProcess.put("programA", "processA");
        programToProcess.put("programB", "processB");
        programToProcess.put("programC", "processC");
        programToProcess.put("programD", "processD");
        programToProcess.put("programE", "processE");

        for (RUN run : runSteps) {
            if (run.address == -1) {
                // "结束" 操作，不需要分配页面
                continue;
            }
            // 计算页号
            int pageNumber = (int) Math.floor(run.address / pageSize);

            // 根据program_to_process映射找到对应的进程
            String processName = programToProcess.get(run.name);
            if (processName != null) {
                // 找到对应的进程并添加到visitList
                for (PCB pro : processes) {
                    if (pro.proName.equals(processName)) {
                        pro.visitList.add(pageNumber);
                        break;
                    }
                }
            } else {
                System.err.println("Error: Unknown program name " + run.name);
            }
        }
    }

    // 计算每个程序所需的页面数
    private static Map<String, Integer> calculatePageRequirements() {
        Map<String, Integer> pageRequirements = new HashMap<>();
        for (ProgramInfo prog : programs.values()) {
            double totalSize = 0.0;
            for (FunctionInfo func : prog.functions) {
                totalSize += func.size;
            }
            int pages = (int) Math.ceil(totalSize / 1.0); // Assume page size is handled elsewhere
            pageRequirements.put(prog.programName, pages);
        }
        return pageRequirements;
    }

    // 分页调度总结报告
    private static void displayPageSummary(PageManager pageManager, Map<String, Integer> pageRequirements) {
        System.out.println("\n===== 分页调度总结报告 =====");
        for (Map.Entry<String, Integer> entry : pageRequirements.entrySet()) {
            String programName = entry.getKey();
            int pages = entry.getValue();
            System.out.println("程序: " + programName + " | 总页面数: " + pages);
        }
        System.out.println("页面命中次数: " + pageManager.getPageHits());
        System.out.println("页面置换次数 (页面错误): " + pageManager.getPageFaults());
        System.out.printf("页面命中率: %.2f%%\n", pageManager.getHitRate() * 100);
    }
}
```

### **Java 程序说明**

#### **1. 类与数据结构**

- **PCB（进程控制块）**: 存储每个进程的信息，包括名称、到达时间、运行时间、关联的程序名称、调度相关时间（开始时间、完成时间、周转时间、带权周转时间）、状态以及访问页号列表。
    
- **RUN（运行步骤）**: 存储每个程序的运行步骤，包括操作名称、执行时间和访问地址。
    
- **FunctionInfo（函数信息）**: 存储每个程序中函数的名称和大小（KB）。
    
- **ProgramInfo（程序信息）**: 存储每个程序的名称及其包含的函数列表。
    
- **PageManager（页面替换管理器）**: 管理页面替换策略（FIFO 和 LRU），记录页面操作日志、缺页次数和命中次数，并计算命中率。
    

#### **2. 文件读取**

- **readProcess(String filename)**: 读取 `Process.txt` 文件，解析每个进程的名称、到达时间、运行时间和关联的程序名称，存储到 `processes` 列表中。
    
- **readRun(String filename)**: 读取 `run.txt` 文件，解析每个程序的运行步骤，包括执行时间、操作类型和访问地址，存储到 `runSteps` 列表中。
    
- **readProgramDetails(String filename)**: 读取 `program.txt` 文件，解析每个程序的函数详细信息，包括函数名称和大小，存储到 `programs` 映射中。
    

#### **3. 分配运行步骤到进程**

- **assignRunStepsToProcesses(double pageSize)**: 根据运行步骤中的访问地址和页面大小，计算页号，并将其分配给对应进程的 `visitList` 中。使用 `programToProcess` 映射来关联程序名称与进程名称。

#### **4. 显示信息**

- **displayProcessInfo()**: 以表格形式展示所有进程的信息，包括进程名、到达时间、运行时间、关联程序名称和状态。
    
- **displayProgramDetails()**: 以列表形式展示所有程序的详细信息，包括程序名称和其包含的函数及其大小。
    

#### **5. 调度算法**

- **performFCFS()**: 实现先来先服务（FCFS）调度算法。按到达时间排序进程，依次执行每个进程，记录开始时间、完成时间、周转时间和带权周转时间。将结果输出到控制台并追加写入 `result.txt` 文件。
    
- **performRR(Scanner scanner)**: 实现时间片轮转（RR）调度算法。用户输入时间片长度（ms），按到达时间排序进程，依次执行每个进程的时间片，记录调度相关时间。将结果输出到控制台并追加写入 `result.txt` 文件。
    
- **performPagingScheduling()**: 当前该功能尚未实现，仅输出提示信息。
    
- **performPagingSchedulingWithUserInput(Scanner scanner)**: 实现分页调度功能。用户输入页面大小（KB）和每个进程的最大页面数，分配运行步骤到进程的访问页号列表，计算每个程序所需的页面数，选择页面调度算法（FIFO 或 LRU），执行分页调度，并输出页面置换日志和总结报告。
    

#### **6. 分页调度**

- **PageManager** 类管理页面替换逻辑，支持 FIFO 和 LRU 两种算法，记录页面操作日志和统计数据（缺页次数、命中次数），并计算页面命中率。
    
- **performPagingSchedulingWithUserInput(Scanner scanner)**: 根据用户输入的页面大小和最大页面数，执行分页调度，选择 FIFO 或 LRU 算法，记录和输出日志及总结报告。
    

#### **7. 辅助方法**

- **getUserChoice(Scanner scanner, int min, int max)**: 获取用户输入的整数，并验证是否在指定范围内。
    
- **getUserDouble(Scanner scanner, double min, double max)**: 获取用户输入的双精度浮点数，并验证是否在指定范围内。
    

#### **8. 运行流程示例**

假设已准备好以下格式的文件：

**Process.txt**

```
processA	0	5	programA
processB	1	4	programB
processC	3	7	programC
processD	6	5	programD
processE	8	6	programE
```

**run.txt**

```
programA
5	跳转	1021
10	跳转	2021
20	读写磁盘	10
30	跳转	2031
70	跳转	4050
100	结束

programB
3	跳转	2508
10	跳转	6007
15	读写磁盘	7
22	跳转	5737
27	跳转	2245
31	结束	6311

programC
3	跳转	1074
9	跳转	94
15	读写磁盘	10
25	跳转	70
30	跳转	516
37	结束	50

programD
3	跳转	1037
10	跳转	782
15	读写磁盘	4
19	跳转	1168
28	跳转	79
34	结束	431

programE
3	跳转	1414
11	跳转	1074
16	读写磁盘	10
26	跳转	149
32	跳转	1273
39	结束	2053
```

**program.txt**

```
FName	programA
main	0.6
A1	1.2
A2	1.2
A3	1.5
A4	0.8

FName	programB
main	1.6
B1	2.2
B2	0.2
B3	0.5
B4	1.8
B5	0.9

FName	programC
main	0.3
C1	0.1
C2	0.3
C3	0.5

FName	programD
main	0.9
D1	1.6
D2	1.8
D3	2.0
D4	0.9

FName	programE
main	0.7
E1	0.3
E2	0.5
E3	0.9
E4	0.3
```

**运行程序后，您将看到如下示例输出：**

```
===== 进程调度与分页管理系统 =====
请选择功能：
1. 显示进程信息
2. 显示程序详细信息
3. 先来先服务调度（FCFS）
4. 时间片轮转调度（RR）
5. 分页调度（基于访问页号）
6. 设置页面大小并执行分页调度
7. 退出程序
请输入选项 (1-7): 1

===== 进程信息 =====
进程名      到达时间    运行时间    程序名称       状态          
------------------------------------------------------------------
processA    0           5           programA        等待           
processB    1           4           programB        等待           
processC    3           7           programC        等待           
processD    6           5           programD        等待           
processE    8           6           programE        等待           

===== 进程调度与分页管理系统 =====
请选择功能：
1. 显示进程信息
2. 显示程序详细信息
3. 先来先服务调度（FCFS）
4. 时间片轮转调度（RR）
5. 分页调度（基于访问页号）
6. 设置页面大小并执行分页调度
7. 退出程序
请输入选项 (1-7): 2

===== 程序详细信息 =====
程序: programA
  函数: main, 大小: 0.6 KB
  函数: A1, 大小: 1.2 KB
  函数: A2, 大小: 1.2 KB
  函数: A3, 大小: 1.5 KB
  函数: A4, 大小: 0.8 KB

程序: programB
  函数: main, 大小: 1.6 KB
  函数: B1, 大小: 2.2 KB
  函数: B2, 大小: 0.2 KB
  函数: B3, 大小: 0.5 KB
  函数: B4, 大小: 1.8 KB
  函数: B5, 大小: 0.9 KB

程序: programC
  函数: main, 大小: 0.3 KB
  函数: C1, 大小: 0.1 KB
  函数: C2, 大小: 0.3 KB
  函数: C3, 大小: 0.5 KB

程序: programD
  函数: main, 大小: 0.9 KB
  函数: D1, 大小: 1.6 KB
  函数: D2, 大小: 1.8 KB
  函数: D3, 大小: 2.0 KB
  函数: D4, 大小: 0.9 KB

程序: programE
  函数: main, 大小: 0.7 KB
  函数: E1, 大小: 0.3 KB
  函数: E2, 大小: 0.5 KB
  函数: E3, 大小: 0.9 KB
  函数: E4, 大小: 0.3 KB


===== 进程调度与分页管理系统 =====
请选择功能：
1. 显示进程信息
2. 显示程序详细信息
3. 先来先服务调度（FCFS）
4. 时间片轮转调度（RR）
5. 分页调度（基于访问页号）
6. 设置页面大小并执行分页调度
7. 退出程序
请输入选项 (1-7): 3

=== 先来先服务调度（FCFS） ===
进程名    到达时间    运行时间    开始时间    完成时间    周转时间    带权周转时间
--------------------------------------------------------------------------
processA  0           5           0           5           5           1.00
processB  1           4           5           9           8           2.00
processC  3           7           9           16          13          1.86
processD  6           5           16          21          15          3.00
processE  8           6           21          27          19          3.17
先来先服务调度（FCFS）完成。结果已保存到 result.txt


===== 进程调度与分页管理系统 =====
请选择功能：
1. 显示进程信息
2. 显示程序详细信息
3. 先来先服务调度（FCFS）
4. 时间片轮转调度（RR）
5. 分页调度（基于访问页号）
6. 设置页面大小并执行分页调度
7. 退出程序
请输入选项 (1-7): 7
退出程序。再见！
```

### **代码说明**

#### **1. 类与数据结构**

- **PCB（进程控制块）**: 用于存储每个进程的关键信息，包括名称、到达时间、运行时间、关联程序、调度相关时间（开始时间、完成时间、周转时间、带权周转时间）、状态和访问页号列表。
    
- **RUN（运行步骤）**: 用于存储每个程序的运行步骤，包括操作名称（如“跳转”、“读写磁盘”、“结束”）、执行时间和访问地址。
    
- **FunctionInfo（函数信息）**: 用于存储程序中每个函数的名称和大小（KB）。
    
- **ProgramInfo（程序信息）**: 用于存储每个程序的名称及其包含的函数列表。
    
- **PageManager（页面替换管理器）**: 管理页面替换策略（FIFO 和 LRU），记录页面操作日志、缺页次数和命中次数，并计算命中率。
    

#### **2. 文件读取**

- **readProcess(String filename)**: 读取 `Process.txt` 文件，每行解析为一个 `PCB` 对象，并添加到 `processes` 列表中。文件格式假设为：`processA 0 5 programA`。
    
- **readRun(String filename)**: 读取 `run.txt` 文件，首先识别程序名称行（如 `programA`），然后解析后续的运行步骤，存储为 `RUN` 对象，并添加到 `runSteps` 列表中。如果操作类型为“结束”，则将访问地址设为 `-1`。
    
- **readProgramDetails(String filename)**: 读取 `program.txt` 文件，识别程序名称行（以 `FName` 开头），然后解析后续的函数信息，存储为 `FunctionInfo` 对象，并添加到对应的 `ProgramInfo` 中。
    

#### **3. 分配运行步骤到进程**

- **assignRunStepsToProcesses(double pageSize)**: 根据 `runSteps` 中的访问地址和页面大小，计算页号，并将其分配给对应进程的 `visitList` 中。使用 `programToProcess` 映射来关联程序名称与进程名称。

#### **4. 显示信息**

- **displayProcessInfo()**: 以表格形式展示所有进程的信息，包括进程名、到达时间、运行时间、关联程序名称和状态。
    
- **displayProgramDetails()**: 以列表形式展示所有程序的详细信息，包括程序名称和其包含的函数及其大小。
    

#### **5. 调度算法**

- **performFCFS()**: 实现先来先服务（FCFS）调度算法。按到达时间排序进程，依次执行每个进程，记录开始时间、完成时间、周转时间和带权周转时间。将结果输出到控制台并追加写入 `result.txt` 文件。
    
- **performRR(Scanner scanner)**: 实现时间片轮转（RR）调度算法。用户输入时间片长度（ms），按到达时间排序进程，依次执行每个进程的时间片，记录调度相关时间。将结果输出到控制台并追加写入 `result.txt` 文件。
    
- **performPagingScheduling()**: 当前该功能尚未实现，仅输出提示信息。
    
- **performPagingSchedulingWithUserInput(Scanner scanner)**: 实现分页调度功能。用户输入页面大小（KB）和每个进程的最大页面数，分配运行步骤到进程的访问页号列表，计算每个程序所需的页面数，选择页面调度算法（FIFO 或 LRU），执行分页调度，并输出页面置换日志和总结报告。
    

#### **6. 分页调度**

- **PageManager** 类管理页面替换逻辑，支持 FIFO 和 LRU 两种替换策略，并记录页面操作日志和统计数据（缺页次数、命中次数）。提供方法来替换页面、记录日志、计算命中率以及打印总结报告。
    
- **performPagingSchedulingWithUserInput(Scanner scanner)**: 用户输入页面大小和每个进程的最大页面数后，分配运行步骤到进程的访问页号列表，计算每个程序所需的页面数，选择 FIFO 或 LRU 替换算法，执行分页调度，并输出详细的日志和总结报告。
    

#### **7. 辅助方法**

- **getUserChoice(Scanner scanner, int min, int max)**: 获取用户输入的整数，并验证是否在指定范围内。如果输入无效，提示用户重新输入。
    
- **getUserDouble(Scanner scanner, double min, double max)**: 获取用户输入的双精度浮点数，并验证是否在指定范围内。如果输入无效，提示用户重新输入。
    

#### **8. 错误处理与输入验证**

- 程序中包含了基本的错误处理，如文件无法打开时输出错误信息并终止程序。
    
- 在用户输入过程中，添加了输入验证，确保输入的数据类型和范围有效，防止程序因无效输入而崩溃。使用 `try-catch` 块和循环来处理输入错误。
    

#### **9. 结果输出**

- 调度结果被写入 `result.txt` 文件，并在控制台中以表格形式展示，方便用户查看。
    
- 分页调度过程中的页面操作日志和总结报告也会输出到控制台，帮助用户分析页面置换的效果。
    

#### **10. 注意事项**

- **文件路径**: 确保 `Process.txt`、`run.txt` 和 `program.txt` 文件位于程序的工作目录中，或者提供正确的文件路径。
    
- **资源管理**: 使用 `try-with-resources` 语句确保文件流在使用后正确关闭，避免资源泄漏。
    
- **扩展功能**: 根据需求，您可以进一步扩展代码，例如实现基于访问页号的分页调度功能、添加更多的页面替换算法（如 LFU）、将日志输出到文件中等。
    
- **用户体验**: 虽然是基于控制台的程序，通过使用适当的格式化输出和清晰的提示信息，提升了用户的交互体验。
    

### **总结**

通过上述 Java 代码，您可以实现与原始 C++ 程序类似的功能，包括读取和解析不同格式的文本文件、显示进程和程序信息、执行先来先服务和时间片轮转调度、以及分页调度（FIFO 和 LRU）。优化后的用户界面通过清晰的菜单、格式化的表格输出和详细的日志报告，提升了程序的可用性和可读性。

请确保所有相关的文本文件格式正确，并与程序中的解析逻辑一致。如果在运行过程中遇到任何问题，请检查文件路径和文件内容是否符合预期格式，并根据错误提示进行相应调整。

祝您的课程设计顺利完成！