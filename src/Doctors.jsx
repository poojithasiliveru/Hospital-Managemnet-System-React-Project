
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function Doctors() {
    const [search, setSearch] = useState('');
    const { data, load, error } = useFetch(
        'https://doc-back.onrender.com/doctors'
    );

    const [doctors, setDoctors] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        salary: '',
        gender: '',
        age: '',
        specialization: ''
    });

    // Sync API data with local state
    useEffect(() => {
        setDoctors(data || []);
    }, [data]);

    // Handle input changes
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // CREATE / UPDATE doctor
    async function postDoctors(e) {
        e.preventDefault();

        try {
            if (editId !== null) {
                // UPDATE
                await axios.put(
                    `https://doc-back.onrender.com/doctors/${editId}`,
                    formData
                );

                alert('Doctor updated successfully');
            } else {
                // CREATE
                await axios.post(
                    'https://doc-back.onrender.com/doctors',
                    formData
                );

                alert('Doctor added successfully');
            }

            // Refresh doctor list
            await getDoctors();

            // Reset form
            setFormData({
                name: '',
                salary: '',
                gender: '',
                age: '',
                specialization: ''
            });

            setEditId(null);
        } catch (err) {
            console.log(err);
            alert('Unable to save doctor details');
        }
    }

    // READ doctors
    async function getDoctors() {
        try {
            const res = await axios.get(
                'https://doc-back.onrender.com/doctors'
            );

            setDoctors(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    // Load doctor details into the form
    function EditDoctor(doctor) {
        setFormData({
            name: doctor.name ?? '',
            salary: doctor.salary ?? '',
            gender: doctor.gender ?? '',
            age: doctor.age ?? '',
            specialization: doctor.specialization ?? ''
        });

        setEditId(doctor.id);
    }

    // DELETE doctor
    async function DeleteDoctor(doctorId) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this doctor?'
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `https://doc-back.onrender.com/doctors/${doctorId}`
            );

            alert('Doctor deleted successfully');

            await getDoctors();

            if (editId === doctorId) {
                setEditId(null);
                setFormData({
                    name: '',
                    salary: '',
                    gender: '',
                    age: '',
                    specialization: ''
                });
            }
        } catch (err) {
            console.log(err);
            alert('Unable to delete doctor');
        }
    }

    // Search doctors by name, age, specialization or gender
    const filteredDoctors = useMemo(() => {
        const searchText = search.toLowerCase();

        return doctors.filter((doctor) =>
            String(doctor.name ?? '').toLowerCase().includes(searchText) ||
            String(doctor.age ?? '').toLowerCase().includes(searchText) ||
            String(doctor.specialization ?? '').toLowerCase().includes(searchText) ||
            String(doctor.gender ?? '').toLowerCase().includes(searchText)
        );
    }, [doctors, search]);

    if (load) {
        return (
            <center>
                <h1>Doctors Loading...</h1>
            </center>
        );
    }

    if (error) {
        return (
            <center>
                <h1>Doctors Error...</h1>
                <button onClick={getDoctors}>Retry</button>
            </center>
        );
    }

    return (
        <div className="doctors-page">

            <center>
                <h1>{editId !== null ? 'Update Doctor' : 'Add Doctor'}</h1>
            </center>

            {/* CREATE / UPDATE FORM */}
            <form className="doctor-form" onSubmit={postDoctors}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter doctor name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="salary"
                    placeholder="Enter doctor salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="number"
                    name="age"
                    placeholder="Enter doctor age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Enter specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editId !== null ? 'Update Doctor' : 'Add Doctor'}
                </button>

                {editId !== null && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setFormData({
                                name: '',
                                salary: '',
                                gender: '',
                                age: '',
                                specialization: ''
                            });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* SEARCH */}
            <center>
                <input
                    type="text"
                    placeholder="Search by name, age, gender or specialization"
                    name="search"
                    className="searchbox"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </center>

            {/* READ / DISPLAY DOCTORS */}
            {filteredDoctors.length === 0 ? (
                <center>
                    <h1>Doctors Not Found</h1>
                </center>
            ) : (
                <>
                    <center>
                        <h1>Doctors Information</h1>
                    </center>

                    <div className="doctors-container">
                        {filteredDoctors.map((doctor) => (
                            <div className="doctor-card" key={doctor.id}>
                                <h2>Doctor Name: {doctor.name}</h2>
                                <h3>Specialization: {doctor.specialization}</h3>
                                <h3>Salary: {doctor.salary}</h3>
                                <h4>Gender: {doctor.gender}</h4>
                                <h4>Age: {doctor.age}</h4>

                                <div className="doctor-actions">
                                    <Link to={`/doctors/${doctor.id}`}>
                                        View Doctor
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => EditDoctor(doctor)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => DeleteDoctor(doctor.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Doctors;
