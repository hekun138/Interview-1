##### input样式重置
    /* input框统一样式 */
    input {
        box-sizing: border-box;
        display: inline-block;
        background-color: #fff;
        background-image: none;
        /* 重置input样式 */
        color: #606266;
        outline: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        /* 统一解决checkbox等样式上下不居中问题 */
        margin-top: -2px;
        margin-bottom: 1px;
        vertical-align: middle;
        cursor: pointer;
    }
    /* 聚焦 */
    input:focus {
        outline: none;
        border-color: #409eff;
    }
    input[type="text"], input[type="password"] {
        padding: 0 15px;
    }