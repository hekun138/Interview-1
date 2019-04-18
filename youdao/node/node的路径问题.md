##### __dirname 和 process.cwd() 的区别
    1. __dirname 
        当前文件所在的路径
        
        const path = require('path');
        path.join(__dirname);
        
    2. process.cwd()
        当前项目的根路径
        
        const path = require('path');
        path.join(process.cwd());
