__.search = function(params){
  
  var DATA = $('#app').data('data').places,
      request = params.text.toLowerCase().trim(),
      results = [],
      map = $('#map').data('map');
   
  
  if (params.text){
    $.each(DATA, function(i,e){
      
      var name = e.name.toLowerCase().trim();
      
      if (name.indexOf(request) !== -1){

        e.canvas.visible = true;
        results.push(e);
      } else {

        e.canvas.visible = false;

      }

    });

    if (results.length) {
      map.search = true;
    } else {
      map.search = false;  
    }
    
     $('#places').trigger('renderList', {places : DATA, onlyVisible: true}).scrollTop(0);
    
  } else {
    
    map.search = false;
    $.each(DATA, function(i,e){
      e.canvas.visible = true;
    });
    
    $('#places').trigger('renderList', {places : DATA, onlyVisible: false});
    
    
    
  }
  
  
  $('#map').data('canvas').redraw();
  
  
  return results;
  
}

/*
$(function () {



  if ($('#ssic')[0]) {
    $.get('https://api.osome.com/api/v2/industries', function (resp) {

      var indastries = resp.industries;

      $('#ssic-search').keyup(function (e) {

        clearTimeout(window.osome.ssic_app);

        var val = $(this).val().toLowerCase().trim();
        var vals = val.split(' ');

        var tempResult = [];

        if (val.length >= 3) {



          for (var c in indastries) {

            var text = indastries[c].name;
            var words = text.split(' ');

            var tempItem = {
              target: indastries[c],
              weight: 0,
            }

            for (var v = 0; v < vals.length; v++) {

              if (vals[v].length > 2) {

                for (var i = 0; i < words.length; i++) {

                  var targetWord = words[i].toLowerCase();

                  if (targetWord.length >= vals[v].length && targetWord.indexOf(vals[v]) + 1) {

                    if (targetWord.length === vals[v].length) tempItem.weight += 200;

                    if (targetWord[0] === vals[v][0]) tempItem.weight += 100;

                    tempItem.weight += (vals[v].length / targetWord.length * 100 > 50) ? 100 : vals[v].length / targetWord.length * 100;

                    if (words.indexOf(vals[v]) > 0) {
                      tempItem.weight += 100 - (words.indexOf(vals[v]) / words.length * 100);
                    }

                  }

                }
              }
            }

            if (tempItem.weight > 0) tempResult.push(tempItem);
          }

          function compare(a, b) {

            a = a.weight;
            b = b.weight;

            var comparison = 0;
            if (a < b) {
              comparison = 1;
            } else if (a > b) {
              comparison = -1;
            }
            return comparison;
          }

          tempResult.sort(compare);

          if (tempResult.length) {
            $('.ssic-search-results__industries-top').css({
              display: 'none'
            });
            $('.ssic-search-results__header').text('Results');
          } else {
            $('.ssic-search-results__industries-top').css({
              display: 'block'
            });
            $('.ssic-search-results__header').text('Top suggestions');
          }



        } else {

          tempResult = [];

          if (tempResult.length) {
            $('.ssic-search-results__industries-top').css({
              display: 'none'
            });
            $('.ssic-search-results__header').text('Results');
          } else {
            $('.ssic-search-results__industries-top').css({
              display: 'block'
            });
            $('.ssic-search-results__header').text('Top suggestions');
          }

        }


        $('.ssic-search-results__industries-search').html(function () {

          var html = '';

          for (var i = 0; i < tempResult.length; i++) {
            var weight = Math.ceil(tempResult[i].weight * 2) / 2;
            var v = (weight < 100) ? 'not-valid' : '';
            html += '<li class="ssic-search__result" data-weight="' + weight + '" data-id="' + tempResult[i].target.id + '">' +
              '<code>' + tempResult[i].target.code + '</code>' +
              '<span>' + tempResult[i].target.title + '</span>' +
              '<div class="ssic-search-results__button-col"><a data-ga="cta_go-to-websome" class="ssic-search-results__submit" target="_blank" rel="noreferrer noopener nofollow" href="https://my.osome.com/?start=incorporation&branch=SG&activity1Id=' + tempResult[i].target.id + '">Start Incorporation</a></div>'
            '</li>';

          }

          window.osome.ssic_app = setTimeout(function () {
            var event = {
              event: 'ssic_search',
              search_request: $('#ssic-search').val()
            };

            window.dataLayer.push(event);
          }, 1000);

          return html;


        });

        $('.ssic-search-results__industries-search span').each(function (i, e) {

          var innerHTML = $(e).text();

          for (var v = 0; v < vals.length; v++) {
            if (vals[v].length > 2) {
              innerHTML = innerHTML.replace(new RegExp(vals[v], 'gi'), "[[$&]]");
            }
          }

          innerHTML = innerHTML.replace(/\[\[/g, '<span class="result-match">').replace(/\]\]/g, '</span>');

          $(e).html(innerHTML);

        });

      });

    });





    $('#ssic').click(function (e) {

      if ($(e.target).is('.ssic-search__result')) {
        $('.ssic-search-results .ssic-search__result').not(e.target).removeClass('checked');

        $(e.target).toggleClass('checked');
      }

      if ($(e.target).is('.ssic-search-results__submit')) {
        var event = {
          event: 'ssic_choice',
          search_request: $('#ssic-search').val(),
          ssic_code_title: $(e.target).parent().parent().find('span').text(),
          ssic_code_code: $(e.target).parent().parent().find('code').text(),
          ssic_code_id: $(e.target).parent().parent().data('id')
        };

        window.dataLayer.push(event);
      }

    });


  }



});
*/