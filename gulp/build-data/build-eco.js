const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-data.js');

const build = function(){
  
      let result = _.clone(require('@data/eco/eco.json'));
      let airport = require('@data/eco/airport.json');
        
      
      _.forEach(airport, function(e){
        
        e.type = 10;
        e.id = result.length + 1;
        result.push(e);
        
      });
      
      _.forEach(result, function(e){
        
        delete e.geom;
        delete e.props;
        
      });
    
      console.log(`World data: ${result.length} eco point loaded`);

      writeWorldData(result, 'eco');
      
      return result;  
  
}

module.exports = build;