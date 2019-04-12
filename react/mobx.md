##### api
    1. observable （相当于redux的initState）
        作用: 
            监听store中的所有的state
        格式：
            @observable key = value;
    
    2. computed
        state改变触发@computed, @computed产生的新值可以被observable监听
    
    3. reactions(autorun的变种)
        data为store中的一个指定的一个或者多个state, 当这些指定的state发生变化的时候, 触发reactions
        reactions(() => data, fn)
        第一个参数: 追踪并返回数据给第二个参数使用
        第二个参数: 处理返回的数据
        
    4. actions
        @actions （相当于redux的action + reduce）
            定义个actions方法, 类似redux的action,
            但是在redux中 使用setState({action: actionType}) 来触发这个action
            在mobx中 使用 对应store类.action来触发这个action
            
        注意： 
            @actions无法影响当前函数调用的异步操作
    
    5. @inject(...store) （相当于redux的@connect, 用于导入对应的store）
        将组件连接到提供的 stores, 使用this.props.xxx 调用注册过的store
        
    6. @observer 
        observer将 React 组件转变成响应式组件
        
    7. runInAction
        处理action中的异步操作
        
    8. flows
        使用generator函数的形式来进行异步操作
        
##### 部署
    1. 组件中导入store
        import { observer, inject } from 'mobx-react';
        import A from '@/store/a';
        import B from '@/store/b';
        
        @inject('A', 'B') @observer
        export default xxx extends Component {
            render() {
                const { xxx } = this.props.A;
                return (
                
                )
            }
        }
    
    2. store书写格式
        import { observable, action, reaction, computed, runInAction } from 'mobx';
        import login from '@/services/login';
        
        class A {
            @observable xxx = '';
            
            constructor() {
                reaction();
            }
            
            @action.bound
            async fn(params) {
                const res = await login(params);
                runInAction(() => {
                    this.xxx = res.xxx;
                });
            }
        }
        
        export default new A();
        
##### 关于数据
    经过@observable 暴露过的数据都变成了 observable对象格式
    
    如 observableArray, 有的组件不支持, 只支持原生的数组, 就需要将 observableArray 转换成 Array
    假设 list 是一个 observableArray
    if (list instanceof Object && !(Array.isArray(list))) {
        list = Array.prototype.slice.call(list)
    }
    
##### 封装一个可以配置可以复用的表格查询接口
    import a from 'a';
    import b from 'b';
    import c from 'c';
    
    const apiObj = {
        'a': a,
        'b': b,
        'c': c
    };
    
    class ApiStore {
        @observable currentApi = null; // 当前要查询接口
        
        @action.bound
        async apiAction(apiName, params, callback) {
            for (let [key, value] of Object.entries(apiObj)) {
                if (apiName === key) {
                    this.currentApi = value;
                }
            }
            const res = await this.currentApi(params);
            runInAction(() => {
                if (!res) return;
                // xxx
            })
        }
    }
    
    
    // 使用
    this.props.ApiStore.apiAction('a', params)