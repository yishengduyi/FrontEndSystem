import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex);

// // 全局state对象，用以保存所有组件的公共数据
// // sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem(state)) : 
// const state = sessionStorage.getItem('stateName') ? {
//   user: {
//     name: sessionStorage.getItem('stateName')
//   }
// } : {
//   user: {
//     name: 'hello'
//   }
// };


// // 监听state对象的值的最新状态（计算属性）
// const getters = {
//   getUser(state){
//     return state.user;
//   }
// };

//  // 唯一一个可以修改state值的方法
// const mutations = {
//   updateUser(state, user){
//     state.user = user;
//   }
// };

// // 异步执行mutations方法
// const actions = {
//   asyncUpdateUser(context, user){
//     context.commit("updateUser", user);
//   }
// };

export default new Vuex.Store({
  modules: {
    user
  }
})
