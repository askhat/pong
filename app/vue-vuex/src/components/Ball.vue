<script>
import { Color } from "@lib/enumerables";

export default {
  inject: ["ctx"],
  props: ['x', 'y', 'r'],
  render() {
    let ctx = this.ctx();

    ctx.fillStyle = Color.GREEN;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  },
};
</script>
