document.getElementById("appsubmit").addEventListener("click", async function(event) {
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

    const dentistEmail = localStorage.getItem('email');

    let dentistID;

    //fetching email
    try {
        const response = await fetch(`http://localhost:5000/dentist/checkEmail/${dentistEmail}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data) || data.length === 0) {
            alert('No data found');
            return;
        }

        dentistID = data[0].dentistID;

        if (!dentistID) {
            alert('Dentist ID not found in database');
            return;
        } else {
            alert(dentistID);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return; // Exit the function if there's an error
    }

    try {
        const response = await fetch('http://localhost:5000/dentistschedule/addApp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scheduleDate: schedDate,
                serviceType: serviceType,
                scheduleDay: schedDay,
                startTime: startTime,
                endTime: endTime,
                dentistID: dentistID
            })
        });

        console.log('Response:', response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Parsed data:', data);

        if (data.success) {
            if (data.alreadyAdded) {
                alert('This record already exists.');
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
