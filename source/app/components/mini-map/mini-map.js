__.miniMap = function(params){
  
    var moscow = [55.751244, 37.618423];
    
    var point =[params.lat, params.lon];
    
    var result = [];
    var size = 80
    var offsetT = 1,
        offsetL = 1;
    
    //top -> bot
    if (moscow[0] > point[0]){
      
      result[0] =  moscow[0] - point[0]
      offsetT = 1
    } else {
      
      result[0] = point[0] - moscow[0]; 
      offsetT = -1
    }
    
    //left -> right
    if (moscow[1] > point[1]){
      
      result[1] = point[1] - moscow[1]
      offsetL = 1
    } else {
      
      result[1] = moscow[1] - point[1]; 
      offsetL = -1
    }
    
    result[0] = (((result[0]*size)/360) * 180) * offsetT;
    result[1] = (((result[1]*size)/180) * 30) * offsetL;
    
    result[0] = (result[0] < -40) ? -40 : result[0];
    result[0] = (result[0] > 40) ? 40 : result[0];
    
    result[1] = (result[1] < -40) ? -40 : result[1];
    result[1] = (result[1] > 40) ? 40 : result[1];
      
  let tpl = `<div class="mini-map">
    <div class="mini-map__marker" style="transform: translate(${result[1]}px, ${result[0]}px)"></div>
  </div>`;
  
  return tpl;
  
}