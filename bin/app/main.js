var __={core:{},fs:{}}; "use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var a=[],n=!0,i=!1,o=void 0;try{for(var c,s=t[Symbol.iterator]();!(n=(c=s.next()).done)&&(a.push(c.value),!e||a.length!==e);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}return a}}function _arrayWithHoles(t){if(Array.isArray(t))return t}L.CanvasOverlay=L.Class.extend({initialize:function(t,e){this._userDrawFunc=t,L.setOptions(this,e)},drawing:function(t){return this._userDrawFunc=t,this},params:function(t){return L.setOptions(this,t),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(t){this._map=t,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y;var a=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(a?"animated":"hide")),t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._resize,this),t.options.zoomAnimation&&L.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._canvas),t.off("moveend",this._reset,this),t.off("resize",this._resize,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(t){return t.addLayer(this),this},_resize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t),this._redraw()},_redraw:function(){var t=this._map.getSize(),e=this._map.getBounds(),a=180*t.x/(20037508.34*(e.getEast()-e.getWest())),n=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:e,size:t,zoomScale:a,zoom:n,options:this.options}),this._frame=null},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),a=this._map._getCenterOffset(t.center)._multiplyBy(-e).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(a)+" scale("+e+")"}}),L.canvasOverlay=function(t,e){return new L.CanvasOverlay(t,e)},function(){var i={ru:{touch:"Коснитесь двумя для перемещения по карте",scroll:"Чтобы изменить масштаб, нажмите ctrl + прокрутка",scrollMac:"Чтобы изменить масштаб, нажмите ⌘ + прокрутка"}};L.Map.mergeOptions({gestureHandlingOptions:{text:{},duration:1e3}});var e=!1,t=L.Handler.extend({addHooks:function(){this._handleTouch=this._handleTouch.bind(this),this._setupPluginOptions(),this._setLanguageContent(),this._disableInteractions(),this._map._container.addEventListener("touchstart",this._handleTouch),this._map._container.addEventListener("touchmove",this._handleTouch),this._map._container.addEventListener("touchend",this._handleTouch),this._map._container.addEventListener("touchcancel",this._handleTouch),this._map._container.addEventListener("click",this._handleTouch),L.DomEvent.on(this._map._container,"mousewheel",this._handleScroll,this),L.DomEvent.on(this._map,"mouseover",this._handleMouseOver,this),L.DomEvent.on(this._map,"mouseout",this._handleMouseOut,this),L.DomEvent.on(this._map,"movestart",this._handleDragging,this),L.DomEvent.on(this._map,"move",this._handleDragging,this),L.DomEvent.on(this._map,"moveend",this._handleDragging,this)},removeHooks:function(){this._enableInteractions(),this._map._container.removeEventListener("touchstart",this._handleTouch),this._map._container.removeEventListener("touchmove",this._handleTouch),this._map._container.removeEventListener("touchend",this._handleTouch),this._map._container.removeEventListener("touchcancel",this._handleTouch),this._map._container.removeEventListener("click",this._handleTouch),L.DomEvent.off(this._map._container,"mousewheel",this._handleScroll,this),L.DomEvent.off(this._map,"mouseover",this._handleMouseOver,this),L.DomEvent.off(this._map,"mouseout",this._handleMouseOut,this),L.DomEvent.off(this._map,"movestart",this._handleDragging,this),L.DomEvent.off(this._map,"move",this._handleDragging,this),L.DomEvent.off(this._map,"moveend",this._handleDragging,this)},_handleDragging:function(t){"movestart"==t.type||"move"==t.type?e=!0:"moveend"==t.type&&(e=!1)},_disableInteractions:function(){this._map.dragging.disable(),this._map.scrollWheelZoom.disable(),this._map.tap&&this._map.tap.disable()},_enableInteractions:function(){this._map.dragging.enable(),this._map.scrollWheelZoom.enable(),this._map.tap&&this._map.tap.enable()},_setupPluginOptions:function(){this._map.options.gestureHandlingText&&(this._map.options.gestureHandlingOptions.text=this._map.options.gestureHandlingText)},_setLanguageContent:function(){var t;if(this._map.options.gestureHandlingOptions&&this._map.options.gestureHandlingOptions.text&&this._map.options.gestureHandlingOptions.text.touch&&this._map.options.gestureHandlingOptions.text.scroll&&this._map.options.gestureHandlingOptions.text.scrollMac)t=this._map.options.gestureHandlingOptions.text;else{var e=this._getUserLanguage();i[e=e||"ru"]&&(t=i[e]),t||-1===e.indexOf("-")||(e=e.split("-")[0],t=i[e]),t=t||i[e="ru"]}var a=!1;0<=navigator.platform.toUpperCase().indexOf("MAC")&&(a=!0);var n=t.scroll;a&&(n=t.scrollMac),this._map._container.setAttribute("data-gesture-handling-touch-content",t.touch),this._map._container.setAttribute("data-gesture-handling-scroll-content",n)},_getUserLanguage:function(){return navigator.languages?navigator.languages[0]:navigator.language||navigator.userLanguage},_handleTouch:function(t){for(var e=["leaflet-control-minimap","leaflet-interactive","leaflet-popup-content","leaflet-popup-content-wrapper","leaflet-popup-close-button","leaflet-control-zoom-in","leaflet-control-zoom-out"],a=!1,n=0;n<e.length;n++)L.DomUtil.hasClass(t.target,e[n])&&(a=!0);a?L.DomUtil.hasClass(t.target,"leaflet-interactive")&&"touchmove"===t.type&&1===t.touches.length?(L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling-touch-warning"),this._disableInteractions()):L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-touch-warning"):"touchmove"===t.type||"touchstart"===t.type?1===t.touches.length?(L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling-touch-warning"),this._disableInteractions()):(this._enableInteractions(),L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-touch-warning")):L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-touch-warning")},_isScrolling:!1,_handleScroll:function(t){t.metaKey||t.ctrlKey?(t.preventDefault(),L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-scroll-warning"),this._map.scrollWheelZoom.enable()):(L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling-scroll-warning"),this._map.scrollWheelZoom.disable(),clearTimeout(this._isScrolling),this._isScrolling=setTimeout(function(){for(var t=document.getElementsByClassName("leaflet-gesture-handling-scroll-warning"),e=0;e<t.length;e++)L.DomUtil.removeClass(t[e],"leaflet-gesture-handling-scroll-warning")},this._map.options.gestureHandlingOptions.duration))},_handleMouseOver:function(t){this._enableInteractions()},_handleMouseOut:function(t){e||this._disableInteractions()}});L.Map.addInitHook("addHandler","gestureHandling",t)}();var runApp=function(){__.core=__.fs.coreModuls(["$window","$app","$header","$map","$places","$placeSearch","$mapControls"]);var t=window.location.pathname;"/"!=t&&"/index.html"!=t||$.get("bin/data/data.json",function(t){var e=__.fs.decodeData(t);__.core.$app.data("data",e),__.core.$map.trigger("createMap").trigger("renderMap",{data:e})}),t.includes("/places/")&&__.detailScreen()};__.core.$app=function(){return $("#app").data("browser",__.fs.browserDetect()).addClass(function(){var t=$(this).data("browser");return[t.browserName,t.platform,t.isMobile].join(" ")}),$("#app")},__.core.$header=function(){return $("#change-view").click(function(){"На карте"!=$(this).text()?$(this).text("На карте"):$(this).text("Списком"),$("#main").toggleClass("main_screen-2"),__.fs.analytics("change_view",{change_to:$(this).text()})}),$("#header")},__.core.$map=function(){return $("#map").click(function(t){var e=$(this).attr("id");$(t.target).is("canvas")&&__.selectOnMap(t,e,$("#select-layer").val())}).bind("createMap",function(t){var e=__.fs.mapTiles,a=$(t.target).attr("id"),n=L.map(a).setView([55.751244,37.618423],9),i=L.tileLayer(e.dark).addTo(n);n.search=!1,$(t.target).data("map",n),$(t.target).data("tiles",i),$(t.target).data("tileset",e),n.on("dragstart zoomstart",function(t){$("#map-controls").find(".place-select").remove()}),$(".leaflet-bar").find("a").each(function(t,e){$(e).click(function(t){t.preventDefault(),$("#app").scrollTop(0)})})}).bind("renderMap",function(t,s){var r=this,l=s.data.places,e=$(t.target).data("map"),a=L.canvasOverlay().drawing(function(a,t){var n=t.canvas.getContext("2d"),i=$(r).data("map").getZoom(),o=$(r).attr("id");n.clearRect(0,0,t.canvas.width,t.canvas.height);var e=$("#select-layer").val(),c=$("#map").data("tileset");__.mapData()[e](function(){$.each(l,function(t,e){e.canvas.visible&&(e.canvas=__.placePoint({mapId:o,ctx:n,canvasOverlay:a,zoom:i,place:e}))}),__.mapOverlay()[e](s,a,n,i,o),__.mapTiles(c)[e]()})}).addTo(e);$(r).data("canvas",a)}),$("#map")},__.core.$mapControls=function(){$("#map-controls").bind("create",function(t){var e={default:{title:"Карта"},eco:{title:"Экология",selected:!0},railroad:{title:"Электрички"},car:{title:"Автомобиль"},markets:{title:"Магазины"}},n="";$.each(e,function(t,e){var a=e.selected?"selected":"";n+="<option ".concat(a,' value="').concat(t,'">').concat(e.title,"</option>")});var a=$('<select data-ico="eco" id="select-layer" class="select">'.concat(n,"</select>")).data("options",e).change(function(t){var e=$(this).data("options"),a=$(this).val();$(this).attr("data-ico",a),$.each(e,function(t,e){e.selected=a==t}),$("#map").data("canvas").redraw(),__.fs.analytics("change_map-mode",{mode:a})});$(this).find(".layers-controls").append(a)}).trigger("create")},__.core.placeScreen=function(){},__.core.$placeSearch=function(){return $("#place-search").bind("search",function(t,e){var a=$(this).find("input").val();__.search({text:a}),__.fs.analytics("search_place",{value:$(this).find("input").val()})}).keyup(function(t){var e=t.which;13==e&&t.preventDefault(),32!=e&&13!=e&&188!=e&&186!=e||$(this).trigger("search")}).find("button").click(function(t){$(this).trigger("search")}),$("#place-search")},__.core.$places=function(){var s=!1;return $("#places").on("click",".place-item",function(t){t.preventDefault();$("#app").data("data").places,$("#map").data("map");var e=$(t.currentTarget).data("id").split("-")[1];$(".place-item").not(this).removeClass("place-item_active"),$(this).is(".place-item_active")?($(this).removeClass("place-item_active"),$("#detail-screen").remove()):($(this).addClass("place-item_active"),__.fs.placeGet(e,function(t,e){__.fs.analytics("select_place",{place_id:t.id,place_name:t.name,place_url:e,target:"list"}),__.detailScreen(t)}))}),$("#places").scroll(function(t){var e=this,a=$(e).find(".place-item").last(),n=(a.data("id").split("-")[1],$(e).find(".place-item").length),i=$("#map").data("map");if(i&&!i.search&&a.offset().top<2*$(window).outerHeight()){var o=function(t,a,n,i){$.each(t,function(t,e){if(i<t&&($(a).append(__.placeItem(e)),n--),!n)return!1})},c=$("#app").data("data").places;c[0].railroad.closest.name||s?o(c,e,100,n):(s=!0,$.get("/bin/data/railroad.json",function(t){$.each(t,function(t,e){if(window.DATA.railroad[e.id])for(var a in e)window.DATA.railroad[e.id][a]=e[a];else window.DATA.railroad[e.id]=e}),$("#app").data("data",window.DATA),o(c,e,100,n)}))}}).bind("renderList",function(t,e){var a=this,n=e.onlyVisible||!1,i=e.places;$(a).empty(),$.each(i,function(t,e){if(n)e.canvas.visible&&$(a).append(__.placeItem(e));else{if(!(t<100))return!1;$(a).append(__.placeItem(e))}})}),$("#places")},__.core.$window=function(){var e=$("#header").outerHeight();window.innerHeight;function a(){$("#app").css({height:$(window).innerHeight()+"px"}),$("#main").css({height:"calc(100% - ".concat(e,"px)")});var t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(t,"px"))}return a(),$(window).resize(function(t){a()}),$(window)},__.cost=function(t){var e=t.value;return e=/\.\d/.test(e)?e+"":e+".00",(e=(e=/\.\d{2}/.test(e)?e:e+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.detailScreen=function(a){var t,e,n,i,o,c,s,r,l,d,p,m,u,h="",_="";if(a){var f=a.id,v=a.name,g=a.description,w=a.type?"<span>".concat(a.type,"</span>"):"",b=M("Класс",a.class,function(t){return t}),y=E("Адрес",(u=a.address.name?a.address.name:"На карте",'<a href="#place-map">'.concat(u,"</a>"))),x=M("Ближайший город",a.city.closest.name,function(t){return"".concat(t," в ").concat(a.city.distance,"км")}),k=M("Расстояние от Москвы",a.moscow.distance,function(t){return"".concat(t,"км")}),A=M("На автомобиле до Москвы",a.car.distance,function(t){return"".concat(t,"км<br> ").concat(a.car.time.h,"ч ").concat(a.car.time.m,"мин без учета пробок")}),D=M("Ближайшая ж/д станция",a.railroad.closest.name,function(t){return"".concat(t," в ").concat(a.railroad.distance,"км<br> до Москвы ").concat(a.railroad.closest.time.h,"ч ").concat(a.railroad.closest.time.m,"мин")}),T=M("Ближайший крупный магазин сети",a.markets.closest.name,function(t){return"".concat(t," в ").concat(a.markets.distance,"км")}),O=M("Ближайший источник загрязнения",a.eco.closest.name,function(t){var e=a.eco.closest.description?"<br>".concat(a.eco.closest.description):"";return"".concat(a.eco.distance,"км<br>").concat(t," ").concat(e)}),I=(d=a.price,p={from:d.from?"undefined"!=typeof global?global.component("cost",{value:d.from})[0]:__.cost({value:d.from})[0]:"",to:d.to?"undefined"!=typeof global?global.component("cost",{value:d.to})[0]:__.cost({value:d.to})[0]:""},(m=(d.from?"от ".concat(p.from,"руб. "):"")+(d.to?"<br>до ".concat(p.to,"руб."):""))?M("Цена",m,function(t){return t}):""),C=M("Застройщик",a.developer,function(t){return t}),j=M("Сайт",a.site,function(t){return H(t,t)}),z=M("Ближайшая станция скорой помощи Москвы и Московской области",a.medic.closest,function(t){return"".concat(a.medic.distance,"км<br>").concat(a.medic.closest.name)}),S=(t=a.point,e=t[1]+.00304,n=t[1]-.00304,i=t[0]-.009066,o=t[0]+.009066,s=U("".concat(c="https://","cian.ru/map/"),{deal_type:"sale",engine_version:2,"object_type[0]":1,offer_type:"suburban",zoom:16,center:"".concat(t[1],",").concat(t[0])}),r=U("".concat(c,"realty.yandex.ru/moskovskaya_oblast/kupit/dom/karta/"),{leftLongitude:i,topLatitude:e,rightLongitude:o,bottomLatitude:n}),l=U("".concat(c,"www.avito.ru/moskva/doma_dachi_kottedzhi"),{map:btoa(JSON.stringify({searchArea:{latBottom:n,latTop:e,lonLeft:i,lonRight:o}}))}),E("Предложения","".concat(H(s,"Циан"),"<br>").concat(H(r,"Яндекс.Недвижимость"),"<br>").concat(H(l,"Авито","on-mobile_hide"))));_='<div class="close-icon" id="close-panel"></div> <h1>'.concat(w," <span>").concat(v,"</span></h1><p>").concat(g,'</p><div class="panel__content content"> <section> ').concat(b," ").concat(I," ").concat(C," ").concat(j," ").concat(y," ").concat(k," ").concat(S," </section> <section> <h2>Транспорт</h2> ").concat(A," ").concat(D," </section> <section> <h2>Инфраструктура</h2> ").concat(x," ").concat(T," ").concat(z," </section> <section> <h2>Экология</h2> ").concat(O,' </section> <section> <div id="place-map" class="map"></map> </section></div> '),h='<div id="detail-screen" data-id="'.concat(f,'" class="panel panel_detail"> <div class="header-mobile"> <a href="/" id="close-screen" class="btn btn_back">Назад</a> </div> <div class="panel__container"> ').concat(_," </div></div>")}else h=$("#detail-screen")[0].outerHTML;function M(t,e,a){return e?E(t,a(e)):""}function E(t,e){return'<div class="content__item"> <div class="content__item-title">'.concat(t,'</div> <div class="content__item-value">').concat(e,"</div> </div>")}function H(t,e,a,n){return n=n?'data-link="'.concat(n,'"'):"",a=a?'class="'.concat(a,'"'):"","<a ".concat(a," ").concat(n,' rel="noreferrer noopener nofollow" target="_blank" href="').concat(t,'">').concat(e,"</a>")}function U(t,e){t=t+"?"||"";var i=encodeURIComponent;return t+Object.entries(e).map(function(t){var e=_slicedToArray(t,2),a=e[0],n=e[1];return"".concat(i(a),"=").concat(i(n))}).join("&")}if("undefined"==typeof global){var P=__.core.$detailScreen?__.core.$detailScreen:$(h);a&&P.find(".panel__container").empty().append(_),setTimeout(function(){if($("#place-map").length){var e=function(){var t=new L.marker([a.point[1],a.point[0]],{icon:L.divIcon({className:"place-marker"})}),i=L.map("place-map",{center:[a.point[1],a.point[0]],zoom:14,gestureHandling:!0});L.tileLayer(__.fs.mapTiles.simple).addTo(i),i.addLayer(t);L.canvasOverlay().drawing(function(t,e){var a=e.canvas.getContext("2d"),n=i.getZoom();a.clearRect(0,0,e.canvas.width,e.canvas.height),__.mapData().eco(function(){__.mapOverlay().eco({data:o},t,a,n,"place-map")}),__.mapData().railroad(function(){__.mapOverlay().railroad({data:o},t,a,n,"place-map")})}).addTo(i)};$("#place-map").empty();var o=$("#app").data("data");o?e():(a=a||null,$.get("/bin/data/data.json",function(t){o=__.fs.decodeData(t),id=$("#detail-screen").data("id"),console.log(o),$.each(o.places,function(t,e){if(e.id==id)return a=e,!1}),a&&e()}))}},100),P.find("a").click(function(t){var e=$(this).attr("href");e.includes("cian.ru")&&__.fs.analytics("cta_go-to-store",{store:"cian"}),e.includes("realty.yandex.ru")&&__.fs.analytics("cta_go-to-store",{store:"yandex"}),e.includes("avito.ru")&&__.fs.analytics("cta_go-to-store",{store:"avito"})}),P.find("#close-screen, #close-panel").click(function(t){t.preventDefault(),$("#main").find("#detail-screen").remove(),__.fs.analytics("close_detail-screen")}),__.core.$detailScreen=P,$("#detail-screen").length||$("#main").append(P)}return h},__.logo=function(t){var e=t.title?t.title:'<span class="header__title">Найти коттеджный посёлок</span>';return'<div class="header__logo"> <a href="/"><img alt="myhousehub" class="header__icon" src="/source/assets/img/myhousehub.svg" /></a> <div> <div class="header__sitename">MYHOUSEHUB</div> '.concat(e," </div> </div>")},__.mapData=function(){var t=$("#app").data("data");function e(n,e){t.places[0][n].closest.name?e():$.get("/bin/data/".concat(n,".json"),function(t){$.each(t,function(t,e){if(window.DATA[n][e.id])for(var a in e)window.DATA[n][e.id][a]=e[a];else window.DATA[n][e.id]=e}),$("#app").data("data",window.DATA),e()})}return this.eco=function(t){e("eco",t)},this.railroad=function(t){e("railroad",t)},this.markets=function(t){e("markets",t)},this.car=function(t){t()},this.default=function(t){t()},this},__.mapObjectInfo=function(t,e,a){var n,i=$("#"+a),o="",c="",s="";"eco"==e&&(c=t.name,s=t.description?t.description:"",o='<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'.concat(e,'" data-ico="').concat(t.type,'"></div> <div class="map-object-info__content"> <span class="map-object-info__title">').concat(c,'</span> <p class="map-object-info__description">').concat(s,'</p> </div> <div> <div class="close-icon"></div></div>')),"markets"==e&&(o='<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'.concat(e,'" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">').concat(t.name,'</span> <p class="map-object-info__description">').concat(t.address,"</p> </div> </div></div>")),"railroad"==e&&(c="".concat(t.type?(n=t.type).charAt(0).toUpperCase()+n.slice(1):"Станция"," «").concat(t.name,"» (").concat(t.route,")"),s="До Москвы ".concat(t.distance,"км, ").concat(t.count," станция от Москвы. В пути ").concat(t.time.h,"ч ").concat(t.time.m,"мин."),o='<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'.concat(e,'" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">').concat(c,'</span> <p class="map-object-info__description">').concat(s,'</p> </div> </div> <div class="close-icon"></div></div>')),$("body").on("click",".map-object-info .close-icon",function(t){$(".map-object-info").remove()}),i.find(".map-object-info").remove(),i.append(o)},__.mapOverlay=function(t,e,a,n,i){var l=__.fs.mapSprites(2),o="/source/assets/img/map/pins@".concat(2,"x.png"),d=d=new Image;function p(t,e){return __.core.$map.data("icons")?e(__.core.$map.data("icons")):t.addEventListener("load",function(){__.core.$map.data("icons",t),e(t)}),t}function m(t,e,a,n,i,o,c){var s=a._map.latLngToContainerPoint([t.point[1],t.point[0]]),r={x1:s.x,x2:s.x+c,y1:s.y,y2:s.y+c};return o&&e.drawImage(n,0,o,i,i,s.x-c/2,s.y-c/2,c,c),r}return d.src=o,this.default=function(){return!1},this.markets=function(t,o,c,s,r){var e=t.data.markets;return p(d,function(i){$.each(e,function(t,e){var a="";9<s&&(a=l.point_green),11<s&&(a=l.markets);var n=m(e,c,o,i,40,a,26);e.canvas=e.canvas||{},e.canvas[r]=n})}),!1},this.railroad=function(t,c,s,o,r){var e=t.data.railroad;return $.each(e,function(t,e){if(e.path){var a=e.path.points;s.beginPath(),s.strokeStyle="rgba(0, 196, 255, 0.5)",s.lineWidth=1,s.lineJoin="round",s.lineCap="round";for(var n=0;n<a.length;n++){var i=c._map.latLngToContainerPoint([a[n][1],a[n][0]]),o=a[n+1]?c._map.latLngToContainerPoint([a[n+1][1],a[n+1][0]]):i;s.moveTo(i.x,i.y),s.lineTo(o.x,o.y)}s.stroke()}}),p(d,function(i){$.each(e,function(t,e){var a="";9<o&&(a=l.point_blue),11<o&&(a=l.railroad);var n=m(e,s,c,i,40,a,26);e.canvas=e.canvas||{},e.canvas[r]=n})}),!1},this.car=function(){return!1},this.eco=function(t,o,c,s,r){var e=t.data.eco;p(d,function(i){$.each(e,function(t,e){var a=null;9<s?(6==e.type&&(a=l.recicle),10==e.type&&(a=l.airport),7!=e.type&&9!=e.type||(a=l.trash),2!=e.type&&1!=e.type||(a=l.radiation),8!=e.type&&11!=e.type||(a=l.factory),5==e.type&&(a=l.water),4==e.type&&(a=l.energy),3==e.type&&(a=l.power),12==e.type&&(a=l.black_mesa),13==e.type&&(a=l.army)):a=l.point_yellow;var n=m(e,c,o,i,40,a,26);e.canvas=e.canvas||{},e.canvas[r]=n})})},this},__.mapTiles=function(t){var e=t.simple,a=t.dark,n=__.core.$map,i=n.data("tiles"),o="map_dark",c="map_light";function s(t,e){return n.removeClass(t).addClass(e),!1}function r(t){i._url!=t&&i.setUrl(t)}return this.default=function(){r(e),s(o,c)},this.markets=function(){r(a),s(c,o)},this.eco=function(){r(a),s(c,o)},this.railroad=function(){r(a),s(c,o)},this.car=function(){r(a),s(c,o)},this},__.miniMap=function(t){var e=[55.751244,37.618423],a=[t.lat,t.lon],n=[],i=1,o=1;return i=a[0]<e[0]?(n[0]=e[0]-a[0],1):(n[0]=a[0]-e[0],-1),o=a[1]<e[1]?(n[1]=a[1]-e[1],1):(n[1]=e[1]-a[1],-1),n[0]=80*n[0]/360*180*i,n[1]=80*n[1]/180*30*o,n[0]=n[0]<-40?-40:n[0],n[0]=40<n[0]?40:n[0],n[1]=n[1]<-40?-40:n[1],n[1]=40<n[1]?40:n[1],'<div class="mini-map"> <div class="mini-map__marker" style="transform: translate('.concat(n[1],"px, ").concat(n[0],'px)"></div> </div>')},__.placeItem=function(t){var e="undefined"!=typeof global?global.component("mini-map",{lat:t.point[1],lon:t.point[0]}):__.miniMap({lat:t.point[1],lon:t.point[0]}),a=t.type?'<span class="place-item__type">'.concat(t.type,"</span>"):"",n='<div class="place-item__car">до Москвы: '.concat(t.car.time.h,"ч ").concat(t.car.time.m,"мин (").concat(t.car.distance,"км)</div>"),i=t.railroad.distance<3?'<div class="place-item__train">ст. '.concat(t.railroad.closest.name," в ").concat(t.railroad.distance,"км,<br>до Москвы: ").concat(t.railroad.closest.time.h,"ч ").concat(t.railroad.closest.time.m,"мин (").concat(t.railroad.closest.distance,"км)</div>"):"",o=100*Math.floor(t.id/100),c="./places/".concat(o,"/place_").concat(t.id,"/index.html"),s='<div class="place-item" data-id="place-'.concat(t.id,'"> <div class="place-item__content"> <div class="place-item__title"> <a href="').concat(c,'">').concat(a,'<span class="place-item__name">').concat(t.name,'</a></span> </div> <div class="place-item__distance"> ').concat(n," ").concat(i," </div> </div> ").concat(e,"</div>");return"undefined"==typeof global&&__.fs.event.bind(".place-item","click",function(t){}),s},__.placePoint=function(t){var e=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[t.zoom].s,a=$("#select-layer").val(),n=__.fs.colorize()[a](t.place);t.ctx.fillStyle=n,10<t.zoom&&(t.ctx.lineWidth=1,t.ctx.strokeStyle="rgba(255, 255, 255,.5)",t.ctx.stroke()),11<t.zoom&&(t.ctx.lineWidth=1,t.ctx.strokeStyle="rgb(255, 255, 255)",t.ctx.stroke());var i=t.canvasOverlay._map.latLngToContainerPoint([t.place.point[1],t.place.point[0]]);return t.ctx.beginPath(),t.ctx.arc(i.x,i.y,e/2,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),t.place.canvas[t.mapId]={x1:i.x,y1:i.y,x2:i.x+e,y2:i.y+e},t.place.canvas.color=n,t.place.canvas},__.search=function(t){var e=$("#app").data("data").places,a=[],n=[],i=$("#map").data("map"),o=new __.fs.substringSearch({multiply:!1}),c={};return t.text?(a=o.inArray(t.text,e,function(t){return t.name},function(t){t.canvas.visible=!0},function(t){t.canvas.visible=!1}),i.search=!!a.length,$.each(a,function(t,e){c[e.res.obj.id]||(c[e.res.obj.id]=!0,n.push(e.res.obj))}),$("#places").trigger("renderList",{places:n,onlyVisible:!0}).scrollTop(0)):(i.search=!1,$.each(e,function(t,e){e.canvas.visible=!0}),$("#places").trigger("renderList",{places:e,onlyVisible:!1})),$("#map").data("canvas").redraw(),n},__.select=function(t){},__.selectOnMap=function(t,o,a){m();var e=$("#app").data("data"),n=e.places,c=t.offsetX,s=t.offsetY,r="";if(a&&"map"==o&&$.each(e[a],function(t,e){c>e.canvas[o].x1-10&&c<e.canvas[o].x2-10&&s>e.canvas[o].y1-10&&s<e.canvas[o].y2-10&&(r+='<div data-type="'.concat(a,'" data-id="').concat(e.id,'" class="place-select__item place-select__item_object"><span class="icon icon_').concat(a,'" data-ico="').concat(e.type,'"></span><span>').concat(e.name,"</span></div>"))}),$.each(n,function(t,e){if(c>e.canvas[o].x1-10&&c<e.canvas[o].x2+10&&s>e.canvas[o].y1-10&&s<e.canvas[o].y2+10&&e.canvas.visible){var a=100*Math.floor(e.id/100),n="./places/".concat(a,"/place_").concat(e.id,"/index.html"),i=e.type?e.type+" "+e.name:e.name;r+='<a class="place-select__item place-select__item_place" data-id="'.concat(e.id,'" href="').concat(n,'">').concat(i,"</a>")}}),r){$("#map-controls").append('<div class="place-select">'.concat(r,"</div>"));var i=c-16,l=s-16,d=$("#map")[0].getBoundingClientRect(),p=$("#map-controls .place-select")[0].getBoundingClientRect();$("#map-controls .place-select").css({left:i+p.width>d.width?d.width-p.width+"px":i+"px",top:l+p.height>d.height?d.height-p.height+"px":l+"px"})}function m(){$("#map-controls").find(".place-select").remove()}__.fs.event.bind(".place-select","mouseleave",function(t){m()}),__.fs.event.bind(".place-select__item","click",function(t){if(t.preventDefault(),m(),$(this).is(".place-select__item_place")&&__.fs.placeGet($(this).data("id"),function(t,e){__.fs.analytics("select_place",{place_id:t.id,place_name:t.name,place_url:e,target:"map"}),__.detailScreen(t)}),$(this).is(".place-select__item_object")){var e=$(this).data("id"),a=$(this).data("type");__.fs.mapObjectGet(e,a,function(t){__.mapObjectInfo(t,a,o)})}})},__.fs.analytics=function(t,e){var a={event_url:location.href};return e&&$.each(e,function(t,e){a[t]=e}),window.amplitude&&amplitude.getInstance().logEvent(t,a),window.ym&&ym(55798045,"reachGoal",t,a),a},__.fs.baseUrl=function(){var t="",e=window.location.pathname;return"/"!=e&&"/index.html"!=e||(t=""),e.includes("/places/")&&(t="../../../"),t},__.fs.browserDetect=function(){var t,e,a,n=navigator,i=(n.appVersion,n.userAgent),o=n.appName,c=""+parseFloat(n.appVersion),s=parseInt(n.appVersion,10);-1!=(e=i.indexOf("Opera"))?(o="opera",c=i.substring(e+6),-1!=(e=i.indexOf("Version"))&&(c=i.substring(e+8))):-1!=(e=i.indexOf("MSIE"))?(o="ie",c=i.substring(e+5)):-1!=(e=i.indexOf("Chrome"))?(o="chrome",c=i.substring(e+7)):-1!=(e=i.indexOf("Safari"))?(o="safari",c=i.substring(e+7),-1!=(e=i.indexOf("Version"))&&(c=i.substring(e+8))):-1!=(e=i.indexOf("Firefox"))?(o="firefox",c=i.substring(e+8)):-1!=i.indexOf("FBAN")&&-1!=i.indexOf("FBAV")?(o="facebook",c=0):(t=i.lastIndexOf(" ")+1)<(e=i.lastIndexOf("/"))&&(o=i.substring(t,e),c=i.substring(e+1),o.toLowerCase()==o.toUpperCase()&&(o=n.appName)),-1!=(a=c.indexOf(";"))&&(c=c.substring(0,a)),-1!=(a=c.indexOf(" "))&&(c=c.substring(0,a)),s=parseInt(""+c,10),isNaN(s)&&(c=""+parseFloat(n.appVersion),s=parseInt(n.appVersion,10));var r,l,d=/iPad|iPhone|iPod/.test(n.userAgent)&&!window.MSStream,p=window.devicePixelRatio||1,m=window.screen.width*p,u=window.screen.height*p;return{browserName:o.toLowerCase(),fullVersion:c,majorVersion:s,appName:n.appName.toLowerCase(),userAgent:n.userAgent.toLowerCase(),platform:n.platform.toLowerCase(),iphoneX:d&&1125==m&&2436===u?"iphoneX":"",isMobile:(l="not-mobile",r=n.userAgent||n.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(l="mobile"),l)}},__.fs.colorize=function(t){function i(t,e,a,n){return"rgba(".concat(t,",").concat(e,",").concat(a,",").concat(n,")")}function o(t,e,a,n,i){return n+(a-t)/(e-t)*((i-n)/1)}function c(t,e){var a=[];return a[3]=1-(1-e[3])*(1-t[3]),a[0]=Math.round(e[0]*e[3]/a[3]+t[0]*t[3]*(1-e[3])/a[3]),a[1]=Math.round(e[1]*e[3]/a[3]+t[1]*t[3]*(1-e[3])/a[3]),a[2]=Math.round(e[2]*e[3]/a[3]+t[2]*t[3]*(1-e[3])/a[3]),a}return this.default=function(){return i(0,98,255,.5)},this.markets=function(t){var e=t.markets.distance,a=c([226,30,220,.1],[0,98,255,e<3?1-o(0,3,e,0,1):0]);return i(a[0],a[1],a[2],a[3])},this.eco=function(t){var e=10;switch(t.eco.closest.type){case 3:case 4:e=3;break;case 6:e=5}var a=t.eco.distance,n=c([0,98,255,.3],[255,30,0,a<e?.6-o(0,e,a,0,.6):0]);return i(n[0],n[1],n[2],n[3])},this.railroad=function(t){var e=t.railroad.distance,a=c([226,30,220,.1],[0,98,255,e<3?1-o(0,3,e,0,1):0]);return i(a[0],a[1],a[2],a[3])},this.car=function(t){var e,a=__.fs.time.toInt(t.car.time.h,t.car.time.m);return a<=30&&(e=i(0,177,255,.3)),30<a&&(e=i(29,0,255,.3)),50<a&&(e=i(118,0,255,.3)),70<a&&(e=i(226,0,255,.3)),100<a&&(e=i(255,0,128,.3)),150<a&&(e=i(255,0,0,.3)),e},this},__.fs.coreModuls=function(t){var a={};return $.each(t,function(t,e){a[e]=__.core[e]()}),a},__.fs.decodeData=function(t){var e=t;return window.DATA={places:e,eco:{},railroad:{},markets:{},medic:{},cities:{}},$.each(t,function(t,e){e.canvas={visible:!0},window.DATA.eco[e.eco.closestId]||(window.DATA.eco[e.eco.closestId]={id:e.eco.closestId}),window.DATA.railroad[e.railroad.closestId]||(window.DATA.railroad[e.railroad.closestId]={id:e.railroad.closestId}),window.DATA.markets[e.markets.closestId]||(window.DATA.markets[e.markets.closestId]={id:e.markets.closestId}),window.DATA.medic[e.medic.closestId]||(window.DATA.medic[e.medic.closestId]={id:e.medic.closestId}),window.DATA.cities[e.city.closestId]||(window.DATA.cities[e.city.closestId]={id:e.city.closestId}),e.eco.closest=window.DATA.eco[e.eco.closestId],e.railroad.closest=window.DATA.railroad[e.railroad.closestId],e.markets.closest=window.DATA.markets[e.markets.closestId],e.medic.closest=window.DATA.medic[e.medic.closestId],e.city.closest=window.DATA.cities[e.city.closestId]}),window.DATA},__.fs.event={bind:function(t,e,a){var n=__.core.$app.data("listners")||{};n[t+"|"+e]||(n[t+"|"+e]={name:t,event:e},__.core.$app.data("listners",n),$(document).on(e,t,a))},unbind:function(t,e){var a=__.core.$app.data("listners")||{};delete a[t+"|"+e],__.core.$app.data("listners",a),$(document).off(e,t)}},__.fs.html=function(t){return t.replace(/\s+/g," ").trim()},__.fs.mapObjectGet=function(a,t,e){var n=$("#app").data("data")[t],i=null;$.each(n,function(t,e){e.id==a&&(i=(e.full,e))}),e(i)},__.fs.mapSprites=function(t){return{recicle:1,radiation:20*t,factory:40*t,trash:60*t,airport:80*t,energy:100*t,water:120*t,point_yellow:140*t,power:160*t,point_blue:180*t,point_green:200*t,railroad:220*t,black_mesa:240*t,army:260*t,markets:280*t}},__.fs.mapTiles=function(){var t="chrome"==__.fs.browserDetect().browserName?"webp":"png";return{simple:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.".concat(t),dark:"https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.".concat(t,"?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")}}(),__.fs.placeGet=function(t,e){var a=100*Math.floor(t/100),n="./bin/data/places/".concat(a,"/place_").concat(t,"/data.json");$.get(n,function(t){e(t,n)})},__.fs.substringSearch=function(m){(m=m||{}).weight=m.weight||100,m.multiply=m.multiply||!0;var u=this,h={weight:0,search:"",res:"",in:-1,out:-1,length:0};function _(t,e){for(var a=t.toLowerCase().trim(),n=(""+e.str).toLowerCase(),i=n.indexOf(a),o=m.weight,c=n.length,s=a.length,r=t.length*(o/10),l=[];;){var d=v(h);d.search=t,d.res=e;var p=n.indexOf(a,i);if(-1==p)break;s<=c&&n.indexOf(a,i)+1&&(d.weight+=50<c/s*100?o+r:c/s*o+r,d.weight=c-p,d.in=p,d.out=d.in+a.length,c===(d.length=s)&&(d.weight+=2*o),n[0]===a[0]&&(d.weight+=o)),l.push(d),i=p+1}return m.multiply||(l=[(l=l.sort(f))[0]]),l}function f(t,e){var a=0;return(t=t.weight)<(e=e.weight)?a=1:e<t&&(a=-1),a}function v(t){return Object.assign({},t)}return this.inString=function(t,e){var a=(t=""+t).length?t.trim().split(" "):[""],n=e.length?e.trim().split(" "):[""],i=a.length,o=t.length,c=n.length,s={str:e},r=[];if(o){if(t.indexOf(" ")+1){var l=_(t,s);l.weight&&(l.weight=l.weight*c),r=l}for(var d=i;d--;)r=r.concat(_(a[d],s));r=r.sort(f)}else{var p=v(h);p.search=t,p.res=s,r.push(p)}return r},this.inArray=function(t,e,a,n,i){t=""+t;for(var o=[],c=e.length;c--;){var s=a(e[c]),r={obj:e[c],str:s,index:c},l=u.inString(t,s),d=l.length;if(d){for(var p=d;p--;)n&&n(e[c]),l[p]&&(l[p].res=r);o=o.concat(l)}else i&&i(e[c])}return o=o.sort(f)},this},__.fs.time={toInt:function(t,e){return+((t=""+t)+(e=e<10?"0"+e:""+e))}},__.fs.url={objToUrl:function(t,e){t=t+"?"||"";var i=encodeURIComponent;return t+Object.entries(e).map(function(t){var e=_slicedToArray(t,2),a=e[0],n=e[1];return"".concat(i(a),"=").concat(i(n))}).join("&")}}; $(function(){runApp();console.log("0.1.6");})
//# sourceMappingURL=main.js.map
