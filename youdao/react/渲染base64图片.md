##### 渲染base64图片
    this.setState({
      imgSrc: `data:image/jpeg;base64,${返回base64字符串}`
    });
    <img src={imgSrc} alt="验证码" />
    