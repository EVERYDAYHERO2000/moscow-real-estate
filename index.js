const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

var temp = [];

var t = {
  t1 : require(__dirname + '/source/data/places/t1.json').elements,
  t2 : require(__dirname + '/source/data/places/t2.json').elements,
  t3 : require(__dirname + '/source/data/places/t3.json').elements,
  t4 : require(__dirname + '/source/data/places/t4.json').elements,
  t5 : require(__dirname + '/source/data/places/t5.json').elements,
  t6 : require(__dirname + '/source/data/places/t6.json').elements,
  t7 : require(__dirname + '/source/data/places/t7.json').elements,
  t8 : require(__dirname + '/source/data/places/t8.json').elements,
  t9 : require(__dirname + '/source/data/places/t9.json').elements,
  t10 : require(__dirname + '/source/data/places/t10.json').elements,
  t11 : require(__dirname + '/source/data/places/t11.json').elements,
  t12 : require(__dirname + '/source/data/places/t12.json').elements,
  t13 : require(__dirname + '/source/data/places/t13.json').elements,
  t14 : require(__dirname + '/source/data/places/t14.json').elements,
  t15 : require(__dirname + '/source/data/places/t15.json').elements,
  t16 : require(__dirname + '/source/data/places/t16.json').elements
}

console.log(t);