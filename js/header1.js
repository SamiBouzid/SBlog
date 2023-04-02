//CODE JAVA POUR LE MENU DEROULANT --> Effet ON CLICK

document.addEventListener('DOMContentLoaded', function() {
  // Get all the anchor tags with a submenu
  const hasSubmenu = document.querySelectorAll('.has-submenu');

  function closeAllOpenSubmenus(excludeItem) {
    const openSubmenus = document.querySelectorAll('.has-submenu.active');
    openSubmenus.forEach(item => {
      if (item !== excludeItem) {
        item.classList.remove('active');
        item.nextElementSibling.style.display = 'none';
      }
    });
  }

  // Add a click event listener to each of them
  hasSubmenu.forEach(item => {
    item.addEventListener('click', event => {
      // Prevent the default action of the anchor tag
      event.preventDefault();

      // Check if the clicked item is already active
      const isActive = item.classList.contains('active');

      // Close all open submenus
      closeAllOpenSubmenus(item);

      // Toggle the "active" class on the anchor tag
      item.classList.toggle('active');

      // Get the submenu associated with this anchor tag
      const submenu = item.nextElementSibling;

      // Toggle the display of the submenu
      submenu.style.display = isActive ? 'none' : 'block';
    });
  });
  
});