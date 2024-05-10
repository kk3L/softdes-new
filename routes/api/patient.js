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
router.post('/addPatient', async (req, res) => {
    try {
        const { patientFirstName, patientLastName, patientAge, patientDOB, patientGender, patientAddress, patientPhone, patientEmail, patientECName, patientECRelation, patientECPhone, password } = req.body;

        // Hash password asynchronously
        const hash = await bcrypt.hash(password.toString(), 10);


        const sqlQuery = `INSERT INTO patient (patientFirstName, patientLastName, patientAge, patientDOB, patientGender, patientAddress, patientPhone, patientEmail, patientECName, patientECRelation, patientECPhone, password) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                          
        const values = [patientFirstName, patientLastName, patientAge, patientDOB, patientGender, patientAddress, patientPhone, patientEmail, patientECName, patientECRelation, patientECPhone, hash];

        databaseConn.query(sqlQuery, values, (error, results, fields) => {
            if (error) {
                console.error('Error inserting data into database:', error);
                return res.status(500).json({ success: false, message: 'Error inserting data into database' });
            }

            res.status(200).json({ success: true, message: 'Data inserted successfully' });
        });
        
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

//login
router.post('/loginPatient', async (req, res) => {
    try {
        const { patientEmail, password } = req.body;

        // Check if email and password are provided
        if (!patientEmail || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const sqlQuery = `SELECT * FROM patient WHERE patientEmail = ?`;
        
        // Retrieve user from database by email
        databaseConn.query(sqlQuery, [patientEmail], async (error, results, fields) => {
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
            const token = generateToken({ patientEmail: user.patientEmail });
            res.status(200).json({ success: true, message: 'Login successful', user, token });
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/checkEmail/:patientEmail', (req, res) => {
    const email = req.params.patientEmail; // Extract email from request parameters
    
    const sqlQuery = `SELECT * FROM patient WHERE patientEmail = ?`;
    
    databaseConn.query(sqlQuery, [email], function(error, results, fields) {
        if (error) {
            console.log('Error executing SQL query', error); // Log the error
            return res.status(500).json({ success: false, message: "Error executing SQL query" });
        }
        console.log('SQL query executed successfully'); // Log the success
        res.status(200).json(results);
    });
});

module.exports = router;