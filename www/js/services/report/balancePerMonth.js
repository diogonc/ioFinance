var BalancePerMonthReport = function() {
  var self = this;
  self.dates = [];
  self.creditCategories = [];
  self.debitCategories = [];
  self.totalCredits = [];
  self.totalDebits = [];

  self.GetBalancePerMonth = function(data, numberOfMonths) {
    self.dates = self.getDates(numberOfMonths);
    self.totalCredits = new CategoryRow({
      name: 'Total'
    }, self.dates);
    self.totalDebits = new CategoryRow({
      name: 'Total'
    }, self.dates);
    var numberOfItens = data.length;

    for (var i = 0; i < numberOfItens; i++) {
      var transaction = data[i];
      var type = transaction.category.type;
      if (type === "Crédito") {
        self.addItem(transaction, self.creditCategories);
        self.addTotal(transaction, self.totalCredits);
      }
      if (type == "Débito") {
        self.addItem(transaction, self.debitCategories);
        self.addTotal(transaction, self.totalDebits);
      }
    }

    self.debitCategories = self.debitCategories.sort(OrdernarPorNome);
    self.creditCategories = self.creditCategories.sort(OrdernarPorNome);

    return {
      dates: self.dates,
      creditCategories: self.creditCategories,
      debitCategories: self.debitCategories,
      totalDebits: self.totalDebits,
      totalCredits: self.totalCredits
    };
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

  self.addTotal = function(transaction, list) {
    list.addTransaction(transaction);
  }

  self.getDates = function(numberOfMonths) {
    var dates = [];
    var date = new Date();
    date = self.addMonths(date, -1);
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

  function OrdernarPorNome(item, anotherItem) {
    var A = item.category.name.toLowerCase();
    var B = anotherItem.category.name.toLowerCase();
    if (A < B) {
      return -1;
    } else if (A > B) {
      return 1;
    } else {
      return 0;
    }
  }
};
