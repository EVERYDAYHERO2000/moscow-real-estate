const fs = require('fs-extra');
const _ = require('lodash');

const sitemap = function (pages, sitemapPart, type, filename) {

  const domain = SETTINGS.domain,
    currentDate = new Date().toISOString();
  
  let sitemapTemp = sitemapPart || `   `;


  
  _.forEach(pages, function (e) {

    let id = e.id,
      folder = Math.floor(id / 100) * 100,
      amp = (type == 'google') ? `<xhtml:link rel="amphtml" href="${domain}/places/${folder}/place_${id}/amp/"></xhtml:link>` : '';

    sitemapTemp += `
            <url>
                <loc>${domain}/places/${folder}/place_${id}/</loc>
                ${amp}
                <lastmod>${currentDate}</lastmod>
                <priority>0.5</priority>
            </url>`;

  });

  sitemapTemp = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapTemp}</urlset>`;

  

  fs.writeFile(DEV_PATH+'/'+filename, sitemapTemp, function (err) {
    if (err) {
      console.log('buildData -->', err);
    } else {
      console.log(`Sitemap ${filename} created (${sitemapTemp.length} string length)`);
    }
  });

  return sitemapTemp;
  
}

module.exports = sitemap;