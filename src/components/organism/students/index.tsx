import React, { useState } from "react";
import { StudentFormModal } from "../../molecule/student/StudentForm";
import { Student } from "../../molecule/student/types";
import StudentTable from "../../molecule/student/StudentTable";

const Students = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const openAddModal = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Student
      </button>

      <StudentTable editStudent={openEditModal} />

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        studentToEdit={editingStudent}
      />
    </div>
  );
};

export default Students;
