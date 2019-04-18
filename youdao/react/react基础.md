##### API
[Ant-Desing-Pro 动态加载目录](https://github.com/hf1120/dynamic-menu-router)
    
[react从0搭建项目教程](https://github.com/brickspert/blog)
        
 
##### 生命周期
[react生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
    
    1） 组件初始化阶段的生命周期
			componentWillMount：
				组件将要加载，render之前最后一次修改状态的机会
			render：
				只能访问this.props与this.state，只有一个顶层标签（组件），不允许修改状态和DOM输出
			componentDidMount：
				成功render并渲染完成真实DOM之后出发，可以修改DOM，要操作DOM也必须在这个阶段完成

	2） 组件运行中的生命周期
			componentWillReceiveProps：
				父组件修改属性触发，可以修改新属性，修改状态
			shouldCompoenntUpdate：
				组件是否更新，返回false会阻止render调用，render后面的函数都不会执行
			componentWillUpdate：
				不能修改属性与状态，用于日志打印与数据获取
			render：
				只能访问this.props与this.state，只有一个顶层标签（组件），不允许修改状态和DOM输出
			componentDidUpdate：
				可以修改DOM
	
	3)  组件销毁阶段
			componentWillUnmount：
				组件将要卸载
        
    4. 抓取异常
        componentDidCatch() 如果render() 函数抛出错误, 则会触发该函数
    
    componentWillMount: 在组件 render 之前执行且永远只执行一次。

    componentDidMount: 组件加载完毕之后立即执行，并且此时才在 DOM 树中生成了对应的节点，因此我们通过 this.getDOMNode() 来获取到对应的节点。
    
    componentWillUnMount:
    在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如穿件的定时器或者添加的事件监听器。
    
##### react reduce
    react reduce 相当于 vuex  状态管理
    
##### react native
    跨平台, 让虚拟DOM能被不同平台渲染(做梦?)

##### ReactDOM.render() 初始化react 元素渲染
    ReactDOM.render(element, document.getElementById('root'));
    ReactDOM.render(js虚拟dom, html元素节点); 
    将虚拟dom挂载到html元素节点上, 等同于new Vue({el: '#root'});
    
##### React.Component{} 和 props  组件 和 属性
    函数式组件
    1. 创建组件
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    
    2. 创建虚拟dom
    var element = <Wel name="xxx">;
    
    3. 调用组件 ---> 传入 props = {name="xxx"} ---> 渲染挂载
    ReactDOM.render(
        element,
        document.getElementById('root');
    );
    
    4. 所有 React 组件都必须是纯函数，并禁止修改其自身 props 
    
##### state 局部状态 (this.state用于存放参与数据交互的数据, this.props用于存放静态数据)
    类组件
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    在类组件中添加本地状态(state)
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    // 更新state
    this.setState({data: 'xxx'});
    
    // 解决state异步更新导致数据没有刷新问题
    this.setState((prevState, props) => ({
      data: prevState.data + props.data
    }));
    
    或
    
    this.setState(function(prevState, props) {
      return {
        data: prevState.data + props.data
      };
    });
    
##### 状态提升
    当多个平行组件需要使用同一个状态来控制render的时候，
    不需要在每个组件里面使用this.state来分别控制状态，这样代码会很臃肿，
    可以在父组件中传入对应的状态，在平行的子组件里面用this.props来控制render，这就是状态提升
    就是把多个平行组件的公用状态提升到父组件中传入
    
    
##### 组件的生命周期
    class Student extends Teacher {
        constructor(props) {
            super(props);
            this.state = {data: new Date()};
        }
        
        // 该"类组件" 的生命周期钩子
        
    }
    
##### 事件处理
    1. 事件绑定 ( a. 事件名onClick驼峰写法, b. 调用事件 {activateLasers} )
        <button onClick={activateLasers}></button>
    
    2. 阻止默认行为
        function ActionLink() {
          function handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked.');
          }
        
          return (
            <a href="#" onClick={handleClick}>
              Click me
            </a>
          );
        }
    
    3. 组件绑定事件
        class Toggle extends React.Component {
            constructor(props) {
                super(props);
                this.state = {onOff: true};
                
                this.handClick = this.handClick.bind(this);
            }
            
            handClick() {
                this.setState(prevState => ({
                    onOff: !prevState.onOff
                }));
            }
            
            render() {
                return (
                    <button onClick="{this.handClick}">
                        {this.state.onOff ? 'ON' : 'OFF'}
                    </button>
                );
            }
        } 
        
        ReactDOM.render(
            <Toggle />,
            documet.getElementById('root');
        );

##### 表单
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    
##### 使用组合创建组件(不使用继承)
    function Teacher(props) {
        return (
            <div>
                <!-- 组合方式允许其他任意组件给它传入子组件 -->
                {props.left}
                {props.middle}
                {props.right}
            </div>
        );
    }
    
    function Student() {
        return (
            <Teacher
                <!-- 给调用的组件插入子组件 -->
                {    
                    left = { 
                        <left />
                    }
                    middle = {
                        <middle />
                    }
                    right = {
                        <right />
                    }
                }
            />
        );
    }
    
    function left() {}
    function middle() {}
    function right() {}
    
##### 知识点
    this.props对当前组件而言是只读的
    props和state变化都可能引起重新render
    很多时候，组件是“单例”的
    注意JSX中的className，这是React的一个妥协，不那么优雅
    JSX中，内联样式必须通过js对象实现
    JSX中，可以为React元素设置一个JSON对象作为属性包，使用{...obj}的语法
    mixin感觉是继承的简化版，但很少用到。而且React在ES6语境下是不支持mixin的。
    使用this.props.children就可以访问React子元素
    React.findDOMNode(this.refs.q)也是一个不那么优雅的设计，但很有用
    现在跨域请求都流行用CORS了，不用JSONP了，不过貌似safari对CORS的支持有点问题
    
    
