__.mapObjectInfo = function(data, type, mapId){
  
  let $container = $('#' + mapId);
  let tpl = '';
  
  if (type == 'eco') tpl = `
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="map-object-info__title">
      <span class="icon icon_${type}" data-ico="${data.type}"></span>
      <span>${data.name}</span>
    </div>
    <div>${(data.description)? data.description:''}</div>
  <div>
  <div class="close-icon">×</div>
</div>`;
  
  if (type == 'railroad') tpl = `
<div class="map-object-info">
  <div class="map-object-info__inner">
    <div class="map-object-info__title">
      <span class="icon icon_${type}" data-ico=""></span>
      <span>${data.name}</span>
    </div>
    <div></div>
  </div>
  <div class="close-icon">×</div>
</div>`;
  
  $('body').on('click', '.map-object-info .close-icon', function(e){
    
    $('.map-object-info').remove();
    
  });
  
  $container.find('.map-object-info').remove();
  $container.append(tpl);
  
  
  
}