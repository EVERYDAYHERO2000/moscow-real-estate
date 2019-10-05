__.placeItem = function(params){
  
  
  let _price = (function(price){
      
    let p = {
      from : (price.from) ? (typeof global != 'undefined') ? global.component('cost', {value : price.from })[0] : __.cost({value : price.from })[0] : '',
      to   : (price.to)   ? (typeof global != 'undefined') ? global.component('cost', {value : price.to })[0]   : __.cost({value : price.to })[0]   : ''
    }  
    
    return {
      from : (p.from) ? `от ${p.from} руб.` : '',
      to : (p.to) ? `до ${p.to} руб.` : ''
    }
        
  })(params.price);
  
  
  
  let _type = (params.type) ? params.type : ''; 
  
  let _eco = (params.eco.distance < 10) ? `<div>${params.eco.closest.name} в ${params.eco.distance}км</div>` : '';
    
  let _car = `<div class="place-item__car">до Москвы: ${params.car.time.h}ч ${params.car.time.m}мин (${params.car.distance}км)</div>`;
  
  let _rjd = (params.railroad.distance < 3) ? `<div class="place-item__train">ст. ${params.railroad.closest.name} в ${params.railroad.distance}км,<br>до Москвы: ${params.railroad.closest.time.h}ч ${params.railroad.closest.time.m}мин (${params.railroad.closest.distance}км)</div>` : ''; 
  

  
  let tpl = 
`<div class="place-item" id="place-${params.id}" data-lat="${params.point[1]}" data-lon="${params.point[0]}">
  <div class="place-item__title">
    <span class="place-item__type">${_type}</span><span class="place-item__name">${params.name}</span>
  </div>
  <div style="color:red">${_price.from} ${_price.to}</div>
  <div class="place-item__distance">
    ${_car}
    ${_rjd}
  </div>
</div>`;
    
  bindEvent('.place-item', 'click', function(e){
    
    var lat = $(e.currentTarget).data('lat');
    var lon = $(e.currentTarget).data('lon');
    
    map.setView(new L.LatLng(lat, lon), 15);
      
  })
    
  return tpl;
  
}