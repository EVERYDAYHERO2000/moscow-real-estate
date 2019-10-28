var __={core:{},fs:{D:atob}}; "use strict";L.CanvasOverlay=L.Class.extend({initialize:function(t,e){this._userDrawFunc=t,L.setOptions(this,e)},drawing:function(t){return this._userDrawFunc=t,this},params:function(t){return L.setOptions(this,t),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(t){this._map=t,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y;var a=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(a?"animated":"hide")),t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._resize,this),t.options.zoomAnimation&&L.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._canvas),t.off("moveend",this._reset,this),t.off("resize",this._resize,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(t){return t.addLayer(this),this},_resize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t),this._redraw()},_redraw:function(){var t=this._map.getSize(),e=this._map.getBounds(),a=180*t.x/(20037508.34*(e.getEast()-e.getWest())),n=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:e,size:t,zoomScale:a,zoom:n,options:this.options}),this._frame=null},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),a=this._map._getCenterOffset(t.center)._multiplyBy(-e).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(a)+" scale("+e+")"}}),L.canvasOverlay=function(t,e){return new L.CanvasOverlay(t,e)};var runApp=function(){__.core=__.fs.coreModuls(["$window","$app","$header","$map","$places","$placeSearch","$mapControls"]),$.get("bin/data/data.json",function(t){var e=__.fs.decodeData(t);__.core.$app.data("data",e),__.core.$map.trigger("createMap").trigger("renderMap",{data:e}),__.core.$places.trigger("renderList",{places:e.places,onlyVisible:!1})})};__.cost=function(t){var e=t.value;return e=/\.\d/.test(e)?e+"":e+".00",(e=(e=/\.\d{2}/.test(e)?e:e+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.detailScreen=function(a){var t,e,n,i,o,c,r=a.type?"<span>".concat(a.type,"</span>"):"",s=x("Класс",a.class,function(t){return t}),l=x("Адрес",a.address.name,function(t){return t}),p=x("Ближайший город",a.city.closest.name,function(t){return"".concat(t," в ").concat(a.city.distance,"км")}),d=x("Расстояние от Москвы",a.moscow.distance,function(t){return"".concat(t,"км")}),u=x("На автомобиле до Москвы",a.car.distance,function(t){return"".concat(t,"км<br> ").concat(a.car.time.h,"ч ").concat(a.car.time.m,"мин без учета пробок")}),m=x("Ближайшая ж/д станция",a.railroad.closest.name,function(t){return"".concat(t," в ").concat(a.railroad.distance,"км<br> до Москвы ").concat(a.railroad.closest.time.h,"ч ").concat(a.railroad.closest.time.m,"мин")}),f=x("Ближайший источник загрязнения",a.eco.closest.name,function(t){var e=a.eco.closest.description?"<br>".concat(a.eco.closest.description):"";return"".concat(a.eco.distance,"км<br>").concat(t," ").concat(e)}),h=(t=a.price,(e=(t.from?"от ".concat(__.cost({value:t.from})[0],"руб. "):"")+(t.to?"<br>до ".concat(__.cost({value:t.to})[0],"руб."):""))?x("Цена",e,function(t){return t}):""),v=x("Застройщик",a.developer,function(t){return t}),_=x("Сайт",a.site,function(t){return'<a rel="noreferrer noopener nofollow" target="_blank" href="'.concat(t,'">').concat(t,"</a>")}),g=x("Ближайшая станция скорой помощи Москвы и Московской области",a.medic.closest,function(t){return"".concat(a.medic.distance,"км<br>").concat(a.medic.closest.name)}),b=(n=a.point,i="https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=".concat(n[1],",").concat(n[0]),o="https://realty.yandex.ru/moskovskaya_oblast/kupit/dom/karta/?&leftLongitude=".concat(n[0]-.009066,"&topLatitude=").concat(n[1]+.00304,"&rightLongitude=").concat(n[0]+.009066,"&bottomLatitude=").concat(n[1]-.00304),c="https://www.avito.ru/moskva/doma_dachi_kottedzhi?map="+btoa(JSON.stringify({searchArea:{latBottom:n[1]-.00304,latTop:n[1]+.00304,lonLeft:n[0]-.009066,lonRight:n[0]+.009066}})),k("Предложения",'<a rel="noreferrer noopener nofollow" target="_blank" href="'.concat(i,'">Циан</a><br><a rel="noreferrer noopener nofollow" target="_blank" href="').concat(o,'">Яндекс.Недвижимость</a><br><a rel="noreferrer noopener nofollow" target="_blank" href="').concat(c,'">Авито</a>'))),w="<h1>".concat(r," <span>").concat(a.name,'</span></h1><div class="panel__content content"> <section> ').concat(s," ").concat(h," ").concat(v," ").concat(_," ").concat(l," ").concat(d," ").concat(b," </section> <section> <h2>Транспорт</h2> ").concat(u," ").concat(m," </section> <section> <h2>Инфраструктура</h2> ").concat(p," ").concat(g," </section> <section> <h2>Экология</h2> ").concat(f," </section></div> "),y='<div id="detail-screen" class="panel panel_detail"> <div class="header-mobile"> <button id="close-screen" class="btn">Назад</button> </div> <div class="panel__container">'.concat(w,"</div></div>");function x(t,e,a){return e?k(t,a(e)):""}function k(t,e){return'<div class="content__item"> <div class="content__item-title">'.concat(t,'</div> <div class="content__item-value">').concat(e,"</div> </div>")}var L=__.core.$detailScreen?__.core.$detailScreen:$(y);L.find(".panel__container").empty().append(w);return L.find("#close-screen").click(function(t){$("#main").find("#detail-screen").remove()}),console.log(a),__.core.$detailScreen=L,$("#detail-screen").length||$("#main").append(L),y},__.mapOverlay=function(t,e,a,n){var r=__.fs.mapSprites(2),i="source/assets/img/map/pins@".concat(2,"x.png"),s=s=new Image;function l(t,e){return __.core.$map.data("icons")?e(__.core.$map.data("icons")):t.addEventListener("load",function(){__.core.$map.data("icons",t),e(t)}),t}function p(t,e,a,n,i,o,c){var r=a._map.latLngToContainerPoint([t.point[1],t.point[0]]);return o&&e.drawImage(n,0,o,i,i,r.x-c/2,r.y-c/2,c,c),n}return s.src=i,this.default=function(){return!1},this.railroad=function(t,i,o,c){var e=t.data.railroad;return l(s,function(n){$.each(e,function(t,e){var a="";9<c&&(a=r.point_blue),11<c&&(a=r.railroad),p(e,o,i,n,40,a,26)})}),!1},this.car=function(){return!1},this.eco=function(t,i,o,c){var e=t.data.eco;l(s,function(n){$.each(e,function(t,e){var a=null;9<c?("n"==e.type&&(a=r.recicle),"a"==e.type&&(a=r.airport),"w"==e.type&&(a=r.trash),"r"!=e.type&&"q"!=e.type||(a=r.radiation),"o"!=e.type&&"E"!=e.type||(a=r.factory),"s"==e.type&&(a=r.water),"p"==e.type&&(a=r.energy),"K"==e.type&&(a=r.power)):a=r.point_yellow,p(e,o,i,n,40,a,26)})})},this},__.mapTiles=function(t){var e=t.simple,a=t.dark,n=__.core.$map,i=n.data("tiles"),o="map_dark",c="map_light";function r(t,e){return n.removeClass(t).addClass(e),!1}function s(t){i._url!=t&&i.setUrl(t)}return this.default=function(){s(e),r(o,c)},this.eco=function(){s(a),r(c,o)},this.railroad=function(){s(a),r(c,o)},this.car=function(){s(a),r(c,o)},this},__.placeItem=function(t){var e,a,n=(e=t.price,{from:(a={from:e.from?"undefined"!=typeof global?global.component("cost",{value:e.from})[0]:__.cost({value:e.from})[0]:"",to:e.to?"undefined"!=typeof global?global.component("cost",{value:e.to})[0]:__.cost({value:e.to})[0]:""}).from?"от ".concat(a.from," руб."):"",to:a.to?"до ".concat(a.to," руб."):""}),i="undefined"!=typeof global?"#fafafa":t.canvas.color,o=t.type?'<span class="place-item__type">'.concat(t.type,"</span>"):"",c=(t.eco.distance<10&&"<div>".concat(t.eco.closest.name," в ").concat(t.eco.distance,"км</div>"),'<div class="place-item__car">до Москвы: '.concat(t.car.time.h,"ч ").concat(t.car.time.m,"мин (").concat(t.car.distance,"км)</div>")),r=t.railroad.distance<3?'<div class="place-item__train">ст. '.concat(t.railroad.closest.name," в ").concat(t.railroad.distance,"км,<br>до Москвы: ").concat(t.railroad.closest.time.h,"ч ").concat(t.railroad.closest.time.m,"мин (").concat(t.railroad.closest.distance,"км)</div>"):"",s='<div class="place-item" id="place-'.concat(t.id,'"> <div class="place-item__title"> <div class="place-item__pin" style="background:').concat(i,'"></div> <div> ').concat(o,'<span class="place-item__name">').concat(t.name,'</span> </div> </div> <div class="place-item__price">').concat(n.from," ").concat(n.to,'</div> <div class="place-item__distance"> ').concat(c," ").concat(r," </div></div>");return"undefined"==typeof global&&__.fs.event.bind(".place-item","click",function(t){var e=$("#app").data("data").places,a=$("#map").data("map"),n=$(t.currentTarget).attr("id").split("-")[1],i=100*Math.floor(n/100),o="./bin/data/places/".concat(i,"/place_").concat(n,"/data.json");$(".place-item").not(this).removeClass("place-item_active"),$(this).is(".place-item_active")?($(this).removeClass("place-item_active"),$("#detail-screen").remove()):($(this).addClass("place-item_active"),$.each(e,function(t,e){if(e.id==n)return a.setView(new L.LatLng(e.point[1],e.point[0]),14),!1}),$.get(o,function(t){__.detailScreen(t)}))}),s},__.placePoint=function(t){var e=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[t.zoom].s,a=$("#select-layer").val(),n=__.fs.colorize()[a](t.place);t.ctx.fillStyle=n,10<t.zoom&&(t.ctx.lineWidth=1,t.ctx.strokeStyle="rgba(255, 255, 255,.5)",t.ctx.stroke()),11<t.zoom&&(t.ctx.lineWidth=1,t.ctx.strokeStyle="rgb(255, 255, 255)",t.ctx.stroke());var i=t.canvasOverlay._map.latLngToContainerPoint([t.place.point[1],t.place.point[0]]);return t.ctx.beginPath(),t.ctx.arc(i.x,i.y,e/2,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),{x1:i.x,y1:i.y,x2:i.x+e,y2:i.y+e,color:n,visible:t.place.canvas.visible}},__.search=function(t){var e=$("#app").data("data").places,a=[],n=[],i=$("#map").data("map"),o=new __.fs.substringSearch({multiply:!1}),c={};return t.text?(a=o.inArray(t.text,e,function(t){return t.name},function(t){t.canvas.visible=!0},function(t){t.canvas.visible=!1}),i.search=!!a.length,$.each(a,function(t,e){c[e.res.obj.id]||(c[e.res.obj.id]=!0,n.push(e.res.obj))}),$("#places").trigger("renderList",{places:n,onlyVisible:!0}).scrollTop(0)):(i.search=!1,$.each(e,function(t,e){e.canvas.visible=!0}),$("#places").trigger("renderList",{places:e,onlyVisible:!1})),$("#map").data("canvas").redraw(),n},__.select=function(t){},__.core.$app=function(){return $("#app").data("browser",__.fs.browserDetect()).addClass(function(){var t=$(this).data("browser");return[t.browserName,t.platform,t.isMobile].join(" ")}),$("#app")},__.core.$header=function(){return $("#change-view").click(function(){"На карте"!=$(this).text()?$(this).text("На карте"):$(this).text("Списком"),$("#main").toggleClass("main_screen-2")}),$("#header")},__.core.$map=function(){return $("#map").click(function(t){var e=$("#app").data("data").places,n=t.offsetX,i=t.offsetY;$.each(e,function(t,e){if(n>e.canvas.x1&&n<e.canvas.x2&&i>e.canvas.y1&&i<e.canvas.y2){var a="".concat(location.origin,"/control-center.html#").concat(e.id);console.log("id: "+e.id,a)}})}).bind("createMap",function(t){var e={simple:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",dark:"https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA"},a=$(t.target).attr("id"),n=L.map(a).setView([55.751244,37.618423],9),i=L.tileLayer(e.dark).addTo(n);$(t.target).data("map",n),$(t.target).data("tiles",i),$(t.target).data("tileset",e),$(".leaflet-bar").find("a").each(function(t,e){$(e).click(function(t){t.preventDefault(),$("#app").scrollTop(0)})})}).bind("renderMap",function(t,c){var r=this,s=c.data.places,e=$(t.target).data("map"),a=L.canvasOverlay().drawing(function(a,t){var n=t.canvas.getContext("2d"),i=$(r).data("map").getZoom();n.clearRect(0,0,t.canvas.width,t.canvas.height),$.each(s,function(t,e){e.canvas.visible&&(e.canvas=__.placePoint({ctx:n,canvasOverlay:a,zoom:i,place:e}))});var e=$("#select-layer").val(),o=$("#map").data("tileset");__.mapOverlay()[e](c,a,n,i),__.mapTiles(o)[e]()}).addTo(e);$(r).data("canvas",a)}),$("#map")},__.core.$mapControls=function(){$("#map-controls").bind("create",function(t){var e={default:{title:"Карта"},eco:{title:"Экология",selected:!0},railroad:{title:"Электрички"},car:{title:"Автомобиль"}},n="";$.each(e,function(t,e){var a=e.selected?"selected":"";n+="<option ".concat(a,' value="').concat(t,'">').concat(e.title,"</option>")});var a=$('<select data-ico="eco" id="select-layer" class="select">'.concat(n,"</select>")).data("options",e).change(function(t){var e=$(this).data("options"),a=$(this).val();$(this).attr("data-ico",a),$.each(e,function(t,e){e.selected=a==t}),$("#map").data("canvas").redraw()});$(this).find(".layers-controls").append(a)}).trigger("create")},__.core.placeScreen=function(){},__.core.$placeSearch=function(){return $("#place-search").bind("search",function(t,e){__.search({text:$(this).find("input").val()})}).keyup(function(t){var e=t.which;13==e&&t.preventDefault(),32!=e&&13!=e&&188!=e&&186!=e||$(this).trigger("search")}).find("button").click(function(t){$(this).trigger("search")}),$("#place-search")},__.core.$places=function(){return $("#places").scroll(function(t){var a=this,e=$(a).find(".place-item").last(),n=(e.attr("id").split("-")[1],$(a).find(".place-item").length);if(!$("#map").data("map").search&&e.offset().top<2*$(window).outerHeight()){var i=$("#app").data("data").places,o=100;$.each(i,function(t,e){if(n<t&&($(a).append(__.placeItem(e)),o--),!o)return!1})}}).bind("renderList",function(t,e){var a=this,n=e.onlyVisible||!1,i=e.places;$(a).empty(),$.each(i,function(t,e){if(n)e.canvas.visible&&$(a).append(__.placeItem(e));else{if(!(t<100))return!1;$(a).append(__.placeItem(e))}})}),$("#places")},__.core.$window=function(){var t=$("#header").outerHeight();$(window).outerHeight();function e(){$("#main").css({height:"calc(100vh - ".concat(t,"px)")})}return e(),$(window).resize(function(t){e()}),$(window)},__.fs.browserDetect=function(){navigator.appVersion;var t,e,a,n=navigator.userAgent,i=navigator.appName,o=""+parseFloat(navigator.appVersion),c=parseInt(navigator.appVersion,10);-1!=(e=n.indexOf("Opera"))?(i="opera",o=n.substring(e+6),-1!=(e=n.indexOf("Version"))&&(o=n.substring(e+8))):-1!=(e=n.indexOf("MSIE"))?(i="ie",o=n.substring(e+5)):-1!=(e=n.indexOf("Chrome"))?(i="chrome",o=n.substring(e+7)):-1!=(e=n.indexOf("Safari"))?(i="safari",o=n.substring(e+7),-1!=(e=n.indexOf("Version"))&&(o=n.substring(e+8))):-1!=(e=n.indexOf("Firefox"))?(i="firefox",o=n.substring(e+8)):-1!=n.indexOf("FBAN")&&-1!=n.indexOf("FBAV")?(i="facebook",o=0):(t=n.lastIndexOf(" ")+1)<(e=n.lastIndexOf("/"))&&(i=n.substring(t,e),o=n.substring(e+1),i.toLowerCase()==i.toUpperCase()&&(i=navigator.appName)),-1!=(a=o.indexOf(";"))&&(o=o.substring(0,a)),-1!=(a=o.indexOf(" "))&&(o=o.substring(0,a)),c=parseInt(""+o,10),isNaN(c)&&(o=""+parseFloat(navigator.appVersion),c=parseInt(navigator.appVersion,10));var r,s,l=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,p=window.devicePixelRatio||1,d=window.screen.width*p,u=window.screen.height*p;return{browserName:i.toLowerCase(),fullVersion:o,majorVersion:c,appName:navigator.appName.toLowerCase(),userAgent:navigator.userAgent.toLowerCase(),platform:navigator.platform.toLowerCase(),iphoneX:l&&1125==d&&2436===u?"iphoneX":"",isMobile:(s="not-mobile",r=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(s="mobile"),s)}},__.fs.colorize=function(t){function i(t,e,a,n){return"rgba(".concat(t,",").concat(e,",").concat(a,",").concat(n,")")}function o(t,e,a,n,i){return n+(a-t)/(e-t)*((i-n)/1)}function c(t,e){var a=[];return a[3]=1-(1-e[3])*(1-t[3]),a[0]=Math.round(e[0]*e[3]/a[3]+t[0]*t[3]*(1-e[3])/a[3]),a[1]=Math.round(e[1]*e[3]/a[3]+t[1]*t[3]*(1-e[3])/a[3]),a[2]=Math.round(e[2]*e[3]/a[3]+t[2]*t[3]*(1-e[3])/a[3]),a}return this.default=function(){return i(0,98,255,.5)},this.eco=function(t){var e=10;switch(t.eco.closest.type){case"K":case"p":e=3;break;case"n":e=5}var a=t.eco.distance,n=c([0,98,255,.3],[255,30,0,a<e?.6-o(0,e,a,0,.6):0]);return i(n[0],n[1],n[2],n[3])},this.railroad=function(t){var e=t.railroad.distance,a=c([226,30,220,.1],[0,98,255,e<3?1-o(0,3,e,0,1):0]);return i(a[0],a[1],a[2],a[3])},this.car=function(t){var e,a=__.fs.time.toInt(t.car.time.h,t.car.time.m);return a<=30&&(e=i(0,177,255,.3)),30<a&&(e=i(29,0,255,.3)),50<a&&(e=i(118,0,255,.3)),70<a&&(e=i(226,0,255,.3)),100<a&&(e=i(255,0,128,.3)),150<a&&(e=i(255,0,0,.3)),e},this},__.fs.coreModuls=function(t){var a={};return $.each(t,function(t,e){a[e]=__.core[e]()}),a},__.fs.event={bind:function(t,e,a){var n=__.core.$app.data("listners")||{};n[t+"|"+e]||(n[t+"|"+e]={name:t,event:e},__.core.$app.data("listners",n),$(document).on(e,t,a))},unbind:function(t,e){var a=__.core.$app.data("listners")||{};delete a[t+"|"+e],__.core.$app.data("listners",a),$(document).off(e,t)}},__.fs.mapSprites=function(t){return{recicle:1,radiation:20*t,factory:40*t,trash:60*t,airport:80*t,energy:100*t,water:120*t,point_yellow:140*t,power:160*t,point_blue:180*t,point_green:200*t,railroad:220*t}},__.fs.substringSearch=function(u){(u=u||{}).weight=u.weight||100,u.multiply=u.multiply||!0;var m=this,f={weight:0,search:"",res:"",in:-1,out:-1,length:0};function h(t,e){for(var a=t.toLowerCase().trim(),n=(""+e.str).toLowerCase(),i=n.indexOf(a),o=u.weight,c=n.length,r=a.length,s=t.length*(o/10),l=[];;){var p=_(f);p.search=t,p.res=e;var d=n.indexOf(a,i);if(-1==d)break;r<=c&&n.indexOf(a,i)+1&&(p.weight+=50<c/r*100?o+s:c/r*o+s,p.weight=c-d,p.in=d,p.out=p.in+a.length,c===(p.length=r)&&(p.weight+=2*o),n[0]===a[0]&&(p.weight+=o)),l.push(p),i=d+1}return u.multiply||(l=[(l=l.sort(v))[0]]),l}function v(t,e){var a=0;return(t=t.weight)<(e=e.weight)?a=1:e<t&&(a=-1),a}function _(t){return Object.assign({},t)}return this.inString=function(t,e){var a=(t=""+t).length?t.trim().split(" "):[""],n=e.length?e.trim().split(" "):[""],i=a.length,o=t.length,c=n.length,r={str:e},s=[];if(o){if(t.indexOf(" ")+1){var l=h(t,r);l.weight&&(l.weight=l.weight*c),s=l}for(var p=i;p--;)s=s.concat(h(a[p],r));s=s.sort(v)}else{var d=_(f);d.search=t,d.res=r,s.push(d)}return s},this.inArray=function(t,e,a,n,i){t=""+t;for(var o=[],c=e.length;c--;){var r=a(e[c]),s={obj:e[c],str:r,index:c},l=m.inString(t,r),p=l.length;if(p){for(var d=p;d--;)n&&n(e[c]),l[d]&&(l[d].res=s);o=o.concat(l)}else i&&i(e[c])}return o=o.sort(v)},this},__.fs.time={toInt:function(t,e){return+((t=""+t)+(e=e<10?"0"+e:""+e))}},__.fs.decodeData=function(f){var h=[],v={},_={};return $.each(f.p,function(t,e){var a,n,i,o,c,r,s,l,p,d,u,m={id:e[7],point:[e[15],e[0]],price:{from:-1<e[13]?e[13]:null,to:-1<e[14]?e[14]:null},name:f.n[e[17]],readyDate:e[6]?e[6]:null,type:-1<e[16]?f.t[e[16]]:null,class:-1<e[18]?f.k[e[18]]:null,car:{distance:e[1],time:{h:e[2],m:e[3]}},moscow:{distance:e[8]},railroad:{distance:e[4],closest:(l=f.r,p=e[5],d={},u={},$.each(l,function(t,e){d={id:e[0],name:e[2],point:[e[1],e[3]],distance:e[4],time:{h:e[5],m:e[6]}},_[d.id]=d,p==e[0]&&(u=d)}),u)},city:{distance:e[11],closest:(c=f.c,r=e[12],s={},$.each(c,function(t,e){r==e[0]&&(s={id:e[0],name:e[2],point:[e[1],e[3]]})}),s)},eco:{distance:e[9],closest:(a=f.e,n=e[10],i={},o={},$.each(a,function(t,e){i={id:e[0],name:e[2],point:[e[1],e[3]],type:e[4]},v[i.id]=i,n==e[0]&&(o=i)}),o)},canvas:{visible:!0}};h.push(m)}),{places:h,eco:v,railroad:_}}; $(function(){runApp()})
//# sourceMappingURL=main.js.map
