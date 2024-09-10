import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [doctorList, setDoctorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(`http://localhost:5000/api/doctors?search=${searchTerm}`);
          setDoctorList(response.data);
          setShowNoResults(response.data.length === 0);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      } else {
        setDoctorList([]);
        setShowNoResults(false); 
      }
    };

    fetchDoctors();
  }, [searchTerm]);

  return (
    <div>
      <h1>Doctor Dropdown Example with Dynamic Data Fetching</h1>
      <input
        type="text"
        placeholder="Search for a doctor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select>
        {doctorList.length > 0 ? (
          doctorList.map(doctor => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))
        ) : (
          showNoResults && <option>No results found</option>
        )}
      </select>
    </div>
  );
}

export default App;







