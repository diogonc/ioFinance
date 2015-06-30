var BalancePerMonthReport = function() {
  var self = this;
  self.dates = [];
  self.creditCategories = [];

  self.GetBalancePerMonth = function(data) {
    self.dates = self.GetDates();
    var numberOfItens = data.length;

    for (var i = 0; i <= numberOfItens; i++) {
      var transaction = data[i];

      var type = transaction.category.type;
      if (type === "Crédito") {
        var index = findIndex(transaction.category.guid, self.creditCategories)
        if (index < 0) {
          var item = {
            category: transaction.category,
            balance: self.addBalance(transaction),
            average: 0,
            sum: 0
          }
          self.creditCategories.push(item);
        }else {
          var categoy = self.creditCategories[index];
          var value = transaction.value;
        }
      }
    }
  };

  self.addBalance = function(transaction){
    var indexOfDate = self.findIndexOfDate(transaction.date);
    self.creditCategories.balance[indexOfDate] += transaction.value;
  }

  self.GetDates = function() {
    var dates = [];
    var date = new Date();
    var numberOfMonths = 5;
    self.addMonths(date, (numberOfMonths * -1) + 1);

    for (month = 1; month <= numberOfMonths; month++) {
      self.addMonths(date, 1);
      dates.push(self.formatDate(date));
    }
    return dates;
  }

  self.addMonths = function(date, numberOfMonths) {
    date.setDate(1);
    date.setMonth(date.getMonth() + numberOfMonths);
    return date;
  }

  self.formatDate = function(date) {
    var year = String(date.getFullYear()).substring(2);
    return (date.getMonth() + 1) + '/' + year;
  }

  self.findIndex = function(id, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].account.guid === id) {
        return i;
      }
    }
    return -1;
  };
};
