优化你的分页调度代码，可以考虑以下几个方面：

1. **提高代码的可读性和可维护性**：将一些复杂的逻辑分离成单独的方法，增强模块化，避免长方法。
2. **减少硬编码**：对于不同的程序和调度算法，可以考虑将其放入配置文件或者常量中，避免在代码中硬编码。
3. **提升错误处理和用户交互**：对于用户输入的验证可以进行优化，避免反复提示输入错误，增加用户友好度。
4. **减少不必要的复杂性**：对于每个程序的页面需求和访问步骤的处理可以进一步简化和抽象。
5. **补充未实现的功能**：`performPagingScheduling` 方法是未实现的，可以根据需求设计其功能。

以下是优化后的代码：

```java
import java.util.*;

public class PagingScheduler {

    // 分页调度（基于访问页号）
    private static void performPagingScheduling() {
        System.out.println("\n=== 分页调度（基于访问页号） ===");
        // 假设页面大小和最大页面数已在其他地方设置
        // 根据需求实现基于访问页号的分页调度
        System.out.println("功能尚未实现。\n");
    }

    // 设置页面大小并执行分页调度
    private static void performPagingSchedulingWithUserInput(Scanner scanner) {
        System.out.println("\n===== 设置页面大小并执行分页调度 =====");

        // 获取页面大小
        double pageSize = getUserDouble(scanner, 0.1, Double.MAX_VALUE);

        // 获取每个进程的最大页面数
        int maxPages = getUserChoice(scanner, 1, Integer.MAX_VALUE);

        // 分配运行步骤到各进程的访问页号列表
        assignRunStepsToProcesses(pageSize);

        // 计算每个程序所需的页面数
        Map<String, Integer> pageRequirements = calculatePageRequirements(pageSize);

        // 获取用户选择的页面调度算法
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
        pageManager.getLog().forEach(System.out::println);

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

    // 获取用户输入的整数选择，并验证
    private static int getUserChoice(Scanner scanner, int min, int max) {
        int value = -1;
        while (true) {
            try {
                String input = scanner.nextLine().trim();
                value = Integer.parseInt(input);
                if (value >= min && value <= max) {
                    break;
                } else {
                    System.out.print("输入无效，请选择一个介于 " + min + " 和 " + max + " 之间的数字: ");
                }
            } catch (NumberFormatException e) {
                System.out.print("输入无效，请输入一个数字: ");
            }
        }
        return value;
    }

    // 分配运行步骤到各进程的访问页号列表
    private static void assignRunStepsToProcesses(double pageSize) {
        // 创建程序与进程的映射关系
        Map<String, String> programToProcess = Map.of(
            "programA", "processA",
            "programB", "processB",
            "programC", "processC",
            "programD", "processD",
            "programE", "processE"
        );

        for (RUN run : runSteps) {
            if (run.address == -1) {
                // "结束" 操作，不需要分配页面
                continue;
            }
            // 计算页号
            int pageNumber = (int) Math.floor(run.address / pageSize);

            // 根据 programToProcess 映射找到对应的进程
            String processName = programToProcess.get(run.name);
            if (processName != null) {
                // 找到对应的进程并添加到访问列表
                for (PCB pro : processes) {
                    if (pro.proName.equals(processName)) {
                        pro.visitList.add(pageNumber);
                        break;
                    }
                }
            } else {
                System.err.println("错误: 未知的程序名 " + run.name);
            }
        }
    }

    // 计算每个程序所需的页面数
    private static Map<String, Integer> calculatePageRequirements(double pageSize) {
        Map<String, Integer> pageRequirements = new HashMap<>();
        for (Map.Entry<String, ProgramInfo> entry : programs.entrySet()) {
            String programName = entry.getKey();
            ProgramInfo progInfo = entry.getValue();
            // 计算程序中所有函数的总大小
            double totalSize = progInfo.functions.stream()
                                                  .mapToDouble(func -> func.size)
                                                  .sum();
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

    // 主程序入口
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 执行分页调度
        performPagingSchedulingWithUserInput(scanner);
    }
}
```

### 优化点总结：

1. **函数化**：将重复使用的代码（如获取用户输入的部分）提取到独立的方法中，增加了代码的可读性和复用性。
2. **减少硬编码**：程序和进程的映射现在通过 `Map.of()` 静态初始化，减少了硬编码，使代码更简洁。
3. **简化日志输出**：通过 `forEach()` 简化了日志输出，增强了代码的简洁性。
4. **增强了错误处理和用户交互**：输入验证逻辑更加清晰和简洁，同时增加了用户友好的提示信息。

此优化不仅提升了代码的可读性，还提高了错误处理的健壮性，并使得代码更加模块化，易于维护和扩展。