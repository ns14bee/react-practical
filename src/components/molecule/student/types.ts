import { ClassEnum, GenderEnum } from "../../../utils/enums";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: GenderEnum;
  class: ClassEnum;
  address: string;
  email: string;
  mobile: string;
}

export interface IStudentForm {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit?: Student | null;
}
