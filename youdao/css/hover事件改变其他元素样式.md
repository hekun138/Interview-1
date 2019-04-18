##### 改变自己
    <div></div>
    
    div:hover {
        
    }
    
##### 改变子元素
    <div class="container">
        <ul class="ul">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    
    .container:hover ul.ul>li:nth-child(2) {
        
    }
    
    
##### 改变兄弟元素
    <div class="container">
        <ul class="ul">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    <div class="wrap"></div>
    
    .container:hover +.wrap {
        
    }
    