__.placePoint = function (params) {

  const s = {
      0: {
        s: .5
      },
      1: {
        s: .5
      },
      2: {
        s: .5
      },
      3: {
        s: 1
      },
      4: {
        s: 1
      },
      5: {
        s: 2
      },
      6: {
        s: 2
      },
      7: {
        s: 3
      },
      8: {
        s: 3
      },
      9: {
        s: 3
      },
      10: {
        s: 4
      },
      11: {
        s: 4
      },
      12: {
        s: 4
      },
      13: {
        s: 6
      },
      14: {
        s: 6
      },
      15: {
        s: 6
      },
      16: {
        s: 12
      },
      17: {
        s: 12
      },
      18: {
        s: 12
      }
    },
    size = s[params.zoom].s * 2;

  var colorize = {};

  colorize.eco = function() {
    var r = 10;
    switch (params.place.eco.closest.type) {
      case 'K':
        r = 3;
        break;
      case 'p':
        r = 3;
        break;
      case 'n':
        r = 5;
        break;
    }

    var distance = params.place.eco.distance;
    
    var alpha = (distance < r) ? 0.6 - interpolation(0, r, distance, 0, 0.6) : 0;

    var color = blendColors(
    [0, 98, 255, .3],
    [255, 30, 0, alpha]
    );

    return `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

  }
  
  colorize.railroad = function() {
    
    var distance = params.place.railroad.distance;
    
    var alpha = (distance < 3) ? 1 - interpolation(0, 3, distance, 0, 1) : 0;

    var color = blendColors(
    [255, 30, 0, .2],
    [0, 98, 255, alpha]
    );

    return `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
    
  }

  params.ctx.fillStyle = colorize.eco();

  var dot = params.canvasOverlay._map.latLngToContainerPoint([params.place.point[1], params.place.point[0]]);
  params.ctx.beginPath();
  params.ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
  params.ctx.fill();
  params.ctx.closePath();


  function interpolation(minFrom, maxFrom, current, minTo, maxTo) {
    return minTo + ((current - minFrom) / (maxFrom - minFrom)) * ((maxTo - minTo) / 1);
  }


  function blendColors(base, added) {

    var mix = [];
    mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
    mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
    mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
    mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue

    return mix;
  }

  return {
    x1: dot.x,
    y1: dot.y,
    x2: dot.x + size,
    y2: dot.y + size
  };

}