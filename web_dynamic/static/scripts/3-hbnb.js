$(document).ready(function() {
  const placesSection = $('.places');

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    contentType: 'application/json',
    method: 'POST',
    data: JSON.stringify({}),
    success: function(data) {
      placesSection.empty();

      data.forEach(function(place) {
        const article = createPlaceArticle(place);
        placesSection.append(article);
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

  titleBox.append(priceBox);
  article.append(titleBox);
  article.append(information);
  article.append(description);

  return article;
}
