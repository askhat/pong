export abstract class Keyboard {
  protected keysDown: Set<number> = new Set();

  constructor() {
    window.addEventListener("keydown", ({ keyCode }) => {
      this.keysDown.add(keyCode);
    });
    window.addEventListener("keyup", ({ keyCode }) => {
      this.keysDown.delete(keyCode);
    });
  }
}
