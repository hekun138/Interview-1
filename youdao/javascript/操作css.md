##### window.getComputedStyle()
    
    window.getComputedStyle(element, null);
    
    // node 元素节点     name 属性名
    function getStyle(node, name){
      var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
      return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    };
    
    getComputedStyle 和 element.style的异同
    相同点:
        getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象，
        取相应属性值得时候都是采用的 CSS 驼峰式写法，均需要注意 float 属性。
        
    不同点:
        1. element.style 读取的只是元素的“内联样式”，即 写在元素的 style 属性上的样式；
        而 getComputedStyle读取的样式是最终样式，包括了“内联样式”、“嵌入样式”和“外部样式”。  
        2. element.style 既支持读也支持写，我们通过 element.style即可改写元素的样式。
        而 getComputedStyle 仅支持读并不支持写入。
        
    结论: 
            可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式