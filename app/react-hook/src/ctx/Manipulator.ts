import { createContext } from "react";

import { Direction } from "@lib/enumerables";

export let Manipulator = createContext<() => Direction>(() => Direction.NONE);
