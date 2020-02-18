const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const createPage = require('@root/gulp/create-place-page.js');
const createPageAMP = require('@root/gulp/create-place-page-amp.js');
const createPageTurbo = require('@root/gulp/create-place-page-turbo.js');
const component = require('@root/gulp/fs/component.js');
const titleGenerator = require('@root/gulp/text-gen/title-generator.js');
const descriptionGenerator = require('@root/gulp/text-gen/description-generator.js');
const yandexTurbo = require('@root/gulp/yandex-turbo.js');
const sitemapGenerator = require('@root/gulp/sitemap-generator.js');

global.component = global.component || component;

let writeFiles = function(data, allPages){
  
  if (allPages) {    
    
    let domain = SETTINGS.domain,
        currentDate = new Date().toISOString(),
        rssPages = {},
        
        sitemapPart = `
    <url>
        <loc>${domain}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1</priority>
    </url>`;
    
    sitemapGenerator(data.places, sitemapPart, 'google', 'sitemap.xml');
    sitemapGenerator(data.places, sitemapPart, 'yandex', 'sitemap-yandex.xml');
    
    
    if (process.stdout.clearLine){
      process.stdout.write('Start file generator');
    }
    
    _.forEach(data.places, function(e){
      
      
      let id = e.id,
          folder = Math.floor(id/100) * 100,
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

      fs.mkdir(dataUrl, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
          
          fs.writeFile(dataUrl + '/data.json', JSON.stringify(e), function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } else {

              

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