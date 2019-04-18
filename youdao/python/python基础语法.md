##### 基础语法详解

```
# demo.py  后缀为.py的文件
# 中文用户一定得用下面这行声明编码，同时文件本身也得存储成UTF-8编码
# _*_ coding: utf_8 _*_
# 单行注释
# 导入os模块，等于加载os.py文件
import os

# 声明一个方法
def main():
    print 'Hello World'
    print "xxxx\'xxxx"
    
    # 函数调用
    foo(5, 10)
   
    # 字符可乘  等于： =====
    print '=' * 5
    
    # 调用了os 模块中的h函数
    os.getcwd()
    
    # 变量需要先实例化 才能进行计算
    counter = 0
    counter += 1
    
    # 列表
    food = ['苹果', '芒果', '西瓜']
    for i in food:
        print '一只' + i
        
    print '分割线'
    # 内置函数range(), 返回类似[1, 2, 3, 4, 5]
    for i in range(5):
        print i
    
def foo(param, secondParam):
    res = param + secondParam
    # 字符串的输出
    # print '%s 加 %s 等于 %s'%(param, secondParam,     res)
    if res < 50:
        print '这个'
    elif (res>=50) and ((param)==42 or (secondParam==24)):
        print '那个'
    else:
        print '嗯...'
    return res
    '''
    多行注释
    '''
# 以双下划线开头的（__foo）代表类的私有成员；以双下划线开头和结尾的（__foo__）代表python里特殊方法专用的标识，如__init__（）代表类的构造函数。
if __name__ == '__main__':
    main()
    
    
```




















