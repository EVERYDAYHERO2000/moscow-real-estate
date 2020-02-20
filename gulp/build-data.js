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
const matchPlaces = require('@root/gulp/match-data/match-places.js');

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

    if (process.stdout.clearLine) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Maped point ${i} of ${placesDataLength}`);
    }

    place.eco = matchEco(place, worldData.eco);
    place.price = {
      from: place.price.from,
      to: place.price.to,
      closest: matchCost(place, worldData.cost)
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
    place.places = matchPlaces(place, placesData);

    place.description = textGen(place);

    if (i == placesDataLength){
      delete global.forestArr;
    }

  });

  console.log(`World data: All object is maped`);

  placesData = _.sortBy(placesData, [function (o) { return o.moscow.distance; }, function (o) { return o.price.from; }]);

  global.DATA = placesData;


  writeFiles({
    places: placesData
  }, writeFile);


        let file = [];

        _.forEach(placesData, function (place) {

          file.push({ 
            "name": place.name, 
            "type": place.type, 
            "point": place.point, 
            "site": place.site, 
            "car": place.car, 
            "developer": place.developer, 
            "class": place.class, 
            "price": place.price, 
            "readyDate": place.readyDate, 
            "title": place.title, 
            "id": place.id, 
            "eco": { 
              "distance": place.eco.distance 
            }, 
            "railroad": { 
              "closestId": place.railroad.closestId, 
              "closest": { 
                "name": place.railroad.closest.name, 
                "time": place.railroad.closest.time, 
                "distance": place.railroad.closest.distance 
              }, 
              "distance": place.railroad.distance 
            }, 
            "moscow": { 
              "distance": place.moscow.distance, 
              "angle": place.moscow.angle 
            }, 
            "city": { 
              //"closestId" : place.city.closestId,
              "distance": place.city.distance 
            }, 
            "markets": { 
              //"closestId": place.markets.closestId, 
              "distance": place.markets.distance
            }, 
            "roads": { 
              "mcad": { 
                //"closestId": place.roads.mcad.closestId, 
                "distance": place.roads.mcad.distance
              }, 
              "primary": { 
                //"closestId": place.roads.primary.closestId, 
                "distance": place.roads.primary.distance
              } 
            }, 
            //"medic" : {
              //"closestId": place.medic.closestId,
              //"distance" : place.medic.distance
            //},
            "water": { 
              "value": place.water.value 
            }, 
            "forest": { 
              "distance": place.forest.distance 
            }
          });

        });

        writeData(file, 'data');


}
module.exports = buildData;