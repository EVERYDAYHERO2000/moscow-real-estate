__.placeItem = function(params){
    
  let _miniMap = (typeof global != 'undefined') ? global.component('mini-map', {lat: params.point[1], lon: params.point[0]}) : __.miniMap({lat: params.point[1], lon: params.point[0]});
  
  //let _color = (typeof global != 'undefined') ? '#fafafa' : params.canvas.color;
  
  let _type = (params.type) ? `${params.type}` : '';
  let _name = `${params.name}`;
  
  //let _eco = (params.eco.distance < 10) ? `<div>${params.eco.closest.name} в ${params.eco.distance}км</div>` : '';
  
  
  let _car = `<div class="place-item__car">до Москвы: ${params.car.time.h} ч ${params.car.time.m} мин (${params.car.distance} км)</div>`;
  
  let _rjd = (params.railroad.distance < 3) ? `<div class="place-item__train">ст. ${params.railroad.closest.name} в ${params.railroad.distance} км,<br>до Москвы: ${params.railroad.closest.time.h} ч ${params.railroad.closest.time.m} мин (${params.railroad.closest.distance} км)</div>` : ''; 
  
  let folder = Math.floor(params.id/100) * 100,
      url = `https://myhousehub.ru/places/${folder}/place_${params.id}/`;
  
  let tpl = 
`<div itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement" class="place-item" data-id="place-${params.id}">
  <div class="place-item__content">
    <div class="place-item__title">
      <a href="${url}" itemprop="url"><span class="place-item__type">${_type}</span><span class="place-item__name">${_name}</span></a>
      <meta itemprop="name" content="${_type} ${_name}">
    </div>
    <div class="place-item__distance">
      ${_car}
      ${_rjd}
    </div>
  </div>
  ${_miniMap}
</div>`;
    
  if (typeof global == 'undefined') {
        
    __.fs.event.bind('.place-item', 'click', function(e){
    
    /*
    
    e.preventDefault();
    
    var DATA = $('#app').data('data').places,
        map = $('#map').data('map'),
        id = $(e.currentTarget).data('id').split('-')[1];
    
        $('.place-item').not(this).removeClass('place-item_active');
    
        
        
        if ( $(this).is('.place-item_active') ){
          $(this).removeClass('place-item_active');
          $('#detail-screen').remove();
          
        } else {
          $(this).addClass('place-item_active');

          
          
          __.fs.placeGet(id, function(data, url){
            
            __.fs.analytics('select_place',{
        
              place_id : data.id,
              place_name : data.name,
              place_url : url,
              target: 'list'
        
            });
            
            __.detailScreen({place:data});
            
          });
          
          
        }
    
    */
    
      
  })
  
    }
    
  return tpl;
  
}