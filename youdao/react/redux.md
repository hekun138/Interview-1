##### API
    http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
    
    store.getState()    获取当前状态
    store.dispatch(action)    发送修改状态
    store.subscribe()   监听修改状态

    1. Store 保存数据的地方, 容器, 整个应用只有一个Store
        生成store
            import { createStore } from 'redux';
            const store = createStore(fn);
        
    2. State 在Store中每个点(快照)的数据集合为一个state
        获取当前时刻的State
            import { createStore } from 'redux';
            const store = createStore(fn);

            const state = store.getState();
        
        一个 State 对应一个 View。只要 State 相同，View 就相同。
    
    3. Action 改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
            const action = {
              type: 'ADD_TODO',
              payload: 'Learn Redux'
            };
            
    4. Action Creator   自动生成Action的方法
            const ADD_TODO = '添加 TODO';

            function addTodo(text) {
              return {
                type: ADD_TODO,
                text
              }
            }
            
            const action = addTodo('Learn Redux');
            
    5. store.dispatch() store.dispatch()是 View 发出 Action 的唯一方法。
            // view发送action给store, 让它改变state
            import { createStore } from 'redux';
            const store = createStore(fn);
            
            store.dispatch({
              type: 'ADD_TODO',
              payload: 'Learn Redux'
            });
            
    6. Reducer  
        Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
        
        // 生成新的state
        const reducer = function (state, action) {
          // ...
          return new_state;
        };
        
    7. store.subscribe()
        监听state改变的触发的函数
        
    8. combineReducers
        用于拆分reduce, 因为combineReducers() 可以产生一个整体的Reducer 函数
    
    9. 流程
        store ---> 发送(当前的state, action) ---> reducer (计算返回一个新的state) ---> combineReducers(整合所有的reducer) ---> 返回给store  
        
        redux的数据流
        1. 调用store.dispatch(action)提交action。
        2. redux store调用传入的reducer函数。把当前的state和action传进去。
        3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
        4. Redux store 保存了根 reducer 返回的完整 state 树。
        
    10. redux引用报错
        因为有 redux和 react-redux, 二者不一样的, 需要区分清楚
        npm i --save redux react-redux
        1. redux
            // 使用redux里面的reateStore组件来创建一个store
            import {createStore} from 'redux';
            
        2. react-redux
            // Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
            import {Provider} from 'react-redux';
            
            // connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
            import {connect} from 'react-redux';
            
        3. redux-thunk 
            为了让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk。
        
        流程:
            createStore组件 创建store
            connect组件 传送store
            Provider组件 接收store
            
        在一个组件或者页面要先拿到action和connect, 利用connect将action发送出去,
    
    11. 高阶组件 (中间件)
        1. 高阶函数就是一个中间函数, 用来
        
        function welcome(username) {
            console.log('welcome ' + username);
        }
        
        function goodbey(username) {
            console.log('goodbey ' + username);
        }
        
        // 高阶函数
        function wrapWithUsername(wrappedFunc) {
            let newFunc = () => {
                // 1. 处理数据
                let username = localStorage.getItem('username');
                // 2. 传递给目标函数
                wrappedFunc(username);
            };
            return newFunc;
        }
        
        welcome = wrapWithUsername(welcome);
        goodbey = wrapWithUsername(goodbey);
        
        welcome();
        goodbey();
        
        2. 高阶组件就是一个没有副作用的纯函数。
            高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件)
            
        
    12. redux
        export {
            createStore,            // 创建一个state用来存储状态树
            combineReducers,        // 合并reducer
            bindActionCreators,     // 将dispatch和action结合
            applyMiddleware,        // 调度中间件来增强store，例如中间件redux-thunk等
            compose                 // 从右向左组合多个函数, compose(f, g, h)会返回(...args) => f(g(h(...args)))
        }
        const { createStore, applyMiddleware } from 'redux';
        
        1. createStore
            1.1 接收的参数
            createStore(reducer, preloadedState, enhancer)
            
            // reducer为function。当dispatch一个action时，此函数接收action来更新state
            // preloadState初始化State
            // enhancer 为function。用来增强store, Redux 定义有applyMiddleware来增强store
            
            //如果只传了两个参数，并且第二个参数为函数，第二个参数会被当作enhancer
            
            1.2 返回的方法
            return {
                dispatch,    // 触发action去执行reducer, 更新state
                subscribe,   // 订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
                getState,    // 获取state树
                replaceReducer, // 替换reducer
            }
            
        2. combineReducers
            整合reduce
            import {combineReducers} from 'redux';
            import reduce1 from 'reducers/reduce1';
            import reduce2 from 'reducers/reduce2';
            import reduce3 from 'reducers/reduce3';
            export default combineReducers({
                reduce1,
                reduce2,
                reduce3
            });
        
        3. applyMiddleware