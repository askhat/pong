import { Paddle } from "../components";

export abstract class Player {
  constructor(protected paddle: Paddle) {}
}
