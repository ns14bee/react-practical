import { Todo } from "../components/molecule/todo/types";
import { ActionEnum } from "../utils/enums";
import { TodoAction } from "./types";




export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case ActionEnum.INIT:
      return action.payload;
    case ActionEnum.ADD:
      return [...state, { id: Date.now().toString(), text: action.payload, completed: false }];
    case ActionEnum.TOGGLE:
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case ActionEnum.DELETE:
      return state.filter(todo => todo.id !== action.payload);
    case ActionEnum.EDIT:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    default:
      return state;
  }
};