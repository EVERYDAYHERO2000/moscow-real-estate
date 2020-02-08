const mode = function (arr) {
  var numMapping = {};
  var greatestFreq = 0;
  var mode;
  arr.forEach(function findMode(number) {
    numMapping[number] = (numMapping[number] || 0) + 1;

    if (greatestFreq < numMapping[number]) {
      greatestFreq = numMapping[number];
      mode = number;
    }
  });
  return +mode;
}

module.exports = mode;