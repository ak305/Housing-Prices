$(document).ready(function() {

    var contentString = "";
    var cmpContentString = "";
    // when user clicks on the toggle heatmap button
    $("#heatmap-toggle").click(function(event){
        changeHeatmap();
    });

    // When the user clicks on the page-content-open button it will toggle the sidebarExpanded class
    $("#page-content-open").click(function(event){
        // Prevents the default action linked to this event
        // e.g. href="#" is not activated on click
        changeHeatmap();
        event.preventDefault();
        // Switches the glyphicon from > to <
        $(this).find('span').toggleClass('glyphicon-menu-right').toggleClass('glyphicon-menu-left');
        $("#wrapper").toggleClass("sidebarExpanded");

        // Gets the id of the html element and clears the text
        if ($("#wrapper").hasClass('sidebarExpanded')) {
            contentString = document.getElementById('summary').innerHTML;
            cmpContentString = document.getElementById('cmp-summary').innerHTML;
            document.getElementById('summary').innerHTML = "";
            document.getElementById('cmp-summary').innerHTML = "";
        } else {

            document.getElementById('summary').innerHTML = contentString;
            document.getElementById('cmp-summary').innerHTML = cmpContentString;


        }

    });

    // When the user clicks on the checkbox the class cmpChecked will toggle on
    $('input:checkbox[name=suburb]').click(function(event){
        $("#wrapper").toggleClass("cmpChecked");

    });

    $("#close-sidebar").click(function(event){
        event.preventDefault();
        $("#wrapper").toggleClass("showSidebar");

    });

});