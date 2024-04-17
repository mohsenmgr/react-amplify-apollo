import { createContext } from "react";
import { MyAppContext } from "../types";

export const UserContext = createContext<MyAppContext>(new MyAppContext());
