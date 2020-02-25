__.selectOnMap = function (event, mapId, layer) {

  removeSelect();

  let DATA = $('#app').data('data'),
    dataPlaces = DATA.places,
    x = event.offsetX,
    y = event.offsetY,
    objects = '';

  

  if (layer && mapId == 'map') {

    

    $.each(DATA[layer], function (i, el) {



      if (el.canvas) {

        
        if (x > el.canvas[mapId].x1 - 10 &&
          x < el.canvas[mapId].x2 - 10 &&
          y > el.canvas[mapId].y1 - 10 &&
          y < el.canvas[mapId].y2 - 10) {

          objects += `<div data-type="${layer}" data-id="${el.id}" class="place-select__item place-select__item_object"><span class="icon icon_${layer}" data-ico="${el.type}"></span><span>${el.name}</span></div>`;

        }
      }

    });

  }


  //each places
  $.each(dataPlaces, function (i, el) {

    if (x > el.canvas[mapId].x1 - 10 &&
      x < el.canvas[mapId].x2 + 10 &&
      y > el.canvas[mapId].y1 - 10 &&
      y < el.canvas[mapId].y2 + 10 &&
      el.canvas.visible) {



      let folder = Math.floor(el.id / 100) * 100,
        url = `/places/${folder}/place_${el.id}/`,
        title = (el.type) ? el.type + ' ' + el.name : el.name;

      objects += `<a class="place-select__item place-select__item_place" data-id="${el.id}" href="${url}">${title}</a>`;



    }

  });

  if (objects) {

    $('#map-controls').append(`<div class="place-select">${objects}</div>`);

    let posX = x - 16;
    let posY = y - 16;
    let rect = $('#map')[0].getBoundingClientRect();
    let r = $('#map-controls .place-select')[0].getBoundingClientRect();

    $('#map-controls .place-select').css({
      left: (posX + r.width > rect.width) ? (rect.width - r.width) + 'px' : posX + 'px',
      top: (posY + r.height > rect.height) ? (rect.height - r.height) + 'px' : posY + 'px'
    });

    setTimeout(function () {
      $('#map-controls .place-select').addClass('place-select_visible')
    }, 10);

  }

  __.fs.event.bind('.place-select', 'mouseleave', function (e) {
    removeSelect();
  });

  __.fs.event.bind('.place-select__item', 'click', function (e) {
    e.preventDefault();
    removeSelect();


    if ($(this).is('.place-select__item_place')) {

      __.fs.placeGet($(this).data('id'), function (data, url) {

        __.fs.analytics('select_place', {

          place_id: data.id,
          place_name: data.name,
          place_url: url,
          target: 'map'

        });

        __.detailScreen({ place: data });


      });

    }

    if ($(this).is('.place-select__item_object')) {

      let id = $(this).data('id');
      let type = $(this).data('type');

      

      __.fs.mapObjectGet(id, type, function (data) {


        __.mapObjectInfo(data, type, mapId);

      });

    }

  });

  function removeSelect() {
    $('#map-controls').find('.place-select').remove();
  }



}