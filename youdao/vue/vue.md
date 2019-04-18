##### vue全家桶: router  axios  vuex

##### 属性和事件
    绑定属性：
        v-bind:xxx="" 或 :xxx=""
        如
    绑定事件:
        v-on:xxx="" 或 @xxx=""

##### vue组件注册的两种方式
    1. Vue.component('xxx', xxx);
    
    2. Vue.prototype.$Message = Message;
    第二种方式适用于 使用this.$xxx 来调用的组件

##### 1.模板语法
    Mustache语法：{{msg}}
    Html赋值：	v-html = ""
    绑定属性：	v-bind:id = ""
    使用表达式：{{ok ? 'YES' : 'NO'}}
    文本赋值：  v-text = ""
    指令：		v-if = ""
    过滤器：	{{message | capitalize}} 和 v-bind:id = "rawId | formatId"

##### 2.Class和Style绑定
    对象语法：	v-bind:class = "{active: isActive, 'text-danger': hasError}"
    数组语法：	<div v-bind:class = "activeClass, errorClass">
    			data: {
    				activeClass: 'active',
    				errorClass:	'text-danger'
    			}
    style绑定-对象语法： v-bind:style = "{color:activeColor, fontSize: fontSize + 'px'}"

##### 3.条件渲染
    v-if=""    true显示，false隐藏	(dom节点直接被删除)
    v-else=""
    v-else-if
    v-show=""		(display)
    v-cloak=""

##### 4.vue事件处理器
    v-on:click = "greet" 或者 @click = "greet"  greet为自定义事件的函数名
    v-on:click.stop				组织冒泡
    v-on:click.stop.prevent		阻止默认事件
    v-on:click.self				只给自己绑定事件，子元素无效
    v-on:click.once				只绑定一次事件
    
    v-on:keyup	键盘案件事件
    	v-on:keyup.enter	Enter按下事件
    	v-on:keyup.tab		Tab按下事件		
    	v-on:keyup.delete	Backspace和Delete按下事件
    	v-on:keyup.esc		Esc按下事件
    	v-on:keyup.space	空格按下事件	
    	v-on:keyup.up		上箭头按下事件
    	v-on:keyup.down		下箭头按下事件
    	v-on:keyup.left		左箭头按下事件
    	v-on:keyup.right	右箭头按下事件

##### 5.Vue组件(重点)
	1)全局组件和局部组件
	
    2)父子组件通讯-数据传递
	父组件 ---> 子组件 (通过 props: ['']对象 传递数据,父组件在引用子组件的时候通过子组件的属性传递给props,单项绑定)
	子组件 ---> 父组件 (通过 Emit Events 传递数据,this.$emit(''),在子组件中触发父组件的事件)
	
	3)Slot
		插槽,用于给组件预留位置
	
组件使用步骤：
	1) 创建组件		xxx.vue						(创建子组件)
	2) 导入组件		import xxx from '组件url'	(父组件中导入子组件)
	3) 加载组件     components: {				(父组件中加载子组件)
						xxx
					}
					
	4) 引用组件		<xxx></xxx>					(父组件中引用子组件)

