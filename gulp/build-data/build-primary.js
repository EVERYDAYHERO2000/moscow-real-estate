const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const result = require(`@data/roads/roads.json`);
    
    console.log(`World data: roads (primary) loaded`);

    writeWorldData(result, 'roads');
    
    return result;
  
}

module.exports = build;