__.fs.placeGet = function(id, callback){
  
  let folder = Math.floor(id/100) * 100,
      url = `./bin/data/places/${folder}/place_${id}/data.json`;
  
  $.get(url, function(data){

    callback(data, url);

  });
  
}