__.colorize = function(params){
   
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
    [255, 30, 0, .1],
    [0, 98, 255, alpha]
    );

    return rgba(color[0],color[1],color[2],color[3]);
    
  }
  
  //car distance
  this.car = function(params) {
    
    var distance = params.car.distance;
    var alphaMax = 0.3;
    var alpha = alphaMax - interpolation(10, 200, distance, 0, alphaMax);

    var color = blendColors(
    [255, 30, 0, .1],
    [0, 98, 255, alpha]
    );

    return rgba(color[0],color[1],color[2],color[3]);
    
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