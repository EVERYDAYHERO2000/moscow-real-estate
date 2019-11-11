__.core.$window = function() {
  
  
  var headerHeight = $('#header').outerHeight(),
      vh = window.innerHeight * 0.01;
  
  resize();
  
  $(window).resize(function(e){
    resize();
    
  });
  
  function resize(){

    $('#app').css({
      height: $(window).innerHeight() + 'px'
    });
    
    $('#main').css({
      height : `calc(100% - ${headerHeight}px)`
    });
    
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  return $(window);
  
}