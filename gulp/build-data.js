const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const writeFiles = require(DEV_PATH + '/gulp/write-files.js');




let buildData = function(places, writeFile){
  
  let dataPath = DEV_PATH + '/source/data/';
  let tempData = {
    places : (places) ? places : require(dataPath + 'places/places.json'),
    railroad : (function(){
      const stations = require(dataPath + 'railroad/points.json');
      const routes = require(dataPath + 'railroad/route.json');
      const settings = require(dataPath + 'railroad/settings.json');
      
      var result = _.clone(stations);
      
      _.forEach(result, function(e){
        
        _.forEach(settings.route, function(e2){
          
          if (e.routeId == e2.id){
            
            e.route = e2.name;
            
          }
          
        });
        
      });
      
      return {
          stations : _.clone(stations),
          settings : _.clone(settings)
      };
    })(),
    geo : require(dataPath + 'geo/cities.json'),
    eco : (function(){
      
      var eco = _.clone(require(dataPath + 'eco/eco.json'));
      var airport = require(dataPath + 'eco/airport.json');
      
      _.forEach(airport, function(e){
        
        e.type = 10;
        e.id = eco.length + 1;
        eco.push(e);
        
      });
      
      _.forEach(eco, function(e){
        
        delete e.geom;
        delete e.props;
        
      });
      
      return eco;
    
    })(),
    structure : {
      medic : require(dataPath + 'structure/medic.json'),
      shcool : require(dataPath + 'structure/shcool.json')
    }
  }
  
  //temp objects
  var _types = {}, _t = 0,
      _names = {}, _n = 0,
      _class = {}, _c = 0;

  _.forEach(tempData.places, function(e){

    //type id
    (function(){
      
      if ( e.type && !_types[e.type] ){
        _types[e.type] = {type: e.type, id: _t};
        _t++
      }
        
    })();
    
    //name id
    (function(){
      
      if ( e.name && !_names[e.name] ){
        _names[e.name] = {name: e.name, id: _n};
        _n++
      }
        
    })();
    
    //class id
    (function(){
      
      if ( e.class && !_class[e.class] ){
        _class[e.class] = {class: e.class, id: _c};
        _c++
      }
        
    })();

    //train station
    (function(){
      
      var __distance = 10000000;
      var railroadStation = {};

      _.forEach(tempData.railroad.stations, function(r){
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
      
      _.forEach(tempData.eco, function(t){
      
        let currentDist = calcDistance(e.point[1], e.point[0], t.point[1], t.point[0], 'K');  
        
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
    
  
  
  var simpleJSON = {
    p:[], //places
    t:[], //types
    n:[], //names
    k:[], //class
    r:[], //railroad stations
    e:[], //eco
    c:[], //cities
    g:[], //railroad stations route  
    q:[]  //railroad station type 
  };
  
  var objectsJSON = {
    railroad : tempData.railroad.stations,
    eco : tempData.eco
  }
  
  _.forEach(tempData.places,function(e){
    
    
    
    var place = [
      e.point[1],                           //0
      e.car.distance,                       //1
      e.car.time.h,                         //2
      e.car.time.m,                         //3
      e.railroad.distance,                  //4
      e.railroad.closest.id,                //5
      (e.readyDate) ? e.readyDate : -1,     //6 
      e.id,                                 //7    
      e.moscow.distance,                    //8 
      e.eco.distance,                       //9
      e.eco.closest.id,                     //10
      e.city.distance,                      //11
      e.city.closest.id,                    //12 
      (e.price.from) ? e.price.from : -1,   //13
      (e.price.to) ? e.price.to : -1,       //14
      e.point[0],                           //15
      (e.type) ? _types[e.type].id : -1,    //16
      _names[e.name].id,                    //17
      (e.class) ? _class[e.class].id : -1,  //18  
    ]
    
    simpleJSON.p.push(place);
    
  });
  
  _.forEach(_types,function(e){
    simpleJSON.t.push(e.type);  
  });
  
  _.forEach(_names,function(e){
    simpleJSON.n.push(e.name);  
  });
  
  _.forEach(_class,function(e){
    simpleJSON.k.push(e.class);  
  });
  
  _.forEach(tempData.railroad.stations,function(e){
    var railroad = [
      e.id,                                  //0
      e.point[0],                            //1
      e.name,                                //2
      e.point[1],                            //3
      e.distance,                            //4
      e.time.h,                              //5
      e.time.m,                              //6
      (e.routeId) ? e.routeId - 1 : -1,      //7
      (e.typeId) ? e.typeId - 1 : -1,        //8  
      e.count                                //9
    ]
    
    simpleJSON.r.push(railroad);
  });
    
  _.forEach(tempData.railroad.settings.route,function(e){      
    simpleJSON.g.push(e.name);
  });
    
  _.forEach(tempData.railroad.settings.type,function(e){      
    simpleJSON.q.push(e.name);
  });    
  
  _.forEach(tempData.eco,function(e){
    var eco = [
      e.id,
      e.point[0],
      e.name,
      e.point[1],
      e.type
    ]
    
    simpleJSON.e.push(eco);
  });
  
  _.forEach(tempData.geo,function(e){
    var city = [
      e.id,
      e.point[0],
      e.name,
      e.point[1]
    ]
    
    simpleJSON.c.push(city);
  });
  
  

    
    fs.writeFile(DEV_PATH + '/bin/data/data.json', JSON.stringify(simpleJSON), function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
    });
  
    fs.writeFile(DEV_PATH + '/bin/data/objects.json', JSON.stringify(objectsJSON), function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
    });
  
    writeFiles(tempData, writeFile);
    

  
}

module.exports = buildData;