import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patient.css";

function Doctor() {
    const [doctor, setDoctor] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: "", dept: "", gender: ""});
    const [editDoctor, setEditDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        axios
            .get("http://localhost:5000/doctor")
            .then((response) => setDoctor(response.data))
            .catch((error) => console.log(error));
    };

    const addDoctor = () => {
        axios
            .post("http://localhost:5000/doctor", newDoctor)
            .then(() => {
                setNewDoctor({ name: "", dept: "", gender: ""});
                fetchDoctors();
            })
            .catch((error) => console.log(error));
    };

    const updateDoctor = () => {
        if (!editDoctor) return;

        axios
            .put(`http://localhost:5000/doctor/${editDoctor.id}`, editDoctor)
            .then(() => {
                setEditDoctor(null);
                fetchDoctors();
            })
            .catch((error) => console.log(error));
    };

    const deleteDoctor = (id) => {
        axios
            .delete(`http://localhost:5000/doctor/${id}`)
            .then(() => fetchDoctors())
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <h2>Doctor Management</h2>

            <div className="form-container">
                <h3>Add Doctor</h3>
                <input type="text" value={newDoctor.name} placeholder="Name" onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} />
                <input type="text" value={newDoctor.dept} placeholder="Dept" onChange={(e) => setNewDoctor({ ...newDoctor, dept: e.target.value })} />
                <input type="text" value={newDoctor.gender} placeholder="Gender" onChange={(e) => setNewDoctor({ ...newDoctor, gender: e.target.value })} />
                <button className="btn" onClick={addDoctor}>Add Doctor</button>
            </div>

            <h3>Doctor List</h3>
            <ul className="s-list">
                {doctor.map((doctors) => (
                    <li key={doctors.id} className="s-item">
                        {doctors.id} - {doctors.name} - {doctors.dept} - {doctors.gender}
                        <button className="edit-btn" onClick={() => setEditDoctor(doctors)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteDoctor(doctors.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editDoctor && (
                <div className="edit-container">
                    <h3>Edit Doctor</h3>
                    <input type="text" value={editDoctor.name} placeholder="Name" onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })} />
                    <input type="text" value={editDoctor.dept} placeholder="Dept" onChange={(e) => setEditDoctor({ ...editDoctor, dept: e.target.value })} />
                    <input type="text" value={editDoctor.gender} placeholder="Gender" onChange={(e) => setEditDoctor({ ...editDoctor, gender: e.target.value })} />
                    <button className="btn" onClick={updateDoctor}>Update</button>
                    <button className="cancel-btn" onClick={() => setEditDoctor(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Doctor;
