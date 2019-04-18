##### 虚拟dom
    new Vue({
        1. DOM: (虚拟DOM和真实DOM之间绑定的桥梁)
            el:  根节点id
            template: 字符串模板
            render: 动态渲染dom, 取代el和template
            
        2. 数据
            data: 数据
            props: 数据传递(父 -> 子)
            computed: 计算属性(返回计算data的结果, 但是data不会被改变)
            methods: 事件处理器
            watch: 事件监听
            
        3. 生命周期钩子
        
            步骤: 未生成js对象 -> 生成js对象 -> 生成dom节点 -> 挂载
            
            第一阶段 (创建一个虚拟dom对象, 创建一个dom节点)
                1. beforeCreate 未实例化vue对象(js) 
                2. created      实例化vue对象(js)    
                3. beforeMount  创建dom节点
                4. mounted       vue对象挂载到dom节点上
            
            第二阶段 (操作js对象或者dom)
                5. beforeUpdate  数据更新前(操作前)
                6. updated       数据更新后(操作后)
            
            第三阶段 (销毁js对象)
                7. beforeDestroy vue对象销毁前    
                8. destroyed     vue对象销毁后(不销毁真实dom, 只销毁vue的实例化对象, 取消挂载, 所以vue不能在操作dom)
            
        
        4. 资源
            directives 自定义指令
            
            filters 过滤器
            
            components 组件
        
        5. 组合
            parent 
        
        
        6. 其他
            name: vue对象名
    });
    
    7. 全局API
    Vue.extend
        使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
    
    Vue.nextTick 
        在修改数据之后立即使用这个方法，获取更新后的 DOM
        
    Vue.use
        安装 Vue.js 插件



##### vue2.0 生命周期例子
    <!DOCTYPE html>
    <html>
    
    <head>
        <title></title>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
    </head>
    
    <body>
    
        <div id="app">
            <p>{{ message }}</p>
        </div>
    
        <script type="text/javascript">
    
            var app = new Vue({
                el: '#app',
                data: {
                    message: "xuxiao is boy"
                },
                beforeCreate: function () {
                    console.group('beforeCreate 创建前状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);       // undefined
                    console.log("%c%s", "color:red", "data   : " + this.$data);     // undefined 
                    console.log("%c%s", "color:red", "message: " + this.message);   // undefined 
                },
                created: function () {
                    console.group('created 创建完毕状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);       // undefined
                    console.log("%c%s", "color:red", "data   : " + this.$data);     // 已被初始化
                    console.log("%c%s", "color:red", "message: " + this.message);   // 已被初始化
                },
                beforeMount: function () {
                    console.group('beforeMount 挂载前状态===============》');
                    console.log("%c%s", "color:red", "el     : " + (this.$el));     // 已被初始化
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);     // 已被初始化  
                    console.log("%c%s", "color:red", "message: " + this.message);   // 已被初始化  
                },
                mounted: function () {
                    console.group('mounted 挂载结束状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);       // 已被初始化
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);     // 已被初始化
                    console.log("%c%s", "color:red", "message: " + this.message);   // 已被初始化 
                },
                beforeUpdate: function () {
                    console.group('beforeUpdate 更新前状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);
                    console.log("%c%s", "color:red", "message: " + this.message);
                },
                updated: function () {
                    console.group('updated 更新完成状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);
                    console.log("%c%s", "color:red", "message: " + this.message);
                },
                beforeDestroy: function () {
                    console.group('beforeDestroy 销毁前状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);
                    console.log("%c%s", "color:red", "message: " + this.message);
                },
                destroyed: function () {
                    console.group('destroyed 销毁完成状态===============》');
                    console.log("%c%s", "color:red", "el     : " + this.$el);
                    console.log(this.$el);
                    console.log("%c%s", "color:red", "data   : " + this.$data);
                    console.log("%c%s", "color:red", "message: " + this.message)
                }
            })
        </script>
    </body>
    
    </html>