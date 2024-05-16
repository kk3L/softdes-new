async function fetchAppointments() {
    const selectedappID = localStorage.getItem('selectedappID');
    const selectedID = localStorage.getItem('selectedID');

    try {
        // Fetch appointments
        const appResponse = await fetch(`http://localhost:5000/appointment/viewApp/${selectedappID}`);
        if (!appResponse.ok) {
            throw new Error('Network response was not ok for appointments');
        }
        const appointments = await appResponse.json();
        console.log('Appointments:', appointments);

        // Fetch patient data
        const patientResponse = await fetch(`http://localhost:5000/patient/viewPatient/${selectedID}`);
        if (!patientResponse.ok) {
            throw new Error('Network response was not ok for patient');
        }
        const patientData = await patientResponse.json();
        console.log('Patient Data:', patientData);

        // Fetch schedule data
        const schedResponse = await fetch(`http://localhost:5000/dentistschedule/showApp/`);
        if (!schedResponse.ok) {
            throw new Error('Network response was not ok for schedule');
        }
        const schedules = await schedResponse.json();
        console.log('Schedules:', schedules);

        // Find the grid container
        const gridContainer = document.querySelector('.appointment-container');
        if (!gridContainer) {
            console.error('Grid container not found');
            return;
        }

        // Process each appointment
        appointments.forEach(app => {
            if (app.status !== 'processing') {
                return;
            }

            const patient = patientData.find(record => record.patientID === app.patientID);
            if (!patient) {
                console.error(`No patient found for ID ${app.patientID}`);
                return;
            }

            const schedule = schedules.find(sched => sched.scheduleID === app.appID);
            if (!schedule) {
                console.error(`No schedule found for ID ${app.appID}`);
                return;
            }

            // Get HTML elements
            const patientName = document.getElementById('patientName');
            const datetime = document.getElementById('datetime');
            const lastApp = document.getElementById('lastApp');
            const takingMeds = document.getElementById('takingMeds');
            const ndMeds = document.getElementById('ndMeds');

            if (!patientName || !datetime || !lastApp || !takingMeds || !ndMeds) {
                console.error('Required HTML elements not found');
                return;
            }

            // Update HTML elements
            patientName.textContent = `${patient.patientFirstName} ${patient.patientLastName}`;
            datetime.textContent = `${moment(schedule.scheduleDate).format('MM D YYYY')}, ${schedule.scheduleDay} | ${schedule.startTime} - ${schedule.endTime}`;
            lastApp.textContent = `${moment(app.lastApp).format('MM D YYYY')}`;
            takingMeds.textContent = app.takingMeds;
            ndMeds.textContent = app.ndMeds;
        });
    } catch (error) {
        console.error('Error fetching appointments or patient data:', error);
    }
}

fetchAppointments();
