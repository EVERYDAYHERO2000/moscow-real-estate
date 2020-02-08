const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const cities = require('@data/geo/cities.json');
  let result = [];
    
    _.forEach(cities, function(e){
      
      let city = {
        id : e.id,
        point : e.point,
        name : e.name
      }
      
      result.push(city);
      
    });
    
    console.log(`World data: ${result.length} cities loaded`);

    writeWorldData(result, 'cities');
    
    return result;
  
}

module.exports = build;