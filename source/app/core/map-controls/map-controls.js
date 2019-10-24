__.core.$mapControls = function () {

  $('#map-controls').bind('create', function (event) {

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
          title: 'Автомобиль'
        }
      },
      l = '';
    

    $.each(layers, function (i, e) {
      let selected = (e.selected) ? 'selected' : ''
      l += `<option ${selected} value="${i}">${e.title}</option>`;
    });


    let $selectLayer = $(`<select data-ico="eco" id="select-layer" class="select">${l}</select>`).data('options', layers).change(function (e) {

      var options = $(this).data('options'),
        val = $(this).val();
      
      $(this).attr('data-ico',val);

      $.each(options, function (i, e) {
        e.selected = (val == i) ? true : false;
      });


      $('#map').data('canvas').redraw();

    });

    $(this).find('.layers-controls').append($selectLayer);





  }).trigger('create');    

}