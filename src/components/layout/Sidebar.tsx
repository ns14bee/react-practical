import React, { FC } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { ISidebarProps } from "./layout.types";
import { NavLink, useLocation } from "react-router-dom";
import { RouteEnum } from "../../utils/enums";
import { useTheme } from "../../hooks/useTheme";

export const Sidebar: FC<ISidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const location = useLocation();

  const bgClass = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    gray: "bg-gray-100 text-gray-800",
  }[theme];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden",
          { hidden: !isOpen }
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          `fixed top-0 left-0 w-64 h-full z-50 transform transition-transform duration-300 md:translate-x-0 md:static md:block ${bgClass} shadow-lg`,
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="p-4 flex justify-between items-center md:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {Object.keys(RouteEnum).map((route) => {
            const isActive =
              location.pathname === RouteEnum[route as keyof typeof RouteEnum];
            return (
              <NavLink
                key={route}
                to={RouteEnum[route as keyof typeof RouteEnum]}
                className={clsx("block hover:text-gray-300 p-1", {
                  "bg-blue-100 font-bold active": isActive,
                })}
                onClick={onClose}
              >
                {route}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
