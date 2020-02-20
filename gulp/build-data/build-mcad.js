const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const mcad = require(`@data/roads/mcad/roads.json`).features;
  let result = [];
    
    _.forEach(mcad, function(e, i){
      
      let road = {
        points : e.geometry.coordinates,
        name : e.properties.name,
        id : i
      }
      
      result.push(road);
      
    });
    
    console.log(`World data: ${result.length} roads (MCAD) loaded`);

    writeWorldData(result, 'mcad', function(){

    });
    
    return result;
  
}

module.exports = build;