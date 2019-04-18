##### 自动判断程序是否在运行
    #include<windows.h>
    #include <iostream>
    #include <stdlib.h>
    #include<tlhelp32.h> 
    using namespace std;
    int GetProcessCount(const TCHAR* szExeName)
    {
    	// TCHAR C++支持两种字符串，即常规的ANSI编码（使用""包裹）和Unicode编码（使用L""包裹）
    	// MAX_PATH是C语言运行时库中通过#define指令定义的一个宏常量，它定义了编译器所支持的最长全路径名的长度。
    	TCHAR sztarget[MAX_PATH];
    	// lstrcpy 是windows API 函数其他的都是C库函数,既能作用于ASCII又能用于UNICODE
    	// 把szExeName赋值给sztarget.
    	lstrcpy(sztarget, szExeName);
    	// CharLowerBuff 将大写的字符串对应个数转换为小写
    	// sztarget是以空为结尾的字符串或者单个字符     MAX_PATH是需要转换的字符个数
    	CharLowerBuff(sztarget, MAX_PATH);
    
    	// Process32First指向第一个进程信息，并将进程信息抽取到PROCESSENTRY32中。用 Process32Next指向下一条进程信息。
    	int count = 0;
    	PROCESSENTRY32 my;
    	HANDLE l = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    	if (((int)l) != -1)
    	{
    		my.dwSize = sizeof(my);
    		if (Process32First(l, &my))
    		{
    			do
    			{
    				CharLowerBuff(my.szExeFile, MAX_PATH);
    				if (lstrcmp(sztarget, my.szExeFile) == 0)
    				{
    					count++;
    				}
    			} while (Process32Next(l, &my));
    		}
    		CloseHandle(l);
    	}
    
    	return count;
    }
    int main(int argc, char*argv[])
    {
    #ifdef UNICODE
    	if (GetProcessCount(L"nginx.exe") > 0)  
    #else
    	if (GetProcessCount("nginx.exe") > 0)
    #endif
    	{
    		cout << "Running!.." << endl;
    	}
    	else
    	{
    		cout << "Not Running!.." << endl;
    	}
    	return 0;
    }
    
##### 手动输入判断程序是否在运行