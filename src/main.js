import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/index.css';
import element from 'plugins/elementui_'
Vue.use(element)
Vue.config.productionTip = false;
import vdr from 'vue-draggable-resizable-gorkys'
// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
