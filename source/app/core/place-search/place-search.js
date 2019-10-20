__.core.$placeSearch = function(){
  
    $('#place-search').bind('search', function(event, params){
    
    var _this = this;
    
    __.search({
      text: $(this).find('input').val()
    });
    
  }).keyup(function(e){
    
    var code = e.which;
    if(code==13)e.preventDefault();
    if(code==32||code==13||code==188||code==186){
     
      $(this).trigger('search');
      
    }
    
  }).find('button').click(function(e){
    
    $(this).trigger('search');
   
  });
  
  return $('#place-search');
  
}