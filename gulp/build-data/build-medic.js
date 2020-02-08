const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
    const medic = require('@data/structure/medic.json');
    let result = [];
    
    _.forEach(medic, function(e){
      
      let point = e.map.split(',');
      
      let station = {
        id : e.id,
        name : e.name,
        point : [+point[1],+point[0]],
        address : e.address,
        city : e.rayon_name
      };
      
      result.push(station);
      
    });
    
    console.log(`World data: ${result.length} medic station loaded`);

    writeWorldData(result, 'medic');
    
    return result;
  
}

module.exports = build;