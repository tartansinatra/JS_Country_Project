// VALERIE'S MAP FUNCTION
var Map = function(latLng, zoom){
  this.googleMap = new google.maps.Map(document.getElementById('map'),{
    center:  latLng,
    zoom: zoom
  });

  this.addMarker = function(latLng, title, icon){
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      title: title,
      icon: icon
    });
    return marker;
  }


}





