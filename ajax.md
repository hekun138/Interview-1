AJAX
======

### 1. 什么是ajax
    ajax = 异步 JavaScript 和 XML
    ajax是一项技术
    或者说是 无需重新加载整个网页的情况下, 更新部分网页的技术
    
### 2. 在javascript用什么创建一个ajax对象
    XMLHttpRequest对象: 适用于标准浏览器
    ActiveXObject对象: 适用于IE浏览器
    function getXHR()
    {
      var xmlHttpReq;
      try 
      {
        // 标准浏览器
        xmlHttpReq = new XMLHttpRequest();
      } 
      catch (e) 
      {
          // IE && ECMAScript版本>5
          try 
          {
            xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
          } 
          catch (e) 
          {
              try 
              {
                // IE && ECMAScript<=5
                xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
              } 
              catch (e) 
              {
                 // 您的浏览器不支持AJAX
                  return false;
              }
          }
      }
      return xmlHttpReq;
    }
    
### 3. 实现一个ajax的步骤
    1) 创建一个ajax对象: 
            如2. var ajax = getXHR();
            
    2) 使用ajax对象进行http三次握手建立通讯:
            ajax.open(method, url, async);
            
    3) 发送请求
            ajax.send();
            如果是get请求在url后面拼接参数:  
                ajax.open(method, url+ '?' + postData, async);
            如果是post等请求在send里面发送参数:
                ajax.send(postData)
                ajax.setRequestHeader('Content-Type', 'application/x-www/form-urlencoded;charset=utf-8');
                
            
            



































    
    
