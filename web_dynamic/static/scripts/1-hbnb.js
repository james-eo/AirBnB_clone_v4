$(document).ready(function() {
  const selectedAmenities = [];
  $("input[type='checkbox']").change(function() {
    const amenityId = $(this).val();
    if ($(this).is(":checked")) {
      selectedAmenities.push(amenityId);
    } else {
      selectedAmenities = selectedAmenities.filter(function(id) {
        return id !== amenityId;
      });
    }
    const amenityList = selectedAmenities.join(", ");
    $(".amenities h4").text("Selected Amenities: " + amenityList);
  });
});

