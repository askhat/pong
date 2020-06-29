import { Player } from "../base";
import { iUpdating } from "../interfaces";
import { Paddle } from "../components";
import { KeyCode } from "@lib/enumerables";
import { PADDLE_SPEED } from "@lib/constants";

export class Human extends Player implements iUpdating {
  constructor(protected paddle: Paddle, protected keysDown: Set<number>) {
    super(paddle);
  }

  update() {
    if (this.keysDown.has(KeyCode.LEFT_ARROW)) {
      this.paddle.move(-PADDLE_SPEED, 0);
    } else if (this.keysDown.has(KeyCode.RIGHT_ARROW)) {
      this.paddle.move(PADDLE_SPEED, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
}
