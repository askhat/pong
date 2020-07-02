import { createContext } from "react";

export let Renderer = createContext<() => CanvasRenderingContext2D>(null!);
