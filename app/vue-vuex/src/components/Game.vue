<template>
  <div>
    <canvas ref="canvas" width="500" height="700"></canvas>
    <playground ref="playground"></playground>
    <paddle ref="paddleTop" v-bind="computer"></paddle>
    <paddle ref="paddleBottom" v-bind="human"></paddle>
    <ball v-bind="ball"></ball>
  </div>
</template>

<script>
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_PADDING,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_SPEED,
} from "@lib/constants";
import { mapState, mapActions } from "vuex";
import Playground from "./Playground.vue";
import Paddle from "./Paddle.vue";
import Ball from "./Ball.vue";

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default {
  components: { Playground, Ball, Paddle },
  provide() {
    return {
      ctx: () => this.$refs.canvas.getContext("2d"),
    };
  },
  data: () => ({
    req: null,
    keysDown: new Set(),
  }),
  computed: mapState(["ball", "human", "computer"]),
  methods: {
    ...mapActions(["ball/update", "human/update", "computer/update"]),
    handleKeyDown({ keyCode }) {
      this.keysDown.add(keyCode);
    },
    handleKeyUp({ keyCode }) {
      this.keysDown.delete(keyCode);
    },
    update() {
      this.$refs.playground.$forceUpdate();
      this.$refs.paddleTop.$forceUpdate();
      this.$refs.paddleBottom.$forceUpdate();

      this["ball/update"]();
      this["human/update"](this.keysDown);
      this["computer/update"]();

      this.req = requestAnimationFrame(this.update);
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.update();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.req);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
  },
};
</script>
