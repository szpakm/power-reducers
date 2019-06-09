declare module "power-reducers/.internals";

import { Action } from "../models";

export function createPathReader(path: string | ((data: Action) => any)): any;
