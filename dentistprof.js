function fetchUserProfile() {
    // Retrieve email from local storage
    const email = localStorage.getItem('email');
  
    // Check if email exists
    if (!email) {
        console.log('Email not found in local storage');
        return;
    }
  
    fetch(`http://localhost:5000/dentist/checkEmail/${email}`)
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
            
            if (!outName || !outPhone || !outEmail || !Fname || !Lname || !Gender || !DOB || !Address || !Email || !Phone ) {
                console.error('Required HTML elements not found');
                return;
            }
  
            // Check if user data exists and properties are defined
            if (user && user.length > 0) {
                const userData = user[0]; // Extract the first user from the array

                outName.textContent = `${userData.dentistFirstName} ${userData.dentistLastName}`;
                outPhone.textContent = userData.dentistPhone;
                outEmail.textContent = userData.dentistEmail;
                Fname.textContent = userData.dentistFirstName;
                Lname.textContent = userData.dentistLastName;
                Gender.textContent = userData.dentistGender;
                DOB.textContent = `${moment(userData.dentistDOB).format('MM D YYYY')}`;
                Address.textContent = userData.dentistAddress;
                Email.textContent = userData.dentistEmail;
                Phone.textContent= userData.dentistPhone;
            } else {
                console.error('User data is incomplete or missing');
            }
        })
        .catch(error => console.error('Error fetching user profile:', error));
}
  
// Fetch user profile when the page loads
window.onload = fetchUserProfile;
