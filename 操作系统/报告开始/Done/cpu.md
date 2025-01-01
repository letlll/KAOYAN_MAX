Simulating CPU Usage...
Reading line: [ProgramName ProgramA], Length: 20
Simulating Program: [ProgramA]
Reading line: [5        Jump    1021], Length: 11
Reading line: [10       Jump    2021], Length: 12
Reading line: [20       Start   10], Length: 11
Reading line: [30       Jump    2031], Length: 12
Reading line: [70       Jump    4050], Length: 12
Reading line: [100      End], Length: 7
Warning: Failed to parse run step line: 100     End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramB], Length: 20
Simulating Program: [ProgramB]
Reading line: [3        Jump    2508], Length: 11
Reading line: [10       Jump    6007], Length: 12
Reading line: [15       Start   7], Length: 10
Reading line: [22       Jump    5737], Length: 12
Reading line: [27       Jump    2245], Length: 12
Reading line: [31       End], Length: 6
Warning: Failed to parse run step line: 31      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramC], Length: 20
Simulating Program: [ProgramC]
Reading line: [3        Jump    1074], Length: 11
Reading line: [9        Jump    94], Length: 9
Reading line: [15       Start   10], Length: 11
Reading line: [25       Jump    70], Length: 10
Reading line: [30       Jump    516], Length: 11
Reading line: [37       End], Length: 6
Warning: Failed to parse run step line: 37      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramD], Length: 20
Simulating Program: [ProgramD]
Reading line: [3        Jump    1037], Length: 11
Reading line: [10       Jump    782], Length: 11
Reading line: [15       Start   4], Length: 10
Reading line: [19       Jump    1168], Length: 12
Reading line: [28       Jump    79], Length: 10
Reading line: [34       End], Length: 6
Warning: Failed to parse run step line: 34      End
Reading line: [], Length: 0
Reading line: [ProgramName ProgramE], Length: 20
Simulating Program: [ProgramE]
Reading line: [3        Jump    1414], Length: 11
Reading line: [11       Jump    1074], Length: 12
Reading line: [16       Start   10], Length: 11
Reading line: [26       Jump    149], Length: 11
Reading line: [32       Jump    1273], Length: 12
Reading line: [39       End], Length: 6
Warning: Failed to parse run step line: 39      End
Time: 3 ms, Operation: ProgramE Jump 1414
Time: 5 ms, Operation: ProgramA Jump 1021
Time: 9 ms, Operation: ProgramC Jump 94
Time: 10 ms, Operation: ProgramD Jump 782
Time: 11 ms, Operation: ProgramE Jump 1074
Time: 15 ms, Operation: ProgramD Start 4
Time: 16 ms, Operation: ProgramE Start 10
Time: 19 ms, Operation: ProgramD Jump 1168
Time: 20 ms, Operation: ProgramA Start 10
Time: 22 ms, Operation: ProgramB Jump 5737
Time: 25 ms, Operation: ProgramC Jump 70
Time: 26 ms, Operation: ProgramE Jump 149
Time: 27 ms, Operation: ProgramB Jump 2245
Time: 28 ms, Operation: ProgramD Jump 79
Time: 30 ms, Operation: ProgramC Jump 516
Time: 32 ms, Operation: ProgramE Jump 1273
Time: 70 ms, Operation: ProgramA Jump 4050
CPU Simulation Complete!