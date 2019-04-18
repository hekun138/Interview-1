##### 组件分类
    react内置组件
        1. 基础组件
            View        搭建用户界面的最基础组件。
            Text        显示文本内容的组件。
            Image       显示图片内容的组件。
            TextInput   文本输入框。
            ScrollView  可滚动的容器视图。
            StyleSheet  提供类似CSS样式表的样式抽象层。
        
        2. 交互控件
            Button      一个简单的跨平台的按钮控件。
            Picker      在iOS和Android上调用各自原生的选择器控件。
            Slider      滑动数值选择器。
            Switch      开关控件。
        
        3. 列表视图
            FlatList    高性能的滚动列表组件。
            SectionList 类似FlatList，但是多了分组显示。
        
        4. iOS 独有组件
            ActionSheetIOS      从设备底部弹出一个显示一个ActionSheet弹出框选项菜单或分享菜单。
            AlertIOS            弹出一个提示对话框，还可以带有输入框。
            DatePickerIOS       显示一个日期/时间选择器。
            ImagePickerIOS      插入图片。
            NavigatorIOS        UINavigationController的封装，用于实现页面的导航跳转。
            ProgressViewIOS     渲染一个UIProgressView进度条。
            PushNotificationIOS 管理推送通知，包括权限处理和应用角标数字。
            SegmentedControlIOS 渲染一个UISegmentedControl顶部选项卡布局
            TabBarIOS           渲染一个UITabViewController底部选项卡布局。需要和TabBarIOS.Item搭配使用。
        
        5. Android 独有组件
            BackHandler             监听并处理设备上的返回按钮。
            DatePickerAndroid       打开日期选择器。
            DrawerLayoutAndroid     渲染一个DrawerLayout抽屉布局。
            PermissionsAndroid      对Android 6.0引入的权限模型的封装。
            ProgressBarAndroid      渲染一个ProgressBar进度条。
            TimePickerAndroid       打开时间选择器。
            ToastAndroid            弹出一个Toast提示框。
            ToolbarAndroid          在顶部渲染一个Toolbar工具栏。
            ViewPagerAndroid        可左右翻页滑动的视图容器。
        
        6. 其他
            ActivityIndicator       显示一个圆形的正在加载的符号。
            Alert                   弹出一个提示框，显示指定的标题和信息。
            Animated                易于使用和维护的动画库，可生成流畅而强大的动画。
            CameraRoll              访问本地相册。
            Clipboard               读写剪贴板内容。
            Dimensions              获取设备尺寸。
            KeyboardAvoidingView    一种视图容器，可以随键盘升起而自动移动。
            Linking                 提供了一个通用的接口来调起其他应用或被其他应用调起。
            Modal                   一种简单的覆盖全屏的模态视图。
            PixelRatio              可以获取设备的像素密度。
            RefreshControl          此组件用在ScrollView及其衍生组件的内部，用于添加下拉刷新的功能。
            StatusBar               用于控制应用顶部状态栏样式的组件（即手机顶部的显示电量、时间、wifi的状态栏）。
            WebView                 在原生视图中显示Web内容的组件。
    
    react第三方组件
        1. react-navigation         导航库
        
        
