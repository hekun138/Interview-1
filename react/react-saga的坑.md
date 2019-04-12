##### saga
    saga相当于一个es6的Generator函数
    

##### takeEvery, takeLatest, takeLeading 事件的区别
    import { takeEvery, takeLatest, takeLeading } = 'redux-saga'; 
    
    // action 为redux的actionType   
    // saga 为指定的Generator函数
    // ...args 为saga的参数
    
    takeEvery(action, saga, ...args)
        任务并行, 可以同时触发所有任务
    
    takeLatest(action, saga, ...args)
        只监听最后一个任务, 并取消之前所有的takeLatest的任务
        
    takeLeading(action, saga, ...args)
        只监听第一个任务, 如果没有完成, 不监听下一个任务