const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const component = function(component, params){
  
  global.btoa = function(str) {
    return Buffer.from(str).toString('base64');
  }
  
  global.__ = global.__ || {};
  
  let comp = fs.readFileSync(DEV_PATH + `/source/app/components/${component}/${component}.js` , 'utf8');
  
  return eval(comp)(params);
  
};

module.exports = component;