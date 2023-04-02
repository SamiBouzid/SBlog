//CODE JAVA POUR LE MENU DEROULANT --> Effet ON CLICK

document.addEventListener('DOMContentLoaded', function() {

const header = document.getElementById('header');
const logo1 = document.getElementById('logo1');
const logo2 = document.getElementById('logo2');
const headerLinks = document.querySelectorAll('.header a, .header span');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.backgroundColor = 'black';
        headerLinks.forEach(link => {
            link.style.color = 'white';
        });
        logo1.style.opacity = 0;
        logo2.style.opacity = 1;
    } else {
        header.style.backgroundColor = '';
        headerLinks.forEach(link => {
            link.style.color = '';
        });
        logo1.style.opacity = 1;
        logo2.style.opacity = 0;
    }
});
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      document.documentElement.style.setProperty('--text-color', 'white');
      document.documentElement.style.setProperty('--submenu-bg-color', 'black');
    } else {
      document.documentElement.style.setProperty('--text-color', '#ffc98a');
      document.documentElement.style.setProperty('--submenu-bg-color', 'transparent');
    };
});

});