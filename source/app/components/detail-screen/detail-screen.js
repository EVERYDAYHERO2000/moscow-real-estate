__.detailScreen = function (params) {

  let detail_tpl = '',
    container_tpl = '',
    place = params.place;

  if (place) {

    let _id,
        _name,
        _url,
        _description,
        _type,
        _mobileHeader,
        _close,
        _map,
        _class,
        _address,
        _city,
        _moscow,
        _car,
        _railroad,
        _market,
        _water,
        _eco,
        _price,
        _developer,
        _site,
        _medic,
        _markets,
        _bradcrumbs,
        _forest;


    _id = place.id;


    _name = place.name;

    
    _url = (function (id) {
      let folder = Math.floor(id / 100) * 100,
        url = `https://myhousehub.ru/places/${folder}/place_${id}/`;
      return url;

    })(place.id);


    _description = place.description;


    _type = (place.type) ? `${place.type}` : '';


    _mobileHeader = (function(mode){

      return (mode == 'turbo' || mode == 'amp') ? '' : 
      `<div class="header-mobile">
          <a href="/" id="close-screen" name="close-screen" role="button" class="btn btn_back">Назад</a>
      </div>`;

    })(params.mode); 

 

    _close = (params.mode == 'turbo' || params.mode == 'amp') ? '' : `<div class="close-icon" role="button" id="close-panel"></div>`;


    _map = (function (mode, url) {
      let map = '',
          point = place.point;

      if (mode == 'amp') {
        map = 
        `<a href="${url}">
          <amp-img alt="map" src="https://static-maps.yandex.ru/1.x/?ll=${point[0]},${point[1]}&size=450,450&z=13&l=map&pt=${point[0]},${point[1]}" layout="responsive" width="450" height="450" />
        </a> `;
      }

      return map;

    })(params.mode, params.canonical);

    _ads = (function(mode){
      return (mode != 'amp') ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- ads-box_1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3027365012127484"
     data-ad-slot="5702464578"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>` : '';
    })(params.mode)


    _class = contentItem('Класс', place.class, function (v) {
      return v
    });


    _address = (function (address, distance, angle) {

      let a = (address) ? `${address}. ` : '';
      let m = `<b class="value">${distance} км</b>`;    
      let d = '';
        
        if ( angle >= 339 && angle <= 360 ){
          d = 'Западное направление';
        }
    
        if ( angle >= 0 && angle <= 23 ){
          d = 'Западное направление'
        }

        
        if ( angle >= 24 && angle <= 68){
          d = 'Юго-западное направление'
        }
        
        if ( angle >= 69 && angle <= 113 ){
          d = 'Южное направление'
        }
        
        if ( angle >= 114 && angle <= 158){
          d = 'Юго-восточное направление'
        }
        
        if ( angle >= 159 && angle <= 203 ){
          d = 'Восточное направление'
        }
        
        if ( angle >= 204 && angle <= 225 ){
          d = 'Северо-восточное направление'
        }
        
        if ( angle >= 226 && angle <= 293){
          d = 'Северное направление'
        }
        
        if ( angle >= 294 && angle <= 338 ){
          d = 'Северо-западное направление'
        }

      return `<p>Адрес посёлка: ${a}${d}, ${m} от центра Москвы.</p>`;

    })(place.address.name, place.moscow.distance, place.moscow.angle);


    _city = (function(city){

      return `<p>${city.closest.name} в <b class="value">${city.distance} км</b> от посёлка.</p>`

    })(place.city);


    _moscow = contentItem('Расстояние от Москвы', place.moscow.distance, function (v) {
      return `<b class="value">${v} км</b>`
    });

    _routeurl = (function(point){
      return `https://yandex.ru/maps/213/moscow/?ll=${point[0]}%2C${point[1]}&mode=routes&rtt=auto&rtext=55.753215%2C37.622504~${point[1]}%2C${point[0]}`
    })(place.point);


    _car = (function(car){

       return `
       <p>На автомобиле до центра Москвы:</p>
       <p><b class="value">${car.distance} км</b>, <span class="value">${car.time.h} ч ${car.time.m} мин</span> без учета пробок</p>
       <div class="btn-group"><a class="btn btn_ghost" rel="noreferrer noopener nofollow" target="_blank" href="${_routeurl}">Проложить маршрут</a></div>` 

    })(place.car); 


    _railroad = (function(railroad){

      let url = `https://rasp.yandex.ru/search/?fromId=c213&fromName=Москва&toName=${railroad.closest.name}&when=сегодня`;
      return `
      <p>Ближайшая ж/д станция пригородной электрички ${railroad.closest.name} (${railroad.closest.route})</p>
      <p>От посёлка до станции <b class="value">${railroad.distance} км</b>, дорога до Москвы займёт <span class="value">${railroad.closest.time.h} ч ${railroad.closest.time.m} мин</span></p>
      <div class="btn-group"><a class="btn btn_ghost" rel="noreferrer noopener nofollow" target="_blank" href="${url}" >Расписание электричек</a></div>`;

    })(place.railroad);


    _market = (function(market){
      return `<p>Крупный сетевой магазин в <b class="value">${market.distance} км</b>.</p>`;
    })(place.markets);
  

    _water = (function (water) {

      let tpl = '',
          c = water.closests;

      for (var i = 0; i < c.length; i++) {
  
        if (c[i].closest) {

          let closest = c[i].closest;

          if (closest.min > 0) {

            if (closest.min != closest.max) {

              tpl += `<li class="item-with-icon"><div class="icon icon_water icon_inline" ></div><div><p><b class="value">от ${closest.min} м. до ${closest.max} м.</b><br>Средняя глубина водоносного горизонта ${closest.median} м. (скважины в ${closest.name})</p></div></li>`;

            } else {

              tpl += `<li class="item-with-icon"><div class="icon icon_water icon_inline" ></div><div><p><b class="value">${closest.median} м.</b><br>Cредняя глубина водоносного горизонта (скважины в ${closest.name})</p></div></li>`;

            }

          }

        }
      }

      tpl = (tpl.length) ? `<hr><p>Глубина водоносного горизонта в районе посёлка:</p>
      <ul class="simple-list">
        ${tpl}
      </ul>` : '';

      return tpl;

    })(place.water);


    _eco = (function (eco) {

      let tpl = '',
          title = '';

      for (var i = 0; i < eco.length; i++) {
        let description = (eco[i].closest.description) ? `${eco[i].closest.description}` : '';

        tpl += `<li class="item-with-icon"><div class="icon icon_eco icon_inline" data-ico="${eco[i].closest.type}"></div><div><p><b class="value">${eco[i].distance.toFixed(1)} км</b><br>${eco[i].closest.name}. ${description}</p></div></li>`

      }

      tpl = (tpl.length) ? `<ul class="simple-list">${tpl}</ul>` : '';
      title = (tpl.length) ? `Ближайшие источники загрязнения и шума:` : `Рядом с поселком отсутствуют источники загрязнения и шума.`;

      return `<p>${title}</p>${tpl}`;

    })(place.eco.closests);


    _price = (function (price, developer) {

      let cost = {
        from: (price.from) ? (typeof global != 'undefined') ? global.component('str-to-cost', {
          value: price.from
        })[0] : __.strToCost({
          value: price.from
        })[0] : '',
        to: (price.to) ? (typeof global != 'undefined') ? global.component('str-to-cost', {
          value: price.to
        })[0] : __.strToCost({
          value: price.to
        })[0] : '',
        closest: (price.closest) ? (typeof global != 'undefined') ? global.component('str-to-cost', {
          value: price.closest
        })[0] : __.strToCost({
          value: price.closest
        })[0] : ''
      }

      

      let from = (price.from) ? `Цена от <nobr><b>${cost.from} руб.</b></nobr> ` : `Ориентировочная цена на дома от <nobr><b>${cost.closest} руб.</b></nobr> `,
        to = (price.to) ? `до <nobr><b>${cost.to} руб.</b></nobr>` : '',
        p = from + to,
        d = (developer) ? `Застройщик ${developer}.` : '';

      

      return (p) ? `${p} ${d}` : `${d}`;


    })(place.price, place.developer);

    
    _developer = contentItem('Застройщик', place.developer, function (v) {
      return v;
    });




    _site = contentItem('Сайт', place.site, function (v) {
      let src = (URL) ? new URL(v).host : v.replace(/^(http|https):\/\//g, '');
      return `<div class="flex-line">${image(params.mode, `https://favicon.yandex.net/favicon/${src}`, src, 16, 16, 'favicon')} ${link(v, src)}</div>`;
    });


    _medic = (function(medic){
      return `<p>Cтанция скорой помощи в <b class="value">${medic.distance} км</b>.</p>`
    })(place.medic); 


    _markets = (function (point, site) {

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

      let site_link = (site) ? `<div class="btn-group"><a target="_blank" rel="noreferrer noopener nofollow" href="${site}" class="btn btn_ghost">Сайт посёлка</a></div>` : '';

      return `
        <ul class="simple-list">
        <li class="simple-list__item flex-line">${cian_img} ${link(cian_url, 'Циан')}</li>
        <li class="simple-list__item flex-line">${yandex_img} ${link(yandex_url, 'Яндекс.Недвижимость')}</li>
        <li class="simple-list__item flex-line on-mobile_hide">${avito_img} ${link(avito_url, 'Авито')}</li>
        <li class="simple-list__item flex-line">${sob_img} ${link(sob_url, 'Sob')}</li>
        <li class="simple-list__item flex-line">${move_img} ${link(move_url, 'move.ru')}</li>
        </ul>
        ${site_link}`;

    })(place.point, place.site);


    _forest = (function(forest){
      
      let tpl = ''

      if (forest.distance > -1) {

        for(var i = 0; i < forest.closests.length; i++ ){
        
          let e = forest.closests[i];
          let name = (e.type == 1) ? e.name + ' лесничество' : e.name;
          
          tpl += `<li class="item-with-icon"><div class="icon icon_forest icon_inline" ></div><div><p>${name}</p></div></li>` 

        };

        tpl = `
        <p>В <b>${forest.distance} км</b> от посёлка начинается лес.</p>
        <ul class="simple-list">${tpl}</ul>`;

      } 

      return tpl;

    })(place.forest);


    _bradcrumbs = (function(_name, _url){

      let links = [
        {
          url : 'https://myhousehub.ru/',
          name : 'Коттеджные посёлки Москвы',
          link : true
        },
        {
          name : _name,
          url : _url,
          link : false
        }
      ];

      return (typeof global != 'undefined') ? global.component('breadcrumbs', {links : links}) : __.breadcrumbs({links : links});

    })(_name, _url);

    container_tpl = `

${_close} 
${_bradcrumbs}

<main itemscope itemtype="http://schema.org/Dataset">
  <h1 itemprop="name"><span>${_type}</span> <span>${_name}</span></h1>
  <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/">
  <p itemprop="description">${_description}</p>

  <div class="page-navigation">
    <div class="page-navigation__inner">
      <a href="#s_offer">Купить</a>
      <a href="#s_transport">Транспорт</a>
      <a href="#s_infrastructure">Инфраструктура</a>
      <a href="#s_eco">Экология</a>
      <a href="#s_map">Карта</a>
    </div>  
  </div>  

  <div class="panel__content content">
    <section id="s_offer" class="content__section">
      <h2>Купить дом в посёлке</h2>
      <p>${_price} Предложения о продаже в <nobr>${_type} ${_name}</nobr>:</p>
      ${_markets}
    </section>
    ${_ads}
    <section id="s_transport" class="content__section">
      <h2>Транспортная доступность <nobr>${_type} ${_name}</nobr></h2>
        ${_address}
        <hr>
        ${_car}
        <hr>
        ${_railroad}
    </section>
    <section id="s_infrastructure" class="content__section">
      <h2>Инфраструктура</h2>
      <div>
        ${_city}
        <hr>
        ${_medic}
        <hr>
        ${_market}
      </div>
    </section>
    <section id="s_eco" class="content__section">
      <h2>Экология</h2>
      <div>
        ${_forest}
        ${_eco}
        ${_water}
      </div>
    </section>
    <section id="s_map">
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

  function image(mode, src, alt, width, height, classname) {

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


    let folder = Math.floor(place.id / 100) * 100;
    history.pushState(place, place.name, `/places/${folder}/place_${place.id}/`);
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



            $.each(data.places, function (i, e) {

              if (e.id == id) {
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


        function drawMap() {



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

          L.tileLayer(__.fs.mapTiles.simple, { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
          map.addLayer(marker);

          let c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(map);

          function drawingOnCanvas(canvasOverlay, p) {
            let ctx = p.canvas.getContext('2d'),
              zoom = map.getZoom();

            ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);


            __.mapData()['eco'](function () {



              __.mapOverlay()['eco']({
                data: data
              }, canvasOverlay, ctx, zoom, 'place-map');

            });

            __.mapData()['railroad'](function () {

              __.mapOverlay()['railroad']({
                data: data
              }, canvasOverlay, ctx, zoom, 'place-map');

            });


          }
        }

      }

    }, 100);

    $screen.find('a').click(function (e) {

      let href = $(this).attr('href');

      if (href.includes('cian.ru')) {
        __.fs.analytics('cta_go-to-store', {
          store: 'cian',
        });

        preventOpenInBrowser(href);

      }

      if (href.includes('realty.yandex.ru')) {
        __.fs.analytics('cta_go-to-store', {
          store: 'yandex'
        });

        preventOpenInBrowser(href);

      }

      if (href.includes('avito.ru')) {
        __.fs.analytics('cta_go-to-store', {
          store: 'avito'
        });

        preventOpenInBrowser(href);

      }

      if (href.includes('sob.ru')) {
        __.fs.analytics('cta_go-to-store', {
          store: 'sob.ru'
        });

        preventOpenInBrowser(href);

      }

      if (href.includes('move.ru')) {
        __.fs.analytics('cta_go-to-store', {
          store: 'move.ru'
        });

        preventOpenInBrowser(href);

      }

      function preventOpenInBrowser(href) {

        if ($('#app').is('.mobile')) {

          e.preventDefault();
          location.href = href;

        }

      }


    });

    $screen.find('#close-screen, #close-panel').click(function (e) {

      e.preventDefault();
      $('#main').find('#detail-screen').remove();

      let title = 'Коттеджние поселки подмосковья';

      history.pushState({}, title , "/");
      $('title').text(title);

      __.fs.analytics('close_detail-screen');

    });

    $screen.find('a[href^="#"]').click(function (e) {

      e.preventDefault();

      let hash = '#' + $(this).attr('href').split('#')[1];

      $('#detail-screen').stop().animate({
        scrollTop: $(hash).offset().top + $('#detail-screen').scrollTop() - 65
      }, 500, 'swing', function () {
        $('html, body').scrollTop(0)

      });


    });

    __.core.$detailScreen = $screen;

    if (!$('#detail-screen').length) $('#main').append($screen);

  }



  return detail_tpl;

}