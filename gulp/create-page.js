const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

let createPage = function(){
  
  
  var page = '';
  
  _.forEach(DATA,function(e){
    
    page += 
`<div>
  <div>${e.type} ${e.name}</div>
  <div>${(e.price.from)?e.price.from:''} ${(e.price.to)?e.price.to:''}</div>
  <div>Расстояние до Москвы: ${e.moscow.distance}км</div>
  <div>На машине: ${e.car.time.h}ч ${e.car.time.m}мин (${e.car.distance}км)</div>
  <div>Ж/д станция ${e.railroad.closest.name} в ${e.railroad.distance}км, до москвы: ${e.railroad.closest.time.hours}ч ${e.railroad.closest.time.min}мин (${e.railroad.closest.distance}км)</div>
  <div>Ближайший город: ${e.city.closest.name} в ${e.city.distance}км</div>
  <div>${e.eco.closest.name} в ${e.eco.distance}км</div>
  <hr>
</div>`
    
  });
  
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {});
}

module.exports = createPage;