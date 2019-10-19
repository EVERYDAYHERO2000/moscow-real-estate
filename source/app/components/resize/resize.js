__.resize = function() {
  
  
  let headerHeight = $('#header').outerHeight(),
      windowHeight = $(window).outerHeight();
  
  resize();
  
  $(window).resize(function(e){
    
    resize();
    
  });
  
  function resize(){
    $('#main').css({
      height : (windowHeight - headerHeight) + 'px'
    });
    
  }
  
}