const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');
const header = require(DEV_PATH + '/gulp/header.js');
const titleGenerator = require(DEV_PATH + '/gulp/title-generator.js');
const descriptionGenerator = require(DEV_PATH + '/gulp/description-generator.js');

global.component = global.component || component;

let createPage = function(params){
  
  let place = params.place,
      places = (global._places) ? global._places : '';
  
  if (!global._places) {
  
    _.forEach(DATA,function(e,i){

      if (i+1 > 100) return false;

      places += component('place-item', e);

    });
    
    global._places = places;

  }
      
      
  let page = 
`
<!DOCTYPE html>
<html lang="ru">
  ${header({
    url : params.url,
    title : params.title,
    description : params.description,
    amp: true
  })}
  <body>
    <div id="app" >
      <header id="header">
        <div class="header-desktop">
          ${component('logo',{})}
        </div>
        <div class="header-mobile">
          <button id="change-view" class="btn">На карте</button>
        </div>
      </header>
      <div id="main">
        <aside class="panel">
          <div class="panel__header">
            <div id="place-search" class="place-search"><input placeholder="Название посёлка" type="search" /><button>Найти</button></div>
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

        ${ params.content }
        
      </div>
    <div>
  </body>
</html>`;
  
page = page.replace(/\s+/g, ' ')
       .replace(/\s\,\s/g, ', ')
		   .trim();  
  
return page;  
  
}
  
module.exports = createPage;  
  