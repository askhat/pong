import { Bouncing } from "../base";
import { iUpdating, iRendering } from "../interfaces";
import { Paddle } from "../components";
import { withContext } from "../ctx";
import { Color } from "@lib/enumerables";
import { BALL_SPEED, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@lib/constants";

@withContext
export class Ball extends Bouncing implements iUpdating, iRendering {
  ctx!: CanvasRenderingContext2D;

  xSpeed = 0;
  ySpeed = BALL_SPEED;

  constructor(
    public x: number,
    public y: number,
    protected radius: number,
    protected paddleTop: Paddle,
    protected paddleBottom: Paddle
  ) {
    super(x, y, radius);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = Color.GREEN;
    this.ctx.fill();
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.flewOver) {
      this.reset();
    }

    if (this.isHittingLeft) {
      this.bounceRight();
    } else if (this.isHittingRight) {
      this.bounceLeft();
    }

    if (this.isHittingTop) {
      this.bounceDown();
    } else if (this.isHittingBottom) {
      this.bounceUp();
    }
  }

  protected get flewOver() {
    return this.topEnd >= VIEWPORT_HEIGHT || this.bottomEnd <= 0;
  }

  protected get isHittingTop() {
    let xIntersection =
      this.leftEnd >= this.paddleTop.leftEnd &&
      this.rightEnd <= this.paddleTop.rightEnd;
    let yIntersection = this.topEnd <= this.paddleTop.bottomEnd;
    return xIntersection && yIntersection;
  }

  protected get isHittingRight() {
    return this.rightEnd <= 0;
  }

  protected get isHittingBottom() {
    let xIntersection =
      this.leftEnd >= this.paddleBottom.leftEnd &&
      this.rightEnd <= this.paddleBottom.rightEnd;
    let yIntersection = this.bottomEnd >= this.paddleBottom.topEnd;
    return xIntersection && yIntersection;
  }

  protected get isHittingLeft() {
    return this.leftEnd >= VIEWPORT_WIDTH;
  }

  protected bounceUp() {
    this.xSpeed += this.paddleBottom.xSpeed / 2;
    this.ySpeed = -BALL_SPEED;
  }

  protected bounceRight() {
    this.x = VIEWPORT_WIDTH - this.radius;
    this.xSpeed = -this.xSpeed;
  }

  protected bounceDown() {
    this.xSpeed += this.paddleTop.xSpeed / 2;
    this.ySpeed = BALL_SPEED;
  }

  protected bounceLeft() {
    this.x = this.radius;
    this.xSpeed = -this.xSpeed;
  }

  protected reset() {
    this.x = VIEWPORT_WIDTH / 2;
    this.y = VIEWPORT_HEIGHT / 2;
    this.xSpeed = 0;
    this.ySpeed = BALL_SPEED;
  }
}
