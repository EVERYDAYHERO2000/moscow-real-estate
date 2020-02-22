const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const component = require('@root/gulp/fs/component.js');
const header = require('@root/gulp/partials/header.js');



global.component = global.component || component;

const createCatalogPage = function(count){
  
  var page = '',
      places = (global._places) ? global._places : '';
  
  
  _.forEach(DATA,function(e,i){
    
    if ( count + i + 1 > count + 100 ) return false;
    
    places += component('place-item', e);
    
  });
    
  global._places = places;

  
    
  page = 
`
<!DOCTYPE html>
<html lang="ru">
  ${header({
    url : '',
    title : 'Коттеджные поселки подмосковья',
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
          <figure id="map"></figure>
        </div>
      </div>
    <div>
  </body>
</html>`;
  
  page = page.replace(/\s+/g, ' ')
             .replace(/\s\,\s/g, ', ')
		         .trim();
  
  return page;
  
}

module.exports = createCatalogPage;