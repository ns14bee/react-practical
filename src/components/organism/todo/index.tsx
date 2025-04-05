import React, { useState } from "react";
import { useTodos } from "../../../hooks/useTodo";
import { TodoForm } from "../../molecule/todo/TodoForm";
import { TodoItem } from "../../molecule/todo/TodoItem";
import { ActionEnum } from "../../../utils/enums";
import { useTheme } from "../../../hooks/useTheme";

export const Todo = () => {
  const { todos, dispatch } = useTodos();
  const { theme } = useTheme();
  const [editing, setEditing] = useState<{ id: string; text: string } | null>(
    null
  );

  const btnBg = {
    light: "bg-blue-500 hover:bg-blue-600 text-white",
    dark: "bg-blue-600 hover:bg-blue-700 text-white",
    gray: "bg-blue-400 hover:bg-blue-500 text-white",
  }[theme];

  const handleSubmit = (text: string) => {
    if (editing) {
      dispatch({ type: ActionEnum.EDIT, payload: { id: editing.id, text } });
      setEditing(null);
    } else {
      dispatch({ type: ActionEnum.ADD, payload: text });
    }
  };

  return (
    <div className="theme-aware-class px-4 py-6">
      <TodoForm
        onSubmit={handleSubmit}
        editText={editing?.text}
        btnBg={btnBg}
      />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          btnBg={btnBg}
          todo={todo}
          onToggle={() =>
            dispatch({ type: ActionEnum.TOGGLE, payload: todo.id })
          }
          onDelete={() =>
            dispatch({ type: ActionEnum.DELETE, payload: todo.id })
          }
          onEdit={() => setEditing(todo)}
        />
      ))}
    </div>
  );
};

export default Todo;
