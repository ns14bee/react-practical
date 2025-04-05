import React, { useReducer, useEffect, FC } from "react";
import { todoReducer } from "./tdoReducer";
import { TodoContext } from "./TodoContext";
import { ActionEnum, LocalStorageEnum } from "../utils/enums";

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LocalStorageEnum.Todos);
    if (stored) {
      dispatch({ type: ActionEnum.INIT, payload: JSON.parse(stored) });
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(LocalStorageEnum.Todos, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
