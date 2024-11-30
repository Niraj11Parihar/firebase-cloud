import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './component/home'; // Adjust paths as necessary
import StudentList from './component/listPage'; // Adjust paths as necessary

function App() {
  return (
    <Router>
      <div>
        <div className="mt-8"> {/* Add margin to avoid overlap with Navbar */}
          <Routes>
            <Route path="/" element={<StudentForm />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
