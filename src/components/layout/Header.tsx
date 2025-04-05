import { Menu } from "lucide-react";
import React, { FC } from "react";
import { IHeaderProps } from "./layout.types";
import { useTheme } from "../../hooks/useTheme";
import Theme from "../organism/theme";

export const Header: FC<IHeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();

  const bgClass = {
    light: "bg-white text-gray-800",
    dark: "bg-gray-900 text-white",
    gray: "bg-gray-200 text-gray-900",
  }[theme];

  return (
    <header
      className={`w-full h-16 flex items-center px-4 justify-between ${bgClass}`}
    >
      <h1 className="text-xl font-bold">My App</h1>
      <div className="flex items-center gap-4">
        <Theme />
        <button
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};
