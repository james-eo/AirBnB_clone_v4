$(document).ready(function() {
    const selectedStates = {};
    const selectedCities = {};

    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if ($(this).prop('checked')) {
            if ($(this).attr('name') === 'states') {
                selectedStates[id] = name;
            } else if ($(this).attr('name') === 'cities') {
                selectedCities[id] = name;
            }
        } else {
            if ($(this).attr('name') === 'states') {
                delete selectedStates[id];
            } else if ($(this).attr('name') === 'cities') {
                delete selectedCities[id];
            }
        }
        updateLocations();
    });

    function updateLocations() {
        const statesList = Object.values(selectedStates).join(', ');
        const citiesList = Object.values(selectedCities).join(', ');
        $('div.locations h4').html('States: ' + statesList + ' | Cities: ' + citiesList);
    }

    $('button[type="button"]').click(function() {
        const amenities = [];
        $('input[name="amenities"]:checked').each(function() {
            amenities.push($(this).val());
        });
        
        const cities = Object.keys(selectedCities);
        const states = Object.keys(selectedStates);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://0.0.0.0:5001/api/v1/places_search",
            data: JSON.stringify({ amenities: amenities, cities: cities, states: states }),
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});

