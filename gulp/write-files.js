const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const createPage = require(DEV_PATH + '/gulp/create-place-page.js');
const createPageAMP = require(DEV_PATH + '/gulp/create-place-page-amp.js');
const createPageTurbo = require(DEV_PATH + '/gulp/create-place-page-turbo.js');
const component = require(DEV_PATH + '/gulp/component.js');
const titleGenerator = require(DEV_PATH + '/gulp/title-generator.js');
const descriptionGenerator = require(DEV_PATH + '/gulp/description-generator.js');
const yandexTurbo = require(DEV_PATH + '/gulp/yandex-turbo.js');

global.component = global.component || component;

let writeFiles = function(data, allPages){
  
  if (allPages) {    
    
    let domain = SETTINGS.domain,
        currentDate = new Date().toISOString(),
        rssPages = {},
        sitemap = `
    <url>
        <loc>${domain}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1</priority>
    </url>`;
    
    if (process.stdout.clearLine){
      process.stdout.write('Start file generator');
    }
    
    _.forEach(data.places, function(e){
      
      
      let id = e.id,
          folder = Math.floor(id/100) * 100,
          catalogUrl = DEV_PATH + `/bin/data/places/${folder}/`,
          dataUrl = DEV_PATH + `/bin/data/places/${folder}/place_${id}`,
          pageUrl = DEV_PATH + `/places/${folder}/place_${id}`,
          pageUrlAMP = DEV_PATH + `/places/${folder}/place_${id}/amp/`,
          canonical = `/places/${folder}/place_${id}/`,
          title = titleGenerator(e),
          description = descriptionGenerator(e),
          
          
          html = createPage({
            url : canonical,
            place : e,
            title : title,
            description : description,
            content : component('detail-screen', {place:e, mode:'html', canonical:canonical})
          }),
          
          htmlAMP = createPageAMP({
            url : canonical,
            place : e,
            title : title,
            description : description,
            content : component('detail-screen', {place:e, mode:'amp', canonical:canonical})
          });
          
      
          if (!rssPages[folder]) {
            rssPages[folder] = [];
          }    
      
          rssPages[folder].push(createPageTurbo({
            url : canonical,
            place : e,
            title : title,
            description : description,
            content : component('detail-screen', {place:e, mode:'turbo', canonical:canonical}),
            date : currentDate
          }));
            
          e.title = title;
          
          if (process.stdout.clearLine){
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`World data: /bin/data/places/${folder}/place_${id} writed`);
          }
      
          sitemap += `
    <url>
        <loc>${domain}/places/${folder}/place_${id}/</loc>
        <xhtml:link rel="amphtml" href="${domain}/places/${folder}/place_${id}/amp/"></xhtml:link>
        <lastmod>${currentDate}</lastmod>
        <priority>0.5</priority>
    </url>`;
      
          
      
      fs.mkdir(dataUrl, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
          
          fs.writeFile(dataUrl + '/data.json', JSON.stringify(e), function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } 

          });
          
        }
        
      });
      
      fs.mkdir(pageUrl, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
          
          fs.writeFile(pageUrl + '/index.html', html, function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } 
          });
          
        }
      });
      
      fs.mkdir(pageUrlAMP, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
          
          fs.writeFile(pageUrlAMP + '/index.html', htmlAMP, function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } 
          });
          
        }
      });
      
    });
    
    if (process.stdout.clearLine){
      process.stdout.write(`\n`);
    }
    
    sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap}</urlset>`;
    
    
    
    fs.writeFile(DEV_PATH + '/sitemap.xml', sitemap, function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 
    });
    
    
    
    
    _.forEach(rssPages, function(e,i){
      
      let folder = `/places/${i}/`
      let path = `${folder}turbo.xml`;
      let yandexRSS = yandexTurbo({
        pages : e.join(''),
        date : currentDate,
        title : 'Коттеджние поселки подмосковья',
        description : 'Найти коттеджный посёлок рядом с Москвой. Загородное жильё с хорошей транспортной доступностью, рядом со станцией электрички, в экологически чистом районе'
      });
      
      //
      fs.mkdir(DEV_PATH + folder, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
      
          fs.writeFile(DEV_PATH + path, yandexRSS, function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } 
          });
          
        }
      });
      
    });
    
  }
  
}


module.exports = writeFiles;