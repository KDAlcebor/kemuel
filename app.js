const express = require('express');
const bodyParser = require('body-parser');

//ROUTES HERE
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("Kemuel Alcebor BSIS 2A");
});

//Endpoint Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/courses', coursesRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});