__.detailScreen = function (data){
   
  let $screen = (__.core.$detailScreen) ? __.core.$detailScreen : $(`<div id="detail-screen" class="panel panel_detail"><div class="header-mobile"><button id="close-screen" class="btn">Назад</button></div><div class="container"></div></div>`);
  
  let $container = $screen.find('.container').empty();
  
  $container.append(`<div>${data.type} ${data.name}</div>`);
  
  if (data.address.name) $container.append(`<div>${data.address.name}</div>`);
  
  $container.append(`<div>Ближайший город: ${data.city.closest.name} в ${data.city.distance}км</div>`);
  $container.append(`<div>Расстояние от Москвы: ${data.moscow.distance}км</div>`);
  $container.append(`<div>На автомобиле до Москвы: ${data.car.distance}км, ${data.car.time.h}ч ${data.car.time.m}мин без учета пробок</div>`);
  $container.append(`<div>Ближайшая ж/д станция ${data.railroad.closest.name} в ${data.railroad.distance}км</div>`);
  
  
  $screen.find('#close-screen').click(function(e){
    
    $('#main').find('#detail-screen').remove();
    
  });
  
  console.log(data);
  
  __.core.$detailScreen = $screen;
  
  $('#main').append($screen);
  
  
}