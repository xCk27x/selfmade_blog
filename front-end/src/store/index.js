import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedin: false,
    };
  },
  mutations: {
    userLogout(state) {
      state.isLoggedin = false;
    },
    userLogin(state) {
      state.isLoggedin = true;
    },
  },
});

export default store;
