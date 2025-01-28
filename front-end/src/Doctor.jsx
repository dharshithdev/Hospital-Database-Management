import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Doctor () {
    const [doctor, setDoctor] = useState([]);
    const [newDoctor, setNewDoctor] = useState({name:'', dept:'', gender:''});

    useEffect(() => {
        axios
            .get('http://localhost:5000/doctor')
            .then((response) => setDoctor(response.data))
            .catch((error) => console.log(error));
    }, []);

    const addDoctor = () => {
        axios
            .post('http://localhost:5000/doctor', newDoctor)
            .then(() => {
                setNewDoctor({name: '', dept: '', gender : ''});
                return axios.get('http://localhost:5000/doctor');
            })
    }

    return (
        <div>
            <h2>Doctor Management</h2>
            <div>
                <h3>Add Doctor</h3>
                <input 
                    type = "text" 
                    value = {newDoctor.name}
                    placeholder = "Name" 
                    onChange = {(e) => setNewDoctor({...newDoctor, name : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newDoctor.dept}
                    placeholder = "Dept" 
                    onChange = {(e) => setNewDoctor({...newDoctor, dept : e.target.value})}
                />

                <input 
                    type = "text" 
                    value = {newDoctor.gender}
                    placeholder = "Gender" 
                    onChange = {(e) => setNewDoctor({...newDoctor, gender : e.target.value})}
                />

                <button onClick={addDoctor}>Add Doctor</button>
            </div>
            <h3>Doctor List</h3>
            <ul>
                {doctor.map((doctors) => (
                    <li key={doctors.id}>
                        {doctors.name} - {doctors.dept} - {doctors.gender}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default  Doctor;