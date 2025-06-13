import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = ({ reloadList }) => {
    const [students, setStudents] = useState([]);
    const url = "http://localhost:8080/";

    const fetchStudentList = () => {
        axios.get(url).then((res) => {
            const students = res.data;
            setStudents(students);
        });
    };

    // Initial load
    useEffect(() => {
        fetchStudentList();
    }, []);

    // Reload when reloadList prop changes
    useEffect(() => {
        fetchStudentList();
    }, [reloadList]);

    const handleDelete = (id) => {
        axios.delete(url + `delete/${id}`).then(res => {
            console.log(res);
            fetchStudentList(); // Direct reload after delete
        });
    };

    const handleUpdate = (id, updatedStudent) => {
        axios.put(url + `update/${id}`, updatedStudent).then(res => {
            console.log(res);
            fetchStudentList(); // Direct reload after update
        });
    };

    return (
        <div className="container text-center mt-3">
            <table className="table table-primary">
                <thead>
                    <tr>
                        <th colSpan="5" className="h3 text text-danger bg-warning">STUDENT LIST</th>
                    </tr>
                    <tr className="h5 text text-success">
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>Student Age</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => {
                                    const updatedStudent = {
                                        name: prompt("Enter updated student name:", student.name) || student.name,
                                        age: parseInt(prompt("Enter updated student age:", student.age)) || student.age,
                                    };
                                    handleUpdate(student.id, updatedStudent);
                                }}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this student?")) {
                                        handleDelete(student.id);
                                    }
                                }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
