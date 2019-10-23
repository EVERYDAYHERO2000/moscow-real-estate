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
    
    
    getIcons(img, function(img){
      
      $.each(railroad, function (i, e) {

        let ico = '';
      
        if (zoom > 9) ico = icons.point_blue;
        if (zoom > 11) ico = icons.railroad;

        drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);

      });
      
    });
    
    return false
  };

  this.car = function () {
    return false
  };


  this.eco = function (params, canvasOverlay, ctx, zoom) {

    let eco = params.data.eco;
    
    getIcons(img, function(img){
      
      $.each(eco, function (i, e) {

        let ico = null;

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

        drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);

      });
      
    });

  }
  
  function getIcons(img, callback){
    
    if (__.core.$map.data('icons')){
      
      callback(__.core.$map.data('icons'));
      
    } else {
    
      img.addEventListener('load', function () {

        __.core.$map.data('icons', img);

        callback(img);

      });
      
    }
    
    return img;
    
  }
  
  
  function drawIcons(e, ctx, canvasOverlay, img, size, ico, resize){
    
    let dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);
    if (ico) ctx.drawImage(img, 0, ico, size, size, dot.x - resize / 2, dot.y - resize / 2, resize, resize);
    return img;
  }

  return this;

}