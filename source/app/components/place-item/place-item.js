__.placeItem = function(params){
  
  var place = JSON.parse(JSON.stringify(params));
  
  let eco = (place.eco.distance < 10) ? `<div>${place.eco.closest.name} в ${place.eco.distance}км</div>` : '';
    
  let rjd = (place.railroad.distance < 3) ? `<div style="color: green">Ж/д станция ${place.railroad.closest.name} в ${place.railroad.distance}км, до москвы: ${place.railroad.closest.time.h}ч ${place.railroad.closest.time.m}мин (${place.railroad.closest.distance}км)</div>` : ''; 
  
  place.price = (function(price){
      
    return {
      from : (price.from) ? (typeof global != 'undefined') ? global.component('cost', {value : price.from })[0] : __.cost({value : price.from })[0] : '',
      to   : (price.to)   ? (typeof global != 'undefined') ? global.component('cost', {value : price.to })[0]   : __.cost({value : price.to })[0]   : ''
    }  
        
  })(place.price);
  
  let tpl = 
`<div class="place-item" id="place-${place.id}" data-lat="${place.point[1]}" data-lon="${place.point[0]}">
  <div>${place.type} ${place.name}</div>
  <div style="color:red">${(place.price.from) ? place.price.from:''} ${(place.price.to) ? place.price.to:''}</div>
  <div>Расстояние до Москвы: ${place.moscow.distance}км</div>
  <div>На машине: ${place.car.time.h}ч ${place.car.time.m}мин (${place.car.distance}км)</div>
  ${rjd}
  <div>Ближайший город: ${place.city.closest.name} в ${place.city.distance}км</div>
  ${eco}
</div>`;
    
  bindEvent('.place-item', 'click', function(e){
    
    var lat = $(e.currentTarget).data('lat');
    var lon = $(e.currentTarget).data('lon');
    
    map.setView(new L.LatLng(lat, lon), 15);
      
  })
    
  return tpl;
  
}