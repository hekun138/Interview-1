##### 存
    const redis = require('redis');
    const client = redis.createClient('6379', '127.0.0.1');

    // 读取所有sessionid
    // Redis没有严格意义上的表名和字段名，以　Key-Value　键值对的方式存储，
    // 因此一般采用　schema:key　形式做为键值，其中
    // schema:  可理解为传统数据库中的表名
    // key: 　　 可理解为表中的主键
    // 所以 sessionid:* 中的 sessionid表示表名，*表示数据的key
    client.keys("sessionid:*", function (err, reply) {
        console.log('keys: ', err, reply);
    });
    
    // 保存数据
    client.set("username", function (err, reply) {
        console.log('set: ', err, reply);
    });
    
    // 获取数据
    client.get("username", function (err, reply) {
        console.log('get: ', err, reply);
    });
    
    // 删除数据
    client.del("username")
    