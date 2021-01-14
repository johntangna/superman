import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const files = require.context('./modules',false,/\.js$/)
const modules = {}
files.keys().forEach((Key)=>{
	if(key === "./index.js") return
  const moduleName = key.replace(/(\.\/|\.js)/g,'')
  modules[moduleName] = {
    namespaced : true,
    ...requireModule(key)
  }
})
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
});
