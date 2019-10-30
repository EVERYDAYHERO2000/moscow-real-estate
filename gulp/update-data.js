const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const https = require('https');
const iconv = require("iconv-lite");
const CSVToArray = require(DEV_PATH + '/gulp/csv-to-array.js');
const buildData = require(DEV_PATH + '/gulp/build-data.js');


let updateData = function(){
  
  var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8QUn2_IpcV0Q_i9uJfsmKMYZErXyAVGMv4u9a1sG36S4450_Wr5vv6LUMsgPYZpoxmdclHMVmg7U6/pub?gid=1270687964&single=true&output=csv';

  https.get(csvURL, (resp) => {
    let data = '',
        chunks = [];

    resp.on('data', (chunk) => {
      
      chunks.push(chunk);
      
    });

    resp.on('end', () => {
      
      data = iconv.decode(Buffer.concat(chunks), 'utf8');
      
      var arr = CSVToArray(data);
      var places = [];
      
      _.forEach(arr,function(p, i){
        
        if (i > 0){
        
        
          
        var obj = {
          "name": p[1],
          "type": (p[8]) ? p[8] : null,
          "point": [ +((+p[3]).toFixed(6)), +((+p[2]).toFixed(6)) ],
          "site": (p[14]) ? p[14] : null,
          "car": {
            "distance": (p[10]) ? +p[10] : null,
            "time": {
              "h": (p[11]) ? +(p[11].split(':')[0]) : null,
              "m": (p[11]) ? +(p[11].split(':')[1]) : null
            }
          },
          "developer": (p[13]) ? p[13] : null,
          "class": (p[9]) ? p[9] : null,
          "price": {
            "from": (p[5]) ? +p[5] : null,
            "to": (p[6]) ? +p[6] : null
          },
          "address": {
            "name": (p[4]) ? p[4] : null
          },
          "description": (p[12]) ? p[12] : null,
          "readyDate": (p[7]) ? +p[7] : null,
          "id": +p[0]
        }
        
        places.push(obj);
          
        }
        
      })
      
      
      fs.writeFile(DEV_PATH + '/source/data/places/places.json', JSON.stringify(places), function(err) {
        if (err) {
          console.log('updateData -->', err); 
        } else {
          console.log('updateData -->', 'done'); 
          buildData(places, true);
        } 
        
      });
      
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
}

module.exports = updateData;