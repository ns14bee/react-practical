import React from "react";
import { useTheme } from "../../../hooks/useTheme";

const Theme = () => {
  const { theme, cycleTheme } = useTheme();
  return (
    <button
      onClick={cycleTheme}
      className={`ml-auto px-4 py-2 bg-gray-800 text-white rounded hover:opacity-80`}
    >
      Theme: {theme}
    </button>
  );
};

export default Theme;
