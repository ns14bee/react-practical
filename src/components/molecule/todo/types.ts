export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};


export interface ITodoForm {
  onSubmit: (text: string) => void;
  editText?: string;
  btnBg?: string;
}

export interface ITodoItem {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  btnBg?: string;
}