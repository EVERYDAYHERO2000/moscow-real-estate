
let yandexTurbo = function (params) {

  
let rss = `
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:turbo="http://turbo.yandex.ru"
     version="2.0">
    <channel>
        <title>${params.title}</title>
        <link>https://myhousehub.ru/</link>
        <description>${params.description}</description>
        <language>ru</language>
        <turbo:analytics type="Yandex" id="55798045"></turbo:analytics>
        ${params.pages}
    </channel>
</rss>
`;
  
  rss = rss.replace(/\s+/g, ' ')
        .replace(/\s\,\s/g, ', ')
		    .trim();
  
  return rss;
  
}

module.exports = yandexTurbo; 