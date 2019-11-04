__.core.$header = function(){
  
  $('#change-view').click(function(){
      
      if ( $(this).text() != 'На карте' ){
        $(this).text('На карте');
      } else {
        $(this).text('Списком');
      }
    
      
    $('#main').toggleClass('main_screen-2');
    
    __.fs.dataLayer('change_view', {
      
      change_to : $(this).text() 
      
    });
    
  });
  
  return $('#header'); 
  
};