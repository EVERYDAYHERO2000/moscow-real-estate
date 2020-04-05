$(function(){
    const urls = {
      get: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8QUn2_IpcV0Q_i9uJfsmKMYZErXyAVGMv4u9a1sG36S4450_Wr5vv6LUMsgPYZpoxmdclHMVmg7U6/pub?gid=8452070&single=true&output=csv&version=c_' + Math.round(Math.random() * 100), 
      set: 'https://script.google.com/macros/s/AKfycbxVZXhYott7f6jONtAIjfX5mDu5I_QjCa1h9Kv76bbY_68-6fw/exec?params='
    }

    const app = {
      maxId: 0
    }
    window.app = app;

    let $selectedPlace;
    const editedPlaces = new Set();
    const $places = $('#places');
    const $form = $('#form');

    function appendPlace(id, place) {
      return $places.append(`<div class="place-item" data-index="${id}" id="place-${id}"><div>${id}</div><div>${place}</div></div>`).children().last();
    }

    function getId() {
      return parseInt($form.find('#row_0 .row-control').text(), 10);
    }

    $.get(urls.get, function(d){
      const data = csvToMap(d);
      window.data = data;

      $('#app').css({display:'flex'});

      const map = new createMap(data);

      data.forEach((value, key) => {
        appendPlace(key, value[1]);
        if (key > app.maxId) app.maxId = key;
      });

      app.deletePlace = function(id) {
        var curData = data.get(id);

        for (var k = 1; k < curData.length; k++){
          curData[k] = '';
        }
      }

      app.setForm = function(curData) {
        $form.find('#row_0 .row-control').text( curData[0] );  //id
        $form.find('#row_1 .row-control input').val( curData[1] ); //name
        $form.find('#row_2 .row-control input').first().val( curData[2] ); //lat
        $form.find('#row_2 .row-control input').last().val( curData[3] ); //lon
        $form.find('#row_2 .row-title a').attr( 'href', `https://yandex.ru/maps/?ll=${curData[3]}%2C${curData[2]}&z=14&mode=whatshere&whatshere%5Bpoint%5D=${curData[3]}%2C${curData[2]}` ); //YA maps
        $form.find('#row_3 .row-control input').val( curData[4] ); //address
        $form.find('#row_4 .row-control input').first().val( curData[5] ); //price from
        $form.find('#row_4 .row-control input').last().val( curData[6] ); //price to
        $form.find('#row_4 .row-title a').attr( 'href', `https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=${curData[2]}%2C${curData[3]}` ); //Cian
        $form.find('#row_5 .row-control input').val( curData[7] ); //ready date
        $form.find('#row_6 .row-control input').val( curData[8] ); //type
        $form.find('#row_7 .row-control input').val( curData[9] ); //class
        $form.find('#row_8 .row-control input').val( curData[10] ); //car distance
        $form.find('#row_9 .row-control input').val( curData[11] ); //car time
        $form.find('#row_10 .row-control textarea').val( curData[12] ); //description
        $form.find('#row_11 .row-control input').val( curData[13] ); //developper
        $form.find('#row_12 .row-control input').val( curData[14] ); //site
        $form.find('#row_13 .row-control input').val( curData[15] ); //land type
        $form.find('#row_14 .row-control input').val( curData[16] ); //energy
        $form.find('#row_15 .row-control input').val( curData[17] ); //water
        $form.find('#row_16 .row-control input').val( curData[18] ); //sanitation
        $form.find('#row_17 .row-control input').val( curData[19] ); //gas
        $form.find('#row_18 .row-control input').val( curData[20] ); //securyty
        $form.find('#row_19 .row-control input').val( curData[21] ); //infrastructure
        $form.find('#row_20 .row-control input').val( curData[22] ); //forest
        $form.find('#row_21 .row-control input').val( curData[23] ); //river/lake
        $form.find('#row_22 .row-control input').val( curData[24] ); //link
      }

      app.getForm = function() {
        return [
          $form.find('#row_0 .row-control').text(), //id 0
          $form.find('#row_1 .row-control input').val(), //name 1
          $form.find('#row_2 .row-control input').first().val(), //lat 2
          $form.find('#row_2 .row-control input').last().val(), //lon 3
          $form.find('#row_3 .row-control input').val(), //address 4
          $form.find('#row_4 .row-control input').first().val(), //price from 5
          $form.find('#row_4 .row-control input').last().val(), //price to 6
          $form.find('#row_5 .row-control input').val(), //ready date 7
          $form.find('#row_6 .row-control input').val(), //type 8
          $form.find('#row_7 .row-control input').val(), //class 9
          $form.find('#row_8 .row-control input').val(), //car distance 10
          $form.find('#row_9 .row-control input').val(), //car time 11
          $form.find('#row_10 .row-control textarea').val(), //description 12
          $form.find('#row_11 .row-control input').val(), //developper 13
          $form.find('#row_12 .row-control input').val(), //site 14
          $form.find('#row_13 .row-control input').val(), //land type 15
          $form.find('#row_14 .row-control input').val(), //energy 16
          $form.find('#row_15 .row-control input').val(), //water 17
          $form.find('#row_16 .row-control input').val(), //sanitation 18
          $form.find('#row_17 .row-control input').val(), //gas 19
          $form.find('#row_18 .row-control input').val(), //securyty 20
          $form.find('#row_19 .row-control input').val(), //infrastructure 21
          $form.find('#row_20 .row-control input').val(), //forest
          $form.find('#row_21 .row-control input').val(), //river/lake
          $form.find('#row_22 .row-control input').val() //link
        ];
      }

      app.selectPlace = function($newPlace) {
        $selectedPlace && $selectedPlace.removeClass('place-item_selected');
        $selectedPlace = $newPlace;
        $selectedPlace.addClass('place-item_selected');
        $places.scrollTop(0).scrollTop($selectedPlace.offset().top);
      }

      app.addPlace = function (arr = []) {
        arr[0] = ++(app.maxId);
        data.set(arr[0], arr);

        const $newPlace = appendPlace(arr[0], arr[1]).addClass('place-item_edited');
        editedPlaces.add(arr[0]);
        app.selectPlace($newPlace);
      }

      app.changePlace = function() {
        const curId = getId();

        if (curId) {
          data.set(curId, app.getForm());
        }
      }

      app.addPlaceToEdited = function(id) {
        if (id) {
          const $place = $places.find('#place-' + id);
          $place.addClass('place-item_edited');
          $place.find('div').last().text($form.find('#row_1 .row-control input').val());
          editedPlaces.add(id);
        }
      }

      $form.change(function() {
        app.addPlaceToEdited(getId());
      });

      $places.on('click', '.place-item', function() {
        app.changePlace();
        app.selectPlace($(this));

        var curId = parseInt($(this).data('index'), 10);
        var curData = data.get(curId);

        app.setForm(curData);

        map.addMarker({
          lat : curData[2],
          lon : curData[3]
        }, curId);

        map.map.setView(new L.LatLng(curData[2], curData[3]), 14);

        setTimeout(function(){
          $form.scrollTop(0);
        },100);
      });

      if (location.hash) {
        const hash = location.hash.replace('#','');
        $places.find('#place-' + hash).click();
      }

      $('#submit').click(function(e){
        app.changePlace();
        $('#submit').addClass('disabled');

        editedPlaces.forEach(id => {
          $places.find('#place-' + id).removeClass('place-item_edited');

          const arr = data.get(id);
          const result = arr.join('||');

          setTimeout(function(result){

            console.log(result);

            $.get(urls.set + result, function(d) {
              $('#submit').removeClass('disabled');
            }).done(function() {
              $('#submit').removeClass('disabled');
            }).fail(function() {
              $('#submit').removeClass('disabled');
            });
          }, 100, result);
        });

        editedPlaces.clear();
      });
    });
});
