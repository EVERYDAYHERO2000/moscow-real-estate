const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');

const match = function(place, data){
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

module.exports = match;