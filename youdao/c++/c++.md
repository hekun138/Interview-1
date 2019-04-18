##### 初始化
    1. 复制初始化  
        int x = 1024;
        
    2. 直接初始化
        int x (1024);
        
##### 布尔值
    bool flag = true;
    if (flag) {
        
    } else {
        
    }
    
##### 数组
    int arr[4] = {1, 5, 7, 9}
    注意：数组无length属性
        
##### 输入 输出
    输入过程
        输入设备 ---> 输入流 ---> cin ---> 变量
        
    输出过程
        变量 ---> cout ---> 输出流 ---> 输出设备 

    输入 cin
        cint>>x;
        
    输出 cout
        cout<<x<<endl;
        cout<<"x+y="<<x+y<<endl;
        
    回车 endl(\n)
    
    例子1:
        #include <iostream>
        using namespace std;
        int main()
        {
        	int a=1;
        	int b(2);
        		
        	cout << "a+b=" << a+b << endl;
        
        	int c;
        	int d;
        	int e;
        	cin >> c >> d >> e;
        	cout << "c+d+e=" << c + d + e << endl;
        
        	return 0;
        }
        
    例子2:
        #include <iostream>
        #include <stdlib.h>
        using namespace std; // 告诉计算机使用上面两个头文件的命名空间, 否则报错
        
        int main()
        {
        	int x = 0;
        	cout << "请输入一个整数：" << endl;
        	cin >> x;
        	cout << oct << x << endl; // oct八进制
        	cout << dec << x << endl; // dec十进制
        	cout << hex << x << endl; // hex十六进制
        
        	cout << "请输入一个布尔值(0/1)：" << endl;
        
        	bool y = false;
        	cin >> y;
        	cout << boolalpha << y << endl;
        
        	system("pause");    // 请按任意键继续...
        
        	return 0;
        }

##### namespace 命名空间
    步骤：引入响应的头文件，再使用相应的命名空间，使用方法时，将会自动从指定的命名空间中调用方法，
    如果没有指定命名空间，就使用 命名空间::方法，来调用指定命名空间的方法

    例1:
        #include <iostream>
        #include <stdlib.h>
        using namespace std;
        
        <!-- 声明A空间 -->
        namespace A
        {
        	int x = 0;
        	void f1()
        	{
        		cout << "A" << endl;
        	};
        	void f2();
        }
        
        <!-- 声明B空间 -->
        namespace B
        {
        	int x = 2;
        	void f1()
        	{
        		cout << "B" << endl;
        	};
        	void f3();
        }
        
        
        int main(void)
        {
            // 调用A空间 和 B空间的 变量 和 函数
        	cout << "A.x + B.x =" << A::x + B::x << endl;
        	A::f1();
        	B::f1();
        
        	return 0;
        }
    
    例2:
        #include <iostream>
        #include <stdlib.h>
        // 表示使用 命名空间 std
        using namespace std;
        
        namespace CompanyA {
        	int getMaxOrMin(int *arr, int count, bool isMax)
        	{
        		int temp = arr[0];
        		for (int i = 1; i < count; i++)
        		{
        			if (!isMax)
        			{
        				if (temp < arr[i])
        				{
        					temp = arr[i];
        				}
        			}
        			else
        			{
        				if (temp > arr[i])
        				{
        					temp = arr[i];
        				}
        			}
        		}
        		return temp;
        	}
        }

        int main(void)
        {
        	int arr1[4] = { 2,4,1,3 };
        	bool isMaxA = false;
        	cout << "最大值:" << CompanyA::getMaxOrMin(arr1, 4, isMaxA) << endl;
        	
        
        	return 0;
        }
        
