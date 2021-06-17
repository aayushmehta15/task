import React from "react";
import "./TableComp.css";

function TableComp(props) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Student</th>
                        <th>TimeTable</th>
                        <th>Teachers</th>
                        <th>Mandatory Subjects</th>
                        <th>Optional Subjects</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {props.userData.map((item, index) => (
                        <tr key={item.class}>
                            <td>{item.class}</td>
                            <td>{item.numStudents}</td>
                            <td>{item.timeTable}</td>
                            <td>{item.numTeachers}</td>
                            <td>{item.mandatorySubjects}</td>
                            <td>{item.optionalSubjects}</td>
                            <td>
                                {!item.parentClass && (
                                    <>
                                        <span
                                            onClick={() =>
                                                props.addHandler(item.class)
                                            }
                                        >
                                            Add
                                        </span>
                                        /
                                    </>
                                )}
                                <span onClick={() => props.editHandler(item)}>
                                    Edit
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableComp;
