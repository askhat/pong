import React, { Component, createRef } from "react";
import { Playground, Paddle, Ball } from "../components";
import { Context2D } from "../ctx";
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_PADDING,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  BALL_SPEED,
} from "@lib/constants";

interface GameState {
  ball: Circ;
  paddleTop: Rect;
  paddleBottom: Rect;
}

export class Game extends Component<unknown, GameState> {
  ref = createRef<HTMLCanvasElement>();
  req: number = null!;

  state = {
    ball: {
      r: BALL_RADIUS,
      x: VIEWPORT_WIDTH / 2,
      y: VIEWPORT_HEIGHT / 2,
      vx: 0,
      vy: BALL_SPEED,
    },
    paddleTop: {
      w: PADDLE_WIDTH,
      h: PADDLE_HEIGHT,
      x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
      y: VIEWPORT_PADDING,
      vx: 0,
      vy: 0,
    },
    paddleBottom: {
      w: PADDLE_WIDTH,
      h: PADDLE_HEIGHT,
      x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
      y: VIEWPORT_HEIGHT - PADDLE_HEIGHT - VIEWPORT_PADDING,
      vx: 0,
      vy: 0,
    },
  };

  update = () => {
    this.updateBall();
    this.req = requestAnimationFrame(this.update);
  };

  updateBall = () => {
    let { ball, paddleTop, paddleBottom } = this.state;

    let offside = ball.y + ball.r >= VIEWPORT_HEIGHT || ball.y - ball.r <= 0;
    let collideLeft = ball.x - ball.r <= 0;
    let collideRight = ball.x + ball.r >= VIEWPORT_WIDTH;
    let contactTop =
      ball.x + ball.r >= paddleTop.x &&
      ball.x - ball.r <= paddleTop.x + paddleTop.w &&
      ball.y - ball.r <= paddleTop.y + paddleTop.h;
    let contactBottom =
      ball.x + ball.r >= paddleBottom.x &&
      ball.x - ball.r <= paddleBottom.x + paddleBottom.w &&
      ball.y + ball.r >= paddleBottom.y;

    this.setState({
      ball: {
        ...ball,
        ...(offside && {
          x: VIEWPORT_WIDTH / 2,
          y: VIEWPORT_HEIGHT / 2,
          vx: 0,
          vy: BALL_SPEED,
        }),
        ...(collideLeft && {
          x: BALL_RADIUS,
          vx: -ball.vx,
        }),
        ...(collideRight && {
          x: VIEWPORT_WIDTH - BALL_RADIUS,
          vx: -ball.vx,
        }),
        ...(contactBottom && {
          vx: ball.vx + paddleBottom.vx / 2,
          vy: -BALL_SPEED,
        }),
        ...(contactTop && {
          vx: ball.vx + paddleTop.vx / 2,
          vy: BALL_SPEED,
        }),
      },
    });

    this.setState({
      ball: {
        ...this.state.ball,
        x: this.state.ball.x + this.state.ball.vx,
        y: this.state.ball.y + this.state.ball.vy,
      },
    });
  };

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.req);
  }

  render() {
    return (
      <>
        <canvas
          ref={this.ref}
          width={VIEWPORT_WIDTH}
          height={VIEWPORT_HEIGHT}
        />
        <Context2D.Provider value={() => this.ref.current?.getContext("2d")!}>
          <Playground />
          <Ball {...this.state.ball} />
          <Paddle {...this.state.paddleTop} />
          <Paddle {...this.state.paddleBottom} />
        </Context2D.Provider>
      </>
    );
  }
}
