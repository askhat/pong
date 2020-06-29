import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  VIEWPORT_PADDING,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_SPEED,
} from "@lib/constants";
import { KeyCode } from "@lib/enumerables";

export default {
  namespaced: true,
  state: () => ({
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    y: VIEWPORT_HEIGHT - PADDLE_HEIGHT - VIEWPORT_PADDING,
    vx: 0,
    vy: 0,
  }),
  mutations: {
    move: (state, dx) => {
      if (state.x + dx <= 0) dx = 0;
      else if (state.x + dx >= VIEWPORT_WIDTH - PADDLE_WIDTH) dx = 0;
      state.x += dx;
      state.vx = dx;
    },
  },
  actions: {
    update: ({ commit }, keysDown) => {
      if (keysDown.has(KeyCode.LEFT_ARROW)) commit("move", -BALL_SPEED);
      else if (keysDown.has(KeyCode.RIGHT_ARROW)) commit("move", BALL_SPEED);
      else commit("move", 0);
    },
  },
};
