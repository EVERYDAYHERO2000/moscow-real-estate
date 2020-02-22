__.core.$placeSearch = function(){
  
  __.formFilter();
  
  $('#place-search').bind('search', function(event, params){
    
    let _this = this,
        value = $(this).find('input').val();
    
    
    
    
    __.search({
      text: value
    });
    
    __.fs.analytics('search_place', {
      value : $(this).find('input').val() 
    })
    
  }).keyup(function(e){
    
    var code = e.which;
    if(code==13)e.preventDefault();
    if(code==32||code==13){
     
      //$(this).trigger('search');
      
    }
    
    $(this).find('input').attr('data-value', $(this).find('input').val());
    
  }).find('.place-search__search').click(function(e){

    e.preventDefault();
    $(this).trigger('search');
   
  });
  
  return $('#place-search');
  
}