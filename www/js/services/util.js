var util = {};
util.formatDate = function(date) {
  if(!(date instanceof Date))
    date = new Date(date);

  var year = String(date.getFullYear()).substring(2);
  return (date.getMonth() + 1) + '/' + year;
};

util.dateToUs = function(date){
  if(!(date instanceof Date))
    date = new Date(date);

  var year = String(date.getFullYear());
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  return year+'-'+ month+ '-' + day;
}

util.usToDate = function(date){
  var dateParts = date.split('-');
  var year = parseInt(dateParts[0]);
  var month = parseInt(dateParts[1]-1);
  var day = parseInt(dateParts[2]);
  return new Date(year, month, day);
}
