const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const writeFiles = require(DEV_PATH + '/gulp/write-files.js');

const textGen = require(DEV_PATH + '/gulp/place-description.js');



let buildData = function (places, writeFile) {
  
  let dataPath = DEV_PATH + '/source/data/';
  
  let placesData = (function(places){
    
    let result = (places) ? places : require(dataPath + 'places/places.json'); 
    
    console.log(`World data: ${result.length} places loaded`)

    return result;
    
  })();

  const worldData = {

    railroad: buildRailroad(),
    eco: buildEco(),
    cities: buildCities(),
    markets: buildMarkets(),
    medic: buildMedic(),
    roads: {
      mcad: buildMcad(),
      primary: buildPrimary() 
    }

  }
  
  
  _.forEach(placesData, function(place){
    
    place.eco = getEco(place,worldData.eco);
    place.railroad = getRailroad(place,worldData.railroad);
    place.moscow = getMoscow(place);
    place.city = getCity(place,worldData.cities);
    place.car = getCar(place, placesData);
    place.medic = getMedic(place, worldData.medic)
    place.markets = getMarket(place, worldData.markets);
    place.roads = {
      mcad : getMcad(place, worldData.roads.mcad),
      primary: getPrimary(place, worldData.roads.primary) 
    }
    
    place.description = textGen(place);
    
  });
  

  console.log(`World data: All object is maped`);
  
  placesData = _.sortBy(placesData, [function(o) { return o.moscow.distance; }, function(o) { return o.price.from; }]);
  
  global.DATA = placesData;
  
  fs.mkdir(DEV_PATH + `/bin/data/`, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
  
  writePlacesData();
  writeWorldData(worldData.eco, 'eco');
  writeWorldData(worldData.railroad, 'railroad');
  writeWorldData(worldData.markets, 'markets');
  writeWorldData(worldData.cities, 'cities');
  writeWorldData(worldData.medic, 'medic');
  writeWorldData(worldData.roads.mcad, 'mcad');        
          
        }
  });

  
  writeFiles({
    places : placesData,
    railroad: worldData.railroad,
    eco: worldData.eco,
    cities: worldData.cities,
    markets: worldData.markets,
    medic: worldData.medic,
    roads: {
      mcad : worldData.roads.mcad
    }
  }, writeFile);


  function buildRailroad() {
    const stations = require(dataPath + 'railroad/points.json');
    const routes = require(dataPath + 'railroad/route.json');
    const settings = require(dataPath + 'railroad/settings.json');

    var result = _.clone(stations);

    _.forEach(result, function (e) {

      _.forEach(settings.route, function (e2) {

        if (e.routeId == e2.id) {

          e.route = e2.name;

        }

      });
      
      _.forEach(routes, function(e3){
        
        if (e.pathId == e3.id) {
          
          e.path = e3;
          
        }
        
      });
      
      _.forEach(settings.type, function (e4) {
        
        if (e.typeId == e4.id) {
          
          e.type = e4.name;
          
        }
        
      });
      
      delete e.pathId;
      delete e.typeId;
      delete e.routeId;
      delete e.trains;

    });
    
    console.log(`World data: ${result.length} railroad station loaded`)

    return result;
  }

  function buildEco() {
    let result = _.clone(require(dataPath + 'eco/eco.json')),
        airport = require(dataPath + 'eco/airport.json');
        
      
      _.forEach(airport, function(e){
        
        e.type = 10;
        e.id = result.length + 1;
        result.push(e);
        
      });
      
      _.forEach(result, function(e){
        
        delete e.geom;
        delete e.props;
        
      });
    
      console.log(`World data: ${result.length} eco point loaded`)
      
      return result;  
  }

  function buildCities() {
    let cities = require(dataPath + 'geo/cities.json'),
        result = [];
    
    _.forEach(cities, function(e){
      
      let city = {
        id : e.id,
        point : e.point,
        name : e.name
      }
      
      result.push(city);
      
    });
    
    console.log(`World data: ${result.length} cities loaded`)
    
    return result;
  }

  function buildMarkets() {
    let markets = require(dataPath + 'structure/market.json'),
        result = [];
    
    _.forEach(markets, function(e){
      
      let market = {
        id : e.id,
        name : e.name,
        point : [e.lon,e.lat],
        address : e.address
      };
      
      result.push(market);
    });
    
    console.log(`World data: ${result.length} market loaded`)
    
    return result;
    
  }

  function buildMedic() {
    let medic = require(dataPath + 'structure/medic.json'),
        result = [];
    
    _.forEach(medic, function(e){
      
      let point = e.map.split(',');
      
      let station = {
        id : e.id,
        name : e.name,
        point : [+point[1],+point[0]],
        address : e.address,
        city : e.rayon_name
      };
      
      result.push(station);
      
    });
    
    console.log(`World data: ${result.length} medic station loaded`)
    
    return result;
    
  }
  
  function buildMcad() {
    
    let mcad = require(dataPath + `roads/mcad/roads.json`).features,
        result = [];
    
    _.forEach(mcad, function(e, i){
      
      let road = {
        points : e.geometry.coordinates,
        name : e.properties.name,
        id : i
      }
      
      result.push(road);
      
    });
    
    return result;
    
  }
  
  function buildPrimary(){
    
    let roads = require(dataPath + `roads/roads.json`);
        
    
    return roads;
    
  }
  
  function getPrimary(place, data) {
    
    let result = {},
        point = place.point,
        __distance = 10000000,
        similar = {};
    
    _.forEach(data, function (group, k) {

      _.forEach(group, function (points) {
        
        _.forEach(points, function (p) {

          let currentDist = calcDistance(point[1], point[0], p[1], p[0], 'K');

          if (currentDist <= __distance) {
            __distance = currentDist;
            similar = k;
          }

        })


      });

    });
    
    return {
      distance : +__distance.toFixed(2),
      closest : {
        name : similar
      }    
    }
    
  }
  
  function getMcad(place, data){
    let result = {},
        point = place.point,
        __distance = 10000000,
        similar = {},
        __p = [];
    
    _.forEach(data, function(d){
      
      _.forEach(d.points, function(p){
        
        let currentDist = calcDistance(point[1], point[0], p[1], p[0], 'K');
        
        if (currentDist <= __distance) {
          __distance = currentDist;
          similar = d;
          __p = p;
        }
        
      });
      
    });
    
    return {
      closestId : +similar.id,
      closest : similar,
      distance : +__distance.toFixed(2),
      point : __p
    }
    
  }

  function getMarket(place, data){
    let result = getClosest(place.point, data);
    return result;
  }

  function getMedic(place, data){
    let result = getClosest(place.point, data)
    return result;
  }

  function getEco(place, data){
    let result = getClosest(place.point, data)
    return result;
  }

  function getRailroad(place, data){
    let result = getClosest(place.point, data);
    return result;
  }

  function getMoscow(place){
    
    let moscow = [37.618423, 55.751244],
        currentDist = calcDistance(place.point[1], place.point[0], moscow[1], moscow[0], 'K'),
        result = {
          distance : +currentDist.toFixed(2),
          
          angle : (function(){
            
            let d = [moscow[1] - place.point[1], moscow[0] - place.point[0]];
            let angle = Math.atan2(d[0], d[1]);
            let degrees = 180*angle/Math.PI;
                
            return (360+Math.round(degrees))%360;
            
          })()
        }
    
    return result;
  }

  function getCity(place, data){
    let result = getClosest(place.point, data)
    return result;
  }

  function getCar(place, placesData){
    let result = {};
    if (!place.car.distance) {
      
      let __distance = 10000000,
          similar = {};
      
      _.forEach(placesData, function(s){
        let currentDist = calcDistance(place.point[1], place.point[0], s.point[1], s.point[0], 'K');
        
        if (currentDist <= __distance && s.car.distance) {
          __distance = currentDist;
          similar = s.car;
        }
        
      });
      
      result = similar;
      
    } else {
      result = place.car;
    }
    
    return result;
    
  }

  function getClosest(point, data){
    let __distance = 10000000,
          similar = {};
      
      _.forEach(data, function(d){
        let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
        
        if (currentDist <= __distance) {
          __distance = currentDist;
          similar = d;
        }
        
      });
      
      return {
        closestId : +similar.id,
        closest : similar,
        distance : +__distance.toFixed(2)
      }
  }

  function writePlacesData(){
    
    let places = JSON.parse(JSON.stringify(placesData));
    
    _.forEach(places, function(place){
      
      delete place.eco.closest;
      delete place.roads; //delete place.roads.mcad.closest;
      delete place.railroad.closest;
      delete place.city.closest;
      delete place.markets.closest;
      delete place.medic.closest;
      delete place.description;
      
    });
    
    fs.mkdir(DEV_PATH + `/bin/data/`, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
    
    writeWorldData(places, 'data');
          
        }
      
    });
  
  }

  function writeWorldData(dataset, filename) {
    fs.writeFile(DEV_PATH + `/bin/data/${filename}.json`, JSON.stringify(dataset), function (err) {
      if (err) {
        console.log('buildData -->', err);
      } else {
        console.log(`World data: "/bin/data/${filename}.json" is saved`);
      }
    });
  }

}
module.exports = buildData;