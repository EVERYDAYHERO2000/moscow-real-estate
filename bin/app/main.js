"use strict";function bindEvent(e,a,t){var n=$("#app").data("listners")||{};n[e+"|"+a]||(n[e+"|"+a]={name:e,event:a},$("#app").data("listners",n),$(document).on(a,e,t))}function unbindEvent(e,a){var t=$("#app").data("listners")||{};delete t[e+"|"+a],$("#app").data("listners",t),$(document).off(a,e)}function decodeData(u){var m=[],h={};return $.each(u.p,function(e,a){var t,n,i,o,r,s,c,l,p,d={id:a[7],point:[a[15],a[0]],price:{from:-1<a[13]?a[13]:null,to:-1<a[14]?a[14]:null},name:u.n[a[17]],readyDate:a[6]?a[6]:null,type:-1<a[16]?u.t[a[16]]:null,class:-1<a[18]?u.k[a[18]]:null,car:{distance:a[1],time:{h:a[2],m:a[3]}},moscow:{distance:a[8]},railroad:{distance:a[4],closest:(c=u.r,l=a[5],p={},$.each(c,function(e,a){l==a[0]&&(p={id:a[0],name:a[2],point:[a[1],a[3]],distance:a[4],time:{h:a[5],m:a[6]}})}),p)},city:{distance:a[11],closest:(o=u.c,r=a[12],s={},$.each(o,function(e,a){r==a[0]&&(s={id:a[0],name:a[2],point:[a[1],a[3]]})}),s)},eco:{distance:a[9],closest:(t=u.e,n=a[10],i={},$.each(t,function(e,a){n==a[0]&&(i={id:a[0],name:a[2],point:[a[1],a[3]],type:a[4]},h[i.id]=i)}),i)},canvas:{visible:!0}};m.push(d)}),{places:m,eco:h}}L.CanvasOverlay=L.Class.extend({initialize:function(e,a){this._userDrawFunc=e,L.setOptions(this,a)},drawing:function(e){return this._userDrawFunc=e,this},params:function(e){return L.setOptions(this,e),this},canvas:function(){return this._canvas},redraw:function(){return this._frame||(this._frame=L.Util.requestAnimFrame(this._redraw,this)),this},onAdd:function(e){this._map=e,this._canvas=L.DomUtil.create("canvas","leaflet-heatmap-layer");var a=this._map.getSize();this._canvas.width=a.x,this._canvas.height=a.y;var t=this._map.options.zoomAnimation&&L.Browser.any3d;L.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(t?"animated":"hide")),e._panes.overlayPane.appendChild(this._canvas),e.on("moveend",this._reset,this),e.on("resize",this._resize,this),e.options.zoomAnimation&&L.Browser.any3d&&e.on("zoomanim",this._animateZoom,this),this._reset()},onRemove:function(e){e.getPanes().overlayPane.removeChild(this._canvas),e.off("moveend",this._reset,this),e.off("resize",this._resize,this),e.options.zoomAnimation&&e.off("zoomanim",this._animateZoom,this),this_canvas=null},addTo:function(e){return e.addLayer(this),this},_resize:function(e){this._canvas.width=e.newSize.x,this._canvas.height=e.newSize.y},_reset:function(){var e=this._map.containerPointToLayerPoint([0,0]);L.DomUtil.setPosition(this._canvas,e),this._redraw()},_redraw:function(){var e=this._map.getSize(),a=this._map.getBounds(),t=180*e.x/(20037508.34*(a.getEast()-a.getWest())),n=this._map.getZoom();this._userDrawFunc&&this._userDrawFunc(this,{canvas:this._canvas,bounds:a,size:e,zoomScale:t,zoom:n,options:this.options}),this._frame=null},_animateZoom:function(e){var a=this._map.getZoomScale(e.zoom),t=this._map._getCenterOffset(e.center)._multiplyBy(-a).subtract(this._map._getMapPanePos());this._canvas.style[L.DomUtil.TRANSFORM]=L.DomUtil.getTranslateString(t)+" scale("+a+")"}}),L.canvasOverlay=function(e,a){return new L.CanvasOverlay(e,a)};var __=__||{core:{},fs:{}},runApp=function(){__.core=__.fs.coreModuls(["$window","$app","$header","$map","$places","$placeSearch","$mapControls"]),$.get("bin/data/data.json",function(e){var a=decodeData(e);__.core.$app.data("data",a),__.core.$map.trigger("createMap").trigger("renderMap",{data:a}),__.core.$places.trigger("renderList",{places:a.places,onlyVisible:!1})})};__.browserDetect=function(){navigator.appVersion;var e,a,t,n=navigator.userAgent,i=navigator.appName,o=""+parseFloat(navigator.appVersion),r=parseInt(navigator.appVersion,10);-1!=(a=n.indexOf("Opera"))?(i="opera",o=n.substring(a+6),-1!=(a=n.indexOf("Version"))&&(o=n.substring(a+8))):-1!=(a=n.indexOf("MSIE"))?(i="ie",o=n.substring(a+5)):-1!=(a=n.indexOf("Chrome"))?(i="chrome",o=n.substring(a+7)):-1!=(a=n.indexOf("Safari"))?(i="safari",o=n.substring(a+7),-1!=(a=n.indexOf("Version"))&&(o=n.substring(a+8))):-1!=(a=n.indexOf("Firefox"))?(i="firefox",o=n.substring(a+8)):-1!=n.indexOf("FBAN")&&-1!=n.indexOf("FBAV")?(i="facebook",o=0):(e=n.lastIndexOf(" ")+1)<(a=n.lastIndexOf("/"))&&(i=n.substring(e,a),o=n.substring(a+1),i.toLowerCase()==i.toUpperCase()&&(i=navigator.appName)),-1!=(t=o.indexOf(";"))&&(o=o.substring(0,t)),-1!=(t=o.indexOf(" "))&&(o=o.substring(0,t)),r=parseInt(""+o,10),isNaN(r)&&(o=""+parseFloat(navigator.appVersion),r=parseInt(navigator.appVersion,10));var s,c,l=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,p=window.devicePixelRatio||1,d=window.screen.width*p,u=window.screen.height*p;return{browserName:i.toLowerCase(),fullVersion:o,majorVersion:r,appName:navigator.appName.toLowerCase(),userAgent:navigator.userAgent.toLowerCase(),platform:navigator.platform.toLowerCase(),iphoneX:l&&1125==d&&2436===u?"iphoneX":"",isMobile:(c="not-mobile",s=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(s)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(s.substr(0,4)))&&(c="mobile"),c)}},__.cost=function(e){var a=e.value;return a=/\.\d/.test(a)?a+"":a+".00",(a=(a=/\.\d{2}/.test(a)?a:a+"0").replace(/\d(?=(\d{3})+\.)/g,"$& ")).split(".")},__.placeItem=function(e){var a,t,n=(a=e.price,{from:(t={from:a.from?"undefined"!=typeof global?global.component("cost",{value:a.from})[0]:__.cost({value:a.from})[0]:"",to:a.to?"undefined"!=typeof global?global.component("cost",{value:a.to})[0]:__.cost({value:a.to})[0]:""}).from?"от ".concat(t.from," руб."):"",to:t.to?"до ".concat(t.to," руб."):""}),i="undefined"!=typeof global?"#fafafa":e.canvas.color,o=e.type?'<span class="place-item__type">'.concat(e.type,"</span>"):"",r=(e.eco.distance<10&&"<div>".concat(e.eco.closest.name," в ").concat(e.eco.distance,"км</div>"),'<div class="place-item__car">до Москвы: '.concat(e.car.time.h,"ч ").concat(e.car.time.m,"мин (").concat(e.car.distance,"км)</div>")),s=e.railroad.distance<3?'<div class="place-item__train">ст. '.concat(e.railroad.closest.name," в ").concat(e.railroad.distance,"км,<br>до Москвы: ").concat(e.railroad.closest.time.h,"ч ").concat(e.railroad.closest.time.m,"мин (").concat(e.railroad.closest.distance,"км)</div>"):"",c='<div class="place-item" id="place-'.concat(e.id,'"> <div class="place-item__title"> <div class="place-item__pin" style="background:').concat(i,'"></div> <div> ').concat(o,'<span class="place-item__name">').concat(e.name,'</span> </div> </div> <div class="place-item__price">').concat(n.from," ").concat(n.to,'</div> <div class="place-item__distance"> ').concat(r," ").concat(s," </div></div>");return"undefined"==typeof global&&bindEvent(".place-item","click",function(e){var a=$("#app").data("data").places,t=$("#map").data("map"),n=$(e.currentTarget).attr("id").split("-")[1];$.each(a,function(e,a){if(a.id==n)return t.setView(new L.LatLng(a.point[1],a.point[0]),14),!1})}),c},__.colorize=function(e){function i(e,a,t,n){return"rgba(".concat(e,",").concat(a,",").concat(t,",").concat(n,")")}function o(e,a,t,n,i){return n+(t-e)/(a-e)*((i-n)/1)}function r(e,a){var t=[];return t[3]=1-(1-a[3])*(1-e[3]),t[0]=Math.round(a[0]*a[3]/t[3]+e[0]*e[3]*(1-a[3])/t[3]),t[1]=Math.round(a[1]*a[3]/t[3]+e[1]*e[3]*(1-a[3])/t[3]),t[2]=Math.round(a[2]*a[3]/t[3]+e[2]*e[3]*(1-a[3])/t[3]),t}return this.default=function(){return i(0,98,255,.5)},this.eco=function(e){var a=10;switch(e.eco.closest.type){case"K":case"p":a=3;break;case"n":a=5}var t=e.eco.distance,n=r([0,98,255,.3],[255,30,0,t<a?.6-o(0,a,t,0,.6):0]);return i(n[0],n[1],n[2],n[3])},this.railroad=function(e){var a=e.railroad.distance,t=r([255,30,0,.1],[0,98,255,a<3?1-o(0,3,a,0,1):0]);return i(t[0],t[1],t[2],t[3])},this.car=function(e){var a=r([255,30,0,.1],[0,98,255,.3-o(10,200,e.car.distance,0,.3)]);return i(a[0],a[1],a[2],a[3])},this},__.placePoint=function(e){var a=2*{0:{s:.5},1:{s:.5},2:{s:.5},3:{s:1},4:{s:1},5:{s:2},6:{s:2},7:{s:3},8:{s:3},9:{s:3},10:{s:4},11:{s:4},12:{s:4},13:{s:6},14:{s:6},15:{s:6},16:{s:12},17:{s:12},18:{s:12}}[e.zoom].s,t=$("#select-layer").val(),n=__.colorize()[t](e.place);e.ctx.fillStyle=n;var i=e.canvasOverlay._map.latLngToContainerPoint([e.place.point[1],e.place.point[0]]);return e.ctx.beginPath(),e.ctx.arc(i.x,i.y,a/2,0,2*Math.PI),e.ctx.fill(),e.ctx.closePath(),{x1:i.x,y1:i.y,x2:i.x+a,y2:i.y+a,color:n,visible:e.place.canvas.visible}},__.search=function(e){var a=$("#app").data("data").places,t=[],n=[],i=$("#map").data("map"),o=new __.substringSearch({multiply:!1}),r={};return e.text?(t=o.inArray(e.text,a,function(e){return e.name},function(e){e.canvas.visible=!0},function(e){e.canvas.visible=!1}),i.search=!!t.length,$.each(t,function(e,a){r[a.res.obj.id]||(r[a.res.obj.id]=!0,n.push(a.res.obj))}),$("#places").trigger("renderList",{places:n,onlyVisible:!0}).scrollTop(0)):(i.search=!1,$.each(a,function(e,a){a.canvas.visible=!0}),$("#places").trigger("renderList",{places:a,onlyVisible:!1})),$("#map").data("canvas").redraw(),n},__.substringSearch=function(u){(u=u||{}).weight=u.weight||100,u.multiply=u.multiply||!0;var m=this,h={weight:0,search:"",res:"",in:-1,out:-1,length:0};function v(e,a){for(var t=e.toLowerCase().trim(),n=(""+a.str).toLowerCase(),i=n.indexOf(t),o=u.weight,r=n.length,s=t.length,c=e.length*(o/10),l=[];;){var p=g(h);p.search=e,p.res=a;var d=n.indexOf(t,i);if(-1==d)break;s<=r&&n.indexOf(t,i)+1&&(p.weight+=50<r/s*100?o+c:r/s*o+c,p.weight=r-d,p.in=d,p.out=p.in+t.length,r===(p.length=s)&&(p.weight+=2*o),n[0]===t[0]&&(p.weight+=o)),l.push(p),i=d+1}return u.multiply||(l=[(l=l.sort(f))[0]]),l}function f(e,a){var t=0;return(e=e.weight)<(a=a.weight)?t=1:a<e&&(t=-1),t}function g(e){return Object.assign({},e)}return this.inString=function(e,a){var t=(e=""+e).length?e.trim().split(" "):[""],n=a.length?a.trim().split(" "):[""],i=t.length,o=e.length,r=n.length,s={str:a},c=[];if(o){if(e.indexOf(" ")+1){var l=v(e,s);l.weight&&(l.weight=l.weight*r),c=l}for(var p=i;p--;)c=c.concat(v(t[p],s));c=c.sort(f)}else{var d=g(h);d.search=e,d.res=s,c.push(d)}return c},this.inArray=function(e,a,t,n,i){e=""+e;for(var o=[],r=a.length;r--;){var s=t(a[r]),c={obj:a[r],str:s,index:r},l=m.inString(e,s),p=l.length;if(p){for(var d=p;d--;)n&&n(a[r]),l[d]&&(l[d].res=c);o=o.concat(l)}else i&&i(a[r])}return o=o.sort(f)},this},__.select=function(e){},__.core.$app=function(){return $("#app").data("browser",__.browserDetect()).addClass(function(){var e=$(this).data("browser");return[e.browserName,e.platform,e.isMobile].join(" ")}),$("#app")},__.core.$header=function(){return $("#change-view").click(function(){"На карте"!=$(this).text()?$(this).text("На карте"):$(this).text("Списком"),$("#main").toggleClass("main_screen-2")}),$("#header")},__.core.$map=function(){return $("#map").click(function(e){var a=$("#app").data("data").places,t=e.offsetX,n=e.offsetY;$.each(a,function(e,a){t>a.canvas.x1&&t<a.canvas.x2&&n>a.canvas.y1&&n<a.canvas.y2&&console.log(n,a)})}).bind("createMap",function(e){var a=$(e.target).attr("id"),t=L.map(a).setView([55.751244,37.618423],9);L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA").addTo(t),$(e.target).data("map",t)}).bind("renderMap",function(e,a){var n=this,c=a.data.places,l=a.data.eco,t=$(e.target).data("map"),i=L.canvasOverlay().drawing(function(i,e){var o=e.canvas.getContext("2d"),t=$(n).data("map").getZoom();o.clearRect(0,0,e.canvas.width,e.canvas.height),$.each(c,function(e,a){a.canvas.visible&&(a.canvas=__.placePoint({ctx:o,canvasOverlay:i,zoom:t,place:a}))});var r=new Image,s={recicle:1,radiation:40,factory:80,trash:120,airport:160,power:200,water:240};r.addEventListener("load",function(){$.each(l,function(e,a){var t=null;"n"==a.type&&(t=s.recicle),"a"==a.type&&(t=s.airport),"w"!=a.type&&"q"!=a.type||(t=s.trash),"r"==a.type&&(t=s.radiation),"o"!=a.type&&"E"!=a.type||(t=s.factory),"s"==a.type&&(t=s.water),"K"!=a.type&&"p"!=a.type||(t=s.power);var n=i._map.latLngToContainerPoint([a.point[1],a.point[0]]);t&&o.drawImage(r,0,t,40,40,n.x-20,n.y-20,26,26)})},!1),r.src="source/assets/img/map/pins@".concat(2,"x.png")}).addTo(t);$(n).data("canvas",i)}),$("#map")},__.core.$mapControls=function(){$("#map-controls").bind("create",function(e){var a={default:{title:"Нет",selected:!1},eco:{title:"Экология",selected:!0},railroad:{title:"Электирички",selected:!1}},n="";$.each(a,function(e,a){var t=a.selected?"selected":"";n+="<option ".concat(t,' value="').concat(e,'">').concat(a.title,"</option>")});var t=$('<select id="select-layer" class="select">'.concat(n,"</select>")).data("options",a).change(function(e){var a=$(this).data("options"),t=$(this).val();$.each(a,function(e,a){a.selected=t==e}),$("#map").data("canvas").redraw()});$(this).find(".layers-controls").append(t)}).trigger("create")},__.core.$placeSearch=function(){return $("#place-search").bind("search",function(e,a){__.search({text:$(this).find("input").val()})}).keyup(function(e){var a=e.which;13==a&&e.preventDefault(),32!=a&&13!=a&&188!=a&&186!=a||$(this).trigger("search")}).find("button").click(function(e){$(this).trigger("search")}),$("#place-search")},__.core.$places=function(){return $("#places").scroll(function(e){var t=this,a=$(t).find(".place-item").last(),n=(a.attr("id").split("-")[1],$(t).find(".place-item").length);if(!$("#map").data("map").search&&a.offset().top<2*$(window).outerHeight()){var i=$("#app").data("data").places,o=100;$.each(i,function(e,a){if(n<e&&($(t).append(__.placeItem(a)),o--),!o)return!1})}}).bind("renderList",function(e,a){var t=this,n=a.onlyVisible||!1,i=a.places;$(t).empty(),$.each(i,function(e,a){if(n)a.canvas.visible&&$(t).append(__.placeItem(a));else{if(!(e<100))return!1;$(t).append(__.placeItem(a))}})}),$("#places")},__.core.$window=function(){var e=$("#header").outerHeight();$(window).outerHeight();function a(){$("#main").css({height:"calc(100vh - ".concat(e,"px)")})}return a(),$(window).resize(function(e){a()}),$(window)},__.fs.coreModuls=function(e){var t={};return $.each(e,function(e,a){t[a]=__.core[a]()}),t},$(function(){runApp()});
//# sourceMappingURL=main.js.map
