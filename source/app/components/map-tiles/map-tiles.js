__.mapTiles = function(tileset){
  
  let simple = tileset.simple,
      dark = tileset.dark,
      $map = __.core.$map,
      tiles = $map.data('tiles'),
      d = 'map_dark',
      l = 'map_light';
  
  
  
  this.default = function(){
    
    setTiles(simple);
    changeClass(d,l);
    
  }
  
  this.markets = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }
  
  this.water = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }
  
  this.eco = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }
  
  this.railroad = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }
  
  this.car = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }

  this.cost = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }

  this.forest = function(){
    
    setTiles(dark);
    changeClass(l,d);
  }
  
  function changeClass(from,to){
    $map.removeClass(from).addClass(to);
    return false;
  }
  
  function setTiles(n){
    if (tiles._url != n) {
      tiles.setUrl(n);
    }
  }
  
  return this;
  
}