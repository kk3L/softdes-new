//inprogress

//showing appointments
function fetchStudies() {
    fetch('http://localhost:5000/appointments/apptab')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(studies => {
            // Check if the grid container exists
            const gridContainer = document.querySelector('.grid-container');
            if (!gridContainer) {
                console.error('Grid container not found');
                return;
            }
            // Loop through the studies and create study containers
            studies.forEach(study => {
                const studyContainer = document.createElement('div');
                studyContainer.classList.add('study-container');

                const studyIcon = document.createElement('i');
                studyIcon.classList.add('ri-folder-5-fill', 'study-icon');

                const studyContent = document.createElement('div');
                studyContent.classList.add('study-content');

                const title = document.createElement('h2');
                title.textContent = study.PD_Title;

                const author = document.createElement('p');
                author.classList.add('study-author');
                author.innerHTML = `<strong>Author:</strong> ${study.PD_Author} - ${study.Date_Published}`;

                const abstract = document.createElement('p');
                abstract.classList.add('study-abstract');
                abstract.innerHTML = `<strong>Abstract:</strong> ${study.PD_Abstract}`;

                const pdId = document.createElement('p');
                pdId.classList.add('study-pi-id');
                pdId.innerHTML = `<strong>PI ID:</strong> ${study.PD_ID}`;

                // Add click event listener to each study container
                studyContainer.addEventListener('click', () => {
                    // Store the PD_ID in local storage
                    localStorage.setItem('selectedStudyPDID', study.PD_ID);
                    // Redirect to inside.html
                    window.location.href = 'inside.html';
                });

                studyContent.appendChild(title);
                studyContent.appendChild(author);
                studyContent.appendChild(abstract);
                //studyContent.appendChild(pdId);

                studyContainer.appendChild(studyIcon);
                studyContainer.appendChild(studyContent);

                gridContainer.appendChild(studyContainer);
            });
        })
        .catch(error => console.error('Error fetching studies:', error));
}

window.onload = fetchStudies;