import { createContext } from "react";
import { IThemeContextType } from "./types";

export const ThemeContext = createContext<IThemeContextType | undefined>(
  undefined
);
