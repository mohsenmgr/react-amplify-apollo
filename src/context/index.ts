import { createContext } from "react";
import { ContextObject } from "../types";

export const UserContext = createContext<ContextObject>({
  user: {
    id: "",
    username: "",
    attributes: {},
  },
  loggedIn: false,
});
