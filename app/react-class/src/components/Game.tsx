import React, { Component, createRef } from "react";
import { Playground } from "../components";
import { Context2D } from "../ctx";
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "@lib/constants";

interface GameState {
  ball: Circ;
  paddleTop: Rect;
  paddleBottom: Rect;
}

export class Game extends Component<unknown, GameState> {
  ref = createRef<HTMLCanvasElement>();
  req: number = null!;

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
        </Context2D.Provider>
      </>
    );
  }
}
