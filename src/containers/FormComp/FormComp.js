import React, { useState } from "react";
import TableComp from "../../components/TableComp/TableComp";
import "./FormComp.css";

function FormComp() {
    const [formData, setFormData] = useState({
        parentClass: "",
        class: "",
        numStudents: "",
        timeTable: "",
        numTeachers: "",
        mandatorySubjects: "",
        optionalSubjects: "",
    });

    const [arrayData, setArrayData] = useState([]);
    const [checkAddEdit, setCheckAddEdit] = useState({
        edit: false,
        add: false,
    });

    const inputChangeHandler = (event, type) => {
        let setData = {};
        setData[type] = event.target.value;
        setFormData({ ...formData, ...setData });
        // console.log(formData);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if (checkAddEdit.edit === true) {
            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i].class === formData.class) {
                    arrayData[i] = { ...formData };
                    setArrayData([...arrayData]);
                    setCheckAddEdit({
                        ...checkAddEdit,
                        edit: false,
                        add: false,
                    });
                }
            }
        } else if (checkAddEdit.add === true) {
            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i].class === formData.parentClass.split("-")[0]) {
                    const newUpdateData = arrayData.slice();
                    newUpdateData.splice(i + 1, 0, { ...formData });
                    console.log(newUpdateData);
                    setArrayData([...newUpdateData]);
                    setCheckAddEdit({
                        ...checkAddEdit,
                        edit: false,
                        add: false,
                    });
                }
            }
        } else {
            setArrayData([...arrayData, formData]);
            // console.log(arrayData);
        }
        setFormData({
            class: "",
            numStudents: "",
            timeTable: "",
            numTeachers: "",
            mandatorySubjects: "",
            optionalSubjects: "",
        });
    };

    const onClickEditHandler = data => {
        setFormData(data);
        setCheckAddEdit({ ...checkAddEdit, edit: true, add: false });
    };

    const onClickAddHandler = classData => {
        setCheckAddEdit({ ...checkAddEdit, edit: false, add: true });
        setFormData({ parentClass: classData });
    };

    return (
        <div>
            <TableComp
                userData={arrayData}
                editHandler={onClickEditHandler}
                addHandler={onClickAddHandler}
            />
            <br />

            <form onSubmit={formSubmitHandler}>
                {checkAddEdit.add && (
                    <>
                        <label htmlFor="parentClass">Parent Class: </label>
                        <input
                            type="text"
                            placeholder="ParentClass"
                            id="parentClass"
                            value={formData.parentClass}
                            disabled
                        />
                        <br />
                    </>
                )}
                <label htmlFor="class">Class: </label>
                <input
                    type="text"
                    id="class"
                    placeholder="Class"
                    value={formData.class}
                    onChange={event => inputChangeHandler(event, "class")}
                    min="0"
                    required
                />
                <br />
                <label htmlFor="Num_Students">Number of Students: </label>
                <input
                    type="number"
                    id="Num_Students"
                    placeholder="Number of Students"
                    value={formData.numStudents}
                    onChange={event => inputChangeHandler(event, "numStudents")}
                    min="0"
                    required
                />
                <br />
                <label htmlFor="Time_Table">Time Table: </label>
                <select
                    id="Time_Table"
                    value={formData.value}
                    onChange={event => inputChangeHandler(event, "timeTable")}
                >
                    <option value="Select a value">Select a value</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br />

                <label htmlFor="Num_Teachers">Number of Teachers: </label>
                <input
                    type="number"
                    id="Num_Student"
                    placeholder="Number of Teachers"
                    value={formData.numTeachers}
                    onChange={event => inputChangeHandler(event, "numTeachers")}
                    min="0"
                    required
                />
                <br />
                <label htmlFor="Mandatory_Subjects">Mandatory Subjects: </label>
                <input
                    type="number"
                    id="Mandatory_Subjects"
                    placeholder="Mandatory Subjects"
                    value={formData.mandatorySubjects}
                    onChange={event =>
                        inputChangeHandler(event, "mandatorySubjects")
                    }
                    min="0"
                    required
                />
                <br />
                <label htmlFor="Optional_Subjects">Optional Subjects: </label>
                <input
                    type="number"
                    id="Optional_Subjects"
                    placeholder="Optional Subjects"
                    value={formData.optionalSubjects}
                    onChange={event =>
                        inputChangeHandler(event, "optionalSubjects")
                    }
                    min="0"
                    required
                />
                <br />
                <input
                    type="submit"
                    value={checkAddEdit.edit ? "Save" : "Submit"}
                />
            </form>
        </div>
    );
}

export default FormComp;
