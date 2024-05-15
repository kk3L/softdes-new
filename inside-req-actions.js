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
        console.log('Success:', data);
        // Handle success response if needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });
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
});

