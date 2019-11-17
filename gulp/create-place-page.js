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
      page = 
`
<!DOCTYPE html>
<html lang="ru">
  ${header({
    url : params.url,
    title : titleGenerator(place),
    description : descriptionGenerator(place)
  })}
  <body>
    <div id="app" class="place-page">
      <div id="header">
        <div class="header-desktop">
          ${component('logo',{})}
        </div>
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
  
page = page.replace(/\s+/g, ' ')
       .replace(/\s\,\s/g, ', ')
       .replace(/>\s+</g, '><')
		   .trim();  
  
return page;  
  
}
  
module.exports = createPage;  
  