##### 相关资料
    说明
    https://blog.csdn.net/slimboy123/article/details/54140029/
    
    ADBKeyBoard.apk 下载地址
    https://github.com/senzhk/ADBKeyBoard
    
    1. 到上面的地址最下面下载 ADBKeyBoard.apk
    2. 输入 adb install ADBKeyBoard.apk 安装输入法到手机
    3. 到设置中修改手机的配置输入法 并 设置ADB Keyboard为默认输入法
    
    // adb默认 写入文本 数字 + 字母
    function inputText(text) {
    	shell.exec('adb shell input text ' + text);
    }
    
    // 使用ADBKeyBoard 写入 中文 (手机上必须安装ADBKeyBoard.apk并设置为默认属性)
    function adbInputText(text) {
        shell.exec(`adb shell am broadcast -a ADB_INPUT_TEXT --es msg '${text}'`)
    }
    
