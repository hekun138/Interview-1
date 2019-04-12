##### react的路由按需加载
    作用：路由按需加载，避免首次加载时间过长
    
    1. router/asyncRouter.js 代码如下：
        作用：异步加载所有路由模块
        
        import Loadable from 'react-loadable';
        import Loading from '@/components/Loading';
        
        // 主页
        const Home = Loadable({
            loader: () => import('@/views/Home'),
            loading: Loading,
        });
        
        // 游戏页
        const Lottery = Loadable({
            loader: () => import('@/views/Lottery'),
            loading: Loading,
        });
        
        // 图表分析
        const Chart = Loadable({
            loader: () => import('@/views/Chart'),
            loading: Loading,
        });
        
        export default {
            Home,
            Lottery,
            Chart
        }
    
    2. router/index.js 代码如下：
    作用：在路由中引入异步加载模块 asyncRouter
    
    import React, { Component } from 'react';
    import { LocaleProvider } from 'antd';
    import zhCN from 'antd/lib/locale-provider/zh_CN';
    import 'moment/locale/zh-cn'; // 时间组件中文
    import { withRouter, HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
    import createHistory from 'history/createHashHistory';
    import asyncRouter from './asyncRouter';
    
    const history = createHistory();
    
    // @withRouter
    class GetRouter extends Component {
        render() {
            return (
                <LocaleProvider locale={zhCN}>
                    <Router>
                        <Switch>
                            <Route path="/home" component={ asyncRouter.Home } history={ history } />
                            <Route path="/lottery/:id" component={ asyncRouter.Lottery } history={ history } />
                            <Route path="/chart/:id" component={ asyncRouter.Chart } history={ history } />
                            <Redirect to="/home" />
                        </Switch>
                    </Router>
                </LocaleProvider>
            )
        }   
    }
    
    export default GetRouter;
    
    3. src/index.js 代码如下：
    
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { Provider } from 'mobx-react';
        import stores from './stores';
        import GetRouter from './router';
        import './index.less';
        import * as serviceWorker from './serviceWorker';
        import '@/mock';
        
        ReactDOM.render(
            <Provider {...stores}>
                <GetRouter />
            </Provider>,
            document.getElementById('root')
        );
        
        serviceWorker.unregister();

    