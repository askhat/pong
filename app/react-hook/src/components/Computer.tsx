import { forwardRef, MutableRefObject, useContext, useEffect } from "react";

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  VIEWPORT_PADDING,
  VIEWPORT_WIDTH,
} from "@lib/constants";

import { BallContext, UpdateQueue } from "../ctx";
import { usePaddle } from "../hooks";

interface Props {
  render: (state: Rect) => JSX.Element;
}

export const Computer = forwardRef<Moving<Rect>, Props>(({ render }, ref) => {
  let que = useContext(UpdateQueue);
  let getBall = useContext(BallContext);

  let [pad, move] = usePaddle(
    (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    VIEWPORT_PADDING
  );

  useEffect(() => {
    if (ref != null && "current" in ref) ref.current = pad;
  }, [pad]);

  useEffect(() => {
    que?.add(() => {
      let ball = getBall();
      let { current } = ref as MutableRefObject<Rect>;
      let diff = -(current?.x + current?.w / 2 - ball?.cx);
      if (diff < -PADDLE_SPEED) diff = -PADDLE_SPEED;
      else if (diff > PADDLE_SPEED) diff = PADDLE_SPEED;
      move(diff);
    });
  }, []);

  return render(pad);
});
