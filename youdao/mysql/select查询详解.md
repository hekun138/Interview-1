##### 数据库有百分之80以上的操作都是查询操作
    0. 查询一张表中所有字段
        SHOW COLUMNS FROM 表名;

    1. 查询一张表中所有数据
        SELECT * FROM 表名;
        
    2. 查询一张表中的指定列 id, username
        SELECT id, username FROM 表名;
        
    3. 查询不同表中的不同列
        SELECT 表1.id, 表1.username, 表2.id, 表2.password from 表1, 表2;
        
    4. 设置别名 AS
        SELECT id AS userId, username AS uname FROM 表名;
        
    5. 带条件的查询 WHERE
        SELECT * FROM 表名 WHERE 查询条件;
        
    6. 对所有查询结果分组 GROUP BY
        SELECT * FROM 表名 GROUP BY 分组条件;
        
    7. 对查询结果某一部分数据分组  HAVING (查询id小于等于10的userAccount)
        SELECT userAccount, id FROM 表名 GROUP BY 1 HAVING id <= 10; 
        
    8. 对查询结果进行排序   ORDER BY (DESC降序  ASC升序)
        SELECT * FROM 表名 ORDER BY id DESC;
        
    9. 限制查询数量 LIMIT
        SELECT * FROM 表名 LIMIT 2; (1个参数, 查询0,1两条记录)
        SELECT * FROM 表名 LIMIT 3,2; (2个参数, 索引2开始, 查询3,4两条记录)
        
##### 子查询 和 连接
    1. 子查询
        