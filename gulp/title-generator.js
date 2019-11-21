let titleGenerator = function(data){
  let type = (data.type) ? data.type : 'КП';
  let title = '';
  
  title = `${type} ${data.name} в ${data.moscow.distance} км от Москвы, вблизи города ${data.city.closest.name}.` 
  
  return title;
}

module.exports = titleGenerator;