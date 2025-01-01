以下是基于您要求的 Python 代码，用于生成类图、活动图、流程图和功能结构图。这些代码使用 Graphviz 库进行图形生成，同时注意了中文字符显示的问题。

---

### **1. 类图生成代码**

```python
from graphviz import Digraph

def generate_class_diagram():
    class_diagram = Digraph('ClassDiagram', format='png', node_attr={'shape': 'plaintext', 'fontname': 'SimHei'})
    
    class_diagram.node('OSystem', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>OSystem</B></TD></TR>
        <TR><TD>+ main()</TD></TR>
        <TR><TD>+ showMenu()</TD></TR>
        <TR><TD>+ performFCFS()</TD></TR>
        <TR><TD>+ performRR()</TD></TR>
    </TABLE>>''')

    class_diagram.node('PCB', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>PCB</B></TD></TR>
        <TR><TD>- proName: String</TD></TR>
        <TR><TD>- runTime: int</TD></TR>
        <TR><TD>- visitList: List&lt;Integer&gt;</TD></TR>
    </TABLE>>''')

    class_diagram.node('RUN', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>RUN</B></TD></TR>
        <TR><TD>- name: String</TD></TR>
        <TR><TD>- jumpTime: int</TD></TR>
    </TABLE>>''')

    class_diagram.node('FunctionInfo', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>FunctionInfo</B></TD></TR>
        <TR><TD>- funcName: String</TD></TR>
        <TR><TD>- size: double</TD></TR>
    </TABLE>>''')

    class_diagram.node('ProgramInfo', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>ProgramInfo</B></TD></TR>
        <TR><TD>- programName: String</TD></TR>
        <TR><TD>- functions: List&lt;FunctionInfo&gt;</TD></TR>
    </TABLE>>''')

    class_diagram.node('PageManager', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>PageManager</B></TD></TR>
        <TR><TD>- pageSize: double</TD></TR>
        <TR><TD>- fifoPages: Queue&lt;Integer&gt;</TD></TR>
        <TR><TD>- lruPages: LinkedHashMap&lt;Integer, Integer&gt;</TD></TR>
    </TABLE>>''')

    class_diagram.node('PagingScheduler', '''<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">
        <TR><TD COLSPAN="2"><B>PagingScheduler</B></TD></TR>
        <TR><TD>- pageManager: PageManager</TD></TR>
        <TR><TD>+ performPagingScheduling()</TD></TR>
    </TABLE>>''')

    class_diagram.edge('OSystem', 'PCB', label='关联')
    class_diagram.edge('OSystem', 'RUN', label='关联')
    class_diagram.edge('OSystem', 'FunctionInfo', label='关联')
    class_diagram.edge('OSystem', 'ProgramInfo', label='关联')
    class_diagram.edge('PagingScheduler', 'PageManager', label='使用')

    class_diagram.render('class_diagram', cleanup=True)
    print("类图生成完成：class_diagram.png")

generate_class_diagram()
```

---

### **2. 活动图生成代码**

```python
from graphviz import Digraph

def generate_activity_diagram():
    activity_diagram = Digraph('ActivityDiagram', format='png', node_attr={'fontname': 'SimHei'})

    # 添加节点
    activity_diagram.node('Start', '开始', shape='oval')
    activity_diagram.node('ReadFiles', '读取数据文件')
    activity_diagram.node('ShowMenu', '显示主菜单')
    activity_diagram.node('Option1', '显示进程信息')
    activity_diagram.node('Option2', '显示程序详细信息')
    activity_diagram.node('Option3', '执行先来先服务调度 (FCFS)')
    activity_diagram.node('Option4', '执行时间片轮转调度 (RR)')
    activity_diagram.node('Option5', '执行分页调度 (FIFO/LRU)')
    activity_diagram.node('SaveResults', '保存并打印结果')
    activity_diagram.node('Exit', '退出程序', shape='oval')

    # 添加边
    activity_diagram.edge('Start', 'ReadFiles')
    activity_diagram.edge('ReadFiles', 'ShowMenu')
    activity_diagram.edge('ShowMenu', 'Option1', label='选项 1')
    activity_diagram.edge('ShowMenu', 'Option2', label='选项 2')
    activity_diagram.edge('ShowMenu', 'Option3', label='选项 3')
    activity_diagram.edge('ShowMenu', 'Option4', label='选项 4')
    activity_diagram.edge('ShowMenu', 'Option5', label='选项 5')
    activity_diagram.edge('Option5', 'SaveResults')
    activity_diagram.edge('SaveResults', 'ShowMenu')
    activity_diagram.edge('ShowMenu', 'Exit', label='退出')

    activity_diagram.render('activity_diagram', cleanup=True)
    print("活动图生成完成：activity_diagram.png")

generate_activity_diagram()
```

