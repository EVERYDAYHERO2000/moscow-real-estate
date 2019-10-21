__.mapTiles = function(tileset){
  
  let simple = tileset.simple,
      dark = tileset.dark,
      $map = $('#map'),
      tiles = $map.data('tiles');
  
  
  
  this.default = function(){
    
    if (tiles._url != simple) {
      tiles.setUrl(simple);
      
    }
    changeClass('map_dark','map_light');
    
  }
  
  this.eco = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      
    }
    changeClass('map_light','map_dark');
  }
  
  this.railroad = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      
    }
    changeClass('map_light','map_dark');
  }
  
  this.car = function(){
    
    if (tiles._url != dark) {
      tiles.setUrl(dark);
      
    }
    changeClass('map_light','map_dark');
  }
  
  function changeClass(from,to){
    $map.removeClass(from).addClass(to);
    return false;
  }
  
  return this;
  
}