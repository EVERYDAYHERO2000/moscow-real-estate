
function createMap(data, activePointId){

    const pointSize = 6;

    __this = this;
    this.data = data;
    this.points = {};
    this.addPlaceMode = false; 
    this.activePointId = activePointId || null;

    var map = L.map('map').setView([55.751244, 37.618423], 9);
    this.map = map;


    var canvas = L.canvasOverlay().drawing(drawingOnCanvas);
    this.canvas = canvas;

    map.addLayer(canvas);

    this.marker = null; 
    

    function traffic () {
		// https://tech.yandex.ru/maps/jsbox/2.1/traffic_provider
		var actualProvider = new ymaps.traffic.provider.Actual({}, { infoLayerShown: true });
		actualProvider.setMap(this._yandex);
	}

	var baseLayers = {
		'Yandex map': L.yandex() // 'map' is default
			.addTo(map),
		'Yandex map + Traffic': L.yandex('map')
			.on('load', traffic),
		'Yandex satellite':  L.yandex({ type: 'satellite' }), // type can be set in options
		'Yandex hybrid':     L.yandex('hybrid'),
		'OSM': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		})
	};

	var overlays = {
        'Traffic': L.yandex('overlay').on('load', traffic)
        
    };

    L.control.layers(baseLayers,overlays).addTo(map);

    var customControl =  L.Control.extend({        
        options: {
          position: 'topleft'
        },
  
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
     
          container.style.backgroundColor = 'white'; 
          container.style.backgroundSize = "30px 30px";
          container.style.width = '30px';
          container.style.height = '30px';
          container.innerText = "Add";
          container.style.textAlign = "center"
          container.style.display = "flex"
          container.style.justifyContent = "center";
          container.style.alignItems = "center"; 
          container.style.cursor = "pointer"; 
  
          container.onclick = function(){
            
            if (!__this.addPlaceMode) {
                __this.addPlaceMode = true;
                
            } else {
                __this.addPlaceMode = false;
            }

          }
  
          return container;
        }
      });

      map.addControl(new customControl());


    $('#map').click(function(e){

        var clickPoint = {
            x : e.clientX,
            y : e.clientY
        }

        var offset = $('#map').offset()

        if (__this.addPlaceMode){

            if (!e.target.className.includes('leaflet-control')){

                var latLng = __this.canvas._map.containerPointToLatLng({
                    x:clickPoint.x - offset.left, 
                    y:clickPoint.y - offset.top
                });
                
                __this.addMarker({
                    lat : latLng.lat,
                    lon : latLng.lng
                }, app.maxId + 1);

                 

                __this.canvas._redraw();

                var place = new Array(30);
                place[0] = app.maxId;
                place[1] = 'Новый посёлок';
                place[2] = latLng.lat;
                place[3] = latLng.lng

                app.changePlace();

                app.addPlace(place);

                app.setForm(place);

                __this.addPlaceMode = false;

            }

        } else {

            if (e.target.className.includes('leaflet-heatmap-layer')){
                
                

                for (var id in __this.points){

                    if (clickPoint.x >= __this.points[id].x + offset.left && 
                        clickPoint.x <= __this.points[id].x + offset.left + pointSize && 
                        clickPoint.y >= __this.points[id].y + offset.top && 
                        clickPoint.y <= __this.points[id].y + offset.top + pointSize ) {
                        
                        __this.activePointId = id;
                        __this.addMarker( __this.points[id], id );
                        __this.canvas._redraw();


                        //////    
                            $('.place-item_selected').removeClass('place-item_selected');
                            $('#place-' + id ).addClass('place-item_selected');
                            $('#places').scrollTop(0).scrollTop( $('#place-' + id ).offset().top );

                            app.changePlace();

                            for (var i=1; i < __this.data.length; i++){    
                                if (id == __this.data[i][0]) {
                                    app.setForm(__this.data[i]);
                                }    
                            }
                        //////        
                    }

                }

            }

        }

    });


    this.addMarker = function(pos, id){

        if (__this.marker) __this.map.removeLayer(__this.marker);
        
        var myIcon = L.divIcon({className: 'my-div-icon'});
        __this.marker = new L.marker([pos.lat,pos.lon], {draggable:'true', icon: myIcon});
        
        __this.marker.on('dragend', function(event){
            var marker = event.target;
            var position = marker.getLatLng();
            marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
            __this.map.panTo(new L.LatLng(position.lat, position.lng));
          
            for (var i = 1; i < __this.data.length; i++){

                if (id == __this.data[i][0]){

                    __this.data[i][2] = position.lat,
                    __this.data[i][3] = position.lng

                    /////

                        $('#place-' + id).addClass('place-item_edited');

                    /////
                }

            }
            $('#row_2 .row-control input').first().val( position.lat ); //lat
            $('#row_2 .row-control input').last().val( position.lng ); //lon  
            $('#row_2 .row-title a').attr( 'href', `https://yandex.ru/maps/?ll=${position.lng}%2C${position.lat}&z=14&mode=whatshere&whatshere%5Bpoint%5D=${position.lng}%2C${position.lat}` ); //YA maps
            $('#row_4 .row-title a').attr( 'href', `https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=${position.lat}%2C${position.lng}` ); //Cian
          
        });

        __this.map.addLayer(__this.marker);

    }

    function drawingOnCanvas(p) {

        let ctx = p._canvas.getContext('2d');

        
        
        ctx.clearRect(0, 0, p._canvas.width, p._canvas.height);
  
        

        for (var i = 1; i < __this.data.length; i++){

            if (!__this.data[i][2] || !__this.data[i][3]) continue;

            var point = [__this.data[i][2], __this.data[i][3]];

                      

            var dot = p._map.latLngToContainerPoint([point[0], point[1]]);

            __this.points[__this.data[i][0]] = {
                x : dot.x,
                y : dot.y,
                lat : __this.data[i][2],
                lon : __this.data[i][3]
            }    

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255,.5)';
            ctx.fillStyle = (__this.activePointId == __this.data[i][0] ) ? 'rgba(55, 110, 200,.3)' : 'rgba(55, 110, 200,.8)';
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, pointSize / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

        }
                
    };

    return this;
}