##### 6.什么是前端路由？
	路由是根据不同的url地址展示不同的页面或内容
	前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做,之前是通过服务端根据url的不同返回不同的页面实现的
	
  什么时候使用前端路由？
	在单页面应用,大部分页面结构不变,只改变部分内容的使用
	
  前端路由有什么优点和缺点？
	优点：用户体验好，不需要每次都从服务器全部获取,快速展现给用户
	缺点：不利于SEO;
		  使用浏览器的前进,后退键的时候会重新发送请求,没有合理的利用缓存;
		  单页面无法记住之前滚动的位置,无法在前进,后退的时候记住滚动的位置;
	
	vue-router用来构建SPA
	<router-link></router-link>或者this.$router.push({path:''})		用于页面的跳转,类似a标签,前者用于html的标签,后者用于js中
	<router-view></router-view>		用于页面的渲染
	
	vue-router的重定向:
	    开发中有时候我们虽然设置的路径不一致，但是我们希望跳转到同一个页面，或者说是打开同一个组件。
	    这时候我们就用到了路由的重新定向redirect参数。
	    我们只要在路由配置文件中(/src/router/index.js)把原来的component换成redirect参数就可以了。
	
	动态路由匹配
	嵌套路由
	编程式路由
	命名路由和命名视图
	
	1)动态路由
	模式								匹配路径							$route.params
	/user/:username						/user/evan							{user.name: 'evan'}
	/user/:username/post/:post_id		/user/evan/post/123					{user.name: 'evan', post_id: 123}
	
	使用步骤：
		1.创建路由	xxx.vue
		2.导入路由		
					import Vue from 'vue'				先导入vue框架
					import Router from 'vue-router'		再导入vue-router插件
					import xxx from '路由的url'			再导入自定义路由
		3.加载路由

			Vue.use(Router)		给Vue对象加载vue-router插件		
			
			加载自定义路由
			export default new Router({
				mode: 'history',		(或mode: 'hash')			history后接url,hash后接#
				routers: [
					{
						path: 'goods/:goodsId/user/:name',			http://localhost:8080/#/goods/3/user/lanyu		此时3为:goodsId,name为:lanyu,通过这样的方式可以访问路由		
						name: 'GoodsList',							路由的名字
						components: GoodsList						路由的模板
					}
				]
			})
		4.路由展示	<span>{{$route.params.goodsId}}<span>
					<span>{{$route.params.user}}<span>
			
	
	2)嵌套式路由
		导入-加载子路由：
			import Vue from 'vue'
			import Router from 'vue-router'
			import GoodsList from './../views/GoodsList'	父路由导入
			import Title from '@/views/Title'				子路由导入
			import Image from '@/views/Image'				子路由导入

			Vue.use(Router)

			export default new Router({
			  routes: [
				{
				  path: '/goods',
				  name: 'GoodsList',
				  component: GoodsList,				父路由加载
				  children: [						子路由加载
					{
						path: 'title',
						name: 'title',
						component: Title			
					},
					{
						path: 'img',
						name: 'img',
						component: Image			
					}
				  ]
				}
			  ]
			})
		
		父路由GoodsList.vue内引用渲染子路由：
			<router-link to="/goods/title">显示商品标题</router-link>			路由跳转  to="绝对路径"
			<router-link to="/goods/image">显示商品图片</router-link>
			<div>
			  <router-view></router-view>										路由渲染
			</div>
			
	3)编程式路由
	
		通过js来实现页面的跳转(name为index.js里面设置的该路由的path)
		$router.push('name')
		$router.push({path: 'name'})
		$router.push({path: 'name?a=123'})
		$router.push({path: 'name', query: {a:123}})
		$router.go(1)
		
		$router.push	传递参数($router)
		$route.query.a	接收参数($route)
		
	4)命名路由和命名视图
		
		给路由定义不同的名字,根据名字进行匹配
		给不同的router-view定义名字,通过名字进行对应组件的渲染
		
		<router-link v-bind:to="{name: 'cart', params: {cartId:123}}">用名字绑定购物车组件</router-link>
		
		component: xxx		加载单一组件
		components: {		加载多个组件
			default: xxx,	默认组件,调用方式<router-view></router-view>
			title: Title,	其他组件,调用方式<router-view name="title"><router-view>		title为name的key，用于获取对应的值Title,值为组件名
			img: Image		其他组件,调用方式<router-view name="img"><router-view>			img为name的key，用于获取对应的值Image,值为组件名
		}
		
##### 7.Vue-Resource插件(非官方推荐插件)

	1)	安装：npm i vue-resource --save		安装该插件(在项目的主目录下, 也就是package.json配置文件所在的目录下安装才能成功)

	2)	API：
		get(url, [options])
		head(url, [options])
		delete(url, [options])
		jsonp(url, [options])
		post(url, [body], [options])
		put(url, [body], [options])
		patch(url, [body], [options])
		参数						类型							描述
		url							string							请求的URL
		methods						string							请求的HTTP方法,例如：'GET', 'POST'或者其他HTTP方法
		body						Object,FormDatastring			request body
		params						Object							请求的URL参数对象
		headers						Object							request header
		timeout						number							单位为毫秒的请求超时时间(0 表示无超时时间)
		before						function(request)				请求发送前的处理函数, 类似宇Jq的beforeSend函数
		progress					function(event)					ProgressEvent回调处理函数
		credientials				boolean							表示跨域请求时是否需要使用凭证
		emulateHTTP					boolean							发送put, patch, delete请求时以HTTP POST的方式发送, 并设置请求头的X-HTTP-Method-Override
		emulateJSON					boolean							将request body以application/x-www-form-urlencode content type发送

	3） 全局拦截器	interceptors
		mounted: function () {
			Vue.http.interceptors.push((request, next) => {
				//请求发送前的处理逻辑
				console.log('request init' )
				next((response) => {	
					//请求发送后的处理逻辑
					//根据请求的状态, response参数会返回给successCallback或errorCallback
					console.log('response init' )
					return reponse;
				})
			});
		}

	4)	get + post + jsonp + http
	this.$http都是跨域请求,必须在服务器中才能使用此功能
	
	methods: {
		get() {
			this.$http.get('请求的url', {
				params: {
					//请求的参数对象
				},
				headers：{
					//请求头
					token : 'xxx'
				}
		   }).then(res => {
				console.log(res.data)		//res.data	请求成功返回的数据
		   }, error => {
				console.log(error)			//error		请求失败返回的数据
		   })
		},
		post() {
			this.$http.post('package.json', {
				userId: '102',
			}, {
				headers: {
					access_token: 'abc'
				}
			}).then(res => {
				this.msg = res.data;
			}, error => {
				console.log(error)
			})
		},
		jsonp() {
			this.$http.jsonp('http://www.imooc.com/course/AjaxCourseMember?ids=796').then(res => {
				this.msg = res.data;
			}, error => {
				console.log(error);
			})
		},
		http() {
			this.$http({
				url: "package.json",
				params: {
					userId: '103'
				},
				headers: {
					token: '123'
				},
				timeout: 5,
				before() {
					console.log('before init')
				}
			}).then(res => {
				this.msg = res.data;
			});
		}
	}

	5) 设置请求默认的url
	http: {
		root: "http://localhost:8080/demo3/demo3"	//root,用于配置全局的请求地址
	}
		

