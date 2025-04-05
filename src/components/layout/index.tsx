import React, { FC, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ILayoutProps } from "./layout.types";
import { useTheme } from "../../hooks/useTheme";

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useTheme();

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleMenuClose = () => setMenuOpen(false);

  const bgClass = {
    light: "bg-gray-100 text-gray-900",
    dark: "bg-gray-950 text-white",
    gray: "bg-gray-300 text-gray-800",
  }[theme];

  return (
    <div className={`flex h-screen w-screen`}>
      <Sidebar isOpen={menuOpen} onClose={handleMenuClose} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuToggle} />
        <main className={`flex-1 overflow-y-auto p-4 ${bgClass}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
