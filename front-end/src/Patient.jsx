import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patient.css";

function Patient() {
    const [patient, setPatient] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "", cause: "", status: "" });
    const [editPatient, setEditPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios
            .get("http://localhost:5000/patient")
            .then((response) => setPatient(response.data))
            .catch((error) => console.log(error));
    };

    const addPatient = () => {
        axios
            .post("http://localhost:5000/patient", newPatient)
            .then(() => {
                setNewPatient({ name: "", age: "", gender: "", cause: "", status: "" });
                fetchPatients();
            })
            .catch((error) => console.log(error));
    };

    const updatePatient = () => {
        if (!editPatient) return;

        axios
            .put(`http://localhost:5000/patient/${editPatient.id}`, editPatient)
            .then(() => {
                setEditPatient(null);
                fetchPatients();
            })
            .catch((error) => console.log(error));
    };

    const deletePatient = (id) => {
        axios
            .delete(`http://localhost:5000/patient/${id}`)
            .then(() => fetchPatients())
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <h2>Patient Management</h2>

            <div className="form-container">
                <h3>Add Patient</h3>
                <input type="text" value={newPatient.name} placeholder="Name" onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
                <input type="text" value={newPatient.age} placeholder="Age" onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
                <input type="text" value={newPatient.gender} placeholder="Gender" onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} />
                <input type="text" value={newPatient.cause} placeholder="Cause" onChange={(e) => setNewPatient({ ...newPatient, cause: e.target.value })} />
                <input type="text" value={newPatient.status} placeholder="Status" onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })} />
                <button className="btn" onClick={addPatient}>Add Patient</button>
            </div>

            <h3>Patient List</h3>
            <ul className="s-list">
                {patient.map((patients) => (
                    <li key={patients.id} className="s-item">
                        {patients.id} - {patients.name} - {patients.age} - {patients.gender} - {patients.cause} - {patients.status}
                        <button className="edit-btn" onClick={() => setEditPatient(patients)}>Edit</button>
                        <button className="delete-btn" onClick={() => deletePatient(patients.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editPatient && (
                <div className="edit-container">
                    <h3>Edit Patient</h3>
                    <input type="text" value={editPatient.name} placeholder="Name" onChange={(e) => setEditPatient({ ...editPatient, name: e.target.value })} />
                    <input type="text" value={editPatient.age} placeholder="Age" onChange={(e) => setEditPatient({ ...editPatient, age: e.target.value })} />
                    <input type="text" value={editPatient.gender} placeholder="Gender" onChange={(e) => setEditPatient({ ...editPatient, gender: e.target.value })} />
                    <input type="text" value={editPatient.cause} placeholder="Cause" onChange={(e) => setEditPatient({ ...editPatient, cause: e.target.value })} />
                    <input type="text" value={editPatient.status} placeholder="Status" onChange={(e) => setEditPatient({ ...editPatient, status: e.target.value })} />
                    <button className="btn" onClick={updatePatient}>Update</button>
                    <button className="cancel-btn" onClick={() => setEditPatient(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Patient;