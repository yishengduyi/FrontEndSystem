const user = {
// 全局state对象，用以保存所有组件的公共数据
// sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem(state)) : 
state: {
  user: {
    name: 'hello'
  }
},

// 监听state对象的值的最新状态（计算属性）
getters: {
  getUser(state){
    return state.user;
  }
},

 // 唯一一个可以修改state值的方法
mutations: {
  updateUser(state, user){
    state.user = user;
  }
},

// 异步执行mutations方法
actions: {
  asyncUpdateUser(context, user){
    context.commit("updateUser", user);
  }
},
}

export default user;