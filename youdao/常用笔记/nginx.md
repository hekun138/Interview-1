##### nginx.conf 反向代理配置
    # 运行 nginx 进程的属主
    user  nobody;
    http {
        server {
            # 代理访问地址 http://localhost:8081
            listen       8081;
            server_name  localhost;
    		
    		# 静态资源根路径
    		root	"D:/svn/web/public/";
    		
    		# 静态资源缓存过期时间设置
        	location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|mp3|mp4|word|xlsx|xls)$ {
    			expires 0;
    		}
    		
    		# 服务端代理    
    		location  /server {
    			proxy_set_header   Host             $host;
    			proxy_set_header   X-Real-IP        $remote_addr;
    			proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    			proxy_pass  http://192.168.xxx.xxx:8080/server;
            }
            
        // 其他默认配置    
        }
        
        # 导入其他的配置文件server
        include vhost/*.conf;
    }
    
    vhost/*.conf文件中配置其他代理
    server {
    # 代理访问地址 http://localhost:8082
        listen       8082;
        server_name  localhost;
        
        # 静态资源根路径
        root "D:/git/web/dist/";

        # 静态资源缓存过期时间设置
        location ~ .*\.(html|gif|jpg|jpeg|bmp|png|ico|txt|js|css|ttf|woff|mp3|ogg|wav|woff2|apk)$ {
            expires 30d;
        }
    
        # 服务端代理
        location /api {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header X-Forwarded-Proto   $scheme;
    		proxy_pass  http://192.168.xxx.xxx:8080/api;
        }
    }
    
    
    
##### nginx配置 https + websocket 项目
    http {
        include       mime.types;
        default_type  application/octet-stream;
        sendfile        on;
        keepalive_timeout  65;
        #gzip  on;
        
        # websocket配置
        map $http_upgrade $connection_upgrade {
            default upgrade;
            ''      close;
        }
        # websocket配置
        upstream websocket {
            server 127.0.0.1:8089;
        }

        server {
            listen       8088;
            server_name  localhost;

            # 静态资源根路径
            root "D:/gitlab/cp_wap/dist/";

            # 静态资源缓存过期时间设置
            location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|mp3|mp4|word|xlsx|xls)$ {
                expires 0;
            }

            # websocket配置
            location /wss {
                proxy_pass https://服务器ip:端口号/wss;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }

            # https文根配置
            location /coron {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass https://服务器ip:端口号/coron;
            }

            location /date {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass https://服务器ip:端口号/date;
            }

            location /boracay {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass https://服务器ip:端口号/boracay;
            }

            location /wallet {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass https://服务器ip:端口号/wallet;
            }

            location /nido {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass https://服务器ip:端口号/nido;
            }


        }

        # 导入其他的配置文件server
        include vhost/*.conf;

    }

    
