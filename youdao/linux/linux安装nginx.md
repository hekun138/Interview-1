###### 步骤
    https://www.cnblogs.com/wyd168/p/6636529.html
    1. 确认依赖
        安装make：
            yum -y install gcc automake autoconf libtool make
            
        安装g++:
            yum install gcc gcc-c++
        
    2. 选定安装目录
        cd /usr/local/src/xxx
        
    3. 安装PCRE库
        cd /usr/local/src/xxx
        wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.39.tar.gz 
        tar -zxvf pcre-8.39.tar.gz
        cd pcre-8.39
        ./configure
        make
        make install
        
    4. 安装zlib库
        cd /usr/local/src/xxx
        wget http://zlib.net/zlib-1.2.11.tar.gz
        tar -zxvf zlib-1.2.11.tar.gz
        cd zlib-1.2.11
        ./configure
        make
        make install
        
    5. 安装openssl
        cd /usr/local/src/xxx
        wget https://www.openssl.org/source/openssl-1.0.1t.tar.gz
        tar -zxvf openssl-1.0.1t.tar.gz
        
    6. 安装nginx
        cd /usr/local/src/xxx
        wget http://nginx.org/download/nginx-1.1.10.tar.gz
        tar -zxvf nginx-1.1.10.tar.gz
        cd nginx-1.1.10
        ./configure
        make
        make install
    
    7.  设置软连接
        ln -s /usr/local/nginx/sbin/nginx   /usr/bin/nginx
        
        启动
        nginx -c /usr/local/nginx/conf/nginx.conf
    
        重启
        nginx -s reload
        
    8. nginx启动403
    https://blog.csdn.net/jingwo_work/article/details/51017859