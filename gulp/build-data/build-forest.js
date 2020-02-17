const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const forest = require('@data/forest.json');
  const forest_2 = require('@data/forest_2.json');

  let result = [],
      count = 1;
    
    _.forEach(forest, function(e){
      
        _.forEach(e.geometry.features, function(e2){

            result.push({
                name : e2.properties.label,
                id : count,
                points : e2.geometry.coordinates,
                type: 1
            });

            count++;

        });

    });

    _.forEach(forest_2, function(e){

        _.forEach(e.geometry.features, function(e2){

            result.push({
                name : e2.properties.label,
                id : count,
                points : e2.geometry.coordinates,
                type: 2
            });

            count++;

        });

    });
    
    
    
    console.log(`World data: ${result.length} forest loaded`);

    writeWorldData(result, 'forest');
    
    return result;
  
}

module.exports = build;