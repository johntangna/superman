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
>不加以上代码，lib-flexible会自动添加默认选项，但是需要在代码中事先配置代码
2.在**vue.config.js**中配置css选项
```
#在最后加上以下语句，remUnit为px2rem转换单位，以1920为标准尺寸举例，1920/10即可
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
>`import 'lib-flexible'`
**其他方式添加**
>也可在node-module中找到lib-flexible，将其粘贴出来，放在utils文件夹中
```
#在该文件中顶部加如下代码，对个别标签进行自适应调整
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
#找到refreshRem函数,改成如下代码，代码自适应默认最小为540px，将其改成自适应任意屏幕尺寸
if (width / dpr > 540) {
      width = width * dpr;
    }
```
4.此时刷新页面，即可查看效果
**提示**
>__设置以下代码，自适应窗口__
```
html,body{
  width:100%;
  height:100%;
}
```
>__页面的左侧和右侧父元素需要做调整__
```
#每一个模块下的index.vue
#头部下面的主体内容区域
.main-model-container{
  display:flex;//使用flex布局
}
#左侧列表区域
.left-sider{
  //固定宽
  width:110px
  //高度为整屏高-头部高度
  height:calc(100% - 110px)
  left:0;
  //距离头部高度
  top : 80px
  //相对正常位置的布局
  position:relative
}
#右侧内容区域
.right-item{
  //无需设置left
  //距离头部高度
  top : 80px
  //自适应宽度
  flex : 1
  //高度为整屏高-头部高度
  height:calc(100% - px)
  //相对正常位置的布局
  position:relative
}

```
>在body标签中，就能发现font-size变化会影响到整体布局
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
>__行内样式改成页级css__
```
包含elementui提供的方法，会将属性值直接作用到元素的style属性上，需要更改为页级css
>[特殊说明]只要行内样式包含**px**单位的属性不要使用**style**，其他属性设置可以使用**style**
```
>__因为转换单位为192，所有页面元素尺寸先按1920的设计稿进行赋值__
>__如果想要自己转换单位，可使用下列代码__
```
window.lib.flexible.px2rem(`${}px`)//echarts使用此方法无效
```
>__页右侧内容最外层父元素，使用以下代码__
```
   #父元素设置
   width:100%;
   height:100%;
   padding:20px;
```
1.img有父元素的话，img标签设置100%，父元素设置设计稿标准尺寸，否则为img标签设置设计稿标准尺寸,只需写宽度即可
  >[说明]如果子元素可以覆盖整个父元素，父元素赋值标准宽高，子元素宽高使用100%填充
  ```
  #以下代码可以实现假如图片超过了，就缩小。假如图片小了，就原尺寸输出。
  img { width: auto; max-width: 100%; }
  ```
  >[说明]使用content属性进行不同分辨率图片显示
  ```
  <img src="images.jpg" 
       data-src-600px="images600px.jpg"
       data-src-800px="images800px.jpg"
       alt="">
  @media (min-device-width:600px){
    img[data-src-600px]{
      content:attr(data-src-600px,url)
    }
  }
  @media (min-device-width:800px){
    img[data-src-800px]{
      content:attr(data-src-800px,url)
    }
  }
  ```
2.使用background属性时，添加background-size:100% 100%;
3.elementui原生方法替代方案
  >el-table的**height**属性，用以下方法替代
  ```
  #如有祖父元素，先使用flex布局
  #表格的父元素需先使用以下代码
  flex:1;//设置在flex布局子元素上
  display:flex;
  flex-direction:column;
  #表格再使用以下代码
  /deep/ .el-table{
    /deep/ .el-table__body-wrapper {
      overflow-y: auto;
      height: calc(100% - 54px);//54为表头高度，默认即写此值
      position:absolute;
    }
  }
  ```
  >el-form表单中的label-width属性，用以下方法替代
  ```
  /deep/ .el-form-item__label{
    width: xxpx;
  }
  #下列代码在行内布局中不必使用
  /deep/ .el-form-item__content{
    margin-left: xxpx;
  }
  ```
  >el-table自带的width属性不要使用，使用min-width适配最小分辨率
  `表格含有复杂嵌套时，可视具体情况布局`
4.尽量不要使用绝对定位`fixed` | `absolute`
  >1.如果一定要使用__绝对定位__，要在父元素上使用__相对定位__
  **补充内容**
  _可用于定位边角处,其他地方或有偏差_
  >2.使用display时，尽量使用`flex` 或者 `inline-flex`弹性布局，其所属的属性配合使用
  >3.子页面上下布局时，其他元素设置标准高度，剩余元素可使用`flex:1`，将剩余高度（宽度）自动填充
  **补充内容**
  _如果想子元素自适应父级高度，且父级高度没有设置的情况下，使用此代码_
  ```
  >表格的高度不设置，内部元素只设置height百分比不会起作用，需设置绝对定位，以父级盒子高度（可以继承最外层盒子）为参照物
  >如果设置flex:1不起作用,使用下列代码
  height : 0;
  flex : 1;
  ```
  >4.使用盒子模型定位亦可
5.echarts元素内容宽高设置
  >**参考第1点中的说明**
6.echarts的定位属性
  >**跟随父元素即可**
```
#需要加上鼠标悬停提示，小屏幕显示难免会被覆盖
tooltip : {
  show : true
},
series : {
  center : [],>使用比例即可，默认居中
  radius : '',>使用比例即可
  hoverOffset : Number >设置鼠标悬停放大偏移
}
```
7.使用**大写的PX单位**可以规避转换__rem__
8.如果制作特殊的布局和元素，想要有一个最低和最高的适配效果，可以设置**min-width/min-height，max-width/max-height**结合使用
  **补充内容**
  ```
  #可使用下列代码进行文本最小化适应
  width: px;
  min-width : PX;>这里最小化处理可以使用PX单位规避转换
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ```
9.对于设置**%**单位后，还是有误差的，使用以下代码
```
#css函数
height : calc(100% - xxpx)
```
10.卡片解决方案
```
#可以设置固定宽高，但是需要设置最小高度
min-height:xxPX
#布局使用flex布局，设置间距时，使用以下代码
    //第一个不要动
    &:first-child{
      margin: unset !important;
    }
    //除了第一个，所有向右移动20px
    &:not(:first-child){
      margin-left: 20px;
    }
    //从第二行开始，向下移动20px
    &:nth-child(n + 6){
      margin-top: 20px;
    }
    //从第二行开始，每一行的第一个不要向右移动
    &:nth-child(5n + 1){
      margin-left: unset !important;
    }
```
