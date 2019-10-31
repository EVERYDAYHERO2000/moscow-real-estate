__.detailScreen = function (data) {
  
    let detail_tpl = '',
        container_tpl = '';
  
    if (data){

    let _type = (data.type) ? `<span>${data.type}</span>` : '';
    let _class = contentItem('Класс', data.class, function (v) {
        return v
    });
    
    let _address = simpleItem('Адрес', (function(){
      
      let a = (data.address.name) ? data.address.name : 'На карте';
      
      return `<a href="#place-map">${a}</a>`; 
      
    })());  
      
    let _city = contentItem('Ближайший город', data.city.closest.name, function (v) {
        return `${v} в ${data.city.distance}км`
    });
    let _moscow = contentItem('Расстояние от Москвы', data.moscow.distance, function (v) {
        return `${v}км`
    });
    let _car = contentItem('На автомобиле до Москвы', data.car.distance, function (v) {
        return `${v}км<br> ${data.car.time.h}ч ${data.car.time.m}мин без учета пробок`
    });
    let _railroad = contentItem('Ближайшая ж/д станция', data.railroad.closest.name, function (v) {
        return `${v} в ${data.railroad.distance}км<br> до Москвы ${data.railroad.closest.time.h}ч ${data.railroad.closest.time.m}мин`
    });
    let _eco = contentItem('Ближайший источник загрязнения', data.eco.closest.name, function (v) {
        let description = (data.eco.closest.description) ? `<br>${data.eco.closest.description}` : '';
        return `${data.eco.distance}км<br>${v} ${description}`
    });
    let _price = (function (price) {

        let cost = {
          from : (price.from) ? (typeof global != 'undefined') ? global.component('cost', {value : price.from })[0] : __.cost({value : price.from })[0] : '',
          to   : (price.to)   ? (typeof global != 'undefined') ? global.component('cost', {value : price.to })[0]   : __.cost({value : price.to })[0]   : ''
        } 
    
        let from = (price.from) ? `от ${cost.from}руб. ` : '',
            to = (price.to) ? `<br>до ${cost.to}руб.`    : '',
            p = from + to;

        return (p) ? contentItem('Цена', p, function (v) {
            return v
        }) : '';


    })(data.price);
    let _developer = contentItem('Застройщик', data.developer, function (v) {
        return v;
    });
    let _site = contentItem('Сайт', data.site, function (v) {
        return link(v, v);
    });
    let _medic = contentItem('Ближайшая станция скорой помощи Москвы и Московской области', data.medic.closest, function (v) {
        return `${data.medic.distance}км<br>${data.medic.closest.name}`;
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

    })(data.point);

    container_tpl = `
<h1>${_type} <span>${data.name}</span></h1>
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
<div id="detail-screen" class="panel panel_detail">
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

    function link(href, text, classname) {
        classname = (classname) ? `class="${classname}"` : '';
        return `<a ${classname} rel="noreferrer noopener nofollow" target="_blank" href="${href}">${text}</a>`
    }
  
    function objToUrl(url,obj){
      url = url + '?' || '' 
      let uri = encodeURIComponent;
      return url + Object.entries(obj).map(([key, val]) => `${uri(key)}=${uri(val)}`).join('&');
    }


    if (typeof global == 'undefined'){
  
      let $screen = (__.core.$detailScreen) ? __.core.$detailScreen : $(detail_tpl);

      if (data){
      
        $screen.find('.panel__container').empty().append(container_tpl);
        
      }
      
      setTimeout(function(){
        
        if ($('#place-map').length){ 
          $('#place-map').empty();
          let myIcon = L.divIcon({className: 'place-marker'});
          let marker = new L.marker([data.point[1],data.point[0]], {icon: myIcon});
          let leafletMap = L.map('place-map', {
            center: [data.point[1], data.point[0]],
            zoom: 14,
            gestureHandling: true
          });
          L.tileLayer(__.fs.mapTiles.simple).addTo(leafletMap);
          leafletMap.addLayer(marker);
          
        }
        
      },100);
        
      $screen.find('#close-screen').click(function (e) {

          e.preventDefault();
          $('#main').find('#detail-screen').remove();
          
      });

      __.core.$detailScreen = $screen;

      if (!$('#detail-screen').length) $('#main').append($screen);
      
    }
  
    

    return detail_tpl;

}