__.logo = function(params){
 
  let title = (params.title) ? params.title : `<span class="header__title">Найти коттеджный посёлок</span>`;
  
  return `<div class="header__logo">
            <a href="/"><img alt="myhousehub" class="header__icon" src="/source/assets/img/myhousehub.svg" /></a>
            <div>
              <a href="/" class="header__sitename">MYHOUSEHUB</a>
              ${title}
            </div>
          </div>`;
  
}