function fetchAppointments() {
    const selectedappID = localStorage.getItem('selectedappID')
    const selectedID = localStorage.getItem('selectedID')
    fetch(`http://localhost:5000/appointment/viewApp/${selectedappID}`)
       .then(response => {
          if (!response.ok) {
                throw new Error('Network response was not ok');
          }
          return response.json();
       })
       .then(appoint => {
          const patientID = appoint[0].patientID;
          fetch(`http://localhost:5000/patient/viewPatient/${selectedID}`)
                .then(response => {
                   if (!response.ok) {
                      throw new Error('Network response was not ok');
                   }
                   return response.json();
                })
                .then(patient => {
                   const gridContainer = document.querySelector('.appointment-container');
                   if (!gridContainer) {
                      console.error('Grid container not found');
                      return;
                   }
 
                   // Loop through the appointments and create appointment containers
                   appoint.forEach(app => {
                   if (app.status === 'processing') {
                      return;
                   }
                   
                   const name = patient.find(record => record.patientID === app.patientID);
                   if (!name) {
                         console.error(`ID ${study.patientID}`);
                         return;
                   }
 
                   //asdasd
                   const patientName = document.getElementById('patientName');
                   const datetime = document.getElementById('datetime');
                   const lastApp = document.getElementById('lastApp');
                   const takingMeds = document.getElementById('takingMeds');
                   const ndMeds = document.getElementById('ndMeds');
 
 
                   if (!patientName || !datetime || !lastApp || !takingMeds || !ndMeds) {
                         console.error('Required HTML elements not found');
                         return;
                   }
 
 
                   patientName.textContent = `${name.patientFirstName} ${name.patientLastName}`;
                   datetime.textContent = `${moment(app.scheduleDate).format('MM D YYYY')}, ${app.scheduleDay} | ${app.startTime} - ${app.endTime}`;
                   lastApp.textContent = app.lastApp;
                   takingMeds.textContent = app.takingMeds;
                   ndMeds.textContent = app.ndMeds;
                
 
 
                });
                
                })
                .catch(error => console.error('Error fetching appointments:', error));
       })
       .catch(error => console.error('Error fetching appointments:', error));
 }
 
 fetchAppointments();
 