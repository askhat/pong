import { canvas } from "./main";

export function withContext<T extends new (...args: any[]) => any>(klass: T) {
  return class extends klass {
    ctx = canvas.getContext("2d");
  };
}
