"use strict";var __=__||{};function bindEvent(a,t,e){var n=$("#app").data("listners")||{};n[a+"|"+t]||(n[a+"|"+t]={name:a,event:t},$("#app").data("listners",n),$(document).on(t,a,e))}function unbindEvent(a,t){var e=$("#app").data("listners")||{};delete e[a+"|"+t],$("#app").data("listners",e),$(document).off(t,a)}function decodeData(m){var v=[];return $.each(m.p,function(a,t){var e,n,i,s,c,o,r,l,d,p={id:t[7],point:[t[15],t[0]],price:{from:-1<t[13]?t[13]:null,to:-1<t[14]?t[14]:null},name:m.n[t[17]],readyDate:t[6]?t[6]:null,type:-1<t[16]?m.t[t[16]]:null,class:-1<t[18]?m.k[t[18]]:null,car:{distance:t[1],time:{h:t[2],m:t[3]}},moscow:{distance:t[8]},railroad:{distance:t[4],closest:(r=m.r,l=t[5],d={},$.each(r,function(a,t){l==t[0]&&(d={id:t[0],name:t[2],point:[t[1],t[3]],distance:t[4],time:{h:t[5],m:t[6]}})}),d)},city:{distance:t[11],closest:(s=m.c,c=t[12],o={},$.each(s,function(a,t){c==t[0]&&(o={id:t[0],name:t[2],point:[t[1],t[3]]})}),o)},eco:{distance:t[9],closest:(e=m.e,n=t[10],i={},$.each(e,function(a,t){n==t[0]&&(i={id:t[0],name:t[2],point:[t[1],t[3]],type:t[4]})}),i)},canvas:{visible:!0}};v.push(p)}),v}L.CanvasOverlay=L.Class.extend({initialize:function(a,t){this._userDrawFunc=a,L.setOptions(this,t)},drawing:function(a){return this._userDrawFunc=a,this},params:function(a){return L.setOptions(this,a),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(a){this._map=a,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var t=this._map.getSize();this._canvas.width=t.x,this._canvas.height=t.y;var e=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(e?"animated":"hide")),a._panes.overlayPane.appendChild(this._canvas),a.on("moveend",this._reset,this),a.on("resize",this._resize,this),a.options.zoomAnimation&&L.Browser.any3d&&a.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(a){a.getPanes().overlayPane.removeChild(this._canvas),a.off("moveend",this._reset,this),a.off("resize",this._resize,this),a.options.zoomAnimation&&a.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(a){return a.addLayer(this),this},_resize:function(a){this._canvas.width=a.newSize.x,this._canvas.height=a.newSize.y},_reset:function(){var a=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,a),this._redraw()},_redraw:function(){var a=this._map.getSize(),t=this._map.getBounds(),e=180*a.x/(20037508.34*(t.getEast()-t.getWest())),n=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:t,size:a,zoomScale:e,zoom:n,options:this.options}),this._frame=null},_animateZoom:function(a){var t=this._map.getZoomScale(a.zoom),e=this._map._getCenterOffset(a.center)._multiplyBy(-t).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(e)+" scale("+t+")"}}),L.canvasOverlay=function(a,t){return new L.CanvasOverlay(a,t)},$(function(){var n=L.map("map").setView([55.751244,37.618423],9);L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA").addTo(n),$.get("bin/data/data.json",function(a){a=decodeData(a),$("#app").data("places",a),$("#map").trigger("renderMap",{places:a}),$("#places").trigger("renderList",{places:a,onlyVisible:!1})}),$("#map").click(function(a){var t=$("#app").data("places"),e=a.offsetX,n=a.offsetY;$.each(t,function(a,t){e>t.canvas.x1&&e<t.canvas.x2&&n>t.canvas.y1&&n<t.canvas.y2&&console.log(n,t)})}).data("map",n).bind("renderMap",function(a,t){var s=this,c=t.places,e=L.canvasOverlay().drawing(function(e,a){var n=a.canvas.getContext("2d"),i=$(s).data("map").getZoom();n.clearRect(0,0,a.canvas.width,a.canvas.height),$.each(c,function(a,t){t.canvas.visible&&(t.canvas=__.placePoint({ctx:n,canvasOverlay:e,zoom:i,place:t}))})}).addTo(n);$(s).data("canvas",e)}),$("#places").scroll(function(a){var e=this,t=$(e).find(".place-item").last(),n=(t.attr("id").split("-")[1],$(e).find(".place-item").length);if(!$("#map").data("map").search&&t.offset().top<2*$(window).outerHeight()){var i=$("#app").data("places"),s=100;$.each(i,function(a,t){if(n<a&&($(e).append(__.placeItem(t)),s--),!s)return!1})}}).bind("renderList",function(a,t){var e=this,n=t.onlyVisible||!1,i=t.places;$(e).empty(),$.each(i,function(a,t){if(n)t.canvas.visible&&$(e).append(__.placeItem(t));else{if(!(a<100))return!1;$(e).append(__.placeItem(t))}})})}),__.placeItem=function(a){var t,e,n=(t=a.price,{from:(e={from:t.from?"undefined"!=typeof global?global.component("cost",{value:t.from})[0]:__.cost({value:t.from})[0]:"",to:t.to?"undefined"!=typeof global?global.component("cost",{value:t.to})[0]:__.cost({value:t.to})[0]:""}).from?"от ".concat(e.from," руб."):"",to:e.to?"до ".concat(e.to," руб."):""}),i="undefined"!=typeof global?"#fafafa":a.canvas.color,s=a.type?'<span class="place-item__type">'.concat(a.type,"</span>"):"",c=(a.eco.distance<10&&"<div>".concat(a.eco.closest.name," в ").concat(a.eco.distance,"км</div>"),'<div class="place-item__car">до Москвы: '.concat(a.car.time.h,"ч ").concat(a.car.time.m,"мин (").concat(a.car.distance,"км)</div>")),o=a.railroad.distance<3?'<div class="place-item__train">ст. '.concat(a.railroad.closest.name," в ").concat(a.railroad.distance,"км,<br>до Москвы: ").concat(a.railroad.closest.time.h,"ч ").concat(a.railroad.closest.time.m,"мин (").concat(a.railroad.closest.distance,"км)</div>"):"",r='<div class="place-item" id="place-'.concat(a.id,'"> <div class="place-item__title"> <div class="place-item__pin" style="background:').concat(i,'"></div> <div> ').concat(s,'<span class="place-item__name">').concat(a.name,'</span> </div> </div> <div class="place-item__price">').concat(n.from," ").concat(n.to,'</div> <div class="place-item__distance"> ').concat(c," ").concat(o," </div></div>");return bindEvent(".place-item","click",function(a){var t=$("#app").data("places"),e=$("#map").data("map"),n=$(a.currentTarget).attr("id").split("-")[1];$.each(t,function(a,t){if(t.id==n)return e.setView(new L.LatLng(t.point[1],t.point[0]),14),!1})}),r},__.colorize=function(a){function i(a,t,e,n){return"rgba(".concat(a,",").concat(t,",").concat(e,",").concat(n,")")}function s(a,t,e,n,i){return n+(e-a)/(t-a)*((i-n)/1)}function c(a,t){var e=[];return e[3]=1-(1-t[3])*(1-a[3]),e[0]=Math.round(t[0]*t[3]/e[3]+a[0]*a[3]*(1-t[3])/e[3]),e[1]=Math.round(t[1]*t[3]/e[3]+a[1]*a[3]*(1-t[3])/e[3]),e[2]=Math.round(t[2]*t[3]/e[3]+a[2]*a[3]*(1-t[3])/e[3]),e}return this.eco=function(a){var t=10;switch(a.eco.closest.type){case"K":case"p":t=3;break;case"n":t=5}var e=a.eco.distance,n=c([0,98,255,.3],[255,30,0,e<t?.6-s(0,t,e,0,.6):0]);return i(n[0],n[1],n[2],n[3])},this.railroad=function(a){var t=a.railroad.distance,e=c([255,30,0,.1],[0,98,255,t<3?1-s(0,3,t,0,1):0]);return i(e[0],e[1],e[2],e[3])},this.car=function(a){var t=c([255,30,0,.1],[0,98,255,.3-s(10,200,a.car.distance,0,.3)]);return i(t[0],t[1],t[2],t[3])},this},__.placePoint=function(a){var t=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[a.zoom].s,e=__.colorize().eco(a.place);a.ctx.fillStyle=e;var n=a.canvasOverlay._map.latLngToContainerPoint([a.place.point[1],a.place.point[0]]);return a.ctx.beginPath(),a.ctx.arc(n.x,n.y,t/2,0,2*Math.PI),a.ctx.fill(),a.ctx.closePath(),{x1:n.x,y1:n.y,x2:n.x+t,y2:n.y+t,color:e,visible:a.place.canvas.visible}},__.cost=function(a){var t=a.value;return t=/\.\d/.test(t)?t+"":t+".00",(t=(t=/\.\d{2}/.test(t)?t:t+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.search=function(a){var t=$("#app").data("places"),e=a.text.toLowerCase().trim(),n=[],i=$("#map").data("map");return a.text?($.each(t,function(a,t){-1!==t.name.toLowerCase().trim().indexOf(e)?(t.canvas.visible=!0,n.push(t)):t.canvas.visible=!1}),n.length?i.search=!0:i.search=!1,$("#places").trigger("renderList",{places:t,onlyVisible:!0}).scrollTop(0)):(i.search=!1,$.each(t,function(a,t){t.canvas.visible=!0}),$("#places").trigger("renderList",{places:t,onlyVisible:!1})),$("#map").data("canvas").redraw(),n};
//# sourceMappingURL=main.js.map
