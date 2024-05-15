function fetchAppointments() {
    fetch('http://localhost:5000/dentistschedule/showApp')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(appoint => {
            const dentistID = appoint[0].dentistID;
            fetch(`http://localhost:5000/dentist/viewdentist`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(dentist => {
                    const gridContainer = document.querySelector('.appointment-tabs');
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

                        const mainContainer = document.querySelector('.appointment-tabs');

                        const appContainer2 = document.createElement('div');
                        appContainer2.classList.add('appointment-row');

                        const appContainer = document.createElement('div');
                        appContainer.classList.add('appointment-tab');

                        const author = document.createElement('h2');
                        author.classList.add('dentist');
                        author.innerHTML = `<strong>Dentist:</strong> ${name.dentistFirstName} ${name.dentistLastName}`;

                        const schedule = document.createElement('a');
                        schedule.classList.add('schedule');
                        schedule.innerHTML = `<strong>Schedule:</strong> ${moment(densched.scheduleDate).format('MM D YYYY')}, ${densched.scheduleDay} | ${densched.startTime} - ${densched.endTime}`;

                        const button = document.createElement('button');
                        button.classList.add('sched-app');
                        button.innerHTML = `<strong>Schedule Appointment</strong>`;

                        // Add click event listener to each appointment container
                        button.addEventListener('click', () => {
                            localStorage.setItem('selectedschedID', densched.scheduleID);
                            localStorage.setItem('selectedID', name.dentistID);
                            window.location.href = 'inside-appointment.html';
                        });

                        appContainer.appendChild(author);
                        appContainer.appendChild(schedule);
                        appContainer.appendChild(button);

                        appContainer2.appendChild(appContainer);

                        mainContainer.appendChild(appContainer2);
                    });
                })
                .catch(error => console.error('Error fetching appointments:', error));
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

fetchAppointments();
