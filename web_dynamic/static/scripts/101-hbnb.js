$(document).ready(function() {
    const filterButton = $('#filter-btn');
    const showReviewsSpan = $('#show-reviews');
    const reviewsList = $('.reviews-list');

    showReviewsSpan.click(function() {
        reviewsList.toggle();
    });

    filterButton.click(function() {
        const selectedAmenityIds = $('input[name="amenities"]:checked')
            .map(function() { return $(this).val(); })
            .toArray();

        const selectedStateIds = $('input[name="states"]:checked')
            .map(function() { return $(this).val(); })
            .toArray();

        const selectedCityIds = $('input[name="cities"]:checked')
            .map(function() { return $(this).val(); })
            .toArray();

        const data = {
            amenities_ids: selectedAmenityIds,
            states_ids: selectedStateIds,
            cities_ids: selectedCityIds
        };

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            dataType: 'json',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(data),
            success: function(data) {
                $('.places').empty();
                $('.reviews-list').empty();

                data.forEach(function(place) {
                    const article = createPlaceArticle(place);
                    $('.places').append(article);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching places:', textStatus, errorThrown);
            }
        });
    });

    function createPlaceArticle(place) {
        const article = $('<article>');
        const titleBox = $('<div class="title_box">');
        const priceBox = $('<div class="price_by_night">');
        const information = $('<div class="information">');
        const description = $('<div class="description">');
        const amenities = $('<div class="amenities">');

        titleBox.append($(`<h2>${place.name}</h2>`));
        priceBox.text(`${place.price_by_night} $`);
        information.append([
            $('<div class="max_guest">'),
            $('<div class="number_rooms">'),
            $('<div class="number_bathrooms">')
        ].map(function(elem) {
            const value = place[elem.attr('class').split('_')[1]];
            const text = value === 1 ? `${value} Guest` : `${value} Guests`;
            return elem.text(text);
        }));
        description.html(place.description.replace(/\n/g, '<br>'));

        amenities.append('<h2>Amenities</h2><ul>');
        place.amenities.forEach(function(amenity) {
            amenities.append(`<li>${amenity}</li>`);
        });
        amenities.append('</ul>');

        titleBox.append(priceBox);
        article.append(titleBox);
        article.append(information);
        article.append(description);
        article.append(amenities);

        return article;
    }
});
