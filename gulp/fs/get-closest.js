const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');

const getClosest = function(point, data) {
  let distance = 10000000,
      similar = {};

  _.forEach(data, function (d) {
    let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');

    if (currentDist <= distance) {
      distance = currentDist;
      similar = d;
    }

  });

  return {
    closestId: +similar.id,
    closest: similar,
    distance: +distance.toFixed(2)
  }
}

module.exports = getClosest;