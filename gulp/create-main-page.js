const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');
const header = require(DEV_PATH + '/gulp/header.js');



global.component = global.component || component;

let createPage = function(){
  
  var page = '',
      places = (global._places) ? global._places : '';
  
  if (!global._places) {
  
  _.forEach(DATA,function(e,i){
    
    if (i+1 > 100) return false;
    
    places += component('place-item', e);
    
  });
    
    global._places = places;

  }
    
  page = 
`
<!DOCTYPE html>
<html lang="ru">
  ${header({
    url : '',
    title : 'Коттеджние поселки подмосковья',
    description : 'Найти коттеджный посёлок рядом с Москвой. Загородное жильё с хорошей транспортной доступностью, рядом со станцией электрички, в экологически чистом районе'
  })}
  <body>
    <div id="app">
      <header id="header">
        <div class="header-desktop">
          ${component('logo',{title:'<h1 class="header__title">Найти коттеджный посёлок</h1>'})}
        </div>
        <div class="header-mobile">
          <button id="change-view" class="btn">На карте</button>
        </div>
      </header>
      <div id="main">
        <aside class="panel">
          <div class="panel__header">
            <div id="place-search" class="place-search">
              <input id="place-search-input" type="search" data-value="" />
              <label for="place-search-input">Название посёлка</label>
              <button>Найти</button>
            </div>
          </div>
          <div id="places">
            ${places}
          </div>
        </aside>
        <div class="panel panel_2-col">
          <div id="map-controls" class="panel__header panel__header_overlay">
            <div class="layers-controls">
            </div>
          </div>
          <div id="map"></div>
        </div>
      </div>
    <div>
  </body>
</html>`;
  
  page = page.replace(/\s+/g, ' ')
             .replace(/\s\,\s/g, ', ')
		         .trim();
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {
    if (err) {
      console.log('createPage -->', err); 
    } else {
      console.log('createPage --> update');
    }
  });
  
}

module.exports = createPage;