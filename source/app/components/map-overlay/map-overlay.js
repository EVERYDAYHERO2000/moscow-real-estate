__.mapOverlay = function (params, canvasOverlay, ctx, zoom) {


  let scale = 2,
    icons = __.fs.mapSprites(scale),
    size = 20 * scale,
    resize = size * 0.65,
    src = `source/assets/img/map/pins@${scale}x.png`,
    img = img = new Image();
  
    img.src = src;

  this.default = function () {
    return false
  };

  this.railroad = function (params, canvasOverlay, ctx, zoom) {

    let railroad = params.data.railroad;
    
     console.log(params.data);
    
     img.addEventListener('load', function () {

      $.each(railroad, function (i, e) {

        var ico = '';
      
        if (zoom > 9) ico = icons.point_blue;
        if (zoom > 11) ico = icons.railroad;

        var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);

        if (ico) ctx.drawImage(img, 0, ico, size, size, dot.x - resize / 2, dot.y - resize / 2, resize, resize);

      });



    }, false);

    return false
  };

  this.car = function () {
    return false
  };


  this.eco = function (params, canvasOverlay, ctx, zoom) {

    let eco = params.data.eco;

    img.addEventListener('load', function () {

      $.each(eco, function (i, e) {

        var ico = null;

        if (zoom > 9) {

          if (e.type == 'n') ico = icons.recicle;
          if (e.type == 'a') ico = icons.airport;
          if (e.type == 'w') ico = icons.trash;
          if (e.type == 'r' || e.type == 'q') ico = icons.radiation;
          if (e.type == 'o' || e.type == 'E') ico = icons.factory;
          if (e.type == 's') ico = icons.water;
          if (e.type == 'p') ico = icons.energy;
          if (e.type == 'K') ico = icons.power;

        } else {

          ico = icons.point_yellow;

        }

        var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);

        if (ico) ctx.drawImage(img, 0, ico, size, size, dot.x - resize / 2, dot.y - resize / 2, resize, resize);

      });



    }, false);
    

  }

  return this;

}