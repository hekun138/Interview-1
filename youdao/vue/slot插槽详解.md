##### 插槽基础
    <slot></slot>
    作用：用来预留一块位置，让使用组件的人可以放任何东西来替换<slot></slot>这个标签
    
    例：
        声明组件cm-table
        <div class="cm-table">
            <slot></slot>
        </div>
        
        调用它
        <cm-table>
            <span>123</span>
        </cm-table>
        
        这里<span>123</span>替换了<slot></slot>
        如果没有slot,则<span>123</span>放入cm-table组件失败
        
##### 具名插槽
    在需要多个插槽的时候使用
    
    例：
        声明组件cm-row
        <div class="cm-row">
            <slot name="cm-col"></slot>
        </div>
        
        调用它
        <cm-row>
            <div slot="cm-col"></div>
        </cm-row>
        
##### 插槽默认内容
    <slot>这里放默认内容，用户如果插入其他内容才会替换掉</slot>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


