const placeType = require('@root/gulp/text-gen/place-type.js');

const descriptionGenerator = function(data){
  
  let description = '';
  
  let _type = placeType(data.type);
  
  let _class = (function(c){
        
    return (c && c != 'элитный') ? c + ' класса' : ''
    
  })(data.class)
  
  let _time = (function(time){
    let t = ''
    
    if (+time.h < 1) {
      t = 'меньше часа';
    }
    if (+time.h < 1 && +time.m < 30) {
      t = 'полчаса'
    }
    
    return t;
    
  })(data.car.time);
  
  let _distance = (!_time) ? `${data.moscow.distance} км от Москвы` : `${data.moscow.distance} км от Москвы (${_time} до центра без учета пробок)`;
  
  let _railroad = (function(railroad){
    
    
    let r = '';
    
    if (railroad.distance <= 3) {
      let d = 'трёх километрах'
      d = (railroad.distance <= 2 ) ? 'двух километрах' : d;
      d = (railroad.distance <= 1 ) ? 'километре' : d;
      
      r = `В ${d} станция электрички ${railroad.closest.name} (${railroad.closest.route}), до москвы ${railroad.closest.count} станций.`
      
    }
    
    return r;
    
  })(data.railroad);
  
  let _eco = (function(eco){
        
    return (eco.distance > 3) ? 'Район подмосковья с хорошей экологиеей.' : ''
    
  })(data.eco);
  
  description = `${_type} «${data.name}» ${_class} в ${_distance}. ${_railroad} ${_eco}` 
  
  

  return description.replace(/\s+/g, ' ').trim();
}

module.exports = descriptionGenerator;