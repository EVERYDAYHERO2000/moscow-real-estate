const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const min = require('@root/gulp/fs/math/get-min.js');

const match = function(place, data){
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

module.exports = match;