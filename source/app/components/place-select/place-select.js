__.placeSelect = function(event){
  
  removeSelect();
  
  let DATA = $('#app').data('data').places,
        x = event.offsetX,
        y = event.offsetY,
        places = '';
  

    $.each(DATA, function (i, el) {

      if (x > el.canvas.x1 - 10 &&
          x < el.canvas.x2 + 10 &&
          y > el.canvas.y1 - 10 &&
          y < el.canvas.y2 + 10 && 
          el.canvas.visible) {
        
        
        //let link = `${location.origin}/control-center.html#${el.id}`  
        //console.log('id: '+ el.id, link);
        let folder = Math.floor(el.id/100) * 100,
            url = `./places/${folder}/place_${el.id}/index.html`,
            title = (el.type) ? el.type + ' ' + el.name : el.name;
        
        places += `<a class="place-select__item" data-id="${el.id}" href="${url}">${title}</a>`;
        
      }
 
    });
  
    if (places){
          
      $('#map-controls').append(`<div class="place-select">${places}</div>`);
      
      let posX = x - 16;
      let posY = y - 16;
      let rect = $('#map')[0].getBoundingClientRect();
      let r = $('#map-controls .place-select')[0].getBoundingClientRect();
          
      $('#map-controls .place-select').css({
        left : (posX + r.width > rect.width)   ? (rect.width - r.width) + 'px'   : posX + 'px',
        top  : (posY + r.height > rect.height) ? (rect.height - r.height) + 'px' : posY + 'px' 
      });
      
    }
  
    __.fs.event.bind('.place-select', 'mouseleave', function(e){
      removeSelect();
    });
  
    __.fs.event.bind('.place-select__item', 'click', function(e){
      e.preventDefault();
      removeSelect();
      
      
      __.fs.placeGet( $(this).data('id'), function(data){
        __.detailScreen(data);
        
      });
      
    });
  
    function removeSelect(){
      $('#map-controls').find('.place-select').remove();
    }
  
    
  
}