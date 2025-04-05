import { FC, useEffect, useReducer } from "react";
import { studentReducer } from "./studentReducer";
import { ActionEnum, LocalStorageEnum } from "../utils/enums";
import { StudentContext } from "./StudentContext";

export const StudentProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, dispatch] = useReducer(studentReducer, []);

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageEnum.Students);
    if (data) dispatch({ type: ActionEnum.INIT, payload: JSON.parse(data) });
  }, []);

  useEffect(() => {
    localStorage.setItem(LocalStorageEnum.Students, JSON.stringify(students));
  }, [students]);

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
