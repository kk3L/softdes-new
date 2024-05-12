//IN PROGRESS

// Event listener for the request button
document.querySelector("#req").addEventListener("click", async function(event) {
    event.preventDefault(); 
    const selectedappID = localStorage.getItem('selectedappID');
    const email = localStorage.getItem('email');

    // Check if pd_id exists
    if (!selectedappIDappID) {
        console.log('No selected appointment found');
        return;
    }

    // Check if email exists
    if (!email) {
        console.log('Email not found in local storage.');
        alert("Please Log in first to book an appointment");
        return;
    }

    try {
        // Fetch selected appointment
        const response = await fetch(`http://localhost:5000/appointment/viewApp/${selectedappID}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            alert('No data found');
            return;
        }

        const status = data[0].PD_status;

        if (!status) {
            alert('Status not found in database');
            return;
        }
        
        if (status === 'Available') {
            // Check if the required HTML elements exist
            localStorage.setItem('pdtitle', data[0].PD_Title);
            const pdtitle = document.getElementById('Btitle');
            if (!pdtitle) {
                console.error('Required HTML element "Btitle" not found');
                return;
            }

            if (data && data.length > 0) {
                const userData = data[0]; 

                // Update the content of HTML elements
                pdtitle.value = userData.PD_Title;

                // Fetch patient details
                fetch(`http://localhost:5000/patient/view`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(users => {
                        const email = localStorage.getItem('email');
                        const user = users.find(user => user.patientEmail === email);

                        if (!user) {
                            console.error('User data not found');
                            return;
                        }

                        localStorage.setItem('RpatientID', user.patientID);
                        localStorage.setItem('RFirstN', user.patientFirstName);
                        localStorage.setItem('RLastN', user.patientLastName);
                        localStorage.setItem('RNumber', user.patientPhone);
                        localStorage.setItem('RpECN', user.patientECName);
                        localStorage.setItem('RpECR', user.patientECRelation);
                        localStorage.setItem('RpECP', user.patientECPhone);

                        const Rname = document.getElementById('names');
                        const RemailElement = document.getElementById('Email');
                        const Rnum = document.getElementById('Contactno');

                        Rname.value = `${user.patientFirstName} ${user.patientLastName}`;
                        RstudentId.value = user.Student_Number || '';
                        RemailElement.value = user.Email || '';
                        Rnum.value = user.Contact_Number;
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

                // Toggle the visibility of the popup
                var popup = document.querySelector(".popup");
                popup.classList.toggle("active");
            }
        } else if (status === 'Unavailable') {
            alert("This book is not available for borrowing");
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
});


// Event listener for submit button
document.querySelector(".submit-bnt").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve values from local storage
    const appID = localStorage.getItem('appID');
    const RaccID = localStorage.getItem('RaccID');
    const RFirstN = localStorage.getItem('RFirstN');
    const RMiddleN = localStorage.getItem('RMiddleN');
    const RLastN = localStorage.getItem('RLastN');

    // Create FormData object
    const formData = new FormData(); 

    // Append form data
    formData.append('PD_ID', appID);
    formData.append('Account_ID', RaccID);
    formData.append('First_Name', RFirstN);
    formData.append('Middle_Name', RMiddleN);
    formData.append('Last_Name', RLastN);
    formData.append('PD_Title', document.getElementById('Btitle').value);
    formData.append('Email', document.getElementById('Email').value);
    formData.append('Student_Number', document.getElementById('studentno').value);
    formData.append('Contact_Number', document.getElementById('Contactno').value);

    try {
        // Send AJAX request
        const response = await fetch('http://localhost:5000/appointments/reqApp', {
            method: 'POST',
            body: formData // Use FormData object as body
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
        alert('Fill up the form properly');
    }
});