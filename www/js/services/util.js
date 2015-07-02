var util = {};
util.formatDate = function(date) {
  var year = String(date.getFullYear()).substring(2);
  return (date.getMonth() + 1) + '/' + year;
  return '04';
};
