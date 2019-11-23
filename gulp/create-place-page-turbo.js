const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require(DEV_PATH + '/gulp/calc-distance.js');
const component = require(DEV_PATH + '/gulp/component.js');
const header = require(DEV_PATH + '/gulp/header.js');
const titleGenerator = require(DEV_PATH + '/gulp/title-generator.js');
const descriptionGenerator = require(DEV_PATH + '/gulp/description-generator.js');

global.component = global.component || component;

let createPageTurbo = function(params){
  
  let page = `
<item turbo="true">
  
  <link>${params.url}</link>
  <turbo:source></turbo:source>
  <turbo:topic></turbo:topic>
  <title>${params.title}</title>
  <pubDate>${params.date}</pubDate>
  <author>Илья А</author>
  <metrics>
    <yandex schema_identifier="Идентификатор">
      <breadcrumblist>
        <breadcrumb url="https://myhousehub/" text="Коттеджные поселки Москвы"/>
        <breadcrumb url="${params.url}" text="${params.title}"/>
      </breadcrumblist>
    </yandex>
  </metrics>
  <yandex:related></yandex:related>
  <turbo:content>
    <![CDATA[
      ${params.content}
    ]]>
  </turbo:content>

</item>

`;
  
  return page;  
  
}
  
module.exports = createPageTurbo;    