##### ios设置overflow: auto不生效无法滚动问题
    overflow:auto;
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch; // 解决ios滚动不连贯问题
    height:200px; // 高度可以设置
    
    如果嵌套的iframe页面内容无法滑动，在iframe父元素加上上面的样式解决问题
    <div style="overflow:auto; overflow-y:scroll; -webkit-overflow-scrolling:touch;">
        <iframe></iframe>
    </div>
    
##### IOS中iframe的宽度自动扩大问题
    <iframe src="" scrolling="no" height="100%" width="100%" 
    style="border: none; overflow: scroll; -webkit-overflow-scrolling: touch; min-width: 100%; width: 1px !important;">
    </iframe>
    
    重点：
        scrolling="no"
        overflow: scroll;
    -webkit-overflow-scrolling: touch;
    min-width: 100%;
    *width:100%;
    width:1px;
    
##### 处理ios中input框的placeholder不垂直居中问题
    找到对应的input的class, 比如这里是 inputDemo
    .inputDemo::-webkit-input-placeholder {
        line-height: 按需求调整对应的值(px的话大概在0.6倍的height左右，rem的话为1倍的height);
    }