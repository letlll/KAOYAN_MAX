### 文件格式及数据说明

以下是这三个文件的格式说明，以及如何添加或修改它们的数据。

---

#### **1. `process.txt` 文件**

**功能**：定义所有进程的信息，包括进程名称、创建时间、优先级和关联的程序名称。

**格式**：

```
<进程名称> <创建时间> <优先级> <程序名称>
```

**示例数据**：

```
P1 0 1 ProgramA
P2 2 2 ProgramB
P3 4 1 ProgramC
```

**字段说明**：

- **`<进程名称>`**：进程的名称（唯一标识）。
- **`<创建时间>`**：进程被创建的时间（整数，单位为毫秒）。
- **`<优先级>`**：进程的优先级（整数，数值越小优先级越高）。
- **`<程序名称>`**：进程运行的程序名（必须与`program.txt`中定义的程序名一致）。

**添加/修改数据说明**：

- **添加新进程**：新增一行，填写进程的名称、创建时间、优先级和关联的程序名称。
- **修改现有进程**：找到对应行并修改字段值，如更新创建时间或优先级。
- **注意**：关联的==程序名称==必须在`program.txt`中定义，否则程序会报错。

---

#### **2. `program.txt` 文件**

**功能**：定义每个程序的信息，包括程序名称和其包含的函数及函数大小。

**格式**：

```
文件名 <程序名称>
<函数名称> <函数大小>
...
```

**示例数据**：

```
文件名 ProgramA
func1 1.5
func2 2.0

文件名 ProgramB
func1 2.5
func2 3.0
func3 1.0

文件名 ProgramC
func1 1.0
func2 1.5
```

**字段说明**：

- **`文件名 <程序名称>`**：定义程序的名称（必须与`process.txt`中对应的程序名称一致）。
- **`<函数名称>`**：程序中某个函数的名称。
- **`<函数大小>`**：函数的大小（浮点数，单位为KB）。

**添加/修改数据说明**：

- **添加新程序**：
    - 添加一组以`文件名 <程序名称>`开头的程序信息。
    - 每个程序包含一到多个函数及其大小。
- **修改现有程序**：
    - 找到对应程序块，更新函数名或函数大小。
- **注意**：
    - 程序名称必须与`process.txt`中的`<程序名称>`对应。
    - 函数大小是一个浮点数，表示该函数占用的内存大小。

---

#### **3. `run.txt` 文件**

**功能**：定义程序的运行步骤和时间点，用于动态模拟CPU占用。

**格式**：

```
程序名 <程序名称>
<时间点> <操作描述>
...
```

**示例数据**：

```
程序名 ProgramA
1 Start func1
2 End func1
3 Start func2
5 End func2

程序名 ProgramB
2 Start func1
4 End func1
6 Start func2
8 End func2
10 Start func3
12 End func3

程序名 ProgramC
1 Start func1
3 End func1
4 Start func2
7 End func2
```

**字段说明**：

- **`程序名 <程序名称>`**：定义程序的名称（必须与`process.txt`中对应的程序名称一致）。
- **`<时间点>`**：操作发生的时间点（整数，单位为毫秒）。
- **`<操作描述>`**：
    - 描述程序执行的操作，如`Start func1`或`End func2`。

**添加/修改数据说明**：

- **添加新程序的运行步骤**：
    - 添加一组以`程序名 <程序名称>`开头的运行步骤。
    - 每个程序包含多个运行步骤，按时间点顺序排列。
- **修改现有运行步骤**：
    - 找到对应程序块，修改时间点或操作描述。
- **注意**：
    - 时间点必须是递增的（按运行顺序）。
    - 程序名称必须与`process.txt`和`program.txt`中对应的程序名称一致。

---

### **如何调整数据**

1. **确保一致性**：
    
    - 在`process.txt`、`program.txt`和`run.txt`中，程序名称必须保持一致。
    - 如果添加或修改程序，必须在三个文件中同步更新相关内容。
2. **验证数据格式**：
    
    - 避免空行或格式错误（例如，缺少字段、字段顺序错误等）。
    - 使用文本编辑器（如VS Code或Notepad++）以确保文件格式正确。
3. **调试建议**：
    
    - 在运行程序前，检查控制台的错误信息，确保所有程序名称、函数名和时间点都正确加载。

---

### **示例总结**

#### **Process.txt**

```
P1 0 1 ProgramA
P2 2 2 ProgramB
P3 4 1 ProgramC
P4 5 3 ProgramD
```

#### **Program.txt**

```
文件名 ProgramA
func1 1.5
func2 2.0

文件名 ProgramB
func1 2.5
func2 3.0
func3 1.0

文件名 ProgramC
func1 1.0
func2 1.5

文件名 ProgramD
func1 0.5
func2 2.5
```

#### **run.txt**

```
程序名 ProgramA
1 Start func1
2 End func1
3 Start func2
5 End func2

程序名 ProgramB
2 Start func1
4 End func1
6 Start func2
8 End func2
10 Start func3
12 End func3

程序名 ProgramC
1 Start func1
3 End func1
4 Start func2
7 End func2

程序名 ProgramD
5 Start func1
6 End func1
7 Start func2
9 End func2
```

---

### **提示**

- 数据文件设计必须保持逻辑性和一致性，以确保程序能够正确解析和运行。
- 在修改文件后，建议重新运行程序以验证数据是否正确加载。

如果需要进一步调整，随时告诉我！ 😊

[Click here to access our prompt library!](https://ko-fi.com/s/277d07bae3)


---

`Process. txt`

```tXT
AProgram	0	5	ProgramA
BProgram	1	4	ProgramB
CProgram	3	7	ProgramC
DProgram	6	5	ProgramD
EProgram	8	6	ProgramE
```


`program. txt`
```txt
文件名	ProgramA			
Main	0.6		
A1	1.2		
A2	1.2		
A3	1.5		
A4	0.8		

文件名	ProgramB				
Main	1.6		
B1	2.2		
B2	0.2		
B3	0.5		
B4	1.8		
B5	0.9		

文件名	ProgramC				
Main	0.3		
C1	0.1		
C2	0.3		
C3	0.5		

文件名	ProgramD				
Main	0.9		
D1	1.6		
D2	1.8		
D3	2.0		
D4	0.9		

文件名	ProgramE				
Main	0.7		
E1	0.3		
E2	0.5		
E3	0.9		
E4	0.3		
```

`run.txt`

```txt
程序名 ProgramA	
5	跳转	1021
10	跳转	2021
20	读写磁盘	10
30	跳转	2031
70	跳转	4050
100	结束

程序名 ProgramB		
3	跳转	2508
10	跳转	6007
15	读写磁盘	7
22	跳转	5737
27	跳转	2245
31	结束	6311

程序名 ProgramC		
3	跳转	1074
9	跳转	94
15	读写磁盘	10
25	跳转	70
30	跳转	516
37	结束	50

程序名 ProgramD		
3	跳转	1037
10	跳转	782
15	读写磁盘	4
19	跳转	1168
28	跳转	79
34	结束	431

程序名 ProgramE
3	跳转	1414
11	跳转	1074
16	读写磁盘	10
26	跳转	149
32	跳转	1273
39	结束	2053
```
