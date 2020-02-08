const _ = require('lodash');
const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');

const build = function(){
  
    const stations = require('@data/railroad/points.json');
    const routes = require('@data/railroad/route.json');
    const settings = require('@data/railroad/settings.json');

    var result = _.clone(stations);

    _.forEach(result, function (e) {

      _.forEach(settings.route, function (e2) {

        if (e.routeId == e2.id) {

          e.route = e2.name;

        }

      });
      
      _.forEach(routes, function(e3){
        
        if (e.pathId == e3.id) {
          
          e.path = e3;
          
        }
        
      });
      
      _.forEach(settings.type, function (e4) {
        
        if (e.typeId == e4.id) {
          
          e.type = e4.name;
          
        }
        
      });
      
      delete e.pathId;
      delete e.typeId;
      delete e.routeId;
      delete e.trains;

    });
    
    console.log(`World data: ${result.length} railroad station loaded`);

    writeWorldData(result, 'railroad');

    return result;
  
}

module.exports = build;