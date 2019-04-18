##### linux的redis安装及外网访问
    redis设置外网访问
    https://www.cnblogs.com/xiezhi/p/7066805.html
    
    修改防火墙前使用
    http://www.bubuko.com/infodetail-1954829.html
    
##### windows的redis安装启动
    安装步骤
    http://www.cnblogs.com/jaign/articles/7920588.html
    
    下载地址
    https://github.com/MicrosoftArchive/redis/releases
    
    redis启动出错Creating Server TCP listening socket 127.0.0.1:6379: bind: No error
        https://www.cnblogs.com/lixihuan/p/6815730.html
        
        没有密码的redis
        1. redis-cli.exe
        2. shutdown
        3. exit
        4. redis-server.exe redis.windows.conf
        
        设置密码的redis
        1. redis-cli.exe -a 密码
        2. shutdown
        3. exit
        4. redis-server.exe redis.windows.conf