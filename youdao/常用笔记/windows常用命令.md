##### 解除端口占用
    1. 查看端口的pid
    netstat -ano|findstr "8081" 
    
    2. 通过pid查询进程名
    tasklist|findstr "2720"
    
    3. 杀死进程
    taskkill /f /t /im nginx.exe












	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
