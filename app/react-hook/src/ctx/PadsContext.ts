import { createContext } from "react";

export let PadsContext = createContext<() => Moving<Rect>[]>(null!);
