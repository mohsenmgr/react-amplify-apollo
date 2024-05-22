import { createContext } from "react";
import { MyAppContext } from "../types";
import { TodoContext } from "../types/todocontext";

export const UserContext = createContext<MyAppContext>(new MyAppContext());
export const MyTodoContext = createContext<TodoContext>(
  new TodoContext(() => {
    return new Promise((resolve, reject) => resolve(""));
  })
);
