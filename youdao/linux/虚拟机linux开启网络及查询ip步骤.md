# 步骤
    操作详细步骤: https://blog.csdn.net/dancheren/article/details/73611878
    
    1. 查询ip 
        ip addr
            centos的ip地址是ens33条目中的inet值
      
    2. 开启网络      
        如果没有inet值, 开启网络
            vi /etc/sysconfig/network-scripts/ifcfg-ens33
            修改 ONBOOT=yes
        
    3. 重启网络
        sudo service network restart 
    
    4. 重新查询ip