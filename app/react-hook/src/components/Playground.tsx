import React, { forwardRef, useContext, useEffect } from "react";

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@lib/constants";
import { Color } from "@lib/enumerables";

import { PadsContext, UpdateQueue } from "../ctx";
import { useBall } from "../hooks";
import { Rect } from "../shapes";

interface Props {
  render: (state: Moving<Circ>) => JSX.Element;
}

export const Playground = forwardRef<Moving<Circ>, Props>(({ render }, ref) => {
  let que = useContext(UpdateQueue);
  let getPads = useContext(PadsContext);

  let [ball, update] = useBall(VIEWPORT_WIDTH / 2, VIEWPORT_HEIGHT / 2);

  useEffect(() => {
    if (ref != null && "current" in ref) ref.current = ball;
  }, [ball]);

  useEffect(() => {
    que?.add(() => {
      update(...getPads());
    });
  }, []);

  let area = { x: 0, y: 0, w: VIEWPORT_WIDTH, h: VIEWPORT_HEIGHT };
  return (
    <>
      <Rect {...area} color={Color.BLACK} />
      <>{render(ball)}</>
    </>
  );
});
