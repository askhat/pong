import { Game } from "./components";

export let canvas = document.createElement("canvas");
let game = new Game(canvas);

window.onload = () => {
  game.start()
};
