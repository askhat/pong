import { useContext, useEffect } from "react";

import { Color } from "@lib/enumerables";

import { Renderer } from "../ctx";

type Props = Circ & {
  color: Color;
  bgColor?: Color;
};

export function Circ({ cx, cy, r, color, bgColor = Color.BLACK }: Props) {
  let getContext = useContext(Renderer);

  useEffect(() => {
    let ctx = getContext();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 0.7, 0, Math.PI * 2);
    ctx.fill();
    return () => {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };
  }, [cx, cy]);

  return null;
}
