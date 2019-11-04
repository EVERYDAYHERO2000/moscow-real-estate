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

    <link rel="shortcut icon" href="${root}favicon.ico" type="image/x-icon">
    <link rel="icon" href="${root}favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="16x16" href="${root}favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${root}favicon-32.png">
    <link rel="apple-touch-icon" sizes="152x152" href="${root}source/assets/img/touch/touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="180x180" href="${root}source/assets/img/touch/touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="167x167" href="${root}source/assets/img/touch/touch-icon-ipad-pro.png">
    <meta name="msapplication-TileImage" content="${root}source/assets/img/touch/homescreen144.png">
    <meta name="theme-color" content="#7D48DD">
    <meta name="msapplication-TileColor" content="#7D48DD">

    <meta name="pinterest" content="nopin" />
    
    <meta name="yandex-verification" content="8ff483d8f74a9661">
    <meta name="google-site-verification" content="6IYvZOGu3jhh3buc1gm-Cjmk475IfPG4HXZDWt-pbY0">
    <meta name="msvalidate.01" content="C30D1D7C51ECE986D47AE97984D8F3B3" />

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MVST2G3');</script>
    <!-- End Google Tag Manager -->

  </head>`
  
  return h;
  
}

module.exports = header;