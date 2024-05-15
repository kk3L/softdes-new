document.getElementById('signup-btn2').addEventListener('click', async function(event) {
    event.preventDefault(); 

    //form shit numsayin (variables)
    const dfirstName = document.getElementById('FirstName').value;
    const dlastName = document.getElementById('LastName').value;
    const dDOB = document.getElementById('DOB').value;
    const dGender = document.getElementById('Gender').value;
    const dAddress = document.getElementById('Address').value;
    const dPhone = document.getElementById('Phone').value;

    const requestData = {
        dentistEmail: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        dentistFirstName: dfirstName,
        dentistLastName: dlastName,
        dentistDOB: dDOB,
        dentistGender: dGender,
        dentistAddress: dAddress,
        dentistPhone: dPhone,
    };

    try {
        // Send AJAX request
        const jsonData = JSON.stringify(requestData);
        const response = await fetch('http://localhost:5000/dentist/addDentist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData // Pass the JSON data as the body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            alert('Successfully registered');
            window.location.reload();
        } else {
            alert('Register Failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});