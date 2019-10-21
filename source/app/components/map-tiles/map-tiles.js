__.mapTiles = function(tileset){
  
  let simple = tileset.simple,
      dark = tileset.dark,
      $map = $('#map'),
      tiles = $map.data('tiles');
  
  
  
  this.default = function(){
    
    if (tiles._url != simple) {
      tiles.setUrl(simple);
      $map.addClass('map_light').removeClass('map_dark');
    }
    
    
  }
  
  this.eco = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      $map.removeClass('map_light').addClass('map_dark');
    }
    
  }
  
  this.railroad = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      $map.removeClass('map_light').addClass('map_dark');
    }
    
  }
  
  this.car = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      $map.removeClass('map_light').addClass('map_dark');
    }
    
  }
  
  return this;
  
}