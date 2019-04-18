##### 文档详解地址
    http://ask.dcloud.net.cn/article/94
    
##### 常用参数
    "plus" {
        // 系统状态栏样式1
        "statusbar": {
            "immersed": "suggestedDevice", // "suggestedDevice"沉浸式状态栏，仅在支持设置状态栏前景色样式的设备上生效（Android5.0的小米&魅族、Android6.0及以上，iOS在所有设备上生效）；
            "style": "light",
            "background": "#D74B28"
        },
        // 系统状态栏样式2
        "statusbar": { // 适用IOS
            "immersed": "false",
            "style": "light",
            "background": "#D74B28"
        }
        
        
         "launchwebview" : {
            // 标题栏
            "titleNView" : {
                // 标题栏文字  文字颜色  背景颜色
                "titleText" : "Hello H5+",
                "titleColor": "#CCCCCC",
                "backgroundColor" : "#D74B28",
                // 右边按钮
                "buttons" : [
                    {
                        "fontSrc": "_www/helloh5.ttf",
                        "text" : "\ue300",
                        "fontSize" : "22px",
                        "onclick" : "javascript:openAbout()"
                    }
                ]
            }
        },
    }
    
