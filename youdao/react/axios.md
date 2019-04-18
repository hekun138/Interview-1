##### 请求封装
    import axios from "axios";
    import { message } from 'antd';
    import api from '@/config/api';
    import { operationStorage } from "@/util/authority";
    import createHistory from 'history/createHashHistory';
    const history = createHistory();
    
    message.config({
        top: 100,
        delay: 3,
        maxCount: 3,
    });
    
    // 请求超时时间
    const service = axios.create({
        timeout: 15000
    });
    
    // 处理状态码(非浏览器自带状态码) 
    function checkStatus(data) {
        const status = data.status;
        if (status === 401) {
            operationStorage('game-admin', 'null');
            history.replace('/user/login');
            return;
        }
    
        // if (status === 405) {
            // 指纹校验
            
        // }
    }
    
    // 处理application/x-www-form-urlencoded格式数据
    function toFormData(config) {
        config.transformRequest = [function (data) {
            let res = '';
            for (let i in data) {
                res += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return res;
        }];
    }
    
    // request拦截器
    service.interceptors.request.use(
        config => {
            // 登录使用FormData格式  其余方法使用json格式  提交数据使用multipart/form-data提交
            if (config.dataType === 'FormData') {
                toFormData(config);
            }
            // 除了请求验证码图片所有请求携带 Authorization
            const isGetVerify = config.url.includes(api.login.getVerify);
            if (!isGetVerify) {
                config.headers.Authorization = operationStorage('game-admin').Authorization;
            }
            
            return config;
        },
        error => {
            Promise.reject(error);
        }
    );
    
    // respone拦截器
    service.interceptors.response.use(
        response => {
            const { config: {method}, data, headers: {authorization} } = response;
            // 处理状态码(非浏览器自带状态码)
            checkStatus(data);
            // 保存从图形验证码获取的 Authorization
            if (authorization) {
                operationStorage('game-admin', {
                    key: 'Authorization',
                    value: authorization
                });
                return data;
            }
    
            if (data.status === 1) {
                if (method.toLocaleUpperCase() === 'POST') message.success('操作成功！');
                return data;
            } else {
                message.error('操作失败');
            }
        },
        error => {
            let errortext = error + '';
            message.error(errortext);
            return Promise.reject({
                success: false,
                statusCode: errortext.substr(-3),
                message: errortext
            });
        }
    );
    
    export default service;
    
#####   1. application/x-www-form-urlencoded调用
    export function userLogin(params) {
        return request('/adminsystem/server/adminuser/login', {
            method: 'POST',
            data: params,
            dataType: 'FormData',
        });
    }
#####   2. multipart/form-data调用
    
#####   3. application/json调用
    export function userLogin(params) {
        return request('/adminsystem/server/adminuser/login', {
            method: 'POST',
            data: params,
        });
    }

##### post请求提交4种编码格式

##### 1. application/x-www-form-urlencoded 表单默认提交
    正常提交数据格式：
    Form Data
        username: admin
        password: 123456
        validCode: 0000
        
    实现方法:
    request('/user/login', {
        method: 'POST',
        data: params,
        transformRequest: [(data) => {
            let res = '';
            for (let i in data) {
                res += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return res;
        }]
    });


##### 2. multipart/form-data 上传文件
    正常提交数据格式：
    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
    Content-Disposition: form-data; name="username"
    admin
    
    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
    Content-Disposition: form-data; name="password"
    123456
    
    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
    Content-Disposition: form-data; name="validCode"
    0000
    
    提交方式:
        要提交的数据
            提交单文件：
                const { fileList } = this.state;
                const formData = new FormData();
                formData.append('file', fileList[0]);
                
                axios的异步接口(formData).then(res => {});
                
            提交多个文件
                const { fileList } = this.state;
                const formData = new FormData();
                fileList.forEach(file => {
                    formData.append('files[]', file); 
                });
                
                axios的异步接口(formData).then(res => {});
                
        services:
            export function axios的异步接口(params) {
                return request('/xxx', {
                    method: 'POST',
                    data: params,
                    headers: {
                        'Content-Type': false, // 必须, 告诉axios不要去处理发送的数据(重要参数)
                        // 'processData': false,   jq的ajax需要这个,axios不是必须  (告诉axios不要去设置Content-Type请求头)
                    }
                });
            }
            
        
        

##### 3. application/json  json格式
    正常提交数据格式：
    Request Payload
        {
            username: admin
            password: 123456
            validCode: 0000
        }
    
    实现方法:
        axios默认提交方式
    


##### 4. text/xml 

##### 注意：当使用application/x-www-form-urlencoded提交json格式数据的时候出现的问题

    提交数据的格式为：
        {"username":"admin","password":"123456","validCode":"0000"}:
        
    解决办法：
        改为1或者3的提交方式
    

    
