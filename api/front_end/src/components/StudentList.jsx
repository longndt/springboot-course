import React from 'react';
import axios from 'axios';

export default class StudentList extends React.Component {
    state = {
        students: []
    }

    url = "http://localhost:8080/"

    componentDidMount() {
        this.fetchStudentList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reloadList !== prevProps.reloadList) {
            this.fetchStudentList();
        }
    }

    fetchStudentList = () => {
        axios.get(this.url).then((res) => {
            const students = res.data;
            this.setState({ students });
        });
    };

    handleDelete = (id) => {
        axios.delete(this.url + `delete/${id}`).then(res => {
            console.log(res);
            this.fetchStudentList();
        });
    };

    handleUpdate = (id, updatedStudent) => {
        axios.put( this.url + `update/${id}`, updatedStudent).then(res => {
            console.log(res);
            this.fetchStudentList();
        });
    };

    render() {
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
                        {
                            this.state.students
                                .map(student =>
                                    <tr key={student.id}>
                                        <td> {student.id} </td>
                                        <td> {student.name} </td>
                                        <td> {student.age} </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => {
                                                const updatedStudent = {
                                                    name: prompt("Enter updated student name:", student.name) || student.name,
                                                    age: parseInt(prompt("Enter updated student age:", student.age)) || student.age,
                                                };
                                                this.handleUpdate(student.id, updatedStudent);
                                            }}>
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this student?")) {
                                                    this.handleDelete(student.id);
                                                }
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
