<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { PADDLE_SPEED } from "@lib/constants";
import Paddle from "./Paddle.vue";
import Ball from "./Ball.vue";

@Component
export default class Computer extends Vue {
  @Prop(Object)
  ball: Ball;

  update() {
    if (!this.ball) return

    let [paddle] = (this.$children as unknown) as [Paddle];

    let diff = -(paddle.x + paddle.w / 2 - this.ball.x);
    if (diff < -PADDLE_SPEED) {
      diff = -PADDLE_SPEED;
    } else if (diff > PADDLE_SPEED) {
      diff = PADDLE_SPEED;
    }

    paddle.move(diff);
    paddle.$forceUpdate();
  }
}
</script>
