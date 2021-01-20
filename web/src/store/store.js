import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      phone: window.localStorage.phone || "",
      token: window.localStorage.token || "",
      createAt: window.localStorage.createAt || "",
      email: "发送邮箱验证码",
    },
  },
  mutations: {
    setUser(state, payload) {
      console.log("payload: ", payload);
      state.user = payload;
    },
    clearUser(state) {
      for (const key in state.user) {
        if (Object.hasOwnProperty.call(state.user, key)) {
          state.user[key] = "";
        }
      }
    },
  },
  actions: {},
  getters: {},
  modules: {},
});
