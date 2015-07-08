var CategoryRow = function(category, dates) {
  var self = this;
  self.balance = [];
  self.sum = 0;

  if (typeof category !== 'undefined') {
    self.category = category;

    var length = dates.length;
    for (var i = 0; i < length; i++) {
      var date = dates[i];
      var dateParts = date.split("/");
      self.balance.push({
        date: date,
        month: dateParts[0],
        year: dateParts[1],
        value: 0
      });
    }
  }

  self.average = function() {
    if (self.balance.length === 0)
      return 0;

    return self.sum / self.balance.length;
  };

  self.addTransaction = function(transaction) {
    var date = util.formatDate(transaction.date);
    var index = self.indexOfDate(date);
    if (index >= 0) {
      self.balance[index].value += transaction.value;
      self.sum += transaction.value;
    }
  };

  self.indexOfDate = function(date) {
    var length = self.balance.length;
    for (var i = 0; i < length; i++) {
      if (self.balance[i].date === date) {
        return i;
      }
    }
    return -1;
  }
}
