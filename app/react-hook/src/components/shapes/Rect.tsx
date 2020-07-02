import { useContext, useEffect } from "react";

import { Color } from "@lib/enumerables";

import { Renderer } from "../ctx";

type Props = Rect & {
  color: Color;
  bgColor?: Color;
};

export function Rect({ x, y, w, h, color, bgColor = Color.BLACK }: Props) {
  let getContext = useContext(Renderer);

  useEffect(() => {
    let ctx = getContext();

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    return () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, w, h);
    };
  }, [x, y]);

  return null;
}
