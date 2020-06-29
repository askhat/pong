<template>
  <div>
    <canvas ref="canvas" width="500" height="700"></canvas>
    <Playground ref="playground"></Playground>
    <Ball
      ref="ball"
      v-bind.sync="ballProps"
      :paddle-top="paddleTopProps"
      :paddle-bottom="paddleBottomProps"
    ></Ball>
    <Computer ref="computer" :ball="ball">
      <Paddle v-bind.sync="paddleTopProps"></Paddle>
    </Computer>
    <Human ref="human">
      <Paddle v-bind.sync="paddleBottomProps"></Paddle>
    </Human>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Ref } from "vue-property-decorator";
import Playground from "./Playground.vue";
import Paddle from "./Paddle.vue";
import Ball from "./Ball.vue";
import Computer from "./Computer.vue";
import Human from "./Human.vue";
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_SPEED,
  VIEWPORT_PADDING,
} from "@lib/constants";

@Component({ components: { Playground, Ball, Paddle, Human, Computer } })
export default class Game extends Vue {
  @Provide()
  ctx = () => (this.$refs.canvas as HTMLCanvasElement).getContext("2d");

  @Ref("playground")
  playground: Playground;

  @Ref("computer")
  computer: Computer;

  @Ref("human")
  human: Human;

  @Ref("ball")
  ball: Ball;

  ballProps = {
    x: VIEWPORT_WIDTH / 2,
    y: VIEWPORT_HEIGHT / 2,
    vx: 0,
    vy: BALL_SPEED,
  };
  paddleTopProps = {
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    y: VIEWPORT_PADDING,
    vx: 0,
    vy: 0,
  };
  paddleBottomProps = {
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    y: VIEWPORT_HEIGHT - PADDLE_HEIGHT - VIEWPORT_PADDING,
    vx: 0,
    vy: 0,
  };

  req: number = null!;

  update() {
    this.playground?.$forceUpdate();
    this.ball.update();
    this.human.update();
    this.computer.update();
    this.req = requestAnimationFrame(this.update);
  }

  mounted() {
    this.update();
  }

  beforeDestroy() {
    cancelAnimationFrame(this.req);
  }
}
</script>
