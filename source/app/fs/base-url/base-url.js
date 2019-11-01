__.fs.baseUrl = function(){
  
  let url = '',
      location = window.location.pathname;
  
  if (location == '/' || location == '/index.html') {
    url = '';  
  }
  
  if (location.includes('/places/')) {
    url = '../../../'; 
  }
  
  return url;
  
}