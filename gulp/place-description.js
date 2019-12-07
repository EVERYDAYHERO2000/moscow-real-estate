const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');

const placeDescription = function(data){
  
  let description = '';
  
  let _type = (function(type){
    type = (type) ? type.toUpperCase() : '';
    let t = '';
    
    if (type == 'ЖК') {
      
      t = 'жилой комплекс';
      
    } else if (type == 'КП') {
      t = 'коттеджный посёлок';
      
    } else {
      t = 'дачный посёлок'; 
      
    }
    
    return t;
    
  })(data.type);
  
  let _primary = (function(point, primary){
    
    let route_name = primary.closest.name,
        result = '';
    
    if (primary.distance <= 6) {
    
      if (route_name == 'Алтуфьевское шоссе') {
        result = 'по Алтуфьевскому шоссе';

      } else if (route_name == 'Варшавское шоссе') {
        result = 'по Варшавскому шоссе';

      } else if (route_name == 'Волоколамское шоссе') {
        result = 'по Волоколамскому шоссе';

      } else if (route_name == 'Дмитровское шоссе') {
        result = 'по Дмитровскому шоссе';

      } else if (route_name == 'Калужское шоссе') {
        result = 'по Калужскому шоссе';

      } else if (route_name == 'Каширское шоссе') {
        result = 'по Каширскому шоссе';

      } else if (route_name == 'Киевское шоссе') {
        result = 'по Киевскому шоссе';

      } else if (route_name == 'Ленинградское шоссе') {
        result = 'по Ленинградскому шоссе';

      } else if (route_name == 'Минское шоссе') {
        result = 'по Минскому шоссе';

      } else if (route_name == 'Можайское шоссе') {
        result = 'по Можайскому шоссе';

      } else if (route_name == 'Новорязанское шоссе') {
        result = 'по Новорязанскому шоссе';

      } else if (route_name == 'Пятницкое шоссе') {
        result = 'по Пятницкому шоссе';

      } else if (route_name == 'Рублёвское шоссе') {
        result = 'по Рублёвскому шоссе';

      } else if (route_name == 'Щёлковское шоссе') {  
        result = 'по Щёлковскому шоссе';

      } else if (route_name == 'Ярославское шоссе') {  
        result = 'по Ярославскому шоссе';

      } else if (route_name == 'шоссе Энтузиастов') {    
        result = 'по шоссе Энтузиастов';

      } else if (route_name == 'Боровское шоссе') {
        result = 'по Боровскому шоссе';
        
      } else if (route_name == 'ДОН') {
        result = 'по трассе М-4 "ДОН"'
        
      } else if (route_name == 'Егорьевское шоссе') {
        result = 'по Егорьевскому шоссе';
        
      } else if (route_name == 'Каширсоке шоссе') {
        result = 'по Каширсокому шоссе';
        
      } else if (route_name == 'Новорижское шоссе'){
        result = 'по Новорижскому шоссе';
        
      } else if (route_name == 'Носовихинское шоссе'){
        result = 'по Носовихинскому шоссе';
        
      } else if (route_name == 'Осташковское шоссе'){
        result = 'по Осташковскому шоссе';
        
      } else if (route_name == 'Рублёво-Успенское шоссе'){
        result = 'по Рублёво-Успенскому шоссе';
        
      } else if (route_name == 'Рязанское шоссе'){
        result = 'по Рязанскому шоссе';
        
      } else if (route_name == 'Симферопольское шоссе') {
        result = 'по Симферопольскому шоссе';
        
      } else if (route_name == 'Щелковское шоссе') {
        result = 'по Щелковскому шоссе';
        
      } 
      
    
    }
    
    return result;
    
  })(data.point, data.roads.primary)
  
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
  
  let _direction = (function(angle){
    
    d = ''
    

    if ( angle >= 339 && angle <= 360 ){
      d = 'в западном направлении';
    }

    if ( angle >= 0 && angle <= 23 ){
      d = 'в западном направлении'
    }
    

    if ( angle >= 24 && angle <= 68){
      d = 'в юго-западном направлении'
    }
    

    if ( angle >= 69 && angle <= 113 ){
      d = 'в южном направлении'
    }
    

    if ( angle >= 114 && angle <= 158){
      d = 'в юго-восточном направлении'
    }
    

    if ( angle >= 159 && angle <= 203 ){
      d = 'в восточном направлении'
    }
    

    if ( angle >= 204 && angle <= 225 ){
      d = 'в северо-восточном направлении'
    }
    

    if ( angle >= 226 && angle <= 293){
      d = 'в северном направлении'
    }
    

    if ( angle >= 294 && angle <= 338 ){
      d = 'в северо-западном направлении'
    }
    
    return d;
    
  })(data.moscow.angle);
  
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