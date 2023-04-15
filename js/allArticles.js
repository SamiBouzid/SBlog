$(document).ready(function() {
    // Define the date format
    $.fn.dataTable.moment('DD/MM/YYYY');
    // Initialize DataTable
    var table = $('#myTable').DataTable({
        pageLength: 5, // Show 5 rows per page
        lengthChange: false,
        ordering: true,
        order: [[0, 'desc']], // Sort by date (oldest first, i.e., in ascending order)
        dom: 'lrtip', // Exclude the search input ("f") from the DataTable layout    
        columnDefs: [
            { targets: [1, 2], orderable: false } // Disable ordering for columns 1 (Title) and 2 (Category)
        ],
        initComplete: function() {
            // Add the category filter dropdown
            this.api().columns(2).every(function() {
                var column = this;
                var dropdownMenu = $("#categoryDropdownMenu");
    
                column.data().unique().sort().each(function(d, j) {
                    var checkboxId = 'categoryCheckbox' + j;
                    var checkbox = $('<input type="checkbox" id="' + checkboxId + '" data-category="' + d + '">');
                    var label = $('<label for="' + checkboxId + '">' + d + '</label>');
    
                    checkbox.appendTo(label);
                    label.appendTo(dropdownMenu);
    
                    checkbox.on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex($(this).attr('data-category'));
                        var isChecked = $(this).is(':checked');
                        if (isChecked) {
                            column.search(column.search() + '|' + '^' + val + '$', true, false).draw();
                        } else {
                            column.search(column.search().replace('|^' + val + '$', ''), true, false).draw();
                        }
                    });
                });
            });
        }
    });
// Add event listener to the search button
$('.search-button').on('click', function() {
    searchInDatabase();
});

// Variable to store the current sorting direction
let currentSortOrder = "asc";

// Add event listener for the sort-by-date button
$("#sort-by-date").on("click", function() {
    table.order([0, currentSortOrder]).draw();

    if (currentSortOrder === "desc") {
        currentSortOrder = "asc";
    } else {
        currentSortOrder = "desc";
    }
});

// Add event listener to the "Filter by Category" button
$('#filter-by-category').on('click', function() {
    // Toggle the display of the category dropdown
    $('.custom-dropdown-menu').toggle();
    // Remove any search queries when hiding the dropdown
    if ($('.custom-dropdown-menu').is(':hidden')) {
        table.column(2).search('').draw();
    }
});

$("#toggle-filter-sort").on("click", function() {
    var container = $(".sort-settings-container");
    container.toggle();
  });

// Add event listener for the "Apply" button
$('#apply-category-filter').on('click', function() {
  // Get all the checked categories
  var checkedCategories = [];
  $('.category-checkbox:checked').each(function() {
    checkedCategories.push($(this).attr('data-category'));
  });
  
  // Apply the filters to the table
  var table = $('#myTable').DataTable();
  table.column(2).search(checkedCategories.join('|'), true, false).draw();

  // Hide the category dropdown
  $('.custom-dropdown-menu').hide();
});
  // Add event listener for the logo image
  $(".fil-symb").on("click", function() {
    var container = $(".sort-settings-container");
    container.toggle();
  });
});

function searchInDatabase() {
    // Get the DataTable instance
    var table = $('#myTable').DataTable();
    
    // Get the search query from the input
    const searchQuery = document.querySelector(".search-input").value;

    // Perform the search
    table.search(searchQuery).draw();
}
