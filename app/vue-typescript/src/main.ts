import Vue from "vue";
import Game from "./components/Game.vue";

new Vue({
  render(createElement) {
    return createElement(Game);
  },
}).$mount("#root");
