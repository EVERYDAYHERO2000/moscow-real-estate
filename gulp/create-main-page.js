const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');
const header = require(DEV_PATH + '/gulp/header.js');

global.component = global.component || component;

let createPage = function(){
  
  var page = '',
      places = '';
  
  _.forEach(DATA,function(e,i){
    
    if (i+1 > 100) return false;
    
    places += component('place-item', e);
    
  });
  
  page = 
`<html>
  ${header({
    url : '',
    title : ''
  })}
  <body>
    <div id="app">
      <div id="header">
        <div class="header-mobile">
          <button id="change-view" class="btn">На карте</button>
        </div>
      </div>
      <div id="main">
        <div class="panel">
          <div class="panel__header">
            <div id="place-search" class="place-search"><input placeholder="Название посёлка" type="search" /><button>Найти</button></div>
          </div>
          <div id="places">
            ${places}
          </div>
        </div>
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
             .replace(/>\s+</g, '><')
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