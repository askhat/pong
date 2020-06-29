<script lang="ts">
import { Vue, Component, Inject, Prop, PropSync } from "vue-property-decorator";
import { Color } from "@lib/enumerables";
import { VIEWPORT_WIDTH } from "@lib/constants";

@Component
export default class Paddle extends Vue {
  @Inject()
  readonly ctx: () => CanvasRenderingContext2D;

  @Prop(Number)
  readonly w: number;

  @Prop(Number)
  readonly h: number;

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

  public move(dx: number) {
    if (this._x + dx <= 0) {
      this._x = 0
      this._vx = 0
    } else if (this._x + dx >= VIEWPORT_WIDTH - this.w) {
      this._x = VIEWPORT_WIDTH - this.w
      this._vx = 0
    } else {
      this._x += dx;
      this._vx = dx;
    }
  }
  render() {
    let ctx = this.ctx();
    ctx.fillStyle = Color.BLUE;
    ctx.fillRect(this._x, this._y, this.w, this.h);
  }
}
</script>
