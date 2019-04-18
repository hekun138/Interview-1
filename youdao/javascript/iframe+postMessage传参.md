##### 父页面
    http://localhost:8889/dh.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>a.html</title>
    </head>
    <body>
        <iframe id="iframe" src="http://localhost:8888/iframe.html">
            <p>Your Browser dose not support iframes</p>
        </iframe>
        <script>
            var iframe = document.getElementById('iframe');
            iframe.onload = function() {
                var data = {
                    name: 'aym',
                    type: 'wuhan'
                };
                // 向iframe传送跨域数据 postMessage(传输的数据, 传给的地址)
                iframe.contentWindow.postMessage(JSON.stringify(data), 'http://localhost:8888');
            };
    
            // 接受iframe返回数据，这边给延迟的原因，因为同步传输时，页面不一定立马拿到数据，所以给延迟
            setTimeout(function(){
                window.addEventListener('message', function(e) {
                    alert('data from iframe sss ---> ' + e.data);
                }, false);
            }, 10)
    
    
            /*
               1. 父页面传数据给iframe 
               iframe.contentWindow.postMessage(传输的数据,iframe的地址(http://localhost:8888))
    
               2. 父页面接收iframe回传的数据
               window.addEventListener('message', function (e) {
                   console.log(e.data);
               }, false);
            */ 
    
        </script>
    </body>
    </html>
    
##### iframe页面
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <script>
            // 接收dh的数据
            window.addEventListener('message', function(e) {
                console.log(e.data);
    
                var data = JSON.parse(e.data);
                if (data) {
                    data.number = 16;
                    data.age = 89;
                    data.icon = 'sfafdafdafasdf';
    
                    // 处理后再发回dh
                    window.parent.postMessage(JSON.stringify(data), e.origin);
                }
            }, false);
    
            /*
                1. iframe接收父页面传值
                window.addEventListener('message', function (e) {
                    console.log(e.data);
                });
    
                2. iframe传数据给父页面
                window.parent.postMessage(传输的数据, 父页面的地址(http://localhost:8889));
            
            */
            
        </script>
    </body>
    </html>