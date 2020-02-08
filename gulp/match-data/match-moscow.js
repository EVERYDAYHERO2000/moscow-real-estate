const calcDistance = require('@root/gulp/fs/calc-distance.js');

const match = function(place){
    let moscow = [37.618423, 55.751244],
        currentDist = calcDistance(place.point[1], place.point[0], moscow[1], moscow[0], 'K'),
        result = {
          distance : +currentDist.toFixed(2),
          
          angle : (function(){
            
            let d = [moscow[1] - place.point[1], moscow[0] - place.point[0]];
            let angle = Math.atan2(d[0], d[1]);
            let degrees = 180*angle/Math.PI;
                
            return (360+Math.round(degrees))%360;
            
          })()
        }
    
    return result;
}

module.exports = match;