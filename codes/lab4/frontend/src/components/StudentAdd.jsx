import React, { useState } from "react";
import axios from "axios";

const StudentAdd = ({ reloadStudentList }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: ''
    });

    const url = "http://localhost:8080/";

    const handleChange = event => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const student = {
            name: formData.name,
            age: formData.age
        };

        try {
            const res = await axios.post(url + 'add', student);
            console.log(res);
            // Reset form first
            setFormData({ name: '', age: '' });
            event.target.reset();
            // Then trigger reload
            reloadStudentList();
        } catch (error) {
            console.error('Error adding student:', error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="container text-center mt-3 mb-5">
            <h3 className="bg-warning text-primary p-2">ADD NEW STUDENT</h3>
            <form className="form card p-3 bg-light" onSubmit={handleSubmit}>
                <label className="form-label h5 text-success">Student Name</label>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    minLength="3"
                    maxLength="20"
                    required
                    onChange={handleChange}
                    value={formData.name}
                />
                <label className="form-label h5 text-success">Student Age</label>
                <input
                    className="form-control"
                    type="number"
                    id="age"
                    min="18"
                    max="25"
                    required
                    onChange={handleChange}
                    value={formData.age}
                />
                <div className="text-center">
                    <button className="btn btn-primary mt-3 col-md-3" type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentAdd;

