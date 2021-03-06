window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var countryNameList = [];
  var dropdown = document.getElementById('Countrylist');
  var section = document.getElementById('info');
  var center = {lat: -34.397, lng: 150.644};
  var zoom = 8;
  var map = new Map(center, zoom);

  request.open('GET', url);

  var displayDropdown = function(countryNameList) {
    for (var i = 0; i < countryNameList.length; i++) {
      
      var option = document.createElement("option");
      option.innerText = countryNameList[i];

      var select = document.querySelector("select");
      select.appendChild(option);
    };
  }





  request.onload = function() {
    if (request.status === 200) {
      console.log("got the data");
      countriesData = JSON.parse(request.responseText);
      
      
      for (var i = 0; i < countriesData.length; i++) {
        countryNameList.push(countriesData[i].name);
      };
      displayDropdown(countryNameList);
      displayCountry(localStorage.getItem('Last country'));
    }
  }

  dropdown.onchange = function(){
    var countryName = this.value;
    var countryIndex = null;

    for(index in countryNameList){
      var testCountryName = countryNameList[index];
      if(testCountryName === countryName){
        var countryIndex = index;
        console.log(countryIndex);
        displayCountry(countryIndex);
       
      }
    }
  }

  var displayCountry = function(index){
    var name = countriesData[index]['name'];
    var capital = countriesData[index]['capital'];
    var population = countriesData[index]['population'];
    var latlng = countriesData[index]['latlng'];
    var center = {
      lat: latlng[0],
      lng: latlng[1]
      }

    map.googleMap.setCenter(center)

    map.addMarker(center, "X");





    console.log(name, capital, population);
    localStorage.setItem('Last country', index)

    var blockquote = document.createElement('blockquote');
    blockquote.innerText = ("Country: " +name);
    section.appendChild(blockquote);
    var blockquote = document.createElement('blockquote');
    blockquote.innerText = ("Capital: " +capital);
    section.appendChild(blockquote);
    var blockquote = document.createElement('blockquote');
    blockquote.innerText = ("Population: " +Number(population).toLocaleString() );
    section.appendChild(blockquote);

    borderCountries(index);
  }
 

  var borderCountries = function(index){
    var borderCountryArray = countriesData[index]['borders'];
    if(borderCountryArray.length === 0 ){
      return;
    }

    // console.log(borderCountryArray);
    
    // for (var x=0; x<countriesData.length; x++){
    //   for (var i = 0; i < borderCountryArray.length; i++) {

    //     console.log("borderCountryArray[i]=" + borderCountryArray[i]);
    //     console.log("countriesData[x].alpha3code=" + countriesData[x].alpha3code);

    //     if (borderCountryArray[i] === countriesData[x].alpha3code ){
    //       console.log("border country found");
    //       console.log(countriesData[x]);
    //     }
    //   }
    // }

  // return this.value
  //  this.value = threeDigitCode
  // if threeDigitCode === 'countriesData.alpha3code', return this.index  
  // displayCountry(index);
  
  //   for (var i = 0, i < borderCountryArray.length; i++) {
  //       console.log([i]);
  //     }
   };




  request.send(null);

};