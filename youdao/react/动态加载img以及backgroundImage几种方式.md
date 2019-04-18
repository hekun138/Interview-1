##### 动态加载img的src
    1. import + 变量
    使用范围：少数图片，知道排列顺序
    
    import imgUrl1 from '@/static/images/1.png';
    import imgUrl2 from '@/static/images/2.png';
    import imgUrl3 from '@/static/images/3.png';
    import imgUrl4 from '@/static/images/4.png';
    import imgUrl5 from '@/static/images/5.png';
    import imgUrl6 from '@/static/images/6.png';
    
    const arr = [imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6];
    
    const list = arr.map((a, i) => {
        return <img src={a} />
    });
    
    return list;
    
    2. require + 字符串
    使用范围：require里只能写字符串，不能写变量
    
    <img src={require('@/static/images/level/1.png')} />
    
    3. require.context + Object.keys().map
    使用范围：大量图片，不知道排列顺序
    // 获取所有图片上下文函数
    const requireContext = require.context('@/static/images/level', true, /^\.\/.*\.png$/);
    // 获取所有图片
    const levelList = requireContext.keys().map(requireContext);
    
    lconst list = levelList.map((a, i) => {
        return <img src={a} />
    });
    
    return list;
    
##### 动态加载backgroundImage
    1. require('必须加载字符串路径，不能是变量') 
    <div style={{ backgroundImage: `url(${require('@/assets/images/xxx.png')})` }}></div>
    
    2. import
    import logo from '@/assets/images/logo.png'
    <div style={{ backgroundImage: `url(${logo})` }}></div>
    
    3. 在外部先加载好
    const skin = {
        bg: require('@/assets/images/xxx.png')
    };
    <div style={{ backgroundImage: `url(${skin.bg})` }}></div>
    
    
    
    