##### 栈和堆 实例化 一个 类
    例子:
        #include <iostream>
        #include <stdlib.h>
        using namespace std;
        
        class Coordinate
        {
        public:
        	int x;
        	int y;
        	void printfX()
        	{
        		cout << x << endl;
        	}
        	void printfY()
        	{
        		cout << y << endl;
        	}
        };
        
        int main(void)
        {
        	// 栈实例化对象
        	Coordinate coor;
        	coor.x = 10;
        	coor.y = 20;
        	coor.printfX();
        	coor.printfY();
        
        	// 堆实例化对象
        	Coordinate *p = new Coordinate();
        	// 申请内存失败 return 0; 直接退出
        	if (NULL == p)
        	{
        		return 0;
        	}
        	p->x = 100;
        	p->y = 200;
        	p->printfX();
        	p->printfY();
        	// 使用完后 释放内存
        	delete p;
        	p = NULL;
        
        	system("pause");
        
        	return 0;
        }
        
    例子2:
       #include <iostream>
        #include <stdlib.h>
        #include <string>
        using namespace std;
        
        class Student
        {
        public:
        	// 私人属性通过公共方法修改和返回
        	// 设置名字
        	void setName(string _name)
        	{
        		m_strName = _name;
        	}
        	// 返回名字
        	string getName() 
        	{
        		return m_strName;
        	}
        	// 返回分数
        	int getScore() 
        	{
        		return m_iScore;
        	}
        	// 初始化分数
        	void initScore()
        	{
        		m_iScore = 0;
        	}
        	// 加分 
        	void study(int _score)
        	{
        		m_iScore += _score;
        	}
        
        private:
        	// 声明私有属性
        	string m_strName;
        	// 设置只读属性
        	int m_iScore;
        };
        
        int main(void)
        {
        	// 栈实例化对象
        	/*
        	Student stu;
        	stu.initScore();	// 初始化学分
        	stu.setName("某某某");
        	stu.study(5);
        	stu.study(10);
        
        	cout << stu.getName() << " " << stu.getScore() << endl;
        	*/
        
        	// 堆实例化对象
        	Student *stu = new Student();
        
        	// 申请内存失败
        	if (NULL == stu)
        	{
        		return 0;
        	}
        	stu->initScore;
        	// &Student::initScore;
        	stu->setName("某某某");
        	stu->study(5);
        	stu->study(10);
        
        	cout << stu->getName() << " " << stu->getScore << endl;
        
        	delete stu;
        	stu = NULL;
        
        	system("pause");
        	return 0;
        }
        
##### 内存管理(申请与释放)
    例1:
        #include <iostream>
        #include <stdlib.h>
        using namespace std;
        
        int main(void)
        {
        	// 申请内存
        	// int *p = new int[1000];  // 申请块内存
        	int *p = new int;
        
        	// 处理申请内存失败
        	if (NULL == *p)
        	{
        		return 0;
        	}
        
        	// 申请内存成功, 操作内存
        	*p = 20;
        	cout << *p << endl;
        
        	// 释放内存
        	// delete []p; 释放块内存 
        	delete p;
        	p = NULL;
        	
        	system("pause");
        
        	return 0;
        }

    例2:
        #include <string.h>
        #include <iostream>
        using namespace std;
        int main(void)
        {
            //在堆中申请100个char类型的内存
            char *str = new char[100];
            //拷贝Hello C++字符串到分配的堆中的内存中
        	strcpy(str, "Hello imooc");
            //打印字符串
            for (int i = 0; i < 11; i++) {
                cout << str [i];
            }
            //释放内存
        	delete str;
            str = NULL;
        	return 0;
        }

##### string
    #include <string>
    using namespace std;
    string s1;        // s1为空串
    string s2("ABC"); // 用字符串字面值初始化s2
    string s3(s2);    // 将s3初始化为s2的一个副本
    string s4(n, 'c');// 将s4初始化为字符'c'的n个副本
    
    string常用操作
        // 要使empty生效, 需要调用<string>的方法getline(cin, userName);
        // getline(cin, userName); 传入输入 和 接收输入的变量
        s.empty()       若s为空串, 则返回true, 否则返回false
        s.size()        返回s中字符的个数
        s[n]            返回s中位置为n的字符, 位置从0开始
        s1+s2           将两个串连接成新串, 返回新生成的串
        s1=s2           把s1的内容替换为s2的副本
        s1 == s2
        s1 != s2
        
    例子:
        #include <iostream>
        #include <stdlib.h>
        #include <string>
        using namespace std;
        
        int main(void)
        {
        	string info("请输入姓名:");
        	cout << info << endl;
        
        	string userName;
        	// 使 empty() 判断字符串是否非空 方法生效
        	getline(cin, userName);
        
        	if (userName.empty())
        	{
        		cout << "input is null..." << endl;
        		return 0;
        	} 
        	
        	if (userName == "imooc")
        	{
        		cout << "该角色是一个管理员" << endl;
        	} 
        
        	cout << "Hello " + userName << endl;
        	cout << "the length of name: " << userName.size() << endl;
        	cout << "the head of name: " << userName[0] << endl;
        
        	system("pause");
        	return 0;
        }
    
        
