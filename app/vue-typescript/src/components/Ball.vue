<script lang="ts">
import { Vue, Component, Inject, Prop, PropSync } from "vue-property-decorator";
import { Color } from "@lib/enumerables";
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  BALL_RADIUS,
  BALL_SPEED,
} from "@lib/constants";
import Paddle from "./Paddle.vue";

@Component
export default class Ball extends Vue {
  @Inject()
  readonly ctx: () => CanvasRenderingContext2D;

  @Prop(Object)
  readonly paddleTop: Paddle;

  @Prop(Object)
  readonly paddleBottom: Paddle;

  @PropSync("x")
  private _x: number;
  readonly x: number;

  @PropSync("y")
  private _y: number;
  readonly y: number;

  @PropSync("vx")
  private _vx: number;
  readonly vx: number;

  @PropSync("vy")
  private _vy: number;
  readonly vy: number;

  public r: number = BALL_RADIUS;

  private get offside() {
    let { _y: y, r } = this;
    return y + r <= 0 || y + r >= VIEWPORT_HEIGHT;
  }

  private get collideLeft() {
    let { _x: x, r } = this;
    return x - r >= VIEWPORT_WIDTH;
  }

  private get collideRight() {
    let { _x: x, r } = this;
    return x + r <= 0;
  }

  private get contactTop() {
    let { _x: x, _y: y, r, paddleTop: paddle } = this;
    let xIntersection = x + r >= paddle.x && x - r <= paddle.x + paddle.w;
    let yIntersection = y - r <= paddle.y + paddle.h;
    return xIntersection && yIntersection;
  }

  private get contactBottom() {
    let { _x: x, _y: y, r, paddleBottom: paddle } = this;
    let xIntersection = x - r >= paddle.x && x + r <= paddle.x + paddle.w;
    let yIntersection = y + r >= paddle.y;
    return xIntersection && yIntersection;
  }

  private bounceUp() {
    this._vx += this.paddleBottom.vx / 2;
    this._vy = -BALL_SPEED;
  }

  private bounceDown() {
    this._vx += this.paddleTop.vx / 2;
    this._vy = BALL_SPEED;
  }

  private bounceLeft() {
    this._x = BALL_RADIUS;
    this._vx *= -1;
  }

  private bounceRight() {
    this._x = VIEWPORT_WIDTH - BALL_RADIUS;
    this._vx *= -1;
  }

  private reset() {
    this._x = VIEWPORT_WIDTH / 2;
    this._y = VIEWPORT_HEIGHT / 2;
    this._vx = 0;
    this._vy = BALL_SPEED;
  }

  update() {
    this._x += this._vx;
    this._y += this._vy;

    if (this.offside) this.reset();

    if (this.collideLeft) this.bounceRight();
    else if (this.collideRight) this.bounceLeft();

    if (this.contactTop) this.bounceDown();
    else if (this.contactBottom) this.bounceUp();
  }

  render() {
    let ctx = this.ctx();
    ctx.fillStyle = Color.GREEN;
    ctx.beginPath();
    ctx.arc(this._x, this._y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
</script>
