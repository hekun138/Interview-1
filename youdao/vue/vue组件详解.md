##### 1. 创建一个组件
    /common/Table/index.vue
    cm-table组件
    <template>
        <table>
            <thead></thead>
            <tbody></tbody>
            <tfoot></tfoot>
        </table>
    </template>
    <script>
        export default {
            name: 'CmTable', // 声明组件名
            
            components: {
                // 导入子组件
            },
            
            props: {
                // 对外暴露的接口，接收传入的参数
                // 基础类型检测
                span: Number,
                // 多个可能类型
                offset: [String, Number],
                // 必填
                data: {
                    type: Object,
                    required: true,
                },
                // 默认值
                list: {
                    type: Array,
                    default() {
                        return [0]
                    }
                }
            },
            
            provide() {
                return {
                    
                }
            },
            
            data() {
                // 组件内声明的数据
                return {
                    
                }
            },
            
            watch: {
                // 
            },
            
            methods: {
                // 组件内声明的方法函数  
            },
            
            // 以下都是vue的生命周期
            render() {
                
            },
            
            created() {
                
            },
            
            mouted() {
                
            },
            
            updated() {
                
            }
        }
    </script>
    
    <style scoped lang="less">
    
    </style>
    
##### 2. 将所有公共组件保存到一个数组中
    /common/index.js
    import CmTable from './Table';
    
    const components = [
        CmTable,
    ];
    
    export default components
    
##### 3. 将所有的组件注册到vue实例中
    /src/main.js
    import Vue from 'vue'
    import common from './common'
    
    common.forEach(component => {
        // 注册组件
        Vue.component(component.name, component);
    });
    
    new Vue({
        components: { App },
        template: '<App/>',
    }).$mount('#app')
    


























