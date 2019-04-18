##### 写法
    HightComponent.js
    /* 最简单的高阶组件 */
    import React, { Component, Fragment } from 'react';
    // 传入一个组件MiddelComponent, 返回一个新的组件
    const HightComponent = (MiddeleComponent) => {
        return class extends Component {
            render() {
                return (
                    <Fragment>
                        <MiddeleComponent {...this.props} />
                    </Fragment>
                )
            }
        }
    };
    
    export default HightComponent;

##### 作用: 动态生成组件
    demo.js
    /* 调用高阶组件 */
    import HightComponent from './HightComponent';
    import DemoComponent1 from './DemoComponent1';
    import DemoComponent2 from './DemoComponent2';
    import DemoComponent3 from './DemoComponent3';
    
    const config = [DemoComponent1, DemoComponent2, DemoComponent3];
    
    
    const param = {
        a: 1,
        b: 2
    };
    <!-- 动态生成组件 -->
    const ele = config.map(item => {
       const NewComponent = HightComponent(item);
       return (
            <NewComponent {...param} />
        )
    });
    return ele;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    