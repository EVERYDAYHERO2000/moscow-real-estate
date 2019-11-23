const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const createPage = require(DEV_PATH + '/gulp/create-place-page.js');
const createPageAMP = require(DEV_PATH + '/gulp/create-place-page-amp.js');


let writeFiles = function(data, allPages){
  
  if (allPages) {    
    
    let domain = SETTINGS.domain,
        currentDate = new Date().toISOString(),
        sitemap = `
    <url>
        <loc>${domain}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1</priority>
    </url>`;
    
    
    process.stdout.write('Start file generator');
    
    _.forEach(data.places, function(e){
      
      
      let id = e.id,
          folder = Math.floor(id/100) * 100,
          dataUrl = DEV_PATH + `/bin/data/places/${folder}/place_${id}`,
          pageUrl = DEV_PATH + `/places/${folder}/place_${id}`,
          pageUrlAMP = DEV_PATH + `/places/${folder}/place_${id}/amp/`,
          html = createPage({
            url : `/places/${folder}/place_${id}/`,
            title : '',
            place : e
          }),
          htmlAMP = createPageAMP({
            url : `/places/${folder}/place_${id}/`,
            title : '',
            place : e
          });
      
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(`World data: /bin/data/places/${folder}/place_${id} writed`);
      
          sitemap += `
    <url>
        <loc>${domain}/places/${folder}/place_${id}/</loc>
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
    
    process.stdout.write(`\n`);
    
    sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemap}</urlset>`;
    
    fs.writeFile(DEV_PATH + '/sitemap.xml', sitemap, function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 

    });
    
  }
  
}


module.exports = writeFiles;