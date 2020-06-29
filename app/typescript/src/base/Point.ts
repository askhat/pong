export abstract class Point {
  abstract xSpeed: number;
  abstract ySpeed: number;
  constructor(public x: number, public y: number) {}
}
