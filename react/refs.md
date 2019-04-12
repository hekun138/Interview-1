##### refs是什么
    refs是react一种特有的属性
    
    refs可以用来获取react中的真实DOM
    
    <div ref="aaa"></div>
    
    this.refs.aaa 获取到dom
    
##### 在组件中使用refs获取宽高
    export default class Demo extends Component {
        componentDidMount() {
            <!-- 获取元素 -->
            console.log(this.refs.target)
            console.log(this.refs.target2)
            <!-- 注意：使用元素时必须先判断元素是否已经存在 -->
            const { target, target2 } = this.refs;
            <!-- 获取元素宽高 -->
            if (target) {
                console.log(target.clientWidth)
                console.log(target.clientHeight)
            }
            <!-- 操作元素 -->
            if (target) {
                <!-- do something -->
            }
        }
    
        render() {
            return (
                <div className={`box`}>
                    <!-- 想要获取的元素 -->
                    <div ref={`target`}></div>
                    <span ref={`target2`}></span>
                </div>
            )
        }
    }