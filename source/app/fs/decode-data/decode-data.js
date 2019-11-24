__.fs.decodeData = function (data) {
  var places = data;
  var eco = {};
  var railroad = {};
  var markets = {}; 
  var medic = {};
  var cities = {};
  
  window.DATA = {
    places : places,
    eco : eco,
    railroad : railroad,
    markets : markets,
    medic : medic,
    cities : cities
  }
  
  $.each(data, function(i, place) {

      place.canvas = {
        visible : true
      }
  
      if (!window.DATA.eco[place.eco.closestId]) window.DATA.eco[place.eco.closestId] = {
        id : place.eco.closestId
      }
      
      if (!window.DATA.railroad[place.railroad.closestId]) window.DATA.railroad[place.railroad.closestId] = {
        id : place.railroad.closestId
      }
      
      if (!window.DATA.markets[place.markets.closestId]) window.DATA.markets[place.markets.closestId] = {
        id : place.markets.closestId
      }  
      
      if (!window.DATA.medic[place.medic.closestId]) window.DATA.medic[place.medic.closestId] = {
        id : place.medic.closestId
      }
      
      if (!window.DATA.cities[place.city.closestId]) window.DATA.cities[place.city.closestId] = {
        id : place.city.closestId
      }
      
      
      
      place.eco.closest = window.DATA.eco[place.eco.closestId];
      place.railroad.closest = window.DATA.railroad[place.railroad.closestId];
      place.markets.closest = window.DATA.markets[place.markets.closestId];
      place.medic.closest = window.DATA.medic[place.medic.closestId];
      place.city.closest = window.DATA.cities[place.city.closestId];
        
  });
  
  
  
  return window.DATA;


}