##### 类外定义
    1. 同文件定义
        class Student
        {
        public:
            void run(); // 类内定义
            void eat();
        }
        // 同文件类外定义
        void Student::eat()
        {}
    
    2. 分文件定义
        a. 先定义头文件 Car.h
        class Car
        {
        public:
            void run();
            void eat();
        }
        
        b. 再其他文件Car.cpp中导入头文件Car.h, 再定义方法
        #include "Car.h"
        void Car::run()
        {}
        void Car::eat()
        {}
        
    例1:
        #include <iostream>
        #include <stdlib.h>
        #include <string>
        using namespace std;
        // 同文件类外定义
        class Teacher
        {
        public:
        	void setName(string _name);
        	string getName();
        	void setAge(int _age);
        	int getAge();
        	void setSex(string _sex);
        	string getSex();
        	void teach(string _name, int _age, string _sex);
        private:
        	// 姓名
        	string m_strName;
        	// 年龄
        	int m_iAge;
        	// 性别
        	string m_strSex;
        };
        
        void Teacher::setName(string _name)
        {
        	m_strName = _name;
        }
        string Teacher::getName()
        {
        	return m_strName;
        }
        void Teacher::setAge(int _age)
        {
        	m_iAge = _age;
        }
        int Teacher::getAge()
        {
        	return m_iAge;
        }
        void Teacher::setSex(string _sex)
        {
        	m_strSex = _sex;
        }
        string Teacher::getSex()
        {
        	return m_strSex;
        }
        
        void Teacher::teach(string _name,int _age, string _sex)
        {
        	cout << _name << " " << _age << " " << _sex << endl;
        }
        
        int main()
        {
        	Teacher t1;
        	t1.setName("某某某");
        	t1.setAge(20);
        	t1.setSex("男");
        	t1.teach("某某某", 20, "男");
        
        	system("pause");
        	return 0;
        }
        
        
    例2：
        a. 头文件 Teacher.h

        // 分文件类外定义
        class Teacher
        {
        public:
        	void setName(string _name);
        	string getName();
        	void setAge(int _age);
        	int getAge();
        	void setSex(string _sex);
        	string getSex();
        	void teach(string _name, int _age, string _sex);
        private:
        	// 姓名
        	string m_strName;
        	// 年龄
        	int m_iAge;
        	// 性别
        	string m_strSex;
        };

        b. 源文件 Teacher.cpp
        
        #include "Teacher.h"
        #include <iostream>
        #include <string>
        using namespace std;
        
        void Teacher::setName(string _name)
        {
        	m_strName = _name;
        }
        string Teacher::getName()
        {
        	return m_strName;
        }
        void Teacher::setAge(int _age)
        {
        	m_iAge = _age;
        }
        int Teacher::getAge()
        {
        	return m_iAge;
        }
        void Teacher::setSex(string _sex)
        {
        	m_strSex = _sex;
        }
        string Teacher::getSex()
        {
        	return m_strSex;
        }
        
        void Teacher::teach(string _name, int _age, string _sex)
        {
        	cout << _name << " " << _age << " " << _sex << endl;
        }
        
        int main()
        {
        	Teacher t1;
        	t1.setName("某某某");
        	t1.setAge(20);
        	t1.setSex("男");
        	t1.teach("某某某", 20, "男");
        
        	system("pause");
        	return 0;
        }
        
        
##### 问题
    1. 实例化的对象是如何在内存中存储的?
    2. 类中的代码又是如何存储的?
    
##### 内存分区
    (上面为计算机系统软件使用的内存区)
    栈区:   int x = 0; int *p = NULL; 
    堆区:   int *p = new int[20];
    全局区: 存储全局变量及静态变量
    常量区：string str = "xxx";
    代码区：存储逻辑代码的二进制(编译之后的代码)
        
    栈区特点: 
        内存的使用和分配由系统控制
        
    堆区特点:
        内存需要手动申请和删除
        
    手动触发执行 ---> 到代码区中找到入口代码 ---> 通过入口找到对应的区
        
##### 普通函数
    class Common() {
    
    public:
    
        // 无返回值函数, 为了对类的私有属性进行操作, 不需要声明数据类型, 需要传参
        void a(string _name) {
            m_strName = _name;
        }
        
        // 有返回值的函数, 为了获取类的私有属性, 需要声明数据类型, 不需要传参
        string b() {
            return m_strName;
        }
        
    private:
        string m_strName;
    }
        
        
