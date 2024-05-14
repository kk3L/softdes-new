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
