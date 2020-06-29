<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { KeyCode } from "@lib/enumerables";
import Paddle from "./Paddle.vue";
import { PADDLE_SPEED } from "@lib/constants";

@Component
export default class Human extends Vue {
  keysDown: Set<number> = new Set();

  handleKeydown({ keyCode }: KeyboardEvent) {
    this.keysDown.add(keyCode);
  }
  handleKeyup({ keyCode }: KeyboardEvent) {
    this.keysDown.delete(keyCode);
  }
  created() {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("keyup", this.handleKeyup);
  }
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("keyup", this.handleKeyup);
  }
  update() {
    let [paddle] = (this.$children as unknown) as [Paddle];

    if (this.keysDown.has(KeyCode.LEFT_ARROW)) {
      paddle.move(-PADDLE_SPEED);
    } else if (this.keysDown.has(KeyCode.RIGHT_ARROW)) {
      paddle.move(PADDLE_SPEED);
    } else {
      paddle.move(0);
    }
    paddle.$forceUpdate();
  }
}
</script>
