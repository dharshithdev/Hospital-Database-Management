import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Patient.css";

function Staffs() {
    const [staff, setStaff] = useState([]);
    const [newStaff, setNewStaff] = useState({ name: "", dept: "", gender: "", shift: "" });
    const [editStaff, setEditStaff] = useState(null);

    useEffect(() => {
        fetchStaffs();
    }, []);

    const fetchStaffs = () => {
        axios
            .get("http://localhost:5000/staffs")
            .then((response) => setStaff(response.data))
            .catch((error) => console.log(error));
    };

    const addStaff = () => {
        axios
            .post("http://localhost:5000/staffs", newStaff)
            .then(() => {
                setNewStaff({ name: "", dept: "", gender: "", shift: "" });
                fetchStaffs();
            })
            .catch((error) => console.log(error));
    };

    const updateStaff = () => {
        if (!editStaff) return;

        axios
            .put(`http://localhost:5000/staffs/${editStaff.id}`, editStaff)
            .then(() => {
                setEditStaff(null);
                fetchStaffs();
            })
            .catch((error) => console.log(error));
    };

    const deleteStaff = (id) => {
        axios
            .delete(`http://localhost:5000/staffs/${id}`)
            .then(() => fetchStaffs())
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <h2>Staff Management</h2>

            <div className="form-container">
                <h3>Add Staff</h3>
                <input type="text" value={newStaff.name} placeholder="Name" onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} />
                <input type="text" value={newStaff.dept} placeholder="Dept" onChange={(e) => setNewStaff({ ...newStaff, dept: e.target.value })} />
                <input type="text" value={newStaff.gender} placeholder="Gender" onChange={(e) => setNewStaff({ ...newStaff, gender: e.target.value })} />
                <input type="text" value={newStaff.shift} placeholder="Shift" onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })} />
                <button className="btn" onClick={addStaff}>Add Staff</button>
            </div>

            <h3>Staff List</h3>
            <ul className="s-list">
                {staff.map((staffs) => (
                    <li key={staffs.id} className="s-item">
                        {staffs.id} - {staffs.name} - {staffs.dept} - {staffs.gender} - {staffs.shift}
                        <button className="edit-btn" onClick={() => setEditStaff(staffs)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteStaff(staffs.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editStaff && (
                <div className="edit-container">
                    <h3>Edit Staff</h3>
                    <input type="text" value={editStaff.name} placeholder="Name" onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })} />
                    <input type="text" value={editStaff.dept} placeholder="Dept" onChange={(e) => setEditStaff({ ...editStaff, dept: e.target.value })} />
                    <input type="text" value={editStaff.gender} placeholder="Gender" onChange={(e) => setEditStaff({ ...editStaff, gender: e.target.value })} />
                    <input type="text" value={editStaff.shift} placeholder="Shift" onChange={(e) => setEditStaff({ ...editStaff, shift: e.target.value })} />
                    <button className="btn" onClick={updateStaff}>Update</button>
                    <button className="cancel-btn" onClick={() => setEditStaff(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Staffs;
