var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -33.8060528, lng: 150.9423714}
    });

    // Load GeoJSON.
    map.data.loadGeoJson('https://bitbucket.org/williamg2103/json-test/raw/c7e2a3d0618b83ca1f8a4d7c92ed4176a156fe4f/boundaries_all.json');

    var infowindow = new google.maps.InfoWindow();
    // [START snippet]
    // Color each letter gray. Change the color when the isColorful property
    // is set to true.
    map.data.setStyle(function(feature) {
        var color = 'gray';
        if (!feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }

        return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1
        });
    });

    // Keep track of the previously clicked layer
    var lastClickedLayer;
    // When the user clicks, set 'isColorful', changing the color of the letters.
    map.data.addListener('click', function(event) {
        // Checks if the previous layer has been clicked
        if (lastClickedLayer) {
            // Then reverts the colour back the original state
            lastClickedLayer.feature.setProperty('isColorful', false);
        }

        lastClickedLayer = event;
        event.feature.setProperty('isColorful', true);
        if (!$("#wrapper").hasClass('showSidebar')) {
            $("#wrapper").toggleClass("showSidebar");
        }
        var sidebar = document.getElementById('sidebar-wrapper');

        // Gets the
        var suburbName = event.feature.getProperty('name');
        // Gets the id of the html
        var suburb = document.getElementById('suburb_id');
        //if($('#isChecked').is(':checked') == true) {
        //    $("#wrapper").toggleClass("compareChecked");
        //    suburb = document.getElementById('suburb_id2');
        //}
        var suburbName = capitaliseFirstLetter(suburbName);
        suburb.innerHTML = suburbName;

    });

    // When the user hovers, tempt them to click by outlining the letters.
    // Call revertStyle() to remove all overrides. This will use the style rules
    // defined in the function passed to setStyle()
    map.data.addListener('mouseover', function(event) {
        // newColor = feature.getProperty('color');
        newColor = 'red';
        // newColor = (parseInt(newColor, 16) + 0xFFFF00).toString(16);
        // newColor = newColor + '#111111';
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {fillColor: newColor});
    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
    });

    // Capitalise all letters in a string

    // TODO fix brighton le sands
    function capitaliseFirstLetter(string) {
        return string.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
