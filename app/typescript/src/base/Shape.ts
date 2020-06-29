import { Point } from "../base";

export abstract class Shape extends Point {
  abstract get topEnd(): number;
  abstract get rightEnd(): number;
  abstract get bottomEnd(): number;
  abstract get leftEnd(): number;
}
