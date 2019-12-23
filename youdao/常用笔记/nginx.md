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

#### nginx配置使用 单端口+多路由 映射多个 web前端页面
```
    1. windows
    修改配置文件nginx.conf
    server {
        listen       8088;
        server_name  localhost;
		
		# web服务器目录
		root "C:/Users/lanyu/Desktop/nginxweb/";
	
		# 子目录项目1
        # 代理访问地址 http://localhost:8088/h5app
		location ^~ /h5app/ {
			try_files $uri $uri/ /h5app/index.html;  #如果找不到文件，就返回 C:/Users/lanyu/Desktop/nginxweb/h5app/index.html
		}
		# 子目录项目2
        # 代理访问地址 http://localhost:8088/h5manager
		location ^~ /h5manager/ {
		   try_files $uri $uri/ /h5manager/index.html;  #如果找不到文件，就返回 C:/Users/lanyu/Desktop/nginxweb/h5manager/index.html
		}
    }
    
    注意：前端的引用静态资源路径要改成相对路径 ./  例如修改webpack打包中配置文件中 publicPath='./'
    
    
    2. linux设置
    server {
        listen       8088;
        server_name  localhost;
	
	root /hb;
	
        location ^~ /h5/ {
                try_files $uri $uri/ /h5/index.html;
        }

        location ^~ /app/ {
                try_files $uri $uri/ /app/index.html;
        }

        location ^~ /h5manager/ {
                try_files $uri $uri/ /h5manager/index.html;
        }

    }
   


```

