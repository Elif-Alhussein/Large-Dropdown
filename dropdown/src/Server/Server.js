const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const app = express();
const PORT = 5000;

const generateFakeDoctors = () => {
  const fakeDoctors = [];
  for (let i = 0; i < 1000; i++) {
    fakeDoctors.push({
      id: i + 1,
      name: faker.name.fullName(),  
    });
  }
  return fakeDoctors;
};

const doctors = generateFakeDoctors();

app.use(cors());

app.get('/api/doctors', (req, res) => {
  const searchTerm = req.query.search.toLowerCase();
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm)
  );
  res.json(filteredDoctors);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



