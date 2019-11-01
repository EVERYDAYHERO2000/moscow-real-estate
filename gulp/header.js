let header = function(params){
  
  let url = `${SETTINGS.domain}/${params.url}` || `${SETTINGS.domain}/`,
      title = params.title || '',
      root = (url !== `${SETTINGS.domain}/`) ? '../../../' : '';
  

  
  let h = `
  <head>
    <title>${title}</title>
    <link rel="canonical" href="${url}">
    <link rel="stylesheet" type="text/css" href="${root}bin/app/main.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="${root}source/libs/jquery.min.js"></script>
    <script src="${root}source/libs/leaflet.min.js"></script>
    <script src="${root}bin/app/main.js"></script>
    <link rel="manifest" href="${root}manifest.webmanifest">
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