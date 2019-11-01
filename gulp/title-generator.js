let titleGenerator = function(data){
  
  let title = '';
  
  title = `${data.type} ${data.name} в ${data.moscow.distance}км от Москвы, вблизи города ${data.city.closest.name}.` 
  
  return title;
}

module.exports = titleGenerator;