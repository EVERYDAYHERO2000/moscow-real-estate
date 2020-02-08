const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const calcDistance = require('@root/gulp/fs/calc-distance.js');
const component = require('@root/gulp/fs/component.js');
const header = require('@root/gulp/partials/header.js');
const titleGenerator = require('@root/gulp/text-gen/title-generator.js');
const descriptionGenerator = require('@root/gulp/text-gen/description-generator.js');

global.component = global.component || component;

let createPageTurbo = function(params){
  
  let url = `${SETTINGS.domain}${params.url}`;
  
  let page = `
<item turbo="true">
  
  <link>${url}</link>
  <turbo:source></turbo:source>
  <turbo:topic></turbo:topic>
  <metrics>
    <yandex schema_identifier="Идентификатор">
      <breadcrumblist>
        <breadcrumb url="https://myhousehub/" text="Коттеджные поселки Москвы"/>
        <breadcrumb url="${url}" text="${params.title}"/>
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