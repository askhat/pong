import { Circ } from "../base";

export abstract class Bouncing extends Circ {
  protected abstract bounceUp(): void;
  protected abstract bounceRight(): void;
  protected abstract bounceDown(): void;
  protected abstract bounceLeft(): void;

  constructor(
    public x: number,
    public y: number,
    protected radius: number,
  ) {
    super(x, y, radius);
  }
}
