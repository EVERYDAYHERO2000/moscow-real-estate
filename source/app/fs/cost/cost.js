__.fs.cost = function(params) {
  
    let value = params.value;
    value = (/\.\d/.test(value)) ? value + '' : value + '.00';
    value = (/\.\d{2}/.test(value)) ? value : value + '0';
    value = (value).replace(/\d(?=(\d{3})+\.)/g, '$& ');

    return value.split('.');
  
}