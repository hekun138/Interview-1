##### 原理分析
    1. 设置一个块级元素为容器row, 并添加以下属性
    <div class="cm-row"></div>
    .cm-row {
        position: relative;
        box-sizing: border-box;
        &:after, &:before {
            display: table;
            content: '';
        }
        /* 清浮动 */
        &:after {
            clear: both;
        }
    }
    
    2. 将每个列容器添加以下属性
    <span class="cm-col"></span>
    [class*=cm-col-] {
        float: left;
        box-sizing: border-box;
    }
    
    3. 将列长分为1-24份，将间隔(偏移量)分为1-24份
    
    列长：
        .cm-col-1 {
            width: 4.16667%;
        }
        ...
        .cm-col-24 {
            width: 100%;
        }
        
    偏移量：
        .cm-col-offset-1 {
            margin-left: 4.16667%;
        }
        ...
        .cm-col-offset-24 {
            margin-left: 100%;
        }
        
    1-24份长度依次为：
    1:  4.16667%;
    2:  8.33333%;
    3:  12.5%;
    4:  16.66667%;
    5:  20.83333%;
    6:  25%;
    7:  29.16667%;
    8:  33.33333%;
    9:  37.5%;
    10: 41.66667%;
    11: 45.83333%;
    12: 50%;
    13: 54.16667%;
    14: 58.33333%;
    15: 62.5%;
    16: 66.66667%;
    17: 70.83333%;
    18: 75%;
    19: 79.16667%;
    20: 83.33333%;
    21: 87.5%;
    22: 91.66667%;
    23: 91.66667%;
    24: 100%;
    