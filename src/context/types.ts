import { Student } from "../components/molecule/student/types";
import { Todo } from "../components/molecule/todo/types";
import { ThemeEnum, ActionEnum } from "../utils/enums";

export interface IThemeContextType {
  theme: ThemeEnum;
  setTheme: (theme: ThemeEnum) => void;
  cycleTheme: () => void;
}

export type TodoAction =
  | { type: ActionEnum.ADD; payload: string }
  | { type: ActionEnum.TOGGLE; payload: string }
  | { type: ActionEnum.DELETE; payload: string }
  | { type: ActionEnum.EDIT; payload: { id: string; text: string } }
  | { type: ActionEnum.INIT; payload: Todo[] };


export interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}
  

export type StudentAction =
| { type: ActionEnum.INIT; payload: Student[] }
| { type: ActionEnum.ADD; payload: Student }
| { type: ActionEnum.EDIT; payload: Student }
| { type: ActionEnum.DELETE; payload: string };


export interface StudentContextType {
  students: Student[];
  dispatch: React.Dispatch<StudentAction>;
}