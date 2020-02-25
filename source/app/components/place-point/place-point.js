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
    size = s[params.zoom].s * 2,
    changeColor = $('.layers-controls__item_selected').data('id'),   
    color = __.fs.colorize()[changeColor](params.place);
  
  
  
  params.ctx.fillStyle = color;
  
  if (params.zoom > 10){
    params.ctx.lineWidth = 1;
    params.ctx.strokeStyle = 'rgba(255, 255, 255,.5)';
    params.ctx.stroke();
  }
  
  if (params.zoom > 11){
    params.ctx.lineWidth = 1;
    params.ctx.strokeStyle = 'rgb(255, 255, 255)';
    params.ctx.stroke();
    
  }

  var dot = params.canvasOverlay._map.latLngToContainerPoint([params.place.point[1], params.place.point[0]]);
  
  params.ctx.beginPath();
  params.ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
  params.ctx.fill();
  params.ctx.closePath();


  params.place.canvas[params.mapId] = {
    x1: dot.x,
    y1: dot.y,
    x2: dot.x + size,
    y2: dot.y + size,
  }
  
  params.place.canvas.color = color;
  
  return params.place.canvas;

}