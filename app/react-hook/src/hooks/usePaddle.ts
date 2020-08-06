import { useEffect, useRef, useState } from "react";

import {
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@lib/constants";
import { Point, Segment } from "@lib/geometry";

export function usePaddle(
  x: number,
  y: number,
  w = PADDLE_WIDTH,
  h = PADDLE_HEIGHT,
  vx = 0,
  vy = 0,
  max_x = VIEWPORT_WIDTH,
  max_y = VIEWPORT_HEIGHT
): [Moving<Rect>, (dx: number) => void] {
  let ref = useRef({ x, y, vx, vy, w, h });
  let [state, setState] = useState(() => ref.current);
  useEffect(() => {
    ref.current = state;
  }, [state]);

  let move = (dx: number) => {
    let { x, w } = ref.current;
    let vpLeft = new Point(0);
    let vpRight = new Point(max_x);
    let padWidth = new Segment(x + dx, x + w + dx);

    if (padWidth.contain(vpLeft)) {
      setState((state) => ({ ...state, x: 0, vx: 0 }));
    } else if (padWidth.contain(vpRight)) {
      setState((state) => ({ ...state, x: max_x - w, vx: 0 }));
    } else {
      setState((state) => ({ ...state, x: state.x + dx, vx: dx }));
    }
  };

  return [state, move];
}
