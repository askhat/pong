import {
  VIEWPORT_WIDTH,
  VIEWPORT_PADDING,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
} from "@lib/constants";

export default {
  namespaced: true,
  state: () => ({
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    x: (VIEWPORT_WIDTH - PADDLE_WIDTH) / 2,
    y: VIEWPORT_PADDING,
    vx: 0,
    vy: 0,
  }),
  mutations: {
    move: (state, dx) => {
      state.x += dx;
      state.vx = dx;
    },
  },
  actions: {
    update: ({ state, rootState, commit }) => {
      let diff = -(state.x + state.w / 2 - rootState.ball.x);
      if (diff < -PADDLE_SPEED) diff = -PADDLE_SPEED;
      else if (diff > PADDLE_SPEED) diff = PADDLE_SPEED;
      // else diff = 0;
      commit("move", diff);
    },
  },
};
