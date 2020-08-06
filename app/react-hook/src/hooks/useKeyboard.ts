import { useEffect, useRef } from "react";

import { KeyCode } from "@lib/enumerables";

export function useKeyboard<T>(mapper = (code: KeyCode) => code as unknown as T) {
  let keysDown = useRef<Set<T>>(new Set());

  let handleKeyDown = ({ keyCode }: KeyboardEvent) => {
    keysDown.current.add(mapper(keyCode));
  };

  let handleKeyUp = ({ keyCode }: KeyboardEvent) => {
    keysDown.current.delete(mapper(keyCode));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysDown.current;
}
