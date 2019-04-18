##### 通用流程
    ---> 创建多个 store的modules对象 
    ---> new一个Vuex.store({ modules }) 整合这些modules 
    ---> 在main.js中将store挂载到 vue的虚拟dom上
    ---> 在组件中调用store(this.$store.state)以及修改store(this.$store.dispatch(actionType, payload))
    
    1. 创建多个 store的 modules 对象
    /store/modules/moduleA.js
    const moduleA = {
        state: { 全局状态 },
        mutations: { 每个actionType对应的同步或者异步操作 },
        actions: { 提交组件触发的修改state的事件 },
    }
    
    export default moduleA
    
    /store/modules/moduleB.js
    /store/modules/moduleC.js
    ...
    同上
    
    2. 整合所有的modules到store实例中
    /store/index.js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import moduleA from './modules/moduleA'
    import moduleB from './modules/moduleB'
    import moduleC from './modules/moduleC'
    ...
    
    Vue.use(vuex)
    
    const store = new Vuex.Store({ 
        modules: {
            moduleA,
            moduleB,
            moduleC,
            ...
        },
        // 其他Store中间件
    })
    
    3. 将store挂载到vue实例上
    /src/main.js
    import Vue from 'vue'
    import store from './store'
    
    new Vue({
        store
    })
    
    4. 在组件中使用store
        4.1 调用state
        <template>
            <div>
                <Component-A v-if="AAA"></Component-A>
                <Component-B v-if="BBB"></Component-B>
                <Component-C v-if="CCC"></Component-C>
            </div>
        </template>
        <script>
            import { mapState } from 'vuex'
            
            export defaule {
                computed: {
                    ...mapState({
                        AAA: state => state.moduleA.AAA,
                        BBB: state => state.moduleB.BBB,
                        CCC: state => state.moduleC.CCC,
                    })
                }
            }
        </script>
        
        4.2 修改state
        <template>
            <div>
                <Component-A @click="toggleTabs('actionA', 'argA')"></Component-A>
                <Component-B @click="toggleTabs('actionB', 'argB')"></Component-B>
                <Component-C @click="toggleTabs('actionC', 'argC')"></Component-C>
            </div>
        </template>
        <script>
            exrpot default {
                methods: {
                    toggleTabs(actionType, arg) {
                        this.$store.dispatch(actionType, arg)
                    }
                }
            }
        </script>
        
##### dispatch传参和接收
    组件内: (actionType为对应的actions中的key, arg为传送的参数)
        <Component-XXX @click="fn('actionType', 'arg')"><Component-XXX>
    
        exrpot default {
            methods: {
                fn(actionType, arg) {
                    this.$store.dispatch(actionType, arg)
                }
            }
        }
        
    modules中
        const xxx = {
            state: {
            
            },
            mutations: {
                ACTION_TYPE_NAME (state, payload) {
                    // payload = { type: 'ACTION_TYPE_NAME', arg: 'arg'}
                    // 修改state的操作
                }
            },
            actions: {
                async actionType ({ dispatch, commit }, arg) {
                    // 同步
                    // 提交写法1
                    commit('ACTION_TYPE_NAME', await getData(arg))
                    // 提交写法2
                    commit({
                        type: 'ACTION_TYPE_NAME',
                        payload: await getData(arg),
                    })
                    // 异步(用于在另一个action触发之后使用)
                    dispatch({
                        
                    })
                   
                }
            }
        }
        
        export default xxx;
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    