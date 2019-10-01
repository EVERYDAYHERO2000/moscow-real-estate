const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');

let createPage = function(){
  
  
  var page = '',
      places = '';
  
  _.forEach(DATA,function(e,i){
    
    if (i > 50) return false;
    
    var eco = (e.eco.distance < 10) ? `<div>${e.eco.closest.name} в ${e.eco.distance}км</div>` : '';
    
    var rjd = (e.railroad.distance < 3) ? `<div style="color: green">Ж/д станция ${e.railroad.closest.name} в ${e.railroad.distance}км, до москвы: ${e.railroad.closest.time.h}ч ${e.railroad.closest.time.m}мин (${e.railroad.closest.distance}км)</div>` : ''; 
    
    
    places += 
`<div class="place-${e.id}">
  <div>${e.type} ${e.name}</div>
  <div style="color:red">${(e.price.from)?e.price.from:''} ${(e.price.to)?e.price.to:''}</div>
  <div>Расстояние до Москвы: ${e.moscow.distance}км</div>
  <div>На машине: ${e.car.time.h}ч ${e.car.time.m}мин (${e.car.distance}км)</div>
  ${rjd}
  <div>Ближайший город: ${e.city.closest.name} в ${e.city.distance}км</div>
  ${eco}
  <hr>
</div>`;
    
  });
  
  page = 
`<html>
  <head>
    <link rel="stylesheet" type="text/css" href="bin/app/main.css" />
    <script src="bin/app/libs.js"></script>
    <script src="bin/app/main.js"></script>
  </head>
  <body>
    <div id="app">
      <div id="header"></div>
      <div id="main">
        <div id="places">${places}</div>
        <div id="map"></div>
      </div>
    <div>
  </body>
</html>`;
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {
    if (err) {
      console.log('createPage -->', err); 
    } else {
      console.log('createPage --> update');
    }
  });
  
}

module.exports = createPage;