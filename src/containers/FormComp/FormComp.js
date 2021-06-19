import React, { useState } from "react";
import TableComp from "../../components/TableComp/TableComp";
import "./FormComp.css";

function FormComp() {
    // form data State
    const [formData, setFormData] = useState({
        parentClass: "",
        class: "",
        numStudents: "",
        timeTable: "",
        numTeachers: "",
        mandatorySubjects: "",
        optionalSubjects: "",
    });

    const [arrayData, setArrayData] = useState([]); // Array containing multiple form data
    const [checkAddEdit, setCheckAddEdit] = useState({ //state for checking the triggering of add and edit action
        edit: false,
        add: false,
    });

    // time table options for drop down Values
    let timeTableOptions = [{label:"Select a Value",value:""},{label:"Yes",value:"Yes"},{label:"No",value:"No"}];

    //Input changing handler
    const inputChangeHandler = (event, type) => {
        let setData = {};
        setData[type] = event.target.value;
        setFormData({ ...formData, ...setData });
        // console.log(formData);
    };

    //form submit handler that works on click save or submit button
    const formSubmitHandler = event => {
        event.preventDefault();
        
        if (checkAddEdit.edit === true) {   //checking if the edit action is triggered
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
        } else if (checkAddEdit.add === true) {  //checking if the add action is triggered
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
            setArrayData([...arrayData, formData]); //execute when no action are triggered
            // console.log(arrayData);
        }

        setFormData({
            class: "",
            numStudents: "",
            numTeachers: "",
            mandatorySubjects: "",
            optionalSubjects: "",
        });
        document.getElementById("Time_Table").value="";
    };

    const onClickEditHandler = data => {
        setFormData(data);
        document.getElementById("Time_Table").value = data.timeTable==="undefined"?"Select a Value":data.timeTable;
        setCheckAddEdit({ ...checkAddEdit, edit: true, add: false });
        // console.log(formData)
    };

    const onClickAddHandler = classId => {
        document.getElementById("Time_Table").value = ""
        setCheckAddEdit({ ...checkAddEdit, edit: false, add: true });
        setFormData({
            parentClass: classId,
            class: "",
            numStudents: "",
            numTeachers: "",
            mandatorySubjects: "",
            optionalSubjects: "",
        });
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
                    {timeTableOptions.map(item=><option key={item.label} value={item.value}>{item.label}</option>)}
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
                <input type="submit" value={checkAddEdit.edit ? "Save" : "Submit"}/>
            </form>
        </div>
    );
}
export default FormComp;