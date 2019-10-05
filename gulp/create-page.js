const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');

global.component = component;

let createPage = function(){
  
  var page = '',
      places = '';
  
  _.forEach(DATA,function(e,i){
    
    if (i+1 > 100) return false;
    
    places += component('place-item', e);
    
  });
  
  page = 
`<html>
  <head>
    <link rel="stylesheet" type="text/css" href="bin/app/main.css" />
    <script src="source/libs/jquery.min.js"></script>
    <script src="source/libs/leaflet.min.js"></script>
    <script src="source/libs/chroma.min.js"></script>
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