import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '../features/Navbar';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stdId, setStdId] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !stdId || !age || !photo) {
      alert('Please fill all fields.');
      return;
    }
    try {
      await addDoc(collection(db, 'students'), { name, email, stdId, age, photo });
      alert('Student added successfully!');
      setName('');
      setEmail('');
      setStdId('');
      setAge('');
      setPhoto('');
    } catch (error) {
      alert('Error adding student:', error.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Student</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={stdId}
          onChange={(e) => setStdId(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>
    </div>
    </>
  );
};

export default StudentForm;

