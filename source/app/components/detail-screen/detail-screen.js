__.detailScreen = function (place) {

  let detail_tpl = '',
    container_tpl = '';

  if (place) {

    let _id = place.id;
    let _name = place.name;
    let _type = (place.type) ? `<span>${place.type}</span>` : '';
    let _class = contentItem('Класс', place.class, function (v) {
      return v
    });

    let _address = simpleItem('Адрес', (function () {

      let a = (place.address.name) ? place.address.name : 'На карте';

      return `<a href="#place-map">${a}</a>`;

    })());

    let _city = contentItem('Ближайший город', place.city.closest.name, function (v) {
      return `${v} в ${place.city.distance}км`
    });
    let _moscow = contentItem('Расстояние от Москвы', place.moscow.distance, function (v) {
      return `${v}км`
    });
    let _car = contentItem('На автомобиле до Москвы', place.car.distance, function (v) {
      return `${v}км<br> ${place.car.time.h}ч ${place.car.time.m}мин без учета пробок`
    });
    let _railroad = contentItem('Ближайшая ж/д станция', place.railroad.closest.name, function (v) {
      return `${v} в ${place.railroad.distance}км<br> до Москвы ${place.railroad.closest.time.h}ч ${place.railroad.closest.time.m}мин`
    });
    let _eco = contentItem('Ближайший источник загрязнения', place.eco.closest.name, function (v) {
      let description = (place.eco.closest.description) ? `<br>${place.eco.closest.description}` : '';
      return `${place.eco.distance}км<br>${v} ${description}`
    });
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

      let from = (price.from) ? `от ${cost.from}руб. ` : '',
        to = (price.to) ? `<br>до ${cost.to}руб.` : '',
        p = from + to;

      return (p) ? contentItem('Цена', p, function (v) {
        return v
      }) : '';


    })(place.price);

    let _developer = contentItem('Застройщик', place.developer, function (v) {
      return v;
    });
    let _site = contentItem('Сайт', place.site, function (v) {
      return link(v, v);
    });
    let _medic = contentItem('Ближайшая станция скорой помощи Москвы и Московской области', place.medic.closest, function (v) {
      return `${place.medic.distance}км<br>${place.medic.closest.name}`;
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

      return simpleItem('Предложения',
        `${link(cian_url, 'Циан')}<br>${link(yandex_url, 'Яндекс.Недвижимость')}<br>${link(avito_url, 'Авито', 'on-mobile_hide')}`);

    })(place.point);

    container_tpl = `
<h1>${_type} <span>${_name}</span></h1>
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
  <section>
    <h2>Транспорт</h2>
    ${_car}
    ${_railroad}
  </section>
  <section>
    <h2>Инфраструктура</h2>
    ${_city}
    ${_medic}
  </section>
  <section>
    <h2>Экология</h2>
    ${_eco}
  </section>
  <section>
    <div id="place-map" class="map"></map>
  </section>
</div>
  `;

    detail_tpl = `
<div id="detail-screen" data-id="${_id}" class="panel panel_detail">
  <div class="header-mobile">
    <a href="/" id="close-screen" class="btn btn_back">Назад</a>
  </div>
  <div class="panel__container">${container_tpl}</div>
</div>`;

  } else {

    detail_tpl = $('#detail-screen')[0].outerHTML;

  }


  function contentItem(name, value, callback) {

    return (value) ? simpleItem(name, callback(value)) : '';

  }

  function simpleItem(name, value) {

    return `<div class="content__item">
    <div class="content__item-title">${name}</div>
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

    let $screen = (__.core.$detailScreen) ? __.core.$detailScreen : $(detail_tpl);

    if (place) $screen.find('.panel__container').empty().append(container_tpl);



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
            
            if (place) drawMap();
          
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

          L.tileLayer(__.fs.mapTiles.simple).addTo(map);
          map.addLayer(marker);

          let c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(map);

          function drawingOnCanvas(canvasOverlay, p) {
            let ctx = p.canvas.getContext('2d'),
              zoom = map.getZoom();

            ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);

            __.mapOverlay()['eco']({
              data: data
            }, canvasOverlay, ctx, zoom);
            __.mapOverlay()['railroad']({
              data: data
            }, canvasOverlay, ctx, zoom);

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
        
      }
      
      if ( href.includes('realty.yandex.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'yandex'
        });
        
      }
      
      if ( href.includes('avito.ru') ) {
        __.fs.analytics('cta_go-to-store', {
          store : 'avito'
        });
        
      }
      
      
    });
    
    $screen.find('#close-screen').click(function (e) {

      e.preventDefault();
      $('#main').find('#detail-screen').remove();

    });

    __.core.$detailScreen = $screen;

    if (!$('#detail-screen').length) $('#main').append($screen);

  }



  return detail_tpl;

}