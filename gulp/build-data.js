const _ = require('lodash');
const writeFiles = require('@root/gulp/write-files.js');
const textGen = require('@root/gulp/text-gen/place-description-generator.js');

const buildRailroad = require('@root/gulp/build-data/build-railroad.js');
const buildEco = require('@root/gulp/build-data/build-eco.js');
const buildCities = require('@root/gulp/build-data/build-cities.js');
const buildMarkets = require('@root/gulp/build-data/build-markets.js');
const buildMedic = require('@root/gulp/build-data/build-medic.js');
const buildMcad = require('@root/gulp/build-data/build-mcad.js');
const buildPrimary = require('@root/gulp/build-data/build-primary.js');
const buildWater = require('@root/gulp/build-data/build-water.js');
const buildCost = require('@root/gulp/build-data/build-cost.js');
const buildForest = require('@root/gulp/build-data/build-forest.js');

const matchRailroad = require('@root/gulp/match-data/match-railroad.js');
const matchEco = require('@root/gulp/match-data/match-eco.js');
const matchCities = require('@root/gulp/match-data/match-cities.js');
const matchMarkets = require('@root/gulp/match-data/match-markets.js');
const matchMedic = require('@root/gulp/match-data/match-medic.js');
const matchMcad = require('@root/gulp/match-data/match-mcad.js');
const matchPrimary = require('@root/gulp/match-data/match-primary.js');
const matchWater = require('@root/gulp/match-data/match-water.js');
const matchMoscow = require('@root/gulp/match-data/match-moscow.js');
const matchCar = require('@root/gulp/match-data/match-car.js');
const matchCost = require('@root/gulp/match-data/match-cost.js');
const matchForest = require('@root/gulp/match-data/match-forest.js');

const writeWorldData = require('@root/gulp/build-data/fs/write-world-data.js');
const writeData = require('@root/gulp/build-data/fs/write-data.js');

const buildData = function (places, writeFile) {

  let dataPath = DEV_PATH + '/source/data/';

  let placesData = (function (places) {

    let result = (places) ? places : require(dataPath + 'places/places.json');

    console.log(`World data: ${result.length} places loaded`)

    return result;

  })();

  const worldData = {

    railroad: buildRailroad(),
    cost: buildCost(),
    eco: buildEco(),
    cities: buildCities(),
    markets: buildMarkets(),
    medic: buildMedic(),
    roads: {
      mcad: buildMcad(),
      primary: buildPrimary()
    },
    forest: buildForest(),
    water: buildWater()

  }

  let placesDataLength = placesData.length;

  _.forEach(placesData, function (place, i) {

    if (process.stdout.clearLine){
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Maped point ${i} of ${placesDataLength}`);
    }

    place.eco = matchEco(place, worldData.eco);
    place.price = {
      from : place.price.from,
      to : place.price.to,
      closest : matchCost(place, worldData.cost)
    }  
    place.railroad = matchRailroad(place, worldData.railroad);
    place.moscow = matchMoscow(place);
    place.city = matchCities(place, worldData.cities);
    place.car = matchCar(place, placesData);
    place.medic = matchMedic(place, worldData.medic)
    place.markets = matchMarkets(place, worldData.markets);
    place.roads = {
      mcad: matchMcad(place, worldData.roads.mcad),
      primary: matchPrimary(place, worldData.roads.primary)
    };
    place.water = matchWater(place, worldData.water);
    place.forest = matchForest(place, worldData.forest);

    place.description = textGen(place);


  });

  console.log(`World data: All object is maped`);

  placesData = _.sortBy(placesData, [function (o) { return o.moscow.distance; }, function (o) { return o.price.from; }]);

  global.DATA = placesData;


  writeFiles({
    places: placesData
  }, writeFile);


  

  let file = _.cloneDeep(placesData);
  console.log('data.json is cloned')

  _.forEach(file, function (place) {

      delete place.eco.closests;
      delete place.water.closests;
      delete place.forest.closests;
      delete place.roads.mcad.closest;
      delete place.roads.primary.closest;
      delete place.railroad.closest.path;
      
      place.railroad.closest = {
        name : place.railroad.closest.name,
        time : place.railroad.closest.time,
        distance : place.railroad.closest.distance
      }

      delete place.city.closest;
      delete place.markets.closest;
      delete place.medic.closest;
      delete place.description;
      delete place.address;
      delete place.nature;
      delete place.props;

  });

  console.log('data.json ready to save')

  writeData(file, 'data');

}
module.exports = buildData;