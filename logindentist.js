document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
 
    const email = document.getElementById('dentist-email').value;
    const password = document.getElementById('dentist-password').value;
 
    localStorage.setItem('email', email);
 
    fetch('http://localhost:5000/dentist/loginDentist', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify({
          dentistEmail: email,
          password: password
       })
    })
    .then(response => {
       if (!response.ok) {
          throw new Error('Network response was not ok');
       }
       return response.json();
    })
    .then(data => {
       if (data.success) {
       window.location.href = 'dentist-appointment.html';
       } else {
          console.log(data.message);
       }
    })
    .catch(error => {
       console.error('Error:', error);
       alert('Incorrect Password Or Email');
    });
 });
 