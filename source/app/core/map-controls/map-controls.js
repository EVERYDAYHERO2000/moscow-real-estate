__.core.$mapControls = function () {

  $('#map-controls').bind('create', function (event) {

    let layers = {
        default: {
          title: 'Нет',
          selected: false
        },
        eco: {
          title: 'Экология',
          selected: true
        },
        railroad: {
          title: 'Электирички',
          selected: false
        }
      },
      l = '';

    $.each(layers, function (i, e) {
      let selected = (e.selected) ? 'selected' : ''
      l += `<option ${selected} value="${i}">${e.title}</option>`;
    });


    let $selectLayer = $(`<select id="select-layer" class="select">${l}</select>`).data('options',layers).change(function(e){
      
      var options = $(this).data('options'),
          val = $(this).val();
      
      $.each( options, function(i,e){
        e.selected = ( val == i ) ? true : false;
      });
      
      
      $('#map').data('canvas').redraw(); 
      
    });

    $(this).find('.layers-controls').append( $selectLayer ); 
    




  }).trigger('create'); 

}