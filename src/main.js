import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

Vue.use(ElementUI)

import vdr from 'vue-draggable-resizable-gorkys'
 
// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
