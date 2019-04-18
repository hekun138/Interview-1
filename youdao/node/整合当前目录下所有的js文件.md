##### 一般用于vuex, mobx, redux等整合modules
    // 遍历当前目录下所有除了index.js之外的js文件，保存在modules中
    const files = require.context('.', false, /\.js$/)
    const modules = {}
    
    files.keys().forEach(key => {
      if (key === './index.js') return
      modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
    })
    // 返回的所有vuex状态管理对象
    // console.log(modules);
    
    export default modules