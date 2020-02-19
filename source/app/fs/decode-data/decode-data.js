__.fs.decodeData = function (data) {
  var places = data;
  var eco = {};
  var railroad = {};
  var cost = {};
  var markets = {}; 
  var medic = {};
  var cities = {};
  var roads = {
    mcad : {},
    primary : {}
  };
  var water = {};
  var forest = {};
  
  window.DATA = {
    places : places,
    eco : eco,
    railroad : railroad,
    markets : markets,
    medic : medic,
    cities : cities,
    roads : roads,
    water : water,
    cost : cost,
    forest : forest
  }
  
  $.each(data, function(i, place) {

      place.canvas = {
        visible : true
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
      
      if (!window.DATA.roads.mcad[place.roads.mcad.closestId]) window.DATA.roads.mcad[place.roads.mcad.closestId] = {
        id : place.roads.mcad.closestId
      }
      
      
      place.railroad.closest = window.DATA.railroad[place.railroad.closestId];
      place.markets.closest = window.DATA.markets[place.markets.closestId];
      place.medic.closest = window.DATA.medic[place.medic.closestId];
      place.city.closest = window.DATA.cities[place.city.closestId];
      place.roads.mcad.closest = window.DATA.roads.mcad[place.roads.mcad.closestId];
        
  });
  
  
  
  return window.DATA;


}