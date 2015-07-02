var CategoryRow = function(transaction) {
  var self = this;

  if (typeof transaction !== 'undefined') {
    self.category = transaction.category;
    self.balance = [{
      date: util.formatDate(new Date(transaction.date)),
      value: transaction.value
    }];
    self.average = transaction.value;
    self.sum = transaction.value;
  }
}
