import { createContext } from "react";
import { StudentContextType } from "./types";


export const StudentContext = createContext<StudentContextType | undefined>(undefined);