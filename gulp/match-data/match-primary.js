const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');

const match = function(place, data){
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

module.exports = match;