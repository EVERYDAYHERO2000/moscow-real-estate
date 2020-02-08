const direction = function(angle){
    
    let d = '';
    
    if ( angle >= 339 && angle <= 360 ){
      d = 'в западном направлении';
    }

    if ( angle >= 0 && angle <= 23 ){
      d = 'в западном направлении'
    }
    
    if ( angle >= 24 && angle <= 68){
      d = 'в юго-западном направлении'
    }
    
    if ( angle >= 69 && angle <= 113 ){
      d = 'в южном направлении'
    }
    
    if ( angle >= 114 && angle <= 158){
      d = 'в юго-восточном направлении'
    }
    
    if ( angle >= 159 && angle <= 203 ){
      d = 'в восточном направлении'
    }
    
    if ( angle >= 204 && angle <= 225 ){
      d = 'в северо-восточном направлении'
    }
    
    if ( angle >= 226 && angle <= 293){
      d = 'в северном направлении'
    }
    
    if ( angle >= 294 && angle <= 338 ){
      d = 'в северо-западном направлении'
    }
    
    return d;
    
  }

module.exports = direction;