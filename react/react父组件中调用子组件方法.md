##### 父组件调用子组件 ref
    ref:
        ref表示对组件真正实例的引用, 其实就是ReactDOM.render()返回的组件实例
        需要区分一下，ReactDOM.render()渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点。
        
        原理, 利用ref 将子组件实例挂载到父组件上

    子组件
        class Table extends PureComponent {
            state = {};
            
            componentDidMount() {
                // 2. 触发父组件的方法, 返回的参数为 子组件实例(ReactDOM.render())
                this.props.onRef(this);
            }
            
            // 1. 声明子组件的方法
            handleMethods = () => {
                // ...具体代码
            }
        }
        
    父组件
        class Pages extends PureComponent {
            state = {};
            
            // 4. 将子组件实例挂载到父组件上
            // 这里的ref就是 子组件实例
            onRef = (ref) => {
                this.childTable = ref;
            }
            
            // 5. 调用子组件的方法
            handleCommit = () => {
                console.log(this.childTable);
                
                this.childTable.handleMethods();
            }
            
            render() {
                return (
                    // 3. 父组件接收子组件实例
                    <Table onRef={this.onRef} />
                );
            }
        }