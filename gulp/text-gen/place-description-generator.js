const calcDistance = require('@root/gulp/fs/calc-distance.js');
const direction = require('@root/gulp/text-gen/direction.js');
const routeName = require('@root/gulp/text-gen/route-name.js');
const placeType = require('@root/gulp/text-gen/place-type.js');

const placeDescription = function(data){
  
  let description = '';
  
  let _type = placeType(data.type);
  
  let _primary = routeName(data.roads.primary);
  
  let _mcad = (function(mcad, point, moscow){

    let dist_mcad = calcDistance(mcad.point[1], mcad.point[0], 55.751244, 37.618423, 'K'),
        dist_place = moscow.distance,
        result = ( dist_mcad <= dist_place ) ? `${mcad.distance.toFixed()} км до МКАД` : 'в пределах МКАД';
      
    return result;
    
  })(data.roads.mcad, data.point, data.moscow);
  
  let _typeAndClass = (function(placeClass, type){
    
    var c = type;
    
    if (placeClass == 'элитный'){
      
      c = placeClass + ' ' + type;
      
    } else if (placeClass == 'бизнес' || placeClass == 'эконом' ) {
      
      c = type + ' ' + placeClass + ' класса'
      
    } else if (!placeClass){
      c = type;
    }
    
    return firstCharToUppercase(c);
    
  })(data.class, _type);
  
  let _name = (function(name){
    
    let n = '«' + name + '»'
     
    return n;
    
  })(data.name);
  
  let _raspolojen = (function(){
    let w = ''
    let r = randomIntFromInterval(1, 2);
    
    
    if (r == 1){
      w = 'расположен';
    } else {
      w = 'находится'
    }
    
    return w;
    
  })();
  
  let _distanceToMoscow = data.moscow.distance.toFixed();
  
  let _direction = direction(data.moscow.angle);
  
  let _nearCity = (function(city){

    let c = '';
    
    if (city.distance < 10) {
      c = `В ${city.distance.toFixed()} км от поселка находится город ${city.closest.name}. `
    }
    
    return c;
    
  })(data.city);
  
  let _eco = (function(eco, type, name){
    let e = '';
    let r = randomIntFromInterval(1, 2);
    
    if (eco.distance > 3) {
      
      if (r == 1){
        
        e = `${type} ${name} расположен в районе с хорошей экологией. `;
        
      }
      
      if (r == 2){
        
        e = `${type} расположен в экологически чистом районе подмосковья. `;
        
      }
      
    }
    
    return firstCharToUppercase(e);
    
  })(data.eco, _type, _name);
  
  let _car = (function(car){
    
    let t = '';
    
    if (car.time.m) {
      
      if (car.time.h >= 1){
        t = `${car.time.h} час ${car.time.m} мин`;
      } else {
        t = `${car.time.m} мин`;
      }
      
      
    } else {
      t = `${car.time.h} час`;
    }
    
    let c = `На машине, без учета пробок, до поселка можно добраться за ${t}. `;
  
    return firstCharToUppercase(c);
  })(data.car);
  
  let _railroad = (function(railroad){
    let r = '';
    let t = '';
    let s = '';
    
    if (railroad.closest.route == 'Ярославское направление') s = 'Ярославский';
    if (railroad.closest.route == 'Казанское направление') s = 'Казанский';
    if (railroad.closest.route == 'Горьковское направление') s = 'Курский';
    if (railroad.closest.route == 'Ленинградское направление') s = 'Ленинградский';
    if (railroad.closest.route == 'Киевское направление') s = 'Киевский';
    if (railroad.closest.route == 'Павелецкое направление') s = 'Павелецкий';
    if (railroad.closest.route == 'Рижское направление') s = 'Рижский';
    if (railroad.closest.route == 'Курское направление') s = 'Курский';
    if (railroad.closest.route == 'Савёловское направление') s = 'Савёловское';
    if (railroad.closest.route == 'Смоленское направление') s = 'Беларусский';
    
    if (railroad.closest.time.m) {
      
      if (railroad.closest.time.m > 0) {
        
        if (railroad.closest.time.h >=1) {
        
          t = `${railroad.closest.time.h} час ${railroad.closest.time.m} мин`
          
        } else {
          
          t = `${railroad.closest.time.m} мин`
          
        }
        
      } else {
        
        t = `${railroad.closest.time.h} час`
        
      }
      
      
    }
    
    if (railroad.distance <= 3){
      r = `В пешой доступности находится ж/д станция пригородной электички ${railroad.closest.name} (${railroad.closest.route}). На электричке до Москвы ${railroad.closest.count} остановок, время в пути ${t}. Поезд прибывает на ${s} вокзал. `
    }
    
    return r;
  })(data.railroad);
  
  let _dostupnost = (function(car, railroad){
    
    let d = '';
    let t_c = 0;
    let t_r = 0;
    
    if (car.time.h == 1 && !car.time.m) t_c = 1;
    if (car.time.h < 1 && car.time.m) t_c = 1;
    if (railroad.distance <= 3) t_r = 1;
    
    if (t_r && t_c){
      
      d = `Благодоря хорошей транспортной доступности поселок подойдет людям планирующим проживать в пригороде и работать в Москве.`
      
    }
      
    return d;  
    
  })(data.car, data.railroad);
  
  function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function firstCharToUppercase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  
  description = `${_typeAndClass} ${_name} ${_raspolojen} в ${_distanceToMoscow} км от центра Москвы (${_mcad}), ${_direction} ${_primary}. ${_nearCity} ${_eco} ${_car} ${_railroad} ${_dostupnost}`
  
  
  description = description.replace(/\s+/g, ' ').replace(/\s+\./g, '.').trim();
  
  return description;
}

module.exports = placeDescription;