#####  增
    1、 增数据库
    		create database if not exists 数据库名 character set utf8;	
    
    2、 增表
    	格式:CREATE TABLE [IF NOT EXISTS] table_name (column_name data_type, ...)
    	a. 新增一个含有自动编号和主键的用户信息表
    		create table 表名(
    		id smallint unsigned auto_increment primary key, // auto_increment 自动编号(需要结合主键使用)	primary key 主键
    		username varchar(20) not null,	// not null 非空
    		age tinyint unsigned not null,  // unsigned 为无符号位
    		salary float(8,2) unsigned not null
    		);
    
    3、 增字段
    		alter table 表名 add 字段名 varchar(6) not null;
    
    4、 增数据
    	a. 给全部字段赋值
    		insert 表名 values('字段1的值', '字段2的值', '字段3的值',...);  
    	b. 给指定字段赋值
    		insert 表名(指定字段1, 指定字段2) values('指定字段1的值', '指定字段2的值'); 


#####  删
    1、 删数据库
    		drop database 数据库名;	
    
    2、 删表
    		drop table 表名;
    
    3、 删字段
    		alter table 表名 drop column 字段名;
    
    4、 删数据
    		delete from 表名 where id=xxx;
    
#####  查
    1、 查数据库
    	a. 查询当前服务器下所有的数据库
    		show databases;	
    	b. 查询创建数据库使用的指令
    		show create database 数据库名;	
    	c. 显示当前用户打开的数据库
    		select database();	
    	
    2、 查表
    	a. 查询当前数据库的所有表 
    		show tables;
    	b. 查询指定数据库的所有表
    		show tables from 数据库名;
    	
    3、 查字段
    	a. 查询表中所有的字段结构
    		show columns from 表名;
    	b. 查询创建表的信息
    	    show create table t_表名
    
    4、 查数据
    	a. 查询表中所有的数据
    		select * from 表名;
    	b. 只查询指定字段数据(t为别名)
    	    select t.字段 from t_表名 t
    	c. 查询所有数据, 指定字段在第一列显示
    	    select t.字段, t.* from t_表名 t


##### 改
    1、 改数据库 
    	a. 打开数据库(改变当前数据库)	
    		use 数据库名;	
    	b. 修改数据库字符集
    		alter database 数据库名 character set = utf8;
    
    2、 改表
    
    
    3、 改字段
    		格式: ALTER TABLE 表名 CHANGE 原字段名 新字段名 字段类型 约束条件
    		alter table 表名 change love hobby varchar(20) not null; (如果原字段数据有值为null的话,执行会报错,要先将数据改成非null)
    
    4、 改数据
    	a. 修改指定字段的值
    	update 表名 set 字段名='字段值' where id=1(条件);
    	
    	
