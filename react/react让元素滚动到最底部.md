##### 滚动到最底部（顶部原理一样）
    利用生命周期 componentDidUpdate
    和 scrollIntoView() 默认为true
    scrollIntoView() 为滚动顶部
    scrollIntoView(false) 为滚到底部
    
    render() {
        return (
            <ul id="box">
                // 这里动态插入不定数量的li
                
                // 这里设置一个隐藏的底部元素
                <div id="box_end" style={{ height: 0, overflow: 'hidden' }}></div>
            </ul>
        )
    }
    
    // 每次重新动态插入节点li，并且render完之后，才到生命周期 componentDidUpdate
    // 组件更新之后，消息盒子滚动到最底部
    componentDidUpdate() {
        if (document.getElementById('box')) {
            document.getElementById('box_end').scrollIntoView(false);
        }
    }