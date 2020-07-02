import { useEffect, useReducer, useRef } from "react";

import {
  BALL_RADIUS,
  BALL_SPEED,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@lib/constants";
import { Point, Segment } from "@lib/geometry";

export function useBall(
  cx: number,
  cy: number,
  r = BALL_RADIUS,
  vx = 0,
  vy = BALL_SPEED
): [Moving<Circ>, (...pads: Moving<Rect>[]) => void] {
  let ref = useRef({ vx, vy, r, cx, cy });
  let [state, dispatch] = useReducer(reducer, ref.current);
  useEffect(() => {
    ref.current = state;
  }, [state]);

  let update = (...[padTop, padBtm]: Moving<Rect>[]) => {
    let { cx, cy, vx, vy } = ref.current;
    let x1 = cx - r;
    let y1 = cy - r;
    let x2 = cx + r;
    let y2 = cy + r;

    let vpHeight = new Segment(0, VIEWPORT_HEIGHT);
    let ballHeight = new Segment(y1 + vy, y2 + vy);

    if (!vpHeight.contain(ballHeight)) {
      dispatch(action(Status.OFFSIDE));
    }

    let ballWidth = new Segment(x1 + vx, x2 + vx);
    let vpLeft = new Point(0);
    let vpRight = new Point(VIEWPORT_WIDTH);

    if (ballWidth.contain(vpLeft)) {
      dispatch(action(Status.COLLIDE_LEFT));
    } else if (ballWidth.contain(vpRight)) {
      dispatch(action(Status.COLLIDE_RIGHT));
    }

    let topPoint = new Point(padTop.y + padTop.h);
    let topWidth = new Segment(padTop.x, padTop.x + padTop.w);
    let btmPoint = new Point(padBtm.y);
    let btmWidth = new Segment(padBtm.x, padBtm.x + padBtm.w);

    if (ballHeight.contain(topPoint) && topWidth.contain(ballWidth)) {
      dispatch(action(Status.CONTACT_TOP, { vx: padTop.vx / 2 }));
    } else if (ballHeight.contain(btmPoint) && btmWidth.contain(ballWidth)) {
      dispatch(action(Status.CONTACT_BOTTOM, { vx: padBtm.vx / 2 }));
    }

    dispatch(action(Status.OK));
  };

  return [state, update];
}


enum Status {
  OK,
  OFFSIDE,
  CONTACT_TOP,
  COLLIDE_RIGHT,
  CONTACT_BOTTOM,
  COLLIDE_LEFT,
}

type Action = { type: Status; payload?: Partial<Moving<Circ>> };

function action(type: Status, payload?: Partial<Moving<Circ>>): Action {
  return { type, payload };
}

export function reducer(state: Moving<Circ>, action: Action): Moving<Circ> {
  switch (action.type) {
    case Status.OK:
      return {
        ...state,
        cx: state.cx + state.vx,
        cy: state.cy + state.vy,
      };
    case Status.OFFSIDE:
      return {
        ...state,
        cx: VIEWPORT_WIDTH / 2,
        cy: VIEWPORT_WIDTH / 2,
        vx: 0,
        vy: BALL_SPEED,
      };
    case Status.COLLIDE_LEFT:
      return {
        ...state,
        cx: state.r,
        vx: -state.vx,
      };
    case Status.COLLIDE_RIGHT:
      return {
        ...state,
        cx: VIEWPORT_WIDTH - state.r,
        vx: -state.vx,
      };
    case Status.CONTACT_TOP:
      return {
        ...state,
        ...action.payload,
        vy: BALL_SPEED,
      };
    case Status.CONTACT_BOTTOM:
      return {
        ...state,
        ...action.payload,
        vy: -BALL_SPEED,
      };
  }
}
