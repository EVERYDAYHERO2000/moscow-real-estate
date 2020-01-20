__.detailScreen = function (params) {
  
  let detail_tpl = '',
    container_tpl = '',
    place = params.place;  

  if (place) {
    
    
    
    let _id = place.id;
    let _name = place.name;
    let _url = (function(id){
      let folder = Math.floor(id/100) * 100,
          url = `https://myhousehub.ru/places/${folder}/place_${id}/`;
      return url;
      
    })(place.id);
    let _description = place.description;
    let _type = (place.type) ? `<span>${place.type}</span>` : '';
    
    let _mobileHeader = (params.mode == 'turbo' || params.mode == 'amp') ? '' : `<div class="header-mobile">
    <a href="/" id="close-screen" name="close-screen" role="button" class="btn btn_back">Назад</a>
  </div>`;
    
    let _close = (params.mode == 'turbo' || params.mode == 'amp') ? '' : `<div class="close-icon" role="button" id="close-panel"></div>`;
    
    let _map = (function(mode, url){
      let map = ''
      if (mode == 'amp'){
        map = 
    `<a href="${url}">
      <amp-img alt="map" src="https://static-maps.yandex.ru/1.x/?ll=${place.point[0]},${place.point[1]}&size=450,450&z=13&l=map&pt=${place.point[0]},${place.point[1]}" layout="responsive" width="450" height="450" />
    </a> `;
      }
      
      
      return map;
      
    })(params.mode, params.canonical);
    
    let _class = contentItem('Класс', place.class, function (v) {
      return v
    });

    let _address = simpleItem('Адрес', (function () {

      let a = (place.address.name) ? place.address.name : 'На карте';

      return `<a href="#place-map">${a}</a>`;

    })());

    let _city = contentItem('Ближайший город', place.city.closest.name, function (v) {
      return `${v} в <b class="value">${place.city.distance} км</b>`
    });
    let _moscow = contentItem('Расстояние от Москвы', place.moscow.distance, function (v) {
      return `<b class="value">${v} км</b>`
    });
    let _car = contentItem('На автомобиле до Москвы', place.car.distance, function (v) {
      return `<b class="value">${v} км</b><br><span class="value">${place.car.time.h} ч</span> <span class="value">${place.car.time.m} мин</span> без учета пробок`
    });
    let _railroad = contentItem('Ближайшая ж/д станция', place.railroad.closest.name, function (v) {
      return `${v} в <b class="value">${place.railroad.distance} км</b><br> до Москвы <span class="value">${place.railroad.closest.time.h} ч</span> <span class="value">${place.railroad.closest.time.m} мин</span>`
    });
    let _market = contentItem('Ближайший магазин крупной сети', place.markets.closest.name, function (v) {
      return `${v} в <b class="value">${place.markets.distance} км</b>`
    });
    
    let _water = (function(water){
      
      let tpl = '';

       
      for (var i = 0; i < water.closests.length; i++ ){
        

        
        if (water.closests[i].closest){
          
          if (water.closests[i].closest.min > 0){
          
            if (water.closests[i].closest.min != water.closests[i].closest.max){
          
              tpl += `<div><b class="value">от ${water.closests[i].closest.min} м. до ${water.closests[i].closest.max} м.</b><br>Средняя глубина водоносного горизонта ${water.closests[i].closest.median} м. (скважины в ${water.closests[i].closest.name})</div>`;
          
            } else {
              
              tpl += `<div><b class="value">${water.closests[i].closest.median} м.</b><br>Cредняя глубина водоносного горизонта (скважины в ${water.closests[i].closest.name})</div>`;
              
            }
            
          }
          
        }
      }
      

      
      tpl = (tpl.length) ? `<div class="content__item">
        <div class="content__item-title"><h3>Глубина водоносного горизонта</h3></div>
        <div class="content__item-value">${tpl}</div>
      </div>` : ''; 
      

      
      return tpl;
      
    })(place.water);
    
    let _eco = (function(eco){
      
      let tpl = '';
      
      for (var i = 0; i < eco.length; i++ ){
        let description = (eco[i].closest.description) ? `${eco[i].closest.description}` : '';
        tpl += `<div><b class="value">${eco[i].distance.toFixed(1)} км</b><br><span>${eco[i].closest.name}</span><p>${description}</p></div>`
        
      }
      
      tpl = (tpl.length) ? tpl : 'Чисто'; 
      
      return `<div class="content__item">
        <div class="content__item-title"><h3>Ближайший источник загрязнения</h3></div>
        <div class="content__item-value">${tpl}</div>
      </div>`;
    
    })(place.eco.closests);
      
    let _price = (function (price) {

      let cost = {
        from: (price.from) ? (typeof global != 'undefined') ? global.component('cost', {
          value: price.from
        })[0] : __.cost({
          value: price.from
        })[0] : '',
        to: (price.to) ? (typeof global != 'undefined') ? global.component('cost', {
          value: price.to
        })[0] : __.cost({
          value: price.to
        })[0] : ''
      }

      let from = (price.from) ? `от ${cost.from} руб. ` : '',
        to = (price.to) ? `<br>до ${cost.to} руб.` : '',
        p = from + to;

      return (p) ? contentItem('Цена', p, function (v) {
        return v
      }) : '';


    })(place.price);

    let _developer = contentItem('Застройщик', place.developer, function (v) {
      return v;
    });
    let _site = contentItem('Сайт', place.site, function (v) {
      let src = (URL) ? new URL(v).host : v.replace(/^(http|https):\/\//g, '');
      return `<div class="flex-line">${image(params.mode, `https://favicon.yandex.net/favicon/${src}`, src, 16, 16, 'favicon')} ${link(v, src)}</div>`;
    });
    let _medic = contentItem('Ближайшая станция скорой помощи Москвы и Московской области', place.medic.closest, function (v) {
      return `<b class="value">${place.medic.distance} км</b><br>${place.medic.closest.name}`;
    });

    let _markets = (function (point) {

      let latT = point[1] + 0.00304,
        latB = point[1] - 0.00304,
        lonL = point[0] - 0.009066,
        lonR = point[0] + 0.009066,
        https = 'https://';


      let cian_url = objToUrl(`${https}cian.ru/map/`, {
        deal_type: 'sale',
        engine_version: 2,
        'object_type[0]': 1,
        offer_type: 'suburban',
        zoom: 16,
        center: `${point[1]},${point[0]}`
      });

      let yandex_url = objToUrl(`${https}realty.yandex.ru/moskovskaya_oblast/kupit/dom/karta/`, {
        leftLongitude: lonL,
        topLatitude: latT,
        rightLongitude: lonR,
        bottomLatitude: latB
      });
      
      let move_url = objToUrl(`${https}move.ru/moskovskaya_oblast/prodazha_domov/poisk_na_karte/`, {
        map_center: `${point[1]},${point[0]}`,
        zoom: 16
      });
      
      let sob_url = objToUrl(`${https}sob.ru/map/prodazha-zagorodnaja-nedvizhimost`, {
        ll: `${point[1]},${point[0]}`,
        z: 16
      }) + '&realty_type[]=3&realty_type[]=4&realty_type[]=5&realty_type[]=6&realty_type[]=7&realty_type[]=8&realty_type[]=9&realty_type[]=10&realty_type[]=11&realty_type[]=12';


      let avito_url = objToUrl(`${https}www.avito.ru/moskva/doma_dachi_kottedzhi`, {
        map: btoa(JSON.stringify({
          "searchArea": {
            "latBottom": latB,
            "latTop": latT,
            "lonLeft": lonL,
            "lonRight": lonR
          }
        }))
      });
      
      let cian_img = image(params.mode, `https://favicon.yandex.net/favicon/cian.ru`, 'cian.ru', 16, 16, 'favicon');
      let yandex_img = image(params.mode, `https://favicon.yandex.net/favicon/realty.yandex.ru`, 'realty.yandex.ru', 16, 16, 'favicon');
      let avito_img = image(params.mode, `https://favicon.yandex.net/favicon/avito.ru`, 'realty.yandex.ru', 16, 16, 'favicon');
      let sob_img = image(params.mode, `https://favicon.yandex.net/favicon/sob.ru`, 'sob.ru', 16, 16, 'favicon');
      let move_img = image(params.mode, `https://favicon.yandex.net/favicon/move.ru`, 'move.ru', 16, 16, 'favicon');

      return simpleItem('Предложения',
        `
<ul class="simple-list">
<li class="simple-list__item flex-line">${cian_img} ${link(cian_url, 'Циан')}</li>
<li class="simple-list__item flex-line">${yandex_img} ${link(yandex_url, 'Яндекс.Недвижимость')}</li>
<li class="simple-list__item flex-line on-mobile_hide">${avito_img} ${link(avito_url, 'Авито')}</li>
<li class="simple-list__item flex-line">${sob_img} ${link(sob_url, 'Sob')}</li>
<li class="simple-list__item flex-line">${move_img} ${link(move_url, 'move.ru')}</li>
</ul>`
      );

    })(place.point);

    container_tpl = `
${_close} 
<ol class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList">
  <li class="breadcrumbs_item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <span itemprop="name">
      <a class="breadcrumbs_link" itemprop="item" href="https://myhousehub.ru">Коттеджные посёлки Москвы</a>
      <meta itemprop="position" content="1">
    </span>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <span itemprop="name">${_name}</span>
    <meta itemprop="position" content="2">
    <meta itemprop="item" content="${_url}">
  </li>
</ol>

<main itemscope itemtype="http://schema.org/Dataset">
  <h1 itemprop="name">${_type} <span>${_name}</span></h1>
  <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/">
  <p itemprop="description">${_description}</p>
  <div class="panel__content content">
    <section>
      ${_class}
      ${_price}
      ${_developer}
      ${_site}
      ${_address}
      ${_moscow}
      ${_markets}
    </section>
    <section itemscope itemtype="http://schema.org/Dataset">
      <h2 itemprop="name">Транспорт</h2>
      <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/">
      <div itemprop="description">
        ${_car}
        ${_railroad}
      </div>
    </section>
    <section itemscope itemtype="http://schema.org/Dataset">
      <h2 itemprop="name">Инфраструктура</h2>
      <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/">
      <div itemprop="description">
        ${_city}
        ${_market}
        ${_medic}
      </div>
    </section>
    <section itemscope itemtype="http://schema.org/Dataset">
      <h2 itemprop="name">Экология</h2>
      <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/">
      <div itemprop="description">
        ${_water}
        ${_eco}
      </div>
    </section>
    <section>
      <figure id="place-map" class="map">${_map}</figure>
    </section>
  </div>
</main>
  `;

    detail_tpl = `
<div id="detail-screen" data-id="${_id}" class="panel panel_detail">
  ${_mobileHeader}
  <div class="panel__container">
    ${container_tpl} 
  </div>
</div>`;

  } else {

    detail_tpl = $('#detail-screen')[0].outerHTML;
    
  }

  function image(mode, src, alt, width, height, classname){
    
    mode = mode || 'html';
    classname = (classname) ? `class="${classname}"` : '';
    
    let tpl = (mode != 'amp') ? `<img src="${src}" alt="${alt}" ${classname} />` : `<amp-img src="${src}" alt="${alt}" ${classname} layout="responsive" width="${width}" height="${height}"></amp-img>`;
    
    return tpl;
    
  }
  

  function contentItem(name, value, callback) {

    return (value) ? simpleItem(name, callback(value)) : '';

  }

  function simpleItem(name, value) {

    return `<div class="content__item">
    <div class="content__item-title"><h3>${name}</h3></div>
    <div class="content__item-value">${value}</div>
  </div>`

  }

  function link(href, text, classname, data) {
    data = (data) ? `data-link="${data}"` : '';
    classname = (classname) ? `class="${classname}"` : '';
    return `<a ${classname} ${data} rel="noreferrer noopener nofollow" target="_blank" href="${href}">${text}</a>`
  }

  function objToUrl(url, obj) {
    url = url + '?' || ''
    let uri = encodeURIComponent;
    return url + Object.entries(obj).map(([key, val]) => `${uri(key)}=${uri(val)}`).join('&');
  }


  if (typeof global == 'undefined') {
    

    
    $('#detail-screen').remove();

    let $screen = (__.core.$detailScreen) ? __.core.$detailScreen : $(detail_tpl);

    if (place) $screen.find('.panel__container').empty().append(container_tpl);

    
    let folder = Math.floor(place.id/100) * 100; 
    history.pushState(place,place.name,`/places/${folder}/place_${place.id}/`);
    $('title').text(place.title); 
    

    setTimeout(function () {
      
      

      if ($('#place-map').length) {

        $('#place-map').empty();

        let data = $('#app').data('data');
        
        

        if (!data) {
          
          place = place || null;

          $.get('/bin/data/data.json', function (places) {

            
            
            data = __.fs.decodeData(places),
            id = $('#detail-screen').data('id');
            
            
            
            $.each(data.places,function(i,e){
              
              if (e.id == id){
                place = e;
                return false;
              }
              
            });
            
            if (place) {
              
              
              
              drawMap();
              
              
              
            }
          
          });

        } else {

          drawMap();  

        }


        function drawMap (){

          
          
          let marker = new L.marker([place.point[1], place.point[0]], {
            icon: L.divIcon({
              className: 'place-marker'
            })
          });

          let map = L.map('place-map', {
            center: [place.point[1], place.point[0]],
            zoom: 14,
            gestureHandling: true
          });

          L.tileLayer(__.fs.mapTiles.simple, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
          map.addLayer(marker);

          let c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(map);

          function drawingOnCanvas(canvasOverlay, p) {
            let ctx = p.canvas.getContext('2d'),
              zoom = map.getZoom();

            ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);
            
            
            __.mapData()['eco'](function(){
              
               
    
              __.mapOverlay()['eco']({
                  data: data
                }, canvasOverlay, ctx, zoom, 'place-map');
              
            });
            
            __.mapData()['railroad'](function(){
              
              __.mapOverlay()['railroad']({
                data: data
              }, canvasOverlay, ctx, zoom, 'place-map');
              
            });
            

          }
        }

      }

    }, 100);

    $screen.find('a').click(function (e){
      
      let href = $(this).attr('href');  
      
      if ( href.includes('cian.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'cian',
        });
        
        preventOpenInBrowser(href);
        
      }
      
      if ( href.includes('realty.yandex.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'yandex'
        });
        
        preventOpenInBrowser(href);
        
      }
      
      if ( href.includes('avito.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'avito'
        });
        
        preventOpenInBrowser(href);
        
      }
      
      if ( href.includes('sob.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'sob.ru'
        });
        
        preventOpenInBrowser(href);
        
      }
      
      if ( href.includes('move.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'move.ru'
        });
        
        preventOpenInBrowser(href);
        
      }
      
      function preventOpenInBrowser(href){
      
        if ( $('#app').is('.mobile') ){

          e.preventDefault();
          location.href = href;
          
        }
        
      }
      
      
    });
    
    $screen.find('#close-screen, #close-panel').click(function (e) {

      e.preventDefault();
      $('#main').find('#detail-screen').remove();
      
      history.pushState({},"Коттеджние поселки подмосковья","/");
      $('title').text('Коттеджние поселки подмосковья');
      
      __.fs.analytics('close_detail-screen');
  
    });
    
    $screen.find('a[href="#place-map"]').click(function(e){
      
      e.preventDefault();
      
      $('#detail-screen').stop().animate({
        scrollTop: $('#place-map').offset().top
      }, 500, 'swing', function() { 
        $('html, body').scrollTop(0)
        
      });
      
      
    });

    __.core.$detailScreen = $screen;

    if (!$('#detail-screen').length) $('#main').append($screen);

  }



  return detail_tpl;

}