const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const cost = require('@data/cost.json').rows;
  const cost_2 = require('@data/cost_2.json');
  const places = require('@data/places/places.json');
  let result = [],
  count = 1;
    
    _.forEach(cost, function(e){
      
      let c = {
        id : count,
        point : [+e.longitude, +e.latitude],
        cost : +e.PriceSearch
      }
      
      count++;

      result.push(c);
      
    });

    _.forEach(cost_2, function(e){
      
      let c = {
        id : count,
        point : [+e.lon, +e.lat],
        cost : +e.price
      }
      
      count++;

      result.push(c);
      
    });

    _.forEach(places, function(e){


       if (e.price.from){ 

        let c = {
            id : count,
            point : e.point,
            cost : +e.price.from
        }

        count++;

        result.push(c);

       }

    });
    
    console.log(`World data: ${result.length} cost offers point`);

    writeWorldData(result, 'cost');
    
    return result;
  
}

module.exports = build;