##### 常用组件及API解析
    onLayout
        通用API  用于获取当前组件的x, y坐标以及width和height
        
    getLayout = e => {
        alert(e.nativeEvent.layout.x);
        alert(e.nativeEvent.layout.y);
        alert(e.nativeEvent.layout.width);
        alert(e.nativeEvent.layout.height);
    }
    
    onLayout = {this.getLayout}

    1. View 容器组件
    
    <View 
        onLayout={this.getLayout}
    >
    </View>
        
    2. Text 文本组件
    <Text
        onLayout={this.getLayout}
        // 指定字体是否随着给定样式的限制而自动缩放
        adjustsFontSizeToFit={true}
        // 限制文字显示为几行
        numberOfLines={1}
        // 文本被长按后触发的回调函数
        onPress={this.textPress}
        // 决定用户是否可以长按选择文本，以便复制和粘贴
        selectable={true}
    >
    </Text>
        
    3. TextInput 输入组件
    
    handleChangeText = (text) => {
        alert(text)
    }
    
    clear = () => {
        this.input.clear();
    }
    
    <TextInput
        // 提示文字和颜色
        placeholder='请输入账号'
        placeholderTextColor='gray'
        // 默认值 value的值不可删除，所以使用defaultValue代替
        defaultValue='asdsadasd'
        // 决定弹出的什么类型的键盘
        keyboardType='default'
        // 限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。 
        maxLength={15}
        // 多行输入
        multiline={true}
        // 文本框内容变化时调用的回调
        onChange={this.handleChange}
        // 文本框内容变化时调用的回调，并且会传回输入的文本
        onChangeText={this.handleChangeText}
        // 获取当前input
        ref={input => this.input = input}
        // 失去焦点时清空输入框
        onBlur={this.clear}
    />
    
    4. Image 图片组件（必须设置宽高）
    <Image
        // 网络图片
        source={{uri:'https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react/react.png'}}
        // 本地图片
        source={require('./images/timg.jpg')}
    />
        
    5. Button 按钮组件
    <Button 
        // 按钮点击事件 
        onPress={this.btnPress}
        // 文字
        title='提交'
        // 颜色   文本的颜色(iOS)，或是按钮的背景色(Android)
        color='red'
        // 禁用
        disabled={true}
    />
        
    6. TouchableOpacity 按钮容器组件
    <TouchableOpacity
      style={styles.touchableOpacity}
      // 点击按钮容器内文字或图片等元素触发的事件
      onPress={() => alert('TouchableOpacity')}
    >
      <View>
        <Text style={styles.text}>测试TouchableOpacity按钮容器组件</Text>
        <Image 
          style={styles.image}
          source={require('./images/timg.jpg')}
        />
      </View>
    </TouchableOpacity>
    
    7. StyleSheet 样式组件
    定义样式对象
        const styles = StyleSheet.create({
            a: xxx,
            b: xxx
        });
        
    引用单个样式
        style={styles.a}
    
    引用多个样式
        style={[styles.a, styles.b]}
        
    8. FlatList 列表组件
    (使用FlatList组件代替ScrollView和ListView，后两者过时了)
    
    var data1 = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }]
    var data2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var data3 = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '0'];
    
    _renderItem2 = ({item}) => {
        return <Text style={[styles.list,styles.text]}>{item}</Text>
    }
    _ItemSeparatorComponent = () => {
        return <View style={styles.separator}></View>
    }
    _onEndReached=()=>{
        this.setState({
          data: this.state.data.concat(data3)
        })
    }
    
    <FlatList
      // 数据源
      data={data2}
      // 从data中挨个取出数据并渲染到列表中。
      renderItem={this._renderItem2}
      // 此函数用于为给定的 item 生成一个不重复的 key
      keyExtractor={(item,index)=>index}
      // 行与行之间的分隔线组件
      ItemSeparatorComponent={this._ItemSeparatorComponent}
      // 列表为空时渲染该组件
      ListEmptyComponent={() => <Text>组件没有东西了</Text>}
      // 头部组件
      ListHeaderComponent={() => <Text style={styles.text}>我是头部</Text>}
      // 尾部组件
      ListFooterComponent={() => <Text style={styles.text}>我是尾部</Text>}
      // 多列布局只能在非水平模式下使用 即必须是horizontal={false}
      numColumns={4}
      // 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用。
      onEndReached={this._onEndReached}
      // 决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
      onEndReachedThreshold={0.05}
    />
        
    9. react-navigation 导航组件 (属于第三方组件, 需要安装, 如果安装失败, 先退出nodejs再进行安装)
    npm install --save react-navigation
    
    import { StackNavigator } from 'react-navigation';
    
    const { dispatch, goBack, navigate, setParams, state } = this.props.navigation;
    
    dispatch(action)    向路由发送动作
    goBack() 关闭活动屏幕并向后移动
    navigate(routeName, params, action) 链接到其他的屏幕    routeName 要跳转的路由名称, params 要传递的参数
    setParams(params)   改变路线的参数
    state: {    屏幕当前的state/routes
        key,
        routeName,
        params: {
            // 接收传递的参数
        }
    }
    
    10. ImageBackground 背景图片组件 
    以前是使用Image组件来设置背景图片, 现在不在受支持 现在使用ImageBackground组件来设置背景图片
    <ImageBackground>
        {children}
    </ImageBackground>
    
    11. Dimensions 获取设备屏幕宽高的组件
    let { height, width } = Dimensions.get('window');
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
        
        
        
        