import { createContext } from "react";

export let BallContext = createContext<() => Moving<Circ>>(null!);
