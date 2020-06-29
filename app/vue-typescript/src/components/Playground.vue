<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";

@Component
export default class Playground extends Vue {
  @Inject()
  readonly ctx: () => CanvasRenderingContext2D;

  render() {
    let ctx = this.ctx();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 500, 700);
  }
}
</script>