##### 8. axios(官方推荐插件)

	1) 安装	npm i axios --save		安装该插件(在项目的主目录下, 也就是package.json配置文件所在的目录下安装才能成功)
	
	2)	API：
		axios.request(config)
		axios.get(url[, config])
		axios.delete(url[, config])
		axios.head(url[, config])
		axios.options(url[, config])
		axios.post(url[, data[, config]])
		axios.put(url[, data[, config]])
		axios.patch(url[, data[, config]])
		
	3)	合并请求
	
		两个请求
		function getUserAccount() {
			return axios.get('user/12345');
		}
		function getUserPermissions() {
			return axios.get('user/12345/permissions');
		}
		
		合并上面两个请求
		axios.all([getUserAccount(), getUserPermissions()])
			.then(axios.spread(function (acct, perms){
				//合并两个请求
			})) 
			
	4)	get + post + http
		mounted: function () {
			//拦截发送的请求
			axios.interceptors.request.use(function (config) {
				//配置前拦截到用户所有的请求
				console.log('request init');
				return config;
			}),
			//拦截响应的请求
			axios.interceptors.response.use(function (response) {
				console.log('response init');
				return response;
			})
		},
		methods: {
			get() {
				axios.get('package.json', {
					params: {
						useId: '999'
					},
					headers: {
						token: 'jack'
					},
					before() {
						console.log('before init')
					}
				}).then(res => {
					this.msg = res.data;
				}).catch(error => {
					this.msg = error;
				})
			},
			post() {
				axios.post('package.json', {
					useId: '888'
				}, {
					headers: {
						token: 'tom'
					}
				}).then(res => {
					this.msg = res.data;
				}).catch(error => {
					this.msg = error;
				})
			},
			http() {
				axios({
					url: 'package.json',
					methods: 'get',
					data: {				//post方法传输数据
						userId: '101'
					},
					params: {			//get方法传输数据
						userId: '102'
					},
					headers: {
						token: 'http-test'
					}
				}).then(res => {
					this.msg = res.data;
				}).catch(error => {
					this.msg = error;
				})
			}
		}
	
	5)	axios在src目录中调用的时候出现 axios is not defined 的报错
		解决：
			在main.js中添加两行代码导入axios:
				import axios from 'axios'
				Vue.prototype.$ajax = axios
				
			在组件中使用axios的方式：
				使用 this.$ajax 代替原来的 axios 即可,其他不变
			
##### 9. Vuex (状态管理, 类似window这个全局变量) 
	导入Vuex： 
		import Vuex from 'Vuex'
	新建一个Vuex对象: 
		const store = new Vuex.Store({
			state: {
				num: 0
			},
			getters: {},
			mutations: {
				add(state) {
					state.num++
				}
			},
			actions: {
				add(context) {
					// 使用actions异步提交改变状态
					context.commit('add')
				}
			},
			
		});
		
		new Vue({
			el: "#app",
			store,
			data() {
				return {}
			}
		});
		
		// 在#app的子组件中的computed监听num变化, methods中使用mutations同步提交改变状态
		computed: {
			// 监听num变化
			fn1: {
				return this.$store.state.num
			}
		},
		methods: {
			// 提交num变化
			this.$store.commit('add')
		}
		
	使用Vuex对象获取保存的数据: 
		this.$store.state

	可以避免大量使用$emit等
	9.1 State(this.$store.state)
		State唯一的数据源, 我们将所有数据放在State中, 让所有组件都可以调用到它
		单一状态树
	
	9.2 Getters
		通过Getters可以派生出一些新的状态
	
	9.3 Mutations(提交改变状态)
		更改Vuex的store中的状态的唯一方法是提交mutation
	
	9.4 Actions
		action提交的是mutations, 而不是直接变更状态
		action可以包含任意异步操作
	
	9.5 Modules
		面对复杂的应用程序, 当管理的状态比较多时, 我们需要将Vuex的store对象分割成模块(modules)
		const moduleA = {
			state: {},
			mutations: {},
			actions: {},
			getters: {},
		}
		
		const moduleB = {
			state: {},
			mutations: {},
			actions: {},
			getters: {},
		}
		
		const store = new Vuex.Store({
			modules: {
				a: moduleA,
				b: moduleB
			}
		})
		
	在组件中使用vuex中的state
	<div v-if="isShow"></div>
	
	import { mapState } from 'vuex';
	export default {
	    computed: {
	        ...mapState({
	            isShow: state => state.对应modules名称.isShow
	        })
	    }
	}
		
