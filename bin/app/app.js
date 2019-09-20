$(function () {

  let SETTINGS = {
    "route": [{
      "name": "Ярославское направление",
      "id": 1
    }, {
      "name": "Казанское направление",
      "id": 2
    }, {
      "name": "Горьковское направление",
      "id": 3
    }, {
      "name": "Ленинградское направление",
      "id": 4
    }, {
      "name": "Киевское направление",
      "id": 5
    }, {
      "name": "Павелецкое направление",
      "id": 6
    }, {
      "name": "Рижское направление",
      "id": 7
    }, {
      "name": "Курское направление",
      "id": 8
    }, {
      "name": "Савёловское направление",
      "id": 9
    }, {
      "name": "Смоленское направление",
      "id": 10
    }],
    "type": [{
      "name": "вокзал",
      "id": 1
    }, {
      "name": "платформа",
      "id": 2
    }, {
      "name": "станция",
      "id": 3
    }, {
      "name": "разъезд",
      "id": 4
    }, {
      "name": "остановочный пункт",
      "id": 5
    }, {
      "name": "непассажирская станция",
      "id": 6
    }],
    "metro": [{
      "name": "Комсомольская",
      "stationId": 1
    }, {
      "name": "Комсомольская",
      "stationId": 671
    }, {
      "name": "Электрозаводская",
      "stationId": 681
    }, {
      "name": "Авиомоторная",
      "stationId": 701
    }, {
      "name": "Рязанский проспект",
      "stationId": 741
    }, {
      "name": "Выхино",
      "stationId": 751
    }, {
      "name": "Лермонтовский проспект",
      "stationId": 761
    }, {
      "name": "Курская",
      "stationId": 2101
    }, {
      "name": "Площадь Ильича",
      "stationId": 2111
    }, {
      "name": "Новогиреево",
      "stationId": 2141
    }, {
      "name": "Новокосино",
      "stationId": 2161
    }, {
      "name": "Комсомольская",
      "stationId": 2681
    }, {
      "name": "Петровско-Разумовская",
      "stationId": 2711
    }, {
      "name": "Киевская",
      "stationId": 3101
    }, {
      "name": "Павелецкая",
      "stationId": 3551
    }, {
      "name": "Тульская",
      "stationId": 3571
    }, {
      "name": "Нагатинская",
      "stationId": 3591
    }, {
      "name": "Варшавская",
      "stationId": 3601
    }, {
      "name": "Рижская",
      "stationId": 4001
    }, {
      "name": "Дмитровская",
      "stationId": 4011
    }, {
      "name": "Войковская",
      "stationId": 4041
    }, {
      "name": "Тушинская",
      "stationId": 4061
    }, {
      "name": "Курская",
      "stationId": 4421
    }, {
      "name": "Римская",
      "stationId": 4431
    }, {
      "name": "Текстильщики",
      "stationId": 4451
    }, {
      "name": "Царицыно",
      "stationId": 4501
    }, {
      "name": "Савёловская",
      "stationId": 4891
    }, {
      "name": "Тимирязевская",
      "stationId": 4901
    }, {
      "name": "Белорусская",
      "stationId": 5301
    }, {
      "name": "Беговая",
      "stationId": 5311
    }, {
      "name": "Международная",
      "stationId": 5321
    }, {
      "name": "Фили",
      "stationId": 5331
    }, {
      "name": "Кунцевская",
      "stationId": 5341
    }]
  }

  var leafletMap = L.map('app').setView([55.751244, 37.618423], 9);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png")
    .addTo(leafletMap);

  $.get('data/place.json', function (place) {
  $.get('bin/data/points.json', function (point) {
    $.get('bin/data/route.json', function (route) {
      dataBuild(point, route, place, render);
    });
  });
  });

  function render(point, route, place) {
    L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);

    function drawingOnCanvas(canvasOverlay, params) {
      var ctx = params.canvas.getContext('2d');
      ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
      ctx.fillStyle = 'rgba(255,116,0, 0.8)';

      ctx.globalAlpha = 0.2;

      for (var i = 0; i < route.length; i++) {
        var line = route[i].points;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0, 1)';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (var p = 0; p < line.length; p++) {

          var from = canvasOverlay._map.latLngToContainerPoint([line[p][1], line[p][0]]);
          var to = (line[p + 1]) ? canvasOverlay._map.latLngToContainerPoint([line[p + 1][1], line[p + 1][0]]) : from;

          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);

        }

        ctx.stroke();

      }

      ctx.globalAlpha = 1;

      for (var i = 0; i < point.length; i++) {
        var d = point[i].point;

        var m = (point[i].time.min < 10) ? '0' + point[i].time.min : '' + point[i].time.min
        var t = +(point[i].time.hours + m);


        if (point[i].count <= 20) {

          if (params.bounds.contains([d[1], d[0]])) {
            var dot = canvasOverlay._map.latLngToContainerPoint([d[1], d[0]]);
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath(); 
          }
        }
      }
      
      
      $.each(place, function(i,e){
      
        
          if (e.distance > 3.3){
            ctx.fillStyle = 'rgba(0, 118, 255, 0.4)';
          } else {
            ctx.fillStyle = 'rgba(255, 0, 108, 0.6)';
          }
        
          //if (params.bounds.contains([e[0], e[1]])) {
            
            var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath(); 
          //}
        
      });
      
      
      
    };
  }

  function dataBuild(point, route, place, render) {

    $.each(point, function (i, e) {

      e.route = (function (routeId) {
        var route = '';
        $.each(SETTINGS.route, function (i, e) {

          if (routeId == e.id) {
            route = e.name;
            return false;
          }

        });
        return route;

      })(e.routeId);

      e.type = (function (typeId) {
        var type = '';
        $.each(SETTINGS.type, function (i, e) {

          if (typeId == e.id) {
            type = e.name;
            return false;
          }

        })
        return type;
      })(e.typeId);

      e.time.num = (function (time) {

        var m = (time.min < 10) ? '0' + time.min : '' + time.min;
        return +(time.hours + '.' + m);

      })(e.time);

      e.metro = (function (id) {
        var metro = false;
        $.each(SETTINGS.metro, function (i, e) {

          if (e.stationId == id) {

            metro = e.name;
            return false;
          }

        });
        return metro;
      })(e.id);
      
      e.prev = [];
      e.next = [];

      $.each(point, function (i1, e1) {
        if (e.prevId[0]) $.each(e.prevId, function (o, s) {
          if (e1.id == s) {
            e.prev.push(e1);
            return false;
          }

        })

        if (e.nextId[0]) $.each(e.nextId, function (o, s) {
          if (e1.id == s) {
            e.next.push(e1);
            return false;
          }

        })

      });
      
      

    });
    
    window.PO = point;
    window.PL = place;

    render(point, route, place);

  }
  
  function calcDistance(lat1, lon1, lat2, lon2, unit) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344
        }
        if (unit == "N") {
          dist = dist * 0.8684
        }
        return dist;
      }
    }

});