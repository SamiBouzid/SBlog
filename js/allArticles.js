// Your custom JavaScript code for filtering and initializing the DataTable will go here
$(document).ready(function() {
    // Initialize DataTable
    var table = $('#myTable').DataTable({
        pageLength: 10, // Show 10 rows per page
        order: [[0, 'desc']], // Sort by date (most recent first)
        dom: 'lrtip', // Exclude the search input ("f") from the DataTable layout
        initComplete: function() {
            // Add the category filter dropdown
            this.api().columns(2).every(function() {
                var column = this;
                var select = $('<select class="form-control"><option value="">All</option></select>')
                    .appendTo($("#myTable_wrapper .dataTables_length"))
                    .on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });

                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });
        // Add event listener to the search button
        $('.search-button').on('click', function() {
            searchInDatabase();
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
