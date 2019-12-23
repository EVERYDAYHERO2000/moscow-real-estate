__.fs.colorize = function(params){
   
  //default
  this.default = function() {
    
    return rgba(0,98,255,.5);
    
  }
  
  //markets
  this.markets = function(params) {
    
    var distance = params.markets.distance;
    var alphaMax = 1;
    var alpha = (distance < 3) ? alphaMax - interpolation(0, 3, distance, 0, alphaMax) : 0;

    var color = blendColors(
    [226, 30, 220, .1],
    [0, 98, 255, alpha]
    );

    return rgba(color[0],color[1],color[2],color[3]);
    
  }
  
  
  //ecology
  this.eco = function(params) {
    var r = 10;
    var distance = (params.eco.distance >= 0) ? params.eco.distance : 100;
    var alphaMax = 0.6; 
    var alpha = (distance <= r) ? alphaMax - interpolation(0, r, distance, 0, alphaMax) : 0;
    
    var color = blendColors(
    [0, 98, 255, .3],
    [255, 30, 0, alpha]
    );
    

    return rgba(color[0],color[1],color[2],color[3]);

  }
  
  //water
  this.water = function(params) {
    /*
    let water = params.water.value;
    let color = [121, 121, 121, 0.05];
    let alpha = interpolation(20, 150, water, 0, 0.6);
    
    if (water >= 0) {
      
      color = blendColors(
      [0, 11, 150, 0.2], //rgba(0, 11, 142, 0)
      [0, 200, 255, alpha] //rgba(0, 206, 255, 0) 
      );
      
    }

    return rgba(color[0],color[1],color[2],color[3]);
    */
    let water = params.water.value;
    let color = rgba(120, 120, 120, 0);
    
    if (water > 0){
      
      if (water < 300) color = rgba(20, 20, 137, 0.2)
      if (water < 250) color = rgba(20, 20, 198, 0.2)
      if (water < 200) color = rgba(20, 20, 204, 0.2)
      if (water < 100) color = rgba(20, 20, 255, 0.3);
      if (water < 150) color = rgba(40, 60, 255, 0.3);
      if (water < 100) color = rgba(40, 60, 235, 0.4);
      if (water < 70)  color = rgba(40, 60, 235, 0.5);
      if (water < 50)  color = rgba(40, 130, 255, 0.7);
      if (water < 20)  color = rgba(40, 130, 255, 0.7); 
    } 
    
    
    return color;
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
    
    var time = __.fs.time.toInt(params.car.time.h,params.car.time.m);
    var mcad_road = params.roads.mcad.distance;
    var primary_road = params.roads.primary.distance;
    var color;

    if (time <= 30) color = rgba(0, 177, 255, 0.3);
    if (time > 30) color = rgba(29, 0, 255, 0.3);
    if (time > 50) color = rgba(118, 0, 255, 0.3);
    if (time > 70) color = rgba(226, 0, 255, 0.3);
    if (time > 100) color = rgba(255, 0, 128, 0.2);
    if (time > 150) color = rgba(255, 0, 0, 0.2);
    
    if (primary_road < 4 ) color = rgba(118, 0, 255, 0.3);
    if (primary_road < 4 && time < 120) color = rgba(29, 0, 255, 0.3);
    if (mcad_road < 6) color = rgba(0, 118, 255, 0.5);
    if (primary_road < 2 && time < 40) color = rgba(0, 118, 255, 0.5);  

    
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