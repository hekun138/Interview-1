##### 依赖和封装
    1. 安装依赖
        npm i mysql --save
    
    2. 封装mysql执行sql
        /mysql/index.js
        
        const mysql = require('mysql');
        /*
        * @sql       mysql语句
        * @value     数据
        * @callback  回调
        */
        module.exports = (sql, value, callback) => {
            let config = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '123456',
                port: '3306',
                database: 'game',
                multipleStatements: true,       // 可以同时执行多条sql语句
            });
        
            config.connect((err) => {
                // 数据库链接失败
                if (err) {
                    return console.error(err);
                }
            });
        
            config.query(sql, value, (err, data) => {
                callback(err, data);
            });
        
            config.end();
        };
        
    3. 使用
        const sql = require('../mysql/index');
        sql('SELECT * FROM memberinfo; SELECT COUNT(*) FROM memberinfo;', {}, (err, data) => {
            console.log(data); 
        });
    
    
    
##### 操作多条语句
    sql('SELECT * FROM memberinfo; SELECT COUNT(*) FROM memberinfo;');
    
##### 带条件查询   用(?)设置变量
    sql('SELECT * FROM memberinfo WHERE userAccount=?', [userAccount], (err, data) => {});
    
##### 增
    const { userAccount, userName, userPassword, level, balance, currentCompanyName } = req.body;
    const insertStr = `INSERT memberinfo (userAccount, userName, userPassword, level, balance, currentCompanyName) values (?, ?, ?, ?, ?, ?);`;
    
    sql(insertStr, [userAccount, userName, userPassword, level, balance, currentCompanyName || '暂无公司'], (err, data) => {
        
    });
    
##### 改
    const { id, userName, userPassword, level, balance, currentCompanyName } = req.body;
    const updateStr = `UPDATE memberinfo set userName = ?, userPassword = ?, level = ?, balance = ?, currentCompanyName = ? WHERE id = ?`;
    
    sql(updateStr, [userName, userPassword, level, balance, currentCompanyName || '暂无公司', id], (err, data) => {

    });