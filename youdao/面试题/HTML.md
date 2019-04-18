##### 1. doctype(文档类型) 的作用是什么？
    https://witcher42.github.io/2014/05/28/doctype/
    
    使用不同的doctype在不同的浏览器中会激活不同的模式
    
    最常用的两种：
        1. <!DOCTYPE html>
            html5的doctype, 用于激活标准模式
        
        2. <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            XHTML 1.0 用于过渡的 doctype，它会激活准标准模式


##### 2. 浏览器标准模式 (standards mode) 、准标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？
    怪异模式不符合web标准, 准标准模式是几乎要符合标准, 标准模式符合web标准

    产生的历史原因是啥？
        IE5当时完全实现了最新的HTML4.0标准, 但是对于一些旧的网页不能兼容, 所以微软使用了一个解决方案 "DOCTYPE", 在<html>前面加上各种 doctype来激活 标准模式, 准标准模式, 以及怪异模式
    
    怪异模式有哪些怪异的行为？
        最明显的：标准盒子模型和怪异盒子模型
            盒模型由 magin, border, padding, content四部分组成
            标准盒子模型的宽高为 content的宽高 
            怪异盒子模型的宽高为 content的宽高 + border*2 + paddding*2


##### 3. HTML 和 XHTML 有什么区别？
    xhtml 语法要求严格，一旦遇到错误，立刻停止解析，并显示错误信息。

    XHTML 元素必须被正确地嵌套。

    XHTML 元素必须被关闭。
    
    标签名必须用小写字母。
    
    XHTML 文档必须拥有根元素。
    
    所有属性都必须使用双引号




##### 4. 如果页面使用 'application/xhtml+xml' 会有什么问题吗？
    如果页面使用'application/xhtml+xml',一些老的浏览器会不兼容。




##### 5. 如果网页内容需要支持多语言，你会怎么做？
    编码使用UTF-8，空间域名需要支持多浏览地址,准备多套模板。



##### 6. 在设计和开发多语言网站时，有哪些问题你必须要考虑？
       应用字符集的选择

        语言书写习惯&导航结构

        数据库驱动型网站

        css 盒子会因为内容尺寸不一样出现不对齐偏移




##### 7. 使用 data- 属性的好处是什么？

    好处：
        存取data-*的数据特别方便, 用于代替setAttribute和getAttribute
        var data = dom.dataset;

    用法：
        设置我们需要的自定义属性, 来进行一些数据的存放
        <div id="user" data-user-info="垃圾" data-age="19">1111111111111</div>
        var user = document.getElementById('user');
        
        // 取data-* 的值
        // 使用dataset.xxx
        console.log(user.dataset.userInfo);
        // 使用getAttribute()
        console.log(user.getAttribute('data-user-info'));
        
        // 设值
        user.dataset.name = "rubbish";
        console.log(user.dataset.name);
        
        // 获取全部data值
        console.log(user.dataset);
    




##### 8. 如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？
    <header>
    <nav> 
    <section> 
    <footer>




##### 9. 请描述 cookies、sessionStorage 和 localStorage 的区别。
    1.存储大小
        cookie数据大小不能超过4k。
        sessionStorage和localStorage 最大可达到5M
    
    2.有效时间
        cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
        sessionStorage  数据在当前浏览器窗口关闭后自动删除。不可以跨页面交互
        localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
        
    
    3. 数据与服务器之间的交互方式
        cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
        sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。



##### 10. 请解释 <script>、<script async> 和 <script defer> 的区别。

    <script> 当解析器遇到 script 标签时，文档的解析将停止，并立即下载并执行脚本，脚本执行完毕后将继续解析文档。
    
    <script async> 当解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，待到文档解析完成，脚本才会执行。
    
    <script defer> 当解析器遇到 script 标签时，文档的解析不会停止，其他线程将下载脚本，脚本下载完成后开始执行脚本，脚本执行的过程中文档将停止解析，直到脚本执行完毕。


##### 11. 为什么通常推荐将 CSS <link> 放置在 <head></head> 之间，而将 JS <script> 放置在 </body> 之前？你知道有哪些例外吗？
    浏览器从上到下依次解析html文档。将 css 文件放到头部， css 文件可以先加载。
    避免先加载 body 内容，导致页面一开始样式错乱，然后闪烁。将 javascript 文件放到底部是因为：
    若将 javascript 文件放到 head 里面，就意味着必须等到所有的 javascript 代码都被 下载、解析和执行完成
    之后才开始呈现页面内容。这样就会造成呈现页面时出现明显的延迟，窗口一片空白。
    为避免这样的问题一般将全部 javascript 文件放到 body 元素中页面内容的后面。
    页面加载的问题，先把页面加载出来，然后再去加载效果，提高用户体验度




##### 12. 什么是渐进式渲染 (progressive rendering)？
    对渲染进行分割 从具体的使用的场景, 不同的 Level 实际上对应不同的页面内容,论坛是一个比较清晰的例子, 想象一个论坛:
    网页的静态部分, HTML 固定的内容, 比如导航栏和底部
    
    页面首屏的内容, 比如一个论坛的话题
    
    页面首屏看不到的内容, 比如话题下面多少回复
    
    切换路由才会显示的页面, 比如导航的另一个页面
    
    对于这样的情况, 显然有若干种可行的渲染分割的方案
    
    全在客户端渲染
    
    1, 2, 3 在服务端渲染, 4 等到用户点击从浏览器抓
    
    1, 2 在服务器渲染, 评论由客户端加载
    
    只有 1 在服务端渲染, 动态的数据全部由客户端抓取.
    
    而这些方案对于服务端来说, 性能的开销各不相同, 形成一个梯度,
    而最后一种情况, 服务端预编译页面就好了, 几乎没有渲染负担.
    根据实际的场景, 可以有更多 Level 可以设计.. 只是没这么简单罢了.




##### 13. 你用过哪些不同的 HTML 模板语言？
    jade  jsx



##### 14. HTML5新标签