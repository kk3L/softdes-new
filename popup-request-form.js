document.addEventListener("DOMContentLoaded", function () {
    const optionCard1 = document.querySelector(".option-card1");
    const popupForm = document.querySelector(".popup-request-form");
    const closeBtn = document.querySelector(".close-btn");

    optionCard1.addEventListener("click", function () {
        popupForm.style.display = "flex"; 
        popupBackground.style.display = "block"; 
    });

    closeBtn.addEventListener("click", function () {
        popupForm.style.display = "none";
        popupBackground.style.display = "none"; 
    });

    document.getElementById('req-btn').addEventListener('click', async function(event) {
        event.preventDefault();
    
        const email = localStorage.getItem('email');
        if (!email) {
            alert("No email found in localStorage");
            return;
        }
    
        //alert(email);
    
        try {
            const response = await fetch(`http://localhost:5000/patient/checkEmail/${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //alert(`Server response: ${JSON.stringify(data)}`);
    
            // Check if the response is an array and if it contains any elements
            if (Array.isArray(data) && data.length > 0) {
                const patient = data[0]; // Access the first element in the array
                const patientID = patient.patientID;
    
                const lastApp = document.getElementById('lastApp').value;
                const appReason = document.getElementById('appReason').value;
                let takingMeds = document.getElementById('takingMeds').checked ? 'Yes' : 'No';
                const ndMeds = document.getElementById('ndMeds').value;
                const selectedschedID = localStorage.getItem('selectedschedID');
                //alert(lastApp);
                //alert(appReason);
                //alert(takingMeds);
                //alert(ndMeds);
                //alert(selectedschedID);
    
                // Convert takingMeds value to 1 or 0
                const newtakingMeds = (takingMeds === 'Yes') ? 1 : 0;
                alert(newtakingMeds)
                const requestData = {   
                    patientID: patientID,
                    scheduleID: selectedschedID,
                    lastApp: lastApp,
                    appReason: appReason,
                    takingMeds: newtakingMeds,
                    ndMeds: ndMeds
                };

                const jsonData = JSON.stringify(requestData);
                fetch(`http://localhost:5000/appointment/reqApp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There is already a request in this appointmen.')
                });
    
            } else {
                throw new Error('No email found in the database');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
    
    
}); 


const optionCard2 = document.querySelector(".option-card2");
const popupForm = document.querySelector(".view-status");
const popupBackground = document.querySelector(".popup-background");
const closeBtn1 = document.querySelector(".close-btn1");

if (optionCard2) {
    optionCard2.addEventListener("click", function () {
        console.log('misskonakhayzel\n -vargas');

        const selectedschedID = localStorage.getItem('selectedschedID');
    alert('Schedule ID: ' + selectedschedID);

    if (!selectedschedID) {
        console.error('No schedule ID found in local storage');
        return;
    }

    fetch(`http://localhost:5000/appointment/viewsomething/${selectedschedID}`)
        .then(response => {
            if (!response.ok) {
                console.log('appfetch');
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(appoint => {
            if (appoint.length > 0) {
                const appointment = appoint[0];
                console.log(appointment);

                fetch(`http://localhost:5000/dentistschedule/viewsched/${selectedschedID}`)
                    .then(response => {
                        if (!response.ok) {
                            console.log('schedfetch');
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(schedArray => {
                        if (schedArray.length > 0) {
                            const sched = schedArray[0];

                            alert(JSON.stringify(sched));
                            console.log(sched);

                            const appdate = document.getElementById('scheduleDate');
                            const time = document.getElementById('scheduleTime');
                            const status = document.getElementById('status');

                            if (!appdate || !time || !status) {
                                console.error('Required HTML elements not found');
                                return;
                            }

                            appdate.textContent = `Date of Appointment: ${moment(sched.scheduleDate).format('YYYY D MM')}`;
                            time.textContent = `Time: ${sched.startTime} - ${sched.endTime}`;
                            status.textContent = `Status: ${appointment.status || 'N/A'}`;
                        } else {
                            console.error('Schedule data is empty');
                        }
                    })
                    .catch(error => console.error('Error fetching dentist data:', error));
            } else {
                console.error('Appointment data is empty');
            }
        })
        .catch(error => console.error('Error fetching appointments:', error));
            

        popupForm.style.display = "flex";
        popupBackground.style.display = "flex";
    });
}

if (closeBtn1) {
    closeBtn1.addEventListener("click", function () {
        popupForm.style.display = "none";
        popupBackground.style.display = "none";
    });
}
