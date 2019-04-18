##### vbs
    ' 注释，获取ws shell
    Set ws = CreateObject("Wscript.Shell")
    ' 要打开的文件路径, 不支持中文输入
    fileUrl = "C:\xxx\xxx\xxx"
    ' 启动程序 可以写绝对路径，也可以写命令，0表示隐藏命令窗口执行
    ws.Run "node",0
    ' 暂停2s, 暂停是为了防止中间出现的bug
    wscript.sleep 2000
    ' 触发按键 ctrl + k 然后 ctrl + o
    ws.SendKeys "^k^o"
    wscript.sleep 1000
    ' 输出文件路径
    ws.SendKeys fileUrl
    wscript.sleep 1000
    ' 回车
    ws.SendKeys "{Enter}"
    wscript.sleep 1000
    ws.SendKeys "{Enter}"
    ' 启动vscode自带的cmd，先启动debug再切换cmd，防止cmd原本就打开
    ws.SendKeys "+^y"
    wscript.sleep 1000
    ws.SendKeys "^`"
    wscript.sleep 2000
    ' 启动node项目
    ws.SendKeys "npm run start"
    wscript.sleep 1000
    ws.SendKeys "{Enter}"
    ' 退出ws 注意：必须退出ws,因为在node的源码中有判断是否在ws中，如果开启，有可能项目启动失败
    wscript.Quit
    
    
##### 键盘按键
    对于需要与Shift、Ctrl、Alt三个控制键组合的按键，SendKeys使用特殊字符来表示： 
    1. 特殊功能键
    　　Shift---------WshShell.SendKeys "+" 
    　　Ctrl---------WshShell.SendKeys "^" 
    　　Alt---------WshShell.SendKeys "%"            (注意:这样使用时，不用大括号括起这些特殊字符。)
        　　由于“+”、“^”这些字符用来表示特殊的控制按键了，如何表示这些”字符”的按键呢？只要用大括号括住这些字符即可。例如: 要发送加号“+”，可使用“WshShell.SendKeys "{+}"” 
        　　
    2. 不会生成字符的按键用 {} 包裹
    另外对于一些不会生成字符的控制功能按键，也同样需要使用大括号括起来按键的名称。--如果发送是基本字符用“”括起来。
    例如要发送回车键，需要用“ WshShell.SendKeys "{ENTER}" ”表示；
    发送向下的方向键用“ Wshshell.SendKeys "{DOWN}" ”表示。 
    
    Space---------WshShell.SendKeys " " 
    Enter---------WshShell.SendKeys "{ENTER}" 
    ←---------WshShell.SendKeys "{RIGHT}" 
    ↑---------WshShell.SendKeys "{UP}" 
    F1---------WshShell.SendKeys "{F1}" 
    
    按键                代码    
    BACKSPACE     {BACKSPACE}, {BS}, 或 {BKSP}    
    BREAK         {BREAK}    
    CAPS LOCK     {CAPSLOCK}    
    DEL or Delete {Delete} 或 {DEL}    
    DOWN ARROW    {DOWN}    
    END           {END}    
    ENTER         {ENTER}或 ~    
    ESC           {ESC}    
    HELP          {HELP}    
    HOME          {HOME}    
    INS or Insert {Insert} 或 {INS}    
    LEFT ARROW    {LEFT}    
    NUM LOCK      {NUMLOCK}    
    PAGE DOWN     {PGDN}    
    PAGE UP       {PGUP}    
    PRINT SCREEN  {PRTSC}    
    RIGHT ARROW   {RIGHT}    
    SCROLL LOCK   {SCROLLLOCK}    
    TAB           {TAB}    
    UP ARROW      {UP}    
    F1 {F1}    
    F2 {F2}    
    F3 {F3}    
    F4 {F4}    
    F5 {F5}    
    F6 {F6}    
    F7 {F7}    
    F8 {F8}    
    F9 {F9}    
    F10 {F10}