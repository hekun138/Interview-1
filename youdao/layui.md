##### laydate 时间控件动态设置范围
    // 开始日期
    var startDate = laydate.render({
        elem: '#startTime',
        calendar: true,
        type: 'datetime',
        max: '2099-12-31 00:00:00',
        done: function (value, date) {
            endDate.config.min = {  // 动态设置"结束日期"最小时间 
                year: date.year,
                month: date.month - 1, //关键  
                date: date.date,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }
    });

    // 结束日期
    var endDate = laydate.render({
        elem: '#endTime',
        calendar: true,
        type: 'datetime',
        min: '1970-1-1 00:00:00',
        done: function (value, date) {
            startDate.config.max = {   // 动态设置"开始日期"最大时间 
                year: date.year,
                month: date.month - 1, //关键   
                date: date.date,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
    });
    
##### layer.open 弹出层被遮罩覆盖BUG
    var index = layer.open({
        type: 1,
        content: $('#examine'),
        success: function (layero) {   
             // 弹出层被遮罩覆盖BUG
            var mask = $('.layui-layer-shade');
            mask.appendTo(layero.parent());
        }
    });
    
##### form.on()获取不到表单数据
    要给 <form> 加上class="layui-form"
    既   <form class="layui-form">
    否则 拥有 lay-submit 和 lay-filter='*' 属性的按钮获取不到表单数据
    <button lay-submit lay-filter="search"></button> 
    
##### layer.open动态生成按钮
    var btnArr = ['btn_a', 'btn_b', 'btn_c', 'btn_d', ...];
    layer.open({
        type: 1,                    
        skin: 'operation-class',    // 自定义样式 operation-class
        title: false,               // 删除标题
        btnAlign: 'c',              // 按钮居中
        area: ['20rem'],            // 高度自适应
        btn: btnArr,                
        success: function (layero) {
            // 获取除去第一个a标签外所有的a标签, 第一个a标签为 关闭按钮 x,
            // 后面的按钮依次为 class="layui-layer-btn0" 至 class="layui-layer-btnn"  
            layero.find('a').not('a:first').on('click', function () { 
                // 获取对应按钮的"layui-layer-btn0" 的最后一个字符 0为索引 
                var $index = $(this).attr('class').split('n')[1];   
                btnEvent[$index](obj);   // 给对应按钮添加绑定事件, 并传入参数obj
            });
        }
    });
    
        