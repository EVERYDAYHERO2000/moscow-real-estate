__.core.$places = function () {

  let getData = false;

  $('#places').on('click', '.place-item', function (e) {

    e.preventDefault();

    var DATA = $('#app').data('data').places,
      map = $('#map').data('map'),
      id = $(e.currentTarget).data('id').split('-')[1];

    $('.place-item').not(this).removeClass('place-item_active');



    if ($(this).is('.place-item_active')) {
      $(this).removeClass('place-item_active');
      $('#detail-screen').remove();

    } else {
      $(this).addClass('place-item_active');
      /*
          $.each(DATA, function(i,e){
      
            if (e.id == id){
              map.setView(new L.LatLng(e.point[1], e.point[0]), 14);
              return false;
            }

          });
          */


      __.fs.placeGet(id, function (data, url) {

        __.fs.analytics('select_place', {

          place_id: data.id,
          place_name: data.name,
          place_url: url,
          target: 'list'

        });

        __.detailScreen(data);

      });


    }

  })


  $('#places').scroll(function (e) {
    var _this = this,
      $last = $(_this).find('.place-item').last(),
      lastId = $last.data('id').split('-')[1],
      length = $(_this).find('.place-item').length,
      map = $('#map').data('map');


    if (map && !map.search && $last.offset().top < $(window).outerHeight() * 2) {

      var DATA = $('#app').data('data').places,
        count = 100;

      if (!DATA[0].railroad.closest.name && !getData) {

        getData = true;

        $.get('/bin/data/railroad.json', function (data) {


          $.each(data, function (i, e2) {


            if (window.DATA.railroad[e2.id]) {

              for (var k in e2) window.DATA.railroad[e2.id][k] = e2[k];

            } else {

              window.DATA.railroad[e2.id] = e2;

            }


          });

          $('#app').data('data', window.DATA);

          appendItems(DATA, _this, count, length);

        });

      } else {

        appendItems(DATA, _this, count, length);

      }

      function appendItems(data, _this, count, length) {

        $.each(data, function (i, e) {

          if (length < i) {

            $(_this).append(__.placeItem(e));
            count--;

          }

          if (!count) return false;
        });

      }


    }

  }).bind('renderList', function (event, params) {

    var _this = this,
      onlyVisible = params.onlyVisible || false,
      places = params.places;

    $(_this).empty();

    $.each(places, function (i, e) {

      if (onlyVisible) {

        if (e.canvas.visible) {
          $(_this).append(__.placeItem(e));
        }

      } else {

        if (i < 100) {
          $(_this).append(__.placeItem(e));
        } else {
          return false;
        }

      }

    });

  });

  return $('#places');

}