"use strict";var __=__||{},listners={};function bindEvent(a,t,n){window.listners[a+"|"+t]||(window.listners[a+"|"+t]={name:a,event:t},$(document).on(t,a,n))}function unbindEvent(a,t){delete window.listners[a+"|"+t],$(document).off(t,a)}function decodeData(p){var v=[];return $.each(p.p,function(a,t){var n,e,i,s,c,o,r,l,d,m={id:t[7],point:[t[15],t[0]],price:{from:-1<t[13]?t[13]:null,to:-1<t[14]?t[14]:null},name:p.n[t[17]],readyDate:t[6]?t[6]:null,type:-1<t[16]?p.t[t[16]]:null,class:-1<t[18]?p.k[t[18]]:null,car:{distance:t[1],time:{h:t[2],m:t[3]}},moscow:{distance:t[8]},railroad:{distance:t[4],closest:(r=p.r,l=t[5],d={},$.each(r,function(a,t){l==t[0]&&(d={id:t[0],name:t[2],point:[t[1],t[3]],distance:t[4],time:{h:t[5],m:t[6]}})}),d)},city:{distance:t[11],closest:(s=p.c,c=t[12],o={},$.each(s,function(a,t){c==t[0]&&(o={id:t[0],name:t[2],point:[t[1],t[3]]})}),o)},eco:{distance:t[9],closest:(n=p.e,e=t[10],i={},$.each(n,function(a,t){e==t[0]&&(i={id:t[0],name:t[2],point:[t[1],t[3]],type:t[4]})}),i)},canvas:{visible:!0}};v.push(m)}),v}L.CanvasOverlay=L.Class.extend({initialize:function(a,t){this._userDrawFunc=a,L.setOptions(this,t)},drawing:function(a){return this._userDrawFunc=a,this},params:function(a){return L.setOptions(this,a),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(a){this._map=a,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var t=this._map.getSize();this._canvas.width=t.x,this._canvas.height=t.y;var n=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(n?"animated":"hide")),a._panes.overlayPane.appendChild(this._canvas),a.on("moveend",this._reset,this),a.on("resize",this._resize,this),a.options.zoomAnimation&&L.Browser.any3d&&a.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(a){a.getPanes().overlayPane.removeChild(this._canvas),a.off("moveend",this._reset,this),a.off("resize",this._resize,this),a.options.zoomAnimation&&a.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(a){return a.addLayer(this),this},_resize:function(a){this._canvas.width=a.newSize.x,this._canvas.height=a.newSize.y},_reset:function(){var a=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,a),this._redraw()},_redraw:function(){var a=this._map.getSize(),t=this._map.getBounds(),n=180*a.x/(20037508.34*(t.getEast()-t.getWest())),e=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:t,size:a,zoomScale:n,zoom:e,options:this.options}),this._frame=null},_animateZoom:function(a){var t=this._map.getZoomScale(a.zoom),n=this._map._getCenterOffset(a.center)._multiplyBy(-t).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(n)+" scale("+t+")"}}),L.canvasOverlay=function(a,t){return new L.CanvasOverlay(a,t)},$(function(){var n=L.map("map").setView([55.751244,37.618423],9);function t(a,n){$("#places").empty(),$.each(a,function(a,t){if(n)t.canvas.visible&&$("#places").append(__.placeItem(t));else{if(!(a<100))return!1;$("#places").append(__.placeItem(t))}})}L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA").addTo(n),window.map=n,$.get("bin/data/data.json",function(a){a=decodeData(a),function(t){var a=L.canvasOverlay().drawing(function(n,a){var e=a.canvas.getContext("2d"),i=window.map.getZoom();e.clearRect(0,0,a.canvas.width,a.canvas.height),$.each(t,function(a,t){t.canvas.visible&&(t.canvas=__.placePoint({ctx:e,canvasOverlay:n,zoom:i,place:t}))})}).addTo(n);window.map.canvas=a}(window.DATA=a),t(a)}),$("#map").click(function(a){var n=a.offsetX,e=a.offsetY;$.each(DATA,function(a,t){n>t.canvas.x1&&n<t.canvas.x2&&e>t.canvas.y1&&e<t.canvas.y2&&console.log(e,t)})}),$("#places").scroll(function(a){var t=$("#places").find(".place-item").last(),n=(t.attr("id").split("-")[1],$("#places").find(".place-item").length);if(!window.map.search&&t.offset().top<2*$(window).outerHeight()){var e=100;$.each(DATA,function(a,t){if(n<a&&($("#places").append(__.placeItem(t)),e--),!e)return!1})}}),__.renderList=t}),__.cost=function(a){var t=a.value;return t=/\.\d/.test(t)?t+"":t+".00",(t=(t=/\.\d{2}/.test(t)?t:t+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.placeItem=function(a){var t,n,e=(t=a.price,{from:(n={from:t.from?"undefined"!=typeof global?global.component("cost",{value:t.from})[0]:__.cost({value:t.from})[0]:"",to:t.to?"undefined"!=typeof global?global.component("cost",{value:t.to})[0]:__.cost({value:t.to})[0]:""}).from?"от ".concat(n.from," руб."):"",to:n.to?"до ".concat(n.to," руб."):""}),i="undefined"!=typeof global?"#fafafa":a.canvas.color,s=a.type?'<span class="place-item__type">'.concat(a.type,"</span>"):"",c=(a.eco.distance<10&&"<div>".concat(a.eco.closest.name," в ").concat(a.eco.distance,"км</div>"),'<div class="place-item__car">до Москвы: '.concat(a.car.time.h,"ч ").concat(a.car.time.m,"мин (").concat(a.car.distance,"км)</div>")),o=a.railroad.distance<3?'<div class="place-item__train">ст. '.concat(a.railroad.closest.name," в ").concat(a.railroad.distance,"км,<br>до Москвы: ").concat(a.railroad.closest.time.h,"ч ").concat(a.railroad.closest.time.m,"мин (").concat(a.railroad.closest.distance,"км)</div>"):"",r='<div class="place-item" id="place-'.concat(a.id,'"> <div class="place-item__title"> <div class="place-item__pin" style="background:').concat(i,'"></div> <div> ').concat(s,'<span class="place-item__name">').concat(a.name,'</span> </div> </div> <div class="place-item__price">').concat(e.from," ").concat(e.to,'</div> <div class="place-item__distance"> ').concat(c," ").concat(o," </div></div>");return bindEvent(".place-item","click",function(a){var n=$(a.currentTarget).attr("id").split("-")[1];$.each(DATA,function(a,t){if(t.id==n)return map.setView(new L.LatLng(t.point[1],t.point[0]),14),!1})}),r},__.search=function(a){var n=a.text.toLowerCase().trim(),e=[];return a.text?($.each(DATA,function(a,t){-1!==t.name.toLowerCase().trim().indexOf(n)?(t.canvas.visible=!0,e.push(t)):t.canvas.visible=!1}),e.length?window.map.search=!0:window.map.search=!1,__.renderList(DATA,!0),$("#places").scrollTop(0)):(window.map.search=!1,$.each(DATA,function(a,t){t.canvas.visible=!0}),__.renderList(DATA,!1)),map.canvas.redraw(),e},__.colorize=function(a){function i(a,t,n,e){return"rgba(".concat(a,",").concat(t,",").concat(n,",").concat(e,")")}function s(a,t,n,e,i){return e+(n-a)/(t-a)*((i-e)/1)}function c(a,t){var n=[];return n[3]=1-(1-t[3])*(1-a[3]),n[0]=Math.round(t[0]*t[3]/n[3]+a[0]*a[3]*(1-t[3])/n[3]),n[1]=Math.round(t[1]*t[3]/n[3]+a[1]*a[3]*(1-t[3])/n[3]),n[2]=Math.round(t[2]*t[3]/n[3]+a[2]*a[3]*(1-t[3])/n[3]),n}return this.eco=function(a){var t=10;switch(a.eco.closest.type){case"K":case"p":t=3;break;case"n":t=5}var n=a.eco.distance,e=c([0,98,255,.3],[255,30,0,n<t?.6-s(0,t,n,0,.6):0]);return i(e[0],e[1],e[2],e[3])},this.railroad=function(a){var t=a.railroad.distance,n=c([255,30,0,.2],[0,98,255,t<3?1-s(0,3,t,0,1):0]);return i(n[0],n[1],n[2],n[3])},this.car=function(a){var t=c([255,30,0,.5],[0,98,255,.7-s(10,100,a.car.distance,0,.7)]);return i(t[0],t[1],t[2],t[3])},this},__.placePoint=function(a){var t=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[a.zoom].s,n=__.colorize().eco(a.place);a.ctx.fillStyle=n;var e=a.canvasOverlay._map.latLngToContainerPoint([a.place.point[1],a.place.point[0]]);return a.ctx.beginPath(),a.ctx.arc(e.x,e.y,t/2,0,2*Math.PI),a.ctx.fill(),a.ctx.closePath(),{x1:e.x,y1:e.y,x2:e.x+t,y2:e.y+t,color:n,visible:a.place.canvas.visible}};
//# sourceMappingURL=main.js.map
