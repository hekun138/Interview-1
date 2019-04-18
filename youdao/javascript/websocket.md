##### 客户端
    <div class="vertical-center">
        <div class="container">
            <p>&nbsp;</p>
            <form role="form" id="chat_form" onsubmit="sendMessage(); return false;">
                <div class="form-group">
                    <input class="form-control" type="text" name="message" id="message" placeholder="Type text to echo in here" value="" />
                </div>
                <button type="button" id="send" class="btn btn-primary" onclick="sendMessage();">
                    Send!
                </button>
            </form>
        </div>
    </div>
    
    // 创建websocket实例
    var socket = new WebSocket('ws://127.0.0.1:8181');
        
    // 成功连接
    socket.onopen = function (e) {
        console.log('Connection to server opened', e);
    
        // 发送数据
        document.getElementById('send').onclick = function () {
            socket.send(document.getElementById('message').value);
        }
        
    };
    
##### 服务端
    npm install ws express
    
    // node自带模块
    const http = require('http');
    const path = require('path');
    const ws = require('ws');
    const express = require('express');
    
    const app = express();
    
    // websocket
    const WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({ port: 8181 });
    wss.on('connection', function (ws) {
        console.log('client connected');
        ws.on('message', function (message) {
            console.log(message);
            ws.send('我收到了消息')
    
        });
    });
    
    
    // 设置静态资源路径
    app.use(express.static(path.join(__dirname, 'public')));
    
    
    http.createServer(app).listen(3030);
    
    console.log("Start Serving Success  >>>  localhost:3030");
    
##### websocket事件
    // 创建一个websocket实例
    var ws = new WebSocket('ws://127.0.0.1:8080');  // 未加密
    var wss = new WebSocket('wss://127.0.0.1:8080');  // 加密

    // 连接成功事件
    ws.onopen = function(evt) { 
      console.log("Connection open ..."); 
      // 向服务器发送数据
      ws.send("Hello WebSockets!");
    };
    
    // 收到服务器数据事件
    ws.onmessage = function(evt) {
      console.log( "Received Message: " + evt.data);
      // 关闭websocket
      ws.close();   
    };
    
    // 连接关闭事件
    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };     
    
    // 报错事件
    ws.onerror = function(event) {
      
    };




























    
