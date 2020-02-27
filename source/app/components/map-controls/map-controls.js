__.mapControls = function () {

  let layers = {
        default: {
          title: 'Карта'
        },
        eco: {
          title: 'Экология',
          selected: true
        },
        railroad: {
          title: 'Электрички'
        },
        car: {
          title: 'Автомобильные дороги'
        },
        cost: {
          title: 'Цены'
        },
        school : {
          title: 'Образование'  
        },
        markets : {
          title: 'Магазины'
        },
        water : {
          title: 'Скважины на воду'
        },
        forest : {
          title: 'Лес'
        }
      },
      tpl = ``;

      for (var e in layers) {
        let selected = (layers[e].selected) ? 'layers-controls__item_selected' : '';
        tpl += `<li><button class="layers-controls__item ${selected} ${e}" data-id="${e}">${layers[e].title}</button></li>`;
      }

      tpl = `<ul>${tpl}</ul>`

  if (typeof global == 'undefined') {

    $('.layers-controls').html($selectLayer);

    let $selectLayer = $(`.layers-controls__item`).click(function (e) {

      var val = $(this).data('id');

      

      $('.layers-controls__item').removeClass('layers-controls__item_selected');
      $(this).addClass('layers-controls__item_selected');


      $('#map').data('canvas').redraw();
      
      __.fs.analytics('change_map-mode',{
        
        mode : val
        
      });
      

    });
    
    $('.not-mobile .layers-controls ul').mouseenter(function(e){

      $('.layers-controls').addClass('layers-controls_visible');

    }).mouseleave(function(e){

      $('.layers-controls').removeClass('layers-controls_visible');

    });

    


  }

  return tpl;

}