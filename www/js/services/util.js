var util = {};
util.formatDate = function(date) {
  if(!(date instanceof Date))
    date = new Date(date);
    
  var year = String(date.getFullYear()).substring(2);
  return (date.getMonth() + 1) + '/' + year;
  return '04';
};
