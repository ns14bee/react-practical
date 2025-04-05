import { Student } from "../components/molecule/student/types";
import { ActionEnum } from "../utils/enums";
import { StudentAction } from "./types";

export const studentReducer = (state: Student[], action: StudentAction): Student[] => {
  switch (action.type) {
    case ActionEnum.INIT:
      return action.payload;
    case ActionEnum.ADD:
      return [...state, action.payload];
    case ActionEnum.EDIT:
      return state.map(s => (s.id === action.payload.id ? action.payload : s));
    case ActionEnum.DELETE:
      return state.filter(s => s.id !== action.payload);
    default:
      return state;
  }
};