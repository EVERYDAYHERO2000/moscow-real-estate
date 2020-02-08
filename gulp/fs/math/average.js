const average = function(nums) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

module.exports = average;