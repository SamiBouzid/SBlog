//CODE JAVA POUR la transition couleur

document.addEventListener('DOMContentLoaded', function() {

const header = document.getElementById('header');
const logo1 = document.getElementById('logo1');
const logo2 = document.getElementById('logo2');
const headerLinks = document.querySelectorAll('.header a, .header span, .search a,  .about');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.style.backgroundColor = 'white';
        headerLinks.forEach(link => {
            link.style.color = 'black';
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
    if (window.scrollY > 60) {
      document.documentElement.style.setProperty('--text-color', 'black');
      document.documentElement.style.setProperty('--submenu-bg-color', 'white');
    } else {
      document.documentElement.style.setProperty('--text-color', '#2d712a');
      document.documentElement.style.setProperty('--submenu-bg-color', '#fee6ff');
    };
});

});

document.addEventListener("DOMContentLoaded", function () {
    // Fade in the current page.
    document.body.classList.add("fade-in");
  });
  
  window.addEventListener("beforeunload", function (event) {
    // Prevent the default behavior.
    event.preventDefault();
  
    // Fade out the current page.
    document.body.classList.remove("fade-in");
  
    // Set a timeout to navigate to the new page after the fade-out effect is done.
    setTimeout(function () {
      // Replace the following line with your navigation logic.
      window.location.href = "../SamiBouzid.html";
    }, 500);
  });