__.detailScreen = function (data){
  
  let _type = (data.type) ? `<span>${data.type}</span>` : '';
  let _class = contentItem('Класс', data.class, function(v){ return v });
  let _address = contentItem('Адрес', data.address.name, function(v){ return v });
  let _city = contentItem('Ближайший город', data.city.closest.name, function(v){ return `${v} в ${data.city.distance}км` });
  let _moscow = contentItem('Расстояние от Москвы', data.moscow.distance, function(v){ return `${v}км` });
  let _car = contentItem('На автомобиле до Москвы', data.car.distance, function(v){ return `${v}км<br> ${data.car.time.h}ч ${data.car.time.m}мин без учета пробок` });
  let _railroad = contentItem('Ближайшая ж/д станция', data.railroad.closest.name, function(v){ return `${v} в ${data.railroad.distance}км<br> до Москвы ${data.railroad.closest.time.h}ч ${data.railroad.closest.time.m}мин` });
  let _eco = contentItem('Ближайший источник загрязнения', data.eco.closest.name, function(v){ 
    let description = (data.eco.closest.description) ? `<br>${data.eco.closest.description}` : '';
    return `${data.eco.distance}км<br>${v} ${description}`
  });
  let _price = (function(price){
    
    
    let from = (price.from) ? `от ${__.cost({value:price.from})[0]}руб. ` : '',
        to = (price.to) ? `<br>до ${__.cost({value:price.to})[0]}руб.` : '',
        p = from + to;
    
    return (p) ? contentItem('Цена', p, function(v){ return v }) : '';
    
    
  })(data.price);
  let _developer = contentItem('Застройщик', data.developer, function(v){ return v; });
  let _site = contentItem('Сайт', data.site, function(v){ return `<a rel="noreferrer noopener nofollow" target="_blank" href="${v}">${v}</a>`; });
  let _medic = contentItem('Ближайшая станция скорой помощи Москвы и Московской области', data.medic.closest, function(v){ return `${data.medic.distance}км<br>${data.medic.closest.name}`; });
  
  let _markets = (function(point){
    
    let cian_url = `https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=${point[1]},${point[0]}`;
    
    let yandex_url = `https://realty.yandex.ru/moskovskaya_oblast/kupit/dom/karta/?&leftLongitude=${point[0] - 0.009066}&topLatitude=${point[1] + 0.00304}&rightLongitude=${point[0] + 0.009066}&bottomLatitude=${point[1] - 0.00304}`;
    
    return `<div class="content__item">
    <div class="content__item-title">Предложения</div>
    <div class="content__item-value"><a rel="noreferrer noopener nofollow" target="_blank" href="${cian_url}">Циан</a><br><a rel="noreferrer noopener nofollow" target="_blank" href="${yandex_url}">Яндекс.Недвижимость</a></div>
  </div>`
    
  })(data.point);
  
  let container_tpl = `
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
</div>
  `; 
  
  let detail_tpl = `
<div id="detail-screen" class="panel panel_detail">
  <div class="header-mobile">
    <button id="close-screen" class="btn">Назад</button>
  </div>
  <div class="panel__container">${container_tpl}</div>
</div>`;
  
  
  function contentItem(name, value, callback){
        
    return (value) ? `<div class="content__item">
    <div class="content__item-title">${name}</div>
    <div class="content__item-value">${callback(value)}</div>
  </div>` : '';
    
  } 
  
   
  let $screen = (__.core.$detailScreen) ? __.core.$detailScreen : $(detail_tpl);
  
  let $container = $screen.find('.panel__container').empty().append(container_tpl);
  
  
  
  
  $screen.find('#close-screen').click(function(e){
    
    $('#main').find('#detail-screen').remove();
    
  });
  
  console.log(data);
  
  __.core.$detailScreen = $screen;
  
  if ( !$('#detail-screen').length ) $('#main').append($screen);
  
  
  return detail_tpl;
  
}