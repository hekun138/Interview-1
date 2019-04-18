##### fetch封装
    import * as fetch from 'isomorphic-fetch';
    import { message } from 'antd';
    import createHistory from 'history/createHashHistory';
    const history = createHistory();
    
    // 提示框
    message.config({
        top: 100,
        delay: 3,
        maxCount: 1,
    });
    
    // 处理状态码
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
    }
    
    export default function request(url, options) {
        // 设置 cookie可以跨域
        options.credentials = 'include';
    
        // JSON格式数据
        if (!(options.body instanceof FormData)) {
            options.headers = {
                Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8',
            };
            options.body = JSON.stringify(options.body);
        } else {
            // FormData格式数据
            options.headers = {
                Accept: 'application/json', 'Content-Type': 'multipart/form-data',
                ...options.headers,
              };
        }
    
        // 设置链接超时
        const xhr = Promise.race([
            fetch(url, options),        
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('请求链接超时')), 15000)  // 设置超时时间
            })
        ]);
    
        return xhr.then(checkStatus)
                .then(response => {
                    return response.json();
                })
                .catch(e => {
                    message.error(e + '');
                });
    };
