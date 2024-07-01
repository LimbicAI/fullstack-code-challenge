import { createContext } from "react";
import auth from "../mobx/auth";
import uiStore from '../mobx/uiStore';

export const GlobalContext = createContext({ auth, uiStore });
