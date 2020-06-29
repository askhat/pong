import Vue from "vue";
import Vuex from "vuex";
import ball from "./ball"
import human from "./human"
import computer from "./computer"

Vue.use(Vuex);

export let store = new Vuex.Store({
  modules: {
    ball,
    human,
    computer,
  }
});
