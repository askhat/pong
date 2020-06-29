import { Keyboard } from "../base";
import { withContext } from "../ctx";
import { iRendering, iUpdating } from "../interfaces";
import { Ball, Paddle, Computer, Human } from "../components";
import { Color } from "@lib/enumerables";
import {
  VIEWPORT_WIDTH,
  PADDLE_WIDTH,
  VIEWPORT_PADDING,
  PADDLE_HEIGHT,
  VIEWPORT_HEIGHT,
  BALL_RADIUS,
} from "@lib/constants";

@withContext
export class Game extends Keyboard implements iRendering, iUpdating {
  ctx!: CanvasRenderingContext2D;
  protected keysDown!: Set<number>;

  private paddleTop = new Paddle(
    (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    VIEWPORT_PADDING,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  private paddleBottom = new Paddle(
    (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    VIEWPORT_HEIGHT - PADDLE_HEIGHT - VIEWPORT_PADDING,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  private ball = new Ball(
    VIEWPORT_WIDTH / 2,
    VIEWPORT_HEIGHT / 2,
    BALL_RADIUS,
    this.paddleTop,
    this.paddleBottom
  );
  private computer = new Computer(this.paddleTop, this.ball);
  private human = new Human(this.paddleBottom, this.keysDown);

  constructor(canvas: HTMLCanvasElement) {
    super();
    canvas.width = VIEWPORT_WIDTH;
    canvas.height = VIEWPORT_HEIGHT;
    document.body.appendChild(canvas);
  }

  render() {
    this.ctx.fillStyle = Color.BLACK;
    this.ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    this.ball.render();
    this.paddleTop.render();
    this.paddleBottom.render();
  }

  update() {
    this.ball.update();
    this.computer.update();
    this.human.update();
  }

  start() {
    this.update();
    this.render();
    requestAnimationFrame(this.start.bind(this));
  }
}
