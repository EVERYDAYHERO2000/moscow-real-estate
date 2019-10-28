__.fs.url = {
  
  objToUrl : function(url,obj){
    url = url + '?' || '' 
    let uri = encodeURIComponent;
    return url + Object.entries(obj).map(([key, val]) => `${uri(key)}=${uri(val)}`).join('&');
  }
  
}