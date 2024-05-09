const express = require('express')
const app = express()
const cors = require('cors')

const Proutes = require('./routes/api/patient.js');
const Approutes = require('./routes/api/appointment.js');
const Schedrouts = require('./routes/api/dentistschedule.js');
const Dentroutes = require('./routes/api/dentist.js');

app.use(express.json({ extended: false}));

app.use(cors());

app.use('/patient', Proutes);
app.use('/appointment', Approutes);
app.use('/dentistschedule', Schedrouts);
app.use('/dentist', Dentroutes);

app.get('/',(req, res)=>{
res.send('run api run');})

const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));