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
})({"main.js":[function(require,module,exports) {
$(function () {
  editor();

  function editor() {
    var urls = {
      get: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQq6mS-wW57kGiyZqqVmdoYB6-EXal024k4wvaQXyOC7Kg4Q1upsElwSaqsyEnhhTtCTyYJ5LpnsO0m/pub?gid=84351487&single=true&output=csv&version=c_' + Math.round(Math.random() * 100),
      set: 'https://script.google.com/macros/s/AKfycbykQNfXqHqBTWXQw7nliPs2o2pcX5C5q_JBgWgxHptDi9pPOQ/exec?params='
    };
    var data = [];
    var map;
    var app = {
      maxId: 0
    };
    window.app = app;
    $.get(urls.get, function (d) {
      var temp = scvToArray(d);

      for (var i = 0; i < temp.length; i++) {
        if (temp[i][1].length) data.push(temp[i]);
      }

      window.data = data;
      $('#app').css({
        display: 'flex'
      });
      map = new createMap(data);
      $.each(data, function (i, e) {
        var id = new Number(e[0]);
        if (i > 0) $('#places').append("<div class=\"place-item\" data-index=\"".concat(i, "\" id=\"place-").concat(e[0], "\"><div>").concat(e[0], "</div><div>").concat(e[1], "</div></div>"));
        if (id > app.maxId) app.maxId = id;
      });

      app.deletePlace = function (id) {
        for (var i = 0; i < data.length; i++) {
          if (data[i][0] == id) {
            for (var k = 1; k < data[i].length; k++) {
              data[i][k] = '';
            }
          }
        }
      };

      app.setForm = function (curData) {
        $('#row_0 .row-control').text(curData[0]); //id

        $('#row_1 .row-control input').val(curData[1]); //name

        $('#row_2 .row-control input').first().val(curData[2]); //lat

        $('#row_2 .row-control input').last().val(curData[3]); //lon

        $('#row_2 .row-title a').attr('href', "https://yandex.ru/maps/?ll=".concat(curData[3], "%2C").concat(curData[2], "&z=14&mode=whatshere&whatshere%5Bpoint%5D=").concat(curData[3], "%2C").concat(curData[2])); //YA maps

        $('#row_3 .row-control input').val(curData[4]); //address

        $('#row_4 .row-control input').first().val(curData[5]); //price from

        $('#row_4 .row-control input').last().val(curData[6]); //price to

        $('#row_4 .row-title a').attr('href', "https://cian.ru/map/?deal_type=sale&engine_version=2&object_type%5B0%5D=1&offer_type=suburban&zoom=16&center=".concat(curData[2], "%2C").concat(curData[3])); //Cian

        $('#row_5 .row-control input').val(curData[7]); //ready date

        $('#row_6 .row-control input').val(curData[8]); //type

        $('#row_7 .row-control input').val(curData[9]); //class

        $('#row_8 .row-control input').val(curData[10]); //car distance

        $('#row_9 .row-control input').val(curData[11]); //car time

        $('#row_10 .row-control textarea').val(curData[12]); //description

        $('#row_11 .row-control input').val(curData[13]); //developper

        $('#row_12 .row-control input').val(curData[14]); //site

        $('#row_13 .row-control input').val(curData[15]); //land type

        $('#row_14 .row-control input').val(curData[16]); //energy

        $('#row_15 .row-control input').val(curData[17]); //water

        $('#row_16 .row-control input').val(curData[18]); //sanitation

        $('#row_17 .row-control input').val(curData[19]); //gas

        $('#row_18 .row-control input').val(curData[20]); //securyty

        $('#row_19 .row-control input').val(curData[21]); //infrastructure

        $('#row_20 .row-control input').val(curData[22]); //forest

        $('#row_21 .row-control input').val(curData[23]); //river/lake

        $('#row_22 .row-control input').val(curData[24]); //link
      };

      app.getForm = function () {
        return [$('#row_0 .row-control').text(), //id 0
        $('#row_1 .row-control input').val(), //name 1
        $('#row_2 .row-control input').first().val(), //lat 2
        $('#row_2 .row-control input').last().val(), //lon 3
        $('#row_3 .row-control input').val(), //address 4
        $('#row_4 .row-control input').first().val(), //price from 5
        $('#row_4 .row-control input').last().val(), //price to 6
        $('#row_5 .row-control input').val(), //ready date 7
        $('#row_6 .row-control input').val(), //type 8
        $('#row_7 .row-control input').val(), //class 9
        $('#row_8 .row-control input').val(), //car distance 10
        $('#row_9 .row-control input').val(), //car time 11
        $('#row_10 .row-control textarea').val(), //description 12
        $('#row_11 .row-control input').val(), //developper 13
        $('#row_12 .row-control input').val(), //site 14
        $('#row_13 .row-control input').val(), //land type 15
        $('#row_14 .row-control input').val(), //energy 16
        $('#row_15 .row-control input').val(), //water 17
        $('#row_16 .row-control input').val(), //sanitation 18
        $('#row_17 .row-control input').val(), //gas 19
        $('#row_18 .row-control input').val(), //securyty 20
        $('#row_19 .row-control input').val(), //infrastructure 21
        $('#row_20 .row-control input').val(), //forest
        $('#row_21 .row-control input').val(), //river/lake
        $('#row_22 .row-control input').val() //link
        ];
      };

      app.addPlace = function (arr) {
        arr = arr || [];
        arr[0] = app.maxId + 1;
        app.maxId = arr[0];
        data.push(arr);
        $('.place-item_selected').removeClass('place-item_selected');
        $('#places').append("<div class=\"place-item place-item_selected place-item_edited\" data-index=\"".concat(data.length - 1, "\" id=\"place-").concat(arr[0], "\"><div>").concat(arr[0], "</div><div>").concat(arr[1], "</div></div>"));
        $('#places').scrollTop(0).scrollTop($('.place-item_selected').offset().top);
      };

      app.changePlace = function () {
        if ($('#row_0 .row-control').text().length) {
          for (var i = 1; i < data.length; i++) {
            var curId = $('#row_0 .row-control').text();

            if (data[i][0] == curId) {
              $('#place-' + curId).find('div').last().text($('#row_1 .row-control input').val());
              data[i] = app.getForm();
              break;
            }
          }
        }
      };

      $('#form').find('input, textarea').change(function () {
        var curId = $('#row_0 .row-control').text();
        $('#place-' + curId).addClass('place-item_edited');
      });
      $('#places').on('click', '.place-item', function (e) {
        app.changePlace();
        $('.place-item').removeClass('place-item_selected');
        $(this).addClass('place-item_selected'); //

        var curId = $(this).attr('id').split('-')[1];
        var curData = [];
        $.each(data, function (i, e) {
          if (curId == e[0]) {
            curData = e;
            return false;
          }
        });
        app.setForm(curData);
        map.addMarker({
          lat: curData[2],
          lon: curData[3]
        }, curData[0]);
        map.map.setView(new L.LatLng(curData[2], curData[3]), 14);
        setTimeout(function () {
          $('#form').scrollTop(0);
        }, 100);
      });

      if (location.hash) {
        var hash = location.hash.replace('#', '');
        $('.place-item').each(function (i, e) {
          if ($(e).attr('id').replace('place-', '') == hash) {
            $(e).click();
            return false;
          }
        });
      }

      $('#submit').click(function (e) {
        app.changePlace();
        $('#place-' + $('#row_0 .row-control').text() + ' div').last().text($('#row_1 .row-control input').val());
        $('#submit').addClass('disabled');
        $('.place-item_edited').each(function (i, e) {
          for (var i = 1; i < data.length; i++) {
            if (data[i][0] == $(e).attr('id').split('-')[1]) {
              $(e).removeClass('place-item_edited');
              var arr = data[i];
              var result = arr.join('||');
              setTimeout(function (result) {
                console.log(result);
                $.get(urls.set + result, function (d) {
                  $('#submit').removeClass('disabled');
                }).done(function () {
                  $('#submit').removeClass('disabled');
                }).fail(function () {
                  $('#submit').removeClass('disabled');
                });
              }, 100, result);
            }
          }
        });
      });
    });
  }
});
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
},{}]},{},["../../.nvm/versions/node/v10.15.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map