// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"map.js":[function(require,module,exports) {
function createMap(data, activePointId) {
  var pointSize = 6;
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

  function traffic() {
    // https://tech.yandex.ru/maps/jsbox/2.1/traffic_provider
    var actualProvider = new ymaps.traffic.provider.Actual({}, {
      infoLayerShown: true
    });
    actualProvider.setMap(this._yandex);
  }

  var baseLayers = {
    'Yandex map': L.yandex() // 'map' is default
    .addTo(map),
    'Yandex map + Traffic': L.yandex('map').on('load', traffic),
    'Yandex satellite': L.yandex({
      type: 'satellite'
    }),
    // type can be set in options
    'Yandex hybrid': L.yandex('hybrid'),
    'OSM': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  };
  var overlays = {
    'Traffic': L.yandex('overlay').on('load', traffic)
  };
  L.control.layers(baseLayers, overlays).addTo(map);
  var customControl = L.Control.extend({
    options: {
      position: 'topleft'
    },
    onAdd: function onAdd(map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = 'white';
      container.style.backgroundSize = "30px 30px";
      container.style.width = '30px';
      container.style.height = '30px';
      container.innerText = "Add";
      container.style.textAlign = "center";
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.cursor = "pointer";

      container.onclick = function () {
        if (!__this.addPlaceMode) {
          __this.addPlaceMode = true;
        } else {
          __this.addPlaceMode = false;
        }
      };

      return container;
    }
  });
  map.addControl(new customControl());
  $('#map').click(function (e) {
    var clickPoint = {
      x: e.clientX,
      y: e.clientY
    };
    var offset = $('#map').offset();

    if (__this.addPlaceMode) {
      if (!e.target.className.includes('leaflet-control')) {
        var latLng = __this.canvas._map.containerPointToLatLng({
          x: clickPoint.x - offset.left,
          y: clickPoint.y - offset.top
        });

        __this.addMarker({
          lat: latLng.lat,
          lon: latLng.lng
        }, app.maxId + 1);

        __this.canvas._redraw();

        var place = new Array(30);
        place[0] = app.maxId;
        place[1] = 'Новый посёлок';
        place[2] = latLng.lat;
        place[3] = latLng.lng;
        app.changePlace();
        app.addPlace(place);
        app.setForm(place);
        __this.addPlaceMode = false;
      }
    } else {
      if (e.target.className.includes('leaflet-heatmap-layer')) {
        for (var id in __this.points) {
          if (clickPoint.x >= __this.points[id].x + offset.left && clickPoint.x <= __this.points[id].x + offset.left + pointSize && clickPoint.y >= __this.points[id].y + offset.top && clickPoint.y <= __this.points[id].y + offset.top + pointSize) {
            __this.activePointId = id;

            __this.addMarker(__this.points[id], id);

            __this.canvas._redraw(); //////


            $('.place-item_selected').removeClass('place-item_selected');
            $('#place-' + id).addClass('place-item_selected');
            $('#places').scrollTop(0).scrollTop($('#place-' + id).offset().top);
            app.changePlace();

            for (var i = 1; i < __this.data.length; i++) {
              if (id == __this.data[i][0]) {
                app.setForm(__this.data[i]);
              }
            } //////

          }
        }
      }
    }
  });

  this.addMarker = function (pos, id) {
    if (__this.marker) __this.map.removeLayer(__this.marker);
    var myIcon = L.divIcon({
      className: 'my-div-icon'
    });
    __this.marker = new L.marker([pos.lat, pos.lon], {
      draggable: 'true',
      icon: myIcon
    });

    __this.marker.on('dragend', function (event) {
      var marker = event.target;
      var position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng), {
        draggable: 'true'
      });

      __this.map.panTo(new L.LatLng(position.lat, position.lng));

      for (var i = 1; i < __this.data.length; i++) {
        if (id == __this.data[i][0]) {
          __this.data[i][2] = position.lat, __this.data[i][3] = position.lng; /////

          $('#place-' + id).addClass('place-item_edited'); /////
        }
      }

      $('#row_2 .row-control input').first().val(position.lat); //lat

      $('#row_2 .row-control input').last().val(position.lng); //lon

      $('#row_2 .row-title a').attr('href', "https://yandex.ru/maps/?ll=".concat(position.lng, "%2C").concat(position.lat, "&z=14&mode=whatshere&whatshere%5Bpoint%5D=").concat(position.lng, "%2C").concat(position.lat)); //YA maps

      $('#row_4 .row-title a').attr('href', "https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=".concat(position.lat, "%2C").concat(position.lng)); //Cian
    });

    __this.map.addLayer(__this.marker);
  };

  function drawingOnCanvas(p) {
    var ctx = p._canvas.getContext('2d');

    ctx.clearRect(0, 0, p._canvas.width, p._canvas.height);

    for (var i = 1; i < __this.data.length; i++) {
      if (!__this.data[i][2] || !__this.data[i][3]) continue;
      var point = [__this.data[i][2], __this.data[i][3]];

      var dot = p._map.latLngToContainerPoint([point[0], point[1]]);

      __this.points[__this.data[i][0]] = {
        x: dot.x,
        y: dot.y,
        lat: __this.data[i][2],
        lon: __this.data[i][3]
      };
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255,.5)';
      ctx.fillStyle = __this.activePointId == __this.data[i][0] ? 'rgba(55, 110, 200,.3)' : 'rgba(55, 110, 200,.8)';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, pointSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  ;
  return this;
}
},{}],"../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62987" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","map.js"], null)
//# sourceMappingURL=/map.27237bf4.js.map