const menuButton = document.querySelector('.menu-btn');
const menuBox = document.querySelector('.menu-box')
let menuOpen = false;

menuBox.style.display = 'none'

menuButton.addEventListener('click', () => {
    if(!menuOpen) {
        menuButton.classList.add('open');
        menuBox.style.display = 'block';
        menuOpen = true;
    } else {
        menuButton.classList.remove('open');
        menuBox.style.display = 'none';
        menuOpen = false;
    }
});