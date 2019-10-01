const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');


let buildData = function(){
  
  let dataPath = DEV_PATH + '/source/data/';
  let tempData = {
    places : require(dataPath + 'places/places.json'),
    railroad : (function(){
      const stations = require(dataPath + 'railroad/points.json');
      const routes = require(dataPath + 'railroad/route.json');
      const settings = require(dataPath + 'railroad/settings.json');
      
      var result = _.clone(stations);
      
      return result;
    })(),
    geo : require(dataPath + 'geo/cities.json'),
    eco : {
      airports : require(dataPath + 'eco/airport.json'),
      eco : require(dataPath + 'eco/eco.json'),
      tbo : require(dataPath + 'eco/tbo.json')
    },
    structure : {
      medic : require(dataPath + 'structure/medic.json'),
      shcool : require(dataPath + 'structure/shcool.json')
    }
  }
  
  _.forEach(tempData.places, function(e){
    
    //train station
    (function(){
      
      var __distance = 10000000;
      var railroadStation = {};

      _.forEach(tempData.railroad, function(r){
        let currentDist = calcDistance(e.point[1], e.point[0], r.point[1], r.point[0], 'K');

        if (currentDist <= __distance) {
          __distance = currentDist;
          railroadStation = r;
        }

      });

      e.railroad = {}; 
      e.railroad.closest = railroadStation;  
      e.railroad.distance = +__distance.toFixed(2); 
      
    })();
    
    //cities
    (function(){
      
      var __distance = 10000000;
      var city = {};
      
      _.forEach(tempData.geo, function(c){
        let currentDist = calcDistance(e.point[1], e.point[0], c.point[1], c.point[0], 'K');
        
        if (currentDist <= __distance) {
          __distance = currentDist;
          city = c;
        }
        
      });
      
      e.city = {};
      e.city.closest = city;
      e.city.distance = +__distance.toFixed(2); 
      
    })();
    
    //car distance/time
    if (!e.car.distance) (function(){
      
      var __distance = 10000000;
      var similar = {};
      
      _.forEach(tempData.places, function(s){
        let currentDist = calcDistance(e.point[1], e.point[0], s.point[1], s.point[0], 'K');
        
        if (currentDist <= __distance && s.car.distance) {
          __distance = currentDist;
          similar = s.car;
        }
        
      });
      
      e.car = similar;
      
    })();
    
    //distance to moscow
    (function(){
      
      let currentDist = calcDistance(e.point[1], e.point[0], 55.751244, 37.618423, 'K');
      
      e.moscow = {};
      e.moscow.distance = +currentDist.toFixed(2);
      
    })();
    
    //dictance to medic
    (function(){
      
      var __distance = 10000000;
      var medic = {};
      
      _.forEach(tempData.structure.medic, function(m){
        
        if (m.map) m.point = (function(){
          var temp = m.map.split(',');
          temp[0] = +temp[0];
          temp[1] = +temp[1];
          _.reverse(temp);
          delete m.map;
          return temp;
        })();
        
        let currentDist = calcDistance(e.point[1], e.point[0], m.point[1], m.point[0], 'K');
        
        if (currentDist <= __distance) {
          __distance = currentDist;
          medic = m;
        }
        
      });
      
      e.medic = {};
      e.medic.closest = medic;
      e.medic.distance = +__distance.toFixed(2);
      
    })();
    
    //eco
    (function(){
      
      var __distance = 10000000;
      var eco = {};
      
      _.forEach(tempData.eco.eco, function(t){
      
        _.reverse(t.point);
        
        let currentDist = calcDistance(e.point[1], e.point[0], t.point[0], t.point[1], 'K');  
        
        if (currentDist <= __distance) {
          __distance = currentDist;
          eco = t;
        }
        
      });
      
      e.eco = {};
      e.eco.closest = eco;
      e.eco.distance = +__distance.toFixed(2);
      
    })();
    
  });
  
  tempData.places = _.sortBy(tempData.places, [function(o) { return o.moscow.distance; }, function(o) { return o.price.from; }]);
  
  global.DATA = tempData.places;
  
  fs.writeFile(DEV_PATH + '/bin/data/places.json', JSON.stringify(tempData.places), function(err) {
    if (err) {
      console.log('buildData -->', err); 
    } 
  });
  
  
}

module.exports = buildData;