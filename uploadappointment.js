// Event listener for the publish button
document.querySelector(".option-card1").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values from the first form
    const schedDate = document.getElementById('schedDate').value;
    const serviceType = document.getElementById('serviceType').value;
    const schedDay = document.getElementById('schedDay').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    const requestData = {
        scheduleDate: schedDate,
        serviceType: serviceType,
        scheduleDay: schedDay,
        startTime: startTime,
        endTime: endTime
    }
    alert(schedDate);
    alert(serviceType);
    alert(schedDay);
    alert(startTime);
    alert(endTime);

    const dentistEmail = localStorage.getItem('email')

    //fetching email
    try {
        const response = await fetch(`http://localhost:5000/dentist/checkEmail/${dentistEmail}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            alert('No data found');
            return;
        }

        const dentistID = data[0].dentistID;

        if (!dentistID) { // fixed status to dentistID
            alert('Dentist ID not found in database');
            return;
        }
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
    }
        
    try {
        const jsonData = JSON.stringify(requestData);
        const response = await fetch('http://localhost:5000/dentistschedule/addApp', { // fixed parentheses placement
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        // Log the response for debugging
        console.log('Response:', response);
        // Check if response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        // Parse response JSON
        const data = await response.json();
    
        // Log the parsed data for debugging
        console.log('Parsed data:', data);
    
        // Check if registration was successful
        if (data.success) {
            // Successful registration
            if (data.alreadyAdded) {
                alert('This record already exists.'); // Alert if record already exists
            } else {
                alert('Successfully registered');
                window.location.reload();
            }
        }
        
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        alert('Please Fill Up The Form Properly!!');
    }
});
