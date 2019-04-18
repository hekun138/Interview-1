##### 实时监听输入框值变化
     // Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9
        function OnInput (event) {
            alert ("The new content: " + event.target.value);
        }
    // Internet Explorer
        function OnPropChanged (event) {
            if (event.propertyName.toLowerCase () == "value") {
                alert ("The new content: " + event.srcElement.value);
            }
        }
    
    <input type="text" oninput="OnInput (event)" onpropertychange="OnPropChanged (event)" value="Text field" />