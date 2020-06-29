import { XColliding } from "../base";

export abstract class YColliding extends XColliding {
  protected abstract get isHittingTop(): boolean;
  protected abstract get isHittingBottom(): boolean;
}
