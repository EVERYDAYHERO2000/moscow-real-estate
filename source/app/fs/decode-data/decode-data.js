__.fs.decodeData = function (data) {
  var places = data;
  var eco = {};
  var railroad = {};
  var markets = {}; 
  var medic = {};
  var cities = {};
  
  $.each(data, function(i, place) {

      place.canvas = {
        visible : true
      }
  
      eco[place.eco.closestId] = {
        id : place.eco.closestId
      }
      
      railroad[place.railroad.closestId] = {
        id : place.railroad.closestId
      }
    
      markets[place.market.closestId] = {
        id : place.market.closestId
      }  
      
      medic[place.medic.closestId] = {
        id : place.medic.closestId
      }
      
      cities[place.city.closestId] = {
        id : place.city.closestId
      }
      
      place.eco.closest = eco[place.eco.closestId];
      place.railroad.closest = railroad[place.railroad.closestId];
      place.market.closest = markets[place.market.closestId];
      place.medic.closest = medic[place.medic.closestId];
      place.city.closest = cities[place.city.closestId];
        
  });
  
  return {
    places : places,
    eco : eco,
    railroad : railroad,
    markets : markets,
    medic : medic,
    cities : cities
  };


}