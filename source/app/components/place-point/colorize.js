__.colorize = function(params){
   
  //default
  this.default = function() {
    
    return rgba(0,98,255,.5);
    
  }
  
  //ecology
  this.eco = function(params) {
    
    var r = 10;
    switch (params.eco.closest.type) {
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

    var distance = params.eco.distance;
    var alphaMax = 0.6;
    var alpha = (distance < r) ? alphaMax - interpolation(0, r, distance, 0, alphaMax) : 0;

    var color = blendColors(
    [0, 98, 255, .3],
    [255, 30, 0, alpha]
    );

    return rgba(color[0],color[1],color[2],color[3]);

  }
  
  //railroad
  this.railroad = function(params) {
    
    var distance = params.railroad.distance;
    var alphaMax = 1;
    var alpha = (distance < 3) ? alphaMax - interpolation(0, 3, distance, 0, alphaMax) : 0;

    var color = blendColors(
    [226, 30, 220, .1],
    [0, 98, 255, alpha]
    );

    return rgba(color[0],color[1],color[2],color[3]);
    
  }
  
  //car distance
  this.car = function(params) {
    
    var distance = params.car.distance;
    var color;

    if (distance <= 30) color = rgba(0, 177, 255, 0.3);
    if (distance > 30) color = rgba(29, 0, 255, 0.3);
    if (distance > 50) color = rgba(118, 0, 255, 0.3);
    if (distance > 70) color = rgba(226, 0, 255, 0.3);
    if (distance > 100) color = rgba(255, 0, 128, 0.3);
    if (distance > 150) color = rgba(255, 0, 0, 0.3);

    return color;
    
  }
  
  function rgba(r,g,b,a){
    return `rgba(${r},${g},${b},${a})`;
  }
  
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
  
  return this;
  
}