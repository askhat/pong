import { YColliding } from "../base";

export abstract class Circ extends YColliding {
  constructor(
    public x: number,
    public y: number,
    protected radius: number
  ) {
    super(x, y);
  }

  get topEnd() {
    return this.y - this.radius;
  }

  get rightEnd() {
    return this.x + this.radius;
  }

  get bottomEnd() {
    return this.y + this.radius;
  }

  get leftEnd() {
    return this.x - this.radius;
  }
}
