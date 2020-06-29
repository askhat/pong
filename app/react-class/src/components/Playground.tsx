import { PureComponent } from "react";
import { Context2D } from "../ctx";
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "@lib/constants";
import { Color } from "@lib/enumerables";

export class Playground extends PureComponent {
  static contextType = Context2D;

  componentDidUpdate() {
    let ctx = this.context();

    ctx.fillStyle = Color.BLACK;
    ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  }

  render() {
    return null;
  }
}
