const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const min = require('@root/gulp/fs/math/get-min.js');

const match = function(place, data){
    let result = {};
    let point = place.point;
    let r = 1.5;
    let points = global.forestArr || [];

    if (!points.length){
        _.forEach(data, function(e){

            getPoint(e.points, e, points);

        });
        global.forestArr = points;
    }


    _.forEach(points, function(d){

        if ( !result[d.name] ) {

        let currentDist = calcDistance(point[1], point[0], d.point[1], d.point[0], 'K');

            if (currentDist <= r) {

                //if ( !result[d.name] || result[d.name].distance > currentDist ) 

                result[d.name] = {
            
                    closestId : d.id,
                    closest : {
                       name : d.name,
                       type : d.type,
                       id : d.id
                    },
                    distance : +currentDist.toFixed(1)
                    
                };

            } 
            

        }
          

    });


    function getPoint(arr, data, points){

        if (arr && arr[0]){

            if (typeof arr[0] == 'number'){

                points.push({
                    point : arr,
                    id : data.id,
                    name : data.name,
                    type : data.type
                });

            } else {

                _.forEach(arr, function(e){

                    getPoint(e, data, points);

                });

            }

        }

    }

    //result = _.values(temp);
    
    let temp = [],
        temp_dist = [];

    if (place.nature.forest == '1') {

        temp.push({
            type : 3,
        });
        temp_dist.push(0.1);
    
    }    

    return {
        distance : (function(result){
          
          _.forEach(result, function(d){
            
            temp.push(d.closest);
            temp_dist.push(d.distance);
              
          });
     
          return (temp_dist.length) ? +min(temp_dist).toFixed(2) : -1;
          
        })(result),
        closests : temp
        
      };
}

module.exports = match;