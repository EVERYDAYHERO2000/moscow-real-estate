__.fs.mapTiles = (function(){
  
  let format = (__.fs.browserDetect().browserName == 'chrome') ? 'webp' : 'png';
  
  return {
      simple : `https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.${format}`,
      dark : `https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.${format}?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA`
    } 
  
  
})();