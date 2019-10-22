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
  
  let _color = (typeof global != 'undefined') ? '#fafafa' : params.canvas.color;
  
  let _type = (params.type) ? `<span class="place-item__type">${params.type}</span>` : ''; 
  
  let _eco = (params.eco.distance < 10) ? `<div>${params.eco.closest.name} в ${params.eco.distance}км</div>` : '';
    
  let _car = `<div class="place-item__car">до Москвы: ${params.car.time.h}ч ${params.car.time.m}мин (${params.car.distance}км)</div>`;
  
  let _rjd = (params.railroad.distance < 3) ? `<div class="place-item__train">ст. ${params.railroad.closest.name} в ${params.railroad.distance}км,<br>до Москвы: ${params.railroad.closest.time.h}ч ${params.railroad.closest.time.m}мин (${params.railroad.closest.distance}км)</div>` : ''; 
  

  
  let tpl = 
`<div class="place-item" id="place-${params.id}">
  <div class="place-item__title">
    <div class="place-item__pin" style="background:${_color}"></div>
    <div>
      ${_type}<span class="place-item__name">${params.name}</span>
    </div>
  </div>
  <div class="place-item__price">${_price.from} ${_price.to}</div>
  <div class="place-item__distance">
    ${_car}
    ${_rjd}
  </div>
</div>`;
    
  if (typeof global == 'undefined') bindEvent('.place-item', 'click', function(e){
    
    var DATA = $('#app').data('data').places,
        map = $('#map').data('map'),
        id = $(e.currentTarget).attr('id').split('-')[1],
        folder = Math.floor(id/100) * 100,
        url = `./bin/data/places/${folder}/place_${id}/data.json`;
    
    $.each(DATA, function(i,e){
      
      if (e.id == id){
        map.setView(new L.LatLng(e.point[1], e.point[0]), 14);
        return false;
      }
      
    });
    
    console.log(url);
    
    $.get(url, function(data){
      console.log(data);  
    });
    
      
  })
    
  return tpl;
  
}