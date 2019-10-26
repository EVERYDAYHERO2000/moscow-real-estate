__.fs.time = {
  toInt: function (h, m) {

    m = (m < 10) ? '0' + m : '' + m;
    h = '' + h;

    return +(h + m);

  }
}