__.mapObjectInfo = function(data, type, mapId){
  
  let $container = $('#' + mapId);
  let tpl = '';
  let title = '';
  let description = '';
  
  if (type == 'eco') {
    
    title = data.name;
    
    description = (data.description) ? data.description : '';
    
    tpl = `
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="icon icon_${type}" data-ico="${data.type}"></div>
    <div class="map-object-info__content">
      <span class="map-object-info__title">${title}</span>
      <p class="map-object-info__description">${description}</p>
    </div>
  <div>
  <div class="close-icon"></div>
</div>`;
  }
  
  if (type == 'markets') {
    tpl=`
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="icon icon_${type}" data-ico=""></div>  
    <div class="map-object-info__content">
      <span class="map-object-info__title">${data.name}</span>
      <p class="map-object-info__description">${data.address}</p>
    </div>
  </div>
  <div class="close-icon"></div>
</div>`;
  }
  
  if (type == 'water') {
    tpl=`
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="icon icon_${type}" data-ico=""></div>  
    <div class="map-object-info__content">
      <span class="map-object-info__title">Скважина в "${data.name}"</span>
      <p class="map-object-info__description">Глубина скважины от ${data.min} м. до ${data.max}, средняя глубина ${data.median} м.</p>
    </div>
  </div>
  <div class="close-icon"></div>
</div>`;
  }

  
  if (type == 'railroad') {
    
    title = `${(data.type) ? capitalizeFirstLetter(data.type) : 'Станция'} «${data.name}» (${data.route})`;
    
    description = `До Москвы ${data.distance}км, ${data.count} станция от Москвы. В пути ${data.time.h}ч ${data.time.m}мин.`;
    
    tpl = `
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="icon icon_${type}" data-ico=""></div>  
    <div class="map-object-info__content">
      <span class="map-object-info__title">${title}</span>
      <p class="map-object-info__description">${description}</p>
    </div>
  </div>
  <div class="close-icon"></div>
</div>`;
  }
  
  $('body').on('click', '.map-object-info .close-icon', function(e){
    
    $('.map-object-info').remove();
    
  });
  
  $container.find('.map-object-info').remove();
  
  $container.append(tpl);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}