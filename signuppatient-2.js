document.getElementById('signup-btn2').addEventListener('click', async function(event) {
    event.preventDefault(); 

    //form shit numsayin (variables)
    const pfirstName = document.getElementById('FirstName').value;
    const plastName = document.getElementById('LastName').value;
    const pAge = document.getElementById('Age').value;
    const pDOB = document.getElementById('DOB').value;
    const pGender = document.getElementById('Gender').value;
    const pAddress = document.getElementById('Address').value;
    const pPhone = document.getElementById('Phone').value;
    const pECN = document.getElementById('ECN').value;
    const pECR = document.getElementById('ECR').value;
    const pECP = document.getElementById('ECP').value;

    const requestData = {
        patientEmail: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        patientFirstName: pfirstName,
        patientLastName: plastName,
        patientAge: pAge,
        patientDOB: pDOB,
        patientGender: pGender,
        patientAddress: pAddress,
        patientPhone: pPhone,
        patientECName: pECN,
        patientECRelation: pECR,
        patientECPhone: pECP
    };
   
    try {
        // Send AJAX request
        const jsonData = JSON.stringify(requestData);
        const response = await fetch('http://localhost:5000/patient/addPatient', {
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