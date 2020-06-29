<script>
import { Color } from "@lib/enumerables";

export default {
  inject: ["ctx"],
  props: ["x", "y", "w", "h"],
  render() {
    let ctx = this.ctx();

    ctx.fillStyle = Color.BLUE;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
};
</script>
