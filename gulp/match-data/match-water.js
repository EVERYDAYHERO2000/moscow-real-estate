const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const average = require('@root/gulp/fs/math/average.js');

const match = function(place, data){
    let result = [];
    let point = place.point;
    let r = 1.5;
    
    _.forEach(data, function(d){
      
      let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
      
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

module.exports = match;