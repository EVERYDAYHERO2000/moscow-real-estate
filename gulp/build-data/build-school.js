const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){

      let school = require('@data/school.json'),
        result = [],
        count = 1;
      
      _.forEach(school, function(e){
        
        if (e.geometry.features.length){  

            _.forEach(e.geometry.features, function(el){

                if (el.geometry.type == "Point"){

                    result.push({
                        point : el.geometry.coordinates,
                        id : count++,
                        name : el.properties.label  
                    });

                }

            });    

        }
        
      });
    
      console.log(`World data: ${result.length} school point loaded`);

      writeWorldData(result, 'school', function(){

      });
      
      return result;  

}

module.exports = build;