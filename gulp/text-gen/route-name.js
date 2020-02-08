const routeName = function(primary){
    
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
    
  }

module.exports = routeName;