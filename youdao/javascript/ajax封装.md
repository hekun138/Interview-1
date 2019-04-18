/**
 @Name: ajax模块
*/
layui.define(['layer', 'table'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        setter = layui.setter;

    var xhr = {
        getBase64Img: function (url, callBack) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'text',
                async: true,
                complete: function (res, textStatus) {
                    return callBack(res);
                }
            });
        },
        get: function (url, postData, callBack) {
            if (callBack == undefined) callBack = function () { };
            $.ajax({
                type: 'get',
                url: url,
                data: postData || {},
                async: false,
                timeout: 5000,
                beforeSend: function (xhr) {
                    var data = layui.data('layuiAdmin');
                    xhr.setRequestHeader('Authorization', data.Authorization);
                },
                success: function (res) {
                    // turn to login 
                    setter.StatusProcess(res, 'get', url, postData);
                    // result sucess
                    if (res.status == 1) {
                        callBack(res);
                    } else {
                        if (res.status == 405 || res.status == 401) {
                            return;
                        }
             
                        return layer.msg(res.msg, {icon: 2});
                    }
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {  
                        this.abort();
                        return layer.msg('连接超时请重试', {icon: 2});
                    }
                },
                error: function (res) {
                    layer.msg("请求异常，抛出错误信息:" + res.responseJSON.msg, { icon: 2, time: 3000 });
                }
            });

        },
        post: function (url, postData, callBack, contentType) {
            if (callBack == undefined) callBack = function () { };
            $.ajax({
                type: 'post',
                url: url,
                data: JSON.stringify(postData),
                dataType: 'json',
                async: false,
                timeout: 5000,
                contentType: contentType || 'application/json',
                beforeSend: function (xhr) {
                    var data = layui.data('layuiAdmin');
                    xhr.setRequestHeader('Authorization', data.Authorization);
                },
                success: function (res) {
                    // turn to login 
                    setter.StatusProcess(res, 'post', url, postData);
                    // result sucess
                    if (res.status == 1) {
                        callBack(res);
                    } else {
                        // 操作未提交成功 重新开启提交按钮
                        $(':submit').each(function () {
                            if ($(this).prop("disabled")) $(this).prop("disabled", false);
                        });
                        
                        if (res.status == 405 || res.status == 401) {
                            return;
                        }
                        
                        return layer.msg(res.msg,  {icon: 2});
                    }
                },
                complete: function (XMLHttpRequest, status) { 
                    if (status == 'timeout') {  
                        this.abort();
                        return layer.msg('连接超时请重试', {icon: 2});
                    }
                },
                error: function (res) {
                    console.log(res);
                    // 操作未提交成功 重新开启提交按钮
                    $(':submit').each(function () {
                        if ($(this).prop("disabled")) $(this).prop("disabled", false);
                    });

                    layer.msg("请求异常，抛出错误信息:" + res.responseJSON.msg, { icon: 2, time: 3000 });
                }
            });
        },
        // 提交表单数据
        postForm: function (url, postData, callBack, formId) {
            if (callBack == undefined) callBack = function () { };
            var formData = new FormData($(formId)[0]);
            $.ajax({
                type: 'post',
                url: url,
                data: formData,
                dataType: 'json',
                async: false,
                timeout: 5000,
                contentType: false,
                processData: false,  
                beforeSend: function (xhr) {
                    var data = layui.data('layuiAdmin');
                    xhr.setRequestHeader('Authorization', data.Authorization);
                },
                success: function (res) {
                    // turn to login 
                    setter.StatusProcess(res, 'post', url, postData);
                    // result sucess
                    if (res.status == 1) {
                        callBack(res);
                    } else {
                        // 操作未提交成功 重新开启提交按钮
                        $(':submit').each(function () {
                            if ($(this).prop("disabled")) $(this).prop("disabled", false);
                        });

                        if (res.status == 405 || res.status == 401) {
                            return;
                        }
                        
                        return layer.msg(res.msg,  {icon: 2});
                    }
                },
                complete: function (XMLHttpRequest, status) { 
                    if (status == 'timeout') {  
                        this.abort();
                        return layer.msg('连接超时请重试', {icon: 2});
                    }
                },
                error: function (res) {
                    // 操作未提交成功 重新开启提交按钮
                    $(':submit').each(function () {
                        if ($(this).prop("disabled")) $(this).prop("disabled", false);
                    });

                    layer.msg("请求异常，抛出错误信息:" + res.responseJSON.msg, { icon: 2, time: 3000 });
                }
            });
        },
    }

    //对外暴露的接口
    exports('xhr', xhr);
});