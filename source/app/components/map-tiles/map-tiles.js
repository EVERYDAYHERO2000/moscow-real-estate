__.mapTiles = function(){
  
  let simple = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
      dark = 'https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA',
      tiles = $('#map').data('tiles');
  
  
  this.default = function(){
    
    if (tiles._url != simple) tiles.setUrl(simple);
    
  }
  
  this.eco = function(){
    
    if (tiles._url != dark) tiles.setUrl(dark);
    
  }
  
  this.railroad = function(){
    
    if (tiles._url != dark) tiles.setUrl(dark);
    
  }
  
  this.car = function(){
    
    if (tiles._url != dark) tiles.setUrl(dark);
    
  }
  
  return this;
  
}