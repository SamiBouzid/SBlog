$(document).ready(function() {
    // Define the date format
    $.fn.dataTable.moment('MMM D, YYYY');
    // Initialize DataTable
    var table = $('#myTable').DataTable({
        pageLength: 5, // Show 5 rows per page
        language: {
            info: "_START_ – _END_ of _TOTAL_",
            infoFiltered: "",
            infoEmpty: "",
            zeroRecords: "No results found",
            paginate: {
                first: "&laquo;",
                last: "&raquo;",
                previous: "←",
                next: "→"
            }
        },
        lengthChange: false,
        ordering: true,
        order: [[0, 'desc']], // Sort by date (oldest first, i.e., in ascending order)
        dom: 'lrtip', // Exclude the search input ("f") from the DataTable layout
        columnDefs: [
            { targets: [1, 2], orderable: false }, // Disable ordering for columns 1 (Title) and 2 (Category)
            { targets: [3], visible: false } // Hide the 4th column
        ],
        initComplete: function() {
            // Add the topic filter dropdown
            this.api().columns(2).every(function() {
                var column = this;
                var dropdownMenu = $("#topic-container");
        
                // Calculate topic counts
                var topicCounts = {};
                column.data().each(function(d, j) {
                    if (topicCounts.hasOwnProperty(d)) {
                        topicCounts[d]++;
                    } else {
                        topicCounts[d] = 1;
                    }
                });
        
                // Create topic boxes
                Object.keys(topicCounts).sort().forEach(function(d, j) {
                    var checkboxId = 'topicCheckbox' + j;
                    var checkbox = $('<input type="checkbox" class="topic-checkbox" id="' + checkboxId + '" data-topic="' + d + '">');
                    var countSpan = $('<span class="count-parentheses"> (' + topicCounts[d] + ')</span>');
                    var label = $('<label for="' + checkboxId + '">' + d + '</label>').append(countSpan);
                
                    var topicBox = $('<div class="topic-box"></div>');
                    checkbox.appendTo(topicBox);
                    label.appendTo(topicBox);
                    topicBox.appendTo(dropdownMenu);
                });
                
            });
            
        }
        
    });
    
$('#filter-by-topic').on('click', function() {
    // Toggle the display of the topic dropdown with a smooth rolling effect
    $('#topic-container').stop(true, true).slideToggle(100);
});    

// Add event listener to the "Apply" button
$('#apply-topic-filter').on('click', function() {
    var checkedTopics = [];
    $('.topic-checkbox:checked').each(function() {
        checkedTopics.push($(this).attr('data-topic'));
    });

    // Display selected topics
    var selectedTopicsContainer = $('#selected-topics-container');
    selectedTopicsContainer.empty(); // Clear the container
    checkedTopics.forEach(function(topic) {
        var selectedTopicDiv = $('<div class="selected-topic"></div>');
        var checkbox = $('<input type="checkbox" class="selected-topic-checkbox" checked>');
        var label = $('<label>' + topic + '</label>');

        checkbox.appendTo(selectedTopicDiv);
        label.appendTo(selectedTopicDiv);
        selectedTopicDiv.appendTo(selectedTopicsContainer);
    });

    if (checkedTopics.length > 0) {
        table.column(2).search(checkedTopics.join('|'), true, false).draw();
    } else {
        table.column(2).search('').draw();
    }
});

    // Add event listener to the "Apply" button
    $('#apply-topic-filter').on('click', function() {
        var checkedTopics = [];
        $('.topic-checkbox:checked').each(function() {
            checkedTopics.push($(this).attr('data-topic'));
        });

        if (checkedTopics.length > 0) {
            table.column(2).search(checkedTopics.join('|'), true, false).draw();
        } else {
            table.column(2).search('').draw();
        }
        $('#reset-topic-filter').on('click', function() {
            // Clear all the checkboxes
            $('.topic-checkbox:checked').each(function() {
                $(this).prop('checked', false);
            });
        
            // Reset the DataTable search
            table.column(2).search('').draw();
        
            // Hide the topic dropdown
            $('#topic-container').hide();
        });

        // Hide the topic dropdown
        $('#topic-container').hide();
    });

    $('#filter-by-topic').on('click', function() {
        $(this).toggleClass('active');
        // Your existing code for toggling the topic dropdown
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
        $(this).html("Date: newest &uarr;"); // Update the button text for ascending order
    } else {
        currentSortOrder = "desc";
        $(this).html("Date: oldest &darr;"); // Update the button text for descending order
    }
});

$('#reset-topic-filter').on('click', function() {
    // Clear all the checkboxes
    $('.topic-checkbox:checked').each(function() {
        $(this).prop('checked', false);
    });

    // Reset the DataTable search
    table.column(2).search('').draw();

    // Remove the selected topics
    $('#selected-topics-container').empty();

    // Hide the topic dropdown
    $('#topic-container').hide();
});

$("#toggle-filter-sort").on("click", function() {
    var container = $(".sort-settings-container");
    container.toggle();

    // Toggle the visibility of the Apply and Reset buttons
    $("#apply-topic-filter, #reset-topic-filter").toggle();
});
});

