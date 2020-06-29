import { Guided } from "../base";
import { iRendering } from "../interfaces";
import { withContext } from "../ctx";
import { Color } from "@lib/enumerables";
import { VIEWPORT_WIDTH } from "@lib/constants";

@withContext
export class Paddle extends Guided implements iRendering {
  ctx!: CanvasRenderingContext2D;

  xSpeed = 0;
  ySpeed = 0;

  render() {
    this.ctx.fillStyle = Color.BLUE;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
    this.xSpeed = x;
    this.ySpeed = y;

    if (this.isHittingLeft) {
      this.x = 0;
      this.xSpeed = 0;
    } else if (this.isHittingRight) {
      this.x = VIEWPORT_WIDTH - this.width;
      this.xSpeed = 0;
    }
  }

  protected get isHittingLeft() {
    return this.x <= 0;
  }

  protected get isHittingRight() {
    return this.rightEnd >= VIEWPORT_WIDTH;
  }
}
