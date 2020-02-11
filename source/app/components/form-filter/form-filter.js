__.formFilter = function (params) {
  
  
  if (typeof global == 'undefined') {
    
    reset();
    
    let query = getQuery();
    
    $('.filter-form').data('filter', query);
    
    
    
    $('.place-search__filter').click(function(e){
      
      $('.filter-form').toggleClass('filter-form_hidden');
      
    });
    
    $('.filter-form .form-tab__header').click(function(e){
      
      $(this).parent('.form-tab').toggleClass('form-tab_hidden');
      
    });
    
    $('#range-name_0').on('input change', function(e){
      
      let value = $(this).val();
      let cost = __.strToCost({value:value})[0]


      $(this).parent().find('span').text(`до ${cost} руб.`);
    });

    $('#range-name_1').on('input change', function(e){
      
      let value = $(this).val();
      let text = 'Время в пути до москвы до';
      let h = Math.floor(value / 60);
      let m = value % 60;
      let time = (h) ? `${h}ч ${m}мин` : `${m}мин`;
      
      $(this).parent().find('span').text(`${text} ${time}`);
    });
   
    $('.filter-form .svg-select').click(function(e){

      $(this).toggleClass('svg-select_active');
      
    })
    
    $('#btn-reset').click(function(e){
      reset();
      
      let query = getQuery();
      
      $('.filter-form').data('filter', query);
      
      __.search({text:''});
      
      $('.place-search__filter').click();
      
    });
    
    $('#btn-find').click(function(e){
      
      let query = getQuery();
      
      $('.filter-form').data('filter', query);
      
      __.search(query);
      
      $('.place-search__filter').click();
      
    });
    
  }
  

  
  
  function getQuery(){
    
    let types = (function(){
      
      let obj = {
        kp : $('#ch-name_1').prop('checked'),
        snt : $('#ch-name_2').prop('checked')
      }
      
      return obj;
    })();
    
    let cost = $('#range-name_0').val();
    let distance = $('#range-name_1').val();
    let train = $('#ch-name_3').prop('checked');
    let direction = (function(){
      
      let angle = [];
      
      $('.svg-select_active').each(function(i,e){
        
        let id = $(e).attr('id');
        
        if (id == 'top')          angle.push([226,293]);
        if (id == 'top-left' )    angle.push([294,338]);
        if (id == 'top-right')    angle.push([204,225]);
        if (id == 'bottom')       angle.push([69,113]);
        if (id == 'bottom-right') angle.push([114,158]);
        if (id == 'bottom-left')  angle.push([24,68]); 
        if (id == 'left')         angle.push([339, 360], [0,23]);
        if (id == 'right')        angle.push([159,203]);
           
      });
      
      if (!angle.length) angle.push([226,293], [294,338], [204,225], [69,113], [114,158], [24,68], [339, 360], [0,23], [159,203]);
      
      return angle;
      
    })();
    
    let eco = $('#ch-name_4').prop('checked');
    
    let name = $('#place-search-input').val();
    
    return {
      text : name,
      types : types,
      distance : distance,
      railroad : train,
      direction : direction,
      cost : cost,
      eco : eco
    }
    
  }
  
  function reset(){
    $('#ch-name_1, #ch-name_2').prop( 'checked', true );  
    $('#ch-name_3, #ch-name_4').prop( 'checked', false );
    $('#range-name_1').val(100000000);
    $('#range-name_1').val(120);
    $('.svg-select').removeClass('svg-select_active');
    $('#place-search-input').val('').attr('data-value','');
  }
  
  return false;
  
}