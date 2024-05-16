async function fetchAppointments() {
    try {
        const appointmentResponse = await fetch('http://localhost:5000/appointment/apptab');
        if (!appointmentResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const appointments = await appointmentResponse.json();

        const patientResponse = await fetch(`http://localhost:5000/patient/view`);
        if (!patientResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const patients = await patientResponse.json();

        const scheduleResponse = await fetch('http://localhost:5000/dentistschedule/showApp');
        if (!scheduleResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const schedules = await scheduleResponse.json();

        const gridContainer = document.querySelector('.appointment-tabs');
        if (!gridContainer) {
            console.error('Grid container not found');
            return;
        }

        // Loop through the appointments and create appointment containers
        appointments.forEach(appstat => {
            const patient = patients.find(record => record.patientID === appstat.patientID);
            if (!patient) {
                console.error(`Patient ID ${appstat.patientID} not found`);
                return; 
            }

            const schedule = schedules.find(sched => sched.scheduleID === appstat.scheduleID);
            if (schedule.schedAvail !== 'available'){
                return;
            }
            if (!schedule) {
                console.error(`Schedule ID ${appstat.scheduleID} not found`);
                return;
            }

            const appContainer2 = document.createElement('div');
            appContainer2.classList.add('appointment-row');

            const appContainer = document.createElement('div');
            appContainer.classList.add('appointment-tab');

            const author = document.createElement('h2');
            author.classList.add('dentist');
            author.innerHTML = `<strong>Patient:</strong> ${patient.patientFirstName} ${patient.patientLastName}`;

            const scheduleElement = document.createElement('a');
            scheduleElement.classList.add('schedule');
            scheduleElement.innerHTML = `<strong>Schedule:</strong> ${moment(schedule.scheduleDate).format('YYYY MM D')}, ${schedule.scheduleDay} | ${schedule.startTime} - ${schedule.endTime}`;

            const button = document.createElement('button');
            button.classList.add('sched-app');
            button.innerHTML = `<strong>Appointment Options</strong>`;

            // Add click event listener to each appointment container
            button.addEventListener('click', () => {
                localStorage.setItem('selectedappID', appstat.appID);
                localStorage.setItem('selectedID', patient.patientID);
                alert(appstat.appID)
                window.location.href = 'inside-reqtab.html';
            });

            appContainer.appendChild(author);
            appContainer.appendChild(scheduleElement);
            appContainer.appendChild(button);

            appContainer2.appendChild(appContainer);

            gridContainer.appendChild(appContainer2);
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

fetchAppointments();