##### vue项目常用第三方依赖
    npm i --save vue
    axios   // ajax插件
    vue-router          // 路由
    vuex                // 状态管理
    babel-polyfill  // 解析es6
    js-cookie       // cookie插件
    js-md5          // md5加密
    lib-flexible    // 淘宝移动端自适应
    px2rem-loader   // px转换rem
    style-loader    // css
    vue             // vue框架
    vue-awesome-swiper  // 滑动门插件
    vue-clipboard2      // 剪贴板插件
    iView               // 综合插件(可以按需引用里面需要的组件)
    
##### babel-polyfill 插件
    使用:
        在main.js头部引入
        import 'babel-polyfill'; // 或 require('babel-polyfill');
    
    功能:
        1. babel 用于转换javascript的ES6新句法
    
        2. polyfill 用于转换javascript的ES6新API
    
##### axios 插件
    
    调用 在main.js中添加两行代码导入axios:
    import axios from 'axios' 
    Vue.prototype.$ajax = axios

    在组件中使用axios的方式： 使用 this.$ajax 代替原来的 axios 即可,其他不变
    
##### lib-flexible 插件
    https://blog.csdn.net/yanzhi_2016/article/details/80461951
    使用:
        在main.js头部引入
        import 'lib-flexible/flexible.js';
    
    注意:
        1. 检查一下html文件的head中，如果有 meta name="viewport"标签，需要将他注释掉，因为如果有这个标签的话，lib-flexible就会默认使用这个标签。而我们要使用lib-flexible自己生成的 meta name="viewport"来达到高清适配的效果。
        
        2. 因为html的font-size是根据屏幕宽度除以10/20计算出来的，所以我们需要设置页面的最大宽度是10rem/20rem。
        
        3. 如果每次从设计稿量出来的尺寸都手动去计算一下rem，就会导致我们效率比较慢，还有可能会计算错误，所以我们可以使用px2rem-loader自动将css中的px转成rem

##### px2rem-loader 插件
    1. 打开build/utils.js文件，找到exports.cssLoaders方法，在里面添加如下代码
    const px2remLoader = {
        loader: 'px2rem-loader',
        options: {
          remUint: 37.5
        }
    }
    
    2. 修改generateLoaders方法中的loaders
    // 注释掉这一行
    // const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // 修改为
    const loaders = [cssLoader, px2remLoader]
     
    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }
    
    然后重新npm run dev，打开控制台可以看到代码中的px已经被转成了rem
    
    注意：

    1.此方法只能将.vue文件style标签中的px转成rem，不能将script标签和元素style里面定义的px转成rem

    2.如果在.vue文件style中的某一行代码不希望被转成rem，只要在后面写上注释 /* no*/就可以了
    
#####  vue-clipboard2 剪贴板插件
    import VueClipboard from 'vue-clipboard2';
    Vue.use(VueClipboard);
    
##### vue-awesome-swiper 滑动门插件
    http://www.swiper.com.cn/api/pagination/414.html
    
    使用:
        import "swiper/dist/css/swiper.css";
        import { swiper, swiperSlide } from "vue-awesome-swiper";
        
##### iView 弹窗插件
    https://www.iviewui.com/docs/guide/start
    
    使用
        import iView from 'iview';
        import 'iview/dist/styles/iview.css';
        Vue.use(iView);
        
    可按实际需要按需引用内部的组件
    
    注意:
        1. message按需加载使用的时候报错, 原因是因为通过$Message这种调用的组件不能用component注册
        https://segmentfault.com/q/1010000012098343
        正确写法:
            Vue.prototype.$Message = Message;
        
        import { Alert, Button, Icon, Message } from 'iview';
        Vue.component('Alert', Alert);
        Vue.component('Button', Button);
        Vue.component('Icon', Icon);
        Vue.prototype.$Message = Message;
        import 'iview/dist/styles/iview.css';
        
    

##### vue 动态加载图片src的解决办法
    https://blog.csdn.net/mr_yanyan/article/details/78783091
    
    将图片放到static目录下，但必须写成绝对路径
    