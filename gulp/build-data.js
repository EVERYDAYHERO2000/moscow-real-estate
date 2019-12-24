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
    },
    water: buildWater()

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
    };
    place.water = getWater(place, worldData.water); 
    
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
  writeWorldData(worldData.roads.primary, 'roads');
  writeWorldData(worldData.water, 'water');        
          
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
      mcad : worldData.roads.mcad,
      primary : worldData.roads.primary
    },
    water: worldData.water
  }, writeFile);

  
  
  function buildWater() {
    const water_1 = require(dataPath + 'eco/water.json');
    const water_2 = require(dataPath + 'eco/water_3.json');
    
    var result = [];
    _.forEach(water_1, function(e,i){
      
      let min = +min(e.val).toFixed(2);
      let max = +max(e.val).toFixed(2);
      
      if (min != 0 && max != 0) result.push({
        median : median(e.val),
        min : min,
        max : max,
        average : +average(e.val).toFixed(2),
        point : [e.lon, e.lat],
        name : e.name,
        id : result.length + i
      })
      
    });

    _.forEach(water_2, function(e,i){
      
      let min = +min(e.value).toFixed(2);
      let max = +e.value[0];
      
      if (min != 0 && max != 0) result.push({
        median : +e.value[0],
        min : min,
        max : max,
        average : +e.value[0],
        point : [e.point[1],e.point[0]],
        name : e.name,
        id : result.length + i
      })
      
    });
    
    console.log(`World data: ${result.length} water point loaded`)
    
    return result;
    
  }
  

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
    
    console.log(`World data: ${result.length} medic station loaded`);
    
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
    
    console.log(`World data: ${result.length} roads (MCAD) loaded`);
    
    return result;
    
  }
  
  function buildPrimary(){
    
    let roads = require(dataPath + `roads/roads.json`);
    
    console.log(`World data: roads (primary) loaded`);
    
    return roads;
    
  }
  
  function getPrimary(place, data) {
    
    let result = {},
        point = place.point,
        __distance = 10000000,
        similar = {};
    
    _.forEach(data, function (road) {

        if (road.role == 'primary'){
      
        _.forEach(road.points, function (p) {

          let currentDist = calcDistance(point[1], point[0], p[1], p[0], 'K');

          if (currentDist <= __distance) {
            __distance = currentDist;
            similar = road;
          }

        })

      }
        
    });
    
    return {
      closestId : +similar.id,
      distance : +__distance.toFixed(2),
      closest : similar  
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

  function getWater(place, data){
    let result = [];
    let point = place.point;
    let __distance = 10000000,
          similar = {};
    
    _.forEach(data, function(d){
      
      let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
      let r = 1.5;
      
      if (currentDist <= r) {
        
        result.push({
          
          closest : d,
          distance : +currentDist.toFixed(1)
          
        });
        
      }
      
    });
    
    
    return {
      value : (function(result){
        
        let temp = [];
        
        _.forEach(result, function(d){
          
          temp.push(d.closest.average);
            
        });
   
        return (temp.length) ? +average(temp).toFixed(2) : -1;
        
      })(result),
      closests : result
      
    };
    
  }
  
  function getEco(place, data){
    let result = [];
    let point = place.point;
    let __distance = 10000000,
          similar = {};
      
      _.forEach(data, function(d){
        
        let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
        let r = 10;
        
        switch (d.type) {
      
          case 1: //radiation
            r = 2;
            break;   

          case 2: //radiation
            r = 2;
            break;

          case 3: //power
            r = 3;
            break;

          case 4: //power
            r = 3;
            break;

          case 5: // water
            r = 6;
            break;  

          case 6: // recicle
            r = 8;
            break;

          case 7: // trash
            r = 8;
            break;  

          case 8: // factory
            r = 6;
            break;  

          case 9: // trash
            r = 8;
            break; 

          case 10: //airport
            r = 10;
            break;  

          case 11: //factory
            r = 6;
            break; 

          case 12: //black messa
            r = 2;
            break;  

          case 13: //army
            r = 2;
            break;     
        }
        
        
        if (currentDist <= r) {
          
          result.push({
            
            closest : d,
            distance : +currentDist.toFixed(1)
            
          });
          
        }
        
      });
      
      return {
        distance : (function(result){
          
          let temp = [];
          
          _.forEach(result, function(d){
            
            temp.push(d.distance);
            
          });
          
          return (temp.length) ? +min(temp).toFixed(2) : -1;
          
        })(result),
        closests : result
      }
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
  
  function min(obj) {
    return Math.min.apply(Math, obj);
  }
  
  function max(obj) {
    return Math.max.apply(Math, obj);
  }

  function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
  }
  
  function mode(arr) {
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    arr.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;

        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
    });
    return +mode;
  }
  
  function median(values){
    if(values.length ===0) return 0;

    values.sort(function(a,b){
      return a-b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
      return values[half];

    return (values[half - 1] + values[half]) / 2.0;
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
    
    let places = _.cloneDeep(placesData);//JSON.parse(JSON.stringify(placesData));
    
    _.forEach(places, function(place){
      
      delete place.eco.closests;
      delete place.water.closests;
      delete place.roads.mcad.closest;
      delete place.roads.primary.closest;
      delete place.railroad.closest;
      delete place.city.closest;
      delete place.markets.closest;
      delete place.medic.closest;
      delete place.description;
      delete place.address;
      
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