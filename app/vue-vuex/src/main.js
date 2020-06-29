import Vue from "vue";
import { Game } from "./components";
import { store } from "./store";

new Vue({
  store,
  render(createElement) {
    return createElement(Game);
  },
}).$mount("#root");
