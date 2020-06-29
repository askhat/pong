import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, BALL_SPEED } from "@lib/constants";

export default {
  namespaced: true,
  state: () => ({
    r: 10,
    x: VIEWPORT_WIDTH / 2,
    y: VIEWPORT_HEIGHT / 2,
    vx: 0,
    vy: 5,
  }),
  getters: {
    offside: (state) => {
      let { y, r } = state;
      return y - r >= VIEWPORT_HEIGHT || y + r <= 0;
    },
    collideLeft: (state) => {
      let { x, r } = state;
      return x + r >= VIEWPORT_WIDTH;
    },
    collideRight: (state) => {
      let { x, r } = state;
      return x - r <= 0;
    },
    contactTop: (state, _, rootState) => {
      let { x, y, r } = state;
      let { computer } = rootState;
      let xIntersection =
        x - r >= computer.x && x + r <= computer.x + computer.w;
      let yIntersection = y - r <= computer.y + computer.h;
      return xIntersection && yIntersection;
    },
    contactBottom: (state, _, rootState) => {
      let { x, y, r } = state;
      let { human } = rootState;
      let xIntersection = x - r >= human.x && x + r <= human.x + human.w;
      let yIntersection = y + r >= human.y;
      return xIntersection && yIntersection;
    },
  },
  mutations: {
    move: (state) => {
      state.x += state.vx;
      state.y += state.vy;
    },
    reset: (state) => {
      state.x = VIEWPORT_WIDTH / 2;
      state.y = VIEWPORT_HEIGHT / 2;
      state.vx = 0;
      state.vy = BALL_SPEED;
    },
    bounceUp: (state, x_momentum) => {
      state.vx += x_momentum;
      state.vy = -BALL_SPEED;
    },
    bounceDown: (state, x_momentum) => {
      state.vx += x_momentum;
      state.vy = BALL_SPEED;
    },
    bounceRight: (state) => {
      state.x = VIEWPORT_WIDTH - state.r;
      state.vx *= -1;
    },
    bounceLeft: (state) => {
      state.x = state.r;
      state.vx *= -1;
    },
  },
  actions: {
    update: ({ commit, getters, rootState }) => {
      let {
        offside,
        contactTop,
        contactBottom,
        collideRight,
        collideLeft,
      } = getters;

      if (offside) commit("reset");

      if (contactTop) commit("bounceDown", rootState.computer.vx / 2);
      else if (contactBottom) commit("bounceUp", rootState.human.vx / 2);

      if (collideLeft) commit("bounceRight");
      else if (collideRight) commit("bounceLeft");

      commit("move");
    },
  },
};
