##### 文件的 读 和 写入(新增和修改)
    const fs = require('fs');
    const path = require('path');
    
    // 创建一个读入文件流 从前台传的文件路径中 接收 文件流
    const source = fs.createReadStream(path);   
    
    // 创建一个写入文件流 设置文件写入的目录
    const dest = fs.createWriteStream(path.join(process.pwd() + '/文件路径' + new Date().getTime() + '文件名'));
    
    // 用pipe管道符将 读入的文件流 传给 写入文件流 处理
    source.pipe(dest);
    
    // 监听读写完成
    source.on('end', callback);
    
    // 监听读写失败
    source.on('error', callback);
    
    
##### 文件流的删除