const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

let component = function(component, params){
  
  global.__ = global.__ || {};
  global.bindEvent = global.bindEvent || function(){};
  
  let comp = fs.readFileSync(DEV_PATH + `/source/app/components/${component}/${component}.js` , 'utf8');
  
  
  return eval(comp)(params);
  
};

module.exports = component;