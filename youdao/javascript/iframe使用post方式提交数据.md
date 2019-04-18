##### iframe使用Post方式提交
    <form id="iframeForm" method="post" target="targetFrame" action=""></form>
    <iframe id="iframeId" name="targetFrame" src="" style="width: 100%; height: 100%; border: none;"></iframe>
    
    $('#iframeForm').attr('action', 'https://www.baidu.com');
    $('#iframeForm').submit();
    
    要点：
        1. 给from表单设置提交方式为post
        2. 设置form的target属性 和 iframe的name属性相等，使二者绑定在一起
        3. 初始化设置iframe的src=""，此时的iframe创建出来就不会请求
        4. 使用js动态设置form表单的action属性(即为iframe的src属性)
        5. 使用js让form加载完成后发起submit请求，触发iframe的post请求