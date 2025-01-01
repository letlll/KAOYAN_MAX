```
void rrScheduling() {
    std::ofstream resultFile("result.txt", std::ios::app);
    if (!resultFile.is_open()) {
        std::cerr << "错误：无法打开 result.txt 进行结果保存" << std::endl;
        return;
    }

    std::queue<PCB*> processQueue;
    std::sort(processList.begin(), processList.end(), [](const PCB& a, const PCB& b) {
        return a.createTime < b.createTime;
    });

    int currentTime = 0;
    size_t index = 0; // Index for tracking processes to enqueue
    std::unordered_map<std::string, int> remainingTimeMap;

    // Initialize remaining times
    for (auto& process : processList) {
        remainingTimeMap[process.pName] = process.runTime;
    }

    // 输出表头
    resultFile << "时间片\t运行的进程\t";
    for (const auto& process : processList) {
        resultFile << "进程" << process.pName << "状态\t";
    }
    resultFile << "\n";

    // Main scheduling loop
    while (!processQueue.empty() || index < processList.size()) {
        // 如果队列为空，跳到下一个进程的创建时间
        if (processQueue.empty() && index < processList.size() && processList[index].createTime > currentTime) {
            currentTime = processList[index].createTime;
        }

        // 将当前时间的进程加入队列
        while (index < processList.size() && processList[index].createTime <= currentTime) {
            PCB* newProcess = &processList[index];
            processQueue.push(newProcess);
            resultFile << " 进程: " << newProcess->pName << " 在 " << currentTime << " ms 时被加入队列" << std::endl;
            index++;
        }

        // 如果队列仍为空，则当前时间加1继续
        if (processQueue.empty()) {
            currentTime++;
            continue;
        }

        // 从队列中取出一个进程
        PCB* currentProcess = processQueue.front();
        processQueue.pop();

        // 如果是第一次运行，设置开始时间
        if (currentProcess->startTime == -1) {
            currentProcess->startTime = currentTime;
        }

        // 执行时间片
        int execTime = std::min(1, remainingTimeMap[currentProcess->pName]);
        remainingTimeMap[currentProcess->pName] -= execTime;
        currentTime += execTime;

        // 输出当前时间片的状态
        resultFile << currentTime - execTime << "\t" << currentProcess->pName << "\t";

        for (const auto& process : processList) {
            if (process.pName == currentProcess->pName && remainingTimeMap[process.pName] > 0) {
                resultFile << "run\t"; // 当前运行的进程
            }
            else if (remainingTimeMap[process.pName] == 0) {
                resultFile << "complete\t"; // 已完成的进程
            }
            else if (process.createTime > currentTime - execTime) {
                resultFile << "null\t"; // 尚未到达的进程
            }
            else {
                resultFile << "ready\t"; // 已到达但未运行的进程
            }
        }
        resultFile << "\n";

        // 如果进程未完成，重新加入队列
        if (remainingTimeMap[currentProcess->pName] > 0) {
            processQueue.push(currentProcess);
        }
        else {
            // 完成的进程
            currentProcess->completeTime = currentTime;
            currentProcess->turnoverTime = currentProcess->completeTime - currentProcess->createTime;
            currentProcess->weightedTurnoverTime =
                static_cast<double>(currentProcess->turnoverTime) / currentProcess->originalRunTime;

            resultFile << "进程 " << currentProcess->pName << " 在 " << currentTime << " ms 完成 "
                       << "| 周转时间： " << currentProcess->turnoverTime
                       << " ms | 带权周转时间： " << std::fixed << std::setprecision(2)
                       << currentProcess->weightedTurnoverTime << std::endl;
        }
    }

    // 输出最终统计信息
    resultFile << "\n最终统计信息：\n";
    for (const auto& process : processList) {
        resultFile << "进程名称: " << process.pName
                   << ", 开始时间: " << process.startTime
                   << ", 完成时间: " << process.completeTime
                   << ", 周转时间: " << process.turnoverTime
                   << ", 带权周转时间: " << std::fixed << std::setprecision(2)
                   << process.weightedTurnoverTime << "\n";
    }

    resultFile.close();
    std::cout << "RR 调度完成，结果已保存到 result.txt" << std::endl;
}
```