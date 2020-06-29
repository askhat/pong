import { Player } from "../base";
import { Ball, Paddle } from "../components";
import { iUpdating } from "../interfaces";
import { PADDLE_SPEED } from "@lib/constants";

export class Computer extends Player implements iUpdating {
  constructor(protected paddle: Paddle, protected ball: Ball) {
    super(paddle);
  }

  update() {
    let diff = -(this.paddle.x + this.paddle.width / 2 - this.ball.x);

    if (diff < -PADDLE_SPEED) {
      diff = -PADDLE_SPEED;
    } else if (diff > PADDLE_SPEED) {
      diff = PADDLE_SPEED;
    }

    this.paddle.move(diff, 0);
  }
}
