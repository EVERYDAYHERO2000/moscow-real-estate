const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');



let writeFiles = function(data, allPages){
  
  if (allPages) {    
    
    let domain = 'https://myhousehub.ru',
        currentDate = new Date().toISOString(),
        sitemap = `
    <url>
        <loc>${domain}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1</priority>
    </url>`;
    
    _.forEach(data.places, function(e){
      
      let id = e.id,
          folder = Math.floor(id/100) * 100,
          url = DEV_PATH + `/bin/data/places/${folder}/place_${id}`;
      
          sitemap += `
    <url>
        <loc>${domain}/bin/data/places/${folder}/place_${id}/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>0.5</priority>
    </url>`;
      
      fs.mkdir(url, { recursive: true }, (err) => {
        if (err) {
          throw err;
          
        } else {
          
          
          fs.writeFile(url + '/data.json', JSON.stringify(e), function(err) {
            if (err) {
              console.log('buildData -->', err); 
            } 

          });
          
        }
        
      });
    });
    
    sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemap}</urlset>`;
    
    fs.writeFile(DEV_PATH + '/sitemap.xml', sitemap, function(err) {
      if (err) {
        console.log('buildData -->', err); 
      } 

    });
    
  }
  
}


module.exports = writeFiles;