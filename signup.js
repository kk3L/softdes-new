const signInButtonLink = document.querySelector('.signInButton-link');
const signUpButtonLink = document.querySelector('.signUpButton-link');
const wrapper = document.querySelector('.wrapper');

signUpButtonLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
})

signInButtonLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
})

// continue signing in popup
document.querySelector(".btn-signup").addEventListener("click", function(event) {
    event.preventDefault();

    const checkduplicate = document.getElementById('signup-email');
    const verifyifduplicate = checkduplicate.value;
    alert(verifyifduplicate);
    if (!verifyifduplicate) {
        console.log('Email not found in local storage');
        return;
    }
    fetch(`http://localhost:5000/patient/checkEmail/${verifyifduplicate}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(dataArray => {
        console.log('Response data:', dataArray);

        const data = dataArray[0];
        if (!data) {
            console.log('New Email Detected');
            var form = document.querySelector(".signin-form");
            var password = document.getElementById("signup-password").value;
            var confirmPassword = document.getElementById("signup-password-confirm").value;
            alert(password);
            alert(password);
            // Check if the password length is between 8 and 20 characters
            if (password.length < 8 || password.length >= 20) {
                alert("Password must be between 8 and 20 characters.");
                return;
            }else{
                console.log('NIGGA');
            }

            if (form.checkValidity()) {
                if (password === confirmPassword) {
                    var popup = document.querySelector(".popup");  // popup for continuew signin
                    popup.classList.toggle("active");
                } else {
                    alert("Passwords do not match. Please try again.");
                }
            } else {
                form.reportValidity();
            }
            return;
        }

        const DBemail = data['patientEmail'];
        
        console.log('Email:', DBemail);

        if (DBemail !== checkduplicate) {
            alert("This Email Is already been used");
        } else {
            alert("Email doesn't exist in the database");
            console.log("Email doesn't exist in the database");
            window.location.reload();
        }

    })
    .catch(error =>{
        console.error('Error:', error);
        alert('Error: Email is in incorrect format');
    });

});


// popup close button
document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
});
