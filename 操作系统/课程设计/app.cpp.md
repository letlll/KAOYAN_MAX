```cpp
#include<vector>

#include<queue>

#include<fstream>

#include<iostream>

#include<sstream>

#include<cmath>

#include<Windows.h>

using namespace std;

  

const int ks = 2;     //主存页块

//进程

struct PCB {

    string pro_name;           //进程名称

    int start_time;           //到达时间

    int run_time;              //运行时间

    int first_time;             //开始运行时间

    int finish_time;              //结束时间

    int stop_time;                //阻塞时间

    int time_length;              //阻塞时长

    double daiquan_time;          //带权周转时间

    double zhouzhuan_time;        //周转时间

    int pro_time;                  //进程运行时间片

    string zt;                     //状态

    int zs_time;                 //阻塞时刻

    vector<int> visit_list;              //访问序列

    PCB() :pro_name(), start_time(), run_time(), finish_time(), stop_time(), time_length(), daiquan_time(), zt("等待"), zhouzhuan_time(), pro_time(0), visit_list() {}

};

  

struct RUN {

    int jump_time;           //执行时间

    double address;            //访问地址

    string name;          //进程名

};

struct Page {

    int page;

};

struct Queue {

    queue<Page> Q;

};

  

vector<PCB> ready, cpu, stop, que;

vector<int> ls;

vector<RUN> act;

//读取文件，将进程放入就绪队列

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

    /*for(vector<PCB>::iterator iter=que.begin();iter<que.end();){

        cout << "进程" << (*iter).pro_name;

        cout<<"  到达时间"<<(*iter).start_time;

        cout<<"  运行时间"<<(*iter).run_time;

        cout<<"  阻塞时间"<<(*iter).stop_time;

        cout<<"  阻塞时长"<<(*iter).time_length<<endl;

        iter++;

    }*/

  

}

  

void readRun() {

    ifstream read("run.txt");

    int flag = -1;                //设置结束标识

    while (true) {

        RUN as = RUN();

        read >> as.name >> as.jump_time >> as.address;

        if (as.jump_time == -1 && as.address == -1) {

            break;

        }

        else { act.push_back(as); }

    }

    /*for (vector<RUN>::iterator iter = act.begin(); iter<act.end();) {

        cout<<"进程"<<(*iter).name;

        cout<<"  跳转时间 "<<(*iter).jump_time;

        cout<<"  访问地址 "<<(*iter).address<<endl;

        iter++;

    }*/

}

void FCFS() {

    cout << "请输入页面大小" << endl;

    double page_size;

    cin >> page_size;

    int page;               //访问页号

    int time = 0;

    int a = 0;

    while (time != 242) {

        //Sleep(1);

        //system("cls");

        cout << "当前时刻：" << time << endl;

        cout << "CPU内进程：";

        //进程是否到达

        for (vector<PCB>::iterator iter = que.begin(); iter < que.end();) {

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

  

        //判断是否阻塞完

        if (!stop.empty()) {

            for (vector<PCB>::iterator iter = stop.begin(); iter < stop.end();) {

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

  

        //进程调度

        if (!ready.empty()) {

            vector<PCB>::iterator k = ready.begin();

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

  

        //进程执行

        if (!cpu.empty()) {

            cout << cpu.front().pro_name;

            cout << endl;

            for (int i = 0; i < que.size(); i++) {

                if (que[i].zt != "等待")cout << que[i].pro_name << que[i].zt << " ";

            }

            cout << endl << endl;

            cpu.front().pro_time++;

            //跳转

            for (vector<RUN>::iterator iter = act.begin(); iter < act.end();) {

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

            //阻塞

            if (cpu.front().pro_time == cpu.front().stop_time) {

                cpu.front().zs_time = time + 1;                               //阻塞时刻

                stop.push_back(cpu.front());

                for (int i = 0; i < que.size(); i++) {

                    if (cpu.front().pro_name == que[i].pro_name) {

                        que[i].zt = "阻塞";

                    }

                }

                cpu.erase(cpu.begin());

            }

  
  

            //结束

            if (!cpu.empty() && cpu.front().pro_time == cpu.front().run_time) {

  
  

                for (int i = 0; i < que.size(); i++) {

                    if (que[i].pro_name == cpu.front().pro_name) {

                        que[i].zt = "结束";

                        que[i].finish_time = time + 1;

                        que[i].zhouzhuan_time = cpu.front().finish_time - cpu.front().start_time;

                        que[i].daiquan_time = cpu.front().zhouzhuan_time / cpu.front().run_time;

  

                    }

                }

                cpu.erase(cpu.begin());

            }

        }

        else {

            cout << endl;

            for (int i = 0; i < que.size(); i++) {

                if (que[i].zt != "等待")cout << que[i].pro_name << que[i].zt << " ";

            }

            cout << endl << endl;

        }

  

        time++;

    }

}

  

//打印FIFO的页号

void printFIFO(queue<Page> Q) {

    for (int i = 0; i < ks; i++) {

        cout << Q.front().page << " ";

        Q.pop();

    }

    cout << endl;

}

  

//判断主存里是否已经存在  

bool exist(vector<int> ::iterator it, Queue Q1, Queue Q2) {

    Q2 = Q1;

    for (int i = 0; i < ks; i++) {

        if (Q2.Q.empty()) { return false; }

        if (*it == Q2.Q.front().page) {

            return true;

        }

        else {

            Q2.Q.pop();

        }

    }

    return false;

  

}

  

//主存页号

void FIFO(vector<int> visit, string N) {

    Queue Q1, Q2;//主存内的页号队列

    cout << N;

    cout << "页号序列\t";

    for (int i = 0; i < visit.size(); i++) {

        cout << visit[i] << " ";

    }

    cout << endl;

    cout << "——————————\n";

    cout << "FIFO算法\n\n";

    cout << "淘汰页面" << "\t" << "主存页面号\n";

    double count = 0;

    for (vector<int> ::iterator iter = visit.begin(); iter < visit.end();) {          //遍历访问次序

        if (!exist(iter, Q1, Q2)) {

            Page p1 = Page();

            p1.page = *iter;

            if (Q1.Q.size() < ks) {

                Q1.Q.push(p1);

            }

            else {

                count++;

                cout << Q1.Q.front().page << "\t";

                Q1.Q.pop();

                Q1.Q.push(p1);

                printFIFO(Q1.Q);

            }

  

        }

        iter++;

    }

  

    cout << "\n中断次数为：" << count + ks << "(包括在主存有空闲时的" << ks << "次缺页中断）" << endl;

    cout << "缺页中断率：" << (count + ks) / visit.size() * 100 << "%" << endl;

}

  

//打印LRU调度的页号

void printLRU(vector<int> zcyh) {

    for (vector<int> ::iterator iter = zcyh.begin(); iter < zcyh.end();) {

        cout << *iter << " ";

        iter++;

    }

    cout << endl;

}

  

bool have(vector<int> ::iterator it, vector<int> zcyh) {

    for (vector<int> ::iterator iter = zcyh.begin(); iter < zcyh.end();) {

        if (zcyh.empty()) { return false; }

        if (*it == *iter) {

            iter = zcyh.erase(iter);

            zcyh.push_back(*it);

            ls = zcyh;

            return true;

        }

        iter++;

    }

    return false;

}

  

void LRU(vector<int> visit) {

    vector<int>zcyh;

    cout << "\n——————————\n";

    cout << "LRU算法\n\n";

    cout << "淘汰页面" << "\t" << "主存页面号\n";

    double count = 0;

    for (vector<int> ::iterator iter = visit.begin(); iter < visit.end();) {

        if (!have(iter, zcyh)) {

            if (zcyh.size() < ks) {

                zcyh.push_back(*iter);

            }

            else {

                count++;

                vector<int> ::iterator first = zcyh.begin();

                cout << zcyh.front() << "\t";

                first = zcyh.erase(first);

                zcyh.push_back(*iter);

                printLRU(zcyh);

            }

        }

        else {

            zcyh = ls;

        }

        iter++;

    }

    cout << "\n中断次数为：" << count + ks << "(包括在主存有空闲时的" << ks << "次缺页中断）" << endl;

    cout << "缺页中断率：" << (count + ks) / visit.size() * 100 << "%" << endl;

}

  

void WRITE() {

    ofstream write("result.txt", ios::trunc);

    write << "\n到达时间        运行时间        开始时间        完成时间        周转时间        带权周转时间\n";

    for (int i = 0; i < que.size(); i++) {

        write << que[i].start_time << "     " << que[i].run_time << "       " << que[i].first_time << "     " << que[i].finish_time << "        " << que[i].zhouzhuan_time << "     " << que[i].daiquan_time << endl;

    }

}

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