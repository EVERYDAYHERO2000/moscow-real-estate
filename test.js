const fs = require('fs');
const path = require('path');

let roads = require('./source/roads_.json'); 
let result = {};


for (var i=0; i < roads.length; i++){
  
  if (roads[i].properties.NAME) {
    
    let name = roads[i].properties.NAME
    .replace('(старое)','')
    .replace('Старое','')
    .replace('(дублёр)','')
    //.replace('Объездное','')
    .replace('Можайское шоссе, Бородинская улица','Можайское шоссе')
    .replace('Объездное Волоколамское шоссе','Волоколамское шоссе')
    .trim();
    
    
    if (name == 'Ленинградское шоссе' || 
        name == 'Дмитровское шоссе' ||
        name == 'Алтуфьевское шоссе' ||
        name == 'Ярославское шоссе' ||
        name == 'Щёлковское шоссе' ||
        name == 'шоссе Энтузиастов' ||
        name == 'Новорязанское шоссе' ||
        name == 'Каширское шоссе' ||
        name == 'Варшавское шоссе' ||
        name == 'Калужское шоссе' ||
        name == 'Киевское шоссе' ||
        name == 'Минское шоссе' ||
        name == 'Рублёвское шоссе' ||
        name == 'Волоколамское шоссе' ||
        name == 'Пятницкое шоссе' ||
        name == 'Можайское шоссе' ){
    
    if (!result[name]) result[name] = [];
  
      if (typeof roads[i].geometry.coordinates[0][0] == 'object') {
      
        for (var a = 0; a < roads[i].geometry.coordinates.length; a++){

          result[name].push(

            roads[i].geometry.coordinates[a]

          );

        }
      
      } else {
        
        result[name].push(

            roads[i].geometry.coordinates

          );
        
      }
      
    }
  
  }
}

for (var k in result) {
//console.log(k);
}

//console.log(result['Калужское шоссе']);







fs.writeFile('./source/data/roads.json', JSON.stringify(result), function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
});

