const getClosest = require('@root/gulp/fs/get-closest.js');

const match = function(place, data){
    let result = getClosest(place.point, data)
    return result.closest.cost;
}

module.exports = match;