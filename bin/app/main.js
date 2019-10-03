"use strict";var __=__||{},listners={};function bindEvent(t,a,n){window.listners[t+"|"+a]||(window.listners[t+"|"+a]={name:t,event:a},$(document).on(a,t,n))}function unbindEvent(t,a){delete window.listners[t+"|"+a],$(document).off(a,t)}L.CanvasOverlay=L.Class.extend({initialize:function(t,a){this._userDrawFunc=t,L.setOptions(this,a)},drawing:function(t){return this._userDrawFunc=t,this},params:function(t){return L.setOptions(this,t),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(t){this._map=t,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var a=this._map.getSize();this._canvas.width=a.x,this._canvas.height=a.y;var n=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(n?"animated":"hide")),t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._resize,this),t.options.zoomAnimation&&L.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._canvas),t.off("moveend",this._reset,this),t.off("resize",this._resize,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(t){return t.addLayer(this),this},_resize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t),this._redraw()},_redraw:function(){var t=this._map.getSize(),a=this._map.getBounds(),n=180*t.x/(20037508.34*(a.getEast()-a.getWest())),e=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:a,size:t,zoomScale:n,zoom:e,options:this.options}),this._frame=null},_animateZoom:function(t){var a=this._map.getZoomScale(t.zoom),n=this._map._getCenterOffset(t.center)._multiplyBy(-a).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(n)+" scale("+a+")"}}),L.canvasOverlay=function(t,a){return new L.CanvasOverlay(t,a)},$(function(){var n=L.map("map").setView([55.751244,37.618423],9);L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png").addTo(n),window.map=n,$.get("bin/data/places.json",function(t){(function(a){L.canvasOverlay().drawing(function(n,t){var e=t.canvas.getContext("2d"),i=window.map.getZoom();e.clearRect(0,0,t.canvas.width,t.canvas.height),$.each(a,function(t,a){a.canvas=__.placePoint({ctx:e,canvasOverlay:n,zoom:i,place:a})})}).addTo(n)})(window.DATA=t),function(t){$.each(t,function(t,a){$("#places").append(__.placeItem(a))})}(t)}),$("#map").click(function(t){var n=t.offsetX,e=t.offsetY;$.each(DATA,function(t,a){n>a.canvas.x1&&n<a.canvas.x2&&e>a.canvas.y1&&e<a.canvas.y2&&console.log(e,a)})})}),__.placeItem=function(t){var a=t.eco.distance<10?"<div>".concat(t.eco.closest.name," в ").concat(t.eco.distance,"км</div>"):"",n=t.railroad.distance<3?'<div style="color: green">Ж/д станция '.concat(t.railroad.closest.name," в ").concat(t.railroad.distance,"км, до москвы: ").concat(t.railroad.closest.time.h,"ч ").concat(t.railroad.closest.time.m,"мин (").concat(t.railroad.closest.distance,"км)</div>"):"",e='<div class="place-item" id="place-'.concat(t.id,'" data-lat="').concat(t.point[1],'" data-lon="').concat(t.point[0],'"> <div>').concat(t.type," ").concat(t.name,'</div> <div style="color:red">').concat(t.price.from?t.price.from:""," ").concat(t.price.to?t.price.to:"","</div> <div>Расстояние до Москвы: ").concat(t.moscow.distance,"км</div> <div>На машине: ").concat(t.car.time.h,"ч ").concat(t.car.time.m,"мин (").concat(t.car.distance,"км)</div> ").concat(n," <div>Ближайший город: ").concat(t.city.closest.name," в ").concat(t.city.distance,"км</div> ").concat(a,"</div>");return bindEvent(".place-item","click",function(t){var a=$(t.currentTarget).data("lat"),n=$(t.currentTarget).data("lon");map.setView(new L.LatLng(a,n),15)}),e},__.placePoint=function(e){var t=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[e.zoom].s,a={eco:function(){var t=10;switch(e.place.eco.closest.type){case"K":case"p":t=3;break;case"n":t=5}var a=e.place.eco.distance,n=c([0,98,255,.3],[255,30,0,a<t?.6-i(0,t,a,0,.6):0]);return"rgba(".concat(n[0],",").concat(n[1],",").concat(n[2],",").concat(n[3],")")},railroad:function(){var t=e.place.railroad.distance,a=c([255,30,0,.2],[0,98,255,t<3?1-i(0,3,t,0,1):0]);return"rgba(".concat(a[0],",").concat(a[1],",").concat(a[2],",").concat(a[3],")")}};e.ctx.fillStyle=a.eco();var n=e.canvasOverlay._map.latLngToContainerPoint([e.place.point[1],e.place.point[0]]);function i(t,a,n,e,i){return e+(n-t)/(a-t)*((i-e)/1)}function c(t,a){var n=[];return n[3]=1-(1-a[3])*(1-t[3]),n[0]=Math.round(a[0]*a[3]/n[3]+t[0]*t[3]*(1-a[3])/n[3]),n[1]=Math.round(a[1]*a[3]/n[3]+t[1]*t[3]*(1-a[3])/n[3]),n[2]=Math.round(a[2]*a[3]/n[3]+t[2]*t[3]*(1-a[3])/n[3]),n}return e.ctx.beginPath(),e.ctx.arc(n.x,n.y,t/2,0,2*Math.PI),e.ctx.fill(),e.ctx.closePath(),{x1:n.x,y1:n.y,x2:n.x+t,y2:n.y+t}};
//# sourceMappingURL=main.js.map
