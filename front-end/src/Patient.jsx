import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Patient() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({name: '', age:'', gender:'', cause:'', status:''});

    useEffect(() => {
        axios
            .get('http://localhost:5000/patient')
            .then((response) => setPatients(response.data))
            .catch((error) => console.log(error));
    }, []);

    const addPatient = () => {
        axios
            .post('http://localhost:5000/patient', newPatient)
            .then(() => {
                setNewPatient({name:'', age:'', gender:'', cause:'', status:''});
                return axios.get('http://localhost:5000/patient');
            })
            .then((response) => setPatients(response.data))
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h2>Patient Management</h2>
            <div>
                <h3>Add Patient</h3>
                <input 
                    type = "text" 
                    value = {newPatient.name}
                    placeholder = "Name" 
                    onChange = {(e) => setNewPatient({...newPatient, name : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newPatient.age}
                    placeholder = "Age" 
                    onChange = {(e) => setNewPatient({...newPatient, age : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newPatient.gender}
                    placeholder = "Gender" 
                    onChange = {(e) => setNewPatient({...newPatient, gender : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newPatient.cause}
                    placeholder = "Cause" 
                    onChange = {(e) => setNewPatient({...newPatient, cause : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newPatient.status}
                    placeholder = "Status" 
                    onChange = {(e) => setNewPatient({...newPatient, status : e.target.value})}
                />
                <button onClick={addPatient}>Add Patient</button>
            </div>
            <h3>Patient List</h3>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name} - {patient.age} - {patient.gender} - {patient.cause} - {patient.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Patient;