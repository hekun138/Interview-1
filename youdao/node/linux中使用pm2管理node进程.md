##### pm2
    pm2:
        基于node的进程管理插件, 可以在后台开启node服务
        
    1) 安装
        npm i pm2 -g
        ln -s /node-v6.10.3-linux-x64/bin/pm2 /usr/local/bin/pm2	(生成软连接)
        
    2) 开启服务
        pm2 start app.js    (开启单个服务app.js)
        pm2 start all       (开启所有node服务)
        
    3) 查看进程和日志
        pm2 list        (查看所有node进程)
        pm2 show app    (查看单个node进程app)
        pm2 log / pm2 logs  (查看日志)
        
    4) 关闭服务
        pm2 status              查看服务名称/id
        pm2 stop appname/id     停止要关闭的服务名称/id
        pm2 stop all            停止所有项目
        pm2 delete appname/id   删除要关闭的服务
        
    5) 查看nginx监听的端口是否存在
        netstat -ntlp | grep nginx
        ps -ef | grep nginx
        ps aux | grep nginx
    