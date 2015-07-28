var util = {};
util.formatDate = function(date) {
  if (!(date instanceof Date))
    date = new Date(date);

  var year = String(date.getFullYear()).substring(2);
  return (date.getMonth() + 1) + '/' + year;
};

util.dateToUs = function(date) {
  if (!(date instanceof Date))
    date = new Date(date);

  var year = String(date.getFullYear());
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  return year + '-' + month + '-' + day;
}

util.usToDate = function(date) {
  var dateParts = date.split('-');
  var year = parseInt(dateParts[0]);
  var month = parseInt(dateParts[1] - 1);
  var day = parseInt(dateParts[2]);
  return new Date(year, month, day);
}

util.monthYearToDate = function(formatedDate) {
  var dateParts = formatedDate.split('/');
  var month = parseInt(dateParts[0] - 1);
  var year = parseInt('20' + dateParts[1]);
  return new Date(year, month, 1);
}

util.getQuantityOfMonths = function(firstDate) {
  var now = new Date();
  var months;
  months = (now.getFullYear() - firstDate.getFullYear()) * 12;
  months -= firstDate.getMonth() + 1;
  months += now.getMonth();
  months += 2;
  return months <= 0 ? 0 : months;
}

util.indexOf = function(item, list) {
  var length = list.length;
  for (var i = 0; i < length; i++) {
    if (list[i] === item) {
      return i;
    }
  }
  return -1;
}
