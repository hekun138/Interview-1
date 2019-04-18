##### 节流：react防止每秒触发多次同样的请求
    import { throttle, debounce } from 'lodash'
    
    class Demo extends Component {
        constructor(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        // 给事件加上延迟时间
        this.handleClickThrottled = throttle(this.handleClick, 1000, {
            leading: true,
            trailing: false,
        });
        // {leading: false，trailing: true}：默认情况，即在延时结束后才会调用函数
        // {leading: true，trailing: true}：在延时开始时就调用，延时结束后也会调用
        // {leading: true, trailing: false}：只在延时开始时调用
        
        
        componentWillUnMount() {
            this.handleClickThrottled.cancel();
        }
        
        handleClick = e => {
            console.log(e.target);
        }
        
        render() {
            return (
                <div>
                    <button onClick={this.handleClickThrottled}>风门测试</button>
                </div>
            )
        }
    }