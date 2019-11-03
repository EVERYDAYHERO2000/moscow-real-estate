let header = function(params){
  
  let url = `${SETTINGS.domain}/${params.url}` || `${SETTINGS.domain}/`,
      title = params.title || '',
      root = (url !== `${SETTINGS.domain}/`) ? '../../../' : '',
      description = params.description || '';
  

  
  let h = `
  <head>
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="${root}bin/app/main.css" />
    
    <script src="${root}source/libs/jquery.min.js"></script>
    <script src="${root}source/libs/leaflet.min.js"></script>
    <script src="${root}bin/app/main.js"></script>
    <link rel="manifest" href="${root}manifest.webmanifest">
    <link rel="shortcut icon" href="${root}favicon.ico" type="image/x-icon">
    <link rel="icon" href="${root}favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="16x16" href="${root}favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${root}favicon-32.png">

    <meta property="og:locale" content="ru_RU">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="Househub">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${root}source/assets/cover/main.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${root}source/assets/cover/main.png">
    <meta name="twitter:url" content="${url}">

    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta name="HandheldFriendly" content="True">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="x-dns-prefetch-control" content="on">

    <meta name="pinterest" content="nopin" />
    
    <meta name="yandex-verification" content="8ff483d8f74a9661">
    <meta name="google-site-verification" content="6IYvZOGu3jhh3buc1gm-Cjmk475IfPG4HXZDWt-pbY0">
    <meta name="msvalidate.01" content="C30D1D7C51ECE986D47AE97984D8F3B3" />

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

  </head>`
  
  return h;
  
}

module.exports = header;