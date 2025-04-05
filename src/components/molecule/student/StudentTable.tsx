import React, { FC } from "react";
import { PaginationAction, useTable } from "../../../hooks/useTable";
import { useStudents } from "../../../hooks/useStudents";
import { Student } from "./types";
import { ActionEnum } from "../../../utils/enums";
import { useTheme } from "../../../hooks/useTheme";
import { Edit, Trash2 } from "lucide-react";

const StudentTable: FC<{ editStudent: (student: Student) => void }> = ({
  editStudent,
}) => {
  const { students, dispatch } = useStudents();
  const { theme } = useTheme();
  const {
    data,
    handleSetFileter,
    totalPage,
    handleSortColumn,
    handlePagination,
  } = useTable(students);

  const btnBg = {
    light: "bg-blue-500 hover:bg-blue-600 text-white",
    dark: "bg-blue-600 hover:bg-blue-700 text-white",
    gray: "bg-blue-400 hover:bg-blue-500 text-white",
  }[theme];

  return (
    <>
      <input
        type="text"
        onChange={(e) => handleSetFileter({ search: e.target.value })}
        placeholder="Search"
        className="p-2 border rounded mb-4"
      />

      {data?.length !== 0 && (
        <>
          <table className="table-auto min-w-full rounded overflow-scroll text-sm">
            <thead>
              <tr>
                <th onClick={() => handleSortColumn("firstName")}>
                  First Name
                </th>
                <th onClick={() => handleSortColumn("lastName")}>Last Name</th>
                <th>DOB</th>
                <th onClick={() => handleSortColumn("gender")}>Gender</th>
                <th onClick={() => handleSortColumn("class")}>Class</th>
                <th>Address</th>
                <th>Email</th>
                <th>Mbbile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((student) => (
                <tr key={student.id}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.dob}</td>
                  <td>{student.gender}</td>
                  <td>{student.class}</td>
                  <td>{student.address}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => editStudent(student)}
                      className={btnBg}
                    >
                      <Edit size={16} className="text-yellow-600" />
                    </button>
                    <button
                      onClick={() =>
                        dispatch({
                          type: ActionEnum.DELETE,
                          payload: student.id,
                        })
                      }
                      className={btnBg}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 items-center">
              <button
                className={btnBg}
                onClick={() => handlePagination(PaginationAction.Prev)}
              >
                Prev
              </button>
              <button
                className={btnBg}
                onClick={() => handlePagination(PaginationAction.Next)}
              >
                Next
              </button>
            </div>
            <div> Total Page: {totalPage}</div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentTable;
