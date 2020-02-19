const fs = require('fs-extra');
const _ = require('lodash');
const component = require('@root/gulp/fs/component.js');
const header = require('@root/gulp/partials/header.js');
const formFilter = require('@root/gulp/partials/form-filter.js');



global.component = global.component || component;

const createPage = function(){
  
  var page = '',
      places = (global._places) ? global._places : '';
  
  if (!global._places) {

    const DATA = global.DATA || require('@root/bin/data/data.json');

  
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
    title : 'Myhousehub cottage villages. Коттеджние поселки подмосковья',
    description : 'Помогаем учесть все самое важное тем, кто выбирает дом. Найти коттеджный посёлок рядом с Москвой. Загородное жильё с хорошей транспортной доступностью, рядом со станцией электрички, в экологически чистом районе.'
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
              <button class="place-search__filter" title="Настроить поиск" ></button>
              <div class="place-search__input">
                <input id="place-search-input" type="search" data-value="" />
                <label for="place-search-input">Название посёлка</label>
                <button class="place-search__search" title="Найти коттеджный посёлок" >Найти</button>
              </div>
            </div>
            
            ${formFilter()}
            
          </div>

          <div id="places">
            ${places}
          </div>
        </aside>
        <div class="panel panel_map panel_2-col">
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
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {
    if (err) {
      console.log('createPage -->', err); 
    } else {
      console.log('createPage --> update');
    }
  });
  
}

module.exports = createPage;