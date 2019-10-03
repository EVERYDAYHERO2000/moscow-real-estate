__.placeItem = function(params){
  
  let eco = (params.eco.distance < 10) ? `<div>${params.eco.closest.name} в ${params.eco.distance}км</div>` : '';
    
  let rjd = (params.railroad.distance < 3) ? `<div style="color: green">Ж/д станция ${params.railroad.closest.name} в ${params.railroad.distance}км, до москвы: ${params.railroad.closest.time.h}ч ${params.railroad.closest.time.m}мин (${params.railroad.closest.distance}км)</div>` : ''; 
  
  
  let tpl = 
`<div class="place-item" id="place-${params.id}">
  <div>${params.type} ${params.name}</div>
  <div style="color:red">${(params.price.from) ? params.price.from:''} ${(params.price.to) ? params.price.to:''}</div>
  <div>Расстояние до Москвы: ${params.moscow.distance}км</div>
  <div>На машине: ${params.car.time.h}ч ${params.car.time.m}мин (${params.car.distance}км)</div>
  ${rjd}
  <div>Ближайший город: ${params.city.closest.name} в ${params.city.distance}км</div>
  ${eco}
  <hr>
</div>`;
  
  
    
  bindEvent('.place-item', 'click', function(e){
      
    console.log(e)
      
  })
    
  return tpl;
  
}