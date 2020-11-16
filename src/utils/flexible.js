(function() {
  // flexible.css
  let cssText =
    '' +
    '@charset "utf-8";html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-overflow-scrolling:touch}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent}body,html{font-family:"Microsoft YaHei",sans-serif,Tahoma,Arial}article,aside,blockquote,body,button,code,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}input,input[type=button],input[type=reset],input[type=submit]{resize:none;border:none;-webkit-appearance:none;border-radius:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-letiant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,let{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:after,q:before{content:\'\'}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}a:active,a:hover,a:link,a:visited{background:0 0;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;outline:0;text-decoration:none}';
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


;
(function(win, lib) {
  let doc = win.document;
  let docEl = doc.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  let flexibleEl = doc.querySelector('meta[name="flexible"]');
  let dpr = 0;
  let scale = 0;
  let tid;
  let flexible = lib.flexible || (lib.flexible = {});

  if (metaEl) {
    console.warn('将根据已有的meta标签来设置缩放比例');
    let match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (flexibleEl) {
    let content = flexibleEl.getAttribute('content');
    if (content) {
      let initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      let maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }

  if (!dpr && !scale) {
    let isAndroid = win.navigator.appVersion.match(/android/gi);
    let isIPhone = win.navigator.appVersion.match(/iphone/gi);
    let devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }

  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale +
      ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      let wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = width * dpr;
    }
    let rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function(e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }


  refreshRem();

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  flexible.rem2px = function(d) {
    let val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }
  flexible.px2rem = function(d) {
    let val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }

})(window, window['lib'] || (window['lib'] = {}));
// (function( window , document ){

// 	'use strict';

// 	//给hotcss开辟个命名空间，别问我为什么，我要给你准备你会用到的方法，免得用到的时候还要自己写。
// 	let hotcss = {};

// 	(function() {
//         //根据devicePixelRatio自定计算scale
//         //可以有效解决移动端1px这个世纪难题。
//         let viewportEl = document.querySelector('meta[name="viewport"]'),
//             hotcssEl = document.querySelector('meta[name="hotcss"]'),
//             dpr = window.devicePixelRatio || 1,
//             maxWidth = 540,
//             designWidth = 0;

//         dpr = dpr >= 3 ? 3 : ( dpr >=2 ? 2 : 1 );

//         //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
//         if (hotcssEl) {
//             let hotcssCon = hotcssEl.getAttribute('content');
//             if (hotcssCon) {
//                 let initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
//                 if (initialDprMatch) {
//                     dpr = parseFloat(initialDprMatch[1]);
//                 }
//                 let maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
//                 if (maxWidthMatch) {
//                     maxWidth = parseFloat(maxWidthMatch[1]);
//                 }
//                 let designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
//                 if (designWidthMatch) {
//                     designWidth = parseFloat(designWidthMatch[1]);
//                 }
//             }
//         }

//         document.documentElement.setAttribute('data-dpr', dpr);
//         hotcss.dpr = dpr;

//         document.documentElement.setAttribute('max-width', maxWidth);
//         hotcss.maxWidth = maxWidth;

//         if( designWidth ){
//             document.documentElement.setAttribute('design-width', designWidth);
//         }
//         hotcss.designWidth = designWidth; // 保证px2rem 和 rem2px 不传第二个参数时, 获取hotcss.designWidth是undefined导致的NaN

//         let scale = 1 / dpr,
//             content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

//         if (viewportEl) {
//             viewportEl.setAttribute('content', content);
//         } else {
//             viewportEl = document.createElement('meta');
//             viewportEl.setAttribute('name', 'viewport');
//             viewportEl.setAttribute('content', content);
//             document.head.appendChild(viewportEl);
//         }

//     })();

// 	hotcss.px2rem = function( px , designWidth ){
// 		//预判你将会在JS中用到尺寸，特提供一个方法助你在JS中将px转为rem。就是这么贴心。
// 		if( !designWidth ){
// 			//如果你在JS中大量用到此方法，建议直接定义 hotcss.designWidth 来定义设计图尺寸;
// 			//否则可以在第二个参数告诉我你的设计图是多大。
// 			designWidth = parseInt(hotcss.designWidth , 10);
// 		}

// 		return parseInt(px,10)*320/designWidth/20;
// 	}

// 	hotcss.rem2px = function( rem , designWidth ){
// 		//新增一个rem2px的方法。用法和px2rem一致。
// 		if( !designWidth ){
// 			designWidth = parseInt(hotcss.designWidth , 10);
// 		}
// 		//rem可能为小数，这里不再做处理了
// 		return rem*20*designWidth/320;
// 	}

// 	hotcss.mresize = function(){
// 		//对，这个就是核心方法了，给HTML设置font-size。
// 		let innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

//         if( hotcss.maxWidth && (innerWidth/hotcss.dpr > hotcss.maxWidth) ){
//             innerWidth = hotcss.maxWidth*hotcss.dpr;
//         }

// 		if( !innerWidth ){ return false;}

// 		document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

//         hotcss.callback && hotcss.callback();

// 	};

// 	hotcss.mresize(); 
// 	//直接调用一次

// 	window.addEventListener( 'resize' , function(){
// 		clearTimeout( hotcss.tid );
// 		hotcss.tid = setTimeout( hotcss.mresize , 33 );
// 	} , false ); 
// 	//绑定resize的时候调用

// 	window.addEventListener( 'load' , hotcss.mresize , false ); 
// 	//防止不明原因的bug。load之后再调用一次。


// 	setTimeout(function(){
// 		hotcss.mresize(); 
// 		//防止某些机型怪异现象，异步再调用一次
// 	},333)

// 	window.hotcss = hotcss; 
// 	//命名空间暴露给你，控制权交给你，想怎么调怎么调。


// })( window , document );