##### 构造函数(作用： 类初始化对象时设置默认值)
    为什么会有构造函数?
    对象初始化的时候有两种情况: 
        1. 有且仅调用一次
        2. 根据条件初始化
    有且仅有一次的情况, 为了防止忘记调用初始化的函数, 或者多次调用初始化函数, 而定义的构造函数.
    
    构造函数特点:
        1. 构造函数在对象实例化时被自动调用一次(仅且一次)
        2. 构造函数与类名相同
        3. 构造函数没有返回值
        4. 构造函数可以有多个重载形式
        5. 实例化对象时仅用到一个构造函数
        6. 当用户没有定义构造函数时, 编译器自动生成一个构造函数
        
    类型:
        1. 无参构造函数
        
        2. 有参构造函数
    
    例子:
        类的头文件定义: Teacher.h
            #include <iostream>
            #include <stdlib.h>
            #include <string>
            using namespace std;
            
            class Teacher
            {
            public:
            	// 无参构造函数
            	Teacher();
            
            	// 有参构造函数
            	Teacher(string _name, int _age = 20);   // 赋予初始值
            
            	void setName(string _name);
            	string getName();
            	void setAge(int _age);
            	int getAge();
            
            private:
            	string m_strName;
            	int m_iAge;
            };
 
          
        类外定义方法:  Teacher.cpp
            #include "Teacher.h"

            // 构造函数初始化
            Teacher::Teacher()
            {
            	m_strName = "Jim";
            	m_iAge = 10;
            	cout << "Teacher()" << endl;
            };
            
            Teacher::Teacher(string _name, int _age)
            {
            	m_strName = _name;
            	m_iAge = _age;
            	cout << "Teacher(string _name, int _age)" << endl;
            }
            
            void Teacher::setName(string _name)
            {
            	m_strName = _name;
            }
            
            string Teacher::getName()
            {
            	return m_strName;
            }
            
            void Teacher::setAge(int _age)
            {
            	m_iAge = _age;
            }
            
            int Teacher::getAge()
            {
            	return m_iAge;
            }

    
        主入口文件调用该类: demo.cpp
            #include <iostream>
            #include <stdlib.h>
            #include <string>
            #include "Teacher.h"
            using namespace std;
            
            int main()
            {
            	Teacher t1;
            	Teacher t2("Tome", 12);
            	Teacher t3("Bob");
            
            	cout << t1.getName() << " " << t1.getAge() << endl;
            	cout << t2.getName() << " " << t2.getAge() << endl;
            	cout << t3.getName() << " " << t3.getAge() << endl;
            	
            
            	system("pause");
            	return 0;
            }
        

##### 构造函数初始化列表:
    1. 初始化列表优先于构造函数执行
    2. 初始化列表只能用于构造函数
    3. 初始化列表可以同时初始化多个数据成员
    
    class Student
    {
        public:
            Student():m_strName("xxx"),m_iAge(10) {}
        
        private:
            string m_strName;
            int m_iAge;
    }
    
    初始化列表有什么用?
        可以初始化构造函数不能改变常量const
    class Circle
    {
        public:
            Circle():m_dPie(3.14) {}
        private:
            const double m_dPie;
    }
        
    例:
    Teacher.h
        #include <iostream>
        #include <stdlib.h>
        #include <string>
        using namespace std;
        
        class Teacher
        {
        public:
        	// 有参构造函数
        	Teacher(string _name = "jim", int _age = 10, int m = 100);
        
        	void setName(string _name);
        	string getName();
        	void setAge(int _age);
        	int getAge();
        	void setMax();
        	int getMax();
        private:
        	string m_strName;
        	int m_iAge;
        	const int m_iMax;
        };
        
    Teacher.cpp
        #include "Teacher.h"

        // 构造函数初始化
        Teacher::Teacher(string _name, int _age, int _m) :m_strName(_name), m_iAge(_age), m_iMax(_m)
        {
        
        }
        
        int Teacher::getMax()
        {
        	return m_iMax;
        }
        
        void Teacher::setName(string _name)
        {
        	m_strName = _name;
        }
        
        string Teacher::getName()
        {
        	return m_strName;
        }
        
        void Teacher::setAge(int _age)
        {
        	m_iAge = _age;
        }
        
        int Teacher::getAge()
        {
        	return m_iAge;
        }
        
    demo.cpp
        #include <iostream>
        #include <stdlib.h>
        #include <string>
        #include "Teacher.h"
        using namespace std;
        
        int main()
        {
        	Teacher t2("xxxxx", 111, 20000);
        	
        	cout << t2.getName() << " " << t2.getAge() << " " << t2.getMax() << endl;
        	
        	system("pause");
        	return 0;
        }



 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        