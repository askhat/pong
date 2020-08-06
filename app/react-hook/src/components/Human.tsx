import { forwardRef, useContext, useEffect } from "react";

import {
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  PADDLE_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_PADDING,
  VIEWPORT_WIDTH,
} from "@lib/constants";
import { Direction } from "@lib/enumerables";

import { Manipulator, UpdateQueue } from "../ctx";
import { usePaddle } from "../hooks";

interface Props {
  render: (state: Moving<Rect>) => JSX.Element;
}

export const Human = forwardRef<Moving<Rect>, Props>(({ render }, ref) => {
  let getDirection = useContext(Manipulator);
  let que = useContext(UpdateQueue);

  let [pad, move] = usePaddle(
    (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    VIEWPORT_HEIGHT - PADDLE_HEIGHT - VIEWPORT_PADDING
  );

  useEffect(() => {
    if (ref != null && "current" in ref) ref.current = pad;
  }, [pad]);

  useEffect(() => {
    que?.add(() => {
      let direction = getDirection();
      switch (direction) {
        case Direction.LEFT:
          move(-PADDLE_SPEED);
          break;
        case Direction.RIGHT:
          move(PADDLE_SPEED);
          break;
        default:
          move(0);
      }
    });
  }, []);

  return render(pad);
});
