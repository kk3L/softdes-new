document.getElementById('login-form').addEventListener('submit', function(event) {
   event.preventDefault(); 

   const email = document.getElementById('patient-email').value;
   const password = document.getElementById('patient-password').value;

   localStorage.setItem('email', email);

   fetch('http://localhost:5000/patient/loginPatient', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         patientEmail: email,
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
         localStorage.setItem('email', email);
         window.location.href = 'home.html';
      } else {
         console.log(data.message);
      }
   })
   .catch(error => {
      console.error('Error:', error);
      alert('Incorrect Password Or Email');
   });
});