---

### **3. 流程图生成代码**

```python
def generate_flow_diagram():
    flow_diagram = Digraph('FlowDiagram', format='png', node_attr={'fontname': 'SimHei'})

    # 添加节点
    flow_diagram.node('Start', '开始', shape='oval')
    flow_diagram.node('InputPage', '输入页面大小和最大页面数')
    flow_diagram.node('AssignPages', '分配页面给运行步骤')
    flow_diagram.node('CalcPages', '计算所需页面数量')
    flow_diagram.node('SelectAlgo', '选择调度算法 (FIFO/LRU)')
    flow_diagram.node('Execute', '执行页面调度')
    flow_diagram.node('Output', '输出命中率和日志')
    flow_diagram.node('End', '结束', shape='oval')

    # 添加边
    flow_diagram.edge('Start', 'InputPage')
    flow_diagram.edge('InputPage', 'AssignPages')
    flow_diagram.edge('AssignPages', 'CalcPages')
    flow_diagram.edge('CalcPages', 'SelectAlgo')
    flow_diagram.edge('SelectAlgo', 'Execute')
    flow_diagram.edge('Execute', 'Output')
    flow_diagram.edge('Output', 'End')

    flow_diagram.render('flow_diagram', cleanup=True)
    print("流程图生成完成：flow_diagram.png")

generate_flow_diagram()
```

---

### **4. 功能结构图生成代码**

```python
def generate_function_structure():
    function_structure = Digraph('FunctionStructure', format='png', node_attr={'fontname': 'SimHei'})

    # 添加功能模块
    function_structure.node('DataLoad', '数据加载模块')
    function_structure.node('Scheduling', '调度模块')
    function_structure.node('Output', '输出模块')

    # 添加功能细分
    function_structure.node('ReadProcess', '读取Process文件')
    function_structure.node('ReadRun', '读取Run文件')
    function_structure.node('ReadProgram', '读取Program文件')
    function_structure.node('FCFS', '先来先服务调度 (FCFS)')
    function_structure.node('RR', '时间片轮转调度 (RR)')
    function_structure.node('Paging', '分页调度')
    function_structure.node('SaveResults', '保存结果')

    # 建立关系
    function_structure.edge('DataLoad', 'ReadProcess')
    function_structure.edge('DataLoad', 'ReadRun')
    function_structure.edge('DataLoad', 'ReadProgram')
    function_structure.edge('Scheduling', 'FCFS')
    function_structure.edge('Scheduling', 'RR')
    function_structure.edge('Scheduling', 'Paging')
    function_structure.edge('Output', 'SaveResults')

    function_structure.render('function_structure', cleanup=True)
    print("功能结构图生成完成：function_structure.png")

generate_function_structure()
```

---

### **总结**

运行上述 Python 代码后，将生成以下图形文件：

- `class_diagram.png`：类图。
- `activity_diagram.png`：活动图。
- `flow_diagram.png`：流程图。
- `function_structure.png`：功能结构图。

这些图形可以很好地展示代码中的类关系、执行逻辑和模块功能。生成过程中需确保安装了 Graphviz，并设置支持中文显示的字体（如 `SimHei`）。