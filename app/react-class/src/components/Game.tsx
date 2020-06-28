import React, { Component, createRef } from "react";
import { Playground, Paddle } from "../components";
import { Context2D } from "../ctx";
import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_PADDING,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
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
    this.req = requestAnimationFrame(this.update);
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
          <Paddle {...this.state.paddleTop} />
          <Paddle {...this.state.paddleBottom} />
        </Context2D.Provider>
      </>
    );
  }
}
