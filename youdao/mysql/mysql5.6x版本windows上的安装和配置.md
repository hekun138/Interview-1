##### 安装
    http://dev.mysql.com/downloads/mysql/

##### mysql启动失败报错 服务无法启动 3534
    https://www.cnblogs.com/xixihuang/p/5663559.html
    
    1. 配置环境变量
    
    2. 删除mysql下的data目录
    
    3. 新建配置文件my.ini

        [mysql]
        # 设置mysql客户端默认字符集
        default-character-set=utf8 
        [mysqld]
        #设置3306端口
        port = 3306 
        # 设置mysql的安装目录
        basedir=D:\mysql-8.0.12-winx64
        # 设置mysql数据库的数据的存放目录
        datadir=D:\mysql-8.0.12-winx64\data
        # 允许最大连接数
        max_connections=200
        # 服务端使用的字符集默认为8比特编码的latin1字符集
        character-set-server=utf8
        # 创建新表时将使用的默认存储引擎
        default-storage-engine=INNODB
    
    4. 将MYSQL卸载、重装、初始化，最后开启MYSQL服务。
        mysqld --remove
        mysqld --install
        mysqld --initialize-insecure
        net start mysql

    5. mysql 8.0 连接报错
        Client does not support authentication protocol requested by server; consider upgrading MySQL client
        解决方案:
            mysql -u root -p 密码
            mysql>USE mysql; 
            mysql>ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "123456"; 
            mysql>FLUSH PRIVILEGES;
    
    
##### mysql客户端软件
    Navicat
    

    
