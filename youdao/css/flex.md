##### 平均等分子元素宽度
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    
    ul {
        display: flex;
        flex-direction: row;
    }
    
    li {
        flex: 1;
    }
    
##### 重置flex 并设置宽度
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    
    ul {
        display: flex;
        flex-direction: row;
    }
    
    li {
        flex: 1;
    }
    
    在js中给元素加上，即可设置宽度
    <li style={{ flex: 'none', width: 50 }}></li>
    
##### 九宫格
    <ul class='list'>
        <li class='item'>1</li>
        <li class='item'>2</li>
        <li class='item'>3</li>
        <li class='item'>4</li>
        <li class='item'>5</li>
        <li class='item'>6</li>
        <li class='item'>7</li>
        <li class='item'>8</li>
        <li class='item'>9</li>
    </ul>
    
    .list {
        display: flex;
        flex-wrap: wrap; /* 换行 */
        width: 300px; /* 父元素必须要有宽度 */
    }
    
    .item {
        width:80px;
    }