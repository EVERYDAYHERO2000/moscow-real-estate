__.fs.substringSearch = function(options) {

  options = options || {}
  
  options.weight   = options.weight || 100;
  options.multiply = options.multiply || true;

  let _this = this,
    results = [],
    proto = {
      weight: 0,
      search: '',
      res:    '',
      in:     -1,
      out:    -1,
      length: 0
    };

  /*
    search in the string
  */
  this.inString = function (substr, str) {

    substr = '' + substr;

    let wordsSearch = (substr.length) ? substr.trim().split(' ') : [''],
      words = (str.length) ? str.trim().split(' ') : [''],
      wsl = wordsSearch.length,
      sl = substr.length, 
      wl = words.length, 
      _res = {
        str: str
      },
      result = [];

    if (sl) {
      

      if (substr.indexOf(' ') + 1) {

        let fullMatch = search(substr, _res);

        if (fullMatch.weight) fullMatch.weight = fullMatch.weight * wl;

        result = fullMatch;

      }

      for (var i = wsl; i--;) {

        result = result.concat(search(wordsSearch[i], _res));

      }

      result = result.sort(compare);

    } else {

      let tempItem = copyObject(proto);
      tempItem.search = substr;
      tempItem.res = _res;

      result.push(tempItem);

    }

    return result;

  }
  
  
  /*
    search in the array
  */
  this.inArray = function (substr, arr, getKey, isFind, isNotFind) {

    substr = '' + substr;

    let result = [],
        al = arr.length;

    for (var i = al; i--;) {

      let str = getKey(arr[i]),
        _res = {
          obj: arr[i],
          str: str,
          index: i
        },
        _result = _this.inString(substr, str),
        rl = _result.length;

      if (rl) {
        for (var r = rl; r--;) {
        
          if (isFind) isFind(arr[i]);
          
          if (_result[r]) _result[r].res = _res;

        }
        
        result = result.concat(_result);
        
      } else {
        
        if (isNotFind) isNotFind(arr[i]);
        
      }

    

    }

    result = result.sort(compare);

    return result;

  }

  function search(substr, _res) {

    let search = substr.toLowerCase().trim(),
      str = ''+_res.str,
      normalStr = str.toLowerCase(),
      pos = normalStr.indexOf(search),
      w = options.weight,
      nl = normalStr.length,
      sl = search.length,  
      length = substr.length * (w / 10),
      result = [];
        

    while (true) {

      let tempItem = copyObject(proto);
      tempItem.search = substr;
      tempItem.res = _res;

      let foundPos = normalStr.indexOf(search, pos);

      if (foundPos == -1) break;

      if (nl >= sl && normalStr.indexOf(search, pos) + 1) {

        tempItem.weight += (nl / sl * 100 > 50) ? w + length : nl / sl * w + length;
        tempItem.weight = nl - foundPos;
        tempItem.in = foundPos;
        tempItem.out = tempItem.in + search.length;
        tempItem.length = sl;

        if (nl === sl) tempItem.weight += w * 2;

        if (normalStr[0] === search[0]) tempItem.weight += w;

      }

      result.push(tempItem);

      pos = foundPos + 1;

    }
    
    if (!options.multiply){
      result = result.sort(compare);
      result = [result[0]];
    }

    return result;
  }

  function compare(a, b) {

    a = a.weight;
    b = b.weight;

    let comparison = 0;

    if (a < b) {
      comparison = 1;
    } else if (a > b) {
      comparison = -1;
    }
    return comparison;
  }

  function copyObject(src) {
    return Object.assign({}, src);
  }

  return this;

};