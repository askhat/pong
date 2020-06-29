import { Rect } from "../base";

export abstract class Guided extends Rect {
  abstract move(x: number, y: number): void;
}
