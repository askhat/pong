<script>
import { Color } from "@lib/enumerables";
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "@lib/constants";

export default {
  inject: ["ctx"],
  render() {
    let ctx = this.ctx();
    ctx.fillStyle = Color.BLACK;
    ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  },
};
</script>
