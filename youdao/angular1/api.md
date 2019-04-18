###   常用api

api | 作用介绍 | 参数
---|---|---
ng-app  |  根节点
ng-controller  |  控制器的挂载(js-html之间的连接)
ng-click  |  点击事件
ng-dbclick  |  双击事件
ng-mousedown/up  |  鼠标按下/抬起
ng-mouseenter/leave  |  鼠标进入/离开
ng-mousemove/over/out  |  鼠标移动/移入/移出
ng-keydown/up/press  |  键盘按键按下/抬起/点击
ng-focus/blur  |  聚焦/失焦
ng-submit  |  提交
ng-readonly  |  对按钮不起作用  提交数据时与disabled不同
ng-selected  |  下拉菜单被选中时触发
ng-change  |  输入框中的数据发生改变时触发
ng-copy  |  复制
ng-cut  |  剪切
ng-paste  |  粘贴
ng-disabled  |  按钮禁用
ng-checked  |  checkbox被选中
ng-value  |  值
ng-model  |  双向数据绑定
ng-cloak  |  页面加载时防止应用闪烁
ng-bind  |  单向数据绑定  变量（html标签无效）<p ng-bind="foo"></p>
ng-bind-html  |  单向数据绑定  变量（html标签有效）<p ng-bind-html="foo"></p>
ng-bind-template  |  单向数据绑定  表达式（html标签无效）<p ng-bind-template="{{foo}}"></p>
ng-non-bindable  |  以下段落不需要使用 AngularJS 来编译
ng-class  |  类，可以是字符串，对象，或一个数组
ng-style  |  样式
ng-href  |  链接
ng-src  |  地址可以是变量 <div ng-init="mysrc = 'www.baidu.com'"><img ng-src="{{mysrc}}" /></div>
ng-attr-(suffix)  |  自定义html的属性
ng-show  |  是否显示
ng-hide  |  是否隐藏
ng-if  |  true显示/false隐藏
ng-swtich  |  根据选中的值显示对应部分  ng-switch-when-on / ng-switch-when-default(默认显示的) / ng-switch-when(匹配父节点 ng-switch中的值显示)   
ng-open  |  用于设置 details 列表的 open 属性
ng-init  |  初始化数据
ng-include  |  用于包含外部的 HTML 文件，包含的内容将作为指定元素的子节点，不能跨域
ng-options  |  <select ng-options="for in list"></select>
ng-repeat  |  遍历($index 索引，$firsh， $middle，$last，$even，$odd)
ng-repeat-start + ng-repeat-end  |  多行遍历 实现ng-repeat 无法实现的遍历
ngRoute  |  $routeProvider 路由when，template，templateUrl，otherwise  
$http  |  http服务
$q  |  相当于jq的defer延迟对象，promise的实现，defer()， resolve() 成功时触发， reject()失败时触发，notify() 通知时使用，then()监听的成功或失败的回调处理
$location  |  absUrl(),网址信息的绝对地址, path()路径 和路由挂钩的, replace()对原来的hash值进行替换, hash()hash 值设置, search() search值设置, url()获取网址信息  路径、hash 、search值, host()主机名, port()端口号, protocol()协议
$anchorScroll  |  锚点跳转
$cacheFactory  |  缓存, info(), put(), get(), remove(), 配置capacity
$log  |  日志，log()， info()， warn()， error()
$interpolate  |  插值服务
$scope  |  控制器作用域 
$rootScope  |  全局作用域
run函数  |  定义全局变量
$timeout  |  定时器，设置定时器 $timeout(fn, [delay], [invokeApply]); 取消定时器$timeout.cancel([promise])
$filter  |  用于在js中对数据进行过滤处理
$watch  |  监听数据变化
$apply  |  监听数据变化并传播
$on  |  监听子controller中的$scope.xxx的变化，使用$emit('xxx')
$emit  |  向上进行传播的方式，将$scope.xxx的变化发送给$on触发
$emitted  |  以下的核心系统事件可以使用$on在这个链网上的任意作用域里监听这些方法 例如：$scope.$on('$includeContentLoaded', fn)
$includeContentLoaded  |  当ng-include的内容重新加载时，从ng-include指令上触发该事件
$includeContentRequested  |  从调用ng-include的作用域上发送，每次ng-include的内容被请求时，它都会被发送
$viewContentLoaded  |  每当ng-view内容被重新加载时，从当前ng-view作用域上发送
$locationChangeStart  |  当angular从$location服务($location.path(),$location.search()等)对浏览器的地址做更新时，会触发该事件
$locationChangeSuccess  |  当浏览器地址成功变更，并且没有阻止$locationChangeStart事件的情况下，从$rootScope上广播出来
$routeChangeStart  |  在路由变更发生之前，从$rootScope发送出来
$routeChangeSuccess  |  在路由变更成功之后，从$rootScope发送出来
$destroy  |  作用域被销毁之前，一般用来清除定时器$timeout等
$valid / ng-valid  |  Boolean 告诉我们这一项当前基于你设定的规则是否验证通过
$invalid / ng-invalid |  Boolean 告诉我们这一项当前基于你设定的规则是否验证未通过
$pristine / ng-pristine  |  Boolean 如果表单或者输入框没有使用则为True
$dirty / ng-dirty   |  Boolean 如果表单或者输入框有使用到则为True
$error  |
type  |  input的类型
email  |  email校验
number  |  数字校验
url  |  url校验
required  |  是否必填
ng-minlength  |  最小长度
ng-maxlength  |  最大长度
ng-pattern  |  自定义校验规则
angular.module  | 
angular.bind  |  
angular.copy  | 
angular.extend  | 
angular.isArray  |  判断是否为数组
angular.isDate  |  判断是不是时间对象
angular.isDefined  |  判断元素是否存在
angular.isUndefined  |  判断元素是否不存在
angular.isFunction  |  判断是否是函数
angular.isNumber  |  判断是否是数字
angular.isObject  |  判断是否为对象
angular.isString  |  判断是否为字符串
angular.isElement  |  判断是否为一个元素
angular.version  |  判断angular库的版本
angular.equals   |  判断是否相等
angular.forEach  |  循环
angular.fromJson/toJson  |  字符串转json/json转字符串
angular.identity/noop  |  将参数显示出来 /空函数
angular.lowercase/uppercase  |  转小写/转大写
angular.element  |  获取元素 
angular.bootstrap  |  动态初始化两个app时使用
angular.injector  |  注册器
currency(过滤器)  |  货币金额  
number(过滤器)  |  数值
lowercase/uppercase(过滤器)  |  大小写
json(过滤器)  |  json数据
limitTo(过滤器)  |  极限值
date(过滤器)  |  日期
orderBy(过滤器)  |  排序
filter(过滤器)  |  自定义过滤器
filter()  |  自定义过滤器
directive()  |  自定义指令
factory()  |  自定义服务
provider()  |  自定义服务


    