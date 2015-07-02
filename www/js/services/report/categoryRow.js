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
    self.balance[0].value += transaction.value;
    self.numberOfItens++;
  };
}
