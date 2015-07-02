var CategoryRow = function(transaction) {
  var self = this;
  self.sum = 0;
  self.numberOfItens = 1;

  if (typeof transaction !== 'undefined') {
    self.category = transaction.category;
    self.balance = [{
      date: util.formatDate(new Date(transaction.date)),
      value: transaction.value
    }];
    self.sum = transaction.value;
  }

  self.average = function() {
    return self.sum / self.numberOfItens;
  };

  self.addTransaction = function(transaction) {
    var date = util.formatDate(transaction.date);
    var index = self.indexOfDate(date);
    if (index >= 0)
    {
      self.balance[0].value += transaction.value;
    }
    else {
      var item = {date: date, value: transaction.value};
      self.balance.push(item);
    }
    self.numberOfItens++;
  };

  self.indexOfDate = function(date){
    var length = self.balance.length;
    for (var i = 0; i < length; i++) {
      if (self.balance[i].date === date) {
        return i;
      }
    }
    return -1;
  }
}
