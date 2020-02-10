const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const component = require('@root/gulp/fs/component.js');
const header = require('@root/gulp/partials/header.js');



global.component = global.component || component;

const createPage = function(){
  
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
    title : 'Myhousehub cottage villages. Коттеджние поселки подмосковья',
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
              <button class="place-search__filter" title="Настроить поиск" ></button>
              <div class="place-search__input">
                <input id="place-search-input" type="search" data-value="" />
                <label for="place-search-input">Название посёлка</label>
                <button class="place-search__search" title="Найти коттеджный посёлок" >Найти</button>
              </div>
            </div>
            
              <div class="filter-form filter-form_hidden">

                <div class="form-tab form-tab_hidden">
                  <div class="form-tab__header">
                    Тип посёлка
                  </div>
                  <div class="form-tab__body">
                    <label class="label-for-checkbox" for="ch-name_1">
                      <input id="ch-name_1" type="checkbox" />
                      <span>Коттеджный посёлок</span>
                    </label>
                    <label class="label-for-checkbox" for="ch-name_2">
                      <input id="ch-name_2" type="checkbox" />
                      <span>Дачный кооператив</span>
                    </label>
                  </div>
                </div>

                <div class="form-tab form-tab_hidden">
                  <div class="form-tab__header">
                    Цена
                  </div>
                  <div class="form-tab__body">
                    <label class="label-for-range" for="range-name_0">
                      <input id="range-name_0" type="range" min="500000" max="500000000">
                      <span></span>
                    </label>
                  </div>
                </div>

                <div class="form-tab form-tab_hidden">
                  <div class="form-tab__header">
                    Транспорт
                  </div>
                  <div class="form-tab__body">
                    <label class="label-for-range" for="range-name_1">
                      <input id="range-name_1" type="range" min="20" max="120">
                      <span>Время в пути до москвы</span>
                    </label>
                    <label class="label-for-checkbox" for="ch-name_3">
                      <input id="ch-name_3" type="checkbox" />
                      <span>Рядом есть станция электрички</span>
                    </label>
                  </div>
                </div>

                <div class="form-tab form-tab_hidden">
                  <div class="form-tab__header">
                    Направление от Москвы
                  </div>
                  <div class="form-tab__body">
                    <div class="select-direction">
                    <svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><g class="svg-roads" transform="translate(15 29)"><path d="M69 51.4l3.3-1.8 6.1 1.8 5.1 4.6v10l.7 2.6-3.7 3.9-3.3 2H74l-4.1-2-2.5-4.5-2.3-4-.7-5 .7-3 .8-3.2z"/><path d="M69 31.1L64.1 33l-5 1.1-5 5-4 4.9-2.2 4.3-1.2 7-2.2 7.6 2.2 3.7 1.2 1 2.2 3.8-1 5.8 3 4 4.2 2.7 2.7 3.1 7.3 1 4 4H77l9.5-1 4.8-2H94l6-1 4.2-3 2.2-4.6 2.4-4.4-2.4-7 2.4-4.4V50.2l-2.4-6.3-5.8-4-7.4-3.5-2.1-.6-3.4-2.9-8-2.4-4.8-2-1.9-1.2h-2.6z"/><path d="M74.4 57l-2.6 2.5v2.2l1.3 2 2.7.8 3.4-1.4v-2.3l-2.4-3.1z"/><path id="Path-9" d="M71 13.6h4.2l2.2-3.5 10.5-2.7 15 8.7 10.5 8.1 4.4 8.3 2.5 1.7 5.5 8.2 4.7 9 3.2 3.8v5.1l-2 9.7-2.5 4v5l-6.4 12.7-9.4 5-7.9 9.3-6 3-10 3.1h-5.7l-2.8 2-12 1.8-2.5 3.2-8.9-3.2-8.4-3.8-11-7.1-5.7-4-6.4-10.6-3.3-5.4 1.5-9.7-1.5-6.8-5.5-5.2 3.7-8L26 49l2.3-7.8 1.1-5.6 4.5-5 3-9.2 1.1-5.3 9.1-6h7l3.4-2.7 7.4 4.9z"/><path d="M113.9 2.5l-2 3-6.5 2.5-2.3 7.6-6 8.9-5 4.3-1.7 4.6-3.3 4-2 6.5-2.8 4.5-3 3.7"/><path d="M2.5 39.7l5.7 1.2 4.6 1.3 10.8 1.9h5l8 7.7 10.6 4.5h5l3.8 3.8h4.8l3.5-1.8 3.4 1.8h4.5l4.5 1.8-1.6 2.5-2.9 4.6-8 4.3-12 4.5-9.4 8.9-4.8 7.7-1.4 13.4-3 6.8-6.8 7.4-5 5.7-4.1 6.3"/><path d="M27.2 0l2.2 5.8v6.5l5.1 8 7 7 8 4.2h3.9l5.9 6.3v4.4l6 3.1 3.3 5.5L73 57l1.2 2.6"/><path d="M0 83.3l10.4 1 5.3-3 10-4 18.4-3 12.4-2.7 6.1-2.6 3.6-4.5 9.1-2H81l8.7-3.9 12.9-2.8h8.1l2.8-1.5h14l9.6-4.6L151 47"/><path d="M151 134l-12.5-11.3-8-8v-5.3l-9.2-2.9-2-3.5-5.4-3.5-5-8.3-6.4-1.7-3.2-7-7-7.8-6-6.8-4.5-4-2.6-1.9"/><path d="M69.3 134v-4l2.2-3.2 2-10.1 1.2-7.1-2.7-8 1.6-8 2.1-4.9v-9l-1-7.4 1-10.3H80v2.6l-3 1.5v6.2l3 7.4 3.7 5.6-1.2 4.8 2.8 6 2.4 8.2 1.7 5.3v7l4.3 10.2v4.2l3 3"/><path d="M64.4 0l1.9 5.3v3l2.3 4.1v6.8l1.5 8-1.5 4.7 1.5 6v4.3l1 4.3v6l3.2 7"/><path d="M151 96.8l-3.2-2.6h-5l-6.2-6-6.5-7.3-10-2.5-4.8-4.3-8.2-3.5h-7.8L91 67 85 64 80 62H75.5l-4.4 7.2-2.1 1.4 1.2 2.2-1.8 3.8-2.3 1.8-.5 1.8-2 1.6-2.2 4.4-2.2 3.2-4.7 9.6-5 3.4-3 1.2-4 3.7-6.9 5.2-9.3 5.9-10.4 2.3-13.4.9"/></g><path fill="#FF6464" d="M90.5 93.9l-3.8 2 .7-4.3-3.1-3 4.3-.7 1.9-3.8 2 3.8 4.2.7-3.1 3 .7 4.3z"/><g class="svg-labels"><text id="Ю"><tspan x="77" y="163">Ю</tspan></text><text id="С"><tspan x="77" y="10">С</tspan></text><text id="В"><tspan x="158" y="86">В</tspan></text><text id="З"><tspan x="0" y="86">З</tspan></text></g><path class="svg-select" d="M90 90L55.6 6.9a90 90 0 0168.8 0L90 90z" id="top"/><path class="svg-select" d="M90 90l34.4-83.1a90 90 0 0148.7 48.7L90 90z" id="top-right"/><path class="svg-select" d="M90 90l83.1-34.4a90 90 0 010 68.8L90 90z" id="right"/><path class="svg-select" d="M90 90l83.1 34.4a90 90 0 01-48.7 48.7L90 90z" id="bottom-right"/><path class="svg-select" d="M90 90l34.4 83.1a90 90 0 01-68.8 0L90 90z" id="bottom"/><path class="svg-select" d="M90 90l-34.4 83.1a90 90 0 01-48.7-48.7L90 90z" id="bottom-left"/><path class="svg-select" d="M90 90L6.9 124.4a90 90 0 010-68.8L90 90z" id="left"/><path class="svg-select" d="M90 90L6.9 55.6A90 90 0 0155.6 6.9L90 90z" id="top-left"/></svg>
                    <span>Все направления</span>
                    </div>
                  </div>
                </div>

                <div class="form-tab form-tab_hidden">
                  <div class="form-tab__header">
                    Экология
                  </div>
                  <div class="form-tab__body">
                    <label class="label-for-checkbox" for="ch-name_4">
                      <input id="ch-name_4" type="checkbox" />
                      <span>Вдали от источников загрязнения и шума</span>
                    </label>
                  </div>
                </div>

                <div class="btn-group">
                  <button id="btn-reset">Сбросить</button>
                  <button id="btn-find" class="btn">Найти</button>
                </div>

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
  
  fs.writeFile(DEV_PATH + '/index.html', page, function(err) {
    if (err) {
      console.log('createPage -->', err); 
    } else {
      console.log('createPage --> update');
    }
  });
  
}

module.exports = createPage;