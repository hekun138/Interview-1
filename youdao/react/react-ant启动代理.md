##### 启动代理

    第一种. 前端伪造接口
    .roadhogrc.mock.js 文件修改如下
        // 开启代理
        // const noProxy = process.env.NO_PROXY === 'true';
        const noProxy = true;
        
        export default (noProxy ? { "/*": "http://localhost:3000/" } : delay(proxy, 1000));
        
    第二种. 使用后台真实接口
    .webpackrc.js 文件添加如下
        hash: true,
        proxy: {
            '/api': {
                'target': 'http://localhost:3000/api',
                'changeOrigin': true,
                'pathRewrite': { '^/api': '' }
            }
        }
        
##### 动态生成目录
    // 暴露出去的fetch接口
    export async function getAuthMenus() {
        // 先请求数据  
    	return request('/api/menu').then(function(datas){
    	    // 请求成功返回一个promise成功对象
    		return new Promise(function (resolve) {
    		    // 在成功函数中处理数据
    			resolve(menuConfig.getMenuData(datas));
    		});
    	});
    }
    
##### hashHistory 和 browserHistory 的区别
    使用hashHistory,浏览器的url是这样的：/#/login/user

    使用browserHistory,浏览器的url是这样的：/login/user