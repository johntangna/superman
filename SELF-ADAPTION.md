#SELF-ADAPTION 自适应
##安装
>安装相关依赖
```
#安装淘宝自适应布局解决方案
npm install lib-flexible -S
#安装px转rem依赖包
npm install postcss-px2rem -S
#安装dev环境下的px2rem加载转换器
npm install px2rem-loader -D
```
##配置
>需要在环境中配置转换规则
1.在**index.html**中加入如下代码
`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
**注意点补充**
>不加以上代码，lib-flexible会自动添加，代码中事先配置
2.在**vue.config.js**中配置css选项
```
#在最后加上一下语句，remUnit为px2rem转换单位，以1920为标准尺寸举例，/10即可
css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192
          })
        ]
      }
    },
  }
```
3.在**main.js**中，顶部加上
`import 'lib-flexible'`
**其他方式添加**
>也可在ode-module中找到lib-flexible，将其粘贴出来，放在utils文件夹中
```
#在改文件中顶部加如下代码，对个别标签进行自适应调整
(function() {
  // flexible.css
  let cssText =
    '' +
    '@charset "utf-8";' +
    'html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;' +
    '-webkit-overflow-scrolling:touch}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent}' +
    'body,html{font-family:"Microsoft YaHei",sans-serif,Tahoma,Arial}'+
    'article,aside,blockquote,body,button,code,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,'+
    'menu,nav,ol,p,pre,section,td,textarea,th,ul ' +
    '{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}'+
    'article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,'+
    'section{display:block}input,input[type=button],input[type=reset],input[type=submit]'+
    '{resize:none;border:none;-webkit-appearance:none;border-radius:0}input,select,textarea{font-size:100%}'+
    'table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}'+
    'del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,let{font-style:normal;font-weight:500}ol,'+
    'ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:after,q:before{content:\'\'}'+
    'sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}'+
    'a,ins{text-decoration:none}a:active,a:hover,a:link,a:visited{background:0 0;-webkit-tap-highlight-color:transparent;'+
    '-webkit-tap-highlight-color:transparent;outline:0;text-decoration:none}';
  // cssText end

  let styleEl = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
      styleEl.styleSheet.cssText = cssText;
    }
  } else {
    try {
      styleEl.innerHTML = cssText;
    } catch (e) {
      styleEl.innerText = cssText;
    }
  }
})();
#找到refreshRem函数,改成如下代码，代码默认最小为540px
if (width / dpr > 540) {
      width = width * dpr;
    }
```
4.此时刷新页面，即可查看效果
**提示**
>在body标签中，发现font-size变化会影响到整体布局
>如果不想被转换rem，使用PX，可以规避转换
```
#根据media媒体查询，根据不同分辨率调整body字体大小
@media only screen and (device-width:1024px) {
  body{
    font-size: 8PX !important;/*px*/
  }
}
@media only screen and (device-width:1152px) {
  body{
    font-size: 9PX !important;/*px*/
  }
}
@media only screen and (device-width:1280px) {
  body{
    font-size: 10.5PX !important;/*px*/
  }
}
@media only screen and (min-width:1360px) and (max-width:1400px){
  body{
    font-size: 11.5PX !important;/*px*/
  }
}
@media only screen and (device-width:1440px){
  body{
    font-size: 12PX !important;/*px*/
  }
}
@media only screen and (device-width:1600px){
  body{
    font-size: 13.5PX !important;/*px*/
  }
}
@media only screen and (device-width:1680px){
  body{
    font-size: 14PX !important;/*px*/
  }
}
```
##子页面自适应调整
>__因为转换单位为192，所有页面元素尺寸均按1920的设计稿进行赋值__
1.img有父元素的话，img标签设置100%，父元素设置设计稿标准尺寸，否则为img标签设置设计稿标准尺寸,只需写宽度即可
2.使用background属性时，添加background-size:100% 100%;
3.行内样式改成页级css,不要使用style属性
  >**包含elementui提供的方法，会将属性值直接作用到元素的_style_属性上**
  >el-table的**height**属性，用以下方法替代
  ```
  /deep/  .el-table__body-wrapper{
    overflow-y: auto;
    height: px;
  }
  ```
4.不要使用绝对定位,`fixed` | `absolute`，其他定位元素尽量不要使用**会有偏差**
  >使用display时，尽量使用`flex` | `inline-flex`弹性布局
5.如果子元素可以cover整个父元素，子元素宽高使用100%填充
6.echarts元素内容宽高设置
  >**参考第五点**
7.echarts的定位属性不要使用
  >**跟随父元素即可**
```
series : {
  center : [],>此属性应当舍弃使用
  radius : '',>使用比例即可
  hoverOffset : Number >设置鼠标悬停放大偏移
}
```
8.