var BalancePerMonthReport = function() {
  var self = this;
  self.dates = [];
  self.creditCategories = [];
  self.debitCategories = [];

  self.GetBalancePerMonth = function(data) {
    self.dates = self.getDates();
    var numberOfItens = data.length;

    for (var i = 0; i < numberOfItens; i++) {
      var transaction = data[i];
      var type = transaction.category.type;
      if (type === "Crédito") {
        self.addItem(transaction, self.creditCategories);
      }
      if (type == "Débito") {
        self.addItem(transaction, self.debitCategories);
      }
    }

    return{dates: self.dates, creditCategories: self.creditCategories, debitCategories: self.debitCategories};
  };

  self.addItem = function(transaction, list) {
    var index = self.findCategoryIndex(transaction.category.guid, list);

    if (index < 0) {
      var item = new CategoryRow(transaction.category, self.dates);
      item.addTransaction(transaction);
      list.push(item);
    } else {
      var category = list[index];
      category.addTransaction(transaction);
    }
  }

  self.getDates = function(year, month) {
    var dates = [];
    var date = new Date(year, month - 1, 1);
    var numberOfMonths = 5;
    self.addMonths(date, (numberOfMonths * -1) + 1);

    for (month = 1; month <= numberOfMonths; month++) {
      self.addMonths(date, 1);
      dates.push(util.formatDate(date));
    }
    return dates;
  }

  self.addMonths = function(date, numberOfMonths) {
    date.setDate(1);
    date.setMonth(date.getMonth() + numberOfMonths);
    return date;
  }

  self.findCategoryIndex = function(id, list) {
    var length = list.length
    for (var i = 0; i < length; i++) {
      if (list[i].category.guid === id) {
        return i;
      }
    }
    return -1;
  };
};
