__.mapData = function(){
  
  let _this = this;
  
  let DATA = $('#app').data('data');
  
  this.eco = function(callback){
    
    getData('eco', callback);
    
  }
  
  this.railroad = function(callback){
    
    getData('railroad', callback);
    
  }
  
  this.markets = function(callback){
    
    getData('markets', callback);
    
  }
  
  this.car = function(callback){
    
    callback();
        
  }
  
  this.default = function(callback){
    
    callback();
    
  }
  
  function getData(name, callback) {
    
    if (DATA.places[0][name].closest.name) {
      
      callback();
      
    } else {
      
      $.get(`/bin/data/${name}.json`, function (data) {
          
          
          
          $.each(data, function (i, e2) {
            
            
            if (window.DATA[name][e2.id]) {
              
              for (var k in e2) window.DATA[name][e2.id][k] = e2[k];
            
            } else {
              
              window.DATA[name][e2.id] = e2;
              
            }
  

          });
          
          $('#app').data('data', window.DATA);

          callback();
          
        });
      
    }
  }
  
  return this;
  
}