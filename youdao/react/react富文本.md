##### api
    API
    https://www.yuque.com/margox/be
    官网
    https://braft.margox.cn/
    github网址
    https://github.com/margox/braft-editor
    
##### 将用户输入的信息转换成html格式或者raw格式
    // 将editorState数据转换成RAW字符串
    const rawString = editorState.toRAW()
    
    // editorState.toRAW()方法接收一个布尔值参数，用于决定是否返回RAW JSON对象，默认是false
    const rawJSON = editorState.toRAW(true)
    
    // 将editorState数据转换成html字符串
    const htmlString = editorState.toHTML()
    
##### 初始化富文本编辑器的值
    // 将raw格式的数据转换成editorState
    const rawString = `{"blocks":[{"key":"9hu83","text":"Hello World!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":5,"style":"BOLD"},{"offset":6,"length":5,"style":"COLOR-F32784"}],"entityRanges":[],"data":{}}],"entityMap":{}}`
    const editorState = BraftEditor.createEditorState(rawString)
    
    // 将html字符串转换成editorState
    const htmlString = `<p>Hello <b>World!</b></p>`
    const editorState2 = BraftEditor.createEditorState(htmlString)
    
    class Editor extends Component {
        constructor(props) {
            super(props);
            this.state = {
                // 初始化编辑器为空
                editorState: BraftEditor.createEditorState(null)
                // 初始化有值
                editorState: editorState2
            }
        }
    }
    