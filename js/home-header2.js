//CODE JAVA POUR la transition couleur
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const logo1 = document.getElementById('logo1');
    const logo2 = document.getElementById('logo2');
    const headerLinks = document.querySelectorAll('.header a, .header span, .search a,  .about');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.style.backgroundColor = 'black';
            headerLinks.forEach(link => {
                link.style.color = 'white';
            });
            logo1.style.opacity = 0;
            logo2.style.opacity = 1;

            // Change the highlight colors when scrolled down
            document.documentElement.style.setProperty('--text-color', 'white');
            document.documentElement.style.setProperty('--submenu-bg-color', 'black');

        } else {
            header.style.backgroundColor = '';
            headerLinks.forEach(link => {
                link.style.color = '';
            });
            logo1.style.opacity = 1;
            logo2.style.opacity = 0;

            // Revert the highlight colors to the initial state
            document.documentElement.style.setProperty('--text-color', '#ffc98a');
            document.documentElement.style.setProperty('--submenu-bg-color', '#005454');
        }
    });
});
