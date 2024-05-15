document.addEventListener('DOMContentLoaded', function () {
    const updateProfileBtn = document.querySelector('.update-profile-btn');
    const popupProfile = document.querySelector('.popup-update-profile');
    const popupBackground = document.querySelector('.popup-background');
    const closeBtn = document.querySelector('.close-btn');

    popupProfile.style.display = 'none';
    popupBackground.style.display = 'none';

    updateProfileBtn.addEventListener('click', function (event) {
        event.preventDefault(); 
        popupProfile.style.display = 'block';
        popupBackground.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    });

    popupBackground.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);

    function closePopup() {
        popupProfile.style.display = 'none';
        popupBackground.style.display = 'none';
        document.body.style.overflow = ''; 
    }
});



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('upd-btn').addEventListener('click', function(event) {
        event.preventDefault(); 
        const pAddress = document.getElementById('UpdAddress').value;
        const pPhone = document.getElementById('UpdPhone').value;
    
        // Ensure pdRecord and PD_ID are defined
        const selectedEmail = localStorage.getItem('email')

        fetch(`http://localhost:5000/dentist/updateDentist/${selectedEmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "dentistAddress": pAddress,
                "dentistPhone": pPhone,
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
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    
});

