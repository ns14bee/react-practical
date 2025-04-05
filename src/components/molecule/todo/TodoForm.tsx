import React, { FC, useEffect, useState } from "react";
import { ITodoForm } from "./types";

export const TodoForm: FC<ITodoForm> = ({
  onSubmit,
  editText = "",
  btnBg = "bg-blue-500 text-white px-4 rounded hover:bg-blue-600",
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(editText);
  }, [editText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button type="submit" className={btnBg}>
        {editText ? "Update" : "Add"}
      </button>
    </form>
  );
};
