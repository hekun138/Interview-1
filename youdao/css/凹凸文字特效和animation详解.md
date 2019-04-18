##### 样例
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            /* #009688 */
            p {
                width: 500px;
                height: 150px;
                border: 1px solid #009688;
                margin: 100px auto;
                text-align: center;
                font: 700 50px/150px 'Microsoft Yahei';
                background: #009688;
                color: #009688;
            }
    
            /* 凸 */
            .p1 {
                text-shadow: 1px 1px 1px #000, /* 黑色的阴影 */
                -1px -1px 1px #fff;            /* 白色的阴影 */
            }
    
            /* 凹 */
            .p2 {
                text-shadow: 1px 1px 1px #fff,  /* 白色的阴影 */
                -1px -1px 1px #000;             /* 黑色的阴影 */
            }   
        </style>
    </head>
    
    <body>
        <p class="p1">我是凸出来的文字</p>
        <p class="p2">我是凹进去的文字 </p>
    
    
    </body>
    
    </html>
    
##### text-shadow
    text-shadow: h-shadow v-shadow blur color;
    text-shadow: 水平阴影  垂直阴影  模糊效果  颜色, 水平阴影  垂直阴影  模糊效果  颜色;
    
##### animation(初始化就可以直接触发)
    animation: 动画名称	 完成动画所花费的时间  动画的速度曲线 动画开始时间 动画播放次数 是否应该轮流反向播放动画
    
##### animation实现多个动画
    animation: 第一个动画的参数, 第二个动画的参数, ... , 第n个动画的参数
    
##### animation-fill-mode: forwards;
    1. 当动画完成后，保持最后一个属性值
    或：animation: name 1.5s ease 1 forwards;
    
    2. 当使用forwards后，第二次使用动画加上 backwards，解决动画执行之前有一个初始值的闪烁bug
    
    none 表示不设置结束之后的状态，默认情况下回到跟初始状态一样。

    forwards 表示将动画元素设置为整个动画结束时的状态。
    
    backwards 明确设置动画结束之后回到初始状态。
    
    both 表示设置为结束或者开始时候的状态。一般都是回到默认状态。    

    
##### 在react中使用anition
    只要设置一个class
    .cls {
        animation: name 1.5s ease 1 forwards;
    }
    
    在js中动态添加动态className
    <div className={`xxx1 xxx2 ${cls}`}></div>

##### transform-origin
    设置旋转元素的基点位置
    
    
##### transiton(需要事件触发)
    transiton: 过渡属性 过渡所需要时间 过渡动画函数 过渡延迟时间;
    
    触发过渡
    单纯的代码不会触发任何过渡操作，需要通过用户的行为（如点击，悬浮等）触发，可触发的方式有： 
    :hoever :focus :checked 媒体查询触发 JavaScript触发
    
    局限性
    transition的优点在于简单易用，但是它有几个很大的局限。 
    （1）transition需要事件触发，所以没法在网页加载时自动发生。 
    （2）transition是一次性的，不能重复发生，除非一再触发。 
    （3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。 
    （4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。 
    CSS Animation就是为了解决这些问题而提出的。
    
##### transform
    
    1.translate(x,y):平移，将画布的坐标原点向左右方向移动x，向上下方向移动y.canvas的默认位置是在（0,0）.
    
    2.scale（x,y）：扩大。x为水平方向的放大倍数，y为竖直方向的放大倍数。
    
    3. rotate(x,y,z) : 旋转角度