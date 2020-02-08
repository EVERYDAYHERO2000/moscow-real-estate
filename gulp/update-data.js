const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const https = require('https');
const iconv = require("iconv-lite");
const CSVToArray = require('@root/gulp/fs/csv-to-array.js');
const buildData = require('@root/gulp/build-data.js');

const updateData = function(){
  
  const csvURL = global.SETTINGS['places-data'];

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
      
      _.forEach(arr,function(p,i){
        
        if (i > 0){
          
        const obj = {
          "name": p[1],
          "type": (p[8]) ? p[8] : '',
          "point": [ +((+p[3]).toFixed(6)), +((+p[2]).toFixed(6)) ],
          "site": (p[14]) ? p[14] : '',
          "car": {
            "distance": (p[10]) ? +p[10] : '',
            "time": {
              "h": (p[11]) ? +(p[11].split(':')[0]) : '',
              "m": (p[11]) ? +(p[11].split(':')[1]) : ''
            }
          },
          "developer": (p[13]) ? p[13] : '',
          "class": (p[9]) ? p[9] : '',
          "price": {
            "from": (p[5]) ? +p[5] : '',
            "to": (p[6]) ? +p[6] : ''
          },
          "address": {
            "name": (p[4]) ? p[4] : ''
          },
          "description": (p[12]) ? p[12] : '',
          "readyDate": (p[7]) ? +p[7] : '',
          "id": +p[0],
          "props" : {
            "energy" : (p[16]) ? p[16] : '',
            "water"  : (p[17]) ? p[17] : '',
            "drainage" : (p[18]) ? p[18] : '',
            "gas" : (p[19]) ? p[19] : '',
            "scurity" : (p[20]) ? p[20] : '',
          },
          "nature" : {
            "forest" : (p[22]) ? p[22] : '',
            "water"  : (p[23]) ? p[23] : ''
          }
        }
        
        places.push(obj);
          
        }
        
      })
      
      console.log(`World data: ${places.length} loaded from Google Spreadsheet`);
      
      fs.writeFile(DEV_PATH + '/source/data/places/places.json', JSON.stringify(places), function(err) {
        if (err) {
          console.log('Data udate error -->', err); 
        } else {
          console.log(`${places.length} write in /source/data/places/places.json`); 
          buildData(places, true);
        } 
        
      });
      
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  
}

module.exports = updateData;