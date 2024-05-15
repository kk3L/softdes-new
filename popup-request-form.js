document.addEventListener("DOMContentLoaded", function () {
    const optionCard1 = document.querySelector(".option-card1");
    const popupForm = document.querySelector(".popup-request-form");
    const popupBackground = document.querySelector(".popup-background");
    const closeBtn = document.querySelector(".close-btn");

    optionCard1.addEventListener("click", function () {
        popupForm.style.display = "flex"; 
        popupBackground.style.display = "block"; 
    });

    closeBtn.addEventListener("click", function () {
        popupForm.style.display = "none";
        popupBackground.style.display = "none"; 
    });

    document.getElementById('req-btn').addEventListener('click', function(event) {
        event.preventDefault(); 
        const lastApp = document.getElementById('lastApp').value;
        const appReason = document.getElementById('appReason').value;
        const takingMeds = document.getElementById('takingMeds').value;
        const ndMeds = document.getElementById('ndMeds').value;
        const selectedEmail = localStorage.getItem('email');
        const selectedschedID = localStorage.getItem('selectedschedID');
        alert(lastApp);
        alert(appReason);
        alert(takingMeds);
        alert(ndMeds);
        alert(selectedschedID);

        const requestData = {
            patientID: document.getElementById('email').value,
            scheduleID: selectedschedID,
            lastApp: lastApp,
            appReason: appReason,
            takingMeds: takingMeds,
            ndMeds: ndMeds
        };
        const jsonData = JSON.stringify(requestData);
        fetch(`http://localhost:5000/appointment/reqApp/${selectedEmail}`, {
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
        });
    });
});
