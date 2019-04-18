##### 监听ajax的各个阶段
    export default function xhr(opt) {
        var opt = opt || {};
        opt.url = opt.url || '';
        opt.callback = opt.callback || function () {};
    
        var xmlHttp = new XMLHttpRequest();
    
        xmlHttp.onreadystatechange = function () {
            var readyState = xmlHttp.readyState * 25;
            var status = xmlHttp.status;
            // 返回进度条参数
            opt.callback(readyState !== 100 ? readyState : (status === 200) ? 'success' : 'exception');
        }
        
        xmlHttp.open('GET', opt.url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www/form-urlencoded;charset=utf-8');
        // xmlHttp.setRequestHeader('User-Agent', window.navigator.userAgent);
        xmlHttp.send(null);
      
    }
    
    xhr({
        url: '',
        callback: (res) => {
            console.log(res);
        }
    });