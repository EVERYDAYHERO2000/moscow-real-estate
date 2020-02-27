const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const min = require('@root/gulp/fs/math/get-min.js');

const match = function(place, data){
    let result = [];
    let point = place.point;
      
      _.forEach(data, function(d){
        
        let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');
        let r = 10;        
        
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

module.exports = match;