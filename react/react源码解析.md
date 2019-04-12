```
node - react 项目搭建的过程分析
现在很多人都使用yarn, 在这里不讨论yarn和npm的区别, 本文中的 yarn 和 npm 可以看成都是npm
从 npm i -g create-react-app 到 项目搭建好 我们都做了什么？
安装react脚手架 
每一步都为什么要这么做？
```
##### 1. 项目初始化
	npm i -g create-react-app 做了什么
		1. 我可以从npm官网上看到，npm通过命令行工具在终端运行，那么这个命令行工具在哪？
		
		2. 不管是什么操作系统，一般系统的环境变量都放在系统的/bin,/sbin,/usr/bin,/local/bin等目录下，
			而npm的命令行工具是随着node下载的，所以我们只要找到node的安装路径即可，如果出现命令查找不到，那么便是安装路径没有添加到环境变量中
		
		3. node的安装路径下我们可以看到两个文件, 一个是npm, 一个是npm.cmd, 前者中写的是linux的shell脚本, 后者是windows的shell脚本
			npm脚本做了些什么？
			通过环境变量找到node.exe和npm-cli.js，并且执行用户输入的命令。
			
		4. npm-cli.js做了些什么操作？
			4.1 判断环境中是否启动了WScript，如果启动了就终止命令的执行，应该是为了防止病毒的侵入
			4.2 npm配置
			4.3	输出日志
			4.4 执行命令
			
		5. npm i 和 npm i -g 本地安装和全局安装的区别
			npm i 是将包安装到当前目录下的 \node_modules\ 下
			npm i -g 是将包安装到 C:\Users\(对应的用户目录)\AppData\Roaming\npm\node_modules\ 下
			
		小结：当用户输入npm i -g create-react-app的时候， 系统通过查找环境变量进入node的安装目录下，运行了npm脚本，npm脚本查找到node.exe和npm-cli.js，并执行 node.exe npm-cli.js i -g create-react-app
		
##### 2. 使用create-react-app脚手架创建react目录
	1. 创建项目
		create-react-app react-project
		
	2. 安装yarn
		npm i -g yarn
	
	3. 使用create-react-app创建项目之后，选择扩展webpack配置的几种方式：
		https://blog.csdn.net/qq_22889599/article/details/79507721
	
		3.1 使用eject
			执行 yarn run eject
			它会提示你，你确定要使用eject吗，这个行为是永久的，就是说你的项目webpack配置将固定在当前版本，记得此时你的目录必须是干净的，否则它会叫你删除你在之前放入的文件再eject一次
			执行成功之后，这些依赖默认添加到 "dependencies" 中，你需要自己将那些打包需要和项目运行需要的依赖拆分，
			网上的统一观点：
				devDependencies用于开发环境
				dependencies用于生产环境
				但是实际上dependencies在生产和开发环境都可以使用，而devDependencies在生产环境不会被打入包内
				那么就把项目中使用到的(在/src/中使用import导入的)依赖放在dependencies中，其实初始化也就只有react和react-dom
				其余的放入devDependencies中
			
			yarn run eject 做了什么操作？
				它将create-react-app手脚架内置的配置从/node_modules/中反编译出来放在了项目根目录下
				首先找到项目根目录的package.json中的script.eject，执行里面的语句 react-scripts eject
				程序会到 /node_modules/.bin/ 下查找 react-scripts(linux) 或 react-scripts.cmd(windows) 并且执行
				/node_modules/.bin/ 下的脚本执行了什么操作？
					判断当前目录下是否存在node.exe，如果有那么用node.exe执行，如果没有就使用node命令代替node.exe
					然后找到对应的js文件并执行
					
			react-scripts.js做了什么操作？
				从react，es6，babel,webpack编辑到打包，react-scripts都做了。		
				


		3.2 使用react-app-rewired(涉及源码)
			npm run start 
			---> package.json  scripts: { "start": "react-app-rewired start" }	(react-app-rewired start 找到index.js)
					为什么react-app-rewired start能找到对应的start呢?
					因为在/node_modules/.bin/react-app-rewired.amd 目录中，做了处理
					echo %~dp0%  打印得知这个变量是  项目根目录/src  
					判断项目根目录/src是否存在node.exe
					@IF EXIST "%~dp0\node.exe" (
						如果有就使用node执行
					  "%~dp0\node.exe"  "%~dp0\..\react-app-rewired\bin\index.js" %*
					) ELSE (
					  @SETLOCAL
					  @SET PATHEXT=%PATHEXT:;.JS;=;%
						如果没有就使用全局的node命令执行启动
					  node  "%~dp0\..\react-app-rewired\bin\index.js" %*
					)
					
					// 相当于执行 node ./node_modules/react-app-rewired/bin/index.js
					
			--->	start.js ---> path.js ---> config-overrides.js ---> index.js ---> 项目根目录/config-overrides		
					
			---> /node_modules/react-app-rewired/index.js 
					
					该脚本做了哪些操作？
						返回了对象
						{
							getLoader,				// getLoader(rules, matcher)
							loaderNameMatches,		// loaderNameMatches(rule, loader_name)
							getBabelLoader,			// getBabelLoader(rules)	获取babel解析配置，解析es6, es7等语法使用
							injectBabelPlugin,		// injectBabelPlugin(plunginName, config)
							compose,				// compose(...funcs)
							paths					// {...各种路径}		
						}
						
						用到了thunk函数来获取外部传入的loader	一层一层的往里面传参数并且处理
						injectBabelPlugin(pluginName, config) ---> getBabelLoader(config.module.rules) ---> getLoader(rules, babelLoaderMatcher) ---> getLoader(rules, matcher) --->  babelLoaderMatcher(rule) ---> loaderNameMatches(rule, loader_name)
					
				
			---> /node_modules/react-app-rewired/scripts/start.js	(启动dev环境的脚本)	
					该脚本做了哪些操作?
						引入paths
						// 下面这两个webpack配置文件很熟悉了吧
						引入webpack.config.dev
						引入webpackDevServer.config.js
						
						加载上面引入的webpack配置文件
						
						如果我想自动配置webpack，pack.json怎么去传给paths我要的路径		scriptVersion ---> custom_scripts ---> '--scripts-version' ---> custom_scripts
						
			---> /node_modules/react-app-rewired/utils/paths.js	
							paths做了哪些操作?
								1. try to detect if user is using a custom scripts version	尝试检测用户是否使用自定义脚本版本	
									推测 --scripts-version 用来重写自定义脚本 
									需要重写自定义脚本, 我们就要定义脚本的位置，那么传进来的就要是变量参数，可以使用npm的内部变量设置脚本路径
								2. Allow custom overrides package location 允许自定义重写包位置

