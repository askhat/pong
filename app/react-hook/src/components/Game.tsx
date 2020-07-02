import React, { useEffect, useRef } from "react";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@lib/constants";
import { Color, Direction, KeyCode } from "@lib/enumerables";

import {
  BallContext,
  Manipulator,
  PadsContext,
  Renderer,
  UpdateQueue,
} from "../ctx";
import { useKeyboard } from "../hooks";
import { Computer, Human, Playground, Shapes } from "../components";

export function Game() {
  let ball = useRef<Moving<Circ>>(null!);
  let padTop = useRef<Moving<Rect>>(null!);
  let padBtm = useRef<Moving<Rect>>(null!);
  let getPads = () => [padTop.current!, padBtm.current!];

  let canvas = useRef<HTMLCanvasElement>(null!);
  let frameReq = useRef<number>(null!);
  let updateQue = useRef<Set<() => void>>(new Set());

  let directions = useKeyboard((keyCode: KeyCode) => {
    switch (keyCode) {
      case KeyCode.LEFT_ARROW:
        return Direction.LEFT;
      case KeyCode.RIGHT_ARROW:
        return Direction.RIGHT;
      default:
        return Direction.NONE;
    }
  });

  let getDirection = () => {
    let hasLeft = directions.has(Direction.LEFT);
    let hasRight = directions.has(Direction.RIGHT);
    if (hasLeft && !hasRight) return Direction.LEFT;
    else if (hasRight && !hasLeft) return Direction.RIGHT;
    else return Direction.NONE;
  };

  let update = () => {
    for (let proc of updateQue.current!) proc();
    frameReq.current = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frameReq.current);
    };
  };

  useEffect(update, []);

  return (
    <>
      <canvas ref={canvas} width={VIEWPORT_WIDTH} height={VIEWPORT_HEIGHT} />
      <Renderer.Provider value={() => canvas.current.getContext("2d")!}>
        <UpdateQueue.Provider value={updateQue.current}>
          <PadsContext.Provider value={getPads}>
            <Playground
              ref={ball}
              render={(ball) => <Shapes.Circ color={Color.GREEN} {...ball} />}
            />
          </PadsContext.Provider>
          <BallContext.Provider value={() => ball.current}>
            <Computer
              ref={padTop}
              render={(pad) => <Shapes.Rect color={Color.BLUE} {...pad} />}
            />
          </BallContext.Provider>
          <Manipulator.Provider value={getDirection}>
            <Human
              ref={padBtm}
              render={(pad) => <Shapes.Rect color={Color.BLUE} {...pad} />}
            />
          </Manipulator.Provider>
        </UpdateQueue.Provider>
      </Renderer.Provider>
    </>
  );
}
