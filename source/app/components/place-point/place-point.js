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
  
  params.ctx.fillStyle = __.colorize().eco(params.place);

  var dot = params.canvasOverlay._map.latLngToContainerPoint([params.place.point[1], params.place.point[0]]);
  params.ctx.beginPath();
  params.ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
  params.ctx.fill();
  params.ctx.closePath();


  return {
    x1: dot.x,
    y1: dot.y,
    x2: dot.x + size,
    y2: dot.y + size
  };

}