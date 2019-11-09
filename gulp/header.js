let header = function(params){
  
  let url = `${SETTINGS.domain}/${params.url}` || `${SETTINGS.domain}/`,
      title = params.title || '',
      description = params.description || '';
  

  
  let h = `
  <head>
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/bin/app/main.css" />
    
    <script src="/source/libs/jquery.min.js"></script>
    <script src="/source/libs/leaflet.min.js"></script>
    <script src="/bin/app/main.js"></script>
    <link rel="manifest" href="/manifest.webmanifest">

    <meta property="og:locale" content="ru_RU">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="Househub">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="/source/assets/cover/main.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="/source/assets/cover/main.png">
    <meta name="twitter:url" content="${url}">

    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta name="HandheldFriendly" content="True">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="x-dns-prefetch-control" content="on">

    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/source/assets/img/touch/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/source/assets/img/touch/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/source/assets/img/touch/touch-icon-ipad-pro.png">
    <meta name="msapplication-TileImage" content="/source/assets/img/touch/homescreen144.png">
    <meta name="theme-color" content="#7D48DD">
    <meta name="msapplication-TileColor" content="#7D48DD">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Househub">

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

    <script type="text/javascript">
      (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
      ;r.type="text/javascript"
      ;r.integrity="sha384-d/yhnowERvm+7eCU79T/bYjOiMmq4F11ElWYLmt0ktvYEVgqLDazh4+gW9CKMpYW"
      ;r.crossOrigin="anonymous";r.async=true
      ;r.src="https://cdn.amplitude.com/libs/amplitude-5.2.2-min.gz.js"
      ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
      console.log("[Amplitude] Error: could not load SDK")}}
      ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
      ;function s(e,t){e.prototype[t]=function(){
      this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
      var o=function(){this._q=[];return this}
      ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
      ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
      ;return this}
      ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
      ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
      ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
      ;function v(e){function t(t){e[t]=function(){
      e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
      for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
      e=(!e||e.length===0?"$default_instance":e).toLowerCase()
      ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
      ;e.amplitude=n})(window,document);

      amplitude.getInstance().init("bca95aa4837d94c0c018228dbc7490f5");
    </script>

    

  </head>`
  
  return h;
  
}

module.exports = header;