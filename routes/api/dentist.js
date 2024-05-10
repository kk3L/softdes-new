//(working)
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var databaseConn = require ('../../config/database.js');

const bcrypt = require('bcrypt');

// Function to generate JWT token
function generateToken(user) {
   return jwt.sign(user, 'negus', { expiresIn: '1h' });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
   const token = req.headers.authorization;

   if (!token) {
       return res.status(403).json({ success: false, message: 'Token is not provided' });
   }

   jwt.verify(token, 'negus', (err, decoded) => {
       if (err) {
           return res.status(401).json({ success: false, message: 'Unauthorized' });
       }
       req.user = decoded;
       next();
   });
}

// ADD SIGNUP
router.post('/addDentist', async (req, res) => {
   try {
       const { dentistFirstName, dentistLastName, dentistDOB, dentistGender, dentistAddress, dentistPhone, dentistEmail, password } = req.body;

       // Hash password asynchronously
       const hash = await bcrypt.hash(password.toString(), 10);

       const sqlQuery = `INSERT INTO dentist (dentistFirstName, dentistLastName, dentistDOB, dentistGender, dentistAddress, dentistPhone, dentistEmail, password) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                         
       const values = [dentistFirstName, dentistLastName, dentistDOB, dentistGender, dentistAddress, dentistPhone, dentistEmail, hash];

       databaseConn.query(sqlQuery, values, (error, results, fields) => {
           if (error) {
               console.error('Error inserting data into database:', error);
               return res.status(500).json({ success: false, message: 'Error inserting data into database' });
           }

           res.status(200).json({ success: true, message: 'Dentist Account inserted successfully' });
       });
       
   } catch (error) {
       console.error('Error:', error);
       res.status(500).json({ success: false, message: 'Internal server error' });
   }
});


//login 
router.post('/loginDentist', async (req, res) => {
   try {
       const { dentistEmail, password } = req.body;

       // Check if email and password are provided
       if (!dentistEmail || !password) {
           return res.status(400).json({ success: false, message: 'Email and password are required' });
       }

       const sqlQuery = `SELECT * FROM dentist WHERE dentistEmail = ?`;
       
       // Retrieve user from database by email
       databaseConn.query(sqlQuery, [dentistEmail], async (error, results, fields) => {
           if (error) {
               console.error('Error retrieving user from database:', error);
               return res.status(500).json({ success: false, message: 'Internal server error' });
           }

           // Check if user exists
           if (results.length === 0) {
               return res.status(404).json({ success: false, message: 'User not found' });
           }

           const user = results[0];

           // Compare passwords
           const passwordMatch = await bcrypt.compare(password.toString(), user.password);
           
           if (!passwordMatch) {
               return res.status(401).json({ success: false, message: 'Incorrect email or password' });
           }

           // If password is correct, return success message, user data, and JWT token
           const token = generateToken({ dentistEmail: user.dentistEmail });
           res.status(200).json({ success: true, message: 'Login successful', user, token });
       });
       
   } catch (error) {
       console.error('Error:', error);
       res.status(500).json({ success: false, message: 'Internal server error' });
   }
});




module.exports = router;