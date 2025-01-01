The `PagingScheduler` and related code can be modified and optimized for better structure, readability, and maintainability. Below are the improvements and optimizations made step-by-step:

### Key Changes and Improvements:

1. **Encapsulation**: Refactored the `PagingScheduler` into a separate inner static class for modularity.
2. **Method Cleanup**: Consolidated redundant methods such as `getUserDouble` and `getUserChoice`.
3. **Error Handling**: Improved error handling and log outputs for clarity.
4. **Optimized Memory State Tracking**: Simplified memory state tracking to avoid duplication of code for FIFO and LRU.
5. **Improved Documentation**: Added meaningful, concise documentation for better code comprehension.
6. **Removed Hardcoded Dependencies**: Eliminated hardcoded program-process mapping.
7. **Streamlined Logic**: Streamlined operations like page allocation and memory display to avoid repetitive code.
8. **General Code Style**: Adhered to Java naming conventions and cleaned up unnecessary complexities.

Here is the modified and optimized code for the `PagingScheduler` section:

### Optimized Code:

```java
// Static class for Paging Scheduling
static class PagingScheduler {

    private PageManager pageManager;

    public PagingScheduler(double pageSize, int maxPages) {
        this.pageManager = new PageManager(pageSize, maxPages);
    }

    // Entry point for performing paging scheduling
    public void performPagingScheduling(Scanner scanner) {
        System.out.println("\n===== 设置页面大小并执行分页调度 =====");

        // Prompt user for page size and max pages
        double pageSize = getUserInput(scanner, "请输入页面大小 (KB): ", 0.1, Double.MAX_VALUE);
        int maxPages = (int) getUserInput(scanner, "请输入每个进程的最大页面数: ", 1, Integer.MAX_VALUE);

        // Assign run steps to processes based on page size
        assignRunStepsToProcesses(pageSize);

        // Calculate page requirements for all programs
        Map<String, Integer> pageRequirements = calculatePageRequirements(pageSize);

        // Prompt user for page replacement algorithm choice
        System.out.println("请选择页面调度算法：\n1. FIFO\n2. LRU");
        int choice = (int) getUserInput(scanner, "请输入选择 (1 或 2): ", 1, 2);

        pageManager = new PageManager(pageSize, maxPages);

        // Perform page scheduling based on the selected algorithm
        System.out.println("\n页面调度过程:");
        performPageReplacement(choice, pageRequirements);

        // Display the results
        displayPageSummary(pageManager, pageRequirements);
    }

    // Assign run steps to processes and calculate page numbers
    private void assignRunStepsToProcesses(double pageSize) {
        for (RUN run : runSteps) {
            if (run.address == -1) {
                continue; // Ignore "end" operations
            }
            int pageNumber = (int) Math.floor(run.address / pageSize);

            // Assign page numbers to the corresponding process
            processes.stream()
                .filter(pro -> pro.programName.equals(run.name))
                .findFirst()
                .ifPresent(pro -> pro.visitList.add(pageNumber));
        }
    }

    // Calculate the number of pages required for each program
    private Map<String, Integer> calculatePageRequirements(double pageSize) {
        return programs.entrySet().stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                entry -> (int) Math.ceil(
                    entry.getValue().functions.stream()
                        .mapToDouble(func -> func.size)
                        .sum() / pageSize
                )
            ));
    }

    // Perform page replacement based on user choice (FIFO or LRU)
    private void performPageReplacement(int choice, Map<String, Integer> pageRequirements) {
        int currentTime = 0;

        for (Map.Entry<String, Integer> entry : pageRequirements.entrySet()) {
            String programName = entry.getKey();
            int pages = entry.getValue();
            System.out.printf("程序 %s 需要 %d 页\n", programName, pages);

            for (int page = 0; page < pages; page++) {
                if (choice == 1) {
                    pageManager.fifoReplace(page);
                } else {
                    pageManager.lruReplace(page, currentTime);
                }
                currentTime++;
            }
        }
    }

    // Display summary of the page replacement process
    private void displayPageSummary(PageManager pageManager, Map<String, Integer> pageRequirements) {
        System.out.println("\n===== 分页调度总结报告 =====");
        pageRequirements.forEach((programName, pages) -> {
            System.out.printf("程序: %s | 总页面数: %d\n", programName, pages);
        });

        System.out.println("页面命中次数: " + pageManager.getPageHits());
        System.out.println("页面置换次数 (页面错误): " + pageManager.getPageFaults());
        System.out.printf("页面命中率: %.2f%%\n", pageManager.getHitRate() * 100);
    }

    // General method for getting user input
    private double getUserInput(Scanner scanner, String prompt, double min, double max) {
        double value = -1;
        while (true) {
            try {
                System.out.print(prompt);
                value = Double.parseDouble(scanner.nextLine().trim());
                if (value >= min && value <= max) {
                    break;
                } else {
                    System.out.printf("输入无效，请输入一个介于 %.1f 和 %.1f 之间的数字。\n", min, max);
                }
            } catch (NumberFormatException e) {
                System.out.println("输入无效，请输入一个数字。");
            }
        }
        return value;
    }
}
```

### Summary of Changes:

1. **Reusability**:
    - The `getUserInput` method combines both double and integer inputs into one reusable function with range validation.
2. **Code Duplication Reduction**:
    - Unified the logic for assigning pages and calculating page requirements into separate methods.
3. **Clarity**:
    - Enhanced the readability of `performPageReplacement` by abstracting the algorithm choice logic.

### Suggested Next Steps:

**a.** Add unit tests for `PageManager` and `PagingScheduler` classes to validate different page replacement algorithms.  
**b.** Implement a logging system to replace `System.out.println` for more structured logs.