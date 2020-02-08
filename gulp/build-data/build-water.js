const _ = require('lodash');
const min = require('@root/gulp/fs/math/get-min.js');
const max = require('@root/gulp/fs/math/get-max.js');
const average = require('@root/gulp/fs/math/average.js');
const mode = require('@root/gulp/fs/math/mode.js');
const median = require('@root/gulp/fs/math/median.js');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
    const water_1 = require('@data/eco/water.json');
    const water_2 = require('@data/eco/water_3.json');
    
    let result = [];
    
    _.forEach(water_1, function(e,i){
      
      let min_ = +min(e.val).toFixed(2);
      let max_ = +max(e.val).toFixed(2);
      
      if (min_ != 0 && max_ != 0) result.push({
        median : median(e.val),
        min : min_,
        max : max_,
        average : +average(e.val).toFixed(2),
        point : [e.lon, e.lat],
        name : e.name,
        id : result.length + i
      })
      
    });

    _.forEach(water_2, function(e,i){
      
      let min_ = +min(e.value).toFixed(2);
      let max_ = +e.value[0];
      
      if (min_ != 0 && max_ != 0) result.push({
        median : +e.value[0],
        min : min_,
        max : max_,
        average : +e.value[0],
        point : [e.point[1],e.point[0]],
        name : e.name,
        id : result.length + i
      })
      
    });
    
    console.log(`World data: ${result.length} water point loaded`);

    writeWorldData(result, 'water');
    
    return result;
  
}

module.exports = build;