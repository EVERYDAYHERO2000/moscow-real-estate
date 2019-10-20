__.core.$window = function() {
  
  
  let headerHeight = $('#header').outerHeight(),
      windowHeight = $(window).outerHeight();
  
  resize();
  
  $(window).resize(function(e){
    
    resize();
    
  });
  
  function resize(){
    $('#main').css({
      height : `calc(100vh - ${headerHeight}px)`
    });
    
  }
  
  return $(window);
  
}