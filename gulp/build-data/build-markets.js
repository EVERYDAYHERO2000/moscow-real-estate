const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
  const markets = require('@data/structure/market.json');
  let result = [];
    
    _.forEach(markets, function(e){
      
      let market = {
        id : e.id,
        name : e.name,
        point : [e.lon,e.lat],
        address : e.address
      };
      
      result.push(market);
    });
    
    console.log(`World data: ${result.length} market loaded`);

    writeWorldData(result, 'markets');
    
    return result;
}

module.exports = build;