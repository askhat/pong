import { createContext } from "react";

export let UpdateQueue = createContext<Set<() => void>>(null!);
