#总结常遇到的安全性问题
1.xss攻击
```
1.npm安装xss
npm install xss --save
2.在页面中引入
import xss from 'xss'
Object.defineProperty(Vue.prototype,'$xss',{
  value : xss
})
3.在要使用的地方
v-html="$xss()"
```
2.csrf请求漏洞
```
使用token验证
referer验证
```