3. react源码
		cjs/			二级入口
		node_modules/
		umd/			react框架源码
		index.js		主入口
		LICENSE			许可说明
		package.json	配置
		README.MD		项目说明文件
			
		3.0 package.json
			该项目的依赖
				loose-envify	让process-env加快速度用的
				object-assign	就是es6的object.assign()方法，用来合并多个对象，可以去除对象中key相同的元素，保留最后一个，去除对象中的null和undefined
				prop-types		项目中常用属性检查，指定你传进来的变量是否一定存在，指定变量的类型等，如果传入的变量和你所期待的不一样，将会警告或者报错，有助于开发人员快速定位问题
				schedule		用于在浏览器环境中进行协作调度的包。它目前由React内部使用，暂无公共API

			
		3.1 index.js
			判断是生产环境还是开发环境，这个环境在webpack的配置文件中配置
			
		3.2 cjs/react.development.js
			React  v16.5.2版本
			(function() {
				1. 设置版本号，定义一些特殊的react常量，处理对象遍历方法
				
				2. invariant断言	lowPriorityWarning日志输出	warningWithoutStack，warnNoop(栈错误警告) 这些方法在生产环境中都会被废弃
				
				3. react队列	组件是否加载完成isMounted	强制更新队列enqueueForceUpdate	队列状态替换enqueueReplaceState		队列状态设置enqueueSetState
				
				4. 创建Component基础类，PureComponent基础类
				
				5. 确保react正确的使用者
				
				6. ReactElement，createElement 创建react元素的方法
				
				7. 克隆和移除key,克隆元素，判断元素是否有效
				
				8. 获取当前上下文
				
				9. 遍历所有子节点
				
				10. 校验key，校验子节点key
			})()
			
			到了我们重点关注的react(v16.4.2)源码了，问题来了，源码该如何看呢？
			一开始，我尝试从头到尾一行一行的去解读这些源码，但是我发现，它渐渐的让我失去了兴趣。然后我开始试着用其他方式来阅读源码，那就是从我最熟悉的方向去突破它。
			打印React和ReactDOM查看有哪些熟悉的API
				React: {
					Children,
					Component,		//		2
					Fragment,			
					PureComponent,	
					StrictMode,
					cloneElement,
					createContext,
					createElement,
					createFactory,
					createRef,
					forwardRef,
					isValidElement,
					unstable_AsyncMode,
					unstable_Profiler,
					version,
					__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
				}	
					
				ReactDOM: {
					createPortal,
					findDOMNode,
					flushSync,
					hydrate,
					render,			//		1
					unmountComponentAtNode,
					unstable_batchedUpdates,
					unstable_createPortal,
					unstable_createRoot,
					unstable_flushControlled,
					unstable_interactiveUpdates,
					unstable_renderSubtreeIntoContainer,
					__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
				}
				
				
			那么阅读源码的方向就来了：
				1. 如何创建一个react根节点
					ReactDOM.render(React.Component, 真实DOM)
					开发环境下引用的是 /node_modules/react-dom/cjs/react-dom.development.js
					
					先拉到文件最后，找到 module.exports = reactDom; 看看输出了什么？
						这里react的开发人员开了一个玩笑，但是最终的结果，对外输出ReactDOM
						
					找到ReactDOM定义的地方，var ReactDOM = {
						这里定义了ReactDOM以及刚刚打印出来的那些相关API
						往下找到 
    						render: function (element, container, callback) {
                                return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
                            },
                            打印element,可以看到传入的react根组件有的属性：
                                {
                                    $$typeof: Symbol(react.element)  react元素节点特有标记
                                    key: null,  没有为根组件设置key
                                    props: 属性
                                    ref: 可以用来获取真实dom
                                    type: { 
                                        childContextTypes: 子元素上下文环境,
                                        contextTypes: 上下文环境,
                                        name: 'Provider', 根节点的名称 <Provider></Provider> 
                                    },
                                    _owner: null, 
                                    _store: {},
                                    _self:null,
                                    _source: {
                                        fileName: '传入element的文件的地址',
                                        lineNumber: 11, 从第几行开始
                                    }
                                    
                                }
                            
						它传入三个参数(虚拟dom组件， 真实dom容器，回调函数)，返回了一个函数legacyRenderSubtreeIntoContainer(null, element, container, false, callback);，
						
					找到legacyRenderSubtreeIntoContainer定义的地方
						legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback)
						
						isValidContainer(container)，判断传入的真实DOM是否是react支持的容器节点，如果不是，抛出错误，如果是，返回void 0(undefined)，继续进行下面的操作
						
						topLevelUpdateWarnings(container) // 判断容器节点是否已经存在  然后输出警告信息
						
						// 判断根容器节点是否已经存在，如果不存在，进行初始化
						var root = container._reactRootContainer;
						if (!root) {
						    // 这里使用了thunk函数
						    // void 0 === undefined  void 0 永远返回undefined 而undefined是window的一个属性，可以给它赋值，这样undefined就不再是undefined了
						    --->    getReactRootElementInContainer(container)   // 判断react容器是否存在，如果不存在，返回null，如果存在且为文档节点，返回文档节点，如果不是文档节点，返回容器下的第一个子节点
						    --->    shouldHydrateDueToLegacyHeuristic(container) // 判断如果容器为元素节点，并且有 'data-reactroot' 返回true，否则返回false
						    --->    legacyCreateRootFromDOMContainer(container, forceHydrate) // 递归删除容器的所有子节点，确保容器中不存在任何子节点， 如果容器的最后一个子元素节点且含有属性'data-reactroot'就抛出警告信息，最后返回一个新的react根节点 new ReactRoot(container, isAsync, shouldHydrate);
						    
						    --->    ReactRoot(container, isAsync, shouldHydrate)  // 调用createContainer 创建React根节点的类 
						            ---> createContainer(container, isAsync, shouldHydrate) return createFiberRoot()
						            ---> createFiberRoot(container, isAsync, shouldHydrate) // 调用createHostRootFiber 返回根节点root
						            ---> createHostRootFiber(isAsync)  // return createFiber()
						            ---> createFiber(tag, pendingProps, key, mode) // return new FiberNode
						            ---> new FiberNode(tag, pendingProps, key, mode)
						            
						    root = container._reactRootContainer =  legacyCreateRootFromDOMContainer(container, forceHydrate)
						}
						    
					
				2. 常用的React.Component是什么
					React.Component
					
			
			
			
		3.3 umd/react.development.js
								
								
								
								
								
								
