import React, { FC, useEffect, useState } from "react";
import { LocalStorageEnum, ThemeEnum } from "../utils/enums";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeEnum>(ThemeEnum.Light);

  const applyTheme = (theme: ThemeEnum) => {
    document.documentElement.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-gray"
    );
    document.documentElement.classList.add(`theme-${theme}`);
  };

  const setTheme = (theme: ThemeEnum) => {
    setThemeState(theme);
    localStorage.setItem(LocalStorageEnum.Theme, theme);
    applyTheme(theme);
  };

  const cycleTheme = () => {
    const next =
      theme === ThemeEnum.Light
        ? ThemeEnum.Dark
        : theme === ThemeEnum.Dark
        ? ThemeEnum.Gray
        : ThemeEnum.Light;
    setTheme(next);
  };

  useEffect(() => {
    const saved = localStorage.getItem(LocalStorageEnum.Theme) as ThemeEnum;
    if (saved) setTheme(saved);
    else applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
