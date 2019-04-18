##### 使用webpack的require.context来动态导入所有stores
    作用：不需要每次新增删除store都去修改index.js
    所有stores的模块全部放在 stores/modules/目录下
    
    1. stores/index.js
    
        import stores from './modules';
        
        export default stores;
    
    2. stores/modules/index.js
    
        // 获取当前目录下所有的js文件
        const files = require.context('.', false, /\.js$/);
        // 用来保存所有stores
        const stores = {};
        
        files.keys().forEach(key => {
            // 如果是 index.js文件不保存
            if (key === './index.js') return;
            // 清除文件的 ./和.js，作为key，保存对应store模块
            stores[key.replace(/\.\/|\.js/g, '')] = files(key).default;
        })