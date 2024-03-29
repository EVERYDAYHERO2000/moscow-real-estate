const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const component = require('@root/gulp/fs/component.js');
const titleGenerator = require('@root/gulp/text-gen/title-generator.js');
const descriptionGenerator = require('@root/gulp/text-gen/description-generator.js');

global.component = global.component || component;

let createPageAMP = function(params){
  
  let url = `${SETTINGS.domain}/${params.url}` || `${SETTINGS.domain}/`,
      place = params.place,
      title = params.title,
      description = params.description;
  
  let page = `
<!DOCTYPE html>
<html lang="ru" ⚡>
<head>
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${url}">
  <meta http-equiv="Content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  
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

  <link rel="shortcut icon" href="//myhousehub.ru/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/source/assets/img/touch/touch-icon-ipad.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/source/assets/img/touch/touch-icon-iphone-retina.png">
  <link rel="apple-touch-icon" sizes="167x167" href="/source/assets/img/touch/touch-icon-ipad-pro.png">
  <meta name="msapplication-TileImage" content="/source/assets/img/touch/homescreen144.png">
  <meta name="theme-color" content="#7D48DD">
  <meta name="msapplication-TileColor" content="#7D48DD">
  <meta name="yandex-tableau-widget" content="logo=//myhousehub.ru/source/assets/img/touch/homescreen96.png, color=#7D48DD" />

  <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>

  <style amp-custom>

    html,
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
    
    a {
      text-decoration: none;
    }
    
    h1 {
      font-size: 30px;
      margin:20px 0 0 0;
      padding:0;
    }
    
    h2 {
      font-size: 24px;
      margin: 40px 0 20px 0;
      padding:0;
    }
    
    p {
      margin: 10px 0;
    }

    .header {
      box-sizing: border-box;
      padding: 15px 10px;
      background: #7915dd;
      color: #fff;
    }

    .header-mobile {
      display: none;
    }

    .header__logo {
      display: flex;
      align-items: center;
    }
    
    .header__logo-icon-link {
      display: block;
      width: 40px;
      height: 40px;
    }
    
    .header__logo-words {
      display: flex;
      flex-direction: column;
      color: #fff;
      margin-left: 10px;
      font-size: 13px;
    }
    
    .header__sitename {
      color: #fff;
      text-decoration: none;
      letter-spacing: 1px;
      font-size: 18px;
    }
    
    .header__sitename:visited, .header__sitename:hover {
      color: #fff;
    }

    .btn {
      background: #7915dd;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 12px 18px;
      display: block;
      text-align: center;
    }
    
    .main, .section {
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 20px;
      line-height: 1.5;
      font-size: 16px;
      color: rgba(0,0,0,.8);
    }
    
    .breadcrumbs {
      list-style: none;
      margin:0;
      padding:0;
      display: block;
      font-size: 13px;
      color: rgba(0,0,0,.5);
    }
    
    .breadcrumbs li {
      display: inline-block;
    }
    
    .breadcrumbs li:after {
      content: '/';
      display: inline-block;
      margin: 0 3px;
      color: rgba(0,0,0,.3);
    }
    
    .content__item {
      border-bottom: 1px solid #e5e5e5;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    
    .content__item-title {
      width: 50%;
      padding: 0 20px 0 0;
      box-sizing: border-box;
    }

    .content__item-title h3 {
      font-size: 16px;
      margin: 0;
      padding: 0;
      font-weight: 500;
    }
    
    .content__item-value {
      width: 50%;
    }
    
    section {
      margin-top: 20px;
    }
    
    section .content__item:last-child {
      border-bottom: none;
    }

    .simple-list {
      list-style: none;
      margin:0;
      padding:0;
    }

    .simple-list__item {
      margin: 8px 0;
    }

    .flex-line {
      display: flex;
      align-items: center;
      align-content: center;
    }

    .favicon {
      width: 16px;
      height: 16px;
      min-width: 16px;
      min-height: 16px;
      margin: 0 8px 0 0;
    }

    #place-map {
      margin:0;
      padding:0;
    }

  </style>

  <style amp-boilerplate> 
    body { 
      -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both; 
      -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both; 
      animation: -amp-start 8s steps(1, end) 0s 1 normal both 
    } 
    @-webkit-keyframes -amp-start { 
      from { 
        visibility: hidden 
      } to { 
        visibility: visible 
      } 
    } 
    @-moz-keyframes -amp-start { 
      from { 
        visibility: hidden 
      } to { 
        visibility: visible 
      } 
    } 
    @-ms-keyframes -amp-start { 
      from { 
        visibility: hidden 
      } to { 
        visibility: visible 
      } 
    } 
    @-o-keyframes -amp-start { 
      from { 
        visibility: hidden 
      } to { 
        visibility: visible 
      } 
    } 
    @keyframes -amp-start { 
      from { 
        visibility: hidden 
      } to { 
        visibility: visible 
      } 
    } 
  </style>
  <noscript>
    <style amp-boilerplate> 
      body { 
        -webkit-animation: none; 
        -moz-animation: none; 
        -ms-animation: none; 
        animation: none 
      } 
    </style>
  </noscript>

  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

</head>

<body>
  <header class="header">
    <div class="header__logo">
      <a class="header__logo-icon-link" href="/">
        <amp-img alt="myhousehub" src="/source/assets/img/touch/homescreen72.png" layout="responsive" width="40" height="40" />
      </a>
      <div class="header__logo-words">
        <a href="/" class="header__sitename">MYHOUSEHUB</a>
        <span>Найти коттеджный посёлок</span>
      </div>
    </div>
  </header>  
  <div class="main">

    ${ params.content }

  </div>
  <div class="section">
    <a href="/" class="btn">Поиск коттеджных поселков</a>
  </div>
</body>`;   
  
  page = page.replace(/\s+/g, ' ')
       .replace(/\s\,\s/g, ', ')
		   .trim(); 
  
  return page;  
  
}
  
module.exports = createPageAMP;  