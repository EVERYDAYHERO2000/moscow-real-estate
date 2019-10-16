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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="source/libs/jquery.min.js"></script>
    <script src="source/libs/leaflet.min.js"></script>
    <script src="bin/app/main.js"></script>
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(55798045, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
   </script>
   <noscript><div><img src="https://mc.yandex.ru/watch/55798045" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
   <!-- /Yandex.Metrika counter -->
  </head>
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