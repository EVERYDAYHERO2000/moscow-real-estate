var __ = { core: {}, fs: {} };
("use strict");
function _slicedToArray(t, a) {
  return (
    _arrayWithHoles(t) || _iterableToArrayLimit(t, a) || _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit(t, a) {
  if (
    Symbol.iterator in Object(t) ||
    "[object Arguments]" === Object.prototype.toString.call(t)
  ) {
    var n = [],
      e = !0,
      i = !1,
      o = void 0;
    try {
      for (
        var c, s = t[Symbol.iterator]();
        !(e = (c = s.next()).done) && (n.push(c.value), !a || n.length !== a);
        e = !0
      );
    } catch (t) {
      (i = !0), (o = t);
    } finally {
      try {
        e || null == s.return || s.return();
      } finally {
        if (i) throw o;
      }
    }
    return n;
  }
}
function _arrayWithHoles(t) {
  if (Array.isArray(t)) return t;
}
(L.CanvasOverlay = L.Class.extend({
  initialize: function (t, a) {
    (this._userDrawFunc = t), L.setOptions(this, a);
  },
  drawing: function (t) {
    return (this._userDrawFunc = t), this;
  },
  params: function (t) {
    return L.setOptions(this, t), this;
  },
  canvas: function () {
    return this._canvas;
  },
  redraw: function () {
    return (
      this._frame ||
        (this._frame = L.Util.requestAnimFrame(this._redraw, this)),
      this
    );
  },
  onAdd: function (t) {
    (this._map = t),
      (this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer"));
    var a = this._map.getSize();
    (this._canvas.width = a.x), (this._canvas.height = a.y);
    var n = this._map.options.zoomAnimation && L.Browser.any3d;
    L.DomUtil.addClass(
      this._canvas,
      "leaflet-zoom-" + (n ? "animated" : "hide")
    ),
      t._panes.overlayPane.appendChild(this._canvas),
      t.on("moveend", this._reset, this),
      t.on("resize", this._resize, this),
      t.options.zoomAnimation &&
        L.Browser.any3d &&
        t.on("zoomanim", this._animateZoom, this),
      this._reset();
  },
  onRemove: function (t) {
    t.getPanes().overlayPane.removeChild(this._canvas),
      t.off("moveend", this._reset, this),
      t.off("resize", this._resize, this),
      t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this),
      (this_canvas = null);
  },
  addTo: function (t) {
    return t.addLayer(this), this;
  },
  _resize: function (t) {
    (this._canvas.width = t.newSize.x), (this._canvas.height = t.newSize.y);
  },
  _reset: function () {
    var t = this._map.containerPointToLayerPoint([0, 0]);
    L.DomUtil.setPosition(this._canvas, t), this._redraw();
  },
  _redraw: function () {
    var t = this._map.getSize(),
      a = this._map.getBounds(),
      n = (180 * t.x) / (20037508.34 * (a.getEast() - a.getWest())),
      e = this._map.getZoom();
    this._userDrawFunc &&
      this._userDrawFunc(this, {
        canvas: this._canvas,
        bounds: a,
        size: t,
        zoomScale: n,
        zoom: e,
        options: this.options,
      }),
      (this._frame = null);
  },
  _animateZoom: function (t) {
    var a = this._map.getZoomScale(t.zoom),
      n = this._map
        ._getCenterOffset(t.center)
        ._multiplyBy(-a)
        .subtract(this._map._getMapPanePos());
    this._canvas.style[L.DomUtil.TRANSFORM] =
      L.DomUtil.getTranslateString(n) + " scale(" + a + ")";
  },
})),
  (L.canvasOverlay = function (t, a) {
    return new L.CanvasOverlay(t, a);
  }),
  (function () {
    var i = {
      ru: {
        touch: "Коснитесь двумя для перемещения по карте",
        scroll: "Чтобы изменить масштаб, нажмите ctrl + прокрутка",
        scrollMac: "Чтобы изменить масштаб, нажмите ⌘ + прокрутка",
      },
    };
    L.Map.mergeOptions({ gestureHandlingOptions: { text: {}, duration: 1e3 } });
    var a = !1,
      t = L.Handler.extend({
        addHooks: function () {
          (this._handleTouch = this._handleTouch.bind(this)),
            this._setupPluginOptions(),
            this._setLanguageContent(),
            this._disableInteractions(),
            this._map._container.addEventListener(
              "touchstart",
              this._handleTouch
            ),
            this._map._container.addEventListener(
              "touchmove",
              this._handleTouch
            ),
            this._map._container.addEventListener(
              "touchend",
              this._handleTouch
            ),
            this._map._container.addEventListener(
              "touchcancel",
              this._handleTouch
            ),
            this._map._container.addEventListener("click", this._handleTouch),
            L.DomEvent.on(
              this._map._container,
              "mousewheel",
              this._handleScroll,
              this
            ),
            L.DomEvent.on(this._map, "mouseover", this._handleMouseOver, this),
            L.DomEvent.on(this._map, "mouseout", this._handleMouseOut, this),
            L.DomEvent.on(this._map, "movestart", this._handleDragging, this),
            L.DomEvent.on(this._map, "move", this._handleDragging, this),
            L.DomEvent.on(this._map, "moveend", this._handleDragging, this);
        },
        removeHooks: function () {
          this._enableInteractions(),
            this._map._container.removeEventListener(
              "touchstart",
              this._handleTouch
            ),
            this._map._container.removeEventListener(
              "touchmove",
              this._handleTouch
            ),
            this._map._container.removeEventListener(
              "touchend",
              this._handleTouch
            ),
            this._map._container.removeEventListener(
              "touchcancel",
              this._handleTouch
            ),
            this._map._container.removeEventListener(
              "click",
              this._handleTouch
            ),
            L.DomEvent.off(
              this._map._container,
              "mousewheel",
              this._handleScroll,
              this
            ),
            L.DomEvent.off(this._map, "mouseover", this._handleMouseOver, this),
            L.DomEvent.off(this._map, "mouseout", this._handleMouseOut, this),
            L.DomEvent.off(this._map, "movestart", this._handleDragging, this),
            L.DomEvent.off(this._map, "move", this._handleDragging, this),
            L.DomEvent.off(this._map, "moveend", this._handleDragging, this);
        },
        _handleDragging: function (t) {
          "movestart" == t.type || "move" == t.type
            ? (a = !0)
            : "moveend" == t.type && (a = !1);
        },
        _disableInteractions: function () {
          this._map.dragging.disable(),
            this._map.scrollWheelZoom.disable(),
            this._map.tap && this._map.tap.disable();
        },
        _enableInteractions: function () {
          this._map.dragging.enable(),
            this._map.scrollWheelZoom.enable(),
            this._map.tap && this._map.tap.enable();
        },
        _setupPluginOptions: function () {
          this._map.options.gestureHandlingText &&
            (this._map.options.gestureHandlingOptions.text = this._map.options.gestureHandlingText);
        },
        _setLanguageContent: function () {
          var t;
          if (
            this._map.options.gestureHandlingOptions &&
            this._map.options.gestureHandlingOptions.text &&
            this._map.options.gestureHandlingOptions.text.touch &&
            this._map.options.gestureHandlingOptions.text.scroll &&
            this._map.options.gestureHandlingOptions.text.scrollMac
          )
            t = this._map.options.gestureHandlingOptions.text;
          else {
            var a = this._getUserLanguage();
            i[(a = a || "ru")] && (t = i[a]),
              t || -1 === a.indexOf("-") || ((a = a.split("-")[0]), (t = i[a])),
              (t = t || i[(a = "ru")]);
          }
          var n = !1;
          0 <= navigator.platform.toUpperCase().indexOf("MAC") && (n = !0);
          var e = t.scroll;
          n && (e = t.scrollMac),
            this._map._container.setAttribute(
              "data-gesture-handling-touch-content",
              t.touch
            ),
            this._map._container.setAttribute(
              "data-gesture-handling-scroll-content",
              e
            );
        },
        _getUserLanguage: function () {
          return navigator.languages
            ? navigator.languages[0]
            : navigator.language || navigator.userLanguage;
        },
        _handleTouch: function (t) {
          for (
            var a = [
                "leaflet-control-minimap",
                "leaflet-interactive",
                "leaflet-popup-content",
                "leaflet-popup-content-wrapper",
                "leaflet-popup-close-button",
                "leaflet-control-zoom-in",
                "leaflet-control-zoom-out",
              ],
              n = !1,
              e = 0;
            e < a.length;
            e++
          )
            L.DomUtil.hasClass(t.target, a[e]) && (n = !0);
          n
            ? L.DomUtil.hasClass(t.target, "leaflet-interactive") &&
              "touchmove" === t.type &&
              1 === t.touches.length
              ? (L.DomUtil.addClass(
                  this._map._container,
                  "leaflet-gesture-handling-touch-warning"
                ),
                this._disableInteractions())
              : L.DomUtil.removeClass(
                  this._map._container,
                  "leaflet-gesture-handling-touch-warning"
                )
            : "touchmove" === t.type || "touchstart" === t.type
            ? 1 === t.touches.length
              ? (L.DomUtil.addClass(
                  this._map._container,
                  "leaflet-gesture-handling-touch-warning"
                ),
                this._disableInteractions())
              : (this._enableInteractions(),
                L.DomUtil.removeClass(
                  this._map._container,
                  "leaflet-gesture-handling-touch-warning"
                ))
            : L.DomUtil.removeClass(
                this._map._container,
                "leaflet-gesture-handling-touch-warning"
              );
        },
        _isScrolling: !1,
        _handleScroll: function (t) {
          t.metaKey || t.ctrlKey
            ? (t.preventDefault(),
              L.DomUtil.removeClass(
                this._map._container,
                "leaflet-gesture-handling-scroll-warning"
              ),
              this._map.scrollWheelZoom.enable())
            : (L.DomUtil.addClass(
                this._map._container,
                "leaflet-gesture-handling-scroll-warning"
              ),
              this._map.scrollWheelZoom.disable(),
              clearTimeout(this._isScrolling),
              (this._isScrolling = setTimeout(function () {
                for (
                  var t = document.getElementsByClassName(
                      "leaflet-gesture-handling-scroll-warning"
                    ),
                    a = 0;
                  a < t.length;
                  a++
                )
                  L.DomUtil.removeClass(
                    t[a],
                    "leaflet-gesture-handling-scroll-warning"
                  );
              }, this._map.options.gestureHandlingOptions.duration)));
        },
        _handleMouseOver: function (t) {
          this._enableInteractions();
        },
        _handleMouseOut: function (t) {
          a || this._disableInteractions();
        },
      });
    L.Map.addInitHook("addHandler", "gestureHandling", t);
  })();
var runApp = function () {
  __.core = __.fs.coreModuls([
    "$window",
    "$app",
    "$header",
    "$map",
    "$places",
    "$placeSearch",
  ]);
  var n = window.location.pathname;
  $.get("bin/data/data.json", function (t) {
    var a = __.fs.decodeData(t);
    __.core.$app.data("data", a),
      __.core.$map.trigger("createMap"),
      setTimeout(function () {
        __.core.$map.trigger("renderMap", { data: a });
      }, 300),
      n.includes("/place_") &&
        $.get("bin/data".concat(n, "data.json"), function (t) {
          __.detailScreen({ place: t });
        });
  }),
    window.addEventListener(
      "popstate",
      function (t) {
        window.location.href = window.location.href;
      },
      !1
    );
};
(__.core.$app = function () {
  return (
    $("#app")
      .data("browser", __.fs.browserDetect())
      .addClass(function () {
        var t = $(this).data("browser");
        return [t.browserName, t.platform, t.isMobile].join(" ");
      }),
    $("#app")
  );
}),
  (__.core.$map = function () {
    var e = {},
      i = !1;
    return (
      $("#map")
        .on("mousedown touchstart", function (t) {
          e = {
            x: t.clientX || t.targetTouches[0].clientX,
            y: t.clientY || t.targetTouches[0].clientY,
          };
        })
        .on("mouseup touchend", function (t) {
          var a = t.clientX ? t.clientX : t.changedTouches[0].clientX,
            n = t.clientY ? t.clientY : t.changedTouches[0].clientY;
          a == e.x && n == e.y && (i = !0);
        })
        .on("click", function (t) {
          var a = $(this).attr("id");
          $(t.target).is("canvas") &&
            i &&
            (__.selectOnMap(
              t,
              a,
              $(".layers-controls__item_selected").data("id")
            ),
            (i = !1));
        }),
      $("#map")
        .bind("createMap", function (t) {
          $(this).empty();
          var a = __.fs.mapTiles,
            n = $(t.target).attr("id"),
            e = L.map(n, { attributionControl: !1 }).setView(
              [55.751244, 37.618423],
              9
            );
          L.control.attribution({ position: "bottomleft" }).addTo(e);
          var i = L.tileLayer(a.dark, {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          });
          i
            .on("tileload", function (t) {
              t.tile.setAttribute("alt", "Map tile image"),
                t.tile.setAttribute("role", "presentation");
            })
            .addTo(e),
            (e.search = !1),
            $(t.target).data("map", e),
            $(t.target).data("tiles", i),
            $(t.target).data("tileset", a),
            __.mapControls(),
            e.on("dragstart zoomstart", function (t) {
              $("#map-controls").find(".place-select").remove();
            }),
            $(".leaflet-bar")
              .find("a")
              .each(function (t, a) {
                $(a).click(function (t) {
                  t.preventDefault(), $("#app").scrollTop(0);
                });
              });
        })
        .bind("renderMap", function (t, r) {
          var e = this,
            l = r.data.places,
            a = $(t.target).data("map"),
            n = L.canvasOverlay()
              .drawing(function (i, t) {
                var o = t.canvas.getContext("2d"),
                  c = $(e).data("map").getZoom(),
                  s = $(e).attr("id");
                o.clearRect(0, 0, t.canvas.width, t.canvas.height);
                var a = $(".layers-controls__item_selected").data("id"),
                  n = $("#map").data("tileset");
                __.mapData()[a](function () {
                  var e = $("#places").data("overlay") != a;
                  $.each(l, function (t, a) {
                    if (
                      (a.canvas.visible &&
                        (a.canvas = __.placePoint({
                          mapId: s,
                          ctx: o,
                          canvasOverlay: i,
                          zoom: c,
                          place: a,
                        })),
                      e)
                    ) {
                      var n = a.canvas.color.match(/\d+/g);
                      $(
                        '#places .place-item[data-id="place-'.concat(
                          a.id,
                          '"] .place-item__pin'
                        )
                      ).css({
                        backgroundColor: "rgba("
                          .concat(n[0], ",")
                          .concat(n[1], ",")
                          .concat(n[2], ",.8)"),
                      });
                    }
                  }),
                    $("#places").data("overlay", a),
                    (window.DATA.places = l),
                    $("#app").data("data", window.DATA),
                    __.mapOverlay()[a](r, i, o, c, s),
                    __.mapTiles(n)[a](),
                    __.mapLegend()[a]();
                });
              })
              .addTo(a);
          $(e).data("canvas", n);
        }),
      $("#map")
    );
  }),
  (__.core.$header = function () {
    return (
      $("#change-view").click(function () {
        "На карте" != $(this).text()
          ? $(this).text("На карте")
          : $(this).text("Списком"),
          $("#main").toggleClass("main_screen-2"),
          __.fs.analytics("change_view", { change_to: $(this).text() });
      }),
      $("#header")
    );
  }),
  (__.core.$placeSearch = function () {
    return (
      __.formFilter(),
      $("#place-search")
        .bind("search", function (t, a) {
          var n = $(this).find("input").val();
          __.search({ text: n }),
            __.fs.analytics("search_place", {
              value: $(this).find("input").val(),
            });
        })
        .keyup(function (t) {
          13 == t.which && t.preventDefault(),
            $(this)
              .find("input")
              .attr("data-value", $(this).find("input").val());
        })
        .find(".place-search__search")
        .click(function (t) {
          t.preventDefault(), $(this).trigger("search");
        }),
      $("#place-search")
    );
  }),
  (__.core.$places = function () {
    var s = !1,
      i = new L.marker([], {
        icon: L.divIcon({ className: "place-marker" }),
      }).on("click", function (t) {
        n(t.target.options.id);
      });
    function n(t) {
      __.fs.placeGet(t, function (t, a) {
        __.fs.analytics("select_place", {
          place_id: t.id,
          place_name: t.name,
          place_url: a,
          target: "list",
        }),
          __.detailScreen({ place: t });
      });
    }
    return (
      $("#places").on("mouseenter", ".place-item", function (t) {
        var a = $("#app").data("data") ? $("#app").data("data").places : [];
        if (a.length) {
          var n = $(t.currentTarget).data("id").split("-")[1],
            e = $("#map").data("map");
          $.each(a, function (t, a) {
            if (a.id == n)
              return (
                i.setLatLng([a.point[1], a.point[0]]),
                (i.options.id = a.id),
                e.hasLayer(i) || e.addLayer(i),
                !1
              );
          });
        }
      }),
      $("#places").on("click", ".place-item", function (t) {
        t.preventDefault();
        $("#app").data("data").places, $("#map").data("map");
        var a = $(t.currentTarget).data("id").split("-")[1];
        $(".place-item").not(this).removeClass("place-item_active"),
          $(this).is(".place-item_active")
            ? ($(this).removeClass("place-item_active"),
              $("#detail-screen").remove())
            : ($(this).addClass("place-item_active"), n(a));
      }),
      $("#places")
        .scroll(function (t) {
          var a = this,
            n = $(a).find(".place-item").last(),
            e = $(a).find(".place-item").length,
            i = $("#map").data("map");
          if (
            i &&
            !i.search &&
            n.length &&
            n.offset().top < 2 * $(window).outerHeight()
          ) {
            var o = function (t, n, e, i) {
                $.each(t, function (t, a) {
                  if ((i < t && ($(n).append(__.placeItem(a)), e--), !e))
                    return !1;
                });
              },
              c = $("#app").data("data").places;
            c[0].railroad.closest.name || s
              ? o(c, a, 100, e)
              : ($.get("bin/data/railroad.json", function (t) {
                  $.each(t, function (t, a) {
                    if (window.DATA.railroad[a.id])
                      for (var n in a) window.DATA.railroad[a.id][n] = a[n];
                    else window.DATA.railroad[a.id] = a;
                  }),
                    $("#app").data("data", window.DATA),
                    o(c, a, 100, e);
                }),
                (s = !0));
          }
        })
        .bind("renderList", function (t, a) {
          var n = this,
            e = a.onlyVisible || !1,
            i = a.places,
            o = $("#app").data("data").places;
          function c() {
            $("#places").empty(),
              setTimeout(function () {
                $.each(i, function (t, a) {
                  if (e) a.canvas.visible && $(n).append(__.placeItem(a));
                  else {
                    if (!(t < 100)) return !1;
                    $(n).append(__.placeItem(a));
                  }
                });
              }, 1e3);
          }
          $(n).empty(),
            o[0].railroad.closest.name || s
              ? c()
              : ((s = !0),
                $.get("bin/data/railroad.json", function (t) {
                  $.each(t, function (t, a) {
                    if (window.DATA.railroad[a.id])
                      for (var n in a) window.DATA.railroad[a.id][n] = a[n];
                    else window.DATA.railroad[a.id] = a;
                  }),
                    $("#app").data("data", window.DATA),
                    c();
                }));
        }),
      $("#places")
    );
  }),
  (__.core.placeScreen = function () {}),
  (__.core.$window = function () {
    var a = $("#header").outerHeight();
    window.innerHeight;
    function n() {
      $("#app").css({ height: $(window).innerHeight() + "px" }),
        $("#main").css({ height: "calc(100% - ".concat(a, "px)") });
      var t = 0.01 * window.innerHeight;
      document.documentElement.style.setProperty("--vh", "".concat(t, "px"));
    }
    return (
      n(),
      $(window).resize(function (t) {
        n();
      }),
      $(window)
    );
  }),
  (__.breadcrumbs = function (t) {
    for (var a = t.links, n = "", e = 0; e < a.length; e++) {
      var i = '<meta itemprop="position" content="'.concat(e + 1, '">'),
        o = a[e].name,
        c = a[e].url;
      n +=
        0 == a[e].link
          ? ' <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"> <span itemprop="name">'
              .concat(o, "</span> ")
              .concat(i, ' <meta itemprop="item" content="')
              .concat(c, '"> </li> ')
          : ' <li class="breadcrumbs_item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem"> <span itemprop="name"> <a class="breadcrumbs_link" itemprop="item" href="'
              .concat(c, '">')
              .concat(o, "</a> </span> ")
              .concat(i, " </li>");
    }
    return '<ol class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList"> '.concat(
      n,
      "</ol> "
    );
  }),
  (__.detailScreen = function (c) {
    var t,
      a,
      n,
      e,
      i,
      o,
      s,
      r,
      l,
      p,
      d,
      m,
      u,
      h,
      _,
      f,
      v,
      g,
      b,
      y,
      w,
      x,
      k,
      T,
      C,
      D,
      O,
      A,
      j,
      z,
      S,
      M,
      I,
      E,
      U,
      H,
      P,
      N,
      Z,
      R,
      F,
      V,
      W,
      B,
      Y,
      X,
      G,
      q,
      J,
      K,
      Q,
      tt,
      at,
      nt,
      et,
      it,
      ot,
      ct,
      st,
      rt,
      lt,
      pt,
      dt,
      mt,
      ut,
      ht,
      _t,
      ft,
      vt = "",
      gt = "",
      bt = c.place;
    bt
      ? ((t = bt.id),
        (a = bt.name),
        (_t = bt.id),
        (ft = 100 * Math.floor(_t / 100)),
        (n = "https://everydayhero2000.github.io/moscow-real-estate/places/"
          .concat(ft, "/place_")
          .concat(_t, "/")),
        (e = bt.description),
        (i = bt.type ? "".concat(bt.type) : ""),
        (o =
          "turbo" == (ht = c.mode) || "amp" == ht
            ? ""
            : '<div class="header-mobile"> <a href="/" id="close-screen" name="close-screen" role="button" class="btn btn_back">Назад</a> </div>'),
        (k = (function (t) {
          var a = "",
            n = {
              energy: "Электроснабжение",
              water: "Водоснабжение",
              drainage: "Канализация",
              gas: "Газоснабжение",
              security: "Охрана",
            };
          for (var e in t)
            t[e] &&
              (a += '<li class="simple-list__item flex-line">'.concat(
                n[e],
                "</li>"
              ));
          return '<ul class="simple-list">'.concat(a, "</ul>");
        })(bt.props)),
        (s =
          "turbo" == c.mode || "amp" == c.mode
            ? ""
            : '<div class="close-icon" role="button" id="close-panel"></div>'),
        (pt = c.mode),
        (dt = c.canonical),
        (mt = ""),
        (ut = bt.point),
        "amp" == pt &&
          (mt = '<a href="'
            .concat(
              dt,
              '"> <amp-img alt="map" src="https://static-maps.yandex.ru/1.x/?ll='
            )
            .concat(ut[0], ",")
            .concat(ut[1], "&size=450,450&z=13&l=map&pt=")
            .concat(ut[0], ",")
            .concat(
              ut[1],
              '" layout="responsive" width="450" height="450" /> </a> '
            )),
        (r = mt),
        (_ads =
          "amp" != c.mode
            ? '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\x3c!-- ads-box_1 --\x3e<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-3027365012127484" data-ad-slot="5702464578" data-ad-format="auto" data-full-width-responsive="true"></ins><script> (adsbygoogle = window.adsbygoogle || []).push({});</script>'
            : '<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-3027365012127484" data-ad-slot="5702464578" data-auto-format="rspv" data-full-width=""> <div overflow=""></div></amp-ad>'),
        (w = (function (t) {
          for (
            var a = "",
              n = yt(
                c.mode,
                "/favicon-32.png",
                "myhousehub",
                16,
                16,
                "favicon"
              ),
              e = 0;
            e < t.length;
            e++
          ) {
            var i = t[e],
              o = 100 * Math.floor(i.id / 100);
            a += '<li class="simple-list__item flex-line">'
              .concat(n, '<a href="https://everydayhero2000.github.io/moscow-real-estate/places/')
              .concat(o, "/place_")
              .concat(i.id, '/">')
              .concat(i.type, " ")
              .concat(i.name, "</a></li>");
          }
          return a ? '<ul class="simple-list">'.concat(a, "</ul>") : "";
        })(bt.places)),
        wt("Класс", bt.class, function (t) {
          return t;
        }),
        (it = bt.address.name),
        (ot = bt.moscow.distance),
        (ct = bt.moscow.angle),
        (st = it ? "".concat(it, ". ") : ""),
        (rt = '<b class="value">'.concat(ot, " км</b>")),
        (lt = ""),
        339 <= ct && ct <= 360 && (lt = "Западное направление"),
        0 <= ct && ct <= 23 && (lt = "Западное направление"),
        24 <= ct && ct <= 68 && (lt = "Юго-западное направление"),
        69 <= ct && ct <= 113 && (lt = "Южное направление"),
        114 <= ct && ct <= 158 && (lt = "Юго-восточное направление"),
        159 <= ct && ct <= 203 && (lt = "Восточное направление"),
        204 <= ct && ct <= 225 && (lt = "Северо-восточное направление"),
        226 <= ct && ct <= 293 && (lt = "Северное направление"),
        294 <= ct && ct <= 338 && (lt = "Северо-западное направление"),
        (l = "<p>Адрес посёлка: "
          .concat(st)
          .concat(lt, ", ")
          .concat(rt, " от центра Москвы.</p>")),
        (et = bt.city),
        (p = "<p>"
          .concat(et.closest.name, ' в <b class="value">')
          .concat(et.distance, " км</b> от посёлка.</p>")),
        wt("Расстояние от Москвы", bt.moscow.distance, function (t) {
          return '<b class="value">'.concat(t, " км</b>");
        }),
        (_routeurl =
          ((nt = bt.point),
          "https://yandex.ru/maps/213/moscow/?ll="
            .concat(nt[0], "%2C")
            .concat(nt[1], "&mode=routes&rtt=auto&rtext=55.753215%2C37.622504~")
            .concat(nt[1], "%2C")
            .concat(nt[0]))),
        (at = bt.car),
        (d = ' <p>На автомобиле до центра Москвы:</p> <p><b class="value">'
          .concat(at.distance, ' км</b>, <span class="value">')
          .concat(at.time.h, " ч ")
          .concat(
            at.time.m,
            ' мин</span> без учета пробок</p> <div class="btn-group"><a class="btn btn_ghost" rel="noreferrer noopener nofollow" target="_blank" href="'
          )
          .concat(_routeurl, '">Проложить маршрут</a></div>')),
        (Q = bt.railroad),
        (tt = "https://rasp.yandex.ru/search/?fromId=c213&fromName=Москва&toName=".concat(
          Q.closest.name,
          "&when=сегодня"
        )),
        (m = " <p>Ближайшая ж/д станция пригородной электрички "
          .concat(Q.closest.name, " (")
          .concat(
            Q.closest.route,
            ')</p> <p>От посёлка до станции <b class="value">'
          )
          .concat(
            Q.distance,
            ' км</b>, дорога до Москвы займёт <span class="value">'
          )
          .concat(Q.closest.time.h, " ч ")
          .concat(
            Q.closest.time.m,
            ' мин</span></p> <div class="btn-group"><a class="btn btn_ghost" rel="noreferrer noopener nofollow" target="_blank" href="'
          )
          .concat(tt, '" >Расписание электричек</a></div>')),
        (K = bt.markets),
        (u = '<p>Крупный сетевой магазин в <b class="value">'.concat(
          K.distance,
          " км</b>.</p>"
        )),
        (h = (function () {
          for (var t = "", a = bt.water.closests, n = 0; n < a.length; n++)
            if (a[n].closest) {
              var e = a[n].closest;
              0 < e.min &&
                (e.min != e.max
                  ? (t += '<li class="item-with-icon"><div class="icon icon_water icon_inline" ></div><div><p><b class="value">от '
                      .concat(e.min, " м. до ")
                      .concat(
                        e.max,
                        " м.</b><br>Средняя глубина водоносного горизонта "
                      )
                      .concat(e.median, " м. (скважины в ")
                      .concat(e.name, ")</p></div></li>"))
                  : (t += '<li class="item-with-icon"><div class="icon icon_water icon_inline" ></div><div><p><b class="value">'
                      .concat(
                        e.median,
                        " м.</b><br>Cредняя глубина водоносного горизонта (скважины в "
                      )
                      .concat(e.name, ")</p></div></li>")));
            }
          return (t = t.length
            ? '<hr><p>Глубина водоносного горизонта в районе посёлка:</p> <ul class="simple-list"> '.concat(
                t,
                " </ul>"
              )
            : "");
        })()),
        (_ = (function (t) {
          for (var a, n = "", e = 0; e < t.length; e++) {
            var i = t[e].closest.description
              ? "".concat(t[e].closest.description)
              : "";
            n += '<li class="item-with-icon"><div class="icon icon_eco icon_inline" data-ico="'
              .concat(t[e].closest.type, '"></div><div><p><b class="value">')
              .concat(t[e].distance.toFixed(1), " км</b><br>")
              .concat(t[e].closest.name, ". ")
              .concat(i, "</p></div></li>");
          }
          return (
            (a = (n = n.length
              ? '<ul class="simple-list">'.concat(n, "</ul>")
              : "").length
              ? "Ближайшие источники загрязнения и шума:"
              : "Рядом с поселком отсутствуют источники загрязнения и шума."),
            "<p>".concat(a, "</p>").concat(n)
          );
        })(bt.eco.closests)),
        (Y = bt.price),
        (X = bt.developer),
        (G = {
          from: Y.from
            ? "undefined" != typeof global
              ? global.component("str-to-cost", { value: Y.from })[0]
              : __.strToCost({ value: Y.from })[0]
            : "",
          to: Y.to
            ? "undefined" != typeof global
              ? global.component("str-to-cost", { value: Y.to })[0]
              : __.strToCost({ value: Y.to })[0]
            : "",
          closest: Y.closest
            ? "undefined" != typeof global
              ? global.component("str-to-cost", { value: Y.closest })[0]
              : __.strToCost({ value: Y.closest })[0]
            : "",
        }),
        (q =
          (Y.from
            ? "Цена от <nobr><b>".concat(G.from, " руб.</b></nobr> ")
            : "Ориентировочная цена на дома от <nobr><b>".concat(
                G.closest,
                " руб.</b></nobr> "
              )) +
          (Y.to ? "до <nobr><b>".concat(G.to, " руб.</b></nobr>") : "")),
        (J = X ? "Застройщик ".concat(X, ".") : ""),
        (f = q ? "".concat(q, " ").concat(J) : "".concat(J)),
        wt("Застройщик", bt.developer, function (t) {
          return t;
        }),
        wt("Сайт", bt.site, function (t) {
          var a = URL ? new URL(t).host : t.replace(/^(http|https):\/\//g, "");
          return '<div class="flex-line">'
            .concat(
              yt(
                c.mode,
                "https://favicon.yandex.net/favicon/".concat(a),
                a,
                16,
                16,
                "favicon"
              ),
              " "
            )
            .concat($t(t, a), "</div>");
        }),
        (B = bt.medic),
        (v = '<p>Cтанция скорой помощи в <b class="value">'.concat(
          B.distance,
          " км</b>.</p>"
        )),
        (D = bt.point),
        (O = bt.site),
        (A = D[1] + 0.00304),
        (j = D[1] - 0.00304),
        (z = D[0] - 0.009066),
        (S = D[0] + 0.009066),
        (I = xt("".concat((M = "https://"), "cian.ru/map/"), {
          deal_type: "sale",
          engine_version: 2,
          "object_type[0]": 1,
          offer_type: "suburban",
          zoom: 16,
          center: "".concat(D[1], ",").concat(D[0]),
        })),
        (E = xt(
          "".concat(M, "realty.yandex.ru/moskovskaya_oblast/kupit/dom/karta/"),
          {
            leftLongitude: z,
            topLatitude: A,
            rightLongitude: S,
            bottomLatitude: j,
          }
        )),
        (U = xt(
          "".concat(
            M,
            "move.ru/moskovskaya_oblast/prodazha_domov/poisk_na_karte/"
          ),
          { map_center: "".concat(D[1], ",").concat(D[0]), zoom: 16 }
        )),
        (H =
          xt("".concat(M, "sob.ru/map/prodazha-zagorodnaja-nedvizhimost"), {
            ll: "".concat(D[1], ",").concat(D[0]),
            z: 16,
          }) +
          "&realty_type[]=3&realty_type[]=4&realty_type[]=5&realty_type[]=6&realty_type[]=7&realty_type[]=8&realty_type[]=9&realty_type[]=10&realty_type[]=11&realty_type[]=12"),
        (P = xt("".concat(M, "www.avito.ru/moskva/doma_dachi_kottedzhi"), {
          map: btoa(
            JSON.stringify({
              searchArea: { latBottom: j, latTop: A, lonLeft: z, lonRight: S },
            })
          ),
        })),
        (N = yt(
          c.mode,
          "https://favicon.yandex.net/favicon/cian.ru",
          "cian.ru",
          16,
          16,
          "favicon"
        )),
        (Z = yt(
          c.mode,
          "https://favicon.yandex.net/favicon/realty.yandex.ru",
          "realty.yandex.ru",
          16,
          16,
          "favicon"
        )),
        (R = yt(
          c.mode,
          "https://favicon.yandex.net/favicon/avito.ru",
          "realty.yandex.ru",
          16,
          16,
          "favicon"
        )),
        (F = yt(
          c.mode,
          "https://favicon.yandex.net/favicon/sob.ru",
          "sob.ru",
          16,
          16,
          "favicon"
        )),
        (V = yt(
          c.mode,
          "https://favicon.yandex.net/favicon/move.ru",
          "move.ru",
          16,
          16,
          "favicon"
        )),
        (W = O
          ? '<div class="btn-group"><a target="_blank" rel="noreferrer noopener nofollow" href="'.concat(
              O,
              '" class="btn btn_ghost">Сайт посёлка</a></div>'
            )
          : ""),
        (g = ' <ul class="simple-list"> <li class="simple-list__item flex-line">'
          .concat(N, " ")
          .concat(
            $t(I, "Циан"),
            '</li> <li class="simple-list__item flex-line">'
          )
          .concat(Z, " ")
          .concat(
            $t(E, "Яндекс.Недвижимость"),
            '</li> <li class="simple-list__item flex-line on-mobile_hide">'
          )
          .concat(R, " ")
          .concat(
            $t(P, "Авито"),
            '</li> <li class="simple-list__item flex-line">'
          )
          .concat(F, " ")
          .concat(
            $t(H, "Sob"),
            '</li> <li class="simple-list__item flex-line">'
          )
          .concat(V, " ")
          .concat($t(U, "move.ru"), "</li> </ul> ")
          .concat(W)),
        (T = bt.river
          ? "<p>Рядом с посёлком есть водоём или река.</p><hr>"
          : ""),
        (y = (function (t) {
          var a = "",
            n = !1;
          if (-1 < t.distance) {
            for (var e = 0; e < t.closests.length; e++) {
              var i = t.closests[e];
              if (3 != i.type) {
                var o = 1 == i.type ? i.name + " лесничество" : i.name;
                a += '<li class="item-with-icon"><div class="icon icon_forest icon_inline" ></div><div><p>'.concat(
                  o,
                  "</p></div></li>"
                );
              } else n = !0;
            }
            a = " <p>"
              .concat(
                n
                  ? "Рядом с посёлком есть лес."
                  : "В <b>".concat(
                      t.distance,
                      " км</b> от посёлка начинается лес."
                    ),
                "</p> "
              )
              .concat(
                a ? '<ul class="simple-list">'.concat(a, "</ul>") : "",
                "<hr>"
              );
          }
          return a;
        })(bt.forest)),
        (x = (function (t) {
          var a = "",
            n = !1,
            e = 0;
          if (-1 < t.distance) {
            for (var i = 0; i < t.closests.length; i++) {
              var o = t.closests[i];
              if (o.distance < 5 && e < 5) {
                var c = o.closest.name;
                (a += '<li class="item-with-icon"><div class="icon icon_school icon_inline" ></div><div><p>'
                  .concat(c, " в ")
                  .concat(o.distance, " км</p></div></li>")),
                  (n = !0),
                  e++;
              }
            }
            a = " <p>Ближайшая к посёлку школа в <b>"
              .concat(t.distance, " км</b>:</p> ")
              .concat(
                a ? '<ul class="simple-list">'.concat(a, "</ul>") : "",
                " <hr>"
              );
          }
          return n ? a : "";
        })(bt.school)),
        (C = [
          {
            url: "https://everydayhero2000.github.io/moscow-real-estate/",
            name: "Коттеджные посёлки Москвы",
            link: !0,
          },
          { name: a, url: n, link: !1 },
        ]),
        (b =
          "undefined" != typeof global
            ? global.component("breadcrumbs", { links: C })
            : __.breadcrumbs({ links: C })),
        (gt = ""
          .concat(s, " ")
          .concat(
            b,
            '<main itemscope itemtype="http://schema.org/Dataset"> <h1 itemprop="name"><span>'
          )
          .concat(i, "</span> <span>")
          .concat(
            a,
            '</span></h1> <meta itemprop="license" content="https://creativecommons.org/publicdomain/zero/1.0/"> <p itemprop="description">'
          )
          .concat(
            e,
            '</p> <div class="page-navigation"> <div class="page-navigation__inner"> <a href="#s_offer">Купить</a> <a href="#s_transport">Транспорт</a> <a href="#s_infrastructure">Инфраструктура</a> <a href="#s_eco">Экология</a> <a href="#s_map">Карта</a> </div> </div> <div class="panel__content content"> <section id="s_offer" class="content__section"> <h2>Купить дом в посёлке</h2> <p>'
          )
          .concat(f, " Предложения о продаже в <nobr>")
          .concat(i, " ")
          .concat(a, "</nobr>:</p> ")
          .concat(g, " </section> ")
          .concat(
            _ads,
            ' <section id="s_communication" class="content__section"> <h2>Коммуникации</h2> '
          )
          .concat(
            k,
            ' </section> <section id="s_transport" class="content__section"> <h2>Транспортная доступность <nobr>'
          )
          .concat(i, " ")
          .concat(a, "</nobr></h2> ")
          .concat(l, " <hr> ")
          .concat(d, " <hr> ")
          .concat(
            m,
            ' </section> <section id="s_infrastructure" class="content__section"> <h2>Инфраструктура</h2> <div> '
          )
          .concat(p, " <hr> ")
          .concat(v, " <hr> ")
          .concat(x, " ")
          .concat(
            u,
            ' </div> </section> <section id="s_eco" class="content__section"> <h2>Экология</h2> <div> '
          )
          .concat(y, " ")
          .concat(T, " ")
          .concat(_, " ")
          .concat(h, " </div> </section> ")
          .concat(
            w
              ? ' <section id="s_places" class="content__section"> <h2>Коттеджные посёлки рядом с <nobr>'
                  .concat(i, " ")
                  .concat(a, "</nobr>:</h2> <div> ")
                  .concat(w, " </div> </section> ")
              : "",
            ' <section id="s_map"> <figure id="place-map" class="map">'
          )
          .concat(r, "</figure> </section> </div></main> ")),
        (vt = '<div id="detail-screen" data-id="'
          .concat(t, '" class="panel panel_detail"> ')
          .concat(o, ' <div class="panel__container"> ')
          .concat(gt, " </div></div>")))
      : (vt = $("#detail-screen")[0].outerHTML);
    function yt(t, a, n, e, i, o) {
      return (
        (t = t || "html"),
        (o = o ? 'class="'.concat(o, '"') : ""),
        "amp" != t
          ? '<img src="'.concat(a, '" alt="').concat(n, '" ').concat(o, " />")
          : '<amp-img src="'
              .concat(a, '" alt="')
              .concat(n, '" ')
              .concat(o, ' layout="responsive" width="')
              .concat(e, '" height="')
              .concat(i, '"></amp-img>')
      );
    }
    function wt(t, a, n) {
      return a
        ? (function (t, a) {
            return '<div class="content__item"> <div class="content__item-title"><h3>'
              .concat(t, '</h3></div> <div class="content__item-value">')
              .concat(a, "</div> </div>");
          })(t, n(a))
        : "";
    }
    function $t(t, a, n, e) {
      return (
        (e = e ? 'data-link="'.concat(e, '"') : ""),
        (n = n ? 'class="'.concat(n, '"') : ""),
        "<a "
          .concat(n, " ")
          .concat(
            e,
            ' rel="noreferrer noopener nofollow" target="_blank" href="'
          )
          .concat(t, '">')
          .concat(a, "</a>")
      );
    }
    function xt(t, a) {
      t = t + "?" || "";
      var i = encodeURIComponent;
      return (
        t +
        Object.entries(a)
          .map(function (t) {
            var a = _slicedToArray(t, 2),
              n = a[0],
              e = a[1];
            return "".concat(i(n), "=").concat(i(e));
          })
          .join("&")
      );
    }
    if ("undefined" == typeof global) {
      $("#detail-screen").remove();
      var kt = __.core.$detailScreen ? __.core.$detailScreen : $(vt);
      bt && kt.find(".panel__container").empty().append(gt);
      var Lt = 100 * Math.floor(bt.id / 100);
      history.pushState(
        bt,
        bt.name,
        "/places/".concat(Lt, "/place_").concat(bt.id, "/")
      ),
        $("title").text(bt.title),
        setTimeout(function () {
          if ($("#place-map").length) {
            var a = function () {
              var t = new L.marker([bt.point[1], bt.point[0]], {
                  icon: L.divIcon({ className: "place-marker" }),
                }),
                i = L.map("place-map", {
                  center: [bt.point[1], bt.point[0]],
                  zoom: 14,
                  gestureHandling: !0,
                });
              L.tileLayer(__.fs.mapTiles.simple, {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              }).addTo(i),
                i.addLayer(t);
              L.canvasOverlay()
                .drawing(function (t, a) {
                  var n = a.canvas.getContext("2d"),
                    e = i.getZoom();
                  n.clearRect(0, 0, a.canvas.width, a.canvas.height),
                    __.mapData().eco(function () {
                      __.mapOverlay().eco({ data: o }, t, n, e, "place-map");
                    }),
                    __.mapData().railroad(function () {
                      __.mapOverlay().railroad(
                        { data: o },
                        t,
                        n,
                        e,
                        "place-map"
                      );
                    });
                })
                .addTo(i);
            };
            $("#place-map").empty();
            var o = $("#app").data("data");
            o
              ? a()
              : ((bt = bt || null),
                $.get("bin/data/data.json", function (t) {
                  (o = __.fs.decodeData(t)),
                    (id = $("#detail-screen").data("id")),
                    $.each(o.places, function (t, a) {
                      if (a.id == id) return (bt = a), !1;
                    }),
                    bt && a();
                }));
          }
        }, 100),
        kt.find("a").click(function (a) {
          var t = $(this).attr("href");
          function n(t) {
            $("#app").is(".mobile") &&
              (a.preventDefault(), (location.href = t));
          }
          t.includes("cian.ru") &&
            (__.fs.analytics("cta_go-to-store", { store: "cian" }), n(t)),
            t.includes("realty.yandex.ru") &&
              (__.fs.analytics("cta_go-to-store", { store: "yandex" }), n(t)),
            t.includes("avito.ru") &&
              (__.fs.analytics("cta_go-to-store", { store: "avito" }), n(t)),
            t.includes("sob.ru") &&
              (__.fs.analytics("cta_go-to-store", { store: "sob.ru" }), n(t)),
            t.includes("move.ru") &&
              (__.fs.analytics("cta_go-to-store", { store: "move.ru" }), n(t));
        }),
        kt.find("#close-screen, #close-panel").click(function (t) {
          t.preventDefault(), $("#main").find("#detail-screen").remove();
          var a = "Коттеджные поселки подмосковья";
          history.pushState({}, a, "/"),
            $("title").text(a),
            __.fs.analytics("close_detail-screen");
        }),
        kt.find('a[href^="#"]').click(function (t) {
          t.preventDefault();
          var a = "#" + $(this).attr("href").split("#")[1];
          $("#detail-screen")
            .stop()
            .animate(
              {
                scrollTop:
                  $(a).offset().top + $("#detail-screen").scrollTop() - 65,
              },
              500,
              "swing",
              function () {
                $("html, body").scrollTop(0);
              }
            );
        }),
        (__.core.$detailScreen = kt),
        $("#detail-screen").length || $("#main").append(kt);
    }
    return vt;
  }),
  (__.formFilter = function (t) {
    if ("undefined" == typeof global) {
      e();
      var a = n();
      $(".filter-form").data("filter", a),
        $(".place-search__filter").click(function (t) {
          $(".filter-form")
            .closest(".panel__header")
            .toggleClass("panel__header_absolute"),
            $(".filter-form").toggleClass("filter-form_hidden");
        }),
        $(".filter-form .form-tab__header").click(function (t) {
          $(this).parent(".form-tab").toggleClass("form-tab_hidden");
        }),
        $(".select-direction svg").click(function (t) {
          var a = [];
          $(".svg-select_active").each(function () {
            a.push($(this).attr("data-name"));
          }),
            $(this).parent().find("span").text(a.join(", "));
        }),
        $("#range-name_0").on("input change", function (t) {
          var a = $(this).val(),
            n = __.strToCost({ value: a })[0];
          $(this).parent().find("span").text("до ".concat(n, " руб."));
        }),
        $("#range-name_1").on("input change", function (t) {
          var a = $(this).val(),
            n = Math.floor(a / 60),
            e = a % 60,
            i = n ? "".concat(n, "ч ").concat(e, "мин") : "".concat(e, "мин");
          $(this)
            .parent()
            .find("span")
            .text("".concat("Время в пути до Москвы до", " ").concat(i));
        }),
        $(".filter-form .svg-select").click(function (t) {
          $(this).toggleClass("svg-select_active");
        }),
        $("#btn-reset").click(function (t) {
          e();
          var a = n();
          $(".filter-form").data("filter", a),
            __.search({ text: "" }),
            $(".place-search__filter").click();
        }),
        $("#btn-find").click(function (t) {
          var a = n();
          $(".filter-form").data("filter", a),
            __.search(a),
            $(".place-search__filter").click();
        });
    }
    function n() {
      var e,
        t = {
          kp: $("#ch-name_1").prop("checked"),
          snt: $("#ch-name_2").prop("checked"),
        },
        a = $("#range-name_0").val(),
        n = $("#range-name_1").val(),
        i = $("#ch-name_3").prop("checked"),
        o =
          ((e = []),
          $(".svg-select_active").each(function (t, a) {
            var n = $(a).attr("id");
            "top" == n && e.push([226, 293]),
              "top-right" == n && e.push([204, 225]),
              "right" == n && e.push([159, 203]),
              "bottom-right" == n && e.push([114, 158]),
              "bottom" == n && e.push([69, 113]),
              "bottom-left" == n && e.push([24, 68]),
              "left" == n && e.push([339, 360], [0, 23]),
              "top-left" == n && e.push([294, 338]);
          }),
          e.length ||
            e.push(
              [226, 293],
              [294, 338],
              [204, 225],
              [69, 113],
              [114, 158],
              [24, 68],
              [339, 360],
              [0, 23],
              [159, 203]
            ),
          e),
        c = $("#ch-name_4").prop("checked"),
        s = $("#ch-name_5").prop("checked"),
        r = $("#ch-name_6").prop("checked");
      return {
        text: $("#place-search-input").val(),
        types: t,
        distance: n,
        railroad: i,
        direction: o,
        cost: a,
        eco: c,
        forest: s,
        river: r,
      };
    }
    function e() {
      $("#ch-name_1, #ch-name_2").prop("checked", !0),
        $("#ch-name_3, #ch-name_4, #ch-name_5, #ch-name_6").prop("checked", !1),
        $("#range-name_1").val(5e7),
        $("#range-name_1").val(300),
        $(".svg-select").removeClass("svg-select_active"),
        $("#place-search-input").val("").attr("data-value", "");
    }
    return !1;
  }),
  (__.logo = function (t) {
    var a = t.title
      ? t.title
      : '<span class="header__title">Найти коттеджный посёлок</span>';
    return '<div class="header__logo"> <a href="/"><img alt="myhousehub" class="header__icon" src="source/assets/img/myhousehub.svg" /></a> <div> <a href="/" class="header__sitename">MYHOUSEHUB</a> '.concat(
      a,
      " </div> </div>"
    );
  }),
  (__.mapControls = function () {
    var t = {
        default: { title: "Карта" },
        eco: { title: "Экология", selected: !0 },
        railroad: { title: "Электрички" },
        car: { title: "Автомобильные дороги" },
        cost: { title: "Цены" },
        school: { title: "Образование" },
        markets: { title: "Магазины" },
        water: { title: "Скважины на воду" },
        forest: { title: "Лес" },
        river: { title: "Водоёмы и реки" },
      },
      a = "";
    for (var n in t) {
      var e = t[n].selected ? "layers-controls__item_selected" : "";
      a += '<li><button class="layers-controls__item '
        .concat(e, " ")
        .concat(n, '" data-id="')
        .concat(n, '">')
        .concat(t[n].title, "</button></li>");
    }
    if (((a = "<ul>".concat(a, "</ul>")), "undefined" == typeof global)) {
      $(".layers-controls").html(i);
      var i = $(".layers-controls__item").click(function (t) {
        var a = $(this).data("id");
        $(".layers-controls__item").removeClass(
          "layers-controls__item_selected"
        ),
          $(this).addClass("layers-controls__item_selected"),
          $("#map").data("canvas").redraw(),
          __.fs.analytics("change_map-mode", { mode: a });
      });
      $(".not-mobile .layers-controls ul")
        .mouseenter(function (t) {
          $(".layers-controls").addClass("layers-controls_visible");
        })
        .mouseleave(function (t) {
          $(".layers-controls").removeClass("layers-controls_visible");
        });
    }
    return a;
  }),
  (__.mapObjectInfo = function (t, a, n) {
    var e,
      i = $("#" + n),
      o = "",
      c = "",
      s = "";
    "eco" == a &&
      ((c = t.name),
      (s = t.description ? t.description : ""),
      (o = '<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'
        .concat(a, '" data-ico="')
        .concat(
          t.type,
          '"></div> <div class="map-object-info__content"> <span class="map-object-info__title">'
        )
        .concat(c, '</span> <p class="map-object-info__description">')
        .concat(s, '</p> </div> <div> <div class="close-icon"></div></div>'))),
      "markets" == a &&
        (o = '<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'
          .concat(
            a,
            '" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">'
          )
          .concat(t.name, '</span> <p class="map-object-info__description">')
          .concat(
            t.address,
            '</p> </div> </div> <div class="close-icon"></div></div>'
          )),
      "school" == a &&
        (o = '<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'
          .concat(
            a,
            '" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">'
          )
          .concat(
            t.name,
            '</span> </div> </div> <div class="close-icon"></div></div>'
          )),
      "water" == a &&
        (o = '<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'
          .concat(
            a,
            '" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">Скважина в "'
          )
          .concat(
            t.name,
            '"</span> <p class="map-object-info__description">Глубина скважины от '
          )
          .concat(t.min, " м. до ")
          .concat(t.max, ", средняя глубина ")
          .concat(
            t.median,
            ' м.</p> </div> </div> <div class="close-icon"></div></div>'
          )),
      "railroad" == a &&
        ((c = ""
          .concat(
            t.type
              ? (e = t.type).charAt(0).toUpperCase() + e.slice(1)
              : "Станция",
            " «"
          )
          .concat(t.name, "» (")
          .concat(t.route, ")")),
        (s = "До Москвы "
          .concat(t.distance, "км, ")
          .concat(t.count, " станция от Москвы. В пути ")
          .concat(t.time.h, "ч ")
          .concat(t.time.m, "мин.")),
        (o = '<div class="map-object-info"> <div class="map-object-info__inner"> <div class="icon icon_'
          .concat(
            a,
            '" data-ico=""></div> <div class="map-object-info__content"> <span class="map-object-info__title">'
          )
          .concat(c, '</span> <p class="map-object-info__description">')
          .concat(
            s,
            '</p> </div> </div> <div class="close-icon"></div></div>'
          ))),
      $("body").on("click", ".map-object-info .close-icon", function (t) {
        $(".map-object-info").remove();
      }),
      i.find(".map-object-info").remove(),
      i.append(o);
  }),
  (__.mapData = function () {
    $("#app").data("data");
    function a(e, a) {
      $.get("bin/data/".concat(e, ".json"), function (t) {
        "roads" != e
          ? $.each(t, function (t, a) {
              if (window.DATA[e][a.id])
                for (var n in a) window.DATA[e][a.id][n] = a[n];
              else window.DATA[e][a.id] = a;
            })
          : (window.DATA[e] = t),
          $("#app").data("data", window.DATA),
          a();
      });
    }
    return (
      (this.eco = function (t) {
        a("eco", t);
      }),
      (this.railroad = function (t) {
        a("railroad", t);
      }),
      (this.markets = function (t) {
        a("markets", t);
      }),
      (this.school = function (t) {
        a("school", t);
      }),
      (this.car = function (t) {
        a("roads", t);
      }),
      (this.water = function (t) {
        a("water", t);
      }),
      (this.cost = function (t) {
        a("cost", t);
      }),
      (this.forest = function (t) {
        a("forest", t);
      }),
      (this.default = function (t) {
        t();
      }),
      (this.river = function (t) {
        t();
      }),
      this
    );
  }),
  (__.mapOverlay = function (t, a, n, e, i) {
    var l = __.fs.mapSprites(2),
      o = "source/assets/img/map/pins@".concat(2, "x.png"),
      p = (p = new Image());
    function d(t, a) {
      return (
        __.core.$map.data("icons")
          ? a(__.core.$map.data("icons"))
          : t.addEventListener("load", function () {
              __.core.$map.data("icons", t), a(t);
            }),
        t
      );
    }
    function m(t, a, n, e, i, o, c) {
      var s = n._map.latLngToContainerPoint([t.point[1], t.point[0]]),
        r = { x1: s.x, x2: s.x + c, y1: s.y, y2: s.y + c };
      return o && a.drawImage(e, 0, o, i, i, s.x - c / 2, s.y - c / 2, c, c), r;
    }
    return (
      (p.src = o),
      (this.default = function () {
        return !1;
      }),
      (this.markets = function (t, o, c, s, r) {
        var a = t.data.markets;
        return (
          d(p, function (i) {
            $.each(a, function (t, a) {
              var n = "";
              9 < s && (n = l.point_green), 11 < s && (n = l.markets);
              var e = m(a, c, o, i, 40, n, 26);
              (a.canvas = a.canvas || {}), (a.canvas[r] = e);
            });
          }),
          !1
        );
      }),
      (this.school = function (t, o, c, s, r) {
        var a = t.data.school;
        return (
          d(p, function (i) {
            $.each(a, function (t, a) {
              var n = "";
              9 < s && (n = l.point_blue), 11 < s && (n = l.school);
              var e = m(a, c, o, i, 40, n, 26);
              (a.canvas = a.canvas || {}), (a.canvas[r] = e);
            });
          }),
          !1
        );
      }),
      (this.water = function (t, o, c, s, r) {
        var a = t.data.water;
        return (
          d(p, function (i) {
            $.each(a, function (t, a) {
              var n = "";
              9 < s && (n = l.point_blue), 11 < s && (n = l.water_depth);
              var e = m(a, c, o, i, 40, n, 26);
              (a.canvas = a.canvas || {}), (a.canvas[r] = e);
            });
          }),
          !1
        );
      }),
      (this.cost = function (t, a, n, e, i) {
        return !1;
      }),
      (this.forest = function (t, a, n, e, i) {
        return !1;
      }),
      (this.river = function (t, a, n, e, i) {
        return !1;
      }),
      (this.railroad = function (t, c, s, o, r) {
        var a = t.data.railroad;
        return (
          $.each(a, function (t, a) {
            if (a.path) {
              var n = a.path.points;
              s.beginPath(),
                (s.strokeStyle = "rgba(0, 196, 255, 0.5)"),
                (s.lineWidth = 1),
                (s.lineJoin = "round"),
                (s.lineCap = "round");
              for (var e = 0; e < n.length; e++) {
                var i = c._map.latLngToContainerPoint([n[e][1], n[e][0]]),
                  o = n[e + 1]
                    ? c._map.latLngToContainerPoint([n[e + 1][1], n[e + 1][0]])
                    : i;
                s.moveTo(i.x, i.y), s.lineTo(o.x, o.y);
              }
              s.stroke();
            }
          }),
          d(p, function (i) {
            $.each(a, function (t, a) {
              var n = "";
              9 < o && (n = l.point_blue), 11 < o && (n = l.railroad);
              var e = m(a, s, c, i, 40, n, 26);
              (a.canvas = a.canvas || { visible: !0 }), (a.canvas[r] = e);
            });
          }),
          !1
        );
      }),
      (this.car = function (t, c, s, a, n) {
        var e = t.data.roads;
        return (
          $.each(e, function (t, a) {
            var n = a.points;
            s.beginPath(),
              (s.strokeStyle = "rgba(0, 196, 255, 0.3)"),
              (s.lineWidth = 1),
              (s.lineJoin = "round"),
              (s.lineCap = "round");
            for (var e = 0; e < n.length; e++) {
              var i = c._map.latLngToContainerPoint([n[e][1], n[e][0]]),
                o = n[e + 1]
                  ? c._map.latLngToContainerPoint([n[e + 1][1], n[e + 1][0]])
                  : i;
              s.moveTo(i.x, i.y), s.lineTo(o.x, o.y);
            }
            s.stroke();
          }),
          !1
        );
      }),
      (this.eco = function (t, o, c, s, r) {
        var a = t.data.eco;
        d(p, function (i) {
          $.each(a, function (t, a) {
            var n = null;
            9 < s && (n = l.point_yellow),
              11 < s &&
                (6 == a.type && (n = l.recicle),
                10 == a.type && (n = l.airport),
                (7 != a.type && 9 != a.type) || (n = l.trash),
                (2 != a.type && 1 != a.type) || (n = l.radiation),
                (8 != a.type && 11 != a.type) || (n = l.factory),
                5 == a.type && (n = l.water),
                4 == a.type && (n = l.energy),
                3 == a.type && (n = l.power),
                12 == a.type && (n = l.black_mesa),
                13 == a.type && (n = l.army));
            var e = m(a, c, o, i, 40, n, 26);
            (a.canvas = a.canvas || { visible: !0 }), (a.canvas[r] = e);
          });
        });
      }),
      this
    );
  }),
  (__.mapTiles = function (t) {
    var a = t.simple,
      n = t.dark,
      e = __.core.$map,
      i = e.data("tiles"),
      o = "map_dark",
      c = "map_light";
    function s(t, a) {
      return e.removeClass(t).addClass(a), !1;
    }
    function r(t) {
      i._url != t && i.setUrl(t);
    }
    return (
      (this.default = function () {
        r(a), s(o, c);
      }),
      (this.markets = function () {
        r(n), s(c, o);
      }),
      (this.water = function () {
        r(n), s(c, o);
      }),
      (this.eco = function () {
        r(n), s(c, o);
      }),
      (this.railroad = function () {
        r(n), s(c, o);
      }),
      (this.car = function () {
        r(n), s(c, o);
      }),
      (this.cost = function () {
        r(n), s(c, o);
      }),
      (this.forest = function () {
        r(n), s(c, o);
      }),
      (this.river = function () {
        r(n), s(c, o);
      }),
      (this.school = function () {
        r(n), s(c, o);
      }),
      this
    );
  }),
  (__.placeItem = function (t) {
    var a,
      n =
        "undefined" != typeof global
          ? global.component("mini-map", { lat: t.point[1], lon: t.point[0] })
          : __.miniMap({ lat: t.point[1], lon: t.point[0] }),
      e = t.type ? "".concat(t.type) : "",
      i = "".concat(t.name),
      o =
        t.canvas && t.canvas.color
          ? ((a = t.canvas.color.match(/\d+/g)),
            "background-color:rgba("
              .concat(a[0], ",")
              .concat(a[1], ",")
              .concat(a[2], ", .8)"))
          : "",
      c = '<div class="place-item__car">до Москвы: '
        .concat(t.car.time.h, " ч ")
        .concat(t.car.time.m, " мин (")
        .concat(t.car.distance, " км)</div>"),
      s =
        t.railroad.closest && t.railroad.distance < 3
          ? '<div class="place-item__train">ст. '
              .concat(t.railroad.closest.name, " в ")
              .concat(t.railroad.distance, " км,<br>до Москвы: ")
              .concat(t.railroad.closest.time.h, " ч ")
              .concat(t.railroad.closest.time.m, " мин (")
              .concat(t.railroad.closest.distance, " км)</div>")
          : "",
      r = 100 * Math.floor(t.id / 100),
      l = "https://everydayhero2000.github.io/moscow-real-estate/places/"
        .concat(r, "/place_")
        .concat(t.id, "/"),
      p = '<div itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement" class="place-item" data-id="place-'
        .concat(
          t.id,
          '"> <div class="place-item__content"> <div class="place-item__title"> <div class="place-item__pin" style="'
        )
        .concat(o, '"></div> <a href="')
        .concat(l, '" itemprop="url"><span class="place-item__type">')
        .concat(e, '</span><span class="place-item__name">')
        .concat(i, '</span></a> <meta itemprop="name" content="')
        .concat(e, " ")
        .concat(i, '"> </div> <div class="place-item__distance"> ')
        .concat(c, " ")
        .concat(s, " </div> </div> ")
        .concat(n, "</div>");
    return (
      "undefined" == typeof global &&
        __.fs.event.bind(".place-item", "click", function (t) {}),
      p
    );
  }),
  (__.miniMap = function (t) {
    var a = [55.751244, 37.618423],
      n = [t.lat, t.lon],
      e = [],
      i = 1,
      o = 1;
    return (
      (i =
        n[0] < a[0] ? ((e[0] = a[0] - n[0]), 1) : ((e[0] = n[0] - a[0]), -1)),
      (o =
        n[1] < a[1] ? ((e[1] = n[1] - a[1]), 1) : ((e[1] = a[1] - n[1]), -1)),
      (e[0] = ((80 * e[0]) / 360) * 180 * i),
      (e[1] = ((80 * e[1]) / 180) * 30 * o),
      (e[0] = e[0] < -40 ? -40 : e[0]),
      (e[0] = 40 < e[0] ? 40 : e[0]),
      (e[1] = e[1] < -40 ? -40 : e[1]),
      (e[1] = 40 < e[1] ? 40 : e[1]),
      '<figure class="mini-map"> <div class="mini-map__marker" style="transform: translate('
        .concat(e[1], "px, ")
        .concat(e[0], 'px)"></div> </figure>')
    );
  }),
  (__.placePoint = function (t) {
    var a =
        2 *
        {
          0: { s: 0.5 },
          1: { s: 0.5 },
          2: { s: 0.5 },
          3: { s: 1 },
          4: { s: 1 },
          5: { s: 2 },
          6: { s: 2 },
          7: { s: 3 },
          8: { s: 3 },
          9: { s: 3 },
          10: { s: 4 },
          11: { s: 4 },
          12: { s: 4 },
          13: { s: 6 },
          14: { s: 6 },
          15: { s: 6 },
          16: { s: 12 },
          17: { s: 12 },
          18: { s: 12 },
        }[t.zoom].s,
      n = $(".layers-controls__item_selected").data("id"),
      e = __.fs.colorize()[n](t.place);
    (t.ctx.fillStyle = e),
      10 < t.zoom &&
        ((t.ctx.lineWidth = 1),
        (t.ctx.strokeStyle = "rgba(255, 255, 255,.5)"),
        t.ctx.stroke()),
      11 < t.zoom &&
        ((t.ctx.lineWidth = 1),
        (t.ctx.strokeStyle = "rgb(255, 255, 255)"),
        t.ctx.stroke());
    var i = t.canvasOverlay._map.latLngToContainerPoint([
      t.place.point[1],
      t.place.point[0],
    ]);
    return (
      t.ctx.beginPath(),
      t.ctx.arc(i.x, i.y, a / 2, 0, 2 * Math.PI),
      t.ctx.fill(),
      t.ctx.closePath(),
      (t.place.canvas[t.mapId] = {
        x1: i.x,
        y1: i.y,
        x2: i.x + a,
        y2: i.y + a,
      }),
      (t.place.canvas.color = e),
      t.place.canvas
    );
  }),
  (__.select = function (t) {}),
  (__.selectOnMap = function (t, c, n) {
    m();
    var a = $("#app").data("data"),
      e = a.places,
      s = t.offsetX,
      r = t.offsetY,
      l = "";
    if (
      (n &&
        "map" == c &&
        $.each(a[n], function (t, a) {
          a.canvas &&
            s > a.canvas[c].x1 - 10 &&
            s < a.canvas[c].x2 - 10 &&
            r > a.canvas[c].y1 - 10 &&
            r < a.canvas[c].y2 - 10 &&
            (l += '<div data-type="'
              .concat(n, '" data-id="')
              .concat(
                a.id,
                '" class="place-select__item place-select__item_object"><span class="icon icon_'
              )
              .concat(n, '" data-ico="')
              .concat(a.type, '"></span><span>')
              .concat(a.name, "</span></div>"));
        }),
      $.each(e, function (t, a) {
        if (
          s > a.canvas[c].x1 - 10 &&
          s < a.canvas[c].x2 + 10 &&
          r > a.canvas[c].y1 - 10 &&
          r < a.canvas[c].y2 + 10 &&
          a.canvas.visible
        ) {
          var n = 100 * Math.floor(a.id / 100),
            e = "/places/".concat(n, "/place_").concat(a.id, "/"),
            i = a.type ? a.type + " " + a.name : a.name,
            o = a.canvas.color.match(/\d+/g);
          l += ' <div data-id="'
            .concat(
              a.id,
              '" class="place-select__item place-select__item_place"> <div class="icon icon_place"><span style="background:rgba('
            )
            .concat(o[0], ",")
            .concat(o[1], ",")
            .concat(o[2], ',.8)"></span></div> <a data-id="')
            .concat(a.id, '" href="')
            .concat(e, '">')
            .concat(i, "</a> </div>");
        }
      }),
      l)
    ) {
      $("#map-controls").append(
        '<div class="place-select">'.concat(l, "</div>")
      );
      var i = s - 16,
        o = r - 16,
        p = $("#map")[0].getBoundingClientRect(),
        d = $("#map-controls .place-select")[0].getBoundingClientRect();
      $("#map-controls .place-select").css({
        left: i + d.width > p.width ? p.width - d.width + "px" : i + "px",
        top: o + d.height > p.height ? p.height - d.height + "px" : o + "px",
      }),
        setTimeout(function () {
          $("#map-controls .place-select").addClass("place-select_visible");
        }, 10);
    }
    function m() {
      $("#map-controls").find(".place-select").remove();
    }
    __.fs.event.bind(".place-select", "mouseleave", function (t) {
      m();
    }),
      __.fs.event.bind(".place-select__item", "click", function (t) {
        if (
          (t.preventDefault(),
          m(),
          $(this).is(".place-select__item_place") &&
            __.fs.placeGet($(this).data("id"), function (t, a) {
              __.fs.analytics("select_place", {
                place_id: t.id,
                place_name: t.name,
                place_url: a,
                target: "map",
              }),
                __.detailScreen({ place: t });
            }),
          $(this).is(".place-select__item_object"))
        ) {
          var a = $(this).data("id"),
            n = $(this).data("type");
          __.fs.mapObjectGet(a, n, function (t) {
            __.mapObjectInfo(t, n, c);
          });
        }
      });
  }),
  (__.search = function (s) {
    var t = $("#app").data("data").places,
      n = [],
      r = [],
      a = $("#map").data("map"),
      e = new __.fs.substringSearch({ multiply: !1 }),
      l = {};
    return (
      s.text ||
      null != s.types ||
      null != s.distance ||
      null != s.railroad ||
      null != s.direction ||
      null != s.eco ||
      null != s.cost ||
      null != s.forest ||
      null != s.river
        ? (s.text
            ? (n = e.inArray(
                s.text,
                t,
                function (t) {
                  return t.name;
                },
                function (t) {
                  t.canvas.visible = !0;
                },
                function (t) {
                  t.canvas.visible = !1;
                }
              ))
            : $.each(t, function (t, a) {
                (a.canvas.visible = !0), n.push({ res: { obj: a } });
              }),
          n.length ? (a.search = !0) : (a.search = !1),
          $.each(n, function (t, a) {
            var n = a.res.obj;
            if (!l[n.id]) {
              var e, i;
              if (null != s.types)
                s.types.kp && "КП" == n.type && (e = !0),
                  s.types.snt && "КП" != n.type && (i = !0),
                  e || i || (n.canvas.visible = !1);
              if (
                (null != s.railroad &&
                  s.railroad &&
                  3 < n.railroad.distance &&
                  (n.canvas.visible = !1),
                null != s.cost &&
                  s.cost <= 5e7 &&
                  n.price.closest >= s.cost &&
                  (n.canvas.visible = !1),
                null != s.distance && s.distance < 300)
              ) {
                var o = n.car.time.m < 10 ? "0" + n.car.time.m : n.car.time.m;
                Number(n.car.time.h + "" + o) > s.distance &&
                  (n.canvas.visible = !1);
              }
              if (null != s.direction && s.direction.length) {
                var c = !1;
                $.each(s.direction, function (t, a) {
                  n.moscow.angle > a[0] && n.moscow.angle < a[1] && (c = !0);
                }),
                  c || (n.canvas.visible = !1);
              }
              null != s.eco &&
                s.eco &&
                n.eco.distance < 5 &&
                -1 != n.eco.distance &&
                (n.canvas.visible = !1),
                null != s.forest &&
                  s.forest &&
                  (1 < n.forest.distance || n.forest.distance < 0) &&
                  (n.canvas.visible = !1),
                null != s.river &&
                  s.river &&
                  !n.river.value &&
                  (n.canvas.visible = !1),
                n.canvas.visible && ((l[n.id] = !0), r.push(n));
            }
          }),
          $("#places")
            .trigger("renderList", { places: r, onlyVisible: !0 })
            .scrollTop(0))
        : ((a.search = !1),
          $.each(t, function (t, a) {
            a.canvas.visible = !0;
          }),
          $("#places").trigger("renderList", { places: t, onlyVisible: !1 })),
      $("#map").data("canvas").redraw(),
      r
    );
  }),
  (__.strToCost = function (t) {
    var a = t.value;
    return (
      (a = /\.\d/.test(a) ? a + "" : a + ".00"),
      (a = (a = /\.\d{2}/.test(a) ? a : a + "0").replace(
        /\d(?=(\d{3})+\.)/g,
        "$& "
      )).split(".")
    );
  }),
  (__.fs.analytics = function (t, a) {
    var n = { event_url: location.href };
    return (
      a &&
        $.each(a, function (t, a) {
          n[t] = a;
        }),
      window.amplitude && amplitude.getInstance().logEvent(t, n),
      window.ym && ym(55798045, "reachGoal", t, n),
      n
    );
  }),
  (__.fs.baseUrl = function () {
    var t = "",
      a = window.location.pathname;
    return (
      ("/" != a && "/index.html" != a) || (t = ""),
      a.includes("/places/") && (t = "../../../"),
      t
    );
  }),
  (__.fs.colorize = function (t) {
    function o(t, a, n, e) {
      return "rgba("
        .concat(t, ",")
        .concat(a, ",")
        .concat(n, ",")
        .concat(e, ")");
    }
    function e(t, a, n, e, i) {
      return e + ((n - t) / (a - t)) * ((i - e) / 1);
    }
    function i(t, a) {
      var n = [];
      return (
        (n[3] = 1 - (1 - a[3]) * (1 - t[3])),
        (n[0] = Math.round(
          (a[0] * a[3]) / n[3] + (t[0] * t[3] * (1 - a[3])) / n[3]
        )),
        (n[1] = Math.round(
          (a[1] * a[3]) / n[3] + (t[1] * t[3] * (1 - a[3])) / n[3]
        )),
        (n[2] = Math.round(
          (a[2] * a[3]) / n[3] + (t[2] * t[3] * (1 - a[3])) / n[3]
        )),
        n
      );
    }
    return (
      (this.default = function (t) {
        var a = o(156, 39, 176, 0.5);
        return "КП" == t.type && (a = o(0, 98, 255, 0.5)), a;
      }),
      (this.markets = function (t) {
        var a = t.markets.distance,
          n = i(
            [226, 30, 220, 0.1],
            [0, 98, 255, a < 3 ? 1 - e(0, 3, a, 0, 1) : 0]
          );
        return o(n[0], n[1], n[2], n[3]);
      }),
      (this.eco = function (t) {
        var a = 0 <= t.eco.distance ? t.eco.distance : 100,
          n = i(
            [0, 98, 255, 0.3],
            [255, 30, 0, a <= 10 ? 0.6 - e(0, 10, a, 0, 0.6) : 0]
          );
        return o(n[0], n[1], n[2], n[3]);
      }),
      (this.water = function (t) {
        var a = t.water.value,
          n = o(120, 120, 120, 0);
        return (
          0 < a &&
            (a < 300 && (n = o(20, 20, 137, 0.2)),
            a < 250 && (n = o(20, 20, 198, 0.2)),
            a < 200 && (n = o(20, 20, 204, 0.2)),
            a < 100 && (n = o(20, 20, 255, 0.3)),
            a < 150 && (n = o(40, 60, 255, 0.3)),
            a < 100 && (n = o(40, 60, 235, 0.4)),
            a < 70 && (n = o(40, 60, 235, 0.5)),
            a < 50 && (n = o(40, 130, 255, 0.7)),
            a < 20 && (n = o(40, 130, 255, 0.7))),
          n
        );
      }),
      (this.cost = function (t) {
        var a = t.price.closest,
          n = o(225, 0, 0, 0.5);
        return (
          0 < a &&
            (a < 4e7 && (n = o(255, 100, 0, 0.5)),
            a < 2e7 && (n = o(255, 130, 0, 0.5)),
            a < 1e7 && (n = o(255, 215, 0, 0.5)),
            a < 8e6 && (n = o(203, 255, 0, 0.3)),
            a < 5e6 && (n = o(73, 255, 0, 0.3)),
            a < 2e6 && (n = o(0, 255, 209, 0.3))),
          n
        );
      }),
      (this.forest = function (t) {
        var a = t.forest.distance,
          n = o(225, 0, 0, 0.3);
        return (
          -1 < a &&
            (a <= 1.5 && (n = o(250, 230, 30, 0.3)),
            a <= 1 && (n = o(170, 230, 30, 0.5)),
            a <= 0.5 && (n = o(100, 250, 30, 0.7))),
          n
        );
      }),
      (this.river = function (t) {
        return t.river.value ? o(3, 97, 251, 0.5) : o(225, 0, 0, 0.05);
      }),
      (this.school = function (t) {
        var a = t.school.distance,
          n = o(225, 0, 0, 0.3);
        return (
          -1 < a &&
            (a <= 3 && (n = o(250, 230, 30, 0.3)),
            a <= 2 && (n = o(170, 250, 30, 0.5)),
            a <= 1 && (n = o(100, 250, 30, 0.5))),
          n
        );
      }),
      (this.railroad = function (t) {
        var a = t.railroad.distance,
          n = i(
            [226, 30, 220, 0.1],
            [0, 98, 255, a < 3 ? 1 - e(0, 3, a, 0, 1) : 0]
          );
        return o(n[0], n[1], n[2], n[3]);
      }),
      (this.car = function (t) {
        var a,
          n = __.fs.time.toInt(t.car.time.h, t.car.time.m),
          e = t.roads.mcad.distance,
          i = t.roads.primary.distance;
        return (
          n <= 30 && (a = o(0, 177, 255, 0.3)),
          30 < n && (a = o(29, 0, 255, 0.3)),
          50 < n && (a = o(118, 0, 255, 0.3)),
          70 < n && (a = o(226, 0, 255, 0.3)),
          100 < n && (a = o(255, 0, 128, 0.2)),
          150 < n && (a = o(255, 0, 0, 0.2)),
          i < 4 && (a = o(118, 0, 255, 0.3)),
          i < 4 && n < 120 && (a = o(29, 0, 255, 0.3)),
          e < 6 && (a = o(0, 118, 255, 0.5)),
          i < 2 && n < 40 && (a = o(0, 118, 255, 0.5)),
          a
        );
      }),
      this
    );
  }),
  (__.fs.coreModuls = function (t) {
    var n = {};
    return (
      $.each(t, function (t, a) {
        n[a] = __.core[a]();
      }),
      n
    );
  }),
  (__.fs.browserDetect = function () {
    var t,
      a,
      n,
      e = navigator,
      i = (e.appVersion, e.userAgent),
      o = e.appName,
      c = "" + parseFloat(e.appVersion),
      s = parseInt(e.appVersion, 10);
    -1 != (a = i.indexOf("Opera"))
      ? ((o = "opera"),
        (c = i.substring(a + 6)),
        -1 != (a = i.indexOf("Version")) && (c = i.substring(a + 8)))
      : -1 != (a = i.indexOf("MSIE"))
      ? ((o = "ie"), (c = i.substring(a + 5)))
      : -1 != (a = i.indexOf("Chrome"))
      ? ((o = "chrome"), (c = i.substring(a + 7)))
      : -1 != (a = i.indexOf("Safari"))
      ? ((o = "safari"),
        (c = i.substring(a + 7)),
        -1 != (a = i.indexOf("Version")) && (c = i.substring(a + 8)))
      : -1 != (a = i.indexOf("Firefox"))
      ? ((o = "firefox"), (c = i.substring(a + 8)))
      : -1 != i.indexOf("FBAN") && -1 != i.indexOf("FBAV")
      ? ((o = "facebook"), (c = 0))
      : (t = i.lastIndexOf(" ") + 1) < (a = i.lastIndexOf("/")) &&
        ((o = i.substring(t, a)),
        (c = i.substring(a + 1)),
        o.toLowerCase() == o.toUpperCase() && (o = e.appName)),
      -1 != (n = c.indexOf(";")) && (c = c.substring(0, n)),
      -1 != (n = c.indexOf(" ")) && (c = c.substring(0, n)),
      (s = parseInt("" + c, 10)),
      isNaN(s) &&
        ((c = "" + parseFloat(e.appVersion)), (s = parseInt(e.appVersion, 10)));
    var r,
      l,
      p = /iPad|iPhone|iPod/.test(e.userAgent) && !window.MSStream,
      d = window.devicePixelRatio || 1,
      m = window.screen.width * d,
      u = window.screen.height * d;
    return {
      browserName: o.toLowerCase(),
      fullVersion: c,
      majorVersion: s,
      appName: e.appName.toLowerCase(),
      userAgent: e.userAgent.toLowerCase(),
      platform: e.platform.toLowerCase(),
      iphoneX: p && 1125 == m && 2436 === u ? "iphoneX" : "",
      isMobile:
        ((l = "not-mobile"),
        (r = e.userAgent || e.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          r
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            r.substr(0, 4)
          )) &&
          (l = "mobile"),
        l),
    };
  }),
  (__.fs.decodeData = function (t) {
    var a = t;
    return (
      (window.DATA = {
        places: a,
        eco: {},
        railroad: {},
        markets: {},
        medic: {},
        cities: {},
        roads: { mcad: {}, primary: {} },
        water: {},
        cost: {},
        forest: {},
        school: {},
      }),
      $.each(t, function (t, a) {
        a.canvas = { visible: !0 };
      }),
      window.DATA
    );
  }),
  (__.fs.event = {
    bind: function (t, a, n) {
      var e = __.core.$app.data("listners") || {};
      e[t + "|" + a] ||
        ((e[t + "|" + a] = { name: t, event: a }),
        __.core.$app.data("listners", e),
        $(document).on(a, t, n));
    },
    unbind: function (t, a) {
      var n = __.core.$app.data("listners") || {};
      delete n[t + "|" + a],
        __.core.$app.data("listners", n),
        $(document).off(a, t);
    },
  }),
  (__.fs.html = function (t) {
    return t.replace(/\s+/g, " ").trim();
  }),
  (__.fs.mapObjectGet = function (n, t, a) {
    var e = $("#app").data("data")[t],
      i = null;
    $.each(e, function (t, a) {
      a.id == n && (i = (a.full, a));
    }),
      a(i);
  }),
  (__.mapLegend = function () {
    function t(t, a) {
      return ' <div class="item"> <div class="item__point" style="background:'
        .concat(a, '"></div> <div class="item__description">')
        .concat(t, "</div> </div>");
    }
    return (
      $(".map-legend").length ||
        $("#map .leaflet-bottom.leaflet-right").append(
          '<div class="map-legend"></div>'
        ),
      (this.default = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("СНТ, СТ, ДНТ", "#9c27b0"), " ")
              .concat(t("КП", "#0464ff"), " ")
          ),
          !1
        );
      }),
      (this.eco = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Чисто", "rgba(0, 98, 255,1)"), " ")
              .concat(t("Рядом загрязнение или шум", "rgba(255, 30, 0,1)"), " ")
          ),
          !1
        );
      }),
      (this.river = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(
                t("Рядом есть водоём или река", "rgba(3, 97, 251,1)"),
                " "
              )
              .concat(t("далеко", "rgba(255, 0, 0,1)"), " ")
          ),
          !1
        );
      }),
      (this.cost = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("< 2 млн. руб.", "rgba(0, 255, 209, 1)"), " ")
              .concat(t("< 5 млн. руб.", "rgba(73, 255, 0, 1)"), " ")
              .concat(t("< 8 млн. руб.", "rgba(203, 255, 0, 1)"), " ")
              .concat(t("< 10 млн. руб", "rgba(255, 215, 0, 1)"), " ")
              .concat(t("Дорого", "rgba(225, 0, 0, 1)"), " ")
          ),
          !1
        );
      }),
      (this.forest = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Лес рядом", "rgba(100, 250, 30, 1)"), " ")
              .concat(t("1.5 км до леса", "rgba(250, 230, 30, 1)"), " ")
              .concat(t("Лес далеко", "rgba(225, 0, 0, 1)"), " ")
          ),
          !1
        );
      }),
      (this.railroad = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Рядом станция", "rgba(0, 98, 255, 1)"), " ")
              .concat(t("Станция далеко", "rgba(226, 30, 220, 1)"), " ")
          ),
          !1
        );
      }),
      (this.car = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("До Москвы 30 мин", "rgba(0, 177, 255, 1)"), " ")
              .concat(t("До Москвы больше часа", "rgba(226, 30, 100, 1)"), " ")
          ),
          !1
        );
      }),
      (this.markets = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Рядом", "rgba(0, 177, 255, 1)"), " ")
              .concat(t("Далеко", "rgba(226, 30, 100, 1)"), " ")
          ),
          !1
        );
      }),
      (this.school = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Школа рядом", "rgba(100, 250, 30, 1)"), " ")
              .concat(t("Далеко", "rgba(226, 30, 100, 1)"), " ")
          ),
          !1
        );
      }),
      (this.water = function () {
        return (
          $(".map-legend").html(
            " "
              .concat(t("Глубина < 20 м", "rgba(40, 130, 255, 1)"), " ")
              .concat(t("Глубина > 200 м", "rgba(20, 20, 137, 1)"), " ")
          ),
          !1
        );
      }),
      this
    );
  }),
  (__.fs.mapSprites = function (t) {
    return {
      recicle: 1,
      radiation: 20 * t,
      factory: 40 * t,
      trash: 60 * t,
      airport: 80 * t,
      energy: 100 * t,
      water: 120 * t,
      point_yellow: 140 * t,
      power: 160 * t,
      point_blue: 180 * t,
      point_green: 200 * t,
      railroad: 220 * t,
      black_mesa: 240 * t,
      army: 260 * t,
      markets: 280 * t,
      water_depth: 300 * t,
      school: 340 * t,
    };
  }),
  (__.fs.mapTiles = (function () {
    var t = "chrome" == __.fs.browserDetect().browserName ? "webp" : "png";
    return {
      simple: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.".concat(
        t
      ),
      dark: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.".concat(
        t
      ),
    };
  })()),
  (__.fs.substringSearch = function (m) {
    ((m = m || {}).weight = m.weight || 100), (m.multiply = m.multiply || !0);
    var u = this,
      h = { weight: 0, search: "", res: "", in: -1, out: -1, length: 0 };
    function _(t, a) {
      for (
        var n = t.toLowerCase().trim(),
          e = ("" + a.str).toLowerCase(),
          i = e.indexOf(n),
          o = m.weight,
          c = e.length,
          s = n.length,
          r = t.length * (o / 10),
          l = [];
        ;

      ) {
        var p = v(h);
        (p.search = t), (p.res = a);
        var d = e.indexOf(n, i);
        if (-1 == d) break;
        s <= c &&
          e.indexOf(n, i) + 1 &&
          ((p.weight += 50 < (c / s) * 100 ? o + r : (c / s) * o + r),
          (p.weight = c - d),
          (p.in = d),
          (p.out = p.in + n.length),
          c === (p.length = s) && (p.weight += 2 * o),
          e[0] === n[0] && (p.weight += o)),
          l.push(p),
          (i = d + 1);
      }
      return m.multiply || (l = [(l = l.sort(f))[0]]), l;
    }
    function f(t, a) {
      var n = 0;
      return (t = t.weight) < (a = a.weight) ? (n = 1) : a < t && (n = -1), n;
    }
    function v(t) {
      return Object.assign({}, t);
    }
    return (
      (this.inString = function (t, a) {
        var n = (t = "" + t).length ? t.trim().split(" ") : [""],
          e = a.length ? a.trim().split(" ") : [""],
          i = n.length,
          o = t.length,
          c = e.length,
          s = { str: a },
          r = [];
        if (o) {
          if (t.indexOf(" ") + 1) {
            var l = _(t, s);
            l.weight && (l.weight = l.weight * c), (r = l);
          }
          for (var p = i; p--; ) r = r.concat(_(n[p], s));
          r = r.sort(f);
        } else {
          var d = v(h);
          (d.search = t), (d.res = s), r.push(d);
        }
        return r;
      }),
      (this.inArray = function (t, a, n, e, i) {
        t = "" + t;
        for (var o = [], c = a.length; c--; ) {
          var s = n(a[c]),
            r = { obj: a[c], str: s, index: c },
            l = u.inString(t, s),
            p = l.length;
          if (p) {
            for (var d = p; d--; ) e && e(a[c]), l[d] && (l[d].res = r);
            o = o.concat(l);
          } else i && i(a[c]);
        }
        return (o = o.sort(f));
      }),
      this
    );
  }),
  (__.fs.placeGet = function (t, a) {
    var n = 100 * Math.floor(t / 100),
      e = "bin/data/places/".concat(n, "/place_").concat(t, "/data.json");
    $.get(e, function (t) {
      a(t, e);
    });
  }),
  (__.fs.time = {
    toInt: function (t, a) {
      return +((t = "" + t) + (a = a < 10 ? "0" + a : "" + a));
    },
  }),
  (__.fs.url = {
    objToUrl: function (t, a) {
      t = t + "?" || "";
      var i = encodeURIComponent;
      return (
        t +
        Object.entries(a)
          .map(function (t) {
            var a = _slicedToArray(t, 2),
              n = a[0],
              e = a[1];
            return "".concat(i(n), "=").concat(i(e));
          })
          .join("&")
      );
    },
  });
$(function () {
  runApp();
  console.log("0.2.1");
});
//# sourceMappingURL=main.js.map
