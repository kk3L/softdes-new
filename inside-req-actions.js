document.getElementById('option-card1').addEventListener("click", function (event) {
    event.preventDefault();
    const selectedappID = localStorage.getItem('selectedappID');
    
    // Fetch '/update/:appID' and update status to "approved"
    fetch(`http://localhost:5000/appointment/update/${selectedappID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: "approved"
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Appointment update success:', data);

        // Fetch the dentist schedule data
        return fetch(`http://localhost:5000/dentistschedule/showApp/`);
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for dentist schedule');
        }
        return response.json();
    })
    .then(scheduleData => {
        console.log('Dentist schedule fetched:', scheduleData);

        // Find the specific schedule entry for the selectedappID
        const scheduleEntry = scheduleData.find(sched => sched.scheduleID === parseInt(selectedappID));
        if (!scheduleEntry) {
            throw new Error(`No schedule found for ID ${selectedappID}`);
        }
        
        // Update the dentist schedule status or any other fields as needed
        return fetch(`http://localhost:5000/dentistschedule/update/${selectedappID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                schedAvail: "booked" // Update this as per your requirement
            })
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for dentist schedule update');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dentist schedule update success:', data);
        // Handle success response if needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });
    alert('Appointment Approved.')
});


document.getElementById('option-card2').addEventListener("click", function (event) {
    event.preventDefault(); 
    const selectedappID = localStorage.getItem('selectedappID');

    fetch(`http://localhost:5000/appointment/update/${selectedappID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: "cancelled"
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle success response if needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });
    alert('Appointment Cancelled.')
});


