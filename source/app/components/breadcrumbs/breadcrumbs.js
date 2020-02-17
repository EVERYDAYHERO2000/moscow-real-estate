__.breadcrumbs = function (params) {

    let links = params.links,
        tpl = '';

    for (var i = 0; i < links.length; i++){

        let position = `<meta itemprop="position" content="${i+1}">`,
            name = links[i].name,
            url = links[i].url,
            link = links[i].link;

        if ( link == false ) {

            tpl += `
          <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
            <span itemprop="name">${name}</span>
            ${position}
            <meta itemprop="item" content="${url}">
          </li>    
            `;

        } else {

            tpl += `
          <li class="breadcrumbs_item" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
            <span itemprop="name">
              <a class="breadcrumbs_link" itemprop="item" href="${url}">${name}</a>
            </span>
            ${position}
          </li>`;

        }

    }

    return `
<ol class="breadcrumbs" itemscope="" itemtype="http://schema.org/BreadcrumbList">
  ${tpl}
</ol>
    `;

}    