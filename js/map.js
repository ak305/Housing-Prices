var count = 1;
var map;
var setHeatmap1Fn = function(feature){
	return{
        fillColor: feature.getProperty('color1'),
        strokeColor: feature.getProperty('color1'),
        strokeWeight: 1
	};
};
var setHeatmap2Fn = function(feature){
	return{
        fillColor: feature.getProperty('color2'),
        strokeColor: feature.getProperty('color2'),
        strokeWeight: 1
	};
};
var setHeatmap3Fn = function(feature){
	return{
        fillColor: feature.getProperty('color3'),
        strokeColor: feature.getProperty('color3'),
        strokeWeight: 1
	};
};
function changeHeatmap(){
	// map.data.setStyle(setHeatmap2Fn);
	if(count % 3 == 0){
		map.data.setStyle(setHeatmap1Fn);
	}else if(count % 3 == 1){
		map.data.setStyle(setHeatmap2Fn);
	}else{
		map.data.setStyle(setHeatmap3Fn);
	}
	count++;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -33.8060528, lng: 150.9423714}
    });

    // Load GeoJSON.
    map.data.loadGeoJson('https://bitbucket.org/williamg2103/json-test/raw/07a9b086bece031e6471ed1924640ff0af7f51e1/suburb_multicolour_test.json');
    // map.data.loadGeoJson('https://bitbucket.org/williamg2103/json-test/raw/c7e2a3d0618b83ca1f8a4d7c92ed4176a156fe4f/boundaries_all.json');

    // [START snippet]
    // Color each letter gray. Change the color when the isColorful property
    // is set to true.


	
    map.data.setStyle(function(feature) {
		var color = 'gray';
        if (!feature.getProperty('isColorful')) {
            color = feature.getProperty('color1');
        }
		
        return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1
        });
    });

    // Keep track of the previously clicked layer
    var contentString = "";

    var isChecked;
    // When the user clicks, set 'isColorful', changing the color of the letters.
    map.data.addListener('click', function(event) {

        // Gets the id of the html element
        var sidebar = document.getElementById('sidebar-wrapper');

        // Gets the name of the event layer clicked
        var suburbName = event.feature.getProperty('name');
        if (suburbName == "randwick") {
            contentString = '<hr>'+
                'Median House Price: $1,500,00' +
                '<hr>' +
                'Average Income: $80,000' +
                '<hr>' +
                'Average Age: 31' +
                '<hr>' +
                '...';
        } else {
            contentString =  '<hr>'+
                'Median House Price: _____' +
                '<hr>' +
                'Average Income: _____' +
                '<hr>' +
                'Average Age: ______' +
                '<hr>' +
                '...';

        }

        // Gets the id of the html element
        var suburb = document.getElementById('suburb');
        var summary = document.getElementById('summary');



        // Checks if the cmpChecked has been toggled i.e. the checkbox has been ticked
        if($("#wrapper").hasClass('cmpChecked')) {

            isChecked = true;
            // Switches the text to the element by the name of cmp-suburb
            suburb = document.getElementById('cmp-suburb');
            summary = document.getElementById('cmp-summary');
        } else {
            isChecked = false;
            cmpLayer = event;
        }

        // Checks if the previous layer has been clicked
        if ((isChecked && cmpLayer != lastClickedLayer) || (!isChecked && lastClickedLayer))  {
            // Then reverts the colour back the original state

            lastClickedLayer.feature.setProperty('isColorful', false);
        }

        lastClickedLayer = event;
        event.feature.setProperty('isColorful', true);


        // Checks the state of the class showSidebar
        // If the it is not toggled, then it will be toggled as the map layer has been clicked
        if (!$("#wrapper").hasClass('showSidebar')) {
            $("#wrapper").toggleClass("showSidebar");
            $("#wrapper").toggleClass("showClose");
        }





        // Calls the capitalise string function
        var suburbName = capitaliseFirstLetter(suburbName);

        // Applies the changes to the string to the html contained in suburb
        suburb.innerHTML = suburbName;
        summary.innerHTML = contentString;

        // changeHeatmap();
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
        var suburbName = event.feature.getProperty('name');
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbName = capitaliseFirstLetter(suburbName);

        suburbDisplay.innerHTML = suburbName;


    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbDisplay.innerHTML = "";

    });

    // Capitalise all letters in a string

    // TODO fix brighton le sands
    function capitaliseFirstLetter(string) {
        return string.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }


}
