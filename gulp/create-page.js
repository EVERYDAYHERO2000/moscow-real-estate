const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');

let createPage = function(){
  
  
  var page = '';
  
  _.forEach(DATA,function(e){
      
    var eco = (e.eco.distance < 10) ? `<div>${e.eco.closest.name} в ${e.eco.distance}км</div>` : '';
    
    //var alert = (Math.abs( e.moscow.distance - e.car.distance ) > 30) ? `style="background:red"` : '';
    
    //if (alert) {
    page += 
`<div class="place-${e.id}">
  <div>${e.type} ${e.name}</div>
  <div style="color:red">${(e.price.from)?e.price.from:''} ${(e.price.to)?e.price.to:''}</div>
  <div>Расстояние до Москвы: ${e.moscow.distance}км</div>
  <div>На машине: ${e.car.time.h}ч ${e.car.time.m}мин (${e.car.distance}км)</div>
  <div>Ж/д станция ${e.railroad.closest.name} в ${e.railroad.distance}км, до москвы: ${e.railroad.closest.time.h}ч ${e.railroad.closest.time.m}мин (${e.railroad.closest.distance}км)</div>
  <div>Ближайший город: ${e.city.closest.name} в ${e.city.distance}км</div>
  ${eco}
  <hr>
</div>`;
    //}
    
  });
  
  console.log(DATA.length)
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {
    if (err) {
      console.log('createPage -->', err); 
    } else {
      console.log('createPage --> update');
    }
  });
  
}

module.exports = createPage;