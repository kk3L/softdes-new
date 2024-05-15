document.addEventListener("DOMContentLoaded", function () {
    const optionCard3 = document.querySelector(".option-card3");
    const popupForm = document.querySelector(".popup-request-form");
    const popupBackground = document.querySelector(".popup-background");
    const closeBtn = document.querySelector(".close-btn");

    optionCard3.addEventListener("click", function () {
        popupForm.style.display = "flex"; 
        popupBackground.style.display = "block"; 
    });
    closeBtn.addEventListener("click", function () {
        popupForm.style.display = "none";
        popupBackground.style.display = "none"; 
    });
    popupBackground.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
    function closePopup() {
        popupProfile.style.display = 'none';
        popupBackground.style.display = 'none';
        document.body.style.overflow = ''; 
    }
});
document.getElementById('remarks-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    const appRemarks = document.getElementById('appRemarks').value;
    const selectedappID = localStorage.getItem('selectedappID');
    alert(appRemarks);

    fetch(`http://localhost:5000/appointment/update/${selectedappID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            appRemarks: appRemarks,
            status: "done",
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle success response if needed
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
    });
});