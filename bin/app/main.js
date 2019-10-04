"use strict";var __=__||{},listners={};function bindEvent(t,a,n){window.listners[t+"|"+a]||(window.listners[t+"|"+a]={name:t,event:a},$(document).on(a,t,n))}function unbindEvent(t,a){delete window.listners[t+"|"+a],$(document).off(a,t)}L.CanvasOverlay=L.Class.extend({initialize:function(t,a){this._userDrawFunc=t,L.setOptions(this,a)},drawing:function(t){return this._userDrawFunc=t,this},params:function(t){return L.setOptions(this,t),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(t){this._map=t,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var a=this._map.getSize();this._canvas.width=a.x,this._canvas.height=a.y;var n=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(n?"animated":"hide")),t._panes.overlayPane.appendChild(this._canvas),t.on("moveend",this._reset,this),t.on("resize",this._resize,this),t.options.zoomAnimation&&L.Browser.any3d&&t.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(t){t.getPanes().overlayPane.removeChild(this._canvas),t.off("moveend",this._reset,this),t.off("resize",this._resize,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(t){return t.addLayer(this),this},_resize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_reset:function(){var t=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,t),this._redraw()},_redraw:function(){var t=this._map.getSize(),a=this._map.getBounds(),n=180*t.x/(20037508.34*(a.getEast()-a.getWest())),e=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:a,size:t,zoomScale:n,zoom:e,options:this.options}),this._frame=null},_animateZoom:function(t){var a=this._map.getZoomScale(t.zoom),n=this._map._getCenterOffset(t.center)._multiplyBy(-a).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(n)+" scale("+a+")"}}),L.canvasOverlay=function(t,a){return new L.CanvasOverlay(t,a)},$(function(){var n=L.map("map").setView([55.751244,37.618423],9);L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png").addTo(n),window.map=n,$.get("bin/data/places.json",function(t){(function(a){L.canvasOverlay().drawing(function(n,t){var e=t.canvas.getContext("2d"),i=window.map.getZoom();e.clearRect(0,0,t.canvas.width,t.canvas.height),$.each(a,function(t,a){a.canvas=__.placePoint({ctx:e,canvasOverlay:n,zoom:i,place:a})})}).addTo(n)})(window.DATA=t),function(t){$.each(t,function(t,a){$("#places").append(__.placeItem(a))})}(t)}),$("#map").click(function(t){var n=t.offsetX,e=t.offsetY;$.each(DATA,function(t,a){n>a.canvas.x1&&n<a.canvas.x2&&e>a.canvas.y1&&e<a.canvas.y2&&console.log(e,a)})})}),__.cost=function(t){var a=t.value;return a=/\.\d/.test(a)?a+"":a+".00",(a=(a=/\.\d{2}/.test(a)?a:a+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.placeItem=function(t){var a,n=JSON.parse(JSON.stringify(t)),e=n.eco.distance<10?"<div>".concat(n.eco.closest.name," в ").concat(n.eco.distance,"км</div>"):"",i=n.railroad.distance<3?'<div style="color: green">Ж/д станция '.concat(n.railroad.closest.name," в ").concat(n.railroad.distance,"км, до москвы: ").concat(n.railroad.closest.time.h,"ч ").concat(n.railroad.closest.time.m,"мин (").concat(n.railroad.closest.distance,"км)</div>"):"";n.price={from:(a=n.price).from?"undefined"!=typeof global?global.component("cost",{value:a.from})[0]:__.cost({value:a.from})[0]:"",to:a.to?"undefined"!=typeof global?global.component("cost",{value:a.to})[0]:__.cost({value:a.to})[0]:""};var o='<div class="place-item" id="place-'.concat(n.id,'" data-lat="').concat(n.point[1],'" data-lon="').concat(n.point[0],'"> <div>').concat(n.type," ").concat(n.name,'</div> <div style="color:red">').concat(n.price.from?n.price.from:""," ").concat(n.price.to?n.price.to:"","</div> <div>Расстояние до Москвы: ").concat(n.moscow.distance,"км</div> <div>На машине: ").concat(n.car.time.h,"ч ").concat(n.car.time.m,"мин (").concat(n.car.distance,"км)</div> ").concat(i," <div>Ближайший город: ").concat(n.city.closest.name," в ").concat(n.city.distance,"км</div> ").concat(e,"</div>");return bindEvent(".place-item","click",function(t){var a=$(t.currentTarget).data("lat"),n=$(t.currentTarget).data("lon");map.setView(new L.LatLng(a,n),15)}),o},__.colorize=function(t){function i(t,a,n,e){return"rgba(".concat(t,",").concat(a,",").concat(n,",").concat(e,")")}function o(t,a,n,e,i){return e+(n-t)/(a-t)*((i-e)/1)}function s(t,a){var n=[];return n[3]=1-(1-a[3])*(1-t[3]),n[0]=Math.round(a[0]*a[3]/n[3]+t[0]*t[3]*(1-a[3])/n[3]),n[1]=Math.round(a[1]*a[3]/n[3]+t[1]*t[3]*(1-a[3])/n[3]),n[2]=Math.round(a[2]*a[3]/n[3]+t[2]*t[3]*(1-a[3])/n[3]),n}return this.eco=function(t){var a=10;switch(t.eco.closest.type){case"K":case"p":a=3;break;case"n":a=5}var n=t.eco.distance,e=s([0,98,255,.3],[255,30,0,n<a?.6-o(0,a,n,0,.6):0]);return i(e[0],e[1],e[2],e[3])},this.railroad=function(t){var a=t.railroad.distance,n=s([255,30,0,.2],[0,98,255,a<3?1-o(0,3,a,0,1):0]);return i(n[0],n[1],n[2],n[3])},this},__.placePoint=function(t){var a=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[t.zoom].s;t.ctx.fillStyle=__.colorize().eco(t.place);var n=t.canvasOverlay._map.latLngToContainerPoint([t.place.point[1],t.place.point[0]]);return t.ctx.beginPath(),t.ctx.arc(n.x,n.y,a/2,0,2*Math.PI),t.ctx.fill(),t.ctx.closePath(),{x1:n.x,y1:n.y,x2:n.x+a,y2:n.y+a}};
//# sourceMappingURL=main.js.map
