const fs = require('fs');
const path = require('path');
const json = require('big-json');
 
const readStream = fs.createReadStream('./source/data/geojson/roads.json');
const parseStream = json.createParseStream();
 
let temp = [];

parseStream.on('data', function(pojo) {
  
    for (var i = 0; i < pojo.features.length; i++){
      
      
      if (pojo.features[i].properties.HIGHWAY == 'motorway' || 
          pojo.features[i].properties.HIGHWAY == 'trunk' || 
          pojo.features[i].properties.HIGHWAY == 'primary') {
        
        temp.push(pojo.features[i]);
        
      }
          
    }
  
  
    fs.writeFile('./source/data/roads_2.json', JSON.stringify(temp), function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
    });
  
});
 
readStream.pipe(parseStream);

