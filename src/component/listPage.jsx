import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import Navbar from '../features/Navbar';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        setStudents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'students', id));
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleEdit = async () => {
    await updateDoc(doc(db, 'students', selectedStudent.id), { ...selectedStudent });
    setModalIsOpen(false);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 p-6">
      <h2 className="text-3xl text-white font-bold text-center mb-6">Student List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-lg p-4 flex w-1/2 flex-col items-center"
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-gray-700">Email: {student.email}</p>
            <p className="text-gray-700">Student ID: {student.stdId}</p>
            <p className="text-gray-700">Age: {student.age}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setModalIsOpen(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl font-bold mb-4">Edit Student</h2>
          <input
            type="text"
            value={selectedStudent.name}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            value={selectedStudent.email}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, email: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            value={selectedStudent.stdId}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, stdId: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={selectedStudent.age}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, age: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            value={selectedStudent.photo}
            onChange={(e) =>
              setSelectedStudent({ ...selectedStudent, photo: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
    </>
  );
};

Modal.setAppElement('#root'); // Accessibility requirement
export default StudentList;
