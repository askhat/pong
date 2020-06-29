import { Shape } from "../base";

export abstract class XColliding extends Shape {
  protected abstract get isHittingRight(): boolean;
  protected abstract get isHittingLeft(): boolean;
}