const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');

const match = function(place, data){
    let result = [];
    let point = place.point;
    let r = 3;
    
    _.forEach(data, function(d){
      
      let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
      
      if (currentDist <= r && result.length < 5 && place.id !== d.id) {
        
        result.push({
          
            name : d.name,
            type : d.type,
            id : d.id
          
        });
        
      }
      
    });
    
    return result;
}

module.exports = match;