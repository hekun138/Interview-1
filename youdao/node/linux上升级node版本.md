##### linux上升级Node版本 以及 Node版本管理
    1. 安装n
        npm i -g n 
        ln -s /node-v6.10.3-linux-x64/lib/node_modules/n/bin/n /bin/    
    
        
    2. 安装node
        2.1 安装node最新版本
            n latest
        
        2.2 安装node稳定版本
            n stable
            
        2.3 安装node指定版本
            n v8.11.3
        
    3. 查看已安装的所有node版本
        n
        
    4. 删除指定版本
        n rm 8.11.3
        
    5. 指定某个版本运行脚本
        n use 8.11.3
        或
        n use v8.11.3