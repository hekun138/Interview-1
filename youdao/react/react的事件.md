#####  常用事件

事件名 | 事件对应的方法
---|---
触摸事件 | onTouchCancel，onTouchEnd，onTouchMove，onTouchStart
键盘事件 | onKeyDown，onKeyUp， onKeyPress（前两者的组合）
表单事件 | onChange，onInput，onSubmit
焦点事件 | onFocus，onBlur
UI元素事件 | onScroll
滚动事件 | onWhell（鼠标滚动）
鼠标事件 | onClick，onContextMenu，onDoubleClick…...

##### 所有事件都有的事件属性（事件对象）
事件属性名字 | 属性类型
--- | ---
bubbles（事件是否可以冒泡） | boolean
cancelable（事件是否可以取消） | boolean
currentTraget（） | DOMEventTargent
defaultPrevented（事件是否禁止默认属性） | boolean
enentPhase（事件所处阶段） | number
isTrusted（是否可信，用户操作可信，js代码不可信）	| boolean
nativeEvent（浏览器的默认事件） | DOMEvent
preventDefault()（阻止默认行为） | void
stopPropagation()（阻止冒泡） | viod
target（拿到节点） | DOMEventTargent
timeStame（时间戳） | number
type（事件类型） | string

##### 键盘事件拥有的属性
事件属性名字 | 属性类型
--- | ---
altKey（是否按下alt建键） | Boolean
charCode（字符编码） | number
ctrlKey（是否按下ctrl键） | Boolean
getModifierState（是否按下辅助按键，alt，ctrl等等）	 |
key（按下的键） |	
keyCode（按键编码） | 

##### 鼠标事件拥有的属性
事件属性名字 | 属性类型
--- | ---
clientX（浏览器窗口的左上角） | number
clientY | number
PageX（HTML页面的左上角） | number
PageY | number
screenX（显示器的左上角） | number
screenY | number