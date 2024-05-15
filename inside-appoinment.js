function fetchAppointments() {
   const selectedschedID = localStorage.getItem('selectedschedID')
   const selectedID = localStorage.getItem('selectedID')
   fetch(`http://localhost:5000/dentistschedule/viewsched/${selectedschedID}`)
      .then(response => {
         if (!response.ok) {
               throw new Error('Network response was not ok');
         }
         return response.json();
      })
      .then(appoint => {
         const dentistID = appoint[0].dentistID;
         fetch(`http://localhost:5000/dentist/viewDentist/${selectedID}`)
               .then(response => {
                  if (!response.ok) {
                     throw new Error('Network response was not ok');
                  }
                  return response.json();
               })
               .then(dentist => {
                  const gridContainer = document.querySelector('.appointment-container');
                  if (!gridContainer) {
                     console.error('Grid container not found');
                     return;
                  }

                  // Loop through the appointments and create appointment containers
                  appoint.forEach(densched => {
                  if (densched.schedAvail !== 'available') {
                     return;
                  }
                  
                  const name = dentist.find(record => record.dentistID === densched.dentistID);
                  if (!name) {
                        console.error(`ID ${study.dentistID}`);
                        return;
                  }

                  //asdasd
                  const dentistName = document.getElementById('dentistName');
                  const datetime = document.getElementById('datetime');
                  const servicetype = document.getElementById('serviceType');
                  const dentistPhone = document.getElementById('dentistPhone');
                  const dentistEmail = document.getElementById('dentistEmail');


                  if (!dentistName || !datetime || !servicetype || !dentistPhone || !dentistEmail) {
                        console.error('Required HTML elements not found');
                        return;
                  }


                  dentistName.textContent = `${name.dentistFirstName} ${name.dentistLastName}`;
                  datetime.textContent = `${moment(densched.scheduleDate).format('MM D YYYY')}, ${densched.scheduleDay} | ${densched.startTime} - ${densched.endTime}`;
                  dentistPhone.textContent = name.dentistPhone;
                  dentistEmail.textContent = name.dentistEmail;
                  servicetype.textContent = densched.serviceType;
               


               });
               
               })
               .catch(error => console.error('Error fetching appointments:', error));
      })
      .catch(error => console.error('Error fetching appointments:', error));
}

fetchAppointments();
