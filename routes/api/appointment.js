//inprogress
var express = require('express');
var router = express.Router();
var databaseConn = require ('../../config/database.js');

//Request Appointment
router.post('/reqApp', (req, res) => {
    req.body.status = req.body.status || "processing";
    const { patientID, scheduleID, lastApp,takingMeds, ndMeds, appReason} = req.body;

    const sqlQuery = `INSERT INTO appointment (patientID, scheduleID, lastApp, takingMeds, ndMeds, appReason) 
                      VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [patientID, scheduleID, lastApp,takingMeds, ndMeds, appReason];

    databaseConn.query(sqlQuery, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting data into database:', error);
            return res.status(500).json({ success: false, message: 'Error inserting data into database' });
        }
        
        res.status(200).json({ success: true, message: 'Data inserted successfully' });
    });
});
  
//SELECTED Appointment
router.get('/viewApp/:appID', (req, res) => {
    const appID = req.params.appID;
    
    const sqlQuery = `SELECT * FROM appointment WHERE appID = ?`;
    
    databaseConn.query(sqlQuery, [appID], function(error, results, fields) {
      if (error) {
        console.error('Error executing SQL query', error);
        return res.status(500).json({ success: false, message: "Error executing SQL query" });
      }
      console.log('SQL query executed successfully');
      res.status(200).json(results);
    });
  });

//Homeview for Appointments
router.get('/apptab', (req, res) => {

    const sqlQuery = `SELECT * FROM appointment`;
  
    databaseConn.query(sqlQuery, function(error, results, fields) {
      if (error) {
        console.error('Error executing SQL query', error);
        return res.status(500).json({ success: false, message: "Error executing SQL query" });
      }
      console.log('SQL query executed successfully');
      res.status(200).json(results);
    });
  });

//UPDATE THE STATUS
router.put('/update/:appID', (req, res) => {
    const appID = req.params.appID;

    const newStatus = req.body.status; 
  
    const sqlQuery = `UPDATE appointment SET status = ? WHERE appID = ?`;
  
    databaseConn.query(sqlQuery, [newStatus, appID], (error, results, fields) => {
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

//View history with "Done" status
router.get('/viewHistory',(req,res) => {
    sqlQuery = `SELECT * FROM appointment WHERE status = "done"`;
    databaseConn.query (sqlQuery, function(error,results,fields){
       if(error) throw error;
       res.status(200).json(results)
    })
});

router.get('/view/:appID',(req,res) => {
  sqlQuery = `SELECT * FROM appointment WHERE appID = ?`;
  databaseConn.query (sqlQuery, function(error,results,fields){
     if(error) throw error;
     res.status(200).json(results)
  })
});

router.get('/viewsomething/:scheduleID',(req,res) => {
  const scheduleID = req.params.scheduleID;
  sqlQuery = `SELECT * FROM appointment WHERE scheduleID = ?`;
  databaseConn.query (sqlQuery, [scheduleID], function(error,results,fields){
     if(error) throw error;
     res.status(200).json(results)
  })
});

module.exports = router;