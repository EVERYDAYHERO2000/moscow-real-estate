const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');

const match = function(place, data){
    let result = {};
    if (!place.car.distance) {
      
      let __distance = 10000000,
          similar = {};
      
      _.forEach(data, function(s){
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

module.exports = match;