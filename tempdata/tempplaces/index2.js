const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const data = require(__dirname + '/data.json');
var data2 = _.clone(require(__dirname + '/source/data/places/data.json'));

var temp = {
  "type":"FeatureCollection",
  "features":[]
}

var t = {};

_.forEach(data,function(d){
  
  t[d.id] = d;
  
});


_.forEach(t,function(d){
  
  var obj = {
    type : 'Feature',
    properties : {},
    geometry: {
      type : 'Point',
      coordinates : []
    }
  };
  
  d.name = d.name.replace(/\./g,' ').replace(/\,/g,' ');
  
  obj.properties.type = (function(){
    var type = '';
    if ( d.name.indexOf('ТЛПХ ') >= 0 ) {
      type = 'ТЛПХ';
      d.name = d.name.replace('ТЛПХ', '');
    }
    if ( d.name.indexOf('ПДСК ') >= 0 ) {
      type = 'ПДСК';
      d.name = d.name.replace('ПДСК', '');
    }
    if ( d.name.indexOf('СНТ ') >= 0 ) {
      type = 'СНТ';
      d.name = d.name.replace('СНТ', '');
    }
    if ( d.name.indexOf('ДНТ ') >= 0 ) {
      type = 'ДНТ';
      d.name = d.name.replace('ДНТ', '');
    }
    if ( d.name.indexOf('ДНП ') >= 0 ) {
      type = 'ДНП';
      d.name = d.name.replace('ДНП', '');
    }
    if ( d.name.indexOf('ДСК ') >= 0 ) {
      type = 'ДСК';
      d.name = d.name.replace('ДСК', '');
    }
    if ( d.name.indexOf('СПО ') >= 0 ) {
      type = 'СПО';
      d.name = d.name.replace('СПО', '');
    }
    if ( d.name.indexOf('ПСК ') >= 0 ) {
      type = 'ПСК';
      d.name = d.name.replace('ПСК', '');
    }
    if ( d.name.indexOf('СПК ') >= 0 ) {
      type = 'СПК';
      d.name = d.name.replace('СПК', '');
    }
    if ( d.name.indexOf('КИЗ ') >= 0 ) {
      type = 'КИЗ';
      d.name = d.name.replace('КИЗ', '');
    }
    if ( d.name.indexOf('ДПК ') >= 0 ) {
      type = 'ДПК';
      d.name = d.name.replace('ДПК', '');
    }
    if ( d.name.indexOf('ЖСК ') >= 0 ) {
      type = 'ЖСК';
      d.name = d.name.replace('ЖСК', '');
    }
    if ( d.name.indexOf('АСЖ ') >= 0 ) {
      type = 'АСЖ';
      d.name = d.name.replace('АСЖ', '');
    }
    if ( d.name.indexOf('СТ ') >= 0 || d.name.indexOf('с/т ') >= 0 ) {
      type = 'СТ';
      d.name = d.name.replace('СТ', '').replace('с/т', '');
    }
    if ( d.name.indexOf('СП ') >= 0 ) {
      type = 'СП';
      d.name = d.name.replace('СП', '');
    }
    if ( d.name.indexOf('СК ') >= 0 ) {
      type = 'СК';
      d.name = d.name.replace('СК', '');
    }
    if ( d.name.indexOf('ЖК ') >= 0 ) {
      type = 'ЖК';
      d.name = d.name.replace('ЖК', '');
    }
    if ( d.name.indexOf('ДП ') >= 0 ) {
      type = 'ДП';
      d.name = d.name.replace('ДП', '');
    }
    if ( d.name.indexOf('ДК ') >= 0 ) {
      type = 'ДК';
      d.name = d.name.replace('ДК', '');
    }
    if ( d.name.indexOf('КП ') >= 0 || d.name.indexOf('Коттеджный посёлок') >= 0 || d.name.indexOf('коттеджный посёлок') >= 0 ) {
      type = 'КП';
      d.name = d.name.replace('КП', '').replace('Коттеджный посёлок', '').replace('коттеджный посёлок', '');
    }
    return type;
  })();
  
  obj.properties.name = d.name = d.name.replace(/\"/g,'').replace(/[\«\»]/g,'').replace(/\./g,'').replace(/\,/g,'').replace(/\'/g,'').trim();
  
  obj.properties.description = d.description;
  obj.geometry.coordinates = d.point;
  obj.properties.id = d.id;
  
  temp.features.push(obj);
  
  
});

_.forEach(temp.features, function(e){
  
  var obj = {
  "name": e.properties.name,
  "type": e.properties.type,
  "point": e.geometry.coordinates,
  "site": "",
  "car": {
    "distance": null,
    "time": {
      "h": null,
      "m": null
    }
  },
  "developer": "",
  "class": "",
  "price": {
    "from": null,
    "to": null
  },
  "address": {
    "name": "",
    "route": "",
    "distance": ""
  },
  "description": e.properties.description,
  "readyDate": null,
  "id": e.properties.id
}
  
  data2.push(obj);
  
});

//console.log(temp.features.length)

fs.writeFile(__dirname + '/places.json', JSON.stringify(data2), function(err) {});

