const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');
const header = require(DEV_PATH + '/gulp/header.js');

global.component = global.component || component;

let createPage = function(params){
  
  let place = params.place,
      page = 
`<html>
  ${header({
    url : params.url,
    title : ''
  })}
  <body>
    <div id="app" class="place-page">
      <div id="header">
        <div class="header-mobile">
          <button id="change-view" class="btn">На карте</button>
        </div>
      </div>
      <div id="main">
        
        ${ component('detail-screen', place) }
        
      </div>
    <div>
  </body>
</html>`;
  
return page;  
  
}
  
module.exports = createPage;  
  