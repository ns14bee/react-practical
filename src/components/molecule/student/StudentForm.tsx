import { FC, useEffect, useState } from "react";
import { IStudentForm, Student } from "./types";
import { useStudents } from "../../../hooks/useStudents";
import { useTheme } from "../../../hooks/useTheme";
import { ActionEnum, ClassEnum, GenderEnum } from "../../../utils/enums";
import { v4 as uuidv4 } from "uuid";

const defaultForm: Omit<Student, "id"> = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: GenderEnum.Male,
  class: ClassEnum.A,
  address: "",
  email: "",
  mobile: "",
};

export const StudentFormModal: FC<IStudentForm> = ({
  isOpen,
  onClose,
  studentToEdit,
}) => {
  const { dispatch } = useStudents();
  const { theme } = useTheme();

  const [form, setForm] = useState<Omit<Student, "id">>(defaultForm);

  const [error, setError] = useState("");

  useEffect(() => {
    if (studentToEdit) {
      setForm(studentToEdit);
    } else {
      setForm(defaultForm);
    }
    setError("");
  }, [studentToEdit, isOpen]);

  const validate = () => {
    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        setError("All fields are required.");
        return false;
      }
    }

    const dob = new Date(form.dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18 || age > 21) {
      setError("Age must be between 18 and 21.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (studentToEdit) {
      dispatch({
        type: ActionEnum.EDIT,
        payload: { ...studentToEdit, ...form },
      });
    } else {
      dispatch({ type: ActionEnum.ADD, payload: { ...form, id: uuidv4() } });
    }
    onClose();
  };

  const bg = {
    light: "bg-white text-black",
    dark: "bg-gray-800 text-white",
    gray: "bg-gray-100 text-gray-800",
  }[theme];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className={`w-full max-w-xl p-6 rounded shadow-lg ${bg}`}>
        <h2 className="text-xl font-bold mb-4">
          {studentToEdit ? "Edit" : "Add"} Student
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={form.gender}
            onChange={(e) =>
              setForm({ ...form, gender: e.target.value as Student["gender"] })
            }
            className="p-2 border rounded"
          >
            {Object.values(GenderEnum).map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <select
            value={form.class}
            onChange={(e) =>
              setForm({ ...form, class: e.target.value as Student["class"] })
            }
            className="p-2 border rounded"
          >
            {Object.values(ClassEnum).map((classOption) => (
              <option key={classOption} value={classOption}>
                {classOption}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="p-2 border rounded col-span-2"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {studentToEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
