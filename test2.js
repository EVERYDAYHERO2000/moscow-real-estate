const fs = require('fs');
const path = require('path');

let roads = require('./source/data/roads.json').features; 
let result = {};


for (var i=0; i < roads.length; i++){
  
  //if (roads[i].properties.role) {

    let name = '';
  
    if (roads[i].properties.role == 'primary') {
  
      name = roads[i].properties.name;
      
    } else {
      
      name = 'noname_' + i
      
    }
  
    result[name] = {
      
      id : i,
      name : name,
      role : roads[i].properties.role || '', 
      points : roads[i].geometry.coordinates
      
    }
    
  
  //}
}

for (var k in result) {
//console.log(k);
}

//console.log(result['Калужское шоссе']);







fs.writeFile('./source/data/roads_.json', JSON.stringify(result), function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
});

