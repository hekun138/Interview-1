##### 解决checkbox的attr(checked)一直为undefined问题
    原因:
    在jquery1.6版本便对此做出了修改： 
    checked属性在页面初始化的时候已经初始化好了，不会随着状态的改变而改变。 
    也就是说如果checkbox在页面加载完毕是选中的，那么返回的永远都是checked（我的一开始就是没选中） 
    如果一开始没被选中，则返回的永远是undefined!
    
    解决:
    .prop('checked')
    checkbox选中和取消 此时就会变成true或者false
    
##### 回车登录
    $(document).keydown(function (e) {
        e.keyCode === 13 && $('#loginBtn').trigger('click');
    });
    
##### JQ时时监听input值改变
    $("#input1").bind("input propertychange change",function(event){
       console.log($("#input1").val())
    });
    
##### 清空表单数据和页面上所有的type="file"文件流 
    function clear(formId) {
        var formId = formId || 'form';
        $(':input', formId)     // :input 包括 :button :checkbox :file :hidden :image :password :radio :reset :submit :text :select :textarea
            .not(':button, :submit, :reset, :hidden') // 只清空: :checkbox :file :image :password :radio :text :select :textarea
            .val('')
            .removeAttr('checked')
            .removeAttr('selected')
            .removeAttr('readonly');
        // 清空文件流
        var file = $('input[type="file"]');
        if (file.length > 0) {
            file.each(function () {
                $(this).val('');
            });
        }
    }