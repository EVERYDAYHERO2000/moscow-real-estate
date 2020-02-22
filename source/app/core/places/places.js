__.core.$places = function () {

  let getData = false;

  let marker = new L.marker([], {
    icon: L.divIcon({
      className: 'place-marker'
    })
  }).on('click', function (e) {
    showDetailScreen(e.target.options.id);
  });

  $('#places').on('mouseenter', '.place-item', function (e) {

    let DATA = ($('#app').data('data')) ? $('#app').data('data').places : [];

    if (DATA.length) {
      let id = $(e.currentTarget).data('id').split('-')[1];
      let map = $('#map').data('map');



      $.each(DATA, function (i, e) {

        if (e.id == id) {

          marker.setLatLng([e.point[1], e.point[0]]);
          marker.options.id = e.id;

          if (!map.hasLayer(marker)) map.addLayer(marker);

          return false;
        }

      });
    }

  });

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


      showDetailScreen(id);

      



    }

  })

  function showDetailScreen(id) {
    __.fs.placeGet(id, function (data, url) {

      
      __.fs.analytics('select_place', {

        place_id: data.id,
        place_name: data.name,
        place_url: url,
        target: 'list'

      });

      __.detailScreen({place : data});

    });
  }


  $('#places').scroll(function (e) {
    var _this = this,
      $last = $(_this).find('.place-item').last(),
      length = $(_this).find('.place-item').length,
      map = $('#map').data('map');




    if (map && !map.search && $last.length && $last.offset().top < $(window).outerHeight() * 2) {

      var DATA = $('#app').data('data').places,
        count = 100;

      if (!DATA[0].railroad.closest.name && !getData) {

        

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

        getData = true;

      } else {

        appendItems(DATA, _this, count, length);

      }

      //append new item to place list
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
      places = params.places,
      DATA = $('#app').data('data').places;




    $(_this).empty();


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

        render();

      });


    } else {

      render();


    }

    function render() {

      

      $('#places').empty();

      setTimeout(function(){

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

      },1000);

    }

  });

  return $('#places');

}