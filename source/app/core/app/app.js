__.core.$app = function(){
  
  $('#app').data('browser', __.fs.browserDetect()).addClass(function(){
    let browser = $(this).data('browser')
    return [browser.browserName, browser.platform, browser.isMobile].join(' ');
  });
  
  return $('#app');
  
}