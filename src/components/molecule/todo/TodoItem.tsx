import React, { FC } from "react";
import { ITodoItem } from "./types";
import { Edit, Trash2 } from "lucide-react";

export const TodoItem: FC<ITodoItem> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
  btnBg,
}) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <label className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-5 h-5"
        />
        <span
          className={`${todo.completed ? "line-through text-gray-400" : ""}`}
        >
          {todo.text}
        </span>
      </label>
      <div className="flex gap-2 ml-4">
        <button onClick={onEdit} className={btnBg}>
          <Edit size={16} className="text-yellow-600" />
        </button>
        <button onClick={onDelete} className={btnBg}>
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    </div>
  );
};
