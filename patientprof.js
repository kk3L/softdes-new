function fetchUserProfile() {
    // Retrieve email from local storage
    const email = localStorage.getItem('email');
  
    // Check if email exists
    if (!email) {
        console.log('Email not found in local storage');
        return;
    }
  
    fetch(`http://localhost:5000/patient/checkEmail/${email}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            // Check if the required HTML elements exist
            const outName = document.getElementById('outName');
            const outPhone = document.getElementById('outPhone');
            const outEmail = document.getElementById('outEmail');
            const Fname = document.getElementById('FirstName');
            const Lname = document.getElementById('LastName');
            const Gender = document.getElementById('Gender');
            const DOB = document.getElementById('DOB');
            const Age = document.getElementById('Age');
            const Address = document.getElementById('Address');
            const Email = document.getElementById('Email');
            const Phone = document.getElementById('Phone');
            const ECN = document.getElementById('ECN');
            const ECP = document.getElementById('ECP');
            const ECR = document.getElementById('ECR');
            
            if (!outName || !outPhone || !outEmail || !Fname || !Lname || !Gender || !DOB || !Age || !Address || !Email || !Phone || !ECN || !ECP || !ECR  ) {
                console.error('Required HTML elements not found');
                return;
            }
  
            // Check if user data exists and properties are defined
            if (user && user.length > 0) {
                const userData = user[0]; // Extract the first user from the array

                outName.textContent = `${userData.patientFirstName} ${userData.patientLastName}`;
                outPhone.textContent = userData.patientPhone;
                outEmail.textContent = userData.patientEmail;
                Fname.textContent = userData.patientFirstName;
                Lname.textContent = userData.patientLastName;
                Gender.textContent = userData.patientGender;
                DOB.textContent = `${moment(userData.patientDOB).format('MM D YYYY')}`;
                Age.textContent = userData.patientAge;
                Address.textContent = userData.patientAddress;
                Email.textContent = userData.patientEmail;
                Phone.textContent= userData.patientPhone;
                ECN.textContent = userData.patientECName;
                ECP.textContent = userData.patientECPhone;
                ECR.textContent = userData.patientECRelation;
            } else {
                console.error('User data is incomplete or missing');
            }
        })
        .catch(error => console.error('Error fetching user profile:', error));
}
  
// Fetch user profile when the page loads
window.onload = fetchUserProfile;
