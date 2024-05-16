//inprogress
var express = require('express');
var router = express.Router();
var databaseConn = require ('../../config/database.js');

//Create Appointment
router.post('/addApp', (req, res) => {
    req.body.schedAvail = req.body.schedAvail || "available";
    const { dentistID, scheduleDate, serviceType, scheduleDay, startTime, endTime } = req.body;

    const sqlQuery = `INSERT INTO dentistschedule (dentistID, scheduleDate, serviceType, scheduleDay, startTime, endTime) 
                      VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [dentistID, scheduleDate, serviceType, scheduleDay, startTime, endTime];

    databaseConn.query(sqlQuery, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            return res.status(500).json({ success: false, message: 'Error inserting data into database' });
        }
        
        res.status(200).json({ success: true, message: 'Data inserted successfully' });
    });
});

//showing appointment in tab
router.get('/showApp', (req, res) => {

    const sqlQuery = `SELECT * FROM dentistschedule`;
  
    databaseConn.query(sqlQuery, function(error, results, fields) {
      if (error) {
        console.error('Error executing SQL query', error);
        return res.status(500).json({ success: false, message: "Error executing SQL query" });
      }
      console.log('SQL query executed successfully');
      res.status(200).json(results);
    });
  });


  
router.get('/viewsched/:scheduleID', (req, res) => {
  const scheduleID = req.params.scheduleID;
  
  const sqlQuery = `SELECT * FROM dentistschedule WHERE scheduleID = ?`;
  
  databaseConn.query(sqlQuery, [scheduleID], function(error, results, fields) {
    if (error) {
      console.error('Error executing SQL query', error);
      return res.status(500).json({ success: false, message: "Error executing SQL query" });
    }
    console.log('SQL query executed successfully');
    res.status(200).json(results);
  });
});

router.put('/update/:scheduleID', (req, res) => {
  const scheduleID = req.params.scheduleID;

  const schedAvail = req.body.schedAvail; 

  const sqlQuery = `UPDATE dentistschedule SET schedAvail = ? WHERE scheduleID = ?`;

  databaseConn.query(sqlQuery, [schedAvail, scheduleID], (error, results, fields) => {
      if (error) {
          console.error('Error updating borrow record:', error);
          return res.status(500).json({ success: false, message: 'Error updating borrow record' });
      }

      if (results.affectedRows === 0) {

          return res.status(404).json({ success: false, message: 'Borrow record not found' });
      }

      res.status(200).json({ success: true, message: 'Borrow record updated successfully' });
  });
}); 
module.exports = router;