```			
  scriptVersion: 'C:\\Users\\lanyu\\Desktop\\react-demo\\node_modules\\react-scripts',
  configOverrides: 'C:\\Users\\lanyu\\Desktop\\react-demo/config-overrides',
  customScriptsIndex: -1,
  dotenv: 'C:\\Users\\lanyu\\Desktop\\react-demo\\.env',
  appPath: 'C:\\Users\\lanyu\\Desktop\\react-demo',
  appBuild: 'C:\\Users\\lanyu\\Desktop\\react-demo\\build',
  appPublic: 'C:\\Users\\lanyu\\Desktop\\react-demo\\public',
  appHtml: 'C:\\Users\\lanyu\\Desktop\\react-demo\\public\\index.html',
  appIndexJs: 'C:\\Users\\lanyu\\Desktop\\react-demo\\src\\index.js',
  appPackageJson: 'C:\\Users\\lanyu\\Desktop\\react-demo\\package.json',
  appSrc: 'C:\\Users\\lanyu\\Desktop\\react-demo\\src',
  yarnLockFile: 'C:\\Users\\lanyu\\Desktop\\react-demo\\yarn.lock',
  testsSetup: 'C:\\Users\\lanyu\\Desktop\\react-demo\\src\\setupTests.js',
  proxySetup: 'C:\\Users\\lanyu\\Desktop\\react-demo\\src\\setupProxy.js',
  appNodeModules: 'C:\\Users\\lanyu\\Desktop\\react-demo\\node_modules',
  publicUrl: '.',
  servedPath: './',
  ownPath: 'C:\\Users\\lanyu\\Desktop\\react-demo\\node_modules\\react-scripts',
  ownNodeModules: 'C:\\Users\\lanyu\\Desktop\\react-demo\\node_modules\\react-scripts\\node_modules' }
  ```
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  