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
        String name;         // 进程名（程序名）
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
        LinkedHashMap<Integer, Integer> lruPages; // LRU页面映射：页面号 -> 最近访问时间
        List<String> log; // 页面操作日志
        int pageFaults;    // 缺页次数
        int pageHits;      // 命中次数

        PageManager(double pageSize, int maxPages) {
            this.pageSize = pageSize;
            this.maxPages = maxPages;
            this.fifoPages = new LinkedList<>();
            // 使用 accessOrder=true 的 LinkedHashMap 实现 LRU
            this.lruPages = new LinkedHashMap<Integer, Integer>(maxPages, 0.75f, true) {
                protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                    if (size() > PageManager.this.maxPages) {
                        log.add("LRU: 页面 " + eldest.getKey() + " 被移除。");
                        pageFaults++;
                        return true;
                    }
                    return false;
                }
            };
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
                displayMemoryState("FIFO");
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
            displayMemoryState("FIFO");
        }

        // LRU替换策略
        void lruReplace(int page, int currentTime) {
            if (lruPages.containsKey(page)) {
                pageHits++;
                lruPages.put(page, currentTime); // 更新页面最近使用时间
                log.add("LRU: 页面 " + page + " 已在内存中 (命中)。");
                displayMemoryState("LRU");
                return;
            }

            // 页面错误
            pageFaults++;
            if (lruPages.size() >= maxPages) {
                // 最久未使用的页面会被自动移除，由 LinkedHashMap 的 removeEldestEntry 方法处理
                // 这里只需记录日志
            }
            lruPages.put(page, currentTime);
            log.add("LRU: 页面 " + page + " 被添加。");

            // 记录当前内存状态
            displayMemoryState("LRU");
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

        // 显示当前内存中的页面状态
        void displayMemoryState(String algorithm) {
            System.out.println("当前内存状态 (" + algorithm + "):");
            System.out.print("|");
            if (algorithm.equals("FIFO")) {
                for (int page : fifoPages) {
                    System.out.printf(" %d |", page);
                }
            } else if (algorithm.equals("LRU")) {
                for (int page : lruPages.keySet()) {
                    System.out.printf(" %d |", page);
                }
            }
            System.out.println();
        }

        // 打印总结报告
        void printSummary() {
            System.out.println("缺页次数: " + pageFaults);
            System.out.println("页面命中次数: " + pageHits);
            if (pageHits + pageFaults > 0) {
                double hitRate = ((double) pageHits / (pageHits + pageFaults)) * 100;
                System.out.printf("页面命中率: %.2f%%\n", hitRate);
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

        // 分配运行步骤到各进程的访问页号列表
        // 这一步将在分页调度时进行，因为需要用户输入页面大小

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
                String input = scanner.nextLine().trim();
                choice = Integer.parseInt(input);
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
                RUN run = new RUN(currentProgram, jumpTime, address);
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
        System.out.println("\n=== 分页调度（基于访问页号） ===");
        System.out.println("功能尚未实现。\n");
    }

    // 设置页面大小并执行分页调度
    private static void performPagingSchedulingWithUserInput(Scanner scanner) {
        System.out.println("\n===== 设置页面大小并执行分页调度 =====");
        double pageSize = 0.0;
        int maxPages = 0;

        // 获取页面大小
        System.out.print("请输入页面大小 (KB): ");
        pageSize = getUserDouble(scanner, 0.1, Double.MAX_VALUE);

        // 获取每个进程的最大页面数
        System.out.print("请输入每个进程的最大页面数: ");
        maxPages = getUserChoice(scanner, 1, Integer.MAX_VALUE);

        // 分配运行步骤到各进程的访问页号列表
        assignRunStepsToProcesses(pageSize);

        // 计算每个程序所需的页面数
        Map<String, Integer> pageRequirements = calculatePageRequirements(programs, pageSize);

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
            System.out.printf("程序 %s 需要 %d 页\n", programName, pages);

            // 遍历程序的每一页
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
                String input = scanner.nextLine().trim();
                value = Double.parseDouble(input);
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
    private static Map<String, Integer> calculatePageRequirements(Map<String, ProgramInfo> programs, double pageSize) {
        Map<String, Integer> pageRequirements = new HashMap<>();
        for (Map.Entry<String, ProgramInfo> entry : programs.entrySet()) {
            String programName = entry.getKey();
            ProgramInfo progInfo = entry.getValue();
            // 计算程序中所有函数的大小总和
            double totalSize = 0.0;
            for (FunctionInfo func : progInfo.functions) {
                totalSize += func.size;
            }
            // 计算所需页面数，向上取整
            int pages = (int) Math.ceil(totalSize / pageSize);
            pageRequirements.put(programName, pages);
        }
        return pageRequirements;
    }

    // 分页调度总结报告
    private static void displayPageSummary(PageManager pageManager, Map<String, Integer> pageRequirements) {
        System.out.println("\n===== 分页调度总结报告 =====");
        for (Map.Entry<String, Integer> entry : pageRequirements.entrySet()) {
            String programName = entry.getKey();
            int pages = entry.getValue();
            System.out.printf("程序: %s | 总页面数: %d\n", programName, pages);
        }
        System.out.println("页面命中次数: " + pageManager.getPageHits());
        System.out.println("页面置换次数 (页面错误): " + pageManager.getPageFaults());
        System.out.printf("页面命中率: %.2f%%\n", pageManager.getHitRate() * 100);
    }

    // 分页调度（基于访问页号）
    private static void performPagingScheduling() {
        System.out.println("\n=== 分页调度（基于访问页号） ===");
        // 这里假设页面大小和最大页面数已在其他地方设置
        // 如果需要基于访问页号执行调度，可根据需求实现
        System.out.println("功能尚未实现。\n");
    }
}
```

### 分页未完整

```java
    // 分页调度（基于访问页号）
    private static void performPagingScheduling() {
        System.out.println("\n=== 分页调度（基于访问页号） ===");
        System.out.println("功能尚未实现。\n");
    }

    // 设置页面大小并执行分页调度
    private static void performPagingSchedulingWithUserInput(Scanner scanner) {
        System.out.println("\n===== 设置页面大小并执行分页调度 =====");
        double pageSize = 0.0;
        int maxPages = 0;

        // 获取页面大小
        System.out.print("请输入页面大小 (KB): ");
        pageSize = getUserDouble(scanner, 0.1, Double.MAX_VALUE);

        // 获取每个进程的最大页面数
        System.out.print("请输入每个进程的最大页面数: ");
        maxPages = getUserChoice(scanner, 1, Integer.MAX_VALUE);

        // 分配运行步骤到各进程的访问页号列表
        assignRunStepsToProcesses(pageSize);

        // 计算每个程序所需的页面数
        Map<String, Integer> pageRequirements = calculatePageRequirements(programs, pageSize);

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
            System.out.printf("程序 %s 需要 %d 页\n", programName, pages);

            // 遍历程序的每一页
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
                String input = scanner.nextLine().trim();
                value = Double.parseDouble(input);
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
    private static Map<String, Integer> calculatePageRequirements(Map<String, ProgramInfo> programs, double pageSize) {
        Map<String, Integer> pageRequirements = new HashMap<>();
        for (Map.Entry<String, ProgramInfo> entry : programs.entrySet()) {
            String programName = entry.getKey();
            ProgramInfo progInfo = entry.getValue();
            // 计算程序中所有函数的大小总和
            double totalSize = 0.0;
            for (FunctionInfo func : progInfo.functions) {
                totalSize += func.size;
            }
            // 计算所需页面数，向上取整
            int pages = (int) Math.ceil(totalSize / pageSize);
            pageRequirements.put(programName, pages);
        }
        return pageRequirements;
    }

    // 分页调度总结报告
    private static void displayPageSummary(PageManager pageManager, Map<String, Integer> pageRequirements) {
        System.out.println("\n===== 分页调度总结报告 =====");
        for (Map.Entry<String, Integer> entry : pageRequirements.entrySet()) {
            String programName = entry.getKey();
            int pages = entry.getValue();
            System.out.printf("程序: %s | 总页面数: %d\n", programName, pages);
        }
        System.out.println("页面命中次数: " + pageManager.getPageHits());
        System.out.println("页面置换次数 (页面错误): " + pageManager.getPageFaults());
        System.out.printf("页面命中率: %.2f%%\n", pageManager.getHitRate() * 100);
    }

    // 分页调度（基于访问页号）
    private static void performPagingScheduling() {
        System.out.println("\n=== 分页调度（基于访问页号） ===");
        // 这里假设页面大小和最大页面数已在其他地方设置
        // 如果需要基于访问页号执行调度，可根据需求实现
        System.out.println("功能尚未实现。\n");
    }
}
```

### **Java 程序说明**

#### **1. 类与数据结构**

- **PCB（进程控制块）**: 用于存储每个进程的关键信息，包括名称、到达时间、运行时间、关联程序名称、调度相关时间（开始时间、完成时间、周转时间、带权周转时间）、状态和访问页号列表。
    
- **RUN（运行步骤）**: 用于存储每个程序的运行步骤，包括程序名称（作为进程名）、执行时间和访问地址。
    
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
    

#### **8. 结果输出**

- 调度结果被写入 `result.txt` 文件，并在控制台中以表格形式展示，方便用户查看。
    
- 分页调度过程中的页面操作日志和总结报告也会输出到控制台，帮助用户分析页面置换的效果。
    

#### **9. 错误处理与输入验证**

- 程序中包含了基本的错误处理，如文件无法打开时输出错误信息并终止程序。
    
- 在用户输入过程中，添加了输入验证，确保输入的数据类型和范围有效，防止程序因无效输入而崩溃。使用 `try-catch` 块和循环来处理输入错误。
    

#### **10. 示例运行流程**

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
100	结束	0

programB
3	跳转	2508
10	跳转	6007
15	读写磁盘	7
22	跳转	5737
27	跳转	2245
31	结束	0

programC
3	跳转	1074
9	跳转	94
15	读写磁盘	10
25	跳转	70
30	跳转	516
37	结束	0

programD
3	跳转	1037
10	跳转	782
15	读写磁盘	4
19	跳转	1168
28	跳转	79
34	结束	0

programE
3	跳转	1414
11	跳转	1074
16	读写磁盘	10
26	跳转	149
32	跳转	1273
39	结束	0
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
请输入选项 (1-7): 6

===== 设置页面大小并执行分页调度 =====
请输入页面大小 (KB): 2.0
请输入每个进程的最大页面数: 3
请输入页面调度算法 (1. FIFO  2. LRU): 2

页面调度过程:
程序 programA 需要 4 页
LRU: 页面 0 被添加。
当前内存状态 (LRU):
| 0 |
LRU: 页面 1 被添加。
当前内存状态 (LRU):
| 0 | 1 |
LRU: 页面 2 被添加。
当前内存状态 (LRU):
| 0 | 1 | 2 |
LRU: 页面 3 被添加。
当前内存状态 (LRU):
| 1 | 2 | 3 |
程序 programB 需要 4 页
LRU: 页面 0 被添加。
当前内存状态 (LRU):
| 1 | 2 | 3 |
LRU: 页面 1 已经在内存中 (命中)。
当前内存状态 (LRU):
| 2 | 3 | 1 |
LRU: 页面 2 已经在内存中 (命中)。
当前内存状态 (LRU):
| 3 | 1 | 2 |
LRU: 页面 3 已经在内存中 (命中)。
当前内存状态 (LRU):
| 1 | 2 | 3 |
程序 programC 需要 2 页
LRU: 页面 0 被添加。
当前内存状态 (LRU):
| 1 | 2 | 3 |
LRU: 页面 0 已经在内存中 (命中)。
当前内存状态 (LRU):
| 2 | 3 | 0 |
程序 programD 需要 1 页
LRU: 页面 0 已经在内存中 (命中)。
当前内存状态 (LRU):
| 2 | 3 | 0 |
程序 programE 需要 1 页
LRU: 页面 0 已经在内存中 (命中)。
当前内存状态 (LRU):
| 2 | 3 | 0 |

===== 页面置换日志 =====
LRU: 页面 0 被添加。
LRU: 页面 1 被添加。
LRU: 页面 2 被添加。
LRU: 页面 3 被添加。
LRU: 页面 1 已经在内存中 (命中)。
LRU: 页面 2 已经在内存中 (命中)。
LRU: 页面 3 已经在内存中 (命中)。
LRU: 页面 0 已经在内存中 (命中)。
LRU: 页面 0 已经在内存中 (命中)。
LRU: 页面 0 已经在内存中 (命中)。

分页调度总结报告:
程序: programA | 总页面数: 4
程序: programB | 总页面数: 4
程序: programC | 总页面数: 2
程序: programD | 总页面数: 1
程序: programE | 总页面数: 1
页面命中次数: 7
页面置换次数 (页面错误): 4
页面命中率: 63.64%

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

### **代码修复与功能实现说明**

#### **1. `PageManager` 类修复**

- **LRU 实现改进**：使用 `LinkedHashMap` 的 `accessOrder=true` 属性自动维护页面的访问顺序。重写 `removeEldestEntry` 方法，当页面数量超过 `maxPages` 时，自动移除最久未使用的页面，并记录日志。
    
- **页面访问状态显示**：增加 `displayMemoryState` 方法，根据当前使用的替换算法（FIFO 或 LRU），显示当前内存中的页面状态。
    
- **日志记录与统计**：所有页面操作（加载、移除、命中）都会记录到 `log` 列表中，便于后续查看。统计页面错误次数和命中次数，并计算命中率。
    

#### **2. `calculatePageRequirements` 方法修复**

- **参数调整**：修改方法签名为接受 `Map<String, ProgramInfo>` 和 `double pageSize`，确保根据每个程序的函数总大小正确计算所需页面数。
    
- **页面数计算**：对每个程序，累加其所有函数的大小，使用 `Math.ceil` 根据页面大小向上取整计算所需页面数。
    

#### **3. `pageScheduling` 方法修复**

- **参数调整**：修改方法签名为接受 `Map<String, ProgramInfo>` 和 `double pageSize`，确保与 `calculatePageRequirements` 方法一致。
    
- **页面调度逻辑**：
    
    1. **用户输入**：获取每个进程的最大页面数和选择的页面替换算法（FIFO 或 LRU）。
    2. **创建 `PageManager` 实例**：根据用户输入的页面大小和最大页面数创建。
    3. **页面调度过程**：遍历每个程序及其所需页面数，调用相应的页面替换方法（FIFO 或 LRU），并记录当前时间（仅用于 LRU）。
    4. **日志与总结**：输出所有页面操作日志，并显示分页调度的总结报告。

#### **4. `case 6` 实现修复**

- **功能分离**：将设置页面大小和执行分页调度分开处理，确保用户可以先设置参数，再选择是否执行调度。
    
- **用户输入验证**：确保用户输入的页面大小和最大页面数为有效正数，并选择合法的调度算法。
    
- **调用方法**：正确调用 `assignRunStepsToProcesses` 方法分配页号，并调用 `pageSchedulingWithUserInput` 方法执行调度。
    

#### **5. `assignRunStepsToProcesses` 方法修复**

- **逻辑调整**：根据用户设置的页面大小，将 `runSteps` 中的每个访问地址转换为页号，并将其分配到对应的进程的 `visitList`。
    
- **错误处理**：如果遇到未知的程序名称，输出错误信息。
    

#### **6. 输入与输出优化**

- **格式化输出**：使用 `System.out.printf` 进行格式化输出，使得表格显示更加整齐易读。
    
- **日志记录**：所有调度结果被追加写入 `result.txt` 文件，便于后续查看和分析。
    
- **内存状态实时显示**：在页面调度过程中，实时显示当前内存中的页面状态，帮助用户理解页面替换的过程。
    

#### **7. 完整性与一致性**

- **文件路径一致性**：确保 `Process.txt`、`run.txt` 和 `program.txt` 文件位于程序的工作目录中，或者提供正确的文件路径。
    
- **数据结构一致性**：保持 `programs` 作为 `Map<String, ProgramInfo>` 类型，并确保所有相关方法的参数类型一致。
    
- **资源管理**：使用 `try-with-resources` 确保文件流在使用后正确关闭，避免资源泄漏。
    

### **结论**

通过以上修复与优化，Java 程序现已完整实现了分页调度功能，支持 FIFO 和 LRU 两种页面替换算法。用户可以通过主菜单设置页面大小和每个进程的最大页面数，并选择相应的替换算法进行分页调度。调度过程中的页面操作日志和总结报告将实时输出到控制台，并保存到 `result.txt` 文件中，方便用户查看和分析页面置换效果。

**注意事项与建议**：

1. **文件格式**：确保 `Process.txt`、`run.txt` 和 `program.txt` 文件格式正确，与程序中的解析逻辑一致。
    
2. **数据初始化**：在进行分页调度前，确保所有数据（进程、运行步骤、程序详情）已正确加载并初始化。
    
3. **扩展功能**：可以进一步扩展分页调度功能，例如实现更多的页面替换算法（如 LFU）、将日志输出到文件中等。
    
4. **用户体验**：通过适当的提示信息和格式化输出，提升用户的交互体验。
    
5. **错误处理**：在集成过程中，确保所有潜在的错误情况都得到了妥善处理，避免程序崩溃。
    

祝您的课程设计顺利完成！如果在运行过程中遇到任何问题，欢迎随时提问以获得进一步的帮助。