$(".fil-symb").on("click", function() {
    var container = $(".sort-settings-container");
    container.toggle();

    // Toggle the visibility of the Apply and Reset buttons
    $("#apply-topic-filter, #reset-topic-filter").toggle();
});

// TABLE FOOTER STYLING
$('#myTable').on('draw.dt', function() {
    var previousButton = $('.dataTables_paginate .paginate_button.previous');
    var nextButton = $('.dataTables_paginate .paginate_button.next');
    
    if (previousButton.text() !== '← Previous page' && previousButton.hasClass('disabled') === false) {
        previousButton.text('← Previous page');
    }
    else {
        previousButton.text('');
    }
    
    if (nextButton.text() !== 'Next page →' && nextButton.hasClass('disabled') === false) {
        nextButton.text('Next page →');
    }
    else {
        nextButton.text('');
    }
});

// SEE IF RESULTS ARE DISPLAYED OR NOT
$('.search-button').on('click', function() {
    searchInDatabase();
});

function searchInDatabase() {
    // Get the DataTable instance
    var table = $('#myTable').DataTable();
    
    // Get the search query from the input
    const searchQuery = document.querySelector(".search-input").value;

    // Perform the search
    table.search(searchQuery).draw();
}

function searchInDatabase() {
    // Get the DataTable instance
    var table = $('#myTable').DataTable();
    
    // Get the search query from the input
    const searchQuery = document.querySelector(".search-input").value;

    // Perform the search
    table.search(searchQuery).draw();

    // Check if there are any search results
    var numResults = table.rows({search: 'applied'}).data().length;
    if (numResults === 0) {
        // Hide the table and show the "no results" message
        $('#myTable').hide();
        $('#no-results-message').text('No results found for "' + searchQuery + '"');
    } else {
        // Show the table and hide the "no results" message
        $('#myTable').show();
        $('#no-results-message').text('');
    }
}$(document).ready(function() {
    // Your existing code here...

    // Add the function to get the URL parameter value
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get the 'filter' URL parameter
    var filterParam = getUrlParameter('filter');

    // Define the filters based on the parameter value
    var filterMap = {
        '1': 'Macroeconomics Trends',
        '2': 'Market Trends',
        '3': 'Industry Developments',
        '4': 'Political Events',
        '5': 'Theories',
        '6': 'Market Neutral',
        '7': 'Machine Learning',
        '8': 'Technical Analysis',
        '9': 'Momentum',
        '10': 'Pairs Trading',
        '11': 'Volatility',
        '12': 'Stocks',
        '13': 'Cryptocurrencies',
        '14': 'Industries & Sectors',
    };

    // Apply the preset filter if the URL parameter exists
    if (filterParam && filterMap[filterParam]) {
        $('.topic-checkbox[data-topic="' + filterMap[filterParam] + '"]').prop('checked', true);
        $('#apply-topic-filter').trigger('click');
    }
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
      window.location.href = "../viewAllArticles/allArticles.html";
    }, 500);
  });
