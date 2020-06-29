import { XColliding } from "../base";

export abstract class Rect extends XColliding {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }

  get topEnd() {
    return this.y;
  }

  get rightEnd() {
    return this.x + this.width;
  }

  get bottomEnd() {
    return this.y + this.height;
  }

  get leftEnd() {
    return this.x;
  }
}
