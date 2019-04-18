##### 使用插件将字符串生成二维码图片
    https://github.com/zpao/qrcode.react

    import React from 'react';
    import QRCode from 'qrcode.react';
    
    <div className="qrcode">
        <label>二维码</label>
        <div className="qrcode-img">
            <QRCode value="http://facebook.github.io/react/" />
        </div>
    </div>
    
    
    /* 二维码 less */
    .qrcode {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #333;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        &:hover {
          .qrcode-img {
            display: block;
          }
        }
        .qrcode-img {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 100px;
          display: